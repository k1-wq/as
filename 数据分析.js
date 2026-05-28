 // 全局变量
        let charts = {};
        let updateInterval = null;
    
        // 从 localStorage获取无人机数据
        function getDroneData() {
            const savedStatus = localStorage.getItem('droneStatus');
            if (savedStatus) {
                return JSON.parse(savedStatus);
            }
            return null;
        }
    
        // 数字动画函数
        function animateNumber(elementId, targetValue, duration = 1000) {
            const element = document.getElementById(elementId);
            const startValue = parseInt(element.textContent) || 0;
            const increment = (targetValue - startValue) / (duration / 16);
            let currentValue = startValue;
    
            const timer = setInterval(() => {
                currentValue += increment;
                if ((increment > 0 && currentValue >= targetValue) || 
                    (increment < 0 && currentValue <= targetValue)) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(currentValue);
            }, 16);
        }
    
        // 初始化图表
        function initCharts() {
            Chart.defaults.font.family = "'Microsoft YaHei', Arial, sans-serif";
            Chart.defaults.color = '#666';
                
            // 通用配置
            const commonOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14 },
                        bodyFont: { size: 13 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            };
    
            // 电量变化图表
            const batteryCtx = document.getElementById('batteryChart').getContext('2d');
            charts.battery = new Chart(batteryCtx, {
                type: 'line',
                data: {
                    labels: ['0min', '5min', '10min', '15min', '20min', '25min', '30min'],
                    datasets: [{
                        label: '电量 (%)',
                        data: [100, 92, 85, 78, 70, 63, 55],
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#28a745',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        ...commonOptions.scales,
                        y: {
                            ...commonOptions.scales.y,
                            min: 0,
                            max: 100
                        }
                    }
                }
            });
    
            // 高度变化图表
            const altitudeCtx = document.getElementById('altitudeChart').getContext('2d');
            charts.altitude = new Chart(altitudeCtx, {
                type: 'line',
                data: {
                    labels: ['0min', '5min', '10min', '15min', '20min', '25min', '30min'],
                    datasets: [{
                        label: '高度 (m)',
                        data: [0, 30, 60, 90, 120, 100, 80],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#667eea',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: commonOptions
            });
    
            // 速度波动图表
            const speedCtx = document.getElementById('speedChart').getContext('2d');
            charts.speed = new Chart(speedCtx, {
                type: 'line',
                data: {
                    labels: ['0min', '5min', '10min', '15min', '20min', '25min', '30min'],
                    datasets: [{
                        label: '速度 (km/h)',
                        data: [0, 12, 18, 15, 20, 16, 14],
                        borderColor: '#f5576c',
                        backgroundColor: 'rgba(245, 87, 108, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#f5576c',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: commonOptions
            });
    
            // 飞行时长分布图表
            const durationCtx = document.getElementById('durationChart').getContext('2d');
            charts.duration = new Chart(durationCtx, {
                type: 'bar',
                data: {
                    labels: ['第1次飞行', '第2次飞行', '第3次飞行', '第4次飞行', '第5次飞行'],
                    datasets: [{
                        label: '飞行时长 (分钟)',
                        data: [15, 20, 12, 18, 25],
                        backgroundColor: [
                            'rgba(102, 126, 234, 0.8)',
                            'rgba(118, 75, 162, 0.8)',
                            'rgba(79, 172, 254, 0.8)',
                            'rgba(0, 242, 254, 0.8)',
                            'rgba(40, 167, 69, 0.8)'
                        ],
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    ...commonOptions,
                    plugins: {
                        ...commonOptions.plugins,
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // 加载飞行记录
        function loadFlightRecords() {
            const records = [
                {
                    id: 'FL001',
                    date: '2026-05-26 14:30',
                    duration: '15分钟',
                    maxAltitude: '120m',
                    avgSpeed: '15km/h',
                    batteryUsed: '25%',
                    status: 'completed'
                },
                {
                    id: 'FL002',
                    date: '2026-05-26 10:15',
                    duration: '20分钟',
                    maxAltitude: '95m',
                    avgSpeed: '18km/h',
                    batteryUsed: '30%',
                    status: 'completed'
                },
                {
                    id: 'FL003',
                    date: '2026-05-25 16:45',
                    duration: '12分钟',
                    maxAltitude: '80m',
                    avgSpeed: '12km/h',
                    batteryUsed: '20%',
                    status: 'completed'
                },
                {
                    id: 'FL004',
                    date: '2026-05-25 09:20',
                    duration: '18分钟',
                    maxAltitude: '110m',
                    avgSpeed: '16km/h',
                    batteryUsed: '28%',
                    status: 'completed'
                },
                {
                    id: 'FL005',
                    date: '2026-05-24 15:00',
                    duration: '25分钟',
                    maxAltitude: '100m',
                    avgSpeed: '14km/h',
                    batteryUsed: '35%',
                    status: 'in-progress'
                }
            ];

            const tbody = document.getElementById('flightRecordsBody');
            tbody.innerHTML = '';
            
            records.forEach((record, index) => {
                const row = document.createElement('tr');
                row.style.animationDelay = `${index * 0.1}s`;
                row.innerHTML = `
                    <td><strong>${record.id}</strong></td>
                    <td>${record.date}</td>
                    <td>${record.duration}</td>
                    <td>${record.maxAltitude}</td>
                    <td>${record.avgSpeed}</td>
                    <td>${record.batteryUsed}</td>
                    <td>
                        <span class="status-badge ${record.status}">
                            ${record.status === 'completed' ? '✓ 已完成' : 
                              record.status === 'in-progress' ? '⏱ 进行中' : '✗ 失败'}
                        </span>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        // 更新统计数据（带动画）
        function updateStats() {
            const droneData = getDroneData();
            if (droneData) {
                animateNumber('avgBattery', Math.floor(droneData.battery));
                animateNumber('maxAltitude', Math.floor(droneData.altitude));
                animateNumber('avgSpeed', Math.floor(droneData.speed));
                
                // 更新图表数据
                updateCharts(droneData);
            }
        }

        // 更新图表数据
        function updateCharts(droneData) {
            if (!charts.battery || !charts.altitude || !charts.speed) return;
            
            // 这里可以添加实时更新图表数据的逻辑
            // 例如：添加新的数据点，移除旧的数据点
        }

        // 导出数据功能
        function exportData() {
            const data = {
                timestamp: new Date().toISOString(),
                droneStatus: getDroneData(),
                flightRecords: Array.from(document.querySelectorAll('#flightRecordsBody tr')).map(row => {
                    const cells = row.querySelectorAll('td');
                    return {
                        id: cells[0].textContent,
                        date: cells[1].textContent,
                        duration: cells[2].textContent,
                        maxAltitude: cells[3].textContent,
                        avgSpeed: cells[4].textContent,
                        batteryUsed: cells[5].textContent,
                        status: cells[6].textContent
                    };
                })
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `drone-data-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }

        // 刷新数据
        function refreshData() {
            // 显示加载状态
            const cards = document.querySelectorAll('.stat-card');
            cards.forEach(card => {
                card.style.opacity = '0.5';
            });
            
            setTimeout(() => {
                updateStats();
                cards.forEach(card => {
                    card.style.opacity = '1';
                });
            }, 500);
        }

        // 页面加载完成后初始化
        window.addEventListener('load', function() {
            initCharts();
            loadFlightRecords();
            updateStats();
            
            // 每5秒更新一次数据
            updateInterval = setInterval(updateStats, 5000);
            
            // 添加键盘快捷键
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
                    e.preventDefault();
                    refreshData();
                }
            });
        });

        // 页面卸载时清理定时器
        window.addEventListener('beforeunload', () => {
            if (updateInterval) {
                clearInterval(updateInterval);
            }
        });