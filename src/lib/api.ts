const API_URL: string = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === "production" 
    ? (() => { throw new Error("Missing NEXT_PUBLIC_API_URL environment variable in production") })() 
    : "http://localhost:8080");

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
  content?: string;
  author: {
    name: string;
    image: string | null;
  };
  categories: Array<{ title: string; description: string }>;
}

export function getServices(): Service[] {
  return [
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
}

export function getShowcaseProducts(): Product[] {
  return [
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
}

export async function getPortfolios(): Promise<Portfolio[]> {
  const url = `${API_URL}/v1/public/marketing/portfolios`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data || []).map((item: any) => ({
      _id: item.id,
      title: item.title,
      slug: item.slug || item.id,
      description_en: item.description,
      description_id: item.description,
      category: "webapp",
      imageUrl: item.image
    }));
  } catch (err) {
    console.error("getPortfolios error, returning fallback:", err);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  const list = await getPortfolios();
  return list.find((item) => item.slug === slug) || null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const url = `${API_URL}/v1/public/marketing/testimonials`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data || []).map((item: any) => ({
      _id: item.id,
      name: item.name,
      role_id: item.company,
      role_en: item.company,
      content_id: item.content,
      content_en: item.content,
      rating: item.rating,
      imageUrl: item.avatarImage
    }));
  } catch (err) {
    console.error("getTestimonials error:", err);
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  const url = `${API_URL}/v1/public/marketing/articles`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data || []).map((item: any) => ({
      _id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.excerpt,
      publishedAt: item.publishedAt || item.createdAt,
      imageUrl: item.coverImage,
      author: {
        name: item.author,
        image: null
      },
      categories: (item.tags || []).map((tag: string) => ({ title: tag, description: "" }))
    }));
  } catch (err) {
    console.error("getArticles error:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const url = `${API_URL}/v1/public/marketing/articles/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const item = await res.json();
    return {
      _id: item.id,
      title: item.title,
      slug: item.slug,
      description: item.excerpt,
      publishedAt: item.publishedAt || item.createdAt,
      imageUrl: item.coverImage,
      content: item.content,
      author: {
        name: item.author,
        image: null
      },
      categories: (item.tags || []).map((tag: string) => ({ title: tag, description: "" }))
    };
  } catch (err) {
    console.error(`getArticleBySlug error for slug ${slug}:`, err);
    return null;
  }
}
