export interface Theme {
  colors: {
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
  };
}

export const lightTheme: Theme = {
  colors: {
    background: '#F4F7FB',
    surface: '#FFFFFF',
    surfaceHover: '#F4F7FB',
    textPrimary: '#1A1C2E',
    textSecondary: '#4A4D66',
    textMuted: '#8E92B2',
    border: '#E5E9F2',
    borderLight: '#F0F2F8',
    primary: '#5E5CE6',  // This will be overridden by user selection
    inputBackground: '#FAFBFD',
    chatUserBg: '',  // Will be set dynamically to primaryColor
    chatAiBg: '#FFFFFF',
    chatAiBorder: '#F0F2F8',
    error: '#FF3B30',
    success: '#34C759',
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#0F1117',
    surface: '#1A1D29',
    surfaceHover: '#252836',
    textPrimary: '#E8E9EF',
    textSecondary: '#A0A3B5',
    textMuted: '#6B6F8C',
    border: '#2A2E3D',
    borderLight: '#252836',
    primary: '#5E5CE6',  // Will be overridden
    inputBackground: '#252836',
    chatUserBg: '',  // Will be set dynamically
    chatAiBg: '#252836',
    chatAiBorder: '#2A2E3D',
    error: '#FF453A',
    success: '#30D158',
  },
};
