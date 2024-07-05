import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, DefaultTooltipContent, Tooltip } from 'recharts';
import style from "./PiChart.module.css"

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class PiChart extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart className={style.chart} width={500} height={500} style={{ fontSize: "1rem", outline: "none"}}>
                    <Pie
                        className={style.cell}
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={160}
                        fill="#8884d8"
                        dataKey="value"
                        
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: "none" }} />
                            ))}
                    </Pie>
                            <Tooltip content={<DefaultTooltipContent style={{ fontSize: "1rem" }} />}/>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
