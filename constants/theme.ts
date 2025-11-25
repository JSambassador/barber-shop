import { Platform } from "react-native";

const primaryLight = "#C5A572";
const primaryDark = "#D4B886";

export const Colors = {
  light: {
    primary: "#C5A572",
    text: "#1A1A1A",
    textSecondary: "#666666",
    buttonText: "#FFFFFF",
    tabIconDefault: "#999999",
    tabIconSelected: primaryLight,
    link: "#C5A572",
    backgroundRoot: "#F8F8F8",
    backgroundDefault: "#FFFFFF",
    backgroundSecondary: "#F8F8F8",
    backgroundTertiary: "#F0F0F0",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
    border: "#E0E0E0",
  },
  dark: {
    primary: "#D4B886",
    text: "#ECEDEE",
    textSecondary: "#999999",
    buttonText: "#1A1A1A",
    tabIconDefault: "#666666",
    tabIconSelected: primaryDark,
    link: "#D4B886",
    backgroundRoot: "#1A1A1A",
    backgroundDefault: "#252525",
    backgroundSecondary: "#2F2F2F",
    backgroundTertiary: "#3A3A3A",
    success: "#66BB6A",
    warning: "#FFA726",
    error: "#EF5350",
    info: "#42A5F5",
    border: "#3A3A3A",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 56,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 22,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
