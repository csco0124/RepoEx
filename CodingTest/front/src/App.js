import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JqueryTest from './components/test/JqueryTest';
import Home from './components/Home';
import VueTest from './components/test/VueTest';
import ReactTest from './components/test/ReactTest';
import SiteTitle from './components/SiteTitle';
import BackendTest from './components/test/BackendTest';

function App() {
  return (
    <div className='App'>
      <SiteTitle />
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/jquery/:level' element = {<JqueryTest />} />
        <Route path='/react/:level' element = {<ReactTest />} />
        <Route path='/vue/:level' element = {<VueTest />} />  
        <Route path='backend/:level' element = {<BackendTest />} />      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
