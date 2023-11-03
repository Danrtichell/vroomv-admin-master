import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding-top: 10%;
`

export const FieldWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  margin-bottom: 10px;
`

export const FieldWrapperRight = styled.div`
  max-width: 300px;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`

export const ErrorWrapper = styled.div`
  color: red;
  margin-bottom: 10px;
`
