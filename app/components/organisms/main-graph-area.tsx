'use client'

// グラフ作成用コンポーネント

import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function MainGraphArea(props: HighchartsReact.Props) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { options } = props;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{ ...options }}
      ref={chartComponentRef}
    />
  )
}