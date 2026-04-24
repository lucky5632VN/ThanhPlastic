/**
 * GAME: CHINH PHỤC MẠCH ĐIỆN
 * Physics 11 - Chapter 4: Electric Current & Circuits
 */

const CIRCUIT_GAME_DATA = {
    levels: [
        {
            id: 1,
            title: "Dòng điện & Cường độ",
            rank: "Kỹ sư tập sự",
            questions: [
                {
                    type: "mcq",
                    text: "Đơn vị của cường độ dòng điện trong hệ SI là gì?",
                    options: ["Volt (V)", "Ampere (A)", "Ohm (Ω)", "Watt (W)"],
                    correct: 1,
                    hint: "Hãy nhớ đến tên nhà bác học người Pháp André-Marie Ampère."
                },
                {
                    type: "mcq",
                    text: "Dòng điện được định nghĩa là gì?",
                    options: [
                        "Sự chuyển động của các hạt mang điện.",
                        "Dòng chuyển dời có hướng của các điện tích.",
                        "Sự đứng yên của các hạt proton.",
                        "Dòng chảy của nước trong ống dẫn."
                    ],
                    correct: 1,
                    hint: "Chìa khóa ở đây là 'chuyển dời có hướng'."
                },
                {
                    type: "mcq",
                    text: "Cường độ dòng điện được tính bằng công thức nào sau đây?",
                    options: ["I = q \u00b7 t", "I = q / t", "I = U / R", "I = P / U"],
                    correct: 1,
                    hint: "I là lượng điện tích dịch chuyển qua tiết diện thẳng trong một đơn vị thời gian."
                }
            ]
        },
        {
            id: 2,
            title: "Suất điện động & Nguồn điện",
            rank: "Kỹ sư tập sự",
            questions: [
                {
                    type: "mcq",
                    text: "Đại lượng nào đặc trưng cho khả năng thực hiện công của nguồn điện?",
                    options: ["Hiệu điện thế", "Cường độ dòng điện", "Suất điện động", "Điện trở trong"],
                    correct: 2,
                    hint: "Ký hiệu của nó thường là \u2130 (Epsilon)."
                },
                {
                    type: "mcq",
                    text: "Đơn vị của suất điện động là gì?",
                    options: ["Ampe (A)", "Joule (J)", "Volt (V)", "Ohm (\u03a9)"],
                    correct: 2,
                    hint: "Suất điện động thực chất là công thực hiện trên một đơn vị điện tích, có cùng đơn vị với hiệu điện thế."
                },
                {
                    type: "mcq",
                    text: "Bên trong nguồn điện, các hạt mang điện chuyển động dưới tác dụng của lực nào?",
                    options: ["Lực Coulomb", "Lực từ", "Lực lạ", "Lực hấp dẫn"],
                    correct: 2,
                    hint: "Lực này 'lạ' vì nó đẩy điện tích ngược chiều lực điện trường."
                }
            ]
        },
        {
            id: 3,
            title: "Điện trở & Định luật Ohm",
            rank: "Kỹ sư tập sự",
            questions: [
                {
                    type: "mcq",
                    text: "Vật liệu nào sau đây thường có điện trở suất nhỏ nhất?",
                    options: ["Gỗ khô", "Nhựa", "Đồng", "Thủy tinh"],
                    correct: 2,
                    hint: "Kim loại là vật dẫn điện tốt nhất."
                },
                {
                    type: "mcq",
                    text: "Khi tăng chiều dài dây dẫn lên 2 lần thì điện trở của dây sẽ thay đổi như thế nào?",
                    options: ["Tăng 2 lần", "Giảm 2 lần", "Tăng 4 lần", "Không đổi"],
                    correct: 0,
                    hint: "R tỉ lệ thuận với chiều dài l."
                },
                {
                    type: "mcq",
                    text: "Công thức định luật Ohm cho một đoạn mạch chỉ có điện trở là gì?",
                    options: ["I = U \u00b7 R", "I = R / U", "I = U / R", "I = P / U"],
                    correct: 2,
                    hint: "Dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở."
                }
            ]
        },
        {
            id: 4,
            title: "Ohm cho Toàn Mạch",
            rank: "Kỹ thuật viên chuyên nghiệp",
            questions: [
                {
                    type: "mcq",
                    text: "Cường độ dòng điện trong mạch kín tỉ lệ nghịch với đại lượng nào?",
                    options: ["Suất điện động", "Điện trở mạch ngoài", "Điện trở toàn phần", "Điện trở trong"],
                    correct: 2,
                    hint: "Điện trở toàn phần = R ngoài + r trong."
                },
                {
                    type: "mcq",
                    text: "Hiện tượng đoản mạch xảy ra khi nào?",
                    options: ["R mạch ngoài rất lớn", "R mạch ngoài rất nhỏ (\u2248 0)", "Suất điện động bằng 0", "Dòng điện bằng 0"],
                    correct: 1,
                    hint: "Khi hai cực của nguồn được nối bằng dây dẫn có điện trở không đáng kể."
                },
                {
                    type: "tf",
                    text: "Suất điện động của nguồn điện luôn có giá trị bằng hiệu điện thế mạch ngoài trong mọi trường hợp.",
                    correct: false,
                    hint: "U = \u2130 - I \u00b7 r. Chỉ bằng nhau khi mạch hở (I=0)."
                }
            ]
        },
        {
            id: 5,
            title: "Năng lượng & Định luật Joule",
            rank: "Kỹ thuật viên chuyên nghiệp",
            questions: [
                {
                    type: "mcq",
                    text: "Theo định luật Joule - Lenz, nhiệt lượng tỏa ra tỉ lệ thuận với bình phương của đại lượng nào?",
                    options: ["Điện trở R", "Thời gian t", "Cường độ dòng điện I", "Hiệu điện thế U"],
                    correct: 2,
                    hint: "Q = I\u00b2Rt"
                },
                {
                    type: "mcq",
                    text: "Công của dòng điện chạy qua một đoạn mạch được tính bằng công thức nào?",
                    options: ["A = U \u00b7 I \u00b7 t", "A = P / t", "A = U \u00b7 I", "A = R \u00b7 I\u00b2"],
                    correct: 0,
                    hint: "Công bằng tích của hiệu điện thế, cường độ và thời gian."
                },
                {
                    type: "tf",
                    text: "Đơn vị của công suất điện là Joule (J).",
                    correct: false,
                    hint: "Joule là đơn vị năng lượng. Công suất đo bằng Watt (W)."
                }
            ]
        },
        {
            id: 6,
            title: "Công suất & Hiệu suất",
            rank: "Kỹ thuật viên chuyên nghiệp",
            questions: [
                {
                    type: "mcq",
                    text: "Trên một bóng đèn có ghi 220V - 100W. Con số 100W cho biết điều gì?",
                    options: ["Điện năng tiêu thụ trong 1 giờ", "Công suất định mức", "Cường độ dòng điện định mức", "Điện trở của đèn"],
                    correct: 1,
                    hint: "Đây là công suất hoạt động bình thường của đèn ở hiệu điện thế 220V."
                },
                {
                    type: "mcq",
                    text: "Công thức tính hiệu suất nguồn điện là gì?",
                    options: ["H = U / \u2130", "H = \u2130 / U", "H = r / R", "H = I \u00b7 r"],
                    correct: 0,
                    hint: "Hiệu suất bằng tỉ số giữa điện năng tiêu thụ mạch ngoài và toàn bộ năng lượng nguồn cung cấp."
                },
                {
                    type: "tf",
                    text: "Điện trở trong của nguồn điện càng lớn thì hiệu suất nguồn càng cao.",
                    correct: false,
                    hint: "r càng lớn thì sụt áp trong càng nhiều, hiệu suất giảm."
                }
            ]
        },
        {
            id: 7,
            title: "Ghép Nguồn & Phân tích Mạch",
            rank: "Kỹ thuật viên chuyên nghiệp",
            questions: [
                {
                    type: "mcq",
                    text: "Khi ghép nối tiếp n nguồn giống nhau (\u2130, r) thì suất điện động bộ nguồn là gì?",
                    options: ["\u2130", "n \u00b7 \u2130", "\u2130 / n", "n\u00b2 \u00b7 \u2130"],
                    correct: 1,
                    hint: "Nối tiếp thì suất điện động cộng dồn."
                },
                {
                    type: "mcq",
                    text: "Ưu điểm của việc ghép song song các nguồn giống nhau là gì?",
                    options: ["Tăng suất điện động", "Tăng điện trở trong", "Giảm điện trở trong", "Tăng dòng điện đoản mạch"],
                    correct: 2,
                    hint: "r_b = r / n. Điện trở trong bộ nguồn sẽ giảm xuống."
                },
                {
                    type: "tf",
                    text: "Trong mạch mắc nối tiếp, cường độ dòng điện đi qua các điện trở là bằng nhau.",
                    correct: true,
                    hint: "Dòng điện không có nhánh rẽ nên I là duy nhất."
                }
            ]
        },
        {
            id: 8,
            title: "Vận dụng: Mạch Hỗn hợp",
            rank: "Kỹ thuật viên cao cấp",
            questions: [
                {
                    type: "mcq",
                    text: "Một mạch kín có \u2130 = 12V, r = 1\u03a9. Mạch ngoài có R = 5\u03a9. Cường độ dòng điện là bao nhiêu?",
                    options: ["12A", "2.4A", "2A", "1.2A"],
                    correct: 2,
                    hint: "I = 12 / (5 + 1) = ?"
                },
                {
                    type: "tf",
                    text: "Khi mắc song song hai điện trở giống nhau R, điện trở tương đương sẽ là 2R.",
                    correct: false,
                    hint: "Song song thì R_td = R / 2."
                },
                {
                    type: "short",
                    text: "Cho nguồn \u2130 = 6V, r = 0.5\u03a9. Mạch ngoài có R = 2.5\u03a9. Tính hiệu suất nguồn (nhập số dạng 0.xx)?",
                    correct: 0.83,
                    hint: "H = R / (R + r) = 2.5 / 3.0 \u2248 0.833"
                }
            ]
        },
        {
            id: 9,
            title: "Vận dụng: Đồ thị & Biến thiên",
            rank: "Kỹ thuật viên cao cấp",
            questions: [
                {
                    type: "mcq",
                    text: "Đường đặc trưng I - U của một nguồn điện là một đường thẳng có đặc điểm gì?",
                    options: ["Đi qua gốc tọa độ", "Dốc lên (hệ số góc dương)", "Dốc xuống (hệ số góc âm)", "Nằm ngang"],
                    correct: 2,
                    hint: "U = \u2130 - Ir. Khi I tăng thì U giảm."
                },
                {
                    type: "tf",
                    text: "Công suất mạch ngoài đạt cực đại khi điện trở mạch ngoài R bằng điện trở trong r.",
                    correct: true,
                    hint: "Đây là định luật truyền công suất cực đại."
                },
                {
                    type: "short",
                    text: "Một nguồn điện có \u2130 = 10V. Khi đoản mạch dòng điện là 5A. Tính điện trở trong r (\u03a9)?",
                    correct: 2,
                    hint: "r = \u2130 / I_dm = 10 / 5 = ?"
                }
            ]
        },
        {
            id: 10,
            title: "Chuyên gia: Hệ thống phức hợp",
            rank: "Kỹ thuật viên cao cấp",
            questions: [
                {
                    type: "mcq",
                    text: "Một bộ nguồn gồm 4 pin (1.5V, 0.5\u03a9) mắc thành 2 nhánh song song, mỗi nhánh 2 pin nối tiếp. Suất điện động bộ là?",
                    options: ["1.5V", "3V", "6V", "0.75V"],
                    correct: 1,
                    hint: "Mỗi nhánh có \u2130_n = 1.5 * 2 = 3V. Hai nhánh song song giữ nguyên 3V."
                },
                {
                    type: "tf",
                    text: "Điện năng tiêu thụ của đoạn mạch tỉ lệ thuận với bình phương hiệu điện thế U.",
                    correct: false,
                    hint: "A = UIt. Chỉ tỉ lệ thuận với U (nếu I, t không đổi). Nếu tính qua R thì A = (U\u00b2/R)t."
                },
                {
                    type: "short",
                    text: "Một nguồn \u2130 = 24V, r = 2\u03a9. Để công suất mạch ngoài cực đại, R phải bằng bao nhiêu \u03a9?",
                    correct: 2,
                    hint: "R = r để P_max."
                }
            ]
        },
        {
            id: 11,
            title: "THỬ THÁCH ĐẶC BIỆT: THIẾT KẾ MẠCH",
            rank: "Chuyên gia hệ thống điện",
            questions: [
                {
                    type: "mcq",
                    text: "Thiết kế: Bạn có 3 điện trở giống nhau R=30\u03a9. Làm sao để có R_td = 20\u03a9?",
                    options: [
                        "Cả 3 mắc nối tiếp",
                        "Cả 3 mắc song song",
                        "2 cái song song, rồi nối tiếp với cái thứ 3",
                        "2 cái nối tiếp, rồi song song với cái thứ 3"
                    ],
                    correct: 3,
                    hint: "(30+30) // 30 = 60 // 30 = (60*30)/(60+30) = 20."
                },
                {
                    type: "short",
                    text: "Thiết kế: Có các điện trở 10\u03a9. Cần bao nhiêu cái mắc song song để được 2\u03a9?",
                    correct: 5,
                    hint: "R_td = R / n => 2 = 10 / n."
                },
                {
                    type: "mcq",
                    text: "Thiết kế: Có R1=10\u03a9, R2=20\u03a9, R3=30\u03a9. Cách mắc nào cho R_td nhỏ nhất?",
                    options: ["Nối tiếp cả 3", "Song song cả 3", "(R1 // R2) nt R3", "(R1 nt R2) // R3"],
                    correct: 1,
                    hint: "Mắc song song luôn cho giá trị nhỏ hơn điện trở thành phần nhỏ nhất."
                }
            ]
        }
    ]
};

