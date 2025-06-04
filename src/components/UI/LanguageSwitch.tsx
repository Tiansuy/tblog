'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Locale } from '@/lib/config';

interface LanguageSwitchProps {
  className?: string;
  showLabel?: boolean;
}

export default function LanguageSwitch({ className = '', showLabel = false }: LanguageSwitchProps) {
  const { locale, setLocale, t, supportedLocales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getLanguageName = (loc: Locale) => {
    const names: Record<Locale, string> = {
      'zh': '中文',
      'en': 'English',
    };
    return names[loc] || loc;
  };

  const getLanguageFlag = (loc: Locale) => {
    const flags: Record<Locale, string> = {
      'zh': '🇨🇳',
      'en': '🇺🇸',
    };
    return flags[loc] || '🌐';
  };

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
        title={t('language.switch')}
        aria-label={t('language.switch')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-base">
          {getLanguageFlag(locale)}
        </span>
        {showLabel && (
          <span className="text-foreground">
            {getLanguageName(locale)}
          </span>
        )}
        <svg 
          className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border py-1 z-50">
          {supportedLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted flex items-center gap-3 ${
                locale === loc 
                  ? 'bg-muted text-primary' 
                  : 'text-card-foreground'
              }`}
            >
              <span className="text-base">
                {getLanguageFlag(loc)}
              </span>
              <span>
                {getLanguageName(loc)}
              </span>
              {locale === loc && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 