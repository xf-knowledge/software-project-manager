// 第七部分：《软件工程管理》期中检测 - 图表功能

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
                button.textContent = '查看答案解析';
                button.classList.remove('btn-secondary');
                button.classList.add('btn-primary');
            }, 300);
        }
    }
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
    const answers = JSON.parse(localStorage.getItem('midtermAnswers') || '{}');
    answers[questionId] = answer;
    localStorage.setItem('midtermAnswers', JSON.stringify(answers));
}

function loadAnswers() {
    const answers = JSON.parse(localStorage.getItem('midtermAnswers') || '{}');
    Object.keys(answers).forEach(questionId => {
        const input = document.querySelector(`input[name="${questionId}"][value="${answers[questionId]}"]`);
        if (input) {
            input.checked = true;
        }
    });
}

// 期中考试选择题正确答案
const correctAnswers = {
    'q1': 'D',   // 质量不是项目三角形的组成部分
    'q2': 'C',   // 编写代码不是项目经理的主要职责
    'q3': 'A',   // 甘特图用于项目进度管理
    'q4': 'D',   // 咨询服务不是项目风险管理的活动
    'q5': 'C',   // 政府监管机构通常不属于项目干系人
    'q6': 'D',   // 启动是最初开始的过程组
    'q7': 'B',   // 变更控制的主要目的是记录和评估变更请求
    'q8': 'D',   // 挣值分析不是成本估算的方法
    'q9': 'C',   // 挣值用来衡量进度差异
    'q10': 'A'   // PDCA循环代表计划-执行-检查-行动
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
    
    // 如果完成所有选择题，显示祝贺信息
    if (completedCount === totalQuestions) {
        setTimeout(() => {
            showCompletionMessage(accuracy);
        }, 1000);
    }
}

// 显示完成祝贺信息
function showCompletionMessage(accuracy) {
    let message;
    if (accuracy >= 90) {
        message = '🏆 优秀！选择题正确率达到90%以上，基础扎实！';
    } else if (accuracy >= 80) {
        message = '🎉 良好！选择题正确率很高，继续保持！';
    } else if (accuracy >= 70) {
        message = '👍 不错！选择题有一定基础，还需加强！';
    } else if (accuracy >= 60) {
        message = '💪 及格！选择题基础知识还需提升！';
    } else {
        message = '📚 加油！建议复习相关知识点后重新答题！';
    }
    
    // 创建toast提示
    const toast = document.createElement('div');
    toast.className = 'toast toast-top toast-center z-50';
    toast.innerHTML = `
        <div class="alert alert-success shadow-lg max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // 5秒后自动移除
    setTimeout(() => {
        toast.remove();
    }, 5000);
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
        percentage: Math.round((score / totalQuestions) * 100),
        points: score * 2  // 每题2分
    };
}

// 显示得分结果
function showScore() {
    const result = calculateScore();
    
    // 创建模态框显示结果
    const modal = document.createElement('div');
    modal.className = 'modal modal-open';
    modal.innerHTML = `
        <div class="modal-box max-w-md">
            <h3 class="font-bold text-lg mb-4">📊 期中考试选择题得分</h3>
            <div class="text-center mb-6">
                <div class="text-6xl font-bold text-primary mb-2">${result.points}分</div>
                <div class="text-xl mb-2">您答对了 <span class="font-bold text-success">${result.score}</span> / ${result.total} 题</div>
                <div class="text-lg mb-2">正确率：<span class="font-bold">${result.percentage}%</span></div>
                <div class="divider"></div>
                <div class="text-base ${result.percentage >= 80 ? 'text-success' : result.percentage >= 60 ? 'text-warning' : 'text-error'}">
                    ${result.percentage >= 90 ? '🏆 优秀！基础知识非常扎实' : 
                      result.percentage >= 80 ? '🎉 良好！继续保持这个水平' : 
                      result.percentage >= 70 ? '👍 不错，还有提升空间' : 
                      result.percentage >= 60 ? '💪 及格，需要加强复习' :
                      '📚 需要深入学习基础知识'}
                </div>
            </div>
            
            <div class="stats shadow mb-4">
                <div class="stat">
                    <div class="stat-title">选择题得分</div>
                    <div class="stat-value text-primary">${result.points}/20</div>
                    <div class="stat-desc">满分20分</div>
                </div>
                <div class="stat">
                    <div class="stat-title">正确题数</div>
                    <div class="stat-value text-success">${result.score}</div>
                    <div class="stat-desc">共${result.total}题</div>
                </div>
            </div>
            
            <div class="alert alert-info mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <div class="font-bold">提醒</div>
                    <div class="text-sm">期中考试还包括简答题（30分）和案例分析题（50分），请完成全部题目以获得完整评估。</div>
                </div>
            </div>
            
            <div class="modal-action">
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">确定</button>
                <button class="btn btn-outline" onclick="resetTimer(); this.closest('.modal').remove();">重新开始</button>
            </div>
        </div>
        <div class="modal-backdrop" onclick="this.closest('.modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
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
    
    // 初始化统计数据
    updateStats();
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