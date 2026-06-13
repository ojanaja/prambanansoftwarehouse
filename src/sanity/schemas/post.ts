import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "post",
  title: "Post (Insight/Article)",
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
      name: "description",
      title: "Excerpt / Brief Description",
      type: "text",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
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
      name: "authorName",
      title: "Author Name",
      type: "string",
      initialValue: "Prambanan Editorial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorImage",
      title: "Author Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "content",
      title: "Content (Body Text)",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
