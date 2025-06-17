// 第二部分：核心规划与控制职能 - 图表功能

// 初始化EVM挣值管理图表
function initializeEVMChart() {
    const chartDom = document.getElementById('evm-chart');
    if (!chartDom) {
        console.warn('evm-chart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '项目绩效示例',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let res = params[0].name + '<br/>';
                params.forEach(item => {
                    res += item.marker + ' ' + item.seriesName + ' : ' + item.value + ' W<br/>';
                });
                let ev = params.find(p => p.seriesName === '挣值 (EV)').value;
                let pv = params.find(p => p.seriesName === '计划价值 (PV)').value;
                let ac = params.find(p => p.seriesName === '实际成本 (AC)').value;
                let sv = ev - pv;
                let cv = ev - ac;
                res += `---<br/>`;
                res += `成本偏差 (CV): ${cv.toFixed(2)} W ${cv < 0 ? '(超支)' : '(节约)'}<br/>`;
                res += `进度偏差 (SV): ${sv.toFixed(2)} W ${sv < 0 ? '(落后)' : '(超前)'}<br/>`;
                return res;
            }
        },
        legend: {
            data: ['计划价值 (PV)', '挣值 (EV)', '实际成本 (AC)'],
            top: 'bottom'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周']
        },
        yAxis: {
            type: 'value',
            name: '成本 (万元)',
            axisLabel: {
                formatter: '{value} W'
            }
        },
        series: [
            {
                name: '计划价值 (PV)',
                type: 'line',
                smooth: true,
                data: [10, 25, 45, 65, 80, 90, 95, 100],
                itemStyle: {
                    color: '#5470c6'
                },
                lineStyle: {
                    width: 3
                }
            },
            {
                name: '挣值 (EV)',
                type: 'line',
                smooth: true,
                data: [8, 20, 38, 55, 70, 80, 88, 92],
                markPoint: {
                    data: [{ type: 'max', name: '当前完成工作价值' }]
                },
                itemStyle: {
                    color: '#91cc75'
                },
                lineStyle: {
                    width: 3
                }
            },
            {
                name: '实际成本 (AC)',
                type: 'line',
                smooth: true,
                data: [7, 18, 35, 52, 68, 82, 95, 105],
                areaStyle: { 
                    opacity: 0.2,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#fac858' },
                        { offset: 1, color: 'rgba(250, 200, 88, 0.1)' }
                    ])
                },
                itemStyle: {
                    color: '#fac858'
                },
                lineStyle: {
                    width: 3
                }
            }
        ]
    };
    
    chart.setOption(option);
    saveChartInstance('evm-chart', chart);
    
    console.log('EVM图表初始化完成');
} 