'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, appConfig } from '@/lib/config';
import { 
  getBrowserLocale, 
  createTranslationFunction, 
  TranslationFunction,
  TranslationKey 
} from '@/lib/i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationFunction;
  isRTL: boolean;
  supportedLocales: readonly Locale[];
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// 本地存储的key
const LOCALE_STORAGE_KEY = 'tblog-locale';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(appConfig.i18n.defaultLocale);

  // 判断是否为RTL语言
  const isRTL = ['ar', 'he', 'fa'].includes(locale);

  // 初始化语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      
      if (savedLocale && appConfig.i18n.locales.includes(savedLocale)) {
        setLocaleState(savedLocale);
        updateDocumentLang(savedLocale);
      } else if (appConfig.i18n.enableBrowserDetection) {
        const browserLocale = getBrowserLocale();
        setLocaleState(browserLocale);
        updateDocumentLang(browserLocale);
        localStorage.setItem(LOCALE_STORAGE_KEY, browserLocale);
      } else {
        updateDocumentLang(appConfig.i18n.defaultLocale);
      }
    }
  }, []);

  // 更新文档语言属性
  const updateDocumentLang = useCallback((newLocale: Locale) => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = newLocale;
      document.documentElement.dir = ['ar', 'he', 'fa'].includes(newLocale) ? 'rtl' : 'ltr';
    }
  }, []);

  // 设置语言
  const setLocale = useCallback((newLocale: Locale) => {
    if (!appConfig.i18n.locales.includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`);
      return;
    }

    setLocaleState(newLocale);
    updateDocumentLang(newLocale);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  }, [updateDocumentLang]);

  // 创建翻译函数
  const t = createTranslationFunction(locale);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t,
    isRTL,
    supportedLocales: appConfig.i18n.locales,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// 自定义Hook
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}

// 导出翻译键类型，用于类型提示
export type { TranslationKey }; 