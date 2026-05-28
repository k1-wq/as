 // 全局变量
        let isBluetoothOn = false;
        let isScanning = false;
        let scanTimer = null;
        let availableDevices = [];
        let pairedDevices = [];
        let connectedDeviceId = null;

        // 模拟设备数据
        const mockDevices = [
            { id: 'drone1', name: 'DJI Mavic 3 Pro', type: 'drone', signal: 4, battery: 85 },
            { id: 'drone2', name: 'DJI Air 2S', type: 'drone', signal: 3, battery: 62 },
            { id: 'drone3', name: 'DJI Mini 3', type: 'drone', signal: 2, battery: 45 },
            { id: 'controller1', name: 'DJI RC Controller', type: 'controller', signal: 4, battery: 90 },
            { id: 'glasses1', name: 'DJI Goggles 2', type: 'glasses', signal: 3, battery: 70 }
        ];

        // 切换蓝牙开关
        function toggleBluetooth() {
            const toggle = document.getElementById('bluetoothToggle');
            const statusText = document.getElementById('bluetoothStatusText');
            const scanControl = document.getElementById('scanControl');
            
            isBluetoothOn = toggle.checked;
            
            if (isBluetoothOn) {
                statusText.textContent = '已开启 - 可被发现';
                scanControl.style.display = 'flex';
                showToast('success', '✓', '蓝牙已开启');
                
                // 自动开始扫描
                setTimeout(() => {
                    toggleScan();
                }, 500);
            } else {
                statusText.textContent = '已关闭';
                scanControl.style.display = 'none';
                
                // 停止扫描
                if (isScanning) {
                    toggleScan();
                }
                
                // 隐藏可用设备
                document.getElementById('availableDevices').style.display = 'none';
                
                showToast('info', 'ℹ', '蓝牙已关闭');
            }
        }

        // 切换扫描
        function toggleScan() {
            const scanBtn = document.getElementById('scanBtn');
            const scanBtnText = document.getElementById('scanBtnText');
            const scanIcon = document.getElementById('scanIcon');
            const scanStatusText = document.getElementById('scanStatusText');
            const scanSubtext = document.getElementById('scanSubtext');
            
            if (!isScanning) {
                // 开始扫描
                isScanning = true;
                scanBtn.classList.add('scanning');
                scanBtnText.textContent = '停止扫描';
                scanIcon.classList.remove('paused');
                scanStatusText.textContent = '正在扫描...';
                scanSubtext.textContent = '搜索附近的设备';
                
                // 清空可用设备列表
                availableDevices = [];
                updateAvailableDevices();
                
                // 模拟发现设备
                simulateDeviceDiscovery();
                
                showToast('info', '🔍', '开始扫描设备...');
            } else {
                // 停止扫描
                isScanning = false;
                scanBtn.classList.remove('scanning');
                scanBtnText.textContent = '开始扫描';
                scanIcon.classList.add('paused');
                scanStatusText.textContent = '扫描已停止';
                scanSubtext.textContent = '点击重新开始扫描';
                
                if (scanTimer) {
                    clearTimeout(scanTimer);
                }
                
                showToast('info', '⏸', '扫描已停止');
            }
        }

        // 模拟设备发现
        function simulateDeviceDiscovery() {
            let discoveredCount = 0;
            
            const discoverInterval = setInterval(() => {
                if (!isScanning || discoveredCount >= mockDevices.length) {
                    clearInterval(discoverInterval);
                    
                    if (isScanning) {
                        // 扫描完成
                        document.getElementById('scanStatusText').textContent = '扫描完成';
                        document.getElementById('scanSubtext').textContent = `发现 ${availableDevices.length} 个设备`;
                        
                        // 3秒后自动停止
                        setTimeout(() => {
                            if (isScanning) {
                                toggleScan();
                            }
                        }, 3000);
                    }
                    return;
                }
                
                // 添加一个新设备
                const device = mockDevices[discoveredCount];
                if (!availableDevices.find(d => d.id === device.id) && 
                    !pairedDevices.find(d => d.id === device.id)) {
                    availableDevices.push({
                        ...device,
                        discovered: true
                    });
                    updateAvailableDevices();
                    
                    // 显示提示
                    showToast('success', '📱', `发现设备: ${device.name}`);
                }
                
                discoveredCount++;
            }, 1500);
        }

        // 更新可用设备列表
        function updateAvailableDevices() {
            const container = document.getElementById('availableDeviceList');
            const countElement = document.getElementById('availableCount');
            const section = document.getElementById('availableDevices');
            
            countElement.textContent = availableDevices.length;
            
            if (availableDevices.length === 0) {
                section.style.display = 'none';
                return;
            }
            
            section.style.display = 'block';
            
            container.innerHTML = availableDevices.map(device => `
                <div class="device-item" id="device-${device.id}">
                    <div class="device-icon">${getDeviceIcon(device.type)}</div>
                    <div class="device-details">
                        <div class="device-name">${device.name}</div>
                        <div class="device-info">
                            <div class="device-status">
                                <span class="status-dot"></span>
                                <span>可用</span>
                            </div>
                            <div class="signal-strength">
                                ${generateSignalBars(device.signal)}
                            </div>
                            <span>🔋 ${device.battery}%</span>
                        </div>
                    </div>
                    <div class="device-actions">
                        <button class="btn-pair" onclick="pairDevice('${device.id}')">配对</button>
                    </div>
                </div>
            `).join('');
        }

        // 更新已配对设备列表
        function updatePairedDevices() {
            const container = document.getElementById('pairedDeviceList');
            const countElement = document.getElementById('pairedCount');
            
            countElement.textContent = pairedDevices.length;
            
            if (pairedDevices.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📭</div>
                        <h4>暂无已配对设备</h4>
                        <p>开启蓝牙并扫描以发现新设备</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = pairedDevices.map(device => `
                <div class="device-item ${device.connected ? 'connected' : ''}" id="paired-${device.id}">
                    <div class="device-icon">${getDeviceIcon(device.type)}</div>
                    <div class="device-details">
                        <div class="device-name">
                            ${device.name}
                            <span class="paired-badge">已配对</span>
                        </div>
                        <div class="device-info">
                            <div class="device-status">
                                <span class="status-dot"></span>
                                <span>${device.connected ? '已连接' : '未连接'}</span>
                            </div>
                            <div class="signal-strength">
                                ${generateSignalBars(device.signal)}
                            </div>
                            <span>🔋 ${device.battery}%</span>
                        </div>
                    </div>
                    <div class="device-actions">
                        ${device.connected 
                            ? `<button class="btn-disconnect" onclick="disconnectDevice('${device.id}')">断开</button>`
                            : `<button class="btn-connect" onclick="connectDevice('${device.id}')">连接</button>`
                        }
                    </div>
                </div>
            `).join('');
        }

        // 配对设备
        function pairDevice(deviceId) {
            const device = availableDevices.find(d => d.id === deviceId);
            if (!device) return;
            
            // 从可用设备中移除
            availableDevices = availableDevices.filter(d => d.id !== deviceId);
            updateAvailableDevices();
            
            // 添加到已配对设备
            pairedDevices.push({
                ...device,
                connected: false
            });
            updatePairedDevices();
            
            showToast('success', '✓', `已成功配对: ${device.name}`);
        }

        // 连接设备
        function connectDevice(deviceId) {
            const device = pairedDevices.find(d => d.id === deviceId);
            if (!device) return;
            
            // 先断开其他设备
            pairedDevices.forEach(d => {
                if (d.connected) {
                    d.connected = false;
                }
            });
            
            // 显示连接中状态
            const deviceElement = document.getElementById(`paired-${deviceId}`);
            if (deviceElement) {
                deviceElement.classList.add('connecting');
            }
            
            showToast('info', '⏳', `正在连接 ${device.name}...`);
            
            // 模拟连接延迟
            setTimeout(() => {
                device.connected = true;
                connectedDeviceId = deviceId;
                updatePairedDevices();
                
                showToast('success', '✓', `已连接到: ${device.name}`);
                
                // 保存连接状态到localStorage
                saveConnectionState(device);
                
                // 3秒后可以跳转到控制页面
                setTimeout(() => {
                    if (confirm('连接成功！是否进入控制页面？')) {
                        window.location.href = '地图.html?drone=' + deviceId;
                    }
                }, 1000);
            }, 2000);
        }

        // 保存连接状态
        function saveConnectionState(device) {
            const connectionData = {
                id: device.id,
                name: device.name,
                type: device.type,
                connected: true,
                connectedAt: new Date().toISOString()
            };
            
            localStorage.setItem('connectedDevice', JSON.stringify(connectionData));
            
            console.log('连接状态已保存:', connectionData);
        }

        // 断开设备
        function disconnectDevice(deviceId) {
            const device = pairedDevices.find(d => d.id === deviceId);
            if (!device) return;
            
            device.connected = false;
            connectedDeviceId = null;
            updatePairedDevices();
            
            // 清除localStorage中的连接状态
            localStorage.removeItem('connectedDevice');
            
            showToast('info', '⚠', `已断开: ${device.name}`);
        }

        // 获取设备图标
        function getDeviceIcon(type) {
            const icons = {
                drone: '🚁',
                controller: '🎮',
                glasses: '🥽'
            };
            return icons[type] || '📱';
        }

        // 生成信号条
        function generateSignalBars(strength) {
            let bars = '';
            for (let i = 1; i <= 4; i++) {
                bars += `<div class="signal-bar ${i <= strength ? 'active' : ''}"></div>`;
            }
            return bars;
        }

        // 显示提示消息
        function showToast(type, icon, message) {
            const toast = document.getElementById('toastMessage');
            const toastIcon = document.getElementById('toastIcon');
            const toastText = document.getElementById('toastText');
            
            toast.className = 'toast-message show ' + type;
            toastIcon.textContent = icon;
            toastText.textContent = message;
            
            // 3秒后自动隐藏
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', function() {
            console.log('设备连接页面已加载');
        });