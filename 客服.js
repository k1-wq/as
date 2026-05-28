    // 切换FAQ展开/收起
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            
            // 关闭其他已展开的项目
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            // 切换当前项目
            faqItem.classList.toggle('active');
        }

        // 联系人工客服
        function openLiveChat() {
            alert('正在为您转接人工客服...\n\n客服工作时间：9:00 - 21:00\n如当前为非工作时间，请留言或发送邮件至 support@dronecontrol.com');
        }

        // 拨打电话
        function callSupport() {
            window.location.href = 'tel:400-888-9999';
        }

        // 显示微信二维码
        function showWechatQR() {
            alert('微信公众号：DroneControl官方\n\n请打开微信搜索并关注我们的公众号，即可随时随地获取客服支持！');
        }

        // 处理反馈提交
        function handleFeedback(event) {
            event.preventDefault();
            
            const name = document.getElementById('feedback-name').value;
            const email = document.getElementById('feedback-email').value;
            const type = document.getElementById('feedback-type').value;
            const subject = document.getElementById('feedback-subject').value;
            const message = document.getElementById('feedback-message').value;
            
            // 验证邮箱格式
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }
            
            // 模拟提交成功
            alert(`感谢您的反馈！\n\n我们已收到您的问题，将尽快通过邮件（${email}）与您联系。\n\n预计回复时间：24小时内`);
            
            // 重置表单
            event.target.reset();
        }

        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 可以在这里添加额外的初始化代码
            console.log('客服中心页面已加载完成');
        });