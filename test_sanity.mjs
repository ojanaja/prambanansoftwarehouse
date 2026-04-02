import { createClient } from '@sanity/client'
const client = createClient({ projectId: '5e0w0vh7', dataset: 'production', useCdn: false, apiVersion: '2024-03-08' })
client.fetch('*[_type == "project"]').then(x => console.log("Projects length:", x.length)).catch(console.error)
