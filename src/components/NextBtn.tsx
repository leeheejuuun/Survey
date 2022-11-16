import React from 'react';
import { useLocation } from 'react-router-dom';

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
        onClick={pathname === '/survey' ? handleNextBtn : handlePrintData}
        disabled={answersActiveFilter && !answersActiveFilter[0]}
      >
        {'다음'}
      </button>
    </div>
  );
}
