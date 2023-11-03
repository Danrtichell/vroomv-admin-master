import styled from 'styled-components'
import RobotoRegular from 'assets/fonts/Roboto/Roboto-Regular.ttf'
import { palette, font } from 'styled-theme'

const AppWrapper = styled.div`
  font-family: ${font('primary', 0)};
  height: 100%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  input,
  textarea,
  span,
  div,
  img,
  svg {
    &::selection {
      background: ${palette('primary', 0)};
      color: #fff;
    }
  }

  @font-face {
    font-family: Roboto;
    src: url(${RobotoRegular});
  }
`

export default AppWrapper
