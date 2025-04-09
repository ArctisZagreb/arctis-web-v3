// import { YtPreview } from "../components/sanity/youtube"; // Component not provided
import { defineField } from "sanity";

// youtube.js
export default defineField({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "videoDesc",
      type: "string",
      title: "Opis Videa (Video Description)",
    },
  ],
  // Preview removed as YtPreview component is not defined
  // preview: {
  //   select: {
  //     url: "url",
  //   },
  //   component: YtPreview // This component needs to be created
  // },
});
