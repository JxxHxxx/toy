/* eslint-disable */
import './App.css';
import './css/menu.css'
import { MenuTabs } from './component/Menu.js';
import { Route, Routes } from 'react-router-dom';
import SignIn from './component/Login';
import { VacationMainPage } from './layout/VacationMainPage.js';
import { VacationRequestModal } from './component/VacationRequestModal.js';
import { Fragment } from 'react';
import { AuthProvider } from './context/UserContext.js';

function App() {

  return (
    <Fragment>
      <AuthProvider>
        <MenuTabs />
        <Routes>
          <Route path="/vacation-request-v2" element={<VacationRequestModal />} />
          <Route path="/vacations" element={<VacationMainPage />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </Fragment>
  )
}

export default App;