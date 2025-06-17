// 第五部分：软件开发方法论比较 - 图表功能

// 初始化方法论比较图表
function initializeMethodologyChart() {
    const chartDom = document.getElementById('methodology-comparison-chart');
    if (!chartDom) {
        console.warn('methodology-comparison-chart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: [
            {
                text: '传统瀑布模型流程',
                left: '25%',
                top: '5%',
                textAlign: 'center',
                textStyle: { fontSize: 14, fontWeight: 'bold', color: '#ff7f0e' }
            },
            {
                text: '敏捷迭代流程',
                left: '75%',
                top: '5%',
                textAlign: 'center',
                textStyle: { fontSize: 14, fontWeight: 'bold', color: '#2ca02c' }
            }
        ],
        grid: { show: false },
        xAxis: { show: false, min: 0, max: 100 },
        yAxis: { show: false, min: 0, max: 100 },
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 60,
                roam: false,
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: '#fff'
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [0, 8],
                data: [
                    // 传统瀑布流程节点
                    { name: '需求分析', x: 10, y: 85, itemStyle: { color: '#ff7f0e' }, category: 'waterfall' },
                    { name: '系统设计', x: 10, y: 70, itemStyle: { color: '#ff7f0e' }, category: 'waterfall' },
                    { name: '编码实现', x: 10, y: 55, itemStyle: { color: '#ff7f0e' }, category: 'waterfall' },
                    { name: '系统测试', x: 10, y: 40, itemStyle: { color: '#ff7f0e' }, category: 'waterfall' },
                    { name: '系统部署', x: 10, y: 25, itemStyle: { color: '#ff7f0e' }, category: 'waterfall' },
                    { name: '维护运营', x: 10, y: 10, itemStyle: { color: '#ff7f0e' }, category: 'waterfall' },

                    // 敏捷迭代流程节点
                    { name: '产品\n待办事项', x: 55, y: 80, itemStyle: { color: '#2ca02c' }, category: 'agile' },
                    { name: '迭代\n规划', x: 70, y: 65, itemStyle: { color: '#2ca02c' }, category: 'agile' },
                    { name: '开发\n实现', x: 85, y: 50, itemStyle: { color: '#2ca02c' }, category: 'agile' },
                    { name: '测试\n验证', x: 85, y: 35, itemStyle: { color: '#2ca02c' }, category: 'agile' },
                    { name: '评审\n回顾', x: 70, y: 20, itemStyle: { color: '#2ca02c' }, category: 'agile' },
                    { name: '可工作\n软件', x: 55, y: 35, itemStyle: { color: '#52c41a' }, category: 'agile' }
                ],
                links: [
                    // 瀑布流程连接
                    { source: '需求分析', target: '系统设计', lineStyle: { color: '#ff7f0e', width: 3 } },
                    { source: '系统设计', target: '编码实现', lineStyle: { color: '#ff7f0e', width: 3 } },
                    { source: '编码实现', target: '系统测试', lineStyle: { color: '#ff7f0e', width: 3 } },
                    { source: '系统测试', target: '系统部署', lineStyle: { color: '#ff7f0e', width: 3 } },
                    { source: '系统部署', target: '维护运营', lineStyle: { color: '#ff7f0e', width: 3 } },

                    // 敏捷流程连接
                    { source: '产品\n待办事项', target: '迭代\n规划', lineStyle: { color: '#2ca02c', width: 3 } },
                    { source: '迭代\n规划', target: '开发\n实现', lineStyle: { color: '#2ca02c', width: 3 } },
                    { source: '开发\n实现', target: '测试\n验证', lineStyle: { color: '#2ca02c', width: 3 } },
                    { source: '测试\n验证', target: '可工作\n软件', lineStyle: { color: '#2ca02c', width: 3 } },
                    { source: '可工作\n软件', target: '评审\n回顾', lineStyle: { color: '#2ca02c', width: 3 } },
                    { source: '评审\n回顾', target: '产品\n待办事项', lineStyle: { color: '#2ca02c', width: 3, type: 'dashed' } }
                ],
                categories: [
                    { name: 'waterfall' },
                    { name: 'agile' }
                ]
            }
        ],
        graphic: [
            // 分割线
            {
                type: 'line',
                shape: { x1: 320, y1: 50, x2: 320, y2: 450 },
                style: { stroke: '#ddd', lineWidth: 2, lineDash: [5, 5] }
            },
            // 流程特点说明
            {
                type: 'text',
                left: '15%',
                bottom: '15%',
                style: {
                    text: '线性顺序执行\n每阶段完成后进入下阶段\n难以回退和修改',
                    fill: '#666',
                    font: '12px sans-serif',
                    align: 'center'
                }
            },
            {
                type: 'text',
                right: '15%',
                bottom: '15%',
                style: {
                    text: '循环迭代执行\n短周期快速反馈\n持续改进和适应',
                    fill: '#666',
                    font: '12px sans-serif',
                    align: 'center'
                }
            }
        ]
    };

    chart.setOption(option);
    saveChartInstance('methodology-comparison-chart', chart);
    
    console.log('方法论比较图表初始化完成');
}