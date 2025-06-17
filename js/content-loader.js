// 内容加载器 - 负责动态加载各个章节的HTML内容

class ContentLoader {
    constructor() {
        this.loadedSections = new Set();
        this.loadingQueue = [];
        this.isLoading = false;
        this.currentSection = null; // 当前显示的章节
    }

    // 初始化内容加载
    async initialize() {
        try {
            // 从 URL 获取初始锚点
            const hash = window.location.hash.slice(1);
            
            // 首先加载第一部分（默认显示）
            if (hash) {
                // 如果有锚点，解析章节和锚点
                const sectionMatch = hash.match(/part(\d+)/);
                if (sectionMatch) {
                    await this.loadSection(`part${sectionMatch[1]}`, hash);
                } else {
                    await this.loadSection('part1');
                }
            } else {
                await this.loadSection('part1');
            }
            
            // 设置懒加载观察器
            this.setupIntersectionObserver();
            
            // 监听 hashchange 事件
            window.addEventListener('hashchange', () => {
                const newHash = window.location.hash.slice(1);
                if (newHash) {
                    const sectionMatch = newHash.match(/part(\d+)/);
                    if (sectionMatch) {
                        this.loadSection(`part${sectionMatch[1]}`, newHash);
                    }
                }
            });
            
            console.log('内容加载器初始化完成');
        } catch (error) {
            console.error('内容加载器初始化失败:', error);
        }
    }

    // 加载指定章节（切换式显示）
    async loadSection(sectionId, anchor = null) {
        if (this.isLoading) {
            this.loadingQueue.push({ sectionId, anchor });
            return;
        }

        this.isLoading = true;

        try {
            const response = await fetch(`sections/${sectionId}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            
            // 找到目标容器
            const container = document.getElementById('content-container');
            if (!container) {
                throw new Error('内容容器未找到');
            }

            // 清空现有内容（实现切换效果）
            container.innerHTML = '';

            // 创建临时容器来解析HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            
            // 添加到页面
            container.appendChild(tempDiv.firstElementChild);
            
            // 更新当前加载的章节
            this.currentSection = sectionId;
            this.loadedSections.add(sectionId);
            console.log(`章节 ${sectionId} 加载完成`);

            // 触发相应的图表初始化
            this.initializeSectionCharts(sectionId);

            // 更新菜单激活状态
            this.updateMenuActiveState(sectionId, anchor);

            // 重新渲染 LaTeX 公式
            if (window.MathJax) {
                window.MathJax.typesetPromise && window.MathJax.typesetPromise();
            }

            // 如果有指定锚点，滚动到锚点位置
            if (anchor) {
                setTimeout(() => {
                    const element = document.getElementById(anchor);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100); // 给图表初始化一点时间
            } else {
                // 否则滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

        } catch (error) {
            console.error(`加载章节 ${sectionId} 失败:`, error);
            this.showLoadingError(sectionId);
        } finally {
            this.isLoading = false;
            
            // 处理队列中的下一个请求
            if (this.loadingQueue.length > 0) {
                const next = this.loadingQueue.shift();
                setTimeout(() => this.loadSection(next.sectionId, next.anchor), 100);
            }
        }
    }

    // 设置交叉观察器进行懒加载
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    if (targetId && !this.loadedSections.has(targetId)) {
                        this.loadSection(targetId);
                    }
                }
            });
        }, options);

        // 观察占位符元素
        document.querySelectorAll('.section-placeholder').forEach(el => {
            observer.observe(el);
        });
    }

    // 初始化对应章节的图表
    initializeSectionCharts(sectionId) {
        switch (sectionId) {
            case 'part1':
                if (typeof initializeFailureChart === 'function') {
                    setTimeout(initializeFailureChart, 100);
                }
                break;
            case 'part2':
                if (typeof initializeEVMChart === 'function') {
                    setTimeout(initializeEVMChart, 100);
                }
                break;
            case 'part3':
                if (typeof initializeStakeholderChart === 'function') {
                    setTimeout(initializeStakeholderChart, 100);
                }
                break;
            case 'part4':
                if (typeof initializeRiskMatrix === 'function') {
                    setTimeout(initializeRiskMatrix, 100);
                }
                if (typeof initializeMethodologyChart === 'function') {
                    setTimeout(initializeMethodologyChart, 200);
                }
                break;
            case 'part5':
                if (typeof initializeMethodologyChart === 'function') {
                    setTimeout(initializeMethodologyChart, 100);
                }
                break;
            case 'part6-1':
                if (typeof initializeQuestionListeners === 'function') {
                    setTimeout(initializeQuestionListeners, 100);
                }
                break;
            case 'part6-2':
                // 名词解释页面不需要特殊图表
                break;
            case 'part6-3':
                // 计算题页面不需要特殊图表
                break;
            case 'part6-4':
                // 案例分析页面不需要特殊图表
                break;
        }
    }

    // 显示加载错误
    showLoadingError(sectionId) {
        const container = document.getElementById('content-container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-error mb-4';
            errorDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>加载章节 ${sectionId} 失败，请检查网络连接或刷新页面重试。</span>
                <button class="btn btn-sm btn-ghost" onclick="contentLoader.loadSection('${sectionId}')">重试</button>
            `;
            container.appendChild(errorDiv);
        }
    }

    // 获取加载状态
    getLoadingStatus() {
        return {
            loadedSections: Array.from(this.loadedSections),
            isLoading: this.isLoading,
            queueLength: this.loadingQueue.length
        };
    }

    // 更新菜单激活状态
    updateMenuActiveState(sectionId, anchor) {
        // 移除所有菜单项的激活状态
        document.querySelectorAll('.menu a').forEach(link => {
            link.classList.remove('active');
            link.parentElement.classList.remove('active'); // 移除 li 的激活状态
        });

        // 激活当前菜单项
        if (anchor) {
            const menuItem = document.querySelector(`.menu a[href="#${anchor}"]`);
            if (menuItem) {
                menuItem.classList.add('active');
                menuItem.parentElement.classList.add('active'); // 添加 li 的激活状态
            }
        }
    }
}

// 创建全局实例
const contentLoader = new ContentLoader(); 