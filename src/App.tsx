import React, { useState } from 'react';
import './App.scss';
import Main from './pages/Main/Main';
import Survey from './pages/Survey/Survey';
import { DataContext } from './context/CreateContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IPrintData } from './context/CreateContext';
import Done from './pages/Done/Done';

function App() {
  const [printData, setPrintData] = useState<IPrintData[]>([]);
  return (
    <DataContext.Provider value={{ printData, setPrintData }}>
      <div className="box">
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/done" element={<Done />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