let gameState = {
    currentLevel: parseInt(localStorage.getItem('circuit_game_level')) || 1,
    currentStep: 0,
    lives: 3,
    progress: JSON.parse(localStorage.getItem('circuit_game_progress')) || {}
};

function initCircuitGame() {
    renderGameMap();
    updatePlayerProfile();
}

function renderGameMap() {
    const container = document.getElementById('game-map-container');
    if (!container) return;

    container.innerHTML = CIRCUIT_GAME_DATA.levels.map(level => {
        let statusClass = 'locked';
        let icon = 'lock';
        
        if (level.id < gameState.currentLevel) {
            statusClass = 'completed';
            icon = 'check-circle';
        } else if (level.id === gameState.currentLevel) {
            statusClass = 'current';
            icon = 'play';
        } else if (level.id === gameState.currentLevel + 1 && level.id <= 11) {
            // Optional: peek next
        }

        const isSpecial = level.id === 11;
        
        return `
            <div class="level-node ${statusClass} ${isSpecial ? 'special-node' : ''}" 
                 onclick="${statusClass !== 'locked' ? `startLevel(${level.id})` : ''}">
                <i data-lucide="${isSpecial ? 'award' : icon}"></i>
                <div class="level-num">${isSpecial ? 'ĐẶC BIỆT' : `Cấp ${level.id}`}</div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
    
    // Update progress bar
    const progressPercent = Math.round(((gameState.currentLevel - 1) / 11) * 100);
    const progressBar = document.getElementById('game-progress-bar');
    const progressText = document.getElementById('game-progress-percent');
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (progressText) progressText.textContent = progressPercent;
}

function updatePlayerProfile() {
    const rankElem = document.getElementById('player-rank');
    const nameElem = document.getElementById('player-name-display');
    
    if (rankElem) {
        const level = gameState.currentLevel;
        let rank = "Kỹ sư tập sự";
        if (level >= 11) rank = "Chuyên gia hệ thống điện";
        else if (level >= 8) rank = "Kỹ thuật viên cao cấp";
        else if (level >= 4) rank = "Kỹ thuật viên chuyên nghiệp";
        rankElem.textContent = rank;
    }
}

function startLevel(levelId) {
    const levelData = CIRCUIT_GAME_DATA.levels.find(l => l.id === levelId);
    if (!levelData) return;

    gameState.activeLevelId = levelId;
    gameState.currentStep = 0;
    gameState.lives = 3; // Reset lives when starting a new level
    
    // Navigate first to ensure DOM is ready
    router.navigate('play-circuit');
    
    // Wait a tiny bit for render and lucide to finish if needed, 
    // though router.navigate is sync.
    setTimeout(renderQuestion, 50);
}

function renderQuestion() {
    if (!gameState.activeLevelId) return;
    const level = CIRCUIT_GAME_DATA.levels.find(l => l.id === gameState.activeLevelId);
    const q = level.questions[gameState.currentStep];
    
    const levelTag = document.getElementById('current-quiz-level');
    const stepTag = document.getElementById('current-quiz-step');
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options');
    const shortAnswerBox = document.getElementById('quiz-short-answer');
    const feedbackCard = document.getElementById('quiz-feedback');
    const livesContainer = document.getElementById('quiz-lives-container');

    if (!levelTag || !questionText) {
        console.warn("Quiz elements not found. Retrying render...");
        return;
    }

    // Render lives
    if (livesContainer) {
        livesContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('i');
            heart.setAttribute('data-lucide', 'heart');
            heart.className = `heart-icon ${i >= gameState.lives ? 'lost' : ''}`;
            livesContainer.appendChild(heart);
        }
    }

    levelTag.textContent = level.id === 11 ? "ĐẶC BIỆT" : `CẤP ${level.id}`;
    stepTag.textContent = `Câu ${gameState.currentStep + 1}/${level.questions.length}`;
    questionText.textContent = q.text;
    
    feedbackCard.style.display = 'none';
    optionsGrid.style.display = 'none';
    shortAnswerBox.style.display = 'none';

    if (q.type === 'mcq' || q.type === 'tf') {
        optionsGrid.style.display = 'grid';
        const opts = q.type === 'tf' ? ["Đúng", "Sai"] : q.options;
        optionsGrid.innerHTML = opts.map((opt, idx) => `
            <button class="option-btn" onclick="checkAnswer(${idx})">
                <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt}</span>
            </button>
        `).join('');
    } else if (q.type === 'short') {
        shortAnswerBox.style.display = 'block';
        const input = document.getElementById('quiz-input-number');
        const submitBtn = document.getElementById('btn-submit-short');
        if (input) input.value = '';
        if (submitBtn) submitBtn.onclick = () => checkAnswer(parseFloat(input.value));
    }
    
    refreshMath(questionText);
    lucide.createIcons();
}

window.checkAnswer = function(answer) {
    if (gameState.isProcessing) return;
    gameState.isProcessing = true; // Prevent multiple clicks

    const level = CIRCUIT_GAME_DATA.levels.find(l => l.id === gameState.activeLevelId);
    const q = level.questions[gameState.currentStep];
    const feedbackCard = document.getElementById('quiz-feedback');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');
    const feedbackIcon = document.getElementById('feedback-icon');
    const btnNext = document.getElementById('btn-next-quiz');
    const btnRetry = document.getElementById('btn-retry-quiz');

    // Disable all options visually
    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
    });
    const submitBtn = document.getElementById('btn-submit-short');
    if (submitBtn) submitBtn.disabled = true;

    let isCorrect = false;
    if (q.type === 'mcq') {
        isCorrect = (answer === q.correct);
    } else if (q.type === 'tf') {
        const userBool = (answer === 0);
        isCorrect = (userBool === q.correct);
    } else if (q.type === 'short') {
        isCorrect = (Math.abs(answer - q.correct) < 0.05);
    }

    feedbackCard.style.display = 'flex';
    btnNext.style.display = 'none';
    btnRetry.style.display = 'none';

    if (isCorrect) {
        feedbackCard.className = "feedback-card card-glass correct";
        feedbackTitle.textContent = "Chính xác!";
        feedbackDesc.innerHTML = `<b>Giải thích:</b> ${q.hint}`;
        feedbackIcon.innerHTML = '<i data-lucide="check-circle" class="text-neon-green"></i>';
        
        // Auto-advance
        setTimeout(() => {
            gameState.isProcessing = false;
            gameState.currentStep++;
            if (gameState.currentStep >= level.questions.length) {
                completeActiveLevel();
            } else {
                renderQuestion();
            }
        }, 2000);
    } else {
        gameState.lives--;
        const isGameOver = gameState.lives <= 0;

        feedbackCard.className = "feedback-card card-glass wrong";
        feedbackTitle.textContent = isGameOver ? "GAME OVER!" : "Chưa đúng rồi!";
        feedbackDesc.innerHTML = isGameOver 
            ? "Bạn đã hết lượt chơi. Quay lại bản đồ..." 
            : `Mất 1 <i data-lucide="heart" style="width:14px; color:#ef4444; vertical-align:middle;"></i>! Bạn phải quay lại từ câu đầu tiên.<br><br><b>Giải thích:</b> ${q.hint}`;
        feedbackIcon.innerHTML = `<i data-lucide="${isGameOver ? 'skull' : 'alert-circle'}" class="text-danger"></i>`;
        
        // Auto-reset level or exit
        setTimeout(() => {
            gameState.isProcessing = false;
            if (isGameOver) {
                router.navigate('games');
            } else {
                gameState.currentStep = 0;
                renderQuestion();
            }
        }, 3500);
    }
    lucide.createIcons();
    refreshMath(feedbackDesc);
};

function completeActiveLevel() {
    const isLastLevel = gameState.activeLevelId >= 11;
    
    if (gameState.activeLevelId === gameState.currentLevel) {
        gameState.currentLevel++;
        localStorage.setItem('circuit_game_level', gameState.currentLevel);
    }
    
    const feedbackCard = document.getElementById('quiz-feedback');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');
    const btnNext = document.getElementById('btn-next-quiz');

    feedbackCard.className = "feedback-card card-glass correct";
    feedbackTitle.textContent = "HOÀN THÀNH CẤP ĐỘ!";
    feedbackDesc.textContent = `Chúc mừng bạn đã vượt qua thử thách này. Danh hiệu hiện tại: ${CIRCUIT_GAME_DATA.levels.find(l => l.id === gameState.activeLevelId).rank}`;
    
    btnNext.style.display = 'block';
    if (!isLastLevel) {
        btnNext.textContent = "Qua cấp độ kế tiếp";
        btnNext.onclick = () => {
            gameState.lives = 3; // Restore full hearts
            startLevel(gameState.activeLevelId + 1);
        };
    } else {
        btnNext.textContent = "Quay lại bản đồ";
        btnNext.onclick = () => router.navigate('games');
    }
    
    lucide.createIcons();
}

window.resetGameProgress = function() {
    if (confirm("Bạn có chắc muốn xóa toàn bộ tiến trình trò chơi?")) {
        gameState.currentLevel = 1;
        localStorage.removeItem('circuit_game_level');
        renderGameMap();
        updatePlayerProfile();
    }
}
