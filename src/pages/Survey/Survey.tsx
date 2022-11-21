import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NextBtn from '../../components/NextBtn';
import PrevBtn from '../../components/PrevBtn';
import '../Survey/Survey.scss';
import { DataContext } from '../../context/CreateContext';

export default function Survey() {
  const { printData, setPrintData } = useContext(DataContext);
  const [finalDataAnswer, setFinalDataAnswer] = useState<string[]>([]);
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
  const [surveysData, setSurveysData] = useState<{ answer: string }[]>([
    { answer: '' },
  ]);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(
          'http://localhost:3000/data/questions.json'
        );
        const data = res.data;
        const map = state.questions.map((x: number) => data.questions[x]);
        setQuestions(map);
      })();
    } catch (err) {
      console.log('error', err);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get('http://localhost:3000/data/answers.json');
        const data = res.data;
        const map = questions[number].answers.map(
          (x: number) => data.answers[x]
        );
        const active = { active: false };
        setAnswers(map.map((title: any) => ({ title, ...active })));
      })();
    } catch (err) {
      console.log('error', err);
    }
  }, [questions, number]);

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

  useEffect(() => {
    console.log(finalDataAnswer, 'final');
  }, [finalDataAnswer]);

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
    setPrintData([
      ...printData,
      { question: questions[number].title, answer: finalDataAnswer },
    ]);
    setFinalDataAnswer([]);
  };

  const handlePrevBtn = () => {
    setNumber((prev) => prev - 1);
    if (!number) {
      alert('선택한 데이터가 전부 사라지게 됩니다. 뒤로 가시겠습니까?.');
      navigate('/');
    }
  };

  return (
    <div>
      <div className="surveyWrap">
        <span className="surveyTitle">{state.title}</span>
        <div className="surveyNumber">
          {number + 1}/{questions.length}
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
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '1px',
                width: '300px',
              }}
              variant={active ? 'contained' : 'outlined'}
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
  );
}
