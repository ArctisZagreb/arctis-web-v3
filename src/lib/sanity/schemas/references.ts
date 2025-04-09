import { defineField, defineType } from "sanity";

export default defineType({
  name: "references",
  title: "References",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "object", // Changed from 'document'
      fields: [
        {
          name: "name",
          title: "Client Name",
          type: "string",
        },
        {
          name: "url",
          title: "website url",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "typeOfWork",
      title: "Type Of Work",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        // Add source for slug generation if desired
        source: "client.name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "logo",
      title: "Client Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "servicesProvided",
      title: "Services Provided",
      type: "array",
      of: [
        {
          name: "service",
          title: "Service",
          type: "object", // Changed from 'document'
          fields: [
            {
              name: "serviceName",
              title: "Service Name",
              type: "string",
            },
            {
              name: "subservices",
              title: "Subservices List",
              type: "array",
              of: [
                {
                  // Removed name here, direct string array is simpler
                  title: "Subservice Name",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          name: "galleryImage", // Give the array item a name
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            // Optional: Add alt text field
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
    }),
  ],
});
