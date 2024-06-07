export const locales = ["en", "es", "fr", "ru"] as const;
export type Locale = (typeof locales)[number];
