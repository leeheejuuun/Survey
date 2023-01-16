import React, { useEffect, useState } from 'react';
import './Main.scss';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const ariaLabel = { 'aria-label': 'description' };

export default function Main() {
  const [surveys, setSurveys] = useState<
    { title: string; questions: []; active: boolean }[]
  >([
    {
      title: '',
      questions: [],
      active: false,
    },
  ]);

  const [startData, setStartData] = useState<{
    name: string;
    title: string;
    questions: [];
  }>({
    name: '',
    title: '',
    questions: [],
  });

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get('http://localhost:3000/data/surveys.json');
        const data = res.data;
        const active = { active: false };
        setSurveys(data.surveys.map((a: any) => ({ ...a, ...active })));
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setStartData({ ...startData, name: value });
  };

  const handleServeySelect = (title: string, idx: number, active: boolean) => {
    const copySurveys = [...surveys];
    const surveysActiveFilter = copySurveys.filter((x) => x.active === true);
    const startDataTitleChecked = startData.title === title;

    if (surveysActiveFilter) {
      surveysActiveFilter.map((x) => (x.active = !x.active));
    }
    setStartData({
      ...startData,
      title: startData.title === title ? '' : title,
      questions: !startDataTitleChecked ? surveys[idx].questions : [],
    });
    copySurveys[idx].active = !active;
    setSurveys(copySurveys);

    console.log(
      surveys.filter(({ active }, i) => !!active),
      'surveys'
    );
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/survey', { state: startData });
  };

  return (
    <div className="Wrap">
      <header className="title">설문 조사</header>
      <Stack
        component="form"
        sx={{
          width: '17ch',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="이름을 입력해 주세요."
          value={startData.name}
          onChange={handleNameChange}
          sx={{
            '& .MuiInputBase-root': {
              '& input': {
                textAlign: 'center',
              },
            },
            marginTop: '20px',
          }}
        />
      </Stack>
      <span>
        {startData.title.length > 0 ? (
          <span></span>
        ) : (
          <span className="subTitle">설문을 선택해 주세요.</span>
        )}
      </span>

      <Stack spacing={1} direction="column" sx={{ marginTop: '10px' }}>
        {surveys.map(({ title, active }, idx) => (
          <Button
            sx={{ borderRadius: '1px' }}
            variant={active ? 'contained' : 'outlined'}
            onClick={() => handleServeySelect(title, idx, active)}
          >
            {title}
          </Button>
        ))}
      </Stack>
      <div className="nameAndTitleBox">
        <div className="nameBox">
          {startData.name.length > 0 ? (
            <span className="surveyName">
              안녕하세요{' '}
              <span className="surveyNameText">{startData.name}</span> 님.
            </span>
          ) : (
            <span className="noneName">이름을 입력해 주세요.</span>
          )}
        </div>
        <div className="titleBox">
          {startData.title.length > 0 ? (
            <span className="surveyTitle">
              선택 하신 설문은{' '}
              <span className="surveyTitleText">{startData.title}</span> 입니다.
            </span>
          ) : (
            <span className="noneSurvey">설문을 선택해 주세요.</span>
          )}
          <br />
          {startData.questions.length > 0 && (
            <span>
              설문은 총
              <span className="questionsNum">
                {' '}
                {startData.questions.length}
              </span>
              문항 입니다.
            </span>
          )}
        </div>
      </div>
      <Button
        variant={startData.name && startData.title ? 'contained' : 'outlined'}
        disabled={startData.name.length === 0 || startData.title.length === 0}
        onClick={handleNext}
      >
        설문 시작
      </Button>
    </div>
  );
}
