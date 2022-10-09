import Login from './components/Login_Reg_Forms/Login';
import Register from './components/Login_Reg_Forms/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/DashBoard/Dashboard';
import ErrorPage from './components/404Page/ErrorPage';
import IndividualCoin from './components/IndividualCoin/IndividualCoin';
import RequireAuth from './components/Auth/RequireAuth';
import Account from './components/Account/Account';
import Purcase from './components/Purcase/Purcase';
import Wallet from './components/Wallet/Wallet';

const App:React.FC  = () => {
  
  //const {auth}:any = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>


                  <Route path='/Dashboard' element={ <Dashboard/> }/>
                  <Route path='/IndividualCoin' element={ <IndividualCoin/>}/>

                  <Route path='/Account' element={<Account/>} />
                  <Route path='/Purcase' element={<Purcase/>} />
                  <Route path='/Wallet' element={<Wallet/>} />

                {/* cathc all routes */} 
                <Route path='*' element={ <ErrorPage/>} />

       </Routes>
      </div>
    </Router>
  )
}

export default App;
