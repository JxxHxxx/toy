/* eslint-disable */
import './App.css';
import { VacationForm, VacationList } from './component/Vacation.js';
import './css/menu.css'
function App() {
  return (
    <div className="App">
      <div className="menuContainer">
        <a href="#list" className='menu'>목록</a>
        <a href="#form" className='menu'>신청</a>
      </div>
      <VacationList></VacationList>
      <VacationForm></VacationForm>
    </div>
  );
}

export default App;