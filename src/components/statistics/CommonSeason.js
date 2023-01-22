import React from 'react';
import { useSelector } from 'react-redux';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CommonSeason() {
	const statistics = useSelector(state => state.statisticts);
	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2",
		axisY: {
			includeZero: true
		},
		data: [{
			type: "column",
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: statistics.Areas

		}]
	}

	return (
		<div>
			<CanvasJSChart options={options}
			/>
		</div>
	);
}
