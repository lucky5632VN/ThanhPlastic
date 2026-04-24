const appContent = document.getElementById('app-content');
let playerName = localStorage.getItem('physics_player_name') || 'Kỹ Sư Tập Sự';
let playerSeed = localStorage.getItem('physics_player_seed') || 'Engineer';
let maxLevelReached = parseInt(localStorage.getItem('physics_max_level')) || 1;

// Helper function to render math
function refreshMath(element) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(element || appContent, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ],
            throwOnError: false
        });
    }
}

const router = {
    current: 'home',
    navigate: function(targetStr) {
        if (!targetStr) return;
        this.current = targetStr;
        this.render();
        
        // Update nav links
        document.querySelectorAll('.nav-links a, .logo').forEach(el => {
            if (el.dataset.target === targetStr) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Initialize view specific logic
        try {
            initViewLogic(targetStr);
        } catch (err) {
            console.error("View initialization failed:", err);
        }
    },
    render: function() {
        const templateId = `view-${this.current}`;
        const template = document.getElementById(templateId);
        
        if (template) {
            appContent.innerHTML = '';
            appContent.appendChild(template.content.cloneNode(true));
            lucide.createIcons();
            refreshMath();
        } else {
            console.warn(`Template ${templateId} not found. Reverting to home.`);
            if (this.current !== 'home') {
                this.navigate('home');
            } else {
                appContent.innerHTML = '<div class="page-container fade-in"><h2>Lỗi hệ thống - Vui lòng tải lại trang</h2></div>';
            }
        }
    }
};

// Handle navigation clicks
document.querySelectorAll('a[data-target], .logo[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        router.navigate(target);
    });
});

function initViewLogic(view) {
    if (view === 'phenomena') {
        const grid = document.getElementById('phenomena-grid');
        if (!grid) return;
        grid.innerHTML = contentData.phenomena.map(p => `
            <div class="card-glass phenomenon-card" style="border-top: 3px solid ${p.color}" onclick="openAnalysis(${p.id})">
                <div class="card-header">
                    <h3 style="margin-bottom: 1rem;">${p.title}</h3>
                    <i data-lucide="${p.icon}" style="color:${p.color}"></i>
                </div>
                <div class="badge" style="border-color:${p.color}; color:${p.color}">${p.category}</div>
                <p style="color: var(--text-secondary)">${p.description}</p>
                <div class="play-overlay">
                    <i data-lucide="play-circle" class="play-icon"></i>
                    <span>Xem Phân Tích</span>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
        refreshMath(grid);
    } 
    else if (view === 'theory') {
        const container = document.getElementById('theory-container');
        if (!container) return;
        container.innerHTML = contentData.theory.map(t => `
            <div class="theory-item" data-id="${t.id}">
                <div class="theory-header" onclick="toggleTheory('${t.id}')">
                    <span>${t.title}</span>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="theory-content">
                    <p>${t.content}</p>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
        refreshMath(container);
    }
    else if (view === 'games') {
        if (typeof initCircuitGame === 'function') initCircuitGame();
        lucide.createIcons();
    }
    else if (view === 'play-circuit') {
        // Handled by initCircuitGame logic
        lucide.createIcons();
    }
    else if (view === 'vlab') {
        if(typeof initVLab === 'function') initVLab();
        refreshMath();
    }
}

// Global functions
window.changeName = function() {
    const newName = prompt("Nhập tên mới cho Kỹ sư của bạn:", playerName);
    if (newName && newName.trim() !== "") {
        playerName = newName.trim();
        localStorage.setItem('physics_player_name', playerName);
        const nameDisplay = document.getElementById('player-name-display');
        if (nameDisplay) nameDisplay.textContent = playerName;
        
        playerSeed = playerName;
        localStorage.setItem('physics_player_seed', playerSeed);
        const avatarDisplay = document.getElementById('player-avatar');
        if (avatarDisplay) avatarDisplay.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${playerSeed}`;
    }
}

window.randomizeAvatar = function() {
    playerSeed = Math.random().toString(36).substring(7);
    localStorage.setItem('physics_player_seed', playerSeed);
    const avatarDisplay = document.getElementById('player-avatar');
    if (avatarDisplay) avatarDisplay.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${playerSeed}`;
}

window.completeLevel = function(levelNum) {
    if (levelNum >= maxLevelReached) {
        maxLevelReached = levelNum + 1;
        localStorage.setItem('physics_max_level', maxLevelReached);
    }
}

window.resetProgress = function() {
    if (confirm("Bạn có muốn xóa toàn bộ tiến trình và bắt đầu lại từ đầu không?")) {
        maxLevelReached = 1;
        localStorage.setItem('physics_max_level', 1);
        router.navigate('games');
    }
}

window.toggleTheory = function(id) {
    const item = document.querySelector(`.theory-item[data-id="${id}"]`);
    if(item) {
        item.classList.toggle('open');
    }
}

window.openAnalysis = function(id) {
    const p = contentData.phenomena.find(item => item.id == id);
    if (!p) return;

    const modal = document.getElementById('video-modal');
    if (!modal) return;

    const video = document.getElementById('analysis-video');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');

    if (title) title.textContent = p.title;
    if (desc) desc.textContent = p.description;
    
    if (p.videoPath && video) {
        video.src = encodeURI(p.videoPath);
        video.load();
        video.style.display = 'block';
    } else if (video) {
        video.src = '';
        video.style.display = 'none';
        if (desc) desc.textContent += " (Hiện chưa có video phân tích cho mục này)";
    }

    modal.classList.add('active');
    lucide.createIcons();
    refreshMath(desc);
}

window.closeModal = function() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('analysis-video');
    if (video) video.pause();
    if (modal) modal.classList.remove('active');
}

window.openInstructions = function() {
    const modal = document.getElementById('instruction-modal');
    if (modal) {
        modal.classList.add('active');
        lucide.createIcons();
    }
}

window.closeInstructions = function() {
    const modal = document.getElementById('instruction-modal');
    if (modal) modal.classList.remove('active');
}

// Close modals on click outside
window.onclick = function(event) {
    const vModal = document.getElementById('video-modal');
    const iModal = document.getElementById('instruction-modal');
    if (event.target == vModal) closeModal();
    if (event.target == iModal) closeInstructions();
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    router.navigate('home');
});
