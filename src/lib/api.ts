import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";

export interface Service {
  _id: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  icon: string;
  order: number;
}

export interface Product {
  _id: string;
  name_en: string;
  name_id: string;
  description_en: string;
  description_id: string;
  imageURL: string;
  imageURL2: string;
  imageURL3: string;
  order: number;
}

export interface Portfolio {
  _id: string;
  title: string;
  slug: string;
  description_en: string;
  description_id: string;
  category: string;
  imageUrl: string;
  liveLink?: string;
  galleryImages?: any[];
  context_en?: string;
  context_id?: string;
  challenge_en?: string;
  challenge_id?: string;
  solution_en?: string;
  solution_id?: string;
  implementation_en?: string;
  implementation_id?: string;
  outcome_en?: string;
  outcome_id?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role_id: string;
  role_en: string;
  content_id: string;
  content_en: string;
  rating: number;
  imageUrl: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  imageUrl: string;
  content?: any;
  author: {
    name: string;
    image: string | null;
  };
  categories: Array<{ title: string; description: string }>;
}

// --- Static Fallbacks (to ensure visual completeness when CMS is empty) ---

const FALLBACK_SERVICES: Service[] = [
  {
    _id: "custom",
    title_en: "Custom Software Development",
    title_id: "Pengembangan Software Kustom",
    description_en: "Tailored software solutions designed to fit your unique business requirements, ensuring maximum functionality and efficiency.",
    description_id: "Solusi perangkat lunak yang dirancang khusus untuk kebutuhan bisnis unik Anda, memastikan fungsionalitas dan efisiensi maksimal.",
    icon: "custom",
    order: 1
  },
  {
    _id: "optimize",
    title_en: "Optimize Your Software",
    title_id: "Optimasi Software Anda",
    description_en: "Enhance performance, security, and user experience by improving your existing software to meet modern standards and business needs.",
    description_id: "Tingkatkan performa, keamanan, dan pengalaman pengguna dengan memperbaiki perangkat lunak Anda agar memenuhi standar modern dan kebutuhan bisnis.",
    icon: "optimize",
    order: 2
  },
  {
    _id: "daas",
    title_en: "Developer as a Service",
    title_id: "Developer as a Service",
    description_en: "Flexible access to skilled developers who integrate seamlessly with your team, helping you scale your projects efficiently without long-term commitments.",
    description_id: "Akses fleksibel ke developer terampil yang terintegrasi dengan tim Anda, membantu Anda menskalakan proyek secara efisien tanpa komitmen jangka panjang.",
    icon: "daas",
    order: 3
  }
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: "product-binder",
    name_en: "Binder",
    name_id: "Binder",
    description_en: "A secure digital binder for administrative documents and student records, built for the public sector.",
    description_id: "Binder digital aman untuk dokumen administratif dan data siswa, dibangun khusus untuk sektor publik.",
    imageURL: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
    imageURL2: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    imageURL3: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    order: 1
  },
  {
    _id: "product-onifarm",
    name_en: "OniFarm",
    name_id: "OniFarm",
    description_en: "A smart farming application for monitoring soil fertility and automating irrigation schedules.",
    description_id: "Aplikasi pertanian pintar untuk memantau kesuburan tanah dan mengotomatiskan jadwal penyiraman.",
    imageURL: "https://images.unsplash.com/photo-1563514223749-b5d1449b57c6?w=800&q=80",
    imageURL2: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    imageURL3: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=800&q=80",
    order: 2
  },
  {
    _id: "product-pertamina",
    name_en: "Pertamina",
    name_id: "Pertamina",
    description_en: "An enterprise work system socialization platform for Pertamina Geothermal Energy.",
    description_id: "Platform sosialisasi sistem tata kerja enterprise untuk Pertamina Geothermal Energy.",
    imageURL: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    imageURL2: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    imageURL3: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    order: 3
  }
];

// --- Sanity API Data Fetchers ---

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch(`*[_type == "service"] | order(order asc)`);
    if (data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.error("getServices error, returning fallback:", err);
  }
  return FALLBACK_SERVICES;
}

export async function getShowcaseProducts(): Promise<Product[]> {
  try {
    const data = await client.fetch(`*[_type == "product"] | order(order asc)`);
    if (data && data.length > 0) {
      return data.map((item: any) => ({
        _id: item._id,
        name_en: item.name_en,
        name_id: item.name_id,
        description_en: item.description_en,
        description_id: item.description_id,
        imageURL: item.image ? urlForImage(item.image).url() : "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
        imageURL2: item.image2 ? urlForImage(item.image2).url() : "",
        imageURL3: item.image3 ? urlForImage(item.image3).url() : "",
        order: item.order || 0
      }));
    }
  } catch (err) {
    console.error("getShowcaseProducts error, returning fallback:", err);
  }
  return FALLBACK_PRODUCTS;
}

