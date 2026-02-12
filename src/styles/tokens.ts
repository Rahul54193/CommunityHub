export const colors = {
  primary: '#007AFF',
  secondary: '#5AC8FA',
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#FAFAFA',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
  },
  border: {
    light: '#E0E0E0',
    medium: '#D0D0D0',
    dark: '#CCCCCC',
  },
  feedback: {
    success: '#34C759',
    successLight: '#E8F5E9',
    warning: '#FF9500',
    warningLight: '#FFF3E0',
    error: '#E74C3C',
    errorLight: '#FFEBEE',
    info: '#007AFF',
  },
  disabled: '#CCCCCC',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  // Body
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  // Label
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  // Button
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};


export const theme = {
  colors,
  typography,
  spacing,
}
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
export default theme;
