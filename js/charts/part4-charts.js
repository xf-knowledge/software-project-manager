// 第四部分：管理不确定性与整合 - 图表功能

// 初始化风险概率-影响矩阵图表
function initializeRiskMatrix() {
    const chartDom = document.getElementById('risk-matrix-chart');
    if (!chartDom) {
        console.warn('risk-matrix-chart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const riskData = [
        // [probability, impact, riskName]
        [0.1, 0.8, '核心开发离职'], 
        [0.2, 0.9, '重大需求变更'],
        [0.5, 0.6, '服务器宕机'], 
        [0.7, 0.7, '供应链中断'],
        [0.9, 0.4, '测试资源不足'], 
        [0.4, 0.3, '低优先级模块延迟'],
        [0.2, 0.2, '非核心功能Bug'], 
        [0.8, 0.9, '安全漏洞攻击']
    ];

    const option = {
        title: {
            text: '项目风险概率-影响分析矩阵',
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
            name: '影响 (Impact)', 
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
            name: '概率 (Probability)', 
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
            data: riskData.map(item => [item[1], item[0], item[2]]),
            symbolSize: 20,
            label: {
                show: true,
                position: 'bottom',
                formatter: (params) => params.data[2],
                color: '#333',
                fontSize: 10
            },
            itemStyle: {
                color: function(params) {
                    const impact = params.data[0];
                    const probability = params.data[1];
                    const riskScore = impact * probability;
                    if (riskScore >= 0.36) return '#ff4d4f'; // 高风险 - 红色
                    if (riskScore >= 0.16) return '#fadb14'; // 中风险 - 黄色
                    return '#52c41a'; // 低风险 - 绿色
                }
            }
        }],
        graphic: [
            // 象限标签
            { 
                type: 'text', 
                left: '25%', 
                top: '25%', 
                style: { 
                    text: '高风险区\n(概率高，影响低)', 
                    fill: 'rgba(255, 165, 0, 0.8)', 
                    font: 'bold 12px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            { 
                type: 'text', 
                right: '25%', 
                top: '25%', 
                style: { 
                    text: '极高风险区\n(概率高，影响高)', 
                    fill: 'rgba(255, 0, 0, 0.8)', 
                    font: 'bold 12px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            { 
                type: 'text', 
                left: '25%', 
                bottom: '25%', 
                style: { 
                    text: '低风险区\n(概率低，影响低)', 
                    fill: 'rgba(0, 128, 0, 0.8)', 
                    font: 'bold 12px sans-serif', 
                    textAlign: 'center' 
                } 
            },
            { 
                type: 'text', 
                right: '25%', 
                bottom: '25%', 
                style: { 
                    text: '中风险区\n(概率低，影响高)', 
                    fill: 'rgba(255, 165, 0, 0.8)', 
                    font: 'bold 12px sans-serif', 
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
    saveChartInstance('risk-matrix-chart', chart);
    
    console.log('风险矩阵图表初始化完成');
}

// 初始化方法论对比图表
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
                shape: { x1: '50%', y1: '10%', x2: '50%', y2: '90%' },
                style: { stroke: '#ddd', lineWidth: 2, lineDash: [5, 5] }
            },
            // 流程特点说明
            {
                type: 'text',
                left: '25%',
                bottom: '5%',
                style: {
                    text: '线性顺序执行\n每阶段完成后进入下阶段\n难以回退和修改',
                    fill: '#666',
                    font: '12px sans-serif',
                    textAlign: 'center'
                }
            },
            {
                type: 'text',
                right: '25%',
                bottom: '5%',
                style: {
                    text: '循环迭代执行\n短周期快速反馈\n持续改进和适应',
                    fill: '#666',
                    font: '12px sans-serif',
                    textAlign: 'center'
                }
            }
        ]
    };
    
    chart.setOption(option);
    saveChartInstance('methodology-comparison-chart', chart);
    
    console.log('方法论对比图表初始化完成');
} 