import { LayoutType } from 'enums'

import LoginPage from 'pages/login'
import HomePage from 'pages/home'
import DashboardPage from 'pages/dashboard'
import DriverPage from 'pages/driver'
import PassengersPage from 'pages/passenger'
import ZonesPage from 'pages/zone'
import CompanyPage from 'pages/company'
import VehiclesPage from 'pages/vehicle'
import VehiclesMapPage from 'pages/vehicle-map'
import LocationsPage from 'pages/location'
import EligibleEmployeePage from 'pages/eligible-employee'
import BookingsPage from 'pages/booking'
import BookingsImportPage from 'pages/booking-import'
import BookingsDetailsImportPage from 'pages/booking-import-details'
import ImportPage from 'pages/import'
import DispatchPage from 'pages/dispatch'
import DriverCreateEditPage from 'pages/driver-create-edit'
import PassengerCreateEditPage from 'pages/passenger-create-edit'
import ZoneCreateEdtPage from 'pages/zone-create-edit'
import LocationCreateEdtPage from 'pages/location-create-edit'
import CompanyCreateEditPage from 'pages/company-create-edit'
import EligibleEmployeeCreateEditPage from 'pages/eligible-employee-create-edit'
import VehicleCreateEdtPage from 'pages/vehicle-create-edit'
import BookingCreateEdtPage from 'pages/booking-create-edit'
import ClaimablesPage from 'pages/claimable'
import ClaimablesEditCreatePage from 'pages/claimable-create-edit'

export default [
  {
    title: 'Create Claimables',
    path: '/claimables/create',
    component: ClaimablesEditCreatePage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Claimable',
    path: '/claimables/edit/:id',
    component: ClaimablesEditCreatePage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Claimables',
    path: '/claimables',
    component: ClaimablesPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Create Driver',
    path: '/drivers/create',
    component: DriverCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Driver',
    path: '/drivers/edit/:id',
    component: DriverCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Drivers',
    path: '/drivers',
    component: DriverPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Create Passenger',
    path: '/passengers/create',
    component: PassengerCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Passenger',
    path: '/passengers/edit/:id',
    component: PassengerCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Passengers',
    path: '/passengers',
    component: PassengersPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Locations',
    path: '/zones/:id/locations/create',
    component: LocationCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Locations',
    path: '/zones/:id/locations/:locationId/edit',
    component: LocationCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Locations',
    path: '/zones/:id/locations',
    component: LocationsPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Zone',
    path: '/zones/create',
    component: ZoneCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Zone',
    path: '/zones/edit/:id',
    component: ZoneCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Zones',
    path: '/zones',
    component: ZonesPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Create Eligible Employee',
    path: '/company/:id/eligible-employee/create',
    component: EligibleEmployeeCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Eligible Employee',
    path: '/company/:id/eligible-employee/:eligibleEmployeeId/edit',
    component: EligibleEmployeeCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Eligible Employee',
    path: '/company/:id/eligible-employee',
    component: EligibleEmployeePage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Create Company',
    path: '/company/create',
    component: CompanyCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Company',
    path: '/company/edit/:id',
    component: CompanyCreateEditPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Company',
    path: '/company',
    component: CompanyPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Create Vehicle',
    path: '/vehicles/create',
    component: VehicleCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Vehicle',
    path: '/vehicles/edit/:id',
    component: VehicleCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Vehicle Map',
    path: '/vehicles/map',
    component: VehiclesMapPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Vehicles',
    path: '/vehicles',
    component: VehiclesPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Create Booking',
    path: '/bookings/create',
    component: BookingCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Edit Booking',
    path: '/bookings/edit/:id',
    component: BookingCreateEdtPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Imports',
    path: '/import',
    component: ImportPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Bookings Import',
    path: '/bookings-import/:id',
    component: BookingsDetailsImportPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Bookings Import',
    path: '/bookings-import',
    component: BookingsImportPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Bookings',
    path: '/bookings',
    component: BookingsPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Dispatch',
    path: '/dispatch',
    component: DispatchPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Login',
    path: '/login',
    component: LoginPage,
    isSecure: false,
    layout: LayoutType.Auth
  },
  {
    title: 'Home',
    path: '/home',
    component: HomePage,
    isSecure: false,
    layout: LayoutType.Dashboard
  },
  {
    title: 'Dashboard',
    path: '/',
    component: DashboardPage,
    isSecure: false,
    layout: LayoutType.Dashboard
  }
]
