import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";

export async function handleFetchDataSlug(slug) {
  try {
    const data = await client.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60 } });
    return data;
  } catch (error) {
    console.error(error);
    console.log(error.message);
    return null;
  }
}
