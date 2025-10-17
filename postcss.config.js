const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-import': {},
    'postcss-preset-env': ({
      stage: 0,
      autoprefixer: false,
      features: {
        'logical-properties-and-values': false, 
        'prefers-color-scheme-query': false, 
        'gap-properties': false,
        'custom-properties': false,
        'place-properties': false,
        'not-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'color-functional-notation': false,
        'custom-media-queries': {preserve: true},
        'double-position-gradients': false,
      }
    }),
    'cssnano': ({
      preset: 'default',
    }),
  },
}

export default config