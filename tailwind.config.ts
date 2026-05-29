import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:             '#f4ebe3',
        'bg-deep':      '#ead9c9',
        'bg-cream':     '#faf4ec',
        ink:            '#2b1f17',
        'ink-soft':     '#6b574a',
        'ink-faint':    '#a8927f',
        terra:          '#b85c3d',
        'terra-deep':   '#6b4226',
        peach:          '#e8b89a',
        line:           '#d9c5b3',
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Cormorant Garamond', 'Times New Roman', 'serif'],
        script: ['var(--font-greatvibes)', 'Great Vibes', 'Dancing Script', 'cursive'],
        dance:  ['var(--font-dancing)', 'Dancing Script', 'cursive'],
      },
      fontSize: {
        'display': 'clamp(48px, 8vw, 108px)',
        'hero':    'clamp(36px, 4.6vw, 64px)',
        'script-lg': '64px',
        'script-xl': '96px',
      },
      letterSpacing: {
        widest2: '0.42em',
        wide2:   '0.32em',
        wide3:   '0.4em',
      },
    },
  },
  plugins: [],
};

export default config;
