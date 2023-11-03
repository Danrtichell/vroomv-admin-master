export enum LayoutType {
  Auth = 'auth',
  Dashboard = 'dashboard'
}

export enum ErrorType {
  Empty = 'empty',
  Invalid = 'invalid',
  Existed = 'existed',
  Info = 'info',
  InvalidCombination = 'invalidCombination'
}

export enum DraggableItemType {
  Filter = 'filter'
}

export enum BookingDirection {
  OFFICE = 1,
  HOME = 2
}

export enum DriverStatus {
  OnDuty = 1,
  OffDuty = 2,
  Terminated = 3,
  IndefiniteLeave = 4
}
