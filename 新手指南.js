 // 模拟学习进度更新
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn-primary');
            const progressBars = document.querySelectorAll('.progress-fill');
            
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', function() {
                    // 模拟学习完成
                    setTimeout(() => {
                        progressBars[index].style.width = '100%';
                        updateTotalProgress();
                    }, 1000);
                });
            });
            
            function updateTotalProgress() {
                const completed = Array.from(progressBars).filter(bar => 
                    bar.style.width === '100%'
                ).length;
                
                const total = progressBars.length;
                const percentage = Math.round((completed / total) * 100);
                
                document.getElementById('totalProgress').textContent = percentage + '%';
                document.getElementById('totalProgressBar').style.width = percentage + '%';
            }
        });