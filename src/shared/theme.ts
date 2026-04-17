export const TOKENS = {
  sidebarWidth: '240px',
  leftPanelWidth: '280px',
  rightPanelWidth: '320px',
  colors: {
    primary: '#5E5CE6',
    textPrimary: '#1A1C2E',
    textSecondary: '#4A4D66',
    textMuted: '#8E92B2',
    background: '#F4F7FB',
    backgroundLight: '#FAFBFD',
    white: '#FFFFFF',
    border: '#E5E9F2',
    borderLight: '#F0F2F8',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
  },
  borderRadius: {
    small: '8px',
    medium: '10px',
    large: '12px',
    xl: '16px',
    pill: '100px',
  },
  shadows: {
    card: '0 2px 16px rgba(0,0,0,0.05)',
    hover: '0 4px 24px rgba(0,0,0,0.06)',
  },
} as const;

export type ColorKey = keyof typeof TOKENS.colors;
