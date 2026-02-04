document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // --- 1. CẤU HÌNH HỆ THỐNG & DEV TOOL ---
    // ============================================================
    
    // URL Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7GnhioT3_PLSrLaYMPnfKKL7zYPlWYBsRHi2HvvLoIMoDRB8mRGVzs75NPkfNPUjwEg/exec';
    
    // Key lưu cache
    const STORAGE_KEY = 'quiz_user_session_v8_final'; 

    // 🔴 CẤU HÌNH DEV TOOL (BẬT/TẮT NÚT RESET)
    // false = Đang Test (HIỆN nút Reset màu đỏ)
    // true  = Chạy thật/Gửi khách (ẨN nút Reset)
    const IS_LOCK = false; 

    // Biến toàn cục
    let config = (typeof defaultConfig !== 'undefined') ? { ...defaultConfig } : {}; 
    let currentScreen = 'welcome';
    let participantData = null;
    let currentQuestion = 0;
    let score = 0;
    let correctCount = 0;
    let selectedAnswer = null;
    let answered = false;
    let skillMetrics = {}; 
    let timerInterval = null;
    let timeLeft = 10;
    
    // Cấu hình quy đổi điểm
    const CERTIFICATE_MAPPING = {
        en: [
            { min: 0, label: "Tiếng Anh Cơ Bản", advice: "Hãy tập trung xây dựng lại nền tảng từ vựng và ngữ pháp.", course: "Tiếng Anh Lấy Lại Căn Bản" },
            { min: 50, label: "Tiếng Anh Trung Bình", advice: "Cần tăng cường luyện phản xạ nghe nói.", course: "Tiếng Anh Giao Tiếp & Phản Xạ" },
            { min: 80, label: "Tiếng Anh Nâng Cao", advice: "Bạn đã sẵn sàng thử sức với chứng chỉ quốc tế.", course: "Luyện Thi Chứng Chỉ & Săn Học Bổng" }
        ],
        zh: [
            { min: 0, label: "HSK 1 (Sơ cấp)", advice: "Tập trung vào Pinyin và bộ thủ.", course: "Tiếng Trung Sơ Cấp 1" },
            { min: 40, label: "HSK 2-3", advice: "Cần luyện thêm đọc hiểu chữ Hán.", course: "Tiếng Trung Giao Tiếp Phản Xạ" },
            { min: 70, label: "HSK 4 (Trung cấp)", advice: "Đủ điều kiện du học hệ tiếng.", course: "Luyện Thi HSK 4-5 Cấp Tốc" },
            { min: 90, label: "HSK 5-6 (Cao cấp)", advice: "Rất giỏi!", course: "Tiếng Trung Thương Mại" }
        ],
        kr: [
            { min: 0, label: "TOPIK I (Cấp 1)", advice: "Học thuộc bảng chữ cái Hangul.", course: "Tiếng Hàn Sơ Cấp" },
            { min: 40, label: "TOPIK I (Cấp 2)", advice: "Cần luyện nghe nhiều hơn.", course: "Tiếng Hàn Giao Tiếp Đời Sống" },
            { min: 70, label: "TOPIK II (Cấp 3-4)", advice: "Chú trọng kính ngữ.", course: "Luyện Thi TOPIK II Trung Cấp" },
            { min: 90, label: "TOPIK II (Cấp 5-6)", advice: "Trình độ cao cấp.", course: "Lớp Luyện Biên Phiên Dịch" }
        ],
        de: [
            { min: 0, label: "A1 (Sơ cấp)", advice: "Làm quen giống danh từ.", course: "Tiếng Đức A1" },
            { min: 50, label: "A2 - B1", advice: "Luyện viết thư xin Visa.", course: "Tiếng Đức B1 Cấp Tốc" },
            { min: 85, label: "B2 (Cao cấp)", advice: "Tuyệt vời.", course: "Luyện Thi B2 Goethe" }
        ],
        jp: [
            { min: 0, label: "N5 (Sơ cấp)", advice: "Học Hiragana/Katakana.", course: "Tiếng Nhật N5 Cấp Tốc" },
            { min: 40, label: "N4", advice: "Học thêm Kanji.", course: "Tiếng Nhật N4 Giao Tiếp" },
            { min: 70, label: "N3 (Trung cấp)", advice: "Luyện đọc hiểu tốc độ cao.", course: "Luyện Thi JLPT N3" },
            { min: 90, label: "N2 - N1", advice: "Sử dụng tiếng Nhật tự nhiên.", course: "Tiếng Nhật Business" }
        ]
    };

    // ============================================================
    // --- 2. HÀM GỬI DỮ LIỆU ---
    // ============================================================
    async function sendDataToGoogleSheet(data) {
        if (!data) return;

        const formData = new FormData();
        formData.append("id", data.zalo_user_id || "GUEST_" + Date.now()); 
        formData.append("fullname", data.full_name || "Khách ẩn danh"); 
        formData.append("phone", data.phone_number || ""); 
        formData.append("language", data.language || "en"); 
        formData.append("score", data.score || 0); 
        formData.append("qr_code", window.location.href); 

        formData.append("email", data.email || "");
        formData.append("school_name", data.school_name || "");
        let noteInfo = `Prize: ${data.prize_won || "None"} | Level: ${data.level || ""}`;
        formData.append("ghi_chu", noteInfo);

        if (data.writing_responses && data.writing_responses.length > 0) {
            formData.append("writing", data.writing_responses.join(" | "));
        }

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' 
            });
            console.log("✅ Data sent to Sheet");
        } catch (error) {
            console.error("❌ Send Error:", error);
        }
    }

    // ============================================================
    // --- 3. CÁC HÀM HỖ TRỢ LOGIC ---
    // ============================================================

    function saveSession(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { console.error(e); }
    }

    function getSession() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
    }

    function initSkillTracker() {
        skillMetrics = {};
        if (!questions || questions.length === 0) return;
        const pointsPerQuestion = 100 / questions.length; 
        questions.forEach(q => {
            const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
            if (!skillMetrics[cat]) skillMetrics[cat] = { current: 0, total: 0 };
            skillMetrics[cat].total += pointsPerQuestion; 
        });
    }

    function getStudentRank(score, language) {
        let weakestSkill = '';
        let minSkillScore = 100;
        for (const [cat, data] of Object.entries(skillMetrics)) {
            if (data.total === 0) continue;
            const skillPercent = (data.current / data.total) * 100;
            if (skillPercent <= minSkillScore) {
                minSkillScore = skillPercent;
                weakestSkill = cat;
            }
        }

        const skillMap = { 'LISTENING': 'Nghe hiểu', 'READING': 'Đọc hiểu', 'GRAMMAR': 'Ngữ pháp', 'VOCABULARY': 'Từ vựng', };
        const weakName = skillMap[weakestSkill] || weakestSkill;

        const langCode = language || 'en';
        const langData = CERTIFICATE_MAPPING[langCode] || CERTIFICATE_MAPPING['en'];
        const result = langData.sort((a, b) => b.min - a.min).find(item => score >= item.min) || langData[langData.length - 1];

        const aiMessage = `Dựa trên kết quả, trình độ bạn tương đương <strong>${result.label}</strong>.<br>Kỹ năng <strong>${weakName}</strong> cần cải thiện.<br>${result.advice}`;

        return {
            label: result.label,
            color: score >= 70 ? "text-green-600" : (score >= 50 ? "text-blue-500" : "text-orange-500"),
            message: aiMessage,
            course_recommend: result.course
        };
    }

    function showScreen(screenName) {
        const screens = ['welcome', 'form', 'language', 'level', 'quiz', 'results', 'wheel'];
        screens.forEach(screen => {
            const el = document.getElementById(`screen-${screen}`);
            if (el) el.classList.add('hidden');
        });
        const targetScreen = document.getElementById(`screen-${screenName}`);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('fade-in');
        }
        currentScreen = screenName;
    }

    function showLoading(show) {
        const loader = document.getElementById('loading-indicator');
        if (loader) loader.classList.toggle('hidden', !show);
    }

    // ============================================================
    // --- 4. XỬ LÝ SỰ KIỆN (EVENT LISTENERS) ---
    // ============================================================

    // --- NÚT START (Logic kiểm tra người chơi cũ) ---
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const savedData = getSession();

            // 1. NGƯỜI DÙNG CŨ (Đã hoàn thành bài thi)
            if (savedData && savedData.completed_at) {
                console.log("Welcome back:", savedData);
                
                // Khôi phục dữ liệu
                participantData = savedData;
                score = savedData.score || 0;
                
                // Đảm bảo load được câu hỏi để hiển thị giao diện kết quả
                if (typeof setQuestionsByLanguageAndLevel === 'function') {
                    // Nếu không biết user thi đề nào, load mặc định en/medium để tránh lỗi
                    const lang = savedData.language || 'en';
                    const level = savedData.level || 'medium';
                    setQuestionsByLanguageAndLevel(lang, level);
                }

                showScreen('results');
                showResults(); // Render lại kết quả
                
                // Thông báo nhẹ
                // alert(`Chào mừng ${savedData.full_name} quay lại! Đây là kết quả bài thi trước của bạn.`);
                return;
            }

            // 2. NGƯỜI DÙNG ĐANG THI DỞ (Đã điền form nhưng chưa xong)
            if (savedData && savedData.full_name) {
                participantData = savedData;
                participantData.language = 'en'; 
                participantData.level = 'medium';
                
                if (typeof setQuestionsByLanguageAndLevel === 'function') {
                    if (setQuestionsByLanguageAndLevel('en', 'medium')) {
                        initSkillTracker(); 
                        showScreen('quiz');
                        renderQuestion();
                    } else {
                        alert("Lỗi dữ liệu câu hỏi.");
                    }
                }
            } 
            // 3. NGƯỜI MỚI HOÀN TOÀN
            else {
                showScreen('form'); 
            }
        });
    }

    // --- SUBMIT FORM THÔNG TIN ---
   // --- SUBMIT FORM THÔNG TIN ---
   
// --- SUBMIT FORM THÔNG TIN ---
    const infoForm = document.getElementById('info-form');
    if (infoForm) {
        // 1. Hàm hiển thị lỗi ngay tại input
        const showInputError = (inputEl, message) => {
            if (!inputEl) return;
            // Tìm cha của input để chèn thông báo lỗi
            const parent = inputEl.parentElement;
            
            // Xóa thông báo lỗi cũ nếu có
            const oldError = parent.querySelector('.error-message-inline');
            if (oldError) oldError.remove();

            // Đổi màu viền input sang đỏ
            inputEl.classList.remove('border-gray-200', 'focus:border-blue-500', 'focus:ring-blue-100');
            inputEl.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-200', 'bg-red-50');

            // Tạo text thông báo lỗi
            const msgEl = document.createElement('p');
            msgEl.className = 'error-message-inline text-red-500 text-[11px] font-bold mt-1 ml-4 animate-pulse';
            msgEl.innerText = `⚠️ ${message}`;
            
            parent.appendChild(msgEl);
            
            // Rung nhẹ để gây chú ý (nếu muốn)
            // inputEl.focus(); 
        };

        // 2. Hàm xóa lỗi khi người dùng nhập lại
        const clearInputError = (inputEl) => {
            if (!inputEl) return;
            const parent = inputEl.parentElement;
            
            // Xóa text lỗi
            const oldError = parent.querySelector('.error-message-inline');
            if (oldError) oldError.remove();

            // Trả lại màu viền ban đầu
            inputEl.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-200', 'bg-red-50');
            inputEl.classList.add('border-gray-200', 'focus:border-blue-500', 'focus:ring-blue-100');
        };

        // 3. Tự động xóa lỗi khi người dùng bắt đầu gõ
        ['full-name', 'phone-number'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => clearInputError(el));
            }
        });

        // 4. Xử lý Submit Form
        infoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-form-btn');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Tiếp tục ➡️';

            // Reset trạng thái nút
            const resetBtn = () => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            };

            if (submitBtn) {
                submitBtn.innerHTML = 'Đang kiểm tra...';
                submitBtn.disabled = true;
            }

            // --- LẤY DỮ LIỆU ---
            const fullNameEl = document.getElementById('full-name');
            const phoneEl = document.getElementById('phone-number');
            const consentEl = document.getElementById('phone-consent');

            const fullName = fullNameEl ? fullNameEl.value.trim() : "";
            const phoneNumber = phoneEl ? phoneEl.value.trim() : "";
            const phoneConsent = consentEl ? consentEl.checked : false;

            let hasError = false;

            // --- VALIDATE DỮ LIỆU ---

            // 1. Kiểm tra Họ tên
            if (!fullName) {
                showInputError(fullNameEl, "Vui lòng nhập họ và tên của bạn.");
                hasError = true;
            } else if (fullName.length < 2 || !isNaN(fullName)) {
                showInputError(fullNameEl, "Tên không hợp lệ (phải là chữ).");
                hasError = true;
            }

            // 2. Kiểm tra Số điện thoại (Regex VN)
            const vnf_regex = /^(03|05|07|08|09)+([0-9]{8})$/;
            if (!phoneNumber) {
                showInputError(phoneEl, "Vui lòng nhập số điện thoại.");
                hasError = true;
            } else if (!vnf_regex.test(phoneNumber)) {
                showInputError(phoneEl, "SĐT không đúng định dạng! ");
                hasError = true;
            } else if (fullName.toLowerCase() === phoneNumber) {
                 showInputError(phoneEl, "SĐT không được trùng với tên.");
                 hasError = true;
            } else {
                // Kiểm tra trùng trong LocalStorage (Chỉ check nếu SĐT đúng định dạng)
                const savedSession = getSession();
                if (savedSession && savedSession.phone_number === phoneNumber && savedSession.completed_at) {
                    showInputError(phoneEl, "Bạn đã hoàn thành bài test với số này rồi.");
                    hasError = true;
                }
            }

            // Nếu có lỗi thì dừng lại ngay
            if (hasError) {
                resetBtn();
                return;
            }

            // --- HỢP LỆ -> GỬI DỮ LIỆU ---
            if (submitBtn) submitBtn.innerHTML = 'Đang xử lý... ⏳';

            let customId = 'U' + Math.floor(Date.now() / 1000);
            
            participantData = {
                zalo_user_id: customId,
                full_name: fullName,
                school_name: "", 
                phone_number: phoneNumber,
                email: "",       
                phone_consent: phoneConsent,
                score: 0,
                language: 'en',
                level: 'medium',
                writing_responses: [],
                completed_at: null, 
                prize_won: ''
            };
            
            saveSession(participantData);
            await sendDataToGoogleSheet(participantData);
            
            resetBtn();

            // Chuyển màn hình
            participantData.language = 'en'; 
            participantData.level = 'all'; 

            if (typeof setQuestionsByLanguageAndLevel === 'function') {
                setQuestionsByLanguageAndLevel('en', 'medium'); 
                initSkillTracker(); 
                showScreen('quiz');
                renderQuestion();
            }
        });
    }
    // --- CHỌN LANGUAGE / LEVEL ---
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (participantData) {
                participantData.language = lang;
                saveSession(participantData);
                showScreen('level'); 
            }
        });
    });

    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            const lang = participantData.language;
            if (typeof setQuestionsByLanguageAndLevel === 'function') {
                if (setQuestionsByLanguageAndLevel(lang, level)) {
                    participantData.level = level;
                    saveSession(participantData);
                    score = 0; correctCount = 0; currentQuestion = 0;
                    initSkillTracker();
                    showScreen('quiz');
                    renderQuestion();
                } else {
                    alert("Bộ câu hỏi này đang cập nhật!");
                }
            }
        });
    });

    // --- NAVIGATION ---
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            score = 0; correctCount = 0; currentQuestion = 0;
            initSkillTracker();
            showScreen('quiz');
            renderQuestion();
        });
    }

    // --- TIMER & QUIZ LOGIC ---
    function startTimer() {
        timeLeft = 15; 
        const totalTime = 15; 
        const timerBar = document.getElementById('timer-bar');
        const timerText = document.getElementById('timer-text');
        
        if (timerBar) {
            timerBar.style.width = '100%';
            timerBar.className = "absolute top-0 left-0 h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(250,204,21,0.8)]";
        }
        if (timerText) timerText.textContent = timeLeft;

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timerText) timerText.textContent = timeLeft;
            if (timerBar) {
                const percent = (timeLeft / totalTime) * 100;
                timerBar.style.width = `${percent}%`;
                if (timeLeft <= 5) {
                    timerBar.classList.remove('bg-yellow-400');
                    timerBar.classList.add('bg-red-500');
                }
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function handleTimeout() {
        answered = true;
        const q = questions[currentQuestion];
        if (q.type === 'writing') {
            const inputEl = document.getElementById('writing-input');
            const feedbackEl = document.getElementById('writing-feedback-msg');
            const nextBtn = document.getElementById('next-btn');
            if (inputEl) {
                inputEl.disabled = true;
                inputEl.className = "w-full p-3 text-lg font-bold text-center text-red-700 border-2 border-red-500 bg-red-50 rounded-xl transition-all";
            }
            if (feedbackEl) {
                feedbackEl.innerHTML = `Đáp án là: <span class="font-black text-lg">${q.correctAnswer}</span>`;
                feedbackEl.classList.remove('hidden');
                feedbackEl.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-200');
            }
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                document.getElementById('next-btn-text').textContent = 'Câu tiếp theo';
                document.getElementById('next-btn-icon').textContent = '➡️';
            }
        } else {
            showFeedback(false, q.correct);
            highlightAnswers(-1, q.correct);
            enableNextButton();
        }
    }

    function renderQuestion() {
        if (!questions || questions.length === 0) return;
        const q = questions[currentQuestion];
        
        document.getElementById('q-number').textContent = currentQuestion + 1;
        document.getElementById('current-q').textContent = currentQuestion + 1;
        const totalEl = document.getElementById('total-q');
        if(totalEl) totalEl.textContent = questions.length;
        document.getElementById('question-category').textContent = q.category || 'QUIZ';
        
        const mainQText = document.getElementById('question-text');
        if (q.type === 'writing') {
            mainQText.style.display = 'none';
        } else {
            mainQText.style.display = 'block';
            mainQText.textContent = q.question;
        }
        
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        const container = document.getElementById('answers-container');
        container.innerHTML = ''; 
        selectedAnswer = null; answered = false;
        document.getElementById('feedback').classList.add('hidden');
        disableNextButton(); 

        if (q.type === 'writing') {
            const wrapper = document.createElement('div');
            wrapper.className = "flex flex-col w-full gap-3 mt-2"; 
            
            const questionTextContainer = document.createElement('div');
            questionTextContainer.className = "w-full mb-1 text-center";
            const questionText = document.createElement('div');
            questionText.className = "text-lg font-bold leading-relaxed text-gray-800";
            questionText.innerHTML = q.question.replace(/_+/g, '<span class="inline-block w-12 border-b-4 border-blue-400 mx-1"></span>');
            questionTextContainer.appendChild(questionText);
            container.appendChild(questionTextContainer);

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'writing-input';
            input.className = "w-full p-3 text-lg font-bold text-center placeholder-gray-300 transition-all bg-white border-2 border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:shadow-lg";
            input.placeholder = "Nhập đáp án...";
            input.autocomplete = "off";
            
            input.addEventListener('input', function() {
                const nextBtn = document.getElementById('next-btn');
                if (this.value.trim().length > 0) {
                    nextBtn.disabled = false; 
                    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed'); 
                } else {
                    nextBtn.disabled = true;
                    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            });
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const nextBtn = document.getElementById('next-btn');
                    if (!nextBtn.disabled) nextBtn.click(); 
                }
            });

            wrapper.appendChild(input);
            const feedbackDiv = document.createElement('div');
            feedbackDiv.id = 'writing-feedback-msg'; 
            feedbackDiv.className = 'hidden mt-2 p-3 text-sm font-bold text-center rounded-xl animate-pulse shadow-sm';
            wrapper.appendChild(feedbackDiv);
            container.appendChild(wrapper);
            disableNextButton();
            startTimer(); 
            return; 
        }

        if (q.options && q.options.length > 0) {
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'flex items-center w-full gap-3 p-3 font-bold text-left text-white shadow-md answer-btn rounded-xl transition-all transform hover:scale-[1.01] active:scale-95';
                const colors = ['linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'];
                btn.style.background = colors[index % colors.length];
                btn.innerHTML = `<span class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-black shadow-inner flex-shrink-0">${String.fromCharCode(65 + index)}</span><span class="flex-1 text-sm md:text-base leading-snug">${option}</span>`;
                btn.addEventListener('click', () => {
                    clearInterval(timerInterval);
                    selectAnswer(index);
                });
                container.appendChild(btn);
            });
        }
        startTimer();
    }

    function selectAnswer(index) {
        if (answered) return;
        answered = true;
        selectedAnswer = index;
        const q = questions[currentQuestion];
        const isCorrect = index === q.correct;
        const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
        const pointsPerQuestion = 100 / questions.length;

        if (isCorrect) {
            score += pointsPerQuestion;
            correctCount++;
            if(skillMetrics[cat]) skillMetrics[cat].current += pointsPerQuestion;
        }
        document.getElementById('score-display').textContent = Math.round(score);
        showFeedback(isCorrect, q.correct);
        highlightAnswers(index, q.correct);
        enableNextButton();
    }

    function showFeedback(isCorrect, correctIndex) {
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');
        if (isCorrect) {
            feedback.style.background = '#dcfce7'; 
            feedback.style.color = '#15803d'; 
            feedback.style.border = '1px solid #86efac';
            feedback.innerHTML = `🎉 Chính xác!`;
        } else {
            feedback.style.background = '#fee2e2'; 
            feedback.style.color = '#b91c1c'; 
            feedback.style.border = '1px solid #fca5a5';
            feedback.innerHTML = `❌ Đáp án đúng: ${questions[currentQuestion].options[correctIndex]}`;
        }
    }

    function highlightAnswers(selected, correct) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, index) => {
            btn.style.pointerEvents = 'none';
            if (index === correct) {
                btn.style.opacity = '1';
                btn.innerHTML += ' <span class="ml-auto text-xl">✅</span>';
            } else if (index === selected && index !== correct) {
                btn.style.opacity = '0.6';
                btn.innerHTML += ' <span class="ml-auto text-xl">❌</span>';
            } else {
                btn.style.opacity = '0.4';
            }
        });
    }

    function enableNextButton() {
        const btn = document.getElementById('next-btn');
        btn.disabled = false;
        if (currentQuestion < questions.length - 1) {
            document.getElementById('next-btn-text').textContent = 'Câu tiếp theo';
            document.getElementById('next-btn-icon').textContent = '➡️';
        } else {
            document.getElementById('next-btn-text').textContent = 'Xem kết quả';
            document.getElementById('next-btn-icon').textContent = '🏆';
        }
    }

    function disableNextButton() {
        const btn = document.getElementById('next-btn');
        btn.disabled = true;
        document.getElementById('next-btn-text').textContent = 'Chọn/Nhập đáp án';
        document.getElementById('next-btn-icon').textContent = '👆';
    }

    async function nextQuestion() {
        const q = questions[currentQuestion];
        if (q.type === 'writing') {
            if (!answered) {
                await checkWritingAnswerAndNext();
                return; 
            }
        }
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            await showResults();
        }
    }

    async function checkWritingAnswerAndNext() {
        if (answered) return; 
        answered = true;
        const q = questions[currentQuestion];
        const inputEl = document.getElementById('writing-input');
        const feedbackEl = document.getElementById('writing-feedback-msg');
        const nextBtn = document.getElementById('next-btn');
        
        inputEl.disabled = true;
        nextBtn.disabled = true; 
        document.getElementById('next-btn-text').textContent = 'Đang kiểm tra...';

        const userAns = inputEl.value.trim().toLowerCase();
        const correctAns = q.correctAnswer ? q.correctAnswer.trim().toLowerCase() : "";
        const pointsPerQuestion = 100 / questions.length;

        if (!participantData.writing_responses) participantData.writing_responses = [];
        participantData.writing_responses.push(`Q${currentQuestion+1}: ${inputEl.value} (Đáp án: ${q.correctAnswer})`);

        if (userAns === correctAns) {
            score += pointsPerQuestion;
            correctCount++;
            const cat = q.category ? q.category.toUpperCase() : 'WRITING';
            if(skillMetrics[cat]) skillMetrics[cat].current += pointsPerQuestion;
            
            inputEl.className = "flex-1 p-4 text-xl font-bold text-left text-green-700 border-2 border-green-500 bg-green-50 rounded-xl";
            if(feedbackEl) {
                feedbackEl.innerHTML = "🎉 Chính xác!";
                feedbackEl.classList.remove('hidden');
                feedbackEl.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-200');
            }
        } else {
            inputEl.className = "flex-1 p-4 text-xl font-bold text-left text-red-700 border-2 border-red-500 bg-red-50 rounded-xl";
            if(feedbackEl) {
                feedbackEl.innerHTML = `❌ Đáp án: ${q.correctAnswer}`;
                feedbackEl.classList.remove('hidden');
                feedbackEl.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-200');
            }
        }
        document.getElementById('score-display').textContent = Math.round(score);
        nextBtn.disabled = false; 
        document.getElementById('next-btn-text').textContent = 'Câu tiếp theo'; 
        document.getElementById('next-btn-icon').textContent = '➡️';
    }

    // --- KẾT QUẢ & GỬI DỮ LIỆU CUỐI ---
    async function showResults() {
        // --- XỬ LÝ NẾU RELOAD TRANG (correctCount bị reset về 0) ---
        if (score > 0 && correctCount === 0 && questions && questions.length > 0) {
            correctCount = Math.round((score * questions.length) / 100);
        }

        score = Math.round(score); 
        if (score > 100) score = 100;
        
        const totalQ = (questions && questions.length > 0) ? questions.length : 1;
        const percentage = Math.round((correctCount / totalQ) * 100);
        const isWinner = score >= 80; 

        const currentLang = (participantData && participantData.language) ? participantData.language : 'en';
        let rankInfo = { label: 'Cơ Bản', message: 'Cố gắng lên nhé!' };
        if (typeof getStudentRank === 'function') {
            rankInfo = getStudentRank(score, currentLang);
        }

        document.getElementById('final-score').textContent = score;
        document.getElementById('correct-answers').textContent = correctCount;
        document.getElementById('percentage').textContent = `${percentage}%`;

        // Render AI Report
        const aiReportHTML = `
            <div class="mb-6 animate-fade-in-up">
                <div class="relative p-5 text-left border border-blue-200 bg-blue-50/80 rounded-2xl shadow-sm">
                    <div class="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <span>🤖</span> AI ANALYSIS
                    </div>
                    <div class="flex items-center gap-4 mb-4">
                        <div class="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md text-4xl">
                            ${score >= 80 ? '🥇' : (score >= 50 ? '🥈' : '🥉')}
                        </div>
                        <div>
                            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Đánh giá trình độ</div>
                            <div class="text-2xl font-black text-blue-800 uppercase tracking-tight">${rankInfo.label}</div>
                        </div>
                    </div>
                    <div class="text-sm leading-relaxed text-gray-700 bg-white p-4 rounded-xl border border-blue-100 shadow-inner">
                        <span class="font-bold text-blue-800">💡 Nhận xét:</span> ${rankInfo.message}
                    </div>
                </div>
            </div>
        `;

        let reportContainer = document.getElementById('ai-report-container');
        if (!reportContainer) {
            reportContainer = document.createElement('div');
            reportContainer.id = 'ai-report-container';
            const scoreBlock = document.querySelector('#screen-results .bg-gradient-to-br'); 
            if(scoreBlock) scoreBlock.insertAdjacentElement('afterend', reportContainer);
        }
        reportContainer.innerHTML = aiReportHTML;
        let skillsContainer = document.getElementById('skills-breakdown');
        if (skillsContainer) skillsContainer.innerHTML = ''; 

        // Quà tặng
        const unlockMsg = document.getElementById('unlock-message');
        const spinBtn = document.getElementById('spin-wheel-btn'); 
        if (spinBtn) spinBtn.classList.add('hidden');
        if (isWinner) {
            participantData.prize_won = "Móc Khóa HTO";
            if (unlockMsg) {
                unlockMsg.classList.remove('hidden');
                unlockMsg.className = "mb-6 p-1 border-2 border-blue-400 bg-blue-50 rounded-2xl shadow-lg transition-all duration-700 ease-in-out"; 
                unlockMsg.innerHTML = `
                    <div class="p-4 text-center">
                        <div class="font-black text-xl text-blue-700 uppercase mb-1">CHÚC MỪNG BẠN!</div>
                        <div class="text-sm text-blue-800 font-medium mb-3">Bạn nhận được quà tặng đặc biệt</div>
                        <div class="bg-white p-3 rounded-xl border border-blue-200 shadow-sm flex items-center justify-center gap-3">
                            <img src="../publics/images/moc-khoa.png" alt="Móc khóa" class="w-14 h-14 object-contain drop-shadow-md">
                            <span class="text-lg font-bold text-gray-800">MÓC KHÓA HTO</span>
                        </div>
                        <div class="mt-3 text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                            *Liên hệ với HTO Group để nhận quà
                        </div>
                    </div>
                `;
            }
            if (typeof createConfetti === 'function') createConfetti();
        }

        // --- CẬP NHẬT DỮ LIỆU & GỬI LẦN CUỐI ---
        if (participantData) {
            participantData.score = score;
            participantData.rank = rankInfo.label;
            // Đánh dấu đã hoàn thành (quan trọng để chặn thi lại)
            if(!participantData.completed_at) {
                participantData.completed_at = new Date().toISOString();
            }
            saveSession(participantData); 

            // Chỉ gửi nếu chưa gửi kết quả lần này
            // (Tuy nhiên ở đây ta cứ gửi đè để update điểm chính xác nhất)
            if (typeof sendDataToGoogleSheet === 'function') {
                showLoading(true);
                try {
                    await sendDataToGoogleSheet(participantData);
                } catch (err) {
                    console.error("Lỗi gửi dữ liệu:", err);
                } finally {
                    showLoading(false);
                }
            }
        }
        showScreen('results');
    }

    // --- CÁC NÚT LIÊN HỆ (Zalo / Messenger) ---
    const messengerBtn = document.getElementById('messenger-btn');
    if (messengerBtn) {
        messengerBtn.addEventListener('click', () => {
            const messengerUrl = "https://m.me/100083047195100";
            if (window.zmpSdk && window.zmpSdk.openWebview) {
                window.zmpSdk.openWebview({ url: messengerUrl, config: { style: "bottomSheet" } });
            } else {
                window.open(messengerUrl, "_blank");
            }
        });
    }

    const zaloOABtn = document.getElementById('zalo-oa-btn');
    if (zaloOABtn) {
        zaloOABtn.addEventListener('click', async () => {
            const oaId = "2112176407138597287";
            if (window.zmpSdk) {
                try {
                    await window.zmpSdk.openChat({ type: 'oa', id: oaId });
                } catch (error) {
                    window.open(`https://zalo.me/${oaId}`, "_blank");
                }
            } else {
                window.open(`https://zalo.me/${oaId}`, "_blank");
            }
        });
    }

    // --- INIT SDK ---
    async function initDataSDK() {
        if (window.dataSdk) {
            await window.dataSdk.init({ onDataChanged(data) { console.log('Data updated:', data.length); } });
        }
    }
    if (window.elementSdk) {
        window.elementSdk.init({ defaultConfig, onConfigChange: () => {} });
    }
    initDataSDK();

    // ============================================================
    // --- 5. DEV TOOL: NÚT RESET DỮ LIỆU (CẤU HÌNH) ---
    // ============================================================
    function addDevResetButton() {
        // Nếu đang khóa (IS_LOCK = true) thì thoát luôn, không vẽ nút
        if (IS_LOCK) return;

        const btn = document.createElement('button');
        btn.innerHTML = '🔄 RESET DATA';
        btn.title = "Click để xóa dữ liệu test và làm lại từ đầu";
        
        // Style nút: Góc trái dưới, màu đỏ
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 99999;
            background-color: #ef4444; 
            color: white;
            font-weight: bold;
            padding: 8px 12px;
            border: 2px solid white;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            font-family: sans-serif;
            font-size: 11px;
            opacity: 0.8;
            transition: opacity 0.3s;
        `;
        
        btn.onmouseover = () => btn.style.opacity = "1";
        btn.onmouseout = () => btn.style.opacity = "0.8";

        btn.addEventListener('click', () => {
            if(confirm("⚠️ CHẾ ĐỘ TEST:\nBạn có chắc muốn xóa sạch dữ liệu cũ để thi lại không?")) {
                localStorage.removeItem(STORAGE_KEY);
                location.reload(); 
            }
        });

        document.body.appendChild(btn);
    }

    addDevResetButton();
});

// Hàm Confetti độc lập
function createConfetti() {
    const container = document.getElementById('confetti-container');
    if(!container) return;
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = '-10px';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.animation = `confetti-fall ${1 + Math.random() * 2}s linear forwards`;
        container.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}