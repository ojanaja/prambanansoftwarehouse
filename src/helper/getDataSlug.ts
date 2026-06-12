import { getArticleBySlug } from "@/lib/api";

export async function handleFetchDataSlug(slug: string): Promise<any> {
  try {
    const data = await getArticleBySlug(slug);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
