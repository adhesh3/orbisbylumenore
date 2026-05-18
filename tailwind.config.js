/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: '#1B2A4A',
          50: '#F4F6FB',
          100: '#E6EAF3',
          200: '#C2CCE0',
          300: '#9CAACB',
          400: '#5C72A1',
          500: '#33487A',
          600: '#1B2A4A',
          700: '#15223C',
          800: '#0F1A2E',
          900: '#0A1220',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50: '#FBF7EC',
          100: '#F5EBCB',
          200: '#EAD697',
          300: '#DEBF63',
          400: '#C9A84C',
          500: '#A88934',
          600: '#7E6627',
          700: '#5A481B',
        },
        gain: '#2E7D52',
        loss: '#C0392B',
        canvas: '#FAFAFA',
        ink: '#0F1A2E',
        // shadcn-like semantic tokens
        border: 'hsl(220 14% 92%)',
        input: 'hsl(220 14% 92%)',
        ring: 'hsl(220 60% 25%)',
        background: '#FAFAFA',
        foreground: '#0F1A2E',
        muted: {
          DEFAULT: '#F1F3F8',
          foreground: '#5C6577',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F1A2E',
        },
        accent: {
          DEFAULT: '#F5EBCB',
          foreground: '#5A481B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '6px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 26, 46, 0.04), 0 4px 12px rgba(15, 26, 46, 0.04)',
        pop: '0 8px 30px rgba(15, 26, 46, 0.10)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
