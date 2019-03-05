import Typography from 'typography'

import 'normalize.css'

const typography = new Typography({
  googleFonts: [
    {
      name: 'Barlow',
      styles: ['400', '900'],
    },
    { name: 'Barlow', styles: ['400', '800'] },
  ],
  headerFontFamily: ['Georgia', 'serif'],
  bodyFontFamily: ['Libre Baskerville', 'serif'],
})

export default typography
