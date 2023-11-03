import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 0 24px;
  background-color: #f8faff;

  li {
    a,
    p {
      display: block;
      color: #666666;
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 16px;
      height: 16px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  svg {
    color: #212121;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  nav {
    padding-left: 3px;
  }
`

export const CurrentPage = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 34px;
  line-height: 36px;
  color: #212121;
`

export const BottomLine = styled.div`
  height: 3px;
  background-color: #eaebee;
  margin-top: 17px;
  position: relative;

  &:after {
    content: ' ';
    position: absolute;
    background-color: #ea469a;
    height: 100%;
    width: 30%;
  }
`

export const RightContents = styled.div`
  display: flex;
  align-items: center;

  .back-icon {
    padding: 10px;
    margin-left: -10px;
    margin-right: 30px;
  }
`

export const LeftContents = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
`
