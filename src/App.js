import './App.css';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import Registration from "./components/Registration/Registration";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization from "./components/Authorization/Authorization";
import TheftReport from './components/TheftReport/TheftReport';
import { useEffect } from 'react';
import { tokenValidate } from './API/API';
import { useContext } from "react";
import {UserContext} from "./context/context";
import ReportTable from './components/ReportTable/ReportTable';
import TheftReportPage from './components/TheftReportPage/TheftReportPage';
import StaffTable from './components/StaffTable/StaffTable';
import StaffPage from './components/StaffPage/StaffPage';


function App() {
  
  const {token, setUser} = useContext(UserContext);

  useEffect ( () => {
    if (token) {
      tokenValidate(token).then(response => {
        setUser (response.data.user);  //функция, которая сохраняет данные о пользователе в контексте 
    }).catch( (error) => {
      console.log(error)
      localStorage.removeItem("token")
    })
    }
  }, []
  )

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/authorization' element={<Authorization/>}/>
          <Route path='/report' element={<TheftReport/>}/>
          <Route path='/allReports' element={<ReportTable/>}/>
          <Route path='/cases/:id' element={<TheftReportPage/>}/>
          <Route path='/staff' element={<StaffTable/>}/>
          <Route path='/staff/:id' element={<StaffPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
