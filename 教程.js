// 课程内容数据
const lessonData = {
    'basics': {
        title: '📚 基础理论知识',
        type: 'video',
        videoPath: '4b7af911e4a7ee08633fc37623a1922e.mp4',
        content: `
            <div class="video-container-local">
                <video id="tutorialVideo" controls preload="metadata" playsinline>
                    <source src="4b7af911e4a7ee08633fc37623a1922e.mp4" type="video/mp4">
                    <p style="color: white; text-align: center; padding: 20px;">
                        您的浏览器不支持视频播放。<br>
                        请确保视频文件 "4b7af911e4a7ee08633fc37623a1922e.mp4" 在同一目录下。
                    </p>
                </video>
                <div class="video-controls-info">
                    <p>📹 无人机基础教学视频</p>
                    <p class="video-hint">💡 提示：使用下方控制条播放、暂停、调节音量和全屏</p>
                </div>
            </div>
            
            <div class="text-content">
                <h3>一、无人机的基本构造</h3>
                <p>无人机主要由以下几个部分组成：</p>
                <ul>
                    <li><strong>机架：</strong>支撑整个无人机的框架结构</li>
                    <li><strong>电机：</strong>提供动力，驱动螺旋桨旋转</li>
                    <li><strong>螺旋桨：</strong>产生升力和推力</li>
                    <li><strong>飞控系统：</strong>无人机的大脑，控制飞行姿态</li>
                    <li><strong>电池：</strong>为无人机提供能源</li>
                    <li><strong>遥控器：</strong>地面控制设备</li>
                    <li><strong>图传系统：</strong>实时传输画面到地面</li>
                </ul>

                <h3>二、工作原理</h3>
                <p>无人机通过四个或多个电机的转速差异来实现各种飞行动作：</p>
                <ul>
                    <li><strong>上升/下降：</strong>所有电机同时加速或减速</li>
                    <li><strong>前进/后退：</strong>后方电机加速，前方电机减速（或相反）</li>
                    <li><strong>左右移动：</strong>左侧电机加速，右侧电机减速（或相反）</li>
                    <li><strong>旋转：</strong>对角线上的电机转速不同</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 学习建议：</strong>建议先完整观看上方的视频教程，再阅读下面的文字说明，学习效果更好！视频中会详细演示无人机的各个部件和操作要点。
                </div>

                <h3>三、安全知识</h3>
                <p>在飞行前，必须了解以下安全要点：</p>
                <ul>
                    <li>遵守当地法律法规，了解禁飞区域</li>
                    <li>保持视距内飞行，不要超出视线范围</li>
                    <li>远离人群、建筑物和障碍物</li>
                    <li>注意天气条件，避免在大风、雨雪天气飞行</li>
                    <li>确保电池电量充足，预留返航电量</li>
                    <li>定期检查设备状态，确保正常运行</li>
                </ul>

                <div class="warning-box">
                    <strong>⚠️ 重要提醒：</strong>安全第一！任何时候都要将安全放在首位，违规飞行可能导致严重后果。
                </div>
            </div>
        `
    },
    'controller': {
        title: '🎮 遥控器操作',
        type: 'video',
        videoPath: '3f6b0a08545025141db89f6485bb93a3.mp4',
        content: `
            <div class="video-container-local">
                <video id="tutorialVideo" controls preload="metadata" playsinline>
                    <source src="3f6b0a08545025141db89f6485bb93a3.mp4" type="video/mp4">
                    <p style="color: white; text-align: center; padding: 20px;">
                        您的浏览器不支持视频播放。<br>
                        请确保视频文件 "3f6b0a08545025141db89f6485bb93a3.mp4" 在同一目录下。
                    </p>
                </video>
                <div class="video-controls-info">
                    <p>🎮 无人机遥控器操作教学视频</p>
                    <p class="video-hint">💡 提示：观看视频学习遥控器的正确使用方法和操控技巧</p>
                </div>
            </div>
            
            <div class="text-content">
                <h3>一、遥控器基本布局</h3>
                <p>标准无人机遥控器通常包含以下控制部件：</p>
                <ul>
                    <li><strong>左摇杆（Mode 2）：</strong>控制油门（上下）和偏航（左右旋转）</li>
                    <li><strong>右摇杆（Mode 2）：</strong>控制俯仰（前后）和横滚（左右移动）</li>
                    <li><strong>电源开关：</strong>开启/关闭遥控器</li>
                    <li><strong>模式切换：</strong>切换飞行模式（运动、普通、平稳）</li>
                    <li><strong>返航按钮：</strong>一键启动自动返航</li>
                    <li><strong>拍照/录像按钮：</strong>控制相机拍摄</li>
                    <li><strong>云台控制轮：</strong>调整相机角度</li>
                </ul>

                <h3>二、美国手（Mode 2）操作说明</h3>
                <p>这是最常用的操控模式，视频中会详细演示：</p>
                <ul>
                    <li><strong>左摇杆上推：</strong>增加油门，无人机上升</li>
                    <li><strong>左摇杆下拉：</strong>降低油门，无人机下降</li>
                    <li><strong>左摇杆左拨：</strong>逆时针旋转</li>
                    <li><strong>左摇杆右拨：</strong>顺时针旋转</li>
                    <li><strong>右摇杆上推：</strong>向前飞行</li>
                    <li><strong>右摇杆下拉：</strong>向后飞行</li>
                    <li><strong>右摇杆左拨：</strong>向左平移</li>
                    <li><strong>右摇杆右拨：</strong>向右平移</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 练习建议：</strong>先在模拟器上练习，熟练掌握后再进行实机操作。视频中展示了正确的握持姿势和操作方法。
                </div>

                <h3>三、指示灯含义</h3>
                <ul>
                    <li><strong>绿灯常亮：</strong>GPS信号良好，可以起飞</li>
                    <li><strong>黄灯闪烁：</strong>GPS信号弱，建议谨慎飞行</li>
                    <li><strong>红灯闪烁：</strong>电量低或出现故障，立即降落</li>
                    <li><strong>蓝灯闪烁：</strong>正在连接或配对</li>
                </ul>

                <h3>四、操作技巧</h3>
                <p>从视频中可以学习到：</p>
                <ul>
                    <li>正确的遥控器握持姿势</li>
                    <li>摇杆操作的力度控制</li>
                    <li>紧急情况下的快速反应</li>
                    <li>常用快捷键的使用</li>
                    <li>遥控器保养和维护</li>
                </ul>

                <div class="warning-box">
                    <strong>⚠️ 重要提醒：</strong>
                    <ul style="margin-top: 10px;">
                        <li>操作前确保遥控器电量充足</li>
                        <li>保持遥控器与无人机的连接稳定</li>
                        <li>避免在强电磁干扰环境下使用</li>
                        <li>定期检查摇杆是否灵活</li>
                    </ul>
                </div>
            </div>
        `
    },
    'preparation': {
        title: '✈️ 首次飞行准备',
        type: 'text',
        content: `
            <div class="text-content">
                <h3>一、飞行前检查清单</h3>
                <p>每次飞行前都必须完成以下检查：</p>
                
                <h3>✓ 设备检查</h3>
                <ul>
                    <li>□ 检查无人机外观是否有损坏</li>
                    <li>□ 确认螺旋桨安装正确且无裂纹</li>
                    <li>□ 检查电池电量充足（建议80%以上）</li>
                    <li>□ 确认电池安装牢固</li>
                    <li>□ 检查云台和相机是否正常</li>
                    <li>□ 测试电机运转是否正常</li>
                </ul>

                <h3>✓ 遥控器检查</h3>
                <ul>
                    <li>□ 遥控器电量充足</li>
                    <li>□ 摇杆回中正常</li>
                    <li>□ 与无人机连接成功</li>
                    <li>□ 图传信号清晰</li>
                    <li>□ GPS信号良好（至少8颗卫星）</li>
                </ul>

                <h3>✓ 环境检查</h3>
                <ul>
                    <li>□ 确认为非禁飞区域</li>
                    <li>□ 天气条件适宜（风速<10m/s）</li>
                    <li>□ 视野开阔，无障碍物</li>
                    <li>□ 远离人群和建筑物</li>
                    <li>□ 地面平整，适合起降</li>
                </ul>

                <h3>✓ APP设置检查</h3>
                <ul>
                    <li>□ 设置返航高度（建议高于周围最高障碍物）</li>
                    <li>□ 设置低电量报警阈值</li>
                    <li>□ 校准指南针（如提示需要）</li>
                    <li>□ 确认飞行模式设置正确</li>
                    <li>□ 检查存储卡有足够空间</li>
                </ul>

                <div class="warning-box">
                    <strong>⚠️ 重要提醒：</strong>任何一项检查不合格都不应起飞！安全永远是第一位的。
                </div>

                <h3>二、新手首次飞行建议</h3>
                <ul>
                    <li>选择空旷、无风的场地</li>
                    <li>飞行高度不超过10米</li>
                    <li>飞行距离保持在视距内（50米以内）</li>
                    <li>先练习悬停，再尝试移动</li>
                    <li>有人陪同，互相提醒</li>
                    <li>准备好备用电池</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 专业建议：</strong>第一次飞行建议在白天、能见度好的条件下进行，这样可以更好地观察无人机状态。
                </div>
            </div>
        `
    },
    'takeoff': {
        title: '🛫 起飞与降落',
        type: 'video',
        videoPath: '50a9a11931d8eae0bd69f8c763245257.mp4',
        content: `
            <div class="video-container-local">
                <video id="tutorialVideo" controls preload="metadata" playsinline>
                    <source src="50a9a11931d8eae0bd69f8c763245257.mp4" type="video/mp4">
                    <p style="color: white; text-align: center; padding: 20px;">
                        您的浏览器不支持视频播放。<br>
                        请确保视频文件 "50a9a11931d8eae0bd69f8c763245257.mp4" 在同一目录下。
                    </p>
                </video>
                <div class="video-controls-info">
                    <p>🛫 无人机起飞与降落教学视频</p>
                    <p class="video-hint">💡 提示：观看视频学习正确的起飞和降落技巧，确保飞行安全</p>
                </div>
            </div>
            
            <div class="text-content">
                <h3>一、自动起飞步骤</h3>
                <p>视频中会演示完整的自动起飞流程：</p>
                <ol>
                    <li>将无人机放置在平坦开阔的地面</li>
                    <li>确保机头朝向远离自己的方向</li>
                    <li>打开遥控器和无人机电源</li>
                    <li>等待GPS信号稳定（绿灯常亮）</li>
                    <li>在APP中点击"自动起飞"按钮</li>
                    <li>无人机将自动上升到1.2米高度并悬停</li>
                </ol>

                <h3>二、手动起飞步骤</h3>
                <p>手动起飞需要更多技巧，视频中有详细演示：</p>
                <ol>
                    <li>完成起飞前检查</li>
                    <li>解锁电机（内八或外八掰杆）</li>
                    <li>缓慢上推左摇杆（油门）</li>
                    <li>无人机离地后保持稳定悬停</li>
                    <li>观察无人机状态是否正常</li>
                    <li>确认无误后再进行其他操作</li>
                </ol>

                <div class="tip-box">
                    <strong>💡 视频要点：</strong>注意观察视频中演示的油门控制力度和悬停稳定性判断方法。
                </div>

                <div class="warning-box">
                    <strong>⚠️ 注意事项：</strong>
                    <ul style="margin-top: 10px;">
                        <li>起飞时动作要轻柔，避免猛推油门</li>
                        <li>注意周围环境，确保无障碍物</li>
                        <li>起飞后立即检查悬停是否稳定</li>
                        <li>如有异常立即降落检查</li>
                    </ul>
                </div>

                <h3>三、自动降落步骤</h3>
                <ol>
                    <li>飞回起飞点上方</li>
                    <li>在APP中点击"自动降落"</li>
                    <li>无人机将缓慢下降到地面</li>
                    <li>落地后电机会自动停止</li>
                    <li>锁定电机，关闭电源</li>
                </ol>

                <h3>四、手动降落步骤</h3>
                <p>手动降落需要精准控制，视频中展示了专业技巧：</p>
                <ol>
                    <li>飞回起飞点上方悬停</li>
                    <li>缓慢下拉左摇杆（降低油门）</li>
                    <li>保持无人机水平下降</li>
                    <li>接近地面时进一步减缓速度</li>
                    <li>轻轻触地后立即将油门拉到底</li>
                    <li>锁定电机</li>
                </ol>

                <h3>五、常见问题处理</h3>
                <p>视频中还会讲解以下问题的处理方法：</p>
                <ul>
                    <li>起飞时无人机倾斜怎么办</li>
                    <li>降落时遇到强风如何应对</li>
                    <li>如何判断合适的降落时机</li>
                    <li>紧急情况下如何快速安全降落</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 降落技巧：</strong>
                    <ul style="margin-top: 10px;">
                        <li>降落时保持耐心，不要急于求成</li>
                        <li>注意观察地面情况，避开不平坦区域</li>
                        <li>有风时要适当增加下降速度</li>
                        <li>落地后等待几秒再靠近无人机</li>
                    </ul>
                </div>

                <div class="warning-box">
                    <strong>⚠️ 安全第一：</strong>
                    <ul style="margin-top: 10px;">
                        <li>每次起飞前必须完成检查清单</li>
                        <li>不要在人群或建筑物上方起飞/降落</li>
                        <li>保持足够的返航电量</li>
                        <li>遇到异常情况立即执行紧急降落</li>
                    </ul>
                </div>
            </div>
        `
    },
    'basic-flight': {
        title: '🔄 基本飞行动作',
        type: 'video',
        videoPath: '74f4d1ea9ada58dd329f029eb5ccadd9.mp4',
        content: `
            <div class="video-container-local">
                <video id="tutorialVideo" controls preload="metadata" playsinline>
                    <source src="74f4d1ea9ada58dd329f029eb5ccadd9.mp4" type="video/mp4">
                    <p style="color: white; text-align: center; padding: 20px;">
                        您的浏览器不支持视频播放。<br>
                        请确保视频文件 "74f4d1ea9ada58dd329f029eb5ccadd9.mp4" 在同一目录下。
                    </p>
                </video>
                <div class="video-controls-info">
                    <p>🔄 无人机基本飞行动作教学视频</p>
                    <p class="video-hint">💡 提示：观看视频学习悬停、移动、旋转等基本飞行技巧</p>
                </div>
            </div>
            
            <div class="text-content">
                <h3>一、悬停练习</h3>
                <p>悬停是最基本的飞行技能，视频中会详细演示：</p>
                <ul>
                    <li>起飞后让无人机在1-2米高度悬停</li>
                    <li>微调摇杆保持位置稳定</li>
                    <li>练习持续悬停30秒以上</li>
                    <li>注意观察无人机姿态变化</li>
                    <li>学会判断悬停是否稳定的方法</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 视频要点：</strong>注意观察视频中演示的微小修正动作，这是保持悬停稳定的关键。
                </div>

                <h3>二、前后飞行</h3>
                <p>视频中展示了标准的前后飞行操作：</p>
                <ol>
                    <li>从悬停状态开始</li>
                    <li>轻推右摇杆向前，无人机前进</li>
                    <li>飞行3-5米后回中摇杆</li>
                    <li>无人机会因惯性继续前进一段距离</li>
                    <li>轻拉右摇杆向后，使无人机停下</li>
                    <li>练习来回飞行，逐渐增加距离</li>
                </ol>

                <h3>三、左右平移</h3>
                <p>视频中演示了精准的横向移动技巧：</p>
                <ol>
                    <li>从悬停状态开始</li>
                    <li>轻拨右摇杆向左或向右</li>
                    <li>保持机身不旋转</li>
                    <li>练习横向移动3-5米</li>
                    <li>回中摇杆并刹车停下</li>
                    <li>注意保持飞行高度不变</li>
                </ol>

                <h3>四、旋转练习</h3>
                <p>视频中展示了流畅的旋转操作：</p>
                <ol>
                    <li>悬停在固定位置</li>
                    <li>轻拨左摇杆向左或向右</li>
                    <li>观察无人机原地旋转</li>
                    <li>练习旋转90度、180度、360度</li>
                    <li>保持旋转过程中位置不变</li>
                    <li>学会控制旋转速度</li>
                </ol>

                <div class="tip-box">
                    <strong>💡 练习建议：</strong>
                    <ul style="margin-top: 10px;">
                        <li>每个动作单独练习熟练后再组合</li>
                        <li>动作要轻柔，避免大幅度快速操作</li>
                        <li>始终保持无人机在视线范围内</li>
                        <li>注意电量，预留足够返航时间</li>
                        <li>先在开阔场地练习，避开障碍物</li>
                    </ul>
                </div>

                <h3>五、综合练习</h3>
                <p>视频中演示了以下组合动作：</p>
                <ul>
                    <li><strong>正方形飞行：</strong>前进→右移→后退→左移，练习精准控制</li>
                    <li><strong>圆形飞行：</strong>结合前后左右和旋转，训练协调性</li>
                    <li><strong>8字飞行：</strong>练习流畅的转向和过渡</li>
                    <li><strong>定点降落：</strong>飞到指定位置后精准降落</li>
                    <li><strong>环绕飞行：</strong>围绕一个点做圆周运动</li>
                    <li><strong>螺旋上升/下降：</strong>旋转的同时改变高度</li>
                </ul>

                <h3>六、高级技巧</h3>
                <p>视频最后介绍了一些进阶技巧：</p>
                <ul>
                    <li><strong>刷锅（POI）：</strong>围绕兴趣点环绕拍摄</li>
                    <li><strong>渐远镜头：</strong>后退同时升高，展现全景</li>
                    <li><strong>跟随飞行：</strong>保持与移动物体的相对位置</li>
                    <li><strong>快速转向：</strong>紧急情况下的快速反应</li>
                    <li><strong>姿态模式：</strong>关闭GPS辅助的手动飞行</li>
                </ul>

                <div class="warning-box">
                    <strong>⚠️ 常见错误：</strong>
                    <ul style="margin-top: 10px;">
                        <li>操作过猛导致无人机失控或剧烈晃动</li>
                        <li>忽略风向影响，没有及时调整</li>
                        <li>距离太远失去目视接触</li>
                        <li>电量不足仍继续练习</li>
                        <li>在有风天气练习高难度动作</li>
                        <li>没有预留足够的刹车距离</li>
                    </ul>
                </div>

                <h3>七、练习计划建议</h3>
                <p>按照视频中的建议制定练习计划：</p>
                <ul>
                    <li><strong>第1-2次飞行：</strong>专注悬停练习，每次10分钟</li>
                    <li><strong>第3-5次飞行：</strong>练习前后左右移动</li>
                    <li><strong>第6-8次飞行：</strong>加入旋转练习</li>
                    <li><strong>第9-12次飞行：</strong>尝试简单的组合动作</li>
                    <li><strong>第13次以后：</strong>练习复杂路径和航拍运镜</li>
                </ul>

                <div class="tip-box">
                    <strong>🎯 学习目标：</strong>
                    <ul style="margin-top: 10px;">
                        <li>能够稳定悬停1分钟以上</li>
                        <li>能够精准控制飞行距离和方向</li>
                        <li>能够流畅完成正方形和8字飞行</li>
                        <li>能够在不同风速条件下保持稳定</li>
                        <li>能够执行基本的航拍运镜动作</li>
                    </ul>
                </div>

                <div class="warning-box">
                    <strong>⚠️ 安全提醒：</strong>
                    <ul style="margin-top: 10px;">
                        <li>练习时选择空旷无人的场地</li>
                        <li>保持无人机在视距内飞行</li>
                        <li>遵守当地飞行法规</li>
                        <li>遇到异常情况立即降落</li>
                        <li>不要在建筑物或人群附近练习</li>
                    </ul>
                </div>
            </div>
        `
    },
    'aerial-photo': {
        title: '📷 航拍基础',
        type: 'video',
        videoPath: '97ebd0ed59291477765964428db8539d.mp4',
        content: `
            <div class="video-container-local">
                <video id="tutorialVideo" controls preload="metadata" playsinline>
                    <source src="97ebd0ed59291477765964428db8539d.mp4" type="video/mp4">
                    <p style="color: white; text-align: center; padding: 20px;">
                        您的浏览器不支持视频播放。<br>
                        请确保视频文件 "97ebd0ed59291477765964428db8539d.mp4" 在同一目录下。
                    </p>
                </video>
                <div class="video-controls-info">
                    <p>📷 无人机航拍基础教学视频</p>
                    <p class="video-hint">💡 提示：观看视频学习航拍构图、相机设置和拍摄技巧</p>
                </div>
            </div>
            
            <div class="text-content">
                <h3>一、相机参数设置</h3>
                <p>视频中会详细讲解如何设置最佳拍摄参数：</p>
                <ul>
                    <li><strong>分辨率：</strong>建议选择4K或更高，获得更清晰的画面</li>
                    <li><strong>帧率：</strong>视频25/30fps，慢动作60/120fps</li>
                    <li><strong>ISO：</strong>尽量使用低ISO（100-400）减少噪点</li>
                    <li><strong>快门速度：</strong>遵循180度法则（快门=1/(2×帧率)）</li>
                    <li><strong>白平衡：</strong>根据光线条件手动设置，避免自动白平衡跳变</li>
                    <li><strong>格式：</strong>照片用RAW+JPG，视频用MP4或MOV</li>
                    <li><strong>曝光补偿：</strong>根据场景亮度适当调整</li>
                </ul>

                <h3>二、基本构图技巧</h3>
                <p>视频中展示了多种经典构图方法：</p>
                <ul>
                    <li><strong>三分法：</strong>将画面分为九宫格，主体放在交点处</li>
                    <li><strong>引导线：</strong>利用道路、河流等引导视线到主体</li>
                    <li><strong>对称构图：</strong>适合建筑、倒影等场景，展现平衡美</li>
                    <li><strong>前景运用：</strong>增加画面层次感和深度</li>
                    <li><strong>留白：</strong>给画面呼吸空间，突出主体</li>
                    <li><strong>框架构图：</strong>利用门窗、树枝等形成自然框架</li>
                    <li><strong>对角线构图：</strong>创造动感和视觉张力</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 视频要点：</strong>注意观察视频中演示的不同构图方式的实际效果，以及如何选择最适合的构图方法。
                </div>

                <h3>三、经典航拍视角</h3>
                <p>视频中演示了以下经典航拍视角：</p>
                <ol>
                    <li><strong>鸟瞰视角：</strong>垂直向下90度，展现几何美感和图案</li>
                    <li><strong>45度角：</strong>最常用的视角，平衡地平线和地面景物</li>
                    <li><strong>低空掠过：</strong>贴近水面或地面飞行，制造速度感和冲击力</li>
                    <li><strong>环绕拍摄：</strong>围绕主体360度旋转，全方位展示</li>
                    <li><strong>渐远镜头：</strong>从近处后退升高，从小景到大景的过渡</li>
                    <li><strong>跟随拍摄：</strong>跟随移动物体（车、人、船）飞行</li>
                    <li><strong>揭示镜头：</strong>从遮挡物后飞出，揭示壮观景色</li>
                </ol>

                <h3>四、光线运用</h3>
                <p>视频中讲解了不同光线的拍摄技巧：</p>
                <ul>
                    <li><strong>黄金时刻：</strong>日出后和日落前1小时，光线柔和温暖，最适合航拍</li>
                    <li><strong>蓝色时刻：</strong>日出前和日落后，天空呈现深蓝色，适合城市夜景</li>
                    <li><strong>避免正午：</strong>中午光线过硬，阴影强烈，尽量避免此时拍摄</li>
                    <li><strong>顺光拍摄：</strong>色彩饱和度高，画面明亮清晰</li>
                    <li><strong>侧光拍摄：</strong>突出纹理和立体感，适合建筑和地貌</li>
                    <li><strong>逆光拍摄：</strong>创造剪影效果和戏剧性画面</li>
                    <li><strong>阴天光线：</strong>柔和均匀，适合拍摄细节丰富的场景</li>
                </ul>

                <div class="tip-box">
                    <strong>💡 航拍技巧：</strong>
                    <ul style="margin-top: 10px;">
                        <li>飞行前先观察地形，规划拍摄路线和镜头运动</li>
                        <li>使用网格线辅助构图，保持水平线平直</li>
                        <li>保持飞行平稳，避免抖动影响画面质量</li>
                        <li>多角度拍摄同一场景，后期有更多选择</li>
                        <li>注意反光和眩光问题，适当调整角度</li>
                        <li>善用延时摄影，记录云层流动和光影变化</li>
                    </ul>
                </div>

                <h3>五、常见航拍场景</h3>
                <p>视频中展示了以下场景的拍摄方法：</p>
                <ul>
                    <li><strong>自然风光：</strong>山川、湖泊、海岸线的拍摄技巧</li>
                    <li><strong>城市建筑：</strong>高楼、桥梁、地标建筑的构图方法</li>
                    <li><strong>人文纪实：</strong>市集、活动、人群的安全拍摄方式</li>
                    <li><strong>日落日出：</strong>捕捉金色光线的时机和参数设置</li>
                    <li><strong>夜景拍摄：</strong>城市灯光、车流轨迹的拍摄技巧</li>
                </ul>

                <h3>六、后期处理基础</h3>
                <p>视频最后介绍了基本的后期处理流程：</p>
                <ul>
                    <li>调整曝光和对比度，优化画面明暗</li>
                    <li>校正颜色和饱和度，还原真实色彩</li>
                    <li>裁剪和二次构图，突出主体</li>
                    <li>锐化和降噪，提升画质</li>
                    <li>添加渐变滤镜效果，增强氛围</li>
                    <li>调色风格统一，形成个人特色</li>
                </ul>

                <div class="warning-box">
                    <strong>⚠️ 注意事项：</strong>
                    <ul style="margin-top: 10px;">
                        <li>航拍时也要注意飞行安全，不要为了拍摄冒险</li>
                        <li>不要在人群上空低飞拍摄，保持安全距离</li>
                        <li>尊重隐私，避免拍摄私人场所和敏感区域</li>
                        <li>遵守当地航拍法规，了解禁飞区域</li>
                        <li>注意电池电量，预留足够返航时间</li>
                        <li>大风天气谨慎拍摄，避免画面抖动</li>
                    </ul>
                </div>

                <div class="tip-box">
                    <strong>🎬 进阶建议：</strong>
                    <ul style="margin-top: 10px;">
                        <li>多观看优秀航拍作品，学习构图和运镜</li>
                        <li>练习不同的镜头运动，如推进、拉远、环绕</li>
                        <li>尝试不同的拍摄时间和季节，获得多样化素材</li>
                        <li>学习视频剪辑软件，制作完整的航拍短片</li>
                        <li>加入航拍社区，与其他飞友交流经验</li>
                    </ul>
                </div>
            </div>
        `
    }
};

let currentLesson = null;

// 打开课程
function openLesson(lessonId) {
    const lesson = lessonData[lessonId];
    if (!lesson) return;

    currentLesson = lessonId;
    
    // 设置标题
    document.getElementById('modalTitle').textContent = lesson.title;
    
    // 设置内容
    document.getElementById('modalBody').innerHTML = lesson.content;
    
    // 检查是否已完成
    const isCompleted = localStorage.getItem(`lesson-${lessonId}`) === 'completed';
    const completeBtn = document.getElementById('completeBtn');
    if (isCompleted) {
        completeBtn.textContent = '✓ 已完成';
        completeBtn.classList.add('completed');
    } else {
        completeBtn.textContent = '标记为完成';
        completeBtn.classList.remove('completed');
    }
    
    // 显示模态框
    document.getElementById('learningModal').classList.add('show');
    
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
}

// 关闭课程
function closeLesson() {
    document.getElementById('learningModal').classList.remove('show');
    document.body.style.overflow = '';
    currentLesson = null;
}

// 观看外部视频
function watchExternalVideo(videoUrl) {
    window.open(videoUrl, '_blank');
}

// 标记为完成
function markAsComplete() {
    if (!currentLesson) return;
    
    // 保存到localStorage
    localStorage.setItem(`lesson-${currentLesson}`, 'completed');
    
    // 更新按钮状态
    const completeBtn = document.getElementById('completeBtn');
    completeBtn.textContent = '✓ 已完成';
    completeBtn.classList.add('completed');
    
    // 更新进度条
    updateLessonProgress(currentLesson);
    updateTotalProgress();
    
    // 显示提示
    showToast('success', '✓', '恭喜完成本课程！');
}

