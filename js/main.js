// 主要功能：页面初始化、导航、通用交互
document.addEventListener('DOMContentLoaded', function () {
    // 初始化页面功能
    initializeNavigation();
    initializeDrawer();
    
    // 延迟加载图表，确保DOM完全加载
    setTimeout(() => {
        initializeCharts();
    }, 100);
});

// 导航功能初始化
function initializeNavigation() {
    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            let targetElement;
            if (targetId.length > 1) {
                targetElement = document.querySelector(targetId);
            }

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // 在移动设备上关闭侧边栏
            const drawerCheckbox = document.getElementById('my-drawer-3');
            if (drawerCheckbox && window.innerWidth < 1024) {
                drawerCheckbox.checked = false;
            }
        });
    });
}

// 抽屉式导航初始化
function initializeDrawer() {
    // 可以在这里添加更多抽屉相关的功能
    console.log('抽屉式导航已初始化');
}

// 初始化所有图表
function initializeCharts() {
    // 检查ECharts是否加载完成
    if (typeof echarts === 'undefined') {
        console.error('ECharts未加载完成');
        return;
    }

    try {
        // 初始化各个图表（只调用存在的函数）
        if (typeof initializeFailureChart === 'function') {
            initializeFailureChart();
        }
        if (typeof initializeEVMChart === 'function') {
            initializeEVMChart();
        }
        if (typeof initializeRiskMatrix === 'function') {
            initializeRiskMatrix();
        }
        if (typeof initializeStakeholderChart === 'function') {
            initializeStakeholderChart();
        }
        if (typeof initializeMethodologyChart === 'function') {
            initializeMethodologyChart();
        }
        if (typeof initializeKnowledgeChart === 'function') {
            initializeKnowledgeChart();
        }
        if (typeof initializeDifficultyChart === 'function') {
            initializeDifficultyChart();
        }
        
        // 窗口大小改变时重新调整图表
        window.addEventListener('resize', function () {
            resizeAllCharts();
        });
        
        console.log('图表初始化完成');
    } catch (error) {
        console.error('图表初始化失败:', error);
    }
}

// 调整所有图表大小
function resizeAllCharts() {
    const chartIds = [
        'failure-reasons-chart',
        'evm-chart', 
        'risk-matrix-chart',
        'stakeholder-chart',
        'methodology-comparison-chart',
        'exam-stats-chart',
        'knowledge-coverage-chart',
        'difficulty-chart'
    ];
    
    chartIds.forEach(id => {
        const chartDom = document.getElementById(id);
        if (chartDom && chartDom._echarts_instance_) {
            chartDom._echarts_instance_.resize();
        }
    });
}

// 保存图表实例到DOM元素上，方便后续调用
function saveChartInstance(domId, chartInstance) {
    const dom = document.getElementById(domId);
    if (dom) {
        dom._echarts_instance_ = chartInstance;
    }
} 