import React from 'react';
import { useLocation } from 'react-router-dom';
import './NextBtn.scss';

type nextProps = {
  handlePrintData?: () => void;
  handleNextBtn?: () => void;
  answersActiveFilter?: {
    title: string;
    active: boolean | undefined;
  }[];
};

export default function NextBtn({
  handlePrintData,
  handleNextBtn,
  answersActiveFilter,
}: nextProps) {
  const { pathname } = useLocation();
  return (
    <div className="nextBtnWrap">
      <button
        className="nextBtn"
        onClick={pathname === '/survey' ? handleNextBtn : handlePrintData}
        disabled={answersActiveFilter && !answersActiveFilter[0]}
      >
        {'다음'}
      </button>
    </div>
  );
}
