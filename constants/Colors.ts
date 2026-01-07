const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  // Midnight Theme
  midnight: {
    background: '#050505',
    card: '#121212',
    text: '#E0E0E0',
    accent: '#FF3B30', // Warning Red
    muted: '#636366',
    gold: '#FFD60A',
    success: '#34C759',
  },
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
