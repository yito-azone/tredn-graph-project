// RESAS API用の型定義

export type Prefecture = {
  prefCode: number;
  prefName: string;
  checked: boolean;
};

export type GraphDetailData = {
  year: number;
  value: number;
  rate?: number;
};

export type GraphData = {
  label: string;
  data: GraphDetailData[];
};

export type GraphValue = {
  prefCode: number;
  prefName: string;
  boundaryYear?: string;
  data: GraphData[];
};

export type Series = {
  name: string;
  data: number[];
};
