import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../sanity/env";

// Ensure SANITY_WRITE_TOKEN is available in your .env.local
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.warn("SANITY_WRITE_TOKEN is not defined. AI Blog creation will fail.");
}

export const sanityAdmin = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token, // Required for write operations
});

/**
 * Helper to upload an image from a URL to Sanity Assets
 */
export async function uploadImageFromUrl(url) {
  try {
    console.info(`Fetching image from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image from ${url} (Status: ${response.status})`);
    
    const buffer = await response.arrayBuffer();
    console.info(`Uploading asset to Sanity... (Size: ${buffer.byteLength} bytes)`);
    
    const asset = await sanityAdmin.assets.upload("image", Buffer.from(buffer), {
      filename: `ai-generated-${Date.now()}.jpg`,
    });
    
    console.info(`Image uploaded successfully. Asset ID: ${asset._id}`);
    
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  }
}
