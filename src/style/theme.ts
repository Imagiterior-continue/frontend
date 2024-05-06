import { extendTheme } from '@chakra-ui/react'
import { themeColor } from '../Data/color'

export const theme = extendTheme({
  fonts: {
    body: 'Noto Sans JP, sans-serif, Shippori Antique, sans-serif'
  },
  styles: {
    global: {
      body: {
        backgroundColor: themeColor.base,
        padding: 0,
        margin: 0
      }
    }
  }
})
