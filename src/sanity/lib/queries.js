import { groq } from 'next-sanity'

// Get all projects
export const projectsQuery = groq`*[_type == "project"] {
  _id,
  title,
  "slug": slug.current,
  description_en,
  description_id,
  liveLink,
  category,
  mainImage,
  galleryImages
}`

// Get a single project by its slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  description_en,
  description_id,
  liveLink,
  category,
  mainImage,
  galleryImages
}`

// Get all services
export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  title_en,
  title_id,
  description_en,
  description_id,
  icon
}`

// Get all testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  name,
  role_en,
  role_id,
  content_en,
  content_id,
  image,
  rating
}`

// Get all products
export const productsQuery = groq`*[_type == "product"] | order(order asc) {
  _id,
  name_en,
  name_id,
  description_en,
  description_id,
  image1,
  image2,
  image3
}`

// Get all blog posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  publishedAt,
  mainImage,
  author->{
    name,
    image,
    bio
  },
  categories[]->{
    title,
    description
  }
}`

// Get a single post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  publishedAt,
  mainImage,
  content,
  author->{
    name,
    image,
    bio
  },
  categories[]->{
    title,
    description
  }
}`
