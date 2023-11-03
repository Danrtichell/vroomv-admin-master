import styled from 'styled-components'
import { palette } from 'styled-theme'

export const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${palette('primary', 2)};
  min-height: 100px;
  padding: 32px;
`
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 116px;

  .logo {
    height: 50px;
    width: 70px;
  }

  .name {
    width: 115px;
  }
`
interface SectionProp {
  justifyContent?: string
  alignItems?: string
}

export const Section = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: ${(props: SectionProp) => props.alignItems};
  justify-content: space-between;
`

export const FooterText = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.18px;
  color: #fbfcfd;
`
