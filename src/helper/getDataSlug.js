import axios from "axios";

export async function handleFetchDataSlug(slug) {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_URL_WISP_SLUG + slug);
    return response.data.post;
  } catch (error) {
    console.error(error);
    console.log(error.message);
  }
}
