import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Author from './pages/author.jsx';
import Scholar from './pages/scholar.jsx';

import Cookies from 'universal-cookie'
import Axios from 'axios'

function App() {
  // const cookies = new Cookies();
  // var cook = cookies.get("token");
  // Axios.defaults.withCredentials=true
  // if(cook === undefined){
  //   cook = false;
  // }
  // else{
  //   cook = true;
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path="/register" element={<Register />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/author" element={<Author />}></Route>
            <Route path="/scholar" element={<Scholar />}></Route>
            {/* {cook === true ?
            <>
              <Route path="/author" element={<Author />}></Route>
              <Route path="/scholar" element={<Scholar />}></Route>
              </> : 
            <Route path="*" element={<Login />}></Route>
           
            } */}
            <Route path="*" element={<Login />}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
