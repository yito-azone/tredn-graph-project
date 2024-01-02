'use client'

import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function MainGraphArea(props: HighchartsReact.Props) {
  const { graphType, graphValue } = props;
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    title: {
      text: graphType
    },
    series: [{
      type: 'line',
      data: [1, 2, 3]
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  )
}