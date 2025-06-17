// 第一部分：软件项目管理基础 - 图表功能

// 初始化项目失败原因图表
function initializeFailureChart() {
    const chartDom = document.getElementById('failure-reasons-chart');
    if (!chartDom) {
        console.warn('failure-reasons-chart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            name: '重要性评分'
        },
        yAxis: {
            type: 'category',
            data: [
                '缺乏合格的项目经理',
                '缺乏了解软件特性的经理人',
                '缺乏系统工程师',
                '需求变更',
                '需求规范不充分'
            ].reverse(),
            axisLabel: {
                interval: 0,
                rotate: 0,
                width: 100,
                overflow: 'break'
            }
        },
        series: [{
            name: '评分',
            type: 'bar',
            data: [4.1, 4.1, 4.2, 4.3, 4.5].reverse(),
            barWidth: '60%',
            label: {
                show: true,
                position: 'right'
            },
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                ])
            }
        }]
    };
    
    chart.setOption(option);
    saveChartInstance('failure-reasons-chart', chart);
    
    console.log('项目失败原因图表初始化完成');
} 