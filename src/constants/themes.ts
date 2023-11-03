const themes = {
  normal: {
    styled: {
      theme: {
        palette: {
          primary: ['#689f48', '#98d076', '#39701b'],
          secondary: ['#7f489f'],
          grayscale: [
            '#bababa', // 0: GreyShade
            '#c1c1c1' // 1: GreyDark
          ],
          text: [
            '#002d40', // 0: Heading
            '#595959', // 1: HeadingLight
            '#979797', // 2: Text
            '#797979' // 3: TextDark
          ],
          border: [
            '#e9e9e9', // 0: Border
            '#d8d8d8', // 1: BorderDark
            '#ebebeb' // 2: BorderLight
          ]
        },
        fonts: {
          primary: 'Roboto'
        }
      }
    },
    material: {
      theme: {
        palette: {
          primary: {
            main: '#689f48',
            light: '#98d076',
            dark: '#39701b'
          },
          secondary: {
            main: '#7f489f'
          }
        },
        typography: {
          fontFamily: ['Roboto'].join(',')
        }
      }
    }
  },
  dark: {
    styled: {
      theme: {}
    },
    material: {
      theme: {}
    }
  },
  light: {
    styled: {
      theme: {}
    },
    material: {
      theme: {}
    }
  }
}

export default themes
