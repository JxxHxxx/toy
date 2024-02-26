/* eslint-disable */
import './App.css';
import { Header } from './component/Header.js';
import { VacationForm, VacationList } from './component/Vacation.js';
import './css/menu.css'
import { VacationCalender } from './component/Calendar.js';
import { BottomNav } from './component/Nav.js';
import PersistentDrawerLeft from './component/Drawer.js';
import BasicTable from './component/Table.js';
import CalendarV2 from './component/CalendarV2.js';
import { MyDrawer } from './component/MyDrawer.js';
function App() {
  return (
    <div className="App">
      {/* <CalendarV2></CalendarV2> */}
      {/* <BasicTable></BasicTable> */}
      <MyDrawer></MyDrawer>
      {/* <PersistentDrawerLeft></PersistentDrawerLeft>
      <VacationList></VacationList>
      <VacationForm></VacationForm>
      <VacationCalender></VacationCalender>
      <BottomNav></BottomNav> */}
    </div>
  );
}

export default App;