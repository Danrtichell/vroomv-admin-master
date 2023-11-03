import styled from 'styled-components'
import {
  Button,
  FormControl,
  IconButton as MaterialIconButton,
  Paper as MaterialPaper,
  Select as MaterialSelect,
  TextField as MaterialTextField,
  TableContainer as MaterialTableContainer
} from '@material-ui/core'

export const Wrapper = styled.div`
  padding: 24px;
`

export const PrimaryButton = styled(Button)`
  && {
    border-radius: 3.5px;
    padding: 16px 31px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    box-shadow: 2px 4px 10px rgba(4, 35, 92, 0.08);

    &:hover {
      color: #fbfcfd !important;
      background: #4f658d !important;
    }
  }
`

export const IconButton = styled(MaterialIconButton)`
  && {
    box-shadow: 2px 4px 10px rgba(4, 35, 92, 0.08);
    border-radius: 4px;
    color: #04235c;
    background-color: #ffffff;
  }
`

export const CircularIconButton = styled(MaterialIconButton)`
  && {
    box-shadow: 2px 4px 10px rgba(4, 35, 92, 0.08);
    border-radius: 50%;
    background: #04235c;
    color: #ffffff;
    width: 24px;
    height: 24px;

    &:hover {
      color: #fbfcfd !important;
      background: #4f658d !important;
    }
  }
`

export const Paper = styled(MaterialPaper)`
  padding: 24px;
`

export const Select = styled(MaterialSelect)`
  && {
    padding: 4px 12px;
    height: inherit;
    box-sizing: border-box;
    min-width: 94px;
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    user-select: none;

    &::before,
    &::after {
      content: none;
    }

    .MuiSelect-select {
      padding: 0;
      height: 32px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      &:focus {
        background-color: transparent;
      }
    }
  }
`

export const RedSelect = styled(Select)`
  && {
    padding: 4px 12px;
    height: inherit;
    box-sizing: border-box;
    min-width: 94px;
    background-color: #ffffff;
    border: 2px solid #ea469a;
    box-sizing: border-box;
    border-radius: 44px;
    outline: none;
    user-select: none;

    .MuiSelect-select {
      padding: 0;
      height: 24px;
    }

    &::before,
    &::after {
      content: none;
    }
  }
`

export const TextField = styled(MaterialTextField)`
  && {
    input {
      padding: 4px 12px;
      height: inherit;
      box-sizing: border-box;
      min-width: 94px;
      background-color: #ffffff;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
      user-select: none;

      label {
        display: none;
      }

      &::before,
      &::after {
        content: none;
      }
    }

    .MuiInput-underline:before,
    .MuiInput-underline:after {
      content: none;
    }
  }
`

export const InlineLabelFormControl = styled(FormControl)`
  && {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 0 12px;

    .MuiInput-root {
      margin: 0;
      padding: 0;
      flex: 1;
      border: 0;
      display: flex;

      &::before {
        content: attr(data-label);
        position: relative;
        margin: 0;
        padding: 0;
        margin-right: 8px;
        border: 0;
        text-decoration: none;
      }

      .MuiInputBase-input.MuiInput-input {
        border: 0;
      }
    }

    .MuiTextField-root {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 0;
      padding-right: 0;
      margin: 0;
      margin-right: -12px;

      &::before {
        content: attr(data-label);
        position: relative;
        margin: 0;
        padding: 0;
        margin-right: 8px;
        border: 0;
        text-decoration: none;
      }
    }
  }
`

export const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
`

export const AppContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`

export const ActionButtonsWrapper = styled.div`
  display: flex;

  & > button {
    margin-right: 10px;
  }
`

export const PaperFlexWrapper = styled(MaterialPaper)`
  display: flex;
  align-items: center;
  padding: 20px;
`

export const FlexWrapper = styled.div`
  display: flex;
  padding: 20px;
`

export const TableContainer = styled(MaterialTableContainer)`
  && {
    height: 100%;
    border: 0;

    .MuiDataGrid-root {
      border: 0;
    }

    .MuiTableCell-head {
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 39px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #666666;
    }

    div.MuiDataGrid-row,
    div.MuiDataGrid-cell {
      max-height: 36px !important;
      min-height: 36px !important;
      line-height: 36px !important;
      outline: none;
    }

    .MuiDataGrid-colCellMoving {
      background-color: #ffffff;
    }

    .MuiDataGrid-columnsContainer {
      max-height: 36px !important;
      min-height: 36px !important;

      .MuiDataGrid-colCellTitle,
      .MuiTableCell-head {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 39px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #666666;
      }
    }

    .MuiDataGrid-iconSeparator {
      display: none;
    }
  }
`
