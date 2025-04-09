import { defineField, defineType } from "sanity";

export default defineType({
  name: "archibusProducts",
  title: "Archibus Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Main Menu Name",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(80),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headerImg",
      title: "Header Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subMenuItem",
      title: "Sub Menu List",
      type: "array",
      of: [
        {
          name: "subMenuItemObject", // Give the array item a name
          title: "Sub Menu Item",
          type: "object", // Changed from 'document'
          fields: [
            defineField({
              name: "name",
              title: "Sub Menu Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug", // Add slug for navigation if needed
              title: "Slug",
              type: "slug",
              options: {
                source: "name",
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "blockContent",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    // Add preview for easier identification
    select: {
      title: "name",
      subtitle: "displayOrder",
      media: "icon",
    },
  },
});
