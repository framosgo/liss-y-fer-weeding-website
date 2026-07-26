import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        olive: '#767258',
        rose: '#c6908f',
        burgundy: '#470d13',
        burdeos: {
          DEFAULT: '#800020',
          hover: '#5c0017'
        },
        terracotta: '#bc5830',
        mustard: '#c69138'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        bloom: '0 24px 80px rgba(71, 13, 19, 0.18)'
      },
      backgroundImage: {
        linen:
          'linear-gradient(135deg, rgba(198,144,143,.16), rgba(130,130,86,.08)), radial-gradient(circle at 50% 0%, rgba(198,145,56,.16), transparent 36%)'
      }
    }
  },
  plugins: []
} satisfies Config;
