import { Locale, appConfig } from '@/lib/config';
import { zhTranslations } from './locales/zh';
import { enTranslations } from './locales/en';

// 定义翻译类型
export type TranslationKey = keyof typeof zhTranslations;
export type TranslationFunction = (key: TranslationKey, params?: Record<string, string | number>) => string;

// 翻译字典
const translations = {
  zh: zhTranslations,
  en: enTranslations,
} as const;

// 获取浏览器语言偏好
export function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return appConfig.i18n.defaultLocale;
  }

  const browserLang = window.navigator.language.toLowerCase();
  
  // 匹配支持的语言
  for (const locale of appConfig.i18n.locales) {
    if (browserLang.startsWith(locale)) {
      return locale;
    }
  }
  
  return appConfig.i18n.defaultLocale;
}

// 获取翻译文本
export function getTranslation(locale: Locale, key: TranslationKey, params?: Record<string, string | number>): string {
  const translation = translations[locale]?.[key] || translations[appConfig.i18n.defaultLocale][key] || key;
  
  if (!params) {
    return translation;
  }
  
  // 替换参数
  return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
    return params[paramKey]?.toString() || match;
  });
}

// 创建翻译函数
export function createTranslationFunction(locale: Locale): TranslationFunction {
  return (key: TranslationKey, params?: Record<string, string | number>) => {
    return getTranslation(locale, key, params);
  };
}

// 导出支持的语言列表
export const supportedLocales = appConfig.i18n.locales;
export const defaultLocale = appConfig.i18n.defaultLocale;

// 导出类型
export type { Locale }; 