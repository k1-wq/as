// 模拟飞行记录数据
const allRecords = [
    { id: '#FL2026052501', date: '2026-05-25 14:30', device: 'DJI Mavic 3 Pro', duration: '25分钟', distance: '3.2km', altitude: '120m', status: 'completed' },
    { id: '#FL2026052402', date: '2026-05-24 09:15', device: 'DJI Air 3', duration: '18分钟', distance: '2.1km', altitude: '85m', status: 'completed' },
    { id: '#FL2026052301', date: '2026-05-23 16:45', device: 'DJI Mini 4 Pro', duration: '--', distance: '--', altitude: '--', status: 'cancelled' },
    { id: '#FL2026052203', date: '2026-05-22 11:20', device: 'Autel EVO II', duration: '32分钟', distance: '4.5km', altitude: '150m', status: 'completed' },
    { id: '#FL2026052101', date: '2026-05-21 08:30', device: 'DJI Mavic 3 Pro', duration: '12分钟', distance: '1.3km', altitude: '60m', status: 'failed' },
    { id: '#FL2026052002', date: '2026-05-20 15:10', device: 'DJI Air 3', duration: '28分钟', distance: '3.8km', altitude: '110m', status: 'completed' },
    { id: '#FL2026051901', date: '2026-05-19 10:25', device: 'DJI Mavic 3 Pro', duration: '35分钟', distance: '5.2km', altitude: '130m', status: 'completed' },
    { id: '#FL2026051803', date: '2026-05-18 14:50', device: 'DJI Mini 4 Pro', duration: '22分钟', distance: '2.8km', altitude: '95m', status: 'completed' },
    { id: '#FL2026051702', date: '2026-05-17 09:30', device: 'Autel EVO II', duration: '40分钟', distance: '6.1km', altitude: '140m', status: 'completed' },
    { id: '#FL2026051601', date: '2026-05-16 16:20', device: 'DJI Air 3', duration: '15分钟', distance: '1.9km', altitude: '70m', status: 'completed' },
    { id: '#FL2026051504', date: '2026-05-15 11:45', device: 'DJI Mavic 3 Pro', duration: '30分钟', distance: '4.3km', altitude: '125m', status: 'completed' },
    { id: '#FL2026051402', date: '2026-05-14 08:15', device: 'DJI Mini 4 Pro', duration: '--', distance: '--', altitude: '--', status: 'cancelled' },
    { id: '#FL2026051301', date: '2026-05-13 15:30', device: 'Autel EVO II', duration: '27分钟', distance: '3.5km', altitude: '105m', status: 'completed' },
    { id: '#FL2026051203', date: '2026-05-12 10:40', device: 'DJI Air 3', duration: '20分钟', distance: '2.6km', altitude: '80m', status: 'completed' },
    { id: '#FL2026051102', date: '2026-05-11 14:25', device: 'DJI Mavic 3 Pro', duration: '38分钟', distance: '5.8km', altitude: '145m', status: 'completed' },
    { id: '#FL2026051001', date: '2026-05-10 09:50', device: 'DJI Mini 4 Pro', duration: '16分钟', distance: '2.0km', altitude: '75m', status: 'failed' },
    { id: '#FL2026050903', date: '2026-05-09 16:10', device: 'Autel EVO II', duration: '33分钟', distance: '4.7km', altitude: '135m', status: 'completed' },
    { id: '#FL2026050802', date: '2026-05-08 11:35', device: 'DJI Air 3', duration: '24分钟', distance: '3.1km', altitude: '100m', status: 'completed' },
    { id: '#FL2026050701', date: '2026-05-07 08:45', device: 'DJI Mavic 3 Pro', duration: '29分钟', distance: '4.0km', altitude: '115m', status: 'completed' },
    { id: '#FL2026050604', date: '2026-05-06 15:55', device: 'DJI Mini 4 Pro', duration: '19分钟', distance: '2.4km', altitude: '85m', status: 'completed' },
    { id: '#FL2026050502', date: '2026-05-05 10:20', device: 'Autel EVO II', duration: '36分钟', distance: '5.3km', altitude: '140m', status: 'completed' },
    { id: '#FL2026050401', date: '2026-05-04 14:40', device: 'DJI Air 3', duration: '21分钟', distance: '2.7km', altitude: '90m', status: 'completed' },
    { id: '#FL2026050303', date: '2026-05-03 09:05', device: 'DJI Mavic 3 Pro', duration: '31分钟', distance: '4.6km', altitude: '128m', status: 'completed' },
    { id: '#FL2026050202', date: '2026-05-02 16:30', device: 'DJI Mini 4 Pro', duration: '--', distance: '--', altitude: '--', status: 'cancelled' },
    { id: '#FL2026050101', date: '2026-05-01 11:15', device: 'Autel EVO II', duration: '26分钟', distance: '3.4km', altitude: '108m', status: 'completed' }
];

// 分页配置
let currentPage = 1;
const recordsPerPage = 6;
let filteredRecords = [...allRecords];
let currentFilter = 'all';

// 获取状态显示文本和样式
function getStatusInfo(status) {
    const statusMap = {
        'completed': { text: '完成', class: 'status-completed' },
        'failed': { text: '异常', class: 'status-failed' },
        'cancelled': { text: '取消', class: 'status-cancelled' }
    };
    return statusMap[status] || { text: status, class: '' };
}

// 渲染表格数据
function renderTable() {
    const tbody = document.getElementById('recordsTableBody');
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const pageRecords = filteredRecords.slice(startIndex, endIndex);

    if (pageRecords.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="no-data">
                        <div class="no-data-icon">📭</div>
                        <p>暂无飞行记录</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = pageRecords.map(record => {
        const statusInfo = getStatusInfo(record.status);
        const buttons = record.status === 'cancelled' 
            ? '<button class="btn-small">详情</button>'
            : record.status === 'failed'
            ? '<button class="btn-small">详情</button><button class="btn-small">报告</button>'
            : '<button class="btn-small">详情</button><button class="btn-small">回放</button>';

        return `
            <tr>
                <td>${record.id}</td>
                <td>${record.date}</td>
                <td>${record.device}</td>
                <td>${record.duration}</td>
                <td>${record.distance}</td>
                <td>${record.altitude}</td>
                <td><span class="status-badge ${statusInfo.class}">${statusInfo.text}</span></td>
                <td>${buttons}</td>
            </tr>
        `;
    }).join('');
}

// 渲染分页控件
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // 上一页按钮
    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            上一页
        </button>
    `;

    // 页码按钮
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="page-info">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="page-info">...</span>`;
        }
        paginationHTML += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    // 下一页按钮
    paginationHTML += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            下一页
        </button>
    `;

    // 页码信息
    paginationHTML += `
        <span class="page-info">
            第 ${currentPage} / ${totalPages} 页，共 ${filteredRecords.length} 条记录
        </span>
    `;

    pagination.innerHTML = paginationHTML;
}

// 切换页面
function changePage(page) {
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
    
    if (page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;
    renderTable();
    renderPagination();

    // 滚动到表格顶部
    document.querySelector('.records-table').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// 过滤记录
function filterRecords(filter) {
    currentFilter = filter;
    currentPage = 1;

    switch(filter) {
        case 'week':
            // 模拟本周数据（最近7天）
            filteredRecords = allRecords.slice(0, 8);
            break;
        case 'month':
            // 模拟本月数据（最近30天）
            filteredRecords = allRecords.slice(0, 20);
            break;
        case 'completed':
            filteredRecords = allRecords.filter(r => r.status === 'completed');
            break;
        case 'cancelled':
            filteredRecords = allRecords.filter(r => r.status === 'cancelled');
            break;
        case 'failed':
            filteredRecords = allRecords.filter(r => r.status === 'failed');
            break;
        default:
            filteredRecords = [...allRecords];
    }

    renderTable();
    renderPagination();
    updateStatistics();
}

// 更新统计数据
function updateStatistics() {
    const totalFlights = filteredRecords.length;
    const completedCount = filteredRecords.filter(r => r.status === 'completed').length;
    const successRate = totalFlights > 0 ? Math.round((completedCount / totalFlights) * 100) : 0;

    document.getElementById('totalFlights').textContent = totalFlights;
    document.getElementById('successRate').textContent = successRate + '%';
}

// 导出记录功能
function exportRecords() {
    alert('导出功能正在开发中...');
}

// 过滤器按钮事件
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterRecords(filter);
        });
    });

    // 初始渲染
    renderTable();
    renderPagination();
});