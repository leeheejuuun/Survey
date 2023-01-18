import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/CreateContext';
import './Done.scss';
import Modal from '../../components/Modal';
import HomeIcon from '@mui/icons-material/Home';
import { purple } from '@mui/material/colors';

export default function Done() {
  const [open, setOpen] = useState(false);
  const { printData, setPrintData } = useContext(DataContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state, 'state');

  // const handlePrintData = () => {
  //   const map = printData.map((a) => Object.values(a));
  //   const entries = Object.fromEntries(map);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleGoHome = () => {
    alert('메인으로 돌아가시겠습니까?');
    navigate('/');
    setPrintData([]);
  };

  if (!state) navigate('/');

  return (
    <div className="doneBox">
      <span className="doneText">설문이 종료되었습니다.</span>
      <div className="doneContents">
        <Modal
          state={state}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </div>
      <div className="homeIconBox">
        <HomeIcon
          fontSize="large"
          onClick={handleGoHome}
          sx={{ color: purple[500] }}
        />
      </div>
    </div>
  );
}
