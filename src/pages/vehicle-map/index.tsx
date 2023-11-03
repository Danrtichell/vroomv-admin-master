import React, { useEffect, useState } from 'react'
import vehicleApi from 'api/vehicle'
import NavigationInfo from 'components/NavigationInfo'
import { ActionButtonsWrapper, PrimaryButton } from 'components/shared/style'
import { useHistory } from 'react-router-dom'
import Map from 'pages/vehicle-map/map'
import { Wrapper, AppContentWrapper } from './style'
import VehicleMarker from './vehicle-marker'

const Page = () => {
  const history = useHistory()
  const [state, setState] = useState({
    markers: []
  })

  const getVehicles = async () => {
    const { data: vehicles } = await vehicleApi.getAll()

    const markers = vehicles.map((vehicle: any) => (
      <VehicleMarker
        key={vehicle.plateNumber}
        plateNumber={vehicle.plateNumber}
        lat={vehicle.lat}
        lng={vehicle.lng}
      />
    ))

    setState({ ...state, markers })
  }

  useEffect(() => {
    getVehicles()
  }, [])

  return (
    <Wrapper>
      <NavigationInfo
        backLink="/vehicles"
        current="Vehicle Map"
        primary="Home"
        leftAction={
          <ActionButtonsWrapper>
            <PrimaryButton
              onClick={() => history.push('/vehicles')}
              color="primary"
              variant="contained"
            >
              Back to list
            </PrimaryButton>
          </ActionButtonsWrapper>
        }
      />
      <AppContentWrapper>
        <Map markers={state.markers} />
      </AppContentWrapper>
    </Wrapper>
  )
}

export default Page
