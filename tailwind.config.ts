
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        monochrome: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        black: {
          50: '#f2f2f2',
          100: '#e6e6e6', 
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#000000', // Main black
          600: '#0d0d0d',
          700: '#1a1a1a',
          800: '#262626',
          900: '#333333',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities, matchUtilities, theme }) {
      // This adds direct support for opacity modifiers like border-black/10
      const colors = theme('colors');
      
      // Create opacified versions of all colors for border, text, and bg
      const utilities = {};
      
      Object.entries(colors).forEach(([colorName, colorValue]) => {
        if (typeof colorValue === 'object') {
          Object.entries(colorValue).forEach(([shade, value]) => {
            if (shade !== 'DEFAULT') {
              utilities[`.border-${colorName}-${shade}/10`] = { borderColor: `color-mix(in srgb, ${value} 10%, transparent)` };
              utilities[`.border-${colorName}-${shade}/20`] = { borderColor: `color-mix(in srgb, ${value} 20%, transparent)` };
              utilities[`.border-${colorName}-${shade}/30`] = { borderColor: `color-mix(in srgb, ${value} 30%, transparent)` };
              utilities[`.border-${colorName}-${shade}/40`] = { borderColor: `color-mix(in srgb, ${value} 40%, transparent)` };
              utilities[`.border-${colorName}-${shade}/50`] = { borderColor: `color-mix(in srgb, ${value} 50%, transparent)` };
              utilities[`.border-${colorName}-${shade}/60`] = { borderColor: `color-mix(in srgb, ${value} 60%, transparent)` };
              utilities[`.border-${colorName}-${shade}/70`] = { borderColor: `color-mix(in srgb, ${value} 70%, transparent)` };
              utilities[`.border-${colorName}-${shade}/80`] = { borderColor: `color-mix(in srgb, ${value} 80%, transparent)` };
              utilities[`.border-${colorName}-${shade}/90`] = { borderColor: `color-mix(in srgb, ${value} 90%, transparent)` };
              
              utilities[`.bg-${colorName}-${shade}/5`] = { backgroundColor: `color-mix(in srgb, ${value} 5%, transparent)` };
              utilities[`.bg-${colorName}-${shade}/10`] = { backgroundColor: `color-mix(in srgb, ${value} 10%, transparent)` };
              utilities[`.bg-${colorName}-${shade}/20`] = { backgroundColor: `color-mix(in srgb, ${value} 20%, transparent)` };
              utilities[`.bg-${colorName}-${shade}/30`] = { backgroundColor: `color-mix(in srgb, ${value} 30%, transparent)` };
              utilities[`.bg-${colorName}-${shade}/40`] = { backgroundColor: `color-mix(in srgb, ${value} 40%, transparent)` };
              utilities[`.bg-${colorName}-${shade}/50`] = { backgroundColor: `color-mix(in srgb, ${value} 50%, transparent)` };
            }
          });
        } else if (colorName === 'black' || colorName === 'white') {
          utilities[`.border-${colorName}/5`] = { borderColor: `color-mix(in srgb, ${colorValue} 5%, transparent)` };
          utilities[`.border-${colorName}/10`] = { borderColor: `color-mix(in srgb, ${colorValue} 10%, transparent)` };
          utilities[`.border-${colorName}/20`] = { borderColor: `color-mix(in srgb, ${colorValue} 20%, transparent)` };
          utilities[`.border-${colorName}/30`] = { borderColor: `color-mix(in srgb, ${colorValue} 30%, transparent)` };
          utilities[`.border-${colorName}/40`] = { borderColor: `color-mix(in srgb, ${colorValue} 40%, transparent)` };
          utilities[`.border-${colorName}/50`] = { borderColor: `color-mix(in srgb, ${colorValue} 50%, transparent)` };
          utilities[`.border-${colorName}/60`] = { borderColor: `color-mix(in srgb, ${colorValue} 60%, transparent)` };
          utilities[`.border-${colorName}/70`] = { borderColor: `color-mix(in srgb, ${colorValue} 70%, transparent)` };
          utilities[`.border-${colorName}/80`] = { borderColor: `color-mix(in srgb, ${colorValue} 80%, transparent)` };
          utilities[`.border-${colorName}/90`] = { borderColor: `color-mix(in srgb, ${colorValue} 90%, transparent)` };
          
          utilities[`.bg-${colorName}/5`] = { backgroundColor: `color-mix(in srgb, ${colorValue} 5%, transparent)` };
          utilities[`.bg-${colorName}/10`] = { backgroundColor: `color-mix(in srgb, ${colorValue} 10%, transparent)` };
          utilities[`.bg-${colorName}/20`] = { backgroundColor: `color-mix(in srgb, ${colorValue} 20%, transparent)` };
          utilities[`.bg-${colorName}/30`] = { backgroundColor: `color-mix(in srgb, ${colorValue} 30%, transparent)` };
          utilities[`.bg-${colorName}/40`] = { backgroundColor: `color-mix(in srgb, ${colorValue} 40%, transparent)` };
          utilities[`.bg-${colorName}/50`] = { backgroundColor: `color-mix(in srgb, ${colorValue} 50%, transparent)` };
          
          utilities[`.text-${colorName}/50`] = { color: `color-mix(in srgb, ${colorValue} 50%, transparent)` };
          utilities[`.text-${colorName}/60`] = { color: `color-mix(in srgb, ${colorValue} 60%, transparent)` };
          utilities[`.text-${colorName}/70`] = { color: `color-mix(in srgb, ${colorValue} 70%, transparent)` };
          utilities[`.text-${colorName}/80`] = { color: `color-mix(in srgb, ${colorValue} 80%, transparent)` };
          utilities[`.text-${colorName}/90`] = { color: `color-mix(in srgb, ${colorValue} 90%, transparent)` };
        }
      });
      
      addUtilities(utilities);
    }
  ],
} satisfies Config;
