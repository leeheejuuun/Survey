import React, { useEffect, useState } from 'react';
import './Main.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { purple } from '@mui/material/colors';

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
        const res = await axios.get('./data/surveys.json');
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
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/survey', { state: startData });
  };

  // 컬러 버튼 띰 사용

  // const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  //   color: theme.palette.getContrastText(purple[500]),
  //   backgroundColor: 'white',
  //   '&:hover': {
  //     backgroundColor: purple[700],
  //   },
  // }));

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
                borderBottomColor: 'none',
                fontSize: '17px',
              },
            },
            '& .MuiInput-underline:before': { borderBottomColor: purple[300] },
            '& .MuiInput-underline:after': {
              borderBottomColor: purple[600],
            },
            marginTop: '20px',
          }}
        />
      </Stack>
      <span className="subTitle">진행하고자 하는 설문을 선택해 주세요.</span>
      <Stack spacing={1} direction="column" sx={{ marginTop: '20px' }}>
        {surveys.map(({ title, active }, idx) => (
          <Button
            sx={{
              backgroundColor: active ? purple[500] : 'white',
              '&:hover': {
                backgroundColor: purple[500],
                color: 'white',
                border: 'none',
              },
              color: active ? 'white' : 'black',
              border: active ? 'none' : `1px solid ${purple[300]}`,
              borderRadius: '3px',
            }}
            variant="outlined"
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
        // variant={startData.name && startData.title ? 'contained' : 'outlined'}
        variant="outlined"
        disabled={startData.name.length === 0 || startData.title.length === 0}
        sx={{
          backgroundColor:
            startData.name.length === 0 || startData.title.length === 0
              ? 'white'
              : 'white',
          color:
            startData.name.length === 0 || startData.title.length === 0
              ? 'black'
              : 'black',
          border: `1px solid${purple[500]}`,
          '&:hover': {
            backgroundColor: purple[500],
            color: 'white',
            border: 'none',
          },
        }}
        onClick={handleNext}
      >
        설문 시작
      </Button>
    </div>
  );
}
