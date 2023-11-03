import styled from 'styled-components'
import { AppContentWrapper as CommonWrapper } from 'components/shared/style'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`

export const AppContentWrapper = styled(CommonWrapper)`
  flex: 1;
`

export const MarkerLabel = styled.div`
  font-size: 10pt;
  color: #ffffff;
  width: 100%;
  text-align: center;
`

export const MarkerWrapper = styled.div`
  width: 3vw;
  height: 2.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const MarkerImage = styled.img`
  width: 100%;
  height: 100%;
`
