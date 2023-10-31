import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import PublicRoutes from './components/PublicRoutes.js';
import ApplyDoctor from './pages/ApplyDoctor.js';
import NotificationPage from './pages/NotificationPage.js';
import Doctors from './pages/admin/Doctors.js';
import Users from './pages/admin/Users.js';
import Profile from './pages/doctor/Profile.js';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
function App() {
  const {loading} = useSelector((state) => state.alerts)
  return (
    <> 
    <BrowserRouter>
    {loading ? (<Spinner/>) : (<Routes>
      <Route path='/' 
      element={
        <ProtectedRoute>
           <HomePage />
        </ProtectedRoute>
       
      } />
      
      <Route path='/apply-doctor' 
      element={
        <ProtectedRoute>
           <ApplyDoctor />
        </ProtectedRoute>
       
      } />

<Route path='/admin/users' 
      element={
        <ProtectedRoute>
           <Users />
        </ProtectedRoute>
       
      } />

<Route path='/admin/doctors' 
      element={
        <ProtectedRoute>
           <Doctors />
        </ProtectedRoute>
       
      } />

<Route path='/doctor/profile/:id' 
      element={
        <ProtectedRoute>
           <Profile />
        </ProtectedRoute>
       
      } />

      {/* doctor booking page router */}
      <Route path='/doctor/booking/:doctorId' 
      element={
        <ProtectedRoute>
           <BookingPage />
        </ProtectedRoute>
       
      } />


      <Route path='/login' 
      element={
        <PublicRoutes>
          <Login/>
        </PublicRoutes>
      } />

      <Route path='/register' element={
      <PublicRoutes>
      <Register/>
    </PublicRoutes>
      }/>

<Route path='/notification' element={
      <ProtectedRoute>
      <NotificationPage/>
    </ProtectedRoute>
      }/>

<Route path='/appointment' element={
      <ProtectedRoute>
      <Appointments/>
    </ProtectedRoute>
      }/>

<Route path='/doctor-appointments' element={
      <ProtectedRoute>
      <DoctorAppointments/>
    </ProtectedRoute>
      }/>




    </Routes>
    ) }
    
    </BrowserRouter>
    </>
     
  );
}

export default App;
