import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const blacksite = create({
  base: "dark",
  brandTitle: "Blacksite UI",
  brandUrl: "/",
  brandTarget: "_self",

  colorPrimary: "hsl(174 72% 56%)",
  colorSecondary: "hsl(212 90% 62%)",

  appBg: "hsl(222 28% 6%)",
  appContentBg: "hsl(220 22% 9%)",
  appBorderColor: "hsl(218 14% 18%)",
  appBorderRadius: 4,

  textColor: "hsl(210 14% 92%)",
  textInverseColor: "hsl(220 28% 6%)",
  textMutedColor: "hsl(215 12% 65%)",

  barTextColor: "hsl(215 12% 65%)",
  barSelectedColor: "hsl(174 72% 56%)",
  barBg: "hsl(220 22% 9%)",

  inputBg: "hsl(218 14% 14%)",
  inputBorder: "hsl(218 14% 18%)",
  inputTextColor: "hsl(210 14% 92%)",
  inputBorderRadius: 3,

  fontBase: "Inter, ui-sans-serif, system-ui, sans-serif",
  fontCode: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
});

addons.setConfig({ theme: blacksite });
