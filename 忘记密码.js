 // 切换验证方式
        function switchVerifyMethod(event, method) {
            // 更新标签状态
            document.querySelectorAll('.verify-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.currentTarget.classList.add('active');

            // 更新表单显示
            document.querySelectorAll('.verify-form').forEach(form => {
                form.classList.remove('active');
            });

            if (method === 'phone') {
                document.getElementById('phoneForm').classList.add('active');
            } else {
                document.getElementById('emailForm').classList.add('active');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('phoneForm').classList.add('active');
            document.getElementById('btnSendPhoneCode').disabled = false;
            document.getElementById('btnSendEmailCode').disabled = false;
        });

        // 发送手机验证码
        function sendPhoneCode() {
            const phone = document.getElementById('phone-number').value;
            
            // 使用正则表达式验证手机号
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('请输入正确的11位手机号');
                return;
            }

            const btn = document.getElementById('btnSendPhoneCode');
            startCountdown(btn);
            
            // 模拟发送验证码
            console.log('发送验证码到:', phone);
            alert('验证码已发送到您的手机，请注意查收（演示：123456）');
        }

        // 发送邮箱验证码
        function sendEmailCode() {
            const email = document.getElementById('reset-email').value;
            
            // 使用正则表达式验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入正确的邮箱地址');
                return;
            }

            const btn = document.getElementById('btnSendEmailCode');
            startCountdown(btn);
            
            // 模拟发送验证码
            console.log('发送验证码到:', email);
            alert('验证码已发送到您的邮箱，请注意查收（演示验证码：123456）');
        }

        // 倒计时功能
        function startCountdown(button) {
            let seconds = 60;
            button.disabled = true;
            button.textContent = `${seconds}秒后重试`;

            const timer = setInterval(() => {
                seconds--;
                button.textContent = `${seconds}秒后重试`;

                if (seconds <= 0) {
                    clearInterval(timer);
                    button.disabled = false;
                    button.textContent = '获取验证码';
                }
            }, 1000);
        }

        // 检查密码强度
        function checkPasswordStrength(password, type) {
            const strengthText = document.getElementById(`${type}-strength-text`);
            const strengthBar = document.getElementById(`${type}-strength-bar`);

            if (!password) {
                strengthText.textContent = '未输入';
                strengthBar.className = 'strength-fill';
                return;
            }

            let strength = 0;
            
            // 长度检查
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            
            // 包含数字
            if (/\d/.test(password)) strength++;
            
            // 包含字母
            if (/[a-zA-Z]/.test(password)) strength++;
            
            // 包含特殊字符
            if (/[^a-zA-Z0-9]/.test(password)) strength++;

            // 更新显示
            if (strength <= 2) {
                strengthText.textContent = '弱';
                strengthBar.className = 'strength-fill weak';
            } else if (strength <= 4) {
                strengthText.textContent = '中等';
                strengthBar.className = 'strength-fill medium';
            } else {
                strengthText.textContent = '强';
                strengthBar.className = 'strength-fill strong';
            }
        }

        // 处理手机重置
        function handlePhoneReset(event) {
            event.preventDefault();
            
            const phone = document.getElementById('phone-number').value;
            const code = document.getElementById('phone-code').value;
            const newPassword = document.getElementById('new-phone-password').value;
            const confirmPassword = document.getElementById('confirm-phone-password').value;

            // 验证
            if (code !== '123456') {
                alert('验证码错误，请输入正确的验证码（演示：123456）');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('两次输入的密码不一致');
                return;
            }

            if (newPassword.length < 8) {
                alert('密码长度至少为8位');
                return;
            }

            // 模拟重置成功
            alert('密码重置成功！请使用新密码登录');
            window.location.href = '首页.html';
        }

        // 处理邮箱重置
        function handleEmailReset(event) {
            event.preventDefault();
            
            const email = document.getElementById('reset-email').value;
            const code = document.getElementById('email-code').value;
            const newPassword = document.getElementById('new-email-password').value;
            const confirmPassword = document.getElementById('confirm-email-password').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                alert('请输入正确的邮箱地址');
                return;
            }

            // 验证
            if (code !== '123456') {
                alert('验证码错误，请输入正确的验证码（演示：123456）');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('两次输入的密码不一致');
                return;
            }

            if (newPassword.length < 8) {
                alert('密码长度至少为8位');
                return;
            }

            // 模拟重置成功
            alert('密码重置成功！请使用新密码登录');
            window.location.href = '首页.html';
        }