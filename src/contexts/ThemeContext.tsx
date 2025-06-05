'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Theme, appConfig } from '@/lib/config';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | null;
  isSystemPreference: boolean;
  enableSystemPreference: () => void;
  disableSystemPreference: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// 本地存储的key
const THEME_STORAGE_KEY = 'tblog-theme';
const SYSTEM_PREFERENCE_KEY = 'tblog-use-system-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // 在客户端初始化时读取当前的主题
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return appConfig.theme.defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState<Theme | null>(null);
  const [isSystemPreference, setIsSystemPreference] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 检测系统主题偏好
  const detectSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // 应用主题到DOM
  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      // 移除所有主题类
      root.classList.remove('light', 'dark');
      
      // 添加新主题类
      root.classList.add(newTheme);
      
      // 更新CSS变量
      if (newTheme === 'dark') {
        root.style.setProperty('--background', '#0a0a0a');
        root.style.setProperty('--foreground', '#ededed');
      } else {
        root.style.setProperty('--background', '#ffffff');
        root.style.setProperty('--foreground', '#171717');
      }
    }
  }, []);

  // 设置主题
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    setIsSystemPreference(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      localStorage.setItem(SYSTEM_PREFERENCE_KEY, 'false');
    }
  }, [applyTheme]);

  // 切换主题
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  // 初始化主题 - 只在首次加载时执行
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      const savedSystemPreference = localStorage.getItem(SYSTEM_PREFERENCE_KEY) === 'true';
      const currentSystemTheme = detectSystemTheme();
      
      setSystemTheme(currentSystemTheme);
      setIsSystemPreference(savedSystemPreference);

      // 读取当前DOM的主题状态，避免重复设置
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      
      if (savedSystemPreference && appConfig.theme.enableSystemPreference) {
        setThemeState(currentSystemTheme);
        // 只有当前主题与系统主题不匹配时才应用
        if (currentTheme !== currentSystemTheme) {
          applyTheme(currentSystemTheme);
        }
      } else if (savedTheme && appConfig.theme.themes.includes(savedTheme)) {
        setThemeState(savedTheme);
        // 只有当前主题与保存的主题不匹配时才应用
        if (currentTheme !== savedTheme) {
          applyTheme(savedTheme);
        }
      } else {
        setThemeState(appConfig.theme.defaultTheme);
        // 只有当前主题与默认主题不匹配时才应用
        if (currentTheme !== appConfig.theme.defaultTheme) {
          applyTheme(appConfig.theme.defaultTheme);
        }
      }
      
      setIsInitialized(true);
    }
  }, [detectSystemTheme, applyTheme, isInitialized]);

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window !== 'undefined' && appConfig.theme.enableSystemPreference) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        setSystemTheme(newSystemTheme);
        
        if (isSystemPreference) {
          setThemeState(newSystemTheme);
          applyTheme(newSystemTheme);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [isSystemPreference, applyTheme]);

  // 启用系统偏好
  const enableSystemPreference = useCallback(() => {
    if (systemTheme) {
      setThemeState(systemTheme);
      applyTheme(systemTheme);
      setIsSystemPreference(true);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(SYSTEM_PREFERENCE_KEY, 'true');
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    }
  }, [systemTheme, applyTheme]);

  // 禁用系统偏好
  const disableSystemPreference = useCallback(() => {
    setIsSystemPreference(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(SYSTEM_PREFERENCE_KEY, 'false');
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
    systemTheme,
    isSystemPreference,
    enableSystemPreference,
    disableSystemPreference,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定义Hook
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
} 