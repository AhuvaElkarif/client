import React from 'react';
import { useSelector } from 'react-redux';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Statistics = () => {
	const statistics = useSelector(state => state.statisticts);
	const options = {
		theme: "#f7f7f8",
		animationEnabled: true,
		exportFileName: "אטרקציות פופולאריות בשנה האחרונה",
		exportEnabled: true,
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
		<div style={{ textAlign: "center" }}>
			<CanvasJSChart options={options}
			/>
		</div>
	);
}
export default Statistics;