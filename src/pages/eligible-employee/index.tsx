import React, { useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper, PrimaryButton } from 'components/shared/style'
import { useHistory, useParams } from 'react-router-dom'
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
import { Edit, DeleteForever } from '@material-ui/icons'
import companyApi from 'api/company'
import eligibleEmployeeApi from 'api/eligibleEmployee'
import SearchBox from 'components/SearchBox'
import { DefaultUrlParams } from 'types'

const EligibleEmployeePage = () => {
  const history = useHistory()
  const urlParams: DefaultUrlParams = useParams()
  const [state, setState] = useState({
    eligibleEmployee: []
  })

  const getData = async () => {
    const {
      data: eligibleEmployee
    } = await companyApi.getEligibleEmployeesByCompanyId(urlParams.id)

    setState({ eligibleEmployee })
  }

  const handleEdit = (id: string) => {
    history.push(`/company/${urlParams.id}/eligible-employee/${id}/edit`)
  }

  const handleDelete = async (eligbleEmployee: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${eligbleEmployee.email}"?`
    )

    if (yes) {
      await eligibleEmployeeApi.delete(eligbleEmployee.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push(`/company/${urlParams.id}/eligible-employee/create`)
  }

  const getTitle = () => {
    if (history.location.state) {
      const locationState: any = history.location.state

      return `Eligible Employees for ${locationState.name}`
    }

    return 'Eligible Employees'
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current={getTitle()}
        primary="Home"
        leftAction={
          <PrimaryButton
            onClick={handleCreate}
            color="primary"
            variant="contained"
          >
            CREATE NEW ELIGIBLE EMPLOYEE
          </PrimaryButton>
        }
      />
      <AppContentWrapper>
        <SearchBox />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.eligibleEmployee.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)}>
                      <DeleteForever />
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

export default EligibleEmployeePage
