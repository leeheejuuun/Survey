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
  // console.log(answersActiveFilter, 'answersActiveFilter');
  return (
    <div className="nextBtnWrap">
      <button
        className="nextBtn"
        onClick={() => handlePrevBtn()}
        // disabled={!answersActiveFilter[0]}
      >
        {'이전'}
      </button>
    </div>
  );
}
