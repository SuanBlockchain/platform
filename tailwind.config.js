/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#6366f1',
          600: '#4f46e5',
          100: '#e0e7ff',
          bg: '#f4f7fe',
        },
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          500: '#737373',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          dark: '#292929',
          medium: '#7c7c80',
          light: '#8c8c94',
        },
        success: {
          100: '#dcfce7',
          500: '#22c55e',
          800: '#166534',
        },
        warning: {
          100: '#fef9c3',
          500: '#eab308',
          800: '#854d0e',
        },
        danger: {
          100: '#fee2e2',
          500: '#ef4444',
          800: '#991b1b',
        },
        info: {
          100: '#e0f2fe',
          500: '#0ea5e9',
          800: '#075985',
        }
      },
      boxShadow: {
        'inner-light': 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
