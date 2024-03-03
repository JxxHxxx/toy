import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    xAxis: [
        {
            label: '연차 현황',
        },
    ],
    width: 500,
    height: 150,
};

const dataset = [
    {
        key: '연차',
    }
];

const MemberLeaveBar = (props) => {
    const memberLeave = props.props;

    const leaveData = [
        { data: [memberLeave.remainingLeave], stack: 'A', label: '잔여 연차' },
        { data: [memberLeave.totalLeave - memberLeave.remainingLeave], stack: 'A', label: '사용 연차' }
    ]


    return (
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'key' }]}
            series={leaveData}
            colors={['#00B3FF', '#CDEFFF']}
            layout="horizontal"
            {...chartSetting}
        />
    );
}

export  { MemberLeaveBar }
