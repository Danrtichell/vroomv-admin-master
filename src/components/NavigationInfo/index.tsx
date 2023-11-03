import React from 'react'
import { Typography, IconButton, Breadcrumbs, Link } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import {
  Wrapper,
  CurrentPage,
  InfoContainer,
  BottomLine,
  RightContents,
  LeftContents
} from './style'

const NavigationInfo = (props: Props) => {
  const { backLink, leftAction } = props
  const history = useHistory()
  const { current, primary } = props

  const handleClick = () => {
    history.push(backLink as string)
  }

  return (
    <Wrapper>
      <RightContents>
        {/* <IconButton className="back-icon" onClick={handleClick}>
          <ArrowBack fontSize="large" />
        </IconButton> */}
        <InfoContainer>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href={backLink} onClick={handleClick}>
              {primary}
            </Link>
            <Typography color="textPrimary">{current}</Typography>
          </Breadcrumbs>
          <CurrentPage>{current}</CurrentPage>
          <BottomLine />
        </InfoContainer>
      </RightContents>
      <LeftContents>{leftAction}</LeftContents>
    </Wrapper>
  )
}

interface Props {
  primary: string
  current: string
  backLink?: string
  leftAction?: JSX.Element
}

NavigationInfo.defaultProps = {
  backLink: '/'
}

export default NavigationInfo
