import React, { ChangeEvent, useEffect, useState } from 'react'
import moment from 'moment'
import NavigationInfo from 'components/NavigationInfo'
import {
  AppContentWrapper,
  ActionButtonsWrapper,
  PrimaryButton
} from 'components/shared/style'
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
import { Edit, DeleteForever } from '@material-ui/icons'
import claimableApi from 'api/claimable'
import SearchBox from 'components/SearchBox'
import { applyFilter } from 'utils/filtering'
import { prettifyName } from 'utils/user'

const Page = () => {
  const history = useHistory()
  const [state, setState] = useState({
    claimables: []
  })
  const [search, setSearch] = useState('')

  const getData = async () => {
    const { data: claimables } = await claimableApi.getAll()

    setState({ claimables })
  }

  const handleEdit = (id: string) => {
    history.push(`/claimables/edit/${id}`)
  }

  const handleDelete = async (vehicle: any) => {
    /* eslint-disable-next-line no-restricted-globals */
    const yes = confirm(
      `Are you sure you want to delete "${vehicle.plateNumber}"?`
    )

    if (yes) {
      await claimableApi.delete(vehicle.id)
      getData()
    }
  }

  const handleCreate = () => {
    history.push('/claimables/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <NavigationInfo
        backLink="/"
        current="Claimables"
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              onClick={handleCreate}
              color="primary"
              variant="contained"
            >
              CREATE NEW CLAIMABLE
            </PrimaryButton>
            <PrimaryButton
              onClick={() => history.push('/claimables')}
              color="secondary"
              variant="contained"
            >
              VIEW MAP
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        <SearchBox
          value={search}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setSearch(evt.target.value)
          }
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Count</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applyFilter(state.claimables, search).map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell scope="row">{row.description}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.count}</TableCell>
                  <TableCell align="left">{row.image}</TableCell>
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

export default Page
