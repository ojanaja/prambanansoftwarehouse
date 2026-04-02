import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'

// Retrieve environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-with-your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
    basePath: '/studio',
    name: 'default',
    title: 'Prambanan Digital Studio',

    projectId,
    dataset,

    plugins: [
        structureTool(),
        visionTool(),
    ],

    schema: {
        types: schema.types,
    },
})
