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

// 正确答案配置 - 完整的100道题答案
const correctAnswers = {
    // 第一部分：项目管理基础 (1-18题)
    'q1': 'C',   // IT项目超时比例222%
    'q2': 'C',   // 项目特征不包括重复性
    'q3': 'C',   // 项目定义
    'q4': 'B',   // 运营定义
    'q5': 'C',   // 软件项目管理困难核心挑战 - 过程可见性差
    'q6': 'C',   // PMBOK五大过程组顺序
    'q7': 'B',   // 启动过程授权项目经理
    'q8': 'A',   // 规划过程产出WBS等
    'q9': 'B',   // 范围管理核心目标
    'q10': 'C',  // 整体管理协调统一
    'q11': 'D',  // 软件工程关注产品，项目管理关注过程
    'q12': 'C',  // "做正确的事"是项目管理目标
    'q13': 'C',  // 项目生命周期执行阶段成本人力峰值
    'q14': 'C',  // 项目失败首要原因 - 需求规范不充分
    'q15': 'C',  // PMBOK十大知识领域包括风险管理
    'q16': 'B',  // 项目临时性意味着有明确开始结束点
    'q17': 'C',  // 软件项目"经验失效快" - 技术快速更新换代
    'q18': 'B',  // 项目监控发现偏差应采取纠正措施

    // 第二部分：范围、时间与成本管理 (19-55题)
    'q19': 'B',  // 镀金 Gold Plating
    'q20': 'D',  // WBS最底层 - 工作包
    'q21': 'B',  // 100%规则用于WBS
    'q22': 'C',  // 创建WBS过程
    'q23': 'B',  // SS开始到开始依赖关系
    'q24': 'C',  // PERT三点估算TM最可能时间
    'q25': 'B',  // 总浮动时间为零表示在关键路径上
    'q26': 'A',  // 快速跟进Fast Tracking
    'q27': 'C',  // 类比估算
    'q28': 'B',  // 应急储备用于已知-未知风险
    'q29': 'C',  // CPI = EV / AC
    'q30': 'D',  // EV=100, PV=120, AC=90 进度落后成本节约
    'q31': 'D',  // CPI=1.2表示每花1元完成1.2元工作
    'q32': 'B',  // TCPI>1需要更高成本效率
    'q33': 'B',  // 成本基准=工作包成本+应急储备
    'q34': 'B',  // 正向传递计算ES和EF
    'q35': 'A',  // LS = LF - 持续时间
    'q36': 'D',  // SV = EV - PV
    'q37': 'B',  // SPI=0.9表示进度完成90%
    'q38': 'A',  // EAC = AC + ETC
    'q39': 'B',  // 关键路径长度等于总工期
    'q40': 'C',  // 非关键活动延迟小于浮动时间不影响总工期
    'q41': 'D',  // SF开始到完成最不常见
    'q42': 'C',  // 赶工Crashing增加成本
    'q43': 'B',  // 快速跟进增加风险
    'q44': 'C',  // WBS+OBS=责任分配矩阵RAM
    'q45': 'B',  // EV挣值定义
    'q46': 'A',  // PV=EV=150, AC=180 进度符合成本超支
    'q47': 'D',  // VAC = BAC - EAC
    'q48': 'C',  // 自下而上估算基于工作包
    'q49': 'B',  // 管理储备用于未知-未知风险
    'q50': 'C',  // 范围控制监督状态管理变更
    'q51': 'C',  // CV>0, SV<0 成本节约进度落后
    'q52': 'B',  // 自由浮动时间不影响紧后活动ES
    'q53': 'C',  // 成本管理计划来自规划成本管理
    'q54': 'B',  // 三重制约不包括风险
    'q55': 'B',  // WBS分解到工作包可靠估算

    // 第三部分：人员、过程与沟通管理 (56-83题)
    'q56': 'B',  // 质量活动贯穿始终重在预防
    'q57': 'D',  // QA和QC不是同一回事
    'q58': 'B',  // RACI中A负责人必须唯一
    'q59': 'D',  // 项目型组织项目经理权力最大
    'q60': 'C',  // 有挑战性工作是激励因素
    'q61': 'C',  // 权力利益都高的干系人重点管理
    'q62': 'C',  // 10人团队45条沟通渠道
    'q63': 'B',  // 健壮性Robustness
    'q64': 'C',  // 塔克曼规范阶段Norming
    'q65': 'B',  // 缓和/包容策略
    'q66': 'A',  // 培训流程评审是预防成本
    'q67': 'B',  // 职能型组织项目经理像协调员
    'q68': 'C',  // 保健因素消除不满
    'q69': 'B',  // 权力/利益方格分析干系人
    'q70': 'D',  // 权力低利益高的干系人随时告知
    'q71': 'A',  // 沟通复杂性指数级增长
    'q72': 'D',  // 成熟阶段采用授权型领导
    'q73': 'D',  // 客户投诉保修是外部失败成本
    'q74': 'C',  // 矩阵型组织双重汇报
    'q75': 'C',  // 合作/解决问题是双赢策略
    'q76': 'B',  // 可移植性定义
    'q77': 'C',  // RACI矩阵明确角色职责
    'q78': 'C',  // 震荡阶段解决冲突建立信任
    'q79': 'B',  // 质量审计属于实施质量保证
    'q80': 'C',  // 积极倾听和反馈不是沟通障碍
    'q81': 'D',  // 项目型组织缺乏归属感
    'q82': 'C',  // 激励知识型员工需要认可和成长机会
    'q83': 'D',  // 监控过程组贯穿整个生命周期

    // 第四部分：风险、采购与整合管理 (84-95题)
    'q84': 'C',  // 风险可能是机会也可能是威胁
    'q85': 'B',  // 概率影响矩阵用于定性风险分析
    'q86': 'A',  // 成立特别小组是开拓策略
    'q87': 'B',  // 变更控制委员会CCB
    'q88': 'C',  // 制定项目管理计划不属于收尾
    'q89': 'B',  // 风险登记册在识别风险时创建
    'q90': 'C',  // 交叉培训是减轻策略
    'q91': 'B',  // 购买保险是转移策略
    'q92': 'B',  // 项目管理计划是主文件
    'q93': 'B',  // CCB评估变更影响并决策
    'q94': 'C',  // 经验教训作为组织过程资产
    'q95': 'B',  // 被动接受风险

    // 第五部分：方法论与综合策略 (96-100题)
    'q96': 'B',  // 瀑布模型适合需求明确稳定项目
    'q97': 'D',  // 敏捷价值观不包括遵循计划高于响应变化
    'q98': 'B',  // 敏捷每个迭代产出可交付增量
    'q99': 'C',  // 案例分析第一步识别问题
    'q100': 'B'  // 敏捷通过迭代反馈应对不确定性
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
    let message;
    if (accuracy >= 90) {
        message = '🏆 惊人！你已完成全部100题，正确率达到90%以上，你是真正的项目管理专家！';
    } else if (accuracy >= 80) {
        message = '🎉 优秀！你已完成全部100题，正确率很高，项目管理基础非常扎实！';
    } else if (accuracy >= 70) {
        message = '👍 良好！你已完成全部100题，有一定基础，继续努力提升！';
    } else if (accuracy >= 60) {
        message = '💪 及格！你已完成全部100题，基础知识还需加强，建议深入学习！';
    } else {
        message = '📚 加油！你已完成全部100题，建议查看详细解析并重新学习相关知识点！';
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
        percentage: Math.round((score / totalQuestions) * 100)
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
            <h3 class="font-bold text-lg mb-4">🎯 答题结果统计</h3>
            <div class="text-center mb-6">
                <div class="text-6xl font-bold text-primary mb-2">${result.percentage}%</div>
                <div class="text-xl mb-2">您答对了 <span class="font-bold text-success">${result.score}</span> / ${result.total} 题</div>
                <div class="divider"></div>
                <div class="text-base ${result.percentage >= 80 ? 'text-success' : result.percentage >= 60 ? 'text-warning' : 'text-error'}">
                    ${result.percentage >= 90 ? '🏆 项目管理专家' : 
                      result.percentage >= 80 ? '🎉 优秀！继续保持！' : 
                      result.percentage >= 70 ? '👍 良好，还有提升空间' : 
                      result.percentage >= 60 ? '💪 及格，需要加强复习' :
                      '📚 需要深入学习哦'}
                </div>
            </div>
            
            <div class="stats shadow mb-4">
                <div class="stat">
                    <div class="stat-title">正确</div>
                    <div class="stat-value text-success">${result.score}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">错误</div>
                    <div class="stat-value text-error">${result.total - result.score}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">总分</div>
                    <div class="stat-value">${result.total}</div>
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