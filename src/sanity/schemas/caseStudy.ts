import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web App", value: "webapp" },
          { title: "Mobile App", value: "mobile" },
          { title: "UI/UX Design", value: "design" },
          { title: "Custom Solutions", value: "custom" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_en",
      title: "Brief Description (English)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_id",
      title: "Brief Description (Indonesian)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveLink",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "context_en",
      title: "Context (English)",
      type: "text",
    }),
    defineField({
      name: "context_id",
      title: "Context (Indonesian)",
      type: "text",
    }),
    defineField({
      name: "challenge_en",
      title: "Challenge (English)",
      type: "text",
    }),
    defineField({
      name: "challenge_id",
      title: "Challenge (Indonesian)",
      type: "text",
    }),
    defineField({
      name: "solution_en",
      title: "Solution (English)",
      type: "text",
    }),
    defineField({
      name: "solution_id",
      title: "Solution (Indonesian)",
      type: "text",
    }),
    defineField({
      name: "implementation_en",
      title: "Implementation (English)",
      type: "text",
    }),
    defineField({
      name: "implementation_id",
      title: "Implementation (Indonesian)",
      type: "text",
    }),
    defineField({
      name: "outcome_en",
      title: "Outcome (English)",
      type: "text",
    }),
    defineField({
      name: "outcome_id",
      title: "Outcome (Indonesian)",
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
