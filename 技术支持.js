// ==================== 平滑滚动到指定章节 ====================
/**
 * 滚动到指定的技术章节
 * @param {string} sectionId - 章节ID
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // 更新导航按钮状态
        document.querySelectorAll('.tech-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// ==================== 监听滚动更新导航状态 ====================
/**
 * 根据滚动位置自动更新导航按钮的激活状态
 */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.tech-section');
    const navBtns = document.querySelectorAll('.tech-nav-btn');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(current)) {
            btn.classList.add('active');
        }
    });
});

// ==================== 页面加载完成后的初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 技术支持页面加载完成');
    console.log('📊 项目技术栈:');
    console.log('  - HTML5 + CSS3 + JavaScript ES6+');
    console.log('  - Tailwind CSS (CDN)');
    console.log('  - 百度地图 API v3.0');
    console.log('  - Chart.js (数据可视化)');
    console.log('  - Apache ECharts (高性能图表)');
    console.log('  - Coze AI SDK (智能客服)');
    console.log('  - localStorage (本地数据存储)');
    console.log('  - Canvas API (粒子系统)');
});