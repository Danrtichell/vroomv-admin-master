import styled from 'styled-components'

export const ModuleListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`

export const ModuleListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 35px;

  img {
    width: 65px;
    height: 40px;
    margin-bottom: 20px;
  }

  .item-name {
    margin-bottom: 15px;
  }

  button {
    width: 128px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
  }
`
