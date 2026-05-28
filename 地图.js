  // ========== 全局变量 ==========
        let map = null;
        let droneMarker = null;
        let userLocationMap = null;
        let updateInterval = null;
        let flightPath = null;
        let pathCoordinates = [];

        // ========== URL参数处理 ==========
        function getUrlParams() {
            const params = new URLSearchParams(window.location.search);
            return {
                drone: params.get('drone') || 'all'
            };
        }

        // ========== 百度地图初始化 ==========
        function initMap() {
            const urlParams = getUrlParams();
            
            console.log('加载地图监控页面，参数:', urlParams);

            // 创建主地图实例（无人机监控）
            map = new BMap.Map("mapContainer");
            const point = new BMap.Point(109.2099, 34.6480);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true);
            
            // 添加地图控件
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.addControl(new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]
            }));

            // 创建无人机标记图标
            const droneIcon = new BMap.Icon(
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiM2NjdlZWEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIj7wn5qBPC90ZXh0Pjwvc3ZnPg==",
                new BMap.Size(40, 40),
                { anchor: new BMap.Size(20, 20) }
            );

            // 创建无人机标记
            droneMarker = new BMap.Marker(point, { icon: droneIcon });
            map.addOverlay(droneMarker);

            // 添加信息窗口
            const infoWindow = createInfoWindow();
            droneMarker.addEventListener("click", function() {
                this.openInfoWindow(infoWindow);
            });

            // 初始化用户位置地图
            initUserLocationMap();
            
            // 启动实时更新（仅显示）
            startRealTimeUpdate();
        }



        // ========== 创建信息窗口 ==========
        function createInfoWindow() {
            return new BMap.InfoWindow(
                '<div style="padding: 10px;">' +
                '<h4 style="margin: 0 0 10px 0;">无人机 A</h4>' +
                '<p style="margin: 5px 0;">状态: 飞行中</p>' +
                '<p style="margin: 5px 0;">高度: ' + document.getElementById('altitude').innerText + '</p>' +
                '<p style="margin: 5px 0;">速度: ' + document.getElementById('speed').innerText + '</p>' +
                '</div>',
                { width: 250, height: 120, title: "无人机信息" }
            );
        }

        // ========== 用户位置地图初始化 ==========
        function initUserLocationMap() {
            if (!navigator.geolocation) {
                console.log('浏览器不支持地理定位');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    displayUserLocation(position);
                },
                function(error) {
                    console.error('获取位置失败:', error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        }

        // ========== 显示用户位置 ==========
        function displayUserLocation(position) {
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            // 坐标转换（GPS转百度坐标）
            const gpsPoint = new BMap.Point(longitude, latitude);
            const convertor = new BMap.Convertor();
            const pointArr = [gpsPoint];
            
            convertor.translate(pointArr, 1, 5, function(data) {
                if (data.status === 0) {
                    const bdPoint = data.points[0];
                    
                    // 创建用户位置地图
                    userLocationMap = new BMap.Map("geoInfo");
                    userLocationMap.centerAndZoom(bdPoint, 15);
                    userLocationMap.enableScrollWheelZoom(true);
                    
                    // 添加用户位置标记
                    const userIcon = new BMap.Icon(
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiMyOGE3NDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIj7wn5eNPC90ZXh0Pjwvc3ZnPg==",
                        new BMap.Size(40, 40),
                        { anchor: new BMap.Size(20, 20) }
                    );
                    
                    const userMarker = new BMap.Marker(bdPoint, { icon: userIcon });
                    userLocationMap.addOverlay(userMarker);
                    
                    // 添加精度圆圈
                    const accuracyCircle = new BMap.Circle(bdPoint, position.coords.accuracy, {
                        strokeColor: "#28a745",
                        strokeWeight: 2,
                        strokeOpacity: 0.5,
                        fillColor: "#28a745",
                        fillOpacity: 0.1
                    });
                    userLocationMap.addOverlay(accuracyCircle);
                    
                    // 添加信息窗口
                    const infoWindow = new BMap.InfoWindow(
                        '<div style="padding: 10px;">' +
                        '<h4 style="margin: 0 0 10px 0;">我的位置</h4>' +
                        '<p style="margin: 5px 0;">经度: ' + longitude.toFixed(6) + '</p>' +
                        '<p style="margin: 5px 0;">纬度: ' + latitude.toFixed(6) + '</p>' +
                        '<p style="margin: 5px 0;">精度: ' + position.coords.accuracy.toFixed(2) + '米</p>' +
                        '</div>',
                        { width: 250, height: 120, title: "位置信息" }
                    );
                    
                    userMarker.addEventListener("click", function() {
                        this.openInfoWindow(infoWindow);
                    });
                    
                    // 添加控件
                    userLocationMap.addControl(new BMap.NavigationControl());
                    userLocationMap.addControl(new BMap.ScaleControl());
                    
                    console.log('用户位置地图初始化成功');
                }
            });
        }

        // ========== 实时更新（仅显示） ==========
        function startRealTimeUpdate() {
            if (updateInterval) {
                clearInterval(updateInterval);
            }
            
            updateInterval = setInterval(() => {
                updateDronePosition();
            }, 2000);
        }

        function updateDronePosition() {
            const currentPos = droneMarker.getPosition();
            const lng = currentPos.lng + (Math.random() - 0.5) * 0.001;
            const lat = currentPos.lat + (Math.random() - 0.5) * 0.001;
            
            const newPos = new BMap.Point(lng, lat);
            droneMarker.setPosition(newPos);
            
            // 记录轨迹坐标
            pathCoordinates.push(newPos);
            // 最多保留200个轨迹点
            if (pathCoordinates.length > 200) {
                pathCoordinates.shift();
            }
            
            // 如果路线显示已开启，更新路线
            if (flightPath) {
                map.removeOverlay(flightPath);
                flightPath = new BMap.Polyline(pathCoordinates, {
                    strokeColor: "#667eea",
                    strokeWeight: 4,
                    strokeOpacity: 0.8,
                    strokeStyle: "solid"
                });
                map.addOverlay(flightPath);
            }

            // 更新信息面板
            document.getElementById('longitude').innerHTML = lng.toFixed(4) + '<span class="unit">°E</span>';
            document.getElementById('latitude').innerHTML = lat.toFixed(4) + '<span class="unit">°N</span>';
            document.getElementById('altitude').innerHTML = Math.floor(100 + Math.random() * 40) + '<span class="unit">m</span>';
            document.getElementById('speed').innerHTML = Math.floor(10 + Math.random() * 10) + '<span class="unit">km/h</span>';
            document.getElementById('battery').innerHTML = Math.floor(80 + Math.random() * 10) + '<span class="unit">%</span>';
        }



        // ========== 无人机管理 ==========
        function selectDrone(droneId) {
            console.log('选择无人机:', droneId);
            alert('已切换到查看无人机: ' + droneId);
        }

        function viewDrone(droneId) {
            alert('查看无人机详情: ' + droneId);
        }

        // ========== 路线显示功能 ==========
        function toggleFlightPath() {
            const btnText = document.getElementById('pathButtonText');
            
            if (flightPath) {
                // 隐藏路线
                map.removeOverlay(flightPath);
                flightPath = null;
                btnText.textContent = '显示路线';
            } else {
                // 显示路线
                if (pathCoordinates.length < 2) {
                    alert('暂无飞行路线数据，请稍后再试');
                    return;
                }
                
                flightPath = new BMap.Polyline(pathCoordinates, {
                    strokeColor: "#667eea",
                    strokeWeight: 4,
                    strokeOpacity: 0.8,
                    strokeStyle: "solid"
                });
                map.addOverlay(flightPath);
                btnText.textContent = '隐藏路线';
            }
        }

        function clearFlightPath() {
            if (flightPath) {
                map.removeOverlay(flightPath);
                flightPath = null;
            }
            pathCoordinates = [];
            document.getElementById('pathButtonText').textContent = '显示路线';
            alert('✅ 飞行路线已清除');
        }

        // ========== 页面初始化 ==========
        window.onload = function() {
            initMap();
            
            // 检查是否有连接的设备
            checkDeviceConnection();
            
            // 从控制台同步无人机状态
            syncFromConsole();
        };
        
        // 从控制台同步数据
        function syncFromConsole() {
            const savedStatus = localStorage.getItem('droneStatus');
            if (savedStatus) {
                try {
                    const droneData = JSON.parse(savedStatus);
                    
                    // 检查数据是否新鲜（5分钟内）
                    const now = new Date().getTime();
                    if (now - droneData.timestamp < 300000) {
                        console.log('从控制台同步无人机状态:', droneData);
                        
                        // 更新显示的数据
                        if (droneData.latitude && droneData.longitude) {
                            currentLat = droneData.latitude;
                            currentLng = droneData.longitude;
                            
                            // 更新地图位置
                            const newPos = new BMap.Point(currentLng, currentLat);
                            droneMarker.setPosition(newPos);
                            map.panTo(newPos);
                        }
                        
                        // 更新信息面板
                        if (droneData.altitude !== undefined) {
                            document.getElementById('altitude').innerHTML = Math.floor(droneData.altitude) + '<span class="unit">m</span>';
                        }
                        if (droneData.speed !== undefined) {
                            document.getElementById('speed').innerHTML = Math.floor(droneData.speed) + '<span class="unit">km/h</span>';
                        }
                        if (droneData.battery !== undefined) {
                            document.getElementById('battery').innerHTML = Math.floor(droneData.battery) + '<span class="unit">%</span>';
                        }
                    }
                } catch(e) {
                    console.error('解析无人机状态失败:', e);
                }
            }
            
            // 每3秒检查一次更新
            setInterval(() => {
                const updatedStatus = localStorage.getItem('droneStatus');
                if (updatedStatus && updatedStatus !== savedStatus) {
                    location.reload(); // 刷新页面以获取最新数据
                }
            }, 3000);
        }

        // 检查设备连接状态
        function checkDeviceConnection() {
            const connectedDevice = localStorage.getItem('connectedDevice');
            
            if (connectedDevice) {
                const device = JSON.parse(connectedDevice);
                console.log('检测到已连接设备:', device.name);
                
                // 可以在这里显示连接状态提示
                showConnectionIndicator(device);
            }
        }

        // 显示连接状态指示器
        function showConnectionIndicator(device) {
            // 创建连接状态指示器
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: white;
                padding: 12px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideInRight 0.3s ease;
            `;
            
            indicator.innerHTML = `
                <span style="font-size: 1.5rem;">📡</span>
                <div>
                    <div style="font-weight: bold; color: #333;">已连接</div>
                    <div style="font-size: 0.9rem; color: #666;">${device.name}</div>
                </div>
            `;
            
            document.body.appendChild(indicator);
            
            // 5秒后自动隐藏
            setTimeout(() => {
                indicator.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    indicator.remove();
                }, 300);
            }, 5000);
        }

        // 监听浏览器后退按钮
        window.onpopstate = function(event) {
            const urlParams = getUrlParams();
            currentDroneId = urlParams.drone;
            console.log('URL参数变化:', urlParams);
        };