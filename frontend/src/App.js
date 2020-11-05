import React from 'react';
import { ScrollToTop } from 'src/atoms/';
import { Routes } from 'src/Routes';
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
