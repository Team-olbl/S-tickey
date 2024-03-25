// catg(카테고리) : SOCCER(축구), BASEBALL(야구), BASKETBALL(농구) 

export type categoryType = | 'ALL' | 'SOCCER' | 'BASEBALL' | 'BASKETBALL'

export interface APIResponse<T> {
    status: number;
    message: string;
    data: T;
  }