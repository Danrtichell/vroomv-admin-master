import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  CircularProgress,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell
} from '@material-ui/core'
import importApi from 'api/import'
import NavigationInfo from 'components/NavigationInfo'
import {
  ActionButtonsWrapper,
  AppContentWrapper,
  PrimaryButton
} from 'components/shared/style'
import { trimCommas } from 'utils/strings'
import { DefaultUrlParams } from 'types'
import {
  PaperWrapper,
  ProcessingWrapper,
  SmallBox,
  SmallBoxContainer
} from './style'

const Page = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [isProcessing, toggleProcessing] = useState(false)
  const [failedRows, setFailedRows] = useState([])
  const [importData, setImport] = useState({
    total: 0,
    failed: 0
  })

  const getData = async () => {
    const { data: importFile } = await importApi.getById(urlParams.id)
    const { data } = await importApi.getFailedBookingImports()

    setFailedRows(data)
    setImport(importFile)
  }

  const handleProceed = async () => {
    toggleProcessing(true)
    await importApi.acceptBatch(urlParams.id)

    setTimeout(() => {
      toggleProcessing(false)
      history.push('/import')
    }, 3000)
  }

  const handleAbort = () => {
    toggleProcessing(true)
    importApi.abortBatch(urlParams.id)

    setTimeout(() => {
      toggleProcessing(false)
      history.push('/import')
    }, 3000)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <NavigationInfo
        backLink="/import"
        current="Booking Import Details"
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              disabled={isProcessing}
              onClick={handleProceed}
              color="primary"
              variant="contained"
            >
              Proceed
            </PrimaryButton>
            <PrimaryButton
              disabled={isProcessing}
              onClick={handleAbort}
              color="secondary"
              variant="contained"
            >
              Abort
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        {isProcessing ? (
          <ProcessingWrapper>
            <CircularProgress />
            <span>Processing, please wait...</span>
          </ProcessingWrapper>
        ) : null}
        <PaperWrapper>
          <SmallBoxContainer>
            <SmallBox>
              <h3>Total</h3>
              <span>{importData.total}</span>
            </SmallBox>
            <SmallBox>
              <h3>Errors</h3>
              <span>{importData.failed}</span>
            </SmallBox>
          </SmallBoxContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" align="center">
                  <h2>Here's the list of rows that cannot be imported:</h2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {failedRows.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{trimCommas(row.comment)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PaperWrapper>
      </AppContentWrapper>
    </div>
  )
}

export default Page
