import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Author from './pages/author.jsx';
import Scholar from './pages/scholar.jsx';
import Landing from './pages/landing'
import Search from './pages/search.jsx';
import Paper from './pages/paper.jsx';
import Dashboard from './pages/dashboard.jsx';
import Profile from './pages/profile.jsx';
import Graph from './pages/graph.jsx';


function App() {
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
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/paper" element={<Paper />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/graph" element={<Graph initialPaperId="649def34f8be52c8b66281af98ae884c09aef38b" />}></Route>
            <Route path="*" element={<Landing />}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
