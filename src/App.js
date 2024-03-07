/* eslint-disable */
import './App.css';
import { VacationForm, VacationList } from './component/Vacation.js';
import './css/menu.css'
import MenuAppBar from './component/Menu.js';
import { Route, Routes } from 'react-router-dom';
import SignIn from './component/Login';
import { VacationMainPage } from './layout/VacationMainPage.js';
import { VacationRequestModal } from './component/VacationRequestModal.js';

function App() {

  return (
    <div>
      <MenuAppBar></MenuAppBar>
      <Routes>
        <Route path="/vacation-request" element={<VacationForm />} />
        <Route path="/vacation-request-v2" element={<VacationRequestModal />} />
        <Route path="/vacation-list" element={<VacationList />} />
        <Route path="/member-search" element={<VacationMainPage />} />
          <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App;