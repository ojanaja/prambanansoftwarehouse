import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
