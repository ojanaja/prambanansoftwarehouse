import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5e0w0vh7";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-08";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // cache CDN responses in production
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // bypass CDN for mutations
  token: process.env.SANITY_WRITE_TOKEN,
});
