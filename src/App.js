import {Route, Routes} from "react-router-dom";
import LandingPage from "./page/landingPage/LandingPage";
import Login from "./page/loginPage/Login";
import Admin from "./page/adminPage/Admin";
import User from "./page/userPage/User";
import TraficPage from "./page/traficPage/TraficPage";
import HisobotPage from "./page/hisobot/HisobotPage";
import SupperAdminPage from "./page/supperAdminPage/SupperAdminPage";
import Zallar from "./page/zallarPage/Zallar";
import Sozlamalar from "./page/SozlamalarPage/Sozlamalar";
import AdminCruDpage from "./page/adminCRUDpage/AdminCRUDpage";

import History from "./page/history/History";
import TolovTarixi from "./page/tolovTarixi/TolovTarixi";
import User2 from "./page/user2PageMurojaat/User2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<LandingPage/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/admin"} element={<Admin/>}/>
          <Route path={"/users"} element={<User/>}/>
          <Route path={"/trafic"} element={<TraficPage/>}/>
        <Route path={"/hisobot"} element={<HisobotPage/>}/>
        <Route path={"/superAdmin"} element={<SupperAdminPage/>}/>
        <Route path={"/zallar"} element={<Zallar/>}/>
        <Route path={"/sozlamalar"} element={<Sozlamalar/>}/>
        <Route path={"/adminCRUDpage"} element={<AdminCruDpage/>}/>
        <Route path={"/history"} element={<History/>}/>
        <Route path={"/tolovTarixi"} element={<TolovTarixi/>}/>
        <Route path={"/users2"} element={<User2/>}/>
      </Routes>
    </div>
  );
}

export default App;
