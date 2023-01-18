import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DataContext } from '../context/CreateContext';
import { purple } from '@mui/material/colors';
import './Modal.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface modalProps {
  state: any;
  open: any;
  handleClickOpen: () => void;
  handleClose: () => void;
}

export default function CustomizedDialogs({
  state,
  open,
  handleClickOpen,
  handleClose,
}: modalProps) {
  const { printData, setPrintData } = useContext(DataContext);
  console.log(printData, 'printData');
  return (
    <div>
      <Button
        sx={{
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: purple[500],
            color: 'white',
            border: 'none',
          },
          color: 'black',
          border: `1px solid ${purple[300]}`,
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        선택한 답안보기
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <span className="pickSurvey">
            <span className="name">{state.name}</span>님{' '}
            <span className="survetTitle">{state.title} </span> 설문 결과입니다.
          </span>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {printData.map((x, i) => (
            <Typography gutterBottom>
              <span className="printQuestion">
                {i + 1}. {x.question} :
              </span>{' '}
              <span className="printAnswer">{x.answer}</span>
            </Typography>
          ))}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
