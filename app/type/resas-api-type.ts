type GraphDetailData = {
  year: number;
  value: number;
};

type GraphData = {
  label: string;
  data: GraphDetailData[];
};

export type GraphValue = {
  prefCode?: number;
  boundaryYear: string;
  data: GraphData[];
};
