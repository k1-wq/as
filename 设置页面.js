function addNewDevice() {
            alert('添加新功能正在开发中...');
        }
        
        // 模拟设备数据更新
        setInterval(function() {
            const onlineDevices = document.querySelectorAll('.status-online');
            onlineDevices.forEach(device => {
                // 随机更新电量显示
                const batteryElement = device.parentElement.querySelector('.stat-value');
                if (batteryElement && batteryElement.textContent.includes('%')) {
                    const currentBattery = parseInt(batteryElement.textContent);
                    const newBattery = Math.max(10, currentBattery - Math.floor(Math.random() * 3));
                    batteryElement.textContent = newBattery + '%';
                }
            });
        }, 10000);