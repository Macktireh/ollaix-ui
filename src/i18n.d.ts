// src/i18n.d.ts
import "i18next";
import type { UiTranslationType } from "@/i18n/ui";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: UiTranslationType;
  }
}
