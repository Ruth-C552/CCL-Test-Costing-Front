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
