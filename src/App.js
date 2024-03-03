/* eslint-disable */
import './App.css';
import { VacationForm, VacationList } from './component/Vacation.js';
import './css/menu.css'
import MenuAppBar from './component/Menu.js';
import { Route, Routes } from 'react-router-dom';
import { MemberLeave } from './component/MemberLeave.js';
import SignIn from './component/Login';
function App() {
  return (
      <div>
        <MenuAppBar></MenuAppBar>
        <Routes>
          <Route path="/vacation-request" element={<VacationForm/>}/>
          <Route path="/vacation-list" element={<VacationList/>}/>
          <Route path="/member-search" element={<MemberLeave/>} />
          <Route path="/login" element={<SignIn/>} />
        </Routes>
      </div>
  )
}

export default App;