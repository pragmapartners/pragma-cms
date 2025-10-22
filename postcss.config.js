const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': ({
      stage: 0,
      preserve: true,
      autoprefixer: false,
      "browsers": [
				"baseline widely available "
			],
      features: {
        'logical-properties-and-values': false, 
        'prefers-color-scheme-query': true, 
        'gap-properties': false,
        'custom-properties': false,
        'place-properties': false,
        'not-pseudo-class': true,
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