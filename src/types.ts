export interface Transaction {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  export interface Budget {
    category: string;
    limit: number;
    spent: number;
  }
  
  export interface PredictiveData {
    month: string;
    predicted: number;
    actual?: number;
  }