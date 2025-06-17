// 第六部分：期末模拟试卷问答题库 - 图表功能

// 显示答案的通用函数
function showAnswer(answerId) {
    const answerElement = document.getElementById(answerId);
    const button = event.target;
    
    if (answerElement) {
        const isHidden = answerElement.classList.contains('hidden');
        
        if (isHidden) {
            // 显示答案
            answerElement.classList.remove('hidden');
            button.textContent = '隐藏答案';
            button.classList.remove('btn-primary');
            button.classList.add('btn-secondary');
            
            // 添加滑入动画效果
            answerElement.style.opacity = '0';
            answerElement.style.transform = 'translateY(-20px)';
            answerElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                answerElement.style.opacity = '1';
                answerElement.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // 隐藏答案
            answerElement.style.opacity = '0';
            answerElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                answerElement.classList.add('hidden');
                button.textContent = '查看答案';
                button.classList.remove('btn-secondary');
                button.classList.add('btn-primary');
            }, 300);
        }
    }
}

// 初始化考试统计图表
function initializeExamStatsChart() {
    const chartDom = document.getElementById('examTypeChart');
    if (!chartDom) {
        console.warn('examTypeChart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '考试题型分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '题型分布',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 20, name: '选择题' },
                    { value: 20, name: '名词解释' },
                    { value: 30, name: '简答题' },
                    { value: 20, name: '计算题' },
                    { value: 10, name: '案例分析' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    chart.setOption(option);
    saveChartInstance('examTypeChart', chart);
    
    console.log('考试统计图表初始化完成');
}

// 初始化知识点覆盖图表
function initializeKnowledgeChart() {
    const chartDom = document.getElementById('knowledgeChart');
    if (!chartDom) {
        console.warn('knowledgeChart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '知识点覆盖分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '题目数量'
        },
        yAxis: {
            type: 'category',
            data: ['整体管理', '范围管理', '时间管理', '成本管理', '质量管理', '人力资源', '沟通管理', '风险管理', '采购管理', '干系人管理']
        },
        series: [
            {
                name: '题目数量',
                type: 'bar',
                data: [3, 5, 4, 4, 3, 4, 3, 4, 2, 3],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                }
            }
        ]
    };
    
    chart.setOption(option);
    saveChartInstance('knowledgeChart', chart);
    
    console.log('知识点覆盖图表初始化完成');
}

// 初始化难度分布图表
function initializeDifficultyChart() {
    const chartDom = document.getElementById('difficultyChart');
    if (!chartDom) {
        console.warn('difficultyChart 元素未找到');
        return;
    }

    const chart = echarts.init(chartDom);
    const option = {
        title: {
            text: '题目难度分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}题 ({d}%)'
        },
        series: [
            {
                name: '难度分布',
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 15, name: '基础题', itemStyle: { color: '#91cc75' } },
                    { value: 20, name: '中等题', itemStyle: { color: '#fac858' } },
                    { value: 10, name: '困难题', itemStyle: { color: '#ee6666' } }
                ],
                label: {
                    show: true,
                    formatter: '{b}: {c}题'
                }
            }
        ]
    };
    
    chart.setOption(option);
    saveChartInstance('difficultyChart', chart);
    
    console.log('难度分布图表初始化完成');
}

// 题目计时器功能
let timerInterval;
let timeElapsed = 0;

function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    if (!timerDisplay) return;
    
    timerInterval = setInterval(() => {
        timeElapsed++;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    timeElapsed = 0;
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = '00:00';
    }
}

// 自动保存答案功能
function saveAnswer(questionId, answer) {
    const answers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
    answers[questionId] = answer;
    localStorage.setItem('examAnswers', JSON.stringify(answers));
}

function loadAnswers() {
    const answers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
    Object.keys(answers).forEach(questionId => {
        const input = document.querySelector(`input[name="${questionId}"][value="${answers[questionId]}"]`);
        if (input) {
            input.checked = true;
        }
    });
}

// 正确答案配置
const correctAnswers = {
    'q1': 'C',
    'q2': 'D',
    'q3': 'B',
    'q4': 'B',
    'q5': 'C'
    // 可以继续添加更多题目的答案
};

