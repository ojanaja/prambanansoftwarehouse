import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: any) {
  if (!source) {
    return {
      url: () => "/projects/placeholder.webp",
      width: () => ({
        url: () => "/projects/placeholder.webp"
      }),
      height: () => ({
        url: () => "/projects/placeholder.webp"
      })
    } as any;
  }
  
  // Return standard builder if source exists
  return builder.image(source);
}
