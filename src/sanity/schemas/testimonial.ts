import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role_en",
      title: "Role / Company (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role_id",
      title: "Role / Company (Indonesian)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content_en",
      title: "Content (English)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content_id",
      title: "Content (Indonesian)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "avatar",
      title: "Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "approvalStatus",
      title: "Approval Status",
      type: "boolean",
      description: "Only approved testimonials will be rendered on the website.",
      initialValue: false,
    }),
    defineField({
      name: "sourceMetadata",
      title: "Source Metadata",
      type: "string",
      description: "e.g., LinkedIn, Email, WhatsApp, Upwork, Google Reviews.",
    }),
  ],
});
