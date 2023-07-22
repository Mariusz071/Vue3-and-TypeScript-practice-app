import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    aliases,
    defaultSet: 'fa',
    sets: {
      fa
    }
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
