import React from 'react'
import { FooterText, FooterWrapper, LogoContainer, Section } from './style'

const AppFooter = (): JSX.Element => {
  return (
    <FooterWrapper>
      <Section>
        <LogoContainer />
        <div>
          <FooterText>Cebu City 6000, Philippines</FooterText>
          <FooterText>
            Phone : +63.917.311.4015 | jeff@jsonstravelandtours.com
          </FooterText>
        </div>
      </Section>
      <Section alignItems="flex-end">
        <div>
          <FooterText>TERMS OF USE</FooterText>
          <FooterText>PRIVACY POLICY</FooterText>
        </div>
        <FooterText>C2020 VROOMv | All Rights Reserved</FooterText>
      </Section>
    </FooterWrapper>
  )
}

export default AppFooter
