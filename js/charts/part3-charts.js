// 第三部分：人员与过程职能 - 图表功能

// 初始化干系人权力/利益方格图表
function initializeStakeholderChart() {
    const chartDom = document.getElementById('stakeholder-chart');
    if (!chartDom) {
        console.warn('stakeholder-chart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const stakeholderData = [
        // [interest, power, stakeholderName]
        [0.9, 0.9, '项目发起人 (重点管理)'], 
        [0.8, 0.2, '核心用户 (随时告知)'],
        [0.3, 0.8, '财务总监 (使其满意)'], 
        [0.2, 0.3, '其他部门 (监督)']
    ];

    const option = {
        title: {
            text: '干系人权力/利益分析矩阵',
            left: 'center',
            top: '5%'
        },
        grid: {
            left: '10%', 
            right: '10%', 
            bottom: '15%', 
            top: '15%'
        },
        xAxis: {
            type: 'value', 
            name: '利益 (Interest)', 
            nameLocation: 'middle', 
            nameGap: 30,
            min: 0, 
            max: 1, 
            splitLine: { show: true },
            axisLabel: { 
                formatter: (value) => { 
                    if (value === 0.25) return '低'; 
                    if (value === 0.75) return '高'; 
                    return ''; 
                } 
            }
        },
        yAxis: {
            type: 'value', 
            name: '权力 (Power)', 
            nameLocation: 'middle', 
            nameGap: 50,
            min: 0, 
            max: 1, 
            splitLine: { show: true },
            axisLabel: { 
                formatter: (value) => { 
                    if (value === 0.25) return '低'; 
                    if (value === 0.75) return '高'; 
                    return ''; 
                } 
            }
        },
        series: [{
            type: 'scatter',
            data: stakeholderData.map(item => [item[0], item[1], item[2]]),
            symbolSize: 20,
            label: {
                show: true,
                position: 'bottom',
                formatter: (params) => params.data[2],
                color: '#333',
                fontSize: 12
            },
            itemStyle: {
                color: function(params) {
                    const interest = params.data[0];
                    const power = params.data[1];
                    if (interest > 0.5 && power > 0.5) return '#ff7f0e'; // 重点管理
                    if (interest > 0.5 && power <= 0.5) return '#d62728'; // 随时告知
                    if (interest <= 0.5 && power > 0.5) return '#1f77b4'; // 使其满意
                    return '#2ca02c'; // 监督
                }
            }
        }],
        graphic: [
            { 
                type: 'text', 
                left: '25%', 
                top: '25%', 
                style: { 
                    text: '使其满意\nKeep Satisfied', 
                    fill: '#1f77b4', 
                    font: 'bold 14px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            { 
                type: 'text', 
                right: '25%', 
                top: '25%', 
                style: { 
                    text: '重点管理\nManage Closely', 
                    fill: '#ff7f0e', 
                    font: 'bold 14px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            { 
                type: 'text', 
                left: '25%', 
                bottom: '25%', 
                style: { 
                    text: '监督\nMonitor', 
                    fill: '#2ca02c', 
                    font: 'bold 14px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            { 
                type: 'text', 
                right: '25%', 
                bottom: '25%', 
                style: { 
                    text: '随时告知\nKeep Informed', 
                    fill: '#d62728', 
                    font: 'bold 14px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            // 分割线
            {
                type: 'line',
                shape: { x1: '50%', y1: '15%', x2: '50%', y2: '85%' },
                style: { stroke: '#ddd', lineWidth: 2, lineDash: [5, 5] }
            },
            {
                type: 'line',
                shape: { x1: '10%', y1: '50%', x2: '90%', y2: '50%' },
                style: { stroke: '#ddd', lineWidth: 2, lineDash: [5, 5] }
            }
        ]
    };
    
    chart.setOption(option);
    saveChartInstance('stakeholder-chart', chart);
    
    console.log('干系人图表初始化完成');
} 