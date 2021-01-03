import React from 'react';
import { ScrollToTop } from './atoms/';
import { Routes } from './Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <ScrollToTop />
      <Routes />
    </>
  );
}
