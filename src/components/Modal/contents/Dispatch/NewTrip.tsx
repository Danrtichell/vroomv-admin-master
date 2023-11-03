import React, { useEffect, useState } from 'react'
import vehicleApi from 'api/vehicle'
import {
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  Radio
} from '@material-ui/core'
import { PaperContainer, LabelWrapper } from './newtrip.style'

interface Prop {
  onVehicleSelected: (id: string) => void
  selectedVehicle: string | null
}

const NewTrip = (prop: Prop) => {
  const { onVehicleSelected, selectedVehicle } = prop
  const [vehicles, setVehicles] = useState([] as any[])

  const getVehicles = async () => {
    const { data } = await vehicleApi.getAll()

    setVehicles(data)
  }

  useEffect(() => {
    getVehicles()
  }, [])

  const handleSelectVehicle = (value: string) => {
    onVehicleSelected(value)
  }

  return (
    <PaperContainer>
      <LabelWrapper>Select the vehicle for this trip:</LabelWrapper>
      <TableContainer className="table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Van No.</TableCell>
              <TableCell>Plate No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle: any) => (
              <TableRow
                hover
                role="checkbox"
                aria-checked={vehicle.id === selectedVehicle}
                selected={vehicle.id === selectedVehicle}
                key={vehicle.id}
                onClick={() => handleSelectVehicle(vehicle.id)}
              >
                <TableCell>
                  <Radio
                    checked={vehicle.id === selectedVehicle}
                    onChange={(evt: any) =>
                      handleSelectVehicle(evt.target.value)
                    }
                    value={vehicle.id}
                  />
                </TableCell>
                <TableCell>{vehicle.vanNumber}</TableCell>
                <TableCell>{vehicle.plateNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContainer>
  )
}

export default NewTrip
