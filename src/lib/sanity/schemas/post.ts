import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "externalNews",
      title: "External News",
      type: "object", // Changed from 'document'
      fields: [
        {
          name: "flag",
          title: "External News",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "link",
          type: "url",
          title: "Link URL",
          validation: (Rule) =>
            Rule.custom((field, context) => {
              // Correctly access the flag within the nested object
              const doc = context.document as any;
              if (doc?.externalNews?.flag && field === undefined) {
                return "Link URL is required when 'External News' is checked.";
              }
              return true;
            }),
          hidden: ({ parent }) => !parent?.flag, // Hide if flag is not checked
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "image",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        // Optional: Add alt text
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "externalImg",
      title: "External Image URL", // Clarified title
      type: "url",
      // Removed hotspot option as it's for Sanity images, not external URLs
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(), // Set initial value to now
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kratak opis vijesti", // Short Description
      type: "text", // Use text for potentially longer descriptions
      rows: 3,
      validation: (Rule) => Rule.required().max(300), // Add validation
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      hidden: ({ document }) => {
        // Use 'as any' to assert the type
        const doc = document as any;
        return doc?.externalNews?.flag;
      }, // Hide body if external news
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "image", // Use internal image for preview
      flag: "externalNews.flag",
      externalUrl: "externalNews.link",
    },
    prepare(selection) {
      const { author, flag, externalUrl } = selection;
      const subtitles = [
        author && `by ${author}`,
        flag && `EXTERNAL: ${externalUrl}`,
      ].filter(Boolean);

      return { ...selection, subtitle: subtitles.join(" | ") };
    },
  },
});
