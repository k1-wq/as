// 保存检查清单状态
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checkbox');
    
    // 加载保存的状态
    checkboxes.forEach((checkbox, index) => {
        const saved = localStorage.getItem(`safety-check-${index}`);
        if (saved === 'true') {
            checkbox.checked = true;
        }
        
        // 保存状态变化
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`safety-check-${index}`, this.checked);
        });
    });
});