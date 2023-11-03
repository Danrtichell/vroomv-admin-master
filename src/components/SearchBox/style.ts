import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 48px;
  box-shadow: 2px 4px 10px rgba(4, 35, 92, 0.08);
  border-radius: 4px;
  background-color: #ffffff;
  margin: 10px 0;

  svg {
    margin-left: 15px;
    margin-right: 12px;
  }

  input {
    border: 0;
    outline: none;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    padding: 0;
    min-width: 240px;
    height: 100%;
  }
`
