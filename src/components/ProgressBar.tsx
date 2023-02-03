import React from 'react';
import './ProgressBar.scss';

export interface ProgressBar {
  isProgressBar: boolean[];
  number: number;
  questions: any;
}

export default function ProgressBar({
  isProgressBar,
  number,
  questions,
}: ProgressBar) {
  console.log(number, questions, 'ddd');

  return (
    <div className="progressBar">
      <span className="progressSquareOn"></span>

      {Array.from(questions).map((v, i) => {
        return (
          <hr className={i <= number ? 'progressLineOn' : 'progressLineOff'} />
        );
      })}
      {/* <hr className={isProgressBar[0] ? 'progressLineOn' : 'progressLineOff'} />
      <hr className={isProgressBar[1] ? 'progressLineOn' : 'progressLineOff'} />
      <hr className={isProgressBar[2] ? 'progressLineOn' : 'progressLineOff'} /> */}
      <span
        className={
          questions.length - 1 === number
            ? 'progressSquareOn'
            : 'progressSquareOff'
        }
      ></span>
    </div>
  );
}
