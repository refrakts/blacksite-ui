import type { Preview } from "@storybook/react";

import "../app/globals.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "blacksite",
      values: [
        { name: "blacksite", value: "hsl(222 28% 6%)" },
        { name: "elevated", value: "hsl(220 22% 9%)" },
        { name: "overlay", value: "hsl(218 18% 12%)" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|foreground|border|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Overview",
          "Theme",
          "Primitives",
          "Tactical",
          "Charts",
          "Maps",
          "Blocks",
        ],
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
