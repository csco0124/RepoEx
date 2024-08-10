import React from 'react';
import './App.css';
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, AdminInfoMgt, DashBoardCbMgt, NotFound } from "./components/pages";
import Header from "./components/layout/Header";
import Side from "./components/layout/Side";
import Footer from "./components/layout/Footer";
import Popup from "./components/layout/Popup";
import Alert from "./components/layout/Alert";
import Toast from "./components/layout/Toast";
import PopupCard from "./components/layout/PopupCard";

function noLayout(){  
  const wrap = document.querySelector('.wrap') as HTMLVideoElement;
  const content = document.querySelector('.content') as HTMLVideoElement;
  if (content.classList.contains('center')){
    wrap.classList.add('no-navi');
  } else {
    wrap.classList.remove('no-navi');
  }
}
const App = () => {
  return (
    <BrowserRouter>
      <div className="wrap"> 
        <Side />
        <section className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/adminInfoMgt/*" element={<AdminInfoMgt/>} />
            <Route path="/dashBoardCbMgt/*" element={<DashBoardCbMgt/>} />
            <Route path="/*" element={<NotFound/>} />
          </Routes>
          <Footer />
        </section>
        <Popup />
        <Alert />
        <Toast />
        <PopupCard />
      </div> 
    </BrowserRouter>
  );
  noLayout()
}

export default App;
