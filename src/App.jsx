import "./App.css";
import "devextreme/dist/css/dx.softblue.compact.css";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import PrivateRoute from "./auth/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import {
  MemberDashboardPage,
  //Error
  NotFoundPage,
  //Auth
  LoginPage,
  SignupPage,
  AdminUsersPage,
  AdminUserEditPage,
  AdminUserPage,
  AdminTestsPage,
  AdminTestsEditPage,
  AdminInstrumentsPage,
  AdminInstrumentsEditPage,
  
  StatusesPage,
  ReviewStagesPage,
  AdminUserRolesPage,
  AdminTownsPage,
  AdminWalkRoutesPage,
  AdminCustomersPage,
  AdminMetersPage,
  AdminMeterReadingsPage,

} from "./pages";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >

          {/* ADMIN */}
          {/* Dictionaries */}
          <Route path="/admin/dictionairies/statuses" element={<StatusesPage></StatusesPage>} />
          <Route path="/admin/dictionairies/review-stages" element={<ReviewStagesPage></ReviewStagesPage>} />
         
          {/* users */}
          <Route path="/admin/users/list" element={<AdminUsersPage/>} />
          <Route path="/admin/users/edit/:eId" element={<AdminUserEditPage/>} />
          <Route path="/admin/users/add" element={<AdminUserEditPage/>} />
          <Route path="/admin/users/view/:eId" element={<AdminUserPage/>} />
          <Route path="/users/view/id/:eId" element={<AdminUserPage/>} />
          {/* roles */}
          <Route path="/admin/roles/list" element={<AdminUserRolesPage/>} />
          {/* towns */}
          <Route path="/admin/towns/list" element={<AdminTownsPage/>} />
          {/* walk routes */}
          <Route path="/admin/walk-routes/list" element={<AdminWalkRoutesPage/>} />
          {/* customers */}
          <Route path="/admin/customers/list" element={<AdminCustomersPage/>} />
           {/* meters */}
          <Route path="/admin/meters/list" element={<AdminMetersPage/>} />
          {/* meter readings */}
          <Route path="/admin/meter-readings/list" element={<AdminMeterReadingsPage/>} />
          {/* Dashboards */}
          <Route path="/" element={<MemberDashboardPage></MemberDashboardPage>} />


          {/*expense and earnings*/}
          <Route path="/admin/benches/list" element={<AdminBenchesPage/>} />
          <Route path="/admin/benches/add" element={<AdminBenchEditPage/>} />
          <Route path="/admin/benches/edit/:eId" element={<AdminBenchEditPage/>} />

          
          {/*expense and earnings*/}
          <Route path="/admin/tests/list" element={<AdminTestsPage/>} />
          <Route path="/admin/tests/add" element={<AdminTestsEditPage/>} />
          <Route path="/admin/tests/edit/:eId" element={<AdminTestsEditPage/>} />

          
          {/*expense and earnings*/}
          <Route path="/admin/instruments/list" element={<AdminInstrumentsPage/>} />
          <Route path="/admin/instruments/add" element={<AdminInstrumentsEditPage/>} />
          <Route path="/admin/instruments/edit/:eId" element={<AdminInstrumentsEditPage/>} />
          
    
          {/* Error */}   
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/signup" element={<SignupPage></SignupPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
