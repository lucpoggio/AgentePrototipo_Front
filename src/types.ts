export interface Message {
  id: string;
  text: string;
  is_user: boolean;
  time: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at?: string;
}

export type Page = 'home' | 'chat' | 'customization';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  primary: string;
  inputBackground: string;
  chatUserBg: string;
  chatAiBg: string;
  chatAiBorder: string;
  error: string;
  success: string;
}

export interface Theme {
  colors: ThemeColors;
}

export interface ThemeContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

export interface NavigationContextType {
  activePage: Page;
  setActivePage: (page: Page) => void;
}
