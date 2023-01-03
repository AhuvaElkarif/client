import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPolpularAttractionsInLastYear } from '../../store/actions/StatisticsAction';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Statistics = () => {
	const statistics = useSelector(state => state.statisticts);
	
		const options = {
			theme: "#f7f7f8",
			animationEnabled: true,
			exportFileName: "אטרקציות פופולאריות בשנה האחרונה",
			exportEnabled: true,
			title:{
				// text: "מה היו האטרקציות פופולאריות בשנה האחרונה?" 
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: statistics.Popular
			}]
        }
		return (
		<div style={{textAlign:"center"}}>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
}
export default Statistics;