  // 全局变量
        let altitude = 0;
        let speed = 0;
        let battery = 100;
        let directionX = 0;
        let directionY = 0;
        let isFlying = false;
        let map = null;
        let droneMarker = null;
        let updateInterval = null;
        let currentLat = 39.9042; // 默认北京坐标
        let currentLng = 116.4074;

        // 主题切换
        const themeToggle = document.getElementById('themeToggle');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');

        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
        });

        // 通知面板切换
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');

        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationPanel.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            notificationPanel.classList.add('hidden');
        });

        // 初始化百度地图
        function initMap() {
            map = new BMap.Map('map');
            const point = new BMap.Point(currentLng, currentLat);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true);

            // 添加无人机标记
            droneMarker = new BMap.Marker(point);
            map.addOverlay(droneMarker);
            
            // 添加信息窗口
            const infoWindow = new BMap.InfoWindow(
                '无人机位置<br/>经度: ' + currentLng.toFixed(6) + '<br/>纬度: ' + currentLat.toFixed(6)
            );
            droneMarker.addEventListener('click', function(){
                this.openInfoWindow(infoWindow);
            });

            // 尝试获取真实GPS位置
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    currentLat = position.coords.latitude;
                    currentLng = position.coords.longitude;
                    const newPoint = new BMap.Point(currentLng, currentLat);
                    map.centerAndZoom(newPoint, 15);
                    droneMarker.setPosition(newPoint);
                    showNotification('定位成功', '已获取当前位置', 'success');
                }, function(error){
                    console.error('定位失败:', error);
                    showNotification('定位提示', '使用默认位置（北京）', 'warning');
                });
            }
        }

        // 摇杆控制
        const joystickHandle = document.getElementById('joystickHandle');
        const joystickContainer = document.querySelector('.joystick-container');
        let isDragging = false;
        let startX, startY;

        joystickHandle.addEventListener('mousedown', startDrag);
        joystickHandle.addEventListener('touchstart', startDrag);

        function startDrag(e) {
            isDragging = true;
            const rect = joystickContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            
            startX = centerX;
            startY = centerY;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', endDrag);
        }

        function drag(e) {
            if (!isDragging) return;
            
            const rect = joystickContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            
            let deltaX = clientX - centerX;
            let deltaY = clientY - centerY;
            
            const maxDistance = 70;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance > maxDistance) {
                deltaX = (deltaX / distance) * maxDistance;
                deltaY = (deltaY / distance) * maxDistance;
            }
            
            joystickHandle.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
            
            // 更新方向值 (-1 到 1)
            directionX = parseFloat((deltaX / maxDistance).toFixed(2));
            directionY = parseFloat((-deltaY / maxDistance).toFixed(2)); // Y轴反转
            
            document.getElementById('directionX').textContent = directionX;
            document.getElementById('directionY').textContent = directionY;
            
            // 根据方向更新速度
            if (isFlying) {
                const maxSpeed = parseFloat(document.getElementById('maxSpeed').value) || 10;
                speed = Math.sqrt(directionX * directionX + directionY * directionY) * maxSpeed;
                speed = parseFloat(speed.toFixed(1));
            }
        }

        function endDrag() {
            isDragging = false;
            joystickHandle.style.transform = 'translate(-50%, -50%)';
            directionX = 0;
            directionY = 0;
            document.getElementById('directionX').textContent = '0';
            document.getElementById('directionY').textContent = '0';
            
            if (isFlying) {
                speed = 0;
            }
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', endDrag);
        }

        // 高度控制滑块
        const altitudeSlider = document.getElementById('altitudeSlider');
        const altitudeValue = document.getElementById('altitudeValue');

        altitudeSlider.addEventListener('input', (e) => {
            altitude = parseInt(e.target.value);
            altitudeValue.textContent = altitude;
            document.getElementById('monitorAltitude').textContent = altitude + ' m';
            document.getElementById('flightAltitude').textContent = altitude + ' m';
        });

        // 状态监控更新
        function updateMonitoring() {
            document.getElementById('monitorAltitude').textContent = altitude + ' m';
            document.getElementById('monitorSpeed').textContent = speed + ' m/s';
            document.getElementById('monitorBattery').textContent = battery + '%';
            document.getElementById('flightAltitude').textContent = altitude + ' m';
            document.getElementById('flightSpeed').textContent = speed + ' m/s';
            document.getElementById('batteryLevel').textContent = battery + '%';
            document.getElementById('batteryProgress').style.width = battery + '%';
            
            // 更新电池颜色
            const batteryProgress = document.getElementById('batteryProgress');
            const monitorBattery = document.getElementById('monitorBattery');
            if (battery > 50) {
                batteryProgress.className = 'h-full bg-success rounded-full transition-all duration-500';
                monitorBattery.className = 'font-mono font-bold text-success';
            } else if (battery > 20) {
                batteryProgress.className = 'h-full bg-warning rounded-full transition-all duration-500';
                monitorBattery.className = 'font-mono font-bold text-warning';
            } else {
                batteryProgress.className = 'h-full bg-danger rounded-full transition-all duration-500';
                monitorBattery.className = 'font-mono font-bold text-danger';
            }
        }

        // 模拟电池消耗
        setInterval(() => {
            if (isFlying && battery > 0) {
                battery -= 0.1;
                battery = Math.max(0, parseFloat(battery.toFixed(1)));
                updateMonitoring();
                
                if (battery <= 20 && battery > 19.9) {
                    showNotification('警告', '电池电量低，建议返航', 'warning');
                }
            }
        }, 1000);

        // 起飞按钮
        document.getElementById('takeoffBtn').addEventListener('click', () => {
            if (!isFlying) {
                isFlying = true;
                document.getElementById('flightStatus').textContent = '飞行中';
                document.getElementById('flightStatus').className = 'text-xl font-bold text-success';
                showNotification('成功', '无人机已起飞', 'success');
                
                // 开始更新无人机位置
                startDroneMovement();
            }
        });

        // 降落按钮
        document.getElementById('landBtn').addEventListener('click', () => {
            if (isFlying) {
                isFlying = false;
                altitude = 0;
                speed = 0;
                altitudeSlider.value = 0;
                altitudeValue.textContent = '0';
                document.getElementById('flightStatus').textContent = '已降落';
                document.getElementById('flightStatus').className = 'text-xl font-bold text-gray-600';
                showNotification('信息', '无人机已降落', 'info');
                updateMonitoring();
            }
        });

        // 返航按钮
        document.getElementById('returnHomeBtn').addEventListener('click', () => {
            if (isFlying) {
                showNotification('信息', '正在返航...', 'info');
                // 模拟返航逻辑
                setTimeout(() => {
                    document.getElementById('landBtn').click();
                }, 3000);
            }
        });

        // 急停按钮
        document.getElementById('emergencyStopBtn').addEventListener('click', () => {
            if (isFlying) {
                isFlying = false;
                speed = 0;
                directionX = 0;
                directionY = 0;
                document.getElementById('flightStatus').textContent = '紧急停止';
                document.getElementById('flightStatus').className = 'text-xl font-bold text-danger';
                showNotification('警告', '紧急停止已激活', 'danger');
                updateMonitoring();
            }
        });

        // 开始无人机移动模拟
        function startDroneMovement() {
            if (updateInterval) clearInterval(updateInterval);
            
            updateInterval = setInterval(() => {
                if (isFlying && (directionX !== 0 || directionY !== 0)) {
                    // 模拟位置更新
                    currentLng += (directionX * 0.0001);
                    currentLat += (directionY * 0.0001);
                    
                    const newPoint = new BMap.Point(currentLng, currentLat);
                    droneMarker.setPosition(newPoint);
                    map.panTo(newPoint);
                    
                    // 更新信息窗口
                    const infoWindow = new BMap.InfoWindow(
                        '无人机位置<br/>经度: ' + currentLng.toFixed(6) + '<br/>纬度: ' + currentLat.toFixed(6) + '<br/>高度: ' + altitude + 'm'
                    );
                    droneMarker.openInfoWindow(infoWindow);
                }
            }, 100);
        }

        // 居中地图
        document.getElementById('centerMapBtn').addEventListener('click', () => {
            if (droneMarker) {
                const point = new BMap.Point(currentLng, currentLat);
                map.centerAndZoom(point, 15);
            }
        });

        // 录制按钮
        document.getElementById('recordBtn').addEventListener('click', () => {
            showNotification('信息', '开始录制视频', 'info');
        });

        // 拍照按钮
        document.getElementById('photoBtn').addEventListener('click', () => {
            showNotification('成功', '照片已保存', 'success');
        });

        // 显示通知
        function showNotification(title, message, type = 'info') {
            const notificationList = document.getElementById('notificationList');
            const notification = document.createElement('div');
            notification.className = 'p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm';
            
            const colors = {
                success: 'text-success',
                warning: 'text-warning',
                danger: 'text-danger',
                info: 'text-primary'
            };
            
            notification.innerHTML = `
                <p class="font-medium ${colors[type]}">${title}</p>
                <p class="text-xs text-gray-500">${message}</p>
            `;
            
            notificationList.insertBefore(notification, notificationList.firstChild);
            
            // 显示通知徽章
            document.getElementById('notificationBadge').style.display = 'block';
            
            // 最多保留10条通知
            while (notificationList.children.length > 10) {
                notificationList.removeChild(notificationList.lastChild);
            }
        }

        // 页面加载完成后初始化
        window.addEventListener('load', () => {
            initMap();
            updateMonitoring();
            showNotification('系统就绪', '所有系统正常运行', 'success');
            
            // 同步无人机状态到localStorage
            syncDroneStatus();
        });
        
        // 同步无人机状态
        function syncDroneStatus() {
            const droneData = {
                isFlying: isFlying,
                altitude: altitude,
                speed: speed,
                battery: battery,
                latitude: currentLat,
                longitude: currentLng,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('droneStatus', JSON.stringify(droneData));
            
            // 每2秒更新一次
            setInterval(() => {
                droneData.altitude = altitude;
                droneData.speed = speed;
                droneData.battery = battery;
                droneData.latitude = currentLat;
                droneData.longitude = currentLng;
                droneData.timestamp = new Date().getTime();
                localStorage.setItem('droneStatus', JSON.stringify(droneData));
            }, 2000);
        }