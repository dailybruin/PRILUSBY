import Typography from 'typography'

import 'normalize.css'

const typography = new Typography({
  googleFonts: [
    {
      name: 'Barlow',
      styles: ['400', '900'],
    },
    {
      name: 'EB Garamond',
      styles: ['400'],
    },
    {
      name: 'Source Serif Pro',
      styles: ['400'],
    },
    { name: 'Barlow', styles: ['400', '500', '600', '800', '900'] },
  ],
  headerFontFamily: ['Georgia', 'serif'],
  bodyFontFamily: ['Libre Baskerville', 'serif'],
})

export default typography
