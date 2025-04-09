import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        { title: "Quote Author", value: "cite" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" }, // Added underline
          { title: "Strike", value: "strike-through" }, // Added strike-through
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    }),
    // Include youtube object type directly
    defineArrayMember({
      type: "youtube", // Reference the youtube object type defined in youtube.ts
    }),
    // Inline image definition
    defineArrayMember({
      name: "inlineImage", // Added name
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          title: "Opis Slike (Image Description / Alt Text)",
          name: "alt", // Changed name to 'alt' for standard practice
          type: "string",
          validation: (Rule) => Rule.required(), // Alt text should be required for accessibility
        },
      ],
    }),
  ],
});
