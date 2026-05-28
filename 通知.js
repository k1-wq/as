// 通知数据
let notifications = [
    {
        id: 1,
        type: 'task',
        title: '新飞行任务已分配',
        message: '您有一个新的航拍任务待执行：城市公园全景拍摄，预计飞行时长25分钟。',
        time: '5分钟前',
        read: false,
        badge: '新任务',
        action: '查看详情'
    },
    {
        id: 2,
        type: 'analysis',
        title: '飞行分析报告已生成',
        message: '昨日飞行任务FL001的分析报告已完成，发现3个优化建议，点击查看详细分析。',
        time: '1小时前',
        read: false,
        badge: '分析报告',
        action: '查看报告'
    },
    {
        id: 3,
        type: 'alert',
        title: '电池电量低警告',
        message: '当前无人机电池电量仅剩20%，建议立即返航充电，以确保飞行安全。',
        time: '2小时前',
        read: false,
        badge: '紧急',
        action: '立即处理'
    },
    {
        id: 4,
        type: 'task',
        title: '飞行任务已完成',
        message: '任务FL002已成功完成，飞行时长20分钟，最大高度95米，数据已自动保存。',
        time: '3小时前',
        read: false,
        badge: '已完成',
        action: '查看结果'
    },
    {
        id: 5,
        type: 'system',
        title: '系统更新通知',
        message: 'DroneControl v2.1.0版本已发布，新增智能避障功能和优化的路径规划算法。',
        time: '5小时前',
        read: false,
        badge: '系统',
        action: '查看详情'
    },
    {
        id: 6,
        type: 'analysis',
        title: '每周飞行总结',
        message: '本周共完成5次飞行任务，总飞行时长90分钟，平均高度85米，表现优秀！',
        time: '昨天',
        read: true,
        badge: '周报',
        action: '查看详情'
    },
    {
        id: 7,
        type: 'task',
        title: '任务即将开始提醒',
        message: '预定的航拍任务将在30分钟后开始，请提前检查设备状态和电池电量。',
        time: '昨天',
        read: true,
        badge: '提醒',
        action: '准备起飞'
    },
    {
        id: 8,
        type: 'alert',
        title: '禁飞区警告',
        message: '检测到您的飞行路线接近禁飞区域，请立即调整航线，确保合规飞行。',
        time: '昨天',
        read: true,
        badge: '警告',
        action: '调整航线'
    },
    {
        id: 9,
        type: 'system',
        title: '设备连接成功',
        message: '无人机DJI-Mavic-3已成功连接，信号强度良好，GPS卫星12颗，可以起飞。',
        time: '2天前',
        read: true,
        badge: '系统',
        action: '查看详情'
    },
    {
        id: 10,
        type: 'analysis',
        title: '航拍质量评估',
        message: '最近一次航拍任务的图像质量评分为9.2/10，构图优秀，光线条件良好。',
        time: '2天前',
        read: true,
        badge: '评估',
        action: '查看照片'
    },
    {
        id: 11,
        type: 'task',
        title: '任务延期通知',
        message: '由于天气原因，原定于明天的户外航拍任务已延期至后天，请注意调整计划。',
        time: '3天前',
        read: true,
        badge: '延期',
        action: '确认收到'
    },
    {
        id: 12,
        type: 'system',
        title: '存储空间不足',
        message: '设备存储空间已使用85%，建议清理旧数据或扩展存储，以免影响后续飞行记录。',
        time: '3天前',
        read: true,
        badge: '提示',
        action: '清理空间'
    }
];

let currentFilter = 'all';

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    renderNotifications();
    updateStats();
});

// 渲染通知列表
function renderNotifications() {
    const list = document.getElementById('notificationList');
    list.innerHTML = '';

    let filteredNotifications = notifications;
    
    // 根据类型筛选
    if (currentFilter !== 'all') {
        filteredNotifications = notifications.filter(n => n.type === currentFilter);
    }

    if (filteredNotifications.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="icon">📭</div>
                <h3>暂无通知</h3>
                <p>当前筛选条件下没有通知</p>
            </div>
        `;
        return;
    }

    filteredNotifications.forEach((notification, index) => {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.read ? '' : 'unread'}`;
        item.style.animationDelay = `${index * 0.05}s`;
        
        const iconClass = notification.type;
        const badgeClass = `badge-${notification.type}`;
        
        item.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon ${iconClass}">
                    ${getNotificationIcon(notification.type)}
                </div>
                <div class="notification-text">
                    <div class="notification-title">
                        ${notification.title}
                        <span class="notification-badge ${badgeClass}">${notification.badge}</span>
                    </div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-meta">
                        <div class="notification-time">
                            <span>🕒</span>
                            <span>${notification.time}</span>
                        </div>
                        <div class="notification-actions">
                            <button class="btn-notification btn-view" onclick="viewNotification(${notification.id})">
                                ${notification.action}
                            </button>
                            <button class="btn-notification btn-dismiss" onclick="dismissNotification(${notification.id}, event)">
                                忽略
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        list.appendChild(item);
    });
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        task: '✈️',
        analysis: '📊',
        system: '⚙️',
        alert: '⚠️'
    };
    return icons[type] || '📬';
}

// 更新统计数据
function updateStats() {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const task = notifications.filter(n => n.type === 'task').length;
    const analysis = notifications.filter(n => n.type === 'analysis').length;

    animateNumber('totalCount', total);
    animateNumber('unreadCount', unread);
    animateNumber('taskCount', task);
    animateNumber('analysisCount', analysis);
}

// 数字动画
function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const startValue = parseInt(element.textContent) || 0;
    const increment = (targetValue - startValue) / 20;
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= targetValue) || 
            (increment < 0 && currentValue <= targetValue)) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 30);
}

// 按类型筛选
function filterByType(type) {
    currentFilter = type;
    
    // 更新标签样式
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.filter-tab').classList.add('active');
    
    renderNotifications();
}

// 筛选通知（统计卡片点击）
function filterNotifications(type) {
    if (type === 'unread') {
        currentFilter = 'all';
        // 只显示未读
        const list = document.getElementById('notificationList');
        const items = list.querySelectorAll('.notification-item');
        items.forEach(item => {
            if (!item.classList.contains('unread')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    } else {
        filterByType(type);
    }
}

// 查看通知详情
function viewNotification(id) {
    const notification = notifications.find(n => n.id === id);
    if (!notification) return;

    // 标记为已读
    notification.read = true;
    renderNotifications();
    updateStats();

    // 根据类型跳转到相应页面
    switch(notification.type) {
        case 'task':
            window.location.href = '任务管理.html';
            break;
        case 'analysis':
            window.location.href = '数据分析.html';
            break;
        case 'alert':
            window.location.href = '控制台.html';
            break;
        default:
            showToast('info', 'ℹ️', '通知详情功能开发中...');
    }
}

// 忽略通知
function dismissNotification(id, event) {
    event.stopPropagation();
    
    if (confirm('确定要忽略此通知吗？')) {
        notifications = notifications.filter(n => n.id !== id);
        renderNotifications();
        updateStats();
        showToast('success', '✓', '通知已忽略');
    }
}

// 全部标记为已读
function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
    updateStats();
    showToast('success', '✓', '已全部标记为已读');
}

// 清空所有通知
function clearAllNotifications() {
    if (confirm('确定要清空所有通知吗？此操作不可恢复。')) {
        notifications = [];
        renderNotifications();
        updateStats();
        showToast('success', '✓', '所有通知已清空');
    }
}

// 显示提示消息
function showToast(type, icon, message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    
    toast.innerHTML = `
        <span style="font-size: 1.5rem;">${icon}</span>
        <span style="color: #333; font-weight: 500;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);