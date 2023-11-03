import React from 'react'
import Van from 'assets/images/van.png'
import { MarkerWrapper, MarkerImage, MarkerLabel } from './style'

interface Prop {
  lat?: number
  lng?: number
  plateNumber?: string
}

const VehicleMarker = (prop: Prop) => {
  const { plateNumber } = prop

  return (
    <MarkerWrapper>
      <MarkerLabel>{plateNumber}</MarkerLabel>
      <MarkerImage src={Van} />
    </MarkerWrapper>
  )
}

export default VehicleMarker
