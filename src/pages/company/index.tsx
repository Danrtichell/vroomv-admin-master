import React, { useEffect, useState } from 'react'
import NavigationInfo from 'components/NavigationInfo'
import { AppContentWrapper, PrimaryButton } from 'components/shared/style'
import { useHistory } from 'react-router-dom'
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
import { Edit, DeleteForever, People as PeopleIcon } from '@material-ui/icons'
import companyApi from 'api/company'
import SearchBox from 'components/SearchBox'

const CompanyPage = () => {
  const history = useHistory()
  const [state, setState] = useState({
    company: []
  })

  const getData = async () => {
    const { data: company } = await companyApi.getAll()

    setState({ company })
  }

  const handleEdit = (company: any) => {
    history.push(`/company/edit/${company.id}`, {
      name: company.name
    })
  }

  const handleDelete = async (company: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(`Are you sure you want to delete "${company.name}"?`)

    if (yes) {
      await companyApi.delete(company.id)
      getData()
    }
  }

  const handleViewEligibleEmployees = (company: any) => {
    history.push(`/company/${company.id}/eligible-employee`, company)
  }

  const handleCreate = () => {
    history.push('/company/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Company"
        primary="Home"
        leftAction={
          <PrimaryButton
            onClick={handleCreate}
            color="primary"
            variant="contained"
          >
            CREATE NEW Company
          </PrimaryButton>
        }
      />
      <AppContentWrapper>
        <SearchBox />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.company.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewEligibleEmployees(row)}
                    >
                      <PeopleIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(row)}>
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

export default CompanyPage
