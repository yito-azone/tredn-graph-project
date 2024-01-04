// グラフ表示用のUtils

const year = [
  "1960",
  "1965",
  "1970",
  "1975",
  "1980",
  "1985",
  "1990",
  "1995",
  "2000",
  "2005",
  "2010",
  "2015",
  "2020",
  "2025",
  "2030",
  "2035",
  "2040",
  "2045",
];

const count = [500000, 1000000, 1500000, 2000000];

export const initOption = {
  title: {
    text: "総人口",
  },
  xAxis: {
    title: {
      text: "年度",
      // align: "high",
    },
    categories: year,
  },
  yAxis: {
    title: {
      text: "人口数",
      // align: "high",
    },
  },
  series: [],
};

export const graphTypes = [
  {
    type: "population",
    name: "総人口",
  },
  {
    type: "newAgeCount",
    name: "年少人口",
  },
  {
    type: "middleAgeCount",
    name: "生産年齢人口",
  },
  {
    type: "oldAgeCount",
    name: "老年人口",
  },
];

export const replaceGraphTitle = (graphType: string) => {
  // グラフタイトル変換
  let graphTitle = "";
  switch (graphType) {
    case "population":
      graphTitle = "総人口";
      break;
    case "newAgeCount":
      graphTitle = "年少人口";
      break;
    case "middleAgeCount":
      graphTitle = "生産年齢人口";
      break;
    case "oldAgeCount":
      graphTitle = "老年人口";
      break;
  }

  return graphTitle;
};
