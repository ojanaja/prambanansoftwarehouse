import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "@/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5e0w0vh7";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "prambanan-digital",
  title: "Prambanan Digital CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