// 更新单个课程进度
function updateLessonProgress(lessonId) {
    const card = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (card) {
        const progressBar = card.querySelector('.progress-fill');
        progressBar.style.width = '100%';
    }
}

// 更新总进度
function updateTotalProgress() {
    const lessons = Object.keys(lessonData);
    const completed = lessons.filter(id => 
        localStorage.getItem(`lesson-${id}`) === 'completed'
    ).length;
    
    const percentage = Math.round((completed / lessons.length) * 100);
    
    document.getElementById('totalProgress').textContent = percentage + '%';
    document.getElementById('totalProgressBar').style.width = percentage + '%';
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 加载已完成的课程进度
    const lessons = Object.keys(lessonData);
    lessons.forEach(lessonId => {
        if (localStorage.getItem(`lesson-${lessonId}`) === 'completed') {
            updateLessonProgress(lessonId);
        }
    });
    
    // 更新总进度
    updateTotalProgress();
});

// 点击模态框外部关闭
document.getElementById('learningModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLesson();
    }
});

// ESC键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLesson();
    }
});

// 显示提示消息
function showToast(type, icon, message) {
    let toast = document.querySelector('.toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
        
        const style = document.createElement('style');
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 100px;
                right: 30px;
                background: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                display: none;
                align-items: center;
                gap: 12px;
                z-index: 10001;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
            }
            
            .toast-notification.show {
                display: flex;
            }
            
            .toast-icon {
                font-size: 1.5rem;
            }
            
            .toast-message {
                color: #333;
                font-weight: 500;
            }
            
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
        `;
        document.head.appendChild(style);
    }
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}