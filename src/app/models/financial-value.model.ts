export interface FinancialValue {
    id: number;
    month: number;
    year: number;
    value: number;
    financialTypeId: number;
    financialType?: string;
    areaId: number;
    area?: string;
    contractId: number;
    contract?: string;
  }