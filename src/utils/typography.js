import Typography from 'typography'

import 'normalize.css'

const typography = new Typography({
  googleFonts: [
    {
      name: 'Libre Baskerville',
      styles: ['400'],
    },
    {
      name: 'EB Garamond',
      styles: ['400'],
    },
    {
      name: 'Barlow',
      styles: ['400,500,600,800'],
    }
  ],
  headerFontFamily: ['Georgia', 'serif'],
  bodyFontFamily: ['Libre Baskerville', 'serif'],
})

export default typography
