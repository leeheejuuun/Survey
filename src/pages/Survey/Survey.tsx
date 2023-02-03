import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NextBtn from '../../components/NextBtn';
import PrevBtn from '../../components/PrevBtn';
import '../Survey/Survey.scss';
import ProgressBar from '../../components/ProgressBar';
import { DataContext } from '../../context/CreateContext';
import { purple } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';

export default function Survey() {
  const { printData, setPrintData } = useContext(DataContext);
  const [finalDataAnswer, setFinalDataAnswer] = useState<string[]>([]);
  const [isProgressBar, setIsProgressBar] = useState<boolean[]>([]);
  const [answers, setAnswers] = useState<{ title: string; active: boolean }[]>([
    {
      title: '',
      active: false,
    },
  ]);
  const [number, setNumber] = useState<number>(0);
  const [questions, setQuestions] = useState<
    {
      title: string;
      mode: number;
      answers: [];
    }[]
  >([
    {
      title: '',
      mode: 0,
      answers: [],
    },
  ]);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get('./data/questions.json');
        const data = res.data;
        const map = state.questions.map((x: number) => data.questions[x]);
        setQuestions(map);
        if (number === 0) {
          setPrintData([]);
        }
      })();
    } catch (err) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get('./data/answers.json');
        const data = res.data;
        const map = questions[number].answers.map(
          (x: number) => data.answers[x]
        );
        const active = { active: false };
        setAnswers(map.map((title: any) => ({ title, ...active })));
      })();
    } catch (err) {
      navigate('/');
    }
  }, [questions, number]);

  useEffect(() => {
    const newArr = Array(3).fill(false);
    if (questions.length === 1) {
      newArr.fill(true);
      setIsProgressBar(newArr);
    } else {
      setIsProgressBar(newArr);
    }
  }, [questions]);

  const answersActiveFilter = answers.filter((x) => x.active === true);

  const handleAnswersSelect = (title: string, i: number, active: boolean) => {
    const aaa = [...answers];
    const answerArr: string[] = [];
    if (answersActiveFilter) {
      answersActiveFilter.map((x) => (x.active = !x.active));
      answerArr.push(answers[i].title);
    }
    setFinalDataAnswer(answerArr);
    aaa[i].active = !active;
    setAnswers(aaa);
  };

  // useEffect(() => {
  //   console.log(finalDataAnswer, 'final');
  // }, [finalDataAnswer]);

  if (!state) navigate('/');

  const handleManyAnswersSelect = (
    title: string,
    i: number,
    active: boolean
  ) => {
    let answerArr = [...finalDataAnswer];
    const aaa = [...answers];
    aaa[i].active = !active;
    setAnswers(aaa);

    if (aaa[i].active) {
      answerArr.push(answers[i].title);
    } else if (!aaa[i].active) {
      const aaa = answerArr.findIndex((x) => x === title);
      answerArr.splice(aaa, 1);
    }
    setFinalDataAnswer(answerArr);
  };

  const handleNextBtn = () => {
    setNumber((prev) => prev + 1);
    if (number === questions.length - 1) {
      alert('설문이 종료 되었습니다.');
      navigate('/done', {
        state: state,
      });
    }

    // const newArr = [...isProgressBar];
    // if ((number + 2) / questions.length >= 0.76) {
    //   newArr.fill(true);
    //   setIsProgressBar(newArr);
    // } else if ((number + 2) / questions.length >= 0.51) {
    //   newArr[0] = true;
    //   newArr[1] = true;
    //   setIsProgressBar(newArr);
    // } else if ((number + 2) / questions.length >= 0.26) {
    //   newArr[0] = true;
    //   setIsProgressBar(newArr);
    // }

    setPrintData([
      ...printData,
      { question: questions[number].title, answer: finalDataAnswer },
    ]);

    setFinalDataAnswer([]);
  };

  const handlePrevBtn = () => {
    setNumber((prev) => prev - 1);
    setPrintData(printData.slice(0, -1));
    console.log(isProgressBar);

    // const newArr = [...isProgressBar];
    // if (number / questions.length <= 0.25) {
    //   newArr[0] = false;
    //   setIsProgressBar(newArr);
    // } else if (number / questions.length <= 0.5) {
    //   newArr[1] = false;
    //   if (questions.length === 3) newArr[0] = false;
    //   setIsProgressBar(newArr);
    // } else if (number / questions.length <= 0.75) {
    //   newArr[2] = false;
    //   setIsProgressBar(newArr);
    // }

    if (!number) {
      alert('설문을 다시 선택하시겠습니까?.');
      navigate('/');
      setPrintData([]);
    }
  };

  const handleGoHome = () => {
    alert('메인으로 돌아가시겠습니까?');
    navigate('/');
    setPrintData([]);
  };

  return (
    <>
      {state && (
        <div>
          <div className="surveyWrap">
            <HomeIcon
              fontSize="large"
              onClick={handleGoHome}
              sx={{ color: purple[500], marginTop: '30px' }}
            />
            <span className="surveyTitle">{state.title}</span>
            <div className="progressBarBox">
              <ProgressBar
                isProgressBar={isProgressBar}
                number={number}
                questions={questions}
              />
              <span className="surveyCurrentNumber">{number + 1}</span>
              <span className="surveyTotalNumber">/{questions.length}</span>
            </div>

            <div className="surveyName">{questions[number].title}</div>
            <Stack
              spacing={1}
              direction="column"
              sx={{ display: 'flex', alignItems: 'flex-start' }}
            >
              {answers.map(({ title, active }, i) => (
                <Button
                  sx={{
                    backgroundColor: active ? purple[500] : 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    borderRadius: '3px',
                    width: '300px',
                    color: active ? 'white' : 'black',
                    border: active ? 'none' : `1px solid ${purple[300]}`,
                    '&:hover': {
                      backgroundColor: purple[500],
                      color: 'white',
                      border: 'none',
                    },
                  }}
                  variant="outlined"
                  key={title}
                  onClick={
                    questions[number].mode === 0
                      ? () => handleAnswersSelect(title, i, active)
                      : () => handleManyAnswersSelect(title, i, active)
                  }
                >
                  {title}
                </Button>
              ))}
            </Stack>
            <div className="btnWrap">
              <PrevBtn
                answersActiveFilter={answersActiveFilter}
                questions={questions}
                handlePrevBtn={handlePrevBtn}
              />
              <NextBtn
                answersActiveFilter={answersActiveFilter}
                handleNextBtn={handleNextBtn}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