// 检查单选题答案并显示反馈
function checkAnswer(questionId) {
    const selectedInput = document.querySelector(`input[name="${questionId}"]:checked`);
    const feedbackElement = document.getElementById(`${questionId}-feedback`);
    
    if (!selectedInput || !feedbackElement) return;
    
    const selectedValue = selectedInput.value;
    const correctAnswer = correctAnswers[questionId];
    const isCorrect = selectedValue === correctAnswer;
    
    // 清除之前的反馈
    feedbackElement.innerHTML = '';
    feedbackElement.classList.remove('hidden');
    
    // 创建反馈内容
    const feedbackContent = document.createElement('div');
    feedbackContent.className = `alert ${isCorrect ? 'alert-success' : 'alert-error'} mt-3`;
    
    if (isCorrect) {
        feedbackContent.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <h4 class="font-bold">回答正确！</h4>
                <div class="text-sm">你选择了 ${selectedValue}，这是正确答案。</div>
            </div>
        `;
    } else {
        feedbackContent.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
                <h4 class="font-bold">回答错误</h4>
                <div class="text-sm">你选择了 ${selectedValue}，正确答案是 ${correctAnswer}。</div>
            </div>
        `;
    }
    
    feedbackElement.appendChild(feedbackContent);
    
    // 添加动画效果
    feedbackContent.style.opacity = '0';
    feedbackContent.style.transform = 'scale(0.9)';
    feedbackContent.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        feedbackContent.style.opacity = '1';
        feedbackContent.style.transform = 'scale(1)';
    }, 10);
    
    // 保存答案
    saveAnswer(questionId, selectedValue);
    
    // 更新统计数据
    updateStats();
}

// 更新统计数据
function updateStats() {
    const totalQuestions = Object.keys(correctAnswers).length;
    let completedCount = 0;
    let correctCount = 0;
    
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedInput = document.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedInput) {
            completedCount++;
            if (selectedInput.value === correctAnswers[questionId]) {
                correctCount++;
            }
        }
    });
    
    const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;
    
    // 更新显示
    const completedElement = document.getElementById('completed-count');
    const correctElement = document.getElementById('correct-count');
    const accuracyElement = document.getElementById('accuracy-rate');
    
    if (completedElement) completedElement.textContent = completedCount;
    if (correctElement) correctElement.textContent = correctCount;
    if (accuracyElement) accuracyElement.textContent = accuracy + '%';
    
    // 如果完成所有题目，显示祝贺信息
    if (completedCount === totalQuestions) {
        setTimeout(() => {
            showCompletionMessage(accuracy);
        }, 1000);
    }
}

// 显示完成祝贺信息
function showCompletionMessage(accuracy) {
    const message = accuracy >= 80 ? 
        '🎉 恭喜！你已完成所有选择题，正确率很高！' :
        accuracy >= 60 ?
        '👍 不错！你已完成所有选择题，继续加油！' :
        '💪 加油！你已完成所有选择题，可以查看详细解析进一步学习！';
    
    // 创建toast提示
    const toast = document.createElement('div');
    toast.className = 'toast toast-top toast-center z-50';
    toast.innerHTML = `
        <div class="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 计算得分功能
function calculateScore() {
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    
    Object.keys(correctAnswers).forEach(questionId => {
        const selectedInput = document.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedInput && selectedInput.value === correctAnswers[questionId]) {
            score++;
        }
    });
    
    return {
        score: score,
        total: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100)
    };
}

// 显示得分结果
function showScore() {
    const result = calculateScore();
    const scoreModal = document.getElementById('score-modal');
    const scoreText = document.getElementById('score-text');
    
    if (scoreText) {
        scoreText.innerHTML = `
            <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-4">${result.percentage}%</div>
                <div class="text-lg">您答对了 ${result.score} / ${result.total} 题</div>
                <div class="mt-4 text-sm text-base-content/70">
                    ${result.percentage >= 80 ? '优秀！继续保持！' : 
                      result.percentage >= 60 ? '良好，还有提升空间' : 
                      '需要加强复习哦'}
                </div>
            </div>
        `;
    }
    
    if (scoreModal) {
        scoreModal.checked = true;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为选择题添加事件监听器
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            checkAnswer(this.name);
        });
    });
    
    // 加载之前保存的答案
    loadAnswers();
});

// 初始化选择题事件监听器（用于动态加载的内容）
function initializeQuestionListeners() {
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        // 移除已有的监听器，避免重复绑定
        input.removeEventListener('change', handleRadioChange);
        input.addEventListener('change', handleRadioChange);
    });
}

function handleRadioChange() {
    checkAnswer(this.name);
}

// 导出函数供全局使用
window.showAnswer = showAnswer;
window.checkAnswer = checkAnswer;
window.initializeQuestionListeners = initializeQuestionListeners;
window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.resetTimer = resetTimer;
window.showScore = showScore; 