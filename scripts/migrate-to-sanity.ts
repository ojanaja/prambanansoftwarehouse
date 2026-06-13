import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { writeClient } from "../src/sanity/client";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

// Fallbacks for baseline data
const FALLBACK_SERVICES = [
  {
    _id: "service-custom",
    _type: "service",
    title_en: "Custom Software Development",
    title_id: "Pengembangan Software Kustom",
    description_en: "Tailored software solutions designed to fit your unique business requirements, ensuring maximum functionality and efficiency.",
    description_id: "Solusi perangkat lunak yang dirancang khusus untuk kebutuhan bisnis unik Anda, memastikan fungsionalitas dan efisiensi maksimal.",
    icon: "custom",
    order: 1
  },
  {
    _id: "service-optimize",
    _type: "service",
    title_en: "Optimize Your Software",
    title_id: "Optimasi Software Anda",
    description_en: "Enhance performance, security, and user experience by improving your existing software to meet modern standards and business needs.",
    description_id: "Tingkatkan performa, keamanan, dan pengalaman pengguna dengan memperbaiki perangkat lunak Anda agar memenuhi standar modern dan kebutuhan bisnis.",
    icon: "optimize",
    order: 2
  },
  {
    _id: "service-daas",
    _type: "service",
    title_en: "Developer as a Service",
    title_id: "Developer as a Service",
    description_en: "Flexible access to skilled developers who integrate seamlessly with your team, helping you scale your projects efficiently without long-term commitments.",
    description_id: "Akses fleksibel ke developer terampil yang terintegrasi dengan tim Anda, membantu Anda menskalakan proyek secara efisien tanpa komitmen jangka panjang.",
    icon: "daas",
    order: 3
  }
];

const FALLBACK_PRODUCTS = [
  {
    _id: "product-binder",
    _type: "product",
    name_en: "Binder",
    name_id: "Binder",
    description_en: "A secure digital binder for administrative documents and student records, built for the public sector.",
    description_id: "Binder digital aman untuk dokumen administratif dan data siswa, dibangun khusus untuk sektor publik.",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
    order: 1
  },
  {
    _id: "product-onifarm",
    _type: "product",
    name_en: "OniFarm",
    name_id: "OniFarm",
    description_en: "A smart farming application for monitoring soil fertility and automating irrigation schedules.",
    description_id: "Aplikasi pertanian pintar untuk memantau kesuburan tanah dan mengotomatiskan jadwal penyiraman.",
    imageUrl: "https://images.unsplash.com/photo-1563514223749-b5d1449b57c6?w=800&q=80",
    order: 2
  },
  {
    _id: "product-pertamina",
    _type: "product",
    name_en: "Pertamina",
    name_id: "Pertamina",
    description_en: "An enterprise work system socialization platform for Pertamina Geothermal Energy.",
    description_id: "Platform sosialisasi sistem tata kerja enterprise untuk Pertamina Geothermal Energy.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    order: 3
  }
];

const FALLBACK_PORTFOLIOS = [
  {
    _id: "case-binder",
    _type: "caseStudy",
    title: "Binder Digital Archiving",
    slug: "binder-archiving",
    category: "webapp",
    description_en: "Transforming school management and student portfolios into a secure digital asset.",
    description_id: "Mentransformasikan manajemen sekolah dan portofolio siswa menjadi aset digital yang aman.",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
    liveLink: "https://prambanandigital.web.id",
    context_en: "Schools needed a unified cloud system to store and compile student records.",
    context_id: "Sekolah membutuhkan sistem cloud terpadu untuk menyimpan dan menyusun data siswa.",
    challenge_en: "Legacy paper archiving and decentralized data formats caused delays.",
    challenge_id: "Pengarsipan kertas warisan dan format data terdesentralisasi menyebabkan keterlambatan.",
    solution_en: "Designed a secure SaaS binder platform with access control rules.",
    solution_id: "Merancang platform binder SaaS yang aman dengan aturan kontrol akses.",
    implementation_en: "Implemented Next.js frontend with PostgreSQL relational DB storage.",
    implementation_id: "Mengimplementasikan frontend Next.js dengan penyimpanan DB relasional PostgreSQL.",
    outcome_en: "Reduced data retrieval latency by 90% across 5 test schools.",
    outcome_id: "Mengurangi latensi pengambilan data sebesar 90% di 5 sekolah uji coba.",
    order: 1
  },
  {
    _id: "case-onifarm",
    _type: "caseStudy",
    title: "OniFarm Precision Agriculture",
    slug: "onifarm-agriculture",
    category: "webapp",
    description_en: "IoT-powered automated crop management system for modern agricultural farms.",
    description_id: "Sistem manajemen tanaman otomatis berbasis IoT untuk pertanian modern.",
    imageUrl: "https://images.unsplash.com/photo-1563514223749-b5d1449b57c6?w=800&q=80",
    liveLink: "https://prambanandigital.web.id",
    context_en: "Farmers had to manually monitor soil chemistry and irrigation levels.",
    context_id: "Petani harus memantau kimia tanah dan tingkat irigasi secara manual.",
    challenge_en: "Water wastage and inaccurate watering schedules affected crop yields.",
    challenge_id: "Pemborosan air dan jadwal penyiraman yang tidak akurat memengaruhi hasil panen.",
    solution_en: "Deployed ESP32 sensors integrated with a Next.js control panel.",
    solution_id: "Menyebarkan sensor ESP32 yang terintegrasi dengan panel kontrol Next.js.",
    implementation_en: "Built real-time telemetry pipelines via WebSockets and Supabase.",
    implementation_id: "Membangun saluran telemetri real-time melalui WebSockets dan Supabase.",
    outcome_en: "Saved 40% on water usage while increasing crop yield by 15%.",
    outcome_id: "Menghemat 40% penggunaan air sekaligus meningkatkan hasil panen sebesar 15%.",
    order: 2
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    _id: "testimonial-1",
    _type: "testimonial",
    name: "Ahmad Subarjo",
    role_en: "Director of Digitalization, EduCorp",
    role_id: "Direktur Digitalisasi, EduCorp",
    content_en: "Prambanan Digital delivered the Binder system ahead of schedule. The architecture is outstandingly reliable.",
    content_id: "Prambanan Digital mengirimkan sistem Binder lebih cepat dari jadwal. Arsitekturnya sangat andal.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    approvalStatus: true,
    sourceMetadata: "LinkedIn Reference"
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    name: "Siti Rahma",
    role_en: "Operations Head, FarmTech",
    role_id: "Kepala Operasional, FarmTech",
    content_en: "Our crop yield grew significantly after integrating OniFarm telemetry. Highly recommend their engineering team.",
    content_id: "Hasil panen kami tumbuh signifikan setelah mengintegrasikan telemetri OniFarm. Sangat merekomendasikan tim engineering mereka.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    approvalStatus: true,
    sourceMetadata: "Direct Email Verification"
  }
];

const FALLBACK_ARTICLES = [
  {
    _id: "post-1",
    _type: "post",
    title: "Building Scalable Enterprise Architectures with Next.js",
    slug: "building-scalable-enterprise-nextjs",
    description: "Learn best practices on structuring Next.js apps for heavy visual engagement, security, and SEO optimization.",
    publishedAt: new Date().toISOString(),
    coverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    authorName: "Prambanan Editorial",
    content: [
      {
        _key: "block-1",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "span-1",
            _type: "span",
            text: "Next.js offers a powerful platform for modern enterprise websites. By combining Server Components with dynamic code-splitting, organizations can maintain fast load times and strong SEO visibility."
          }
        ]
      }
    ]
  }
];

async function uploadImageFromUrl(url: string, filename: string) {
  if (!process.env.SANITY_WRITE_TOKEN) return null;
  try {
    const response = await axios.get(url, { responseType: "arraybuffer", timeout: 8000 });
    const buffer = Buffer.from(response.data);
    const asset = await writeClient.assets.upload("image", buffer, { filename });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id
      }
    };
  } catch (err) {
    console.error(`Failed to upload image from URL ${url}:`, err);
    return null;
  }
}

async function migrate() {
  console.log("Starting Content Migration to Sanity CMS...");
  const ndjsonDocs: any[] = [];

  // 1. Services
  console.log("\nProcessing Services...");
  for (const service of FALLBACK_SERVICES) {
    ndjsonDocs.push(service);
    if (process.env.SANITY_WRITE_TOKEN) {
      try {
        await writeClient.createOrReplace(service);
        console.log(`✓ Service migrated: ${service.title_en}`);
      } catch (err) {
        console.error(`✗ Failed to migrate service ${service.title_en}:`, err);
      }
    }
  }

  // 2. Products
  console.log("\nProcessing Showcase Products...");
  for (const prod of FALLBACK_PRODUCTS) {
    try {
      const { imageUrl, ...rest } = prod;
      let imageAssetRef = null;
      if (imageUrl && process.env.SANITY_WRITE_TOKEN) {
        imageAssetRef = await uploadImageFromUrl(imageUrl, `${prod._id}-image.jpg`);
      }
      
      const doc = {
        ...rest,
        image: imageAssetRef || undefined
      };
      ndjsonDocs.push(doc);
      
      if (process.env.SANITY_WRITE_TOKEN) {
        await writeClient.createOrReplace(doc);
        console.log(`✓ Product migrated: ${prod.name_en}`);
      }
    } catch (err) {
      console.error(`✗ Failed to migrate product ${prod.name_en}:`, err);
    }
  }

  // 3. Portfolios / Case Studies
  console.log("\nProcessing Case Studies...");
  for (const pf of FALLBACK_PORTFOLIOS) {
    try {
      const { imageUrl, slug, ...rest } = pf;
      let imageAssetRef = null;
      if (imageUrl && process.env.SANITY_WRITE_TOKEN) {
        imageAssetRef = await uploadImageFromUrl(imageUrl, `${pf._id}-cover.jpg`);
      }

      const doc = {
        ...rest,
        slug: { _type: "slug", current: slug },
        coverImage: imageAssetRef || undefined
      };
      ndjsonDocs.push(doc);

      if (process.env.SANITY_WRITE_TOKEN) {
        await writeClient.createOrReplace(doc);
        console.log(`✓ Case Study migrated: ${pf.title}`);
      }
    } catch (err) {
      console.error(`✗ Failed to migrate case study ${pf.title}:`, err);
    }
  }

  // 4. Testimonials
  console.log("\nProcessing Testimonials...");
  for (const tm of FALLBACK_TESTIMONIALS) {
    try {
      const { avatarUrl, ...rest } = tm;
      let avatarAssetRef = null;
      if (avatarUrl && process.env.SANITY_WRITE_TOKEN) {
        avatarAssetRef = await uploadImageFromUrl(avatarUrl, `${tm._id}-avatar.jpg`);
      }

      const doc = {
        ...rest,
        avatar: avatarAssetRef || undefined
      };
      ndjsonDocs.push(doc);

      if (process.env.SANITY_WRITE_TOKEN) {
        await writeClient.createOrReplace(doc);
        console.log(`✓ Testimonial migrated: ${tm.name}`);
      }
    } catch (err) {
      console.error(`✗ Failed to migrate testimonial ${tm.name}:`, err);
    }
  }

  // 5. Articles (Posts)
  console.log("\nProcessing Articles...");
  for (const art of FALLBACK_ARTICLES) {
    try {
      const { coverImageUrl, slug, ...rest } = art;
      let coverAssetRef = null;
      if (coverImageUrl && process.env.SANITY_WRITE_TOKEN) {
        coverAssetRef = await uploadImageFromUrl(coverImageUrl, `${art._id}-cover.jpg`);
      }

      const doc = {
        ...rest,
        slug: { _type: "slug", current: slug },
        coverImage: coverAssetRef || undefined
      };
      ndjsonDocs.push(doc);

      if (process.env.SANITY_WRITE_TOKEN) {
        await writeClient.createOrReplace(doc);
        console.log(`✓ Article migrated: ${art.title}`);
      }
    } catch (err) {
      console.error(`✗ Failed to migrate article ${art.title}:`, err);
    }
  }

  // Export to NDJSON
  console.log("\nWriting documents to local NDJSON file...");
  const ndjsonPath = path.join(process.cwd(), "sanity-migration-data.ndjson");
  const ndjsonContent = ndjsonDocs.map(d => JSON.stringify(d)).join("\n") + "\n";
  fs.writeFileSync(ndjsonPath, ndjsonContent, "utf8");
  console.log(`✓ Exported ${ndjsonDocs.length} documents to: ${ndjsonPath}`);

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.log("\n[NOTE] No SANITY_WRITE_TOKEN was provided. Write operations to the API were skipped, but you can import the generated NDJSON file manually using Sanity CLI:");
    console.log("  npx sanity dataset import sanity-migration-data.ndjson production --replace");
  } else {
    console.log("\nContent Migration Session Ended!");
  }
}

migrate().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
