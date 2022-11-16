import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/CreateContext';
import NextBtn from '../../components/NextBtn';

export default function Done() {
  const { printData, setPrintData } = useContext(DataContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state, 'state');

  const handlePrintData = () => {
    const map = printData.map((a) => Object.values(a));
    const entries = Object.fromEntries(map);
    console.log('printData', printData);
  };

  return (
    <div>
      설문이 종료되었습니다.
      <div>
        <button onClick={handlePrintData}>설문결과 보러가기</button>
      </div>
    </div>
  );
}
