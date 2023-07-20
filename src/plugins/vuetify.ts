import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa'
  },
  theme: {
    themes: {
      light: {
        dark: true,
        colors: {
          primary: '#793CFF',
          secondary: '#3ADDDD',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          disabled: '#BBBBBB'
        }
      }
    }
  }
})
