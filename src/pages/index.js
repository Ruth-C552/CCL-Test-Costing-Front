//Error
export { default as NotFoundPage } from './404'
//Auth
export { default as LoginPage } from '../auth/login'
export { default as SignupPage } from '../auth/signup'

//ADMIN

//Dictionairies
export { default as StatusesPage} from './admin/dictionairies/status_types'
export { default as ReviewStagesPage} from './admin/dictionairies/review_stages'

//user
export { default as AdminUsersPage } from './admin/users/user_list'
export { default as AdminUserEditPage } from './admin/users/user_edit'
export { default as AdminUserPage } from './admin/users/user'
export { default as AdminUserRolesPage } from './admin/users/role_list'

//towns
export { default as AdminTownsPage } from './admin/towns/town_list'

//walk routes
export { default as AdminWalkRoutesPage } from './admin/walkroutes/walkroute_list'

//customers
export { default as AdminCustomersPage } from './admin/customers/customer_list'

//meters
export { default as AdminMetersPage } from './admin/meters/meter_list'

//meter readings
export { default as AdminMeterReadingsPage } from './admin/meter-readings/reading_list'

export { default as AdminBenchesPage } from './admin/benches/bench_list'
export { default as AdminBenchEditPage } from './admin/benches/bench_edit'

export { default as AdminTestsPage } from './admin/tests/tests_list'
export { default as AdminTestsEditPage } from './admin/tests/tests_edit'

export { default as AdminInstrumentsPage } from './admin/instruments/instruments_list'
export { default as AdminInstrumentsEditPage } from './admin/instruments/instruments_edit'


//dashboard
export { default as MemberDashboardPage } from './dashboard'

