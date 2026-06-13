import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name_en",
      title: "Product Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name_id",
      title: "Product Name (Indonesian)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name_en",
        maxLength: 96,
      },
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
      name: "image",
      title: "Primary Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image2",
      title: "Secondary Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "image3",
      title: "Tertiary Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