export async function getPortfolios(): Promise<Portfolio[]> {
  try {
    const data = await client.fetch(`*[_type == "caseStudy"] | order(order asc)`);
    return (data || []).map((item: any) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug?.current || item._id,
      description_en: item.description_en,
      description_id: item.description_id,
      category: item.category || "webapp",
      imageUrl: item.coverImage ? urlForImage(item.coverImage).url() : "/projects/placeholder.webp",
      liveLink: item.liveLink || undefined,
      galleryImages: item.galleryImages || undefined,
      context_en: item.context_en || undefined,
      context_id: item.context_id || undefined,
      challenge_en: item.challenge_en || undefined,
      challenge_id: item.challenge_id || undefined,
      solution_en: item.solution_en || undefined,
      solution_id: item.solution_id || undefined,
      implementation_en: item.implementation_en || undefined,
      implementation_id: item.implementation_id || undefined,
      outcome_en: item.outcome_en || undefined,
      outcome_id: item.outcome_id || undefined
    }));
  } catch (err) {
    console.error("getPortfolios error, returning fallback:", err);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  try {
    const item = await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0]`,
      { slug }
    );
    if (!item) return null;
    return {
      _id: item._id,
      title: item.title,
      slug: item.slug?.current || item._id,
      description_en: item.description_en,
      description_id: item.description_id,
      category: item.category || "webapp",
      imageUrl: item.coverImage ? urlForImage(item.coverImage).url() : "/projects/placeholder.webp",
      liveLink: item.liveLink || undefined,
      galleryImages: item.galleryImages || undefined,
      context_en: item.context_en || undefined,
      context_id: item.context_id || undefined,
      challenge_en: item.challenge_en || undefined,
      challenge_id: item.challenge_id || undefined,
      solution_en: item.solution_en || undefined,
      solution_id: item.solution_id || undefined,
      implementation_en: item.implementation_en || undefined,
      implementation_id: item.implementation_id || undefined,
      outcome_en: item.outcome_en || undefined,
      outcome_id: item.outcome_id || undefined
    };
  } catch (err) {
    console.error(`getPortfolioBySlug error for slug ${slug}:`, err);
    return null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await client.fetch(`*[_type == "testimonial" && approvalStatus == true]`);
    return (data || []).map((item: any) => ({
      _id: item._id,
      name: item.name,
      role_id: item.role_id,
      role_en: item.role_en,
      content_id: item.content_id,
      content_en: item.content_en,
      rating: item.rating || 5,
      imageUrl: item.avatar ? urlForImage(item.avatar).url() : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"
    }));
  } catch (err) {
    console.error("getTestimonials error:", err);
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const data = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        publishedAt,
        coverImage,
        authorName,
        authorImage,
        "categories": categories[]->{ title, description }
      }`
    );
    return (data || []).map((item: any) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug?.current || item._id,
      description: item.description,
      publishedAt: item.publishedAt,
      imageUrl: item.coverImage ? urlForImage(item.coverImage).url() : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      author: {
        name: item.authorName || "Prambanan Editorial",
        image: item.authorImage ? urlForImage(item.authorImage).url() : null
      },
      categories: (item.categories || []).map((cat: any) => ({
        title: cat.title,
        description: cat.description || ""
      }))
    }));
  } catch (err) {
    console.error("getArticles error:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const item = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        publishedAt,
        coverImage,
        authorName,
        authorImage,
        content,
        "categories": categories[]->{ title, description }
      }`,
      { slug }
    );
    if (!item) return null;
    return {
      _id: item._id,
      title: item.title,
      slug: item.slug?.current || item._id,
      description: item.description,
      publishedAt: item.publishedAt,
      imageUrl: item.coverImage ? urlForImage(item.coverImage).url() : "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      content: item.content,
      author: {
        name: item.authorName || "Prambanan Editorial",
        image: item.authorImage ? urlForImage(item.authorImage).url() : null
      },
      categories: (item.categories || []).map((cat: any) => ({
        title: cat.title,
        description: cat.description || ""
      }))
    };
  } catch (err) {
    console.error(`getArticleBySlug error for slug ${slug}:`, err);
    return null;
  }
}
