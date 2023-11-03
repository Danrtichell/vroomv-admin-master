import React from 'react'
import GoogleMapReact from 'google-map-react'

interface Prop {
  markers: any[]
}

const VehicleMap = ({ markers }: Prop) => {
  const center = {
    lat: 10.2987415,
    lng: 123.8653006
  }

  const createMapOptions = () => ({
    maxZoom: 18,
    minZoom: 10
  })

  return (
    <GoogleMapReact
      options={createMapOptions}
      bootstrapURLKeys={{ key: 'AIzaSyCkOOiicMlyEviYdXOqQKSk68uwEKZ3Nek' }}
      defaultCenter={center}
      defaultZoom={12}
    >
      {markers}
    </GoogleMapReact>
  )
}

export default VehicleMap
