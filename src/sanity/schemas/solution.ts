import { defineType, defineField } from "sanity";

export default defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_id",
      title: "Title (Indonesian)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title_en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_en",
      title: "Description (English)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_id",
      title: "Description (Indonesian)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
