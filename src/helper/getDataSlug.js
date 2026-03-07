import { supabase } from "@/lib/supabase";

export async function handleFetchDataSlug(slug) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, author:authors(*), tags(*)")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    console.log(error.message);
    return null;
  }
}
