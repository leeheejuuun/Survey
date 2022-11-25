import React from 'react';

interface prevProps {
  questions: {
    title: string;
    mode: number;
    answers: [];
  }[];
  answersActiveFilter: {
    title: string;
    active: boolean;
  }[];
  handlePrevBtn: () => void;
}

export default function PrevBtn({
  handlePrevBtn,
  answersActiveFilter,
}: prevProps) {
  return (
    <div className="nextBtnWrap">
      <button className="nextBtn" onClick={() => handlePrevBtn()}>
        {'이전'}
      </button>
    </div>
  );
}
