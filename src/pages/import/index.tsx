import React, { useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper, PrimaryButton } from 'components/shared/style'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  IconButton
} from '@material-ui/core'
import { Info } from '@material-ui/icons'
import importApi from 'api/import'
import SearchBox from 'components/SearchBox'
import { resolveImportStatus } from 'utils/import'

const Page = () => {
  const history = useHistory()
  const [state, setState] = useState({
    imports: []
  })

  const getData = async () => {
    const { data: imports } = await importApi.getAll()

    setState({ imports })
  }

  const handleInfoClicked = (id: string) => {
    history.push(`/bookings-import/${id}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo backLink="/" current="Imports" primary="Home" />
      <AppContentWrapper>
        <SearchBox />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Cannot be imported</TableCell>
                <TableCell align="left">Total number of rows</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">View Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.imports.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.date).format('LLL')}
                  </TableCell>
                  <TableCell align="left">{row.failed}</TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                  <TableCell align="left">
                    {resolveImportStatus(row.status)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleInfoClicked(row.id)}
                      disabled={row.status !== 2}
                    >
                      <Info />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppContentWrapper>
    </div>
  )
}

export default Page
