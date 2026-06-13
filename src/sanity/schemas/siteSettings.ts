import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title_en",
      title: "Site Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_id",
      title: "Site Title (Indonesian)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_en",
      title: "Site Description (English)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_id",
      title: "Site Description (Indonesian)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: "Facebook Link",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Link",
      type: "url",
    }),
    defineField({
      name: "github",
      title: "GitHub Link",
      type: "url",
    }),
  ],
});
