import { NextResponse } from "next/server";
import { sanityAdmin, uploadImageFromUrl } from "@/lib/sanityAdmin";
import { getRandomTheme } from "@/helper/topicThemes";

const API_KEY = process.env.OPENROUTER_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

/**
 * AI Blog Generation Handler
 */
export async function GET(req) {
  // 1. Basic Auth for Cron (Check Header or Query Param for testing)
  const authHeader = req.headers.get("authorization");
  const { searchParams } = new URL(req.url);
  const querySecret = searchParams.get("secret");

  if (CRON_SECRET && 
      authHeader !== `Bearer ${CRON_SECRET}` && 
      querySecret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const theme = getRandomTheme();
    console.info(`Generating blog for theme: ${theme}`);

    // 2. Prompt Gemini for content in Sanity Block Content JSON format
    const prompt = `
      Anda adalah penulis blog profesional untuk "Prambanan Digital", sebuah software house terkemuka di Indonesia yang berfokus pada Digitalisasi Bisnis, SPBE (Sistem Pemerintahan Berbasis Elektronik), dan Transformasi Digital.
      
      TEMA HARI INI: "${theme}"
      
      TUGAS:
      Buatlah artikel blog yang mendalam, edukatif, dan menarik dalam Bahasa Indonesia.
      
      FORMAT OUTPUT: Harus berupa JSON valid dengan struktur berikut:
      {
        "title": "Judul SEO yang menarik (Bahasa Indonesia)",
        "description": "Deskripsi singkat untuk meta data/teaser (Bahasa Indonesia)",
        "slug": "slug-url-dari-judul",
        "imagePrompt": "Deskripsi gambar untuk AI generator latar belakang artikel ini (dalam Bahasa Inggris)",
        "contentBlocks": [
          { "style": "normal", "text": "Gunakan **teks tebal** untuk poin penting." },
          { "style": "h2", "text": "Subjudul Menarik" },
          { "style": "normal", "text": "Paragraf informatif..." },
          { "style": "bullet", "text": "Poin daftar 1" },
          { "style": "bullet", "text": "Poin daftar 2" },
          { "style": "blockquote", "text": "Kutipan inspiratif atau insight mendalam." }
        ]
      }
      
      Penting:
      - Gunakan Bahasa Indonesia yang sangat profesional, inspiratif, dan berwibawa.
      - Fokus pada transformasi digital, efisiensi bisnis, dan solusi IT.
      - Pastikan kontennya mendalam (minimal 5-6 blok konten).
      - Gunakan **markdown bold** untuk menekankan kata kunci penting di dalam teks normal.
      - Berikan nilai tambah bagi pembaca (tips praktis atau insight industri).
      - Jangan menyertakan teks lain di luar JSON.
    `;

    const FREE_MODELS = [
      "qwen/qwen-2.5-72b-instruct:free",
      "google/gemini-flash-1.5-8b",
      "meta-llama/llama-3.2-3b-instruct:free",
      "openrouter/free"
    ];

    let aiRes;
    let aiData;
    let success = false;

    // Try multiple free models in case of rate limits
    for (const model of FREE_MODELS) {
      try {
        console.info(`Trying model: ${model}`);
        aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://prambanandigital.com",
            "X-Title": "Prambanan Blog Generator",
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        });

        if (aiRes.ok) {
          aiData = await aiRes.json();
          if (aiData.choices && aiData.choices[0].message.content) {
            success = true;
            console.info(`Successfully generated content using ${model}`);
            break;
          }
        }
        console.warn(`Model ${model} failed with status ${aiRes.status}. Trying next fallback...`);
      } catch (err) {
        console.error(`Error with model ${model}:`, err.message);
      }
    }

    if (!success) throw new Error("All free AI models failed to generate content.");

    let content = aiData.choices[0].message.content;
    
    // Sanitize JSON response (remove markdown code blocks if present)
    content = content.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
    
    console.info("AI Content Response received, parsing JSON...");
    
    let blogData;
    try {
      blogData = JSON.parse(content);
    } catch (parseErr) {
      console.error("Failed to parse AI JSON response:", content);
      throw new Error(`Invalid JSON format from AI: ${parseErr.message}`);
    }

    // 3. Select a high-quality Unsplash image based on Tech/Business themes
    const techImages = [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80", // Digital World/Tech
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", // CPU/Tech
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", // Business/Charts
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80", // Coding/Office
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80", // Cyber Security
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80", // Robotics/AI
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80", // Team Collaboration
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80", // Data Center
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80", // Network/Connectivity
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"  // Modern Office
    ];
    
    // Pick a random image from the curated tech list
    const imageUrl = techImages[Math.floor(Math.random() * techImages.length)];
    
    let imageAsset = null;
    try {
      console.info(`Uploading professional Unsplash image: ${imageUrl}`);
      imageAsset = await uploadImageFromUrl(imageUrl);
    } catch (err) {
      console.warn(`Failed to upload Unsplash image: ${err.message}`);
    }

    // 4. Transform contentBlocks to Sanity Portable Text
    // This now supports simple bold markdown (**text**) by splitting text into spans
    // and adds required unique _key properties for Sanity Studio compatibility.
    const generateKey = () => Math.random().toString(36).substring(2, 11);

    const portableText = blogData.contentBlocks.map((block) => {
      const parts = block.text.split(/(\*\*.*?\*\*)/g);
      const children = parts.map(part => {
        const isBold = part.startsWith('**') && part.endsWith('**');
        return {
          _key: generateKey(),
          _type: "span",
          text: isBold ? part.slice(2, -2) : part,
          marks: isBold ? ["strong"] : []
        };
      }).filter(child => child.text !== "");

      const baseBlock = {
        _key: generateKey(),
        _type: "block",
        style: block.style || "normal",
        children: children.length > 0 ? children : [{ _key: generateKey(), _type: "span", text: block.text, marks: [] }]
      };

      if (block.style === "bullet") {
        return {
          ...baseBlock,
          style: "normal",
          level: 1,
          listItem: "bullet"
        };
      }
      return baseBlock;
    });

    // 5. Save to Sanity
    const newPost = {
      _type: "post",
      title: blogData.title,
      description: blogData.description,
      slug: { _type: "slug", current: blogData.slug },
      publishedAt: new Date().toISOString(),
      content: portableText,
    };

    // Only add mainImage if it was successfully uploaded
    if (imageAsset) {
      newPost.mainImage = imageAsset;
    } else {
      console.warn("Skipping mainImage as upload failed.");
    }

    console.info("Creating post in Sanity...");
    const result = await sanityAdmin.create(newPost);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      postId: result._id,
      title: result.title,
    });
  } catch (error) {
    console.error("AI Blog Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
