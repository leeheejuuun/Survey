import { createContext } from 'react';

export interface IPrintData {
  question: string;
  answer: string[];
}

interface PrintDataState {
  printData: IPrintData[];
  setPrintData: React.Dispatch<React.SetStateAction<IPrintData[]>>;
}

const finalData = {
  printData: [],
  setPrintData: () => {
    return;
  },
};

export const DataContext = createContext<PrintDataState>(finalData);
