 // 标签切换功能
        function showTab(tabName) {
            const tabs = document.querySelectorAll('.tab-content');
            const buttons = document.querySelectorAll('.tab-btn');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
        
        // 加载已保存的用户信息
        window.addEventListener('load', function() {
            loadUserProfile();
        });
        
        function loadUserProfile() {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                const profile = JSON.parse(savedProfile);
                
                document.getElementById('realName').value = profile.realName || '';
                document.getElementById('gender').value = profile.gender || '';
                document.getElementById('phone').value = profile.phone || '';
                document.getElementById('email').value = profile.email || '';
                document.getElementById('address').value = profile.address || '';
                document.getElementById('city').value = profile.city || '';
                document.getElementById('province').value = profile.province || '';
                document.getElementById('birthday').value = profile.birthday || '';
                document.getElementById('bio').value = profile.bio || '';
                document.getElementById('username').value = profile.username || 'zhangsan';
                
                if (profile.realName) {
                    document.getElementById('displayName').textContent = profile.realName;
                    document.getElementById('avatarDisplay').textContent = profile.realName.charAt(0);
                }
            } else {
                document.getElementById('username').value = 'zhangsan';
            }
        }
        
        // 表单提交处理
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const profile = {
                realName: document.getElementById('realName').value,
                gender: document.getElementById('gender').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                province: document.getElementById('province').value,
                birthday: document.getElementById('birthday').value,
                bio: document.getElementById('bio').value,
                username: document.getElementById('username').value
            };
            
            // 保存到localStorage
            localStorage.setItem('userProfile', JSON.stringify(profile));
            
            // 更新显示
            document.getElementById('displayName').textContent = profile.realName;
            document.getElementById('avatarDisplay').textContent = profile.realName.charAt(0);
            
            // 显示成功消息
            const successMsg = document.getElementById('successMessage');
            successMsg.style.display = 'block';
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        });
        
        // 重置表单
        function resetForm() {
            if (confirm('确定要重置所有修改吗？')) {
                loadUserProfile();
            }
        }
        
        // 更换头像（模拟）
        function changeAvatar() {
            alert('头像上传功能开发中...');
        }