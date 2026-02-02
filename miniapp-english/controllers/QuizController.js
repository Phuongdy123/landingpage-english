document.addEventListener('DOMContentLoaded', () => {
    // --- KHỞI TẠO BIẾN ---
    let config = { ...defaultConfig };
    let currentScreen = 'welcome';
    let participantData = null;
    let currentQuestion = 0;
    let score = 0;
    let correctCount = 0;
    let selectedAnswer = null;
    let answered = false;
    let skillMetrics = {}; // Theo dõi điểm từng kỹ năng để AI phân tích
    
    // URL Google Apps Script (GIỮ NGUYÊN)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxw-AvIsJHZ6xOVMLRdSaU9nOaSR1dRnJL9C-cePmaWFAKOY1TP4kQCjA-e-ktfao7u/exec';
// Copy toàn bộ URL từ Postman dán vào đây
    // ============================================================
    // --- CẤU HÌNH QUY ĐỔI ĐIỂM & KHÓA HỌC (DATA SETTINGS) ---
    // ============================================================
    const CERTIFICATE_MAPPING = {
        // Tiếng Anh -> IELTS
        en: [
            { min: 0, label: "Pre-IELTS (Band 0 - 3.0)", advice: "Bạn đang ở giai đoạn khởi động. Cần xây dựng lại nền tảng từ vựng và ngữ pháp căn bản.", course: "Tiếng Anh Lấy Lại Căn Bản" },
            { min: 35, label: "IELTS 3.5 - 4.5", advice: "Bạn đã có nền tảng nhưng chưa vững. Cần luyện thêm phản xạ nghe nói và phát âm.", course: "IELTS Foundation (Mục tiêu 5.0+)" },
            { min: 55, label: "IELTS 5.0 - 6.0", advice: "Khá tốt! Bạn giao tiếp ổn nhưng còn mắc lỗi ngữ pháp phức tạp. Cần tăng cường từ vựng học thuật.", course: "IELTS Intensive (Bứt phá 6.5)" },
            { min: 75, label: "IELTS 6.5 - 7.5", advice: "Ấn tượng! Bạn đủ điều kiện nộp hồ sơ du học. Hãy trau chuốt kỹ năng Viết (Writing) để đạt điểm tối đa.", course: "Luyện Viết Chuyên Sâu & Săn Học Bổng" },
            { min: 90, label: "IELTS 8.0+", advice: "Xuất sắc! Trình độ của bạn tương đương người bản xứ. Hãy tập trung vào bài luận săn học bổng toàn phần.", course: "Mentoring 1:1 Săn Học Bổng Chính Phủ" }
        ],
        // Tiếng Trung -> HSK
        zh: [
            { min: 0, label: "HSK 1 (Sơ cấp)", advice: "Bạn mới bắt đầu. Hãy tập trung vào Pinyin và các bộ thủ cơ bản.", course: "Tiếng Trung Sơ Cấp 1" },
            { min: 40, label: "HSK 2-3", advice: "Bạn đã nắm được từ vựng cơ bản. Cần luyện thêm kỹ năng đọc hiểu chữ Hán và ngữ pháp.", course: "Tiếng Trung Giao Tiếp Phản Xạ" },
            { min: 70, label: "HSK 4 (Trung cấp)", advice: "Trình độ trung cấp. Đủ điều kiện du học hệ tiếng. Cần luyện thêm viết văn và dịch thuật.", course: "Luyện Thi HSK 4-5 Cấp Tốc" },
            { min: 90, label: "HSK 5-6 (Cao cấp)", advice: "Rất giỏi! Bạn có thể học đại học bằng tiếng Trung. Hãy thử sức với các bài báo chí.", course: "Tiếng Trung Thương Mại / Biên Phiên Dịch" }
        ],
        // Tiếng Hàn -> TOPIK
        kr: [
            { min: 0, label: "TOPIK I (Cấp 1)", advice: "Vốn từ vựng còn ít. Cần học thuộc bảng chữ cái Hangul và các câu chào hỏi thông dụng.", course: "Tiếng Hàn Sơ Cấp (Học phí ưu đãi)" },
            { min: 40, label: "TOPIK I (Cấp 2)", advice: "Ngữ pháp cơ bản ổn. Cần luyện nghe nhiều hơn để quen tốc độ nói của người Hàn.", course: "Tiếng Hàn Giao Tiếp Đời Sống" },
            { min: 70, label: "TOPIK II (Cấp 3-4)", advice: "Đủ điều kiện nhập học chuyên ngành. Cần chú trọng kính ngữ và văn viết (Sseugi).", course: "Luyện Thi TOPIK II Trung Cấp" },
            { min: 90, label: "TOPIK II (Cấp 5-6)", advice: "Trình độ cao cấp. Bạn hoàn toàn có thể săn học bổng Chính phủ Hàn Quốc.", course: "Lớp Luyện Biên Phiên Dịch Hàn - Việt" }
        ],
        // Tiếng Đức -> CEFR (Goethe)
        de: [
            { min: 0, label: "A1 (Sơ cấp)", advice: "Cần làm quen với giống danh từ (Der/Die/Das) và cách chia động từ cơ bản.", course: "Tiếng Đức A1 Cho Người Mới" },
            { min: 50, label: "A2 - B1", advice: "Có thể giao tiếp cơ bản. Cần luyện nói và viết thư để xin Visa du học nghề.", course: "Tiếng Đức B1 Cấp Tốc (Du học nghề)" },
            { min: 85, label: "B2 (Cao cấp)", advice: "Tuyệt vời. Đủ khả năng học Đại học tại Đức. Hãy luyện thêm về văn phong học thuật.", course: "Luyện Thi B2 Goethe" }
        ],
        // Tiếng Nhật -> JLPT
        jp: [
            { min: 0, label: "N5 (Sơ cấp)", advice: "Hãy bắt đầu với bảng chữ cái Hiragana/Katakana và 100 chữ Kanji cơ bản.", course: "Tiếng Nhật N5 Cấp Tốc" },
            { min: 40, label: "N4", advice: "Đã có thể giao tiếp hội thoại thường ngày. Cần học thêm Kanji và các thể động từ.", course: "Tiếng Nhật N4 Giao Tiếp" },
            { min: 70, label: "N3 (Trung cấp)", advice: "Trình độ trung cấp. Đủ điều kiện làm việc tại Nhật. Cần luyện đọc hiểu tốc độ cao.", course: "Luyện Thi JLPT N3" },
            { min: 90, label: "N2 - N1", advice: "Trình độ cao cấp. Bạn sử dụng tiếng Nhật rất tự nhiên trong môi trường Business.", course: "Tiếng Nhật Business / Phiên Dịch" }
        ]
    };

    // ============================================================
    // --- CÁC HÀM HỖ TRỢ LOGIC (THUẬT TOÁN) ---
    // ============================================================

    // 1. Hàm khởi tạo bộ đếm kỹ năng (TÍNH ĐIỂM ĐỘNG)
    function initSkillTracker() {
        skillMetrics = {};
        const pointsPerQuestion = 100 / questions.length; 

        questions.forEach(q => {
            const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
            
            if (!skillMetrics[cat]) {
                skillMetrics[cat] = { current: 0, total: 0 };
            }
            skillMetrics[cat].total += pointsPerQuestion; 
        });
    }

    // 2. Hàm Phân Tích & Xếp loại Học Viên (AI LOGIC)
    function getStudentRank(score, language) {
        // A. Tìm kỹ năng yếu nhất để nhận xét
        let weakestSkill = '';
        let minSkillScore = 100;
        
        for (const [cat, data] of Object.entries(skillMetrics)) {
            // Tránh chia cho 0
            if (data.total === 0) continue;
            
            const skillPercent = (data.current / data.total) * 100;
            if (skillPercent <= minSkillScore) {
                minSkillScore = skillPercent;
                weakestSkill = cat;
            }
        }

        // Mapping tên kỹ năng sang tiếng Việt cho thân thiện
        const skillMap = {
            'LISTENING': 'Nghe hiểu',
            'READING': 'Đọc hiểu',
            'GRAMMAR': 'Ngữ pháp',
            'VOCABULARY': 'Từ vựng',
            'WRITING': 'Viết',
            'NUMBERS': 'Số học',
            'GREETING': 'Giao tiếp'
        };
        const weakName = skillMap[weakestSkill] || weakestSkill;

        // B. Lấy thông tin chứng chỉ từ bảng cấu hình
        // Mặc định là 'en' nếu không tìm thấy ngôn ngữ
        const langCode = language || 'en';
        const langData = CERTIFICATE_MAPPING[langCode] || CERTIFICATE_MAPPING['en'];
        
        // Tìm mức phù hợp với điểm số (Sắp xếp giảm dần để tìm mức cao nhất thỏa mãn)
        const result = langData.sort((a, b) => b.min - a.min).find(item => score >= item.min) || langData[langData.length - 1];

        // C. Tạo nội dung AI nhận xét
        const aiMessage = `
            Dựa trên kết quả bài test, trình độ hiện tại của bạn tương đương <strong>${result.label}</strong>.<br>
            Bạn làm tốt các phần cơ bản, tuy nhiên kỹ năng <strong>${weakName}</strong> còn hạn chế (chỉ đạt ${Math.round(minSkillScore)}%).<br>
            ${result.advice}
        `;

        return {
            label: result.label, // VD: IELTS 6.5
            color: score >= 70 ? "text-green-600" : (score >= 50 ? "text-blue-500" : "text-orange-500"),
            message: aiMessage,
            course_recommend: result.course
        };
    }

    // 3. Hàm gửi dữ liệu lên Google Sheet
// 3. Hàm gửi dữ liệu (SỬA ĐỔI)
// 3. Hàm gửi dữ liệu (Bản chuẩn cho GAS trung gian)
async function sendDataToGoogleSheet(data) {
  if (!data) return;
  
  const formData = new FormData();

  // Mapping dữ liệu chính xác để GAS có thể nhận p.fullname, p.phone...
  formData.append("zalo_user_id", data.zalo_user_id || "");
  formData.append("fullname", data.full_name || "");
  formData.append("phone", data.phone_number || "");
  formData.append("email", data.email || "");
  formData.append("school_name", data.school_name || "");
  formData.append("score", data.score || 0);
  formData.append("qr_code", window.location.href);
  formData.append("value", "Zalo MiniApp");
  
  // Gửi thêm thông tin ngôn ngữ và cấp độ
  formData.append("language", data.language || ""); 
  formData.append("level", data.level || "");

  // Ghi chú cơ bản (GAS sẽ tự tối ưu lại ghi chú này khi gửi sang Bizfly)
  formData.append("ghi_chu", `Prize: ${data.prize_won || "None"}`);
  
  // Nếu có bài viết tự luận, gửi kèm để AI chấm
  if (data.writing_responses && data.writing_responses.length > 0) {
      formData.append("writing", data.writing_responses.join(" | "));
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    });
    console.log("✅ Dữ liệu đã được đẩy lên GAS trung chuyển.");
  } catch (error) {
    console.error("❌ Lỗi gửi dữ liệu:", error);
  }
}

    // --- CẤU HÌNH LƯU TRỮ (LOCAL STORAGE) ---
    const STORAGE_KEY = 'quiz_user_session_v5'; // Bump version

    function saveSession(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { console.error(e); }
    }

    function getSession() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
    }

    // --- DATA SDK ---
    const dataHandler = {
        onDataChanged(data) { console.log('Data updated:', data.length, 'records'); }
    };

    async function initDataSDK() {
        if (window.dataSdk) {
            await window.dataSdk.init(dataHandler);
        }
    }

    // --- ĐIỀU HƯỚNG MÀN HÌNH ---
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
        if (loader) {
            if (show) loader.classList.remove('hidden');
            else loader.classList.add('hidden');
        }
    }

    // ============================================================
    // --- XỬ LÝ SỰ KIỆN (EVENT LISTENERS) ---
    // ============================================================

    // 1. NÚT START
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const savedData = getSession();
            if (savedData) {
                participantData = savedData;
                showScreen('language'); 
            } else {
                showScreen('form'); 
            }
        });
    }

    // 2. XỬ LÝ FORM SUBMIT
    const infoForm = document.getElementById('info-form');
    if (infoForm) {
        infoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-form-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Đang xử lý... ⏳';
            submitBtn.disabled = true;
let customId = 'user-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            const fullName = document.getElementById('full-name').value.trim();
            const schoolName = document.getElementById('school-name').value.trim();
            const phoneNumber = document.getElementById('phone-number').value.trim();
            const email = document.getElementById('user-email').value.trim();
            const phoneConsent = document.getElementById('phone-consent').checked;
            
            if (!fullName || !schoolName || !phoneNumber || !email) {
                alert("Vui lòng điền đầy đủ thông tin!");
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            participantData = {
                zalo_user_id: customId,
                full_name: fullName,
                school_name: schoolName,
                phone_number: phoneNumber,
                email: email,
                phone_consent: phoneConsent,
                score: 0,
                language: '',
                level: '',
                writing_responses: [],
                completed_at: new Date().toISOString(),
                unlocked_wheel: false,
                prize_won: ''
            };
            
            saveSession(participantData);
            await sendDataToGoogleSheet(participantData);       
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showScreen('language'); 
        });
    }


    // 3. CÁC NÚT CHỌN NGÔN NGỮ
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
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
    }

    // 3.1 CÁC NÚT CHỌN CẤP ĐỘ
    const levelButtons = document.querySelectorAll('.level-btn');
    if (levelButtons.length > 0) {
        levelButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const level = this.getAttribute('data-level');
                const lang = participantData.language;

                // Kiểm tra hàm tồn tại
                if (typeof setQuestionsByLanguageAndLevel === 'function') {
                    const isSuccess = setQuestionsByLanguageAndLevel(lang, level);
                    
                    if (isSuccess) {
                        participantData.level = level;
                        saveSession(participantData);

                        // Reset game state
                        score = 0;
                        correctCount = 0;
                        currentQuestion = 0;
                        
                        initSkillTracker(); // Khởi tạo bộ đếm kỹ năng

                        showScreen('quiz');
                        renderQuestion();
                    } else {
                        alert("Bộ câu hỏi này đang cập nhật, vui lòng quay lại sau!");
                    }
                } else {
                    console.error("Lỗi: Không tìm thấy hàm setQuestionsByLanguageAndLevel trong DataModel.js");
                    alert("Lỗi hệ thống tải dữ liệu.");
                }
            });
        });
    }

    // Nút quay lại
    const backToLangBtn = document.getElementById('back-to-lang-btn');
    if (backToLangBtn) {
        backToLangBtn.addEventListener('click', () => showScreen('language'));
    }

    // 4. QUIZ NAVIGATION
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => showScreen('language'));
    }

    // 5. LUCKY WHEEL BUTTONS
    const spinWheelBtn = document.getElementById('spin-wheel-btn');
    if (spinWheelBtn) {
        spinWheelBtn.addEventListener('click', () => {
            showScreen('wheel');
            setTimeout(() => initWheel(), 100);
        });
    }

    const spinBtn = document.getElementById('spin-btn');
    if (spinBtn) {
        spinBtn.addEventListener('click', spinWheel);
    }

    const backResBtn = document.getElementById('back-to-results-btn');
    if (backResBtn) {
        backResBtn.addEventListener('click', () => showScreen('results'));
    }

    // ============================================================
    // --- LOGIC QUIZ (CORE) ---
    // ============================================================

function renderQuestion() {
        if (!questions || questions.length === 0) return;

        const q = questions[currentQuestion];
        
        // UI Updates
        document.getElementById('q-number').textContent = currentQuestion + 1;
        document.getElementById('current-q').textContent = currentQuestion + 1;
        
        const totalEl = document.getElementById('total-q');
        if(totalEl) totalEl.textContent = questions.length;

        document.getElementById('question-category').textContent = q.category || 'QUIZ';
        
        // Tối ưu tiêu đề câu hỏi: Giảm margin-bottom mặc định
        const mainQText = document.getElementById('question-text');
        if (q.type === 'writing') {
            mainQText.style.display = 'none';
        } else {
            mainQText.style.display = 'block';
            mainQText.textContent = q.question;
            // FIX: Giảm khoảng cách dưới câu hỏi để "khít" hơn (mb-8 -> mb-4)
            mainQText.className = "mb-4 text-xl font-bold leading-relaxed text-gray-800 md:text-2xl"; 
        }
        
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        const container = document.getElementById('answers-container');
        container.innerHTML = ''; 
        
        selectedAnswer = null;
        answered = false;
        document.getElementById('feedback').classList.add('hidden');
        disableNextButton(); 

        // --- A. LISTENING (ĐÃ TỐI ƯU GỌN GÀNG CHO MOBILE) ---
        if (q.type === 'listening' && q.audioScript) {
            const audioDiv = document.createElement('div');
            // FIX: Giảm p-4 -> p-2, mb-6 -> mb-3 để gọn hơn
            audioDiv.className = "p-2 mb-3 text-center border border-blue-100 bg-blue-50 rounded-xl";
            const btnId = `speak-btn-${currentQuestion}`;

            audioDiv.innerHTML = `
                <div class="mb-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider flex items-center justify-center gap-2">
                    <span>🎧 Nghe</span>
                </div>
                <button id="${btnId}" class="relative inline-flex items-center justify-center gap-2 px-6 py-2 font-bold text-white transition-all transform bg-blue-500 shadow-md rounded-full hover:bg-blue-600 active:scale-95 group text-sm">
                    <span class="text-lg">🔊</span>
                    <span>Bấm nghe</span>
                    <span class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-blue-400 hidden" id="${btnId}-ping"></span>
                </button>
            `;
            container.appendChild(audioDiv);

            // Logic nghe giữ nguyên
            setTimeout(() => {
                const btn = document.getElementById(btnId);
                const ping = document.getElementById(`${btnId}-ping`);
                if (btn) {
                    btn.addEventListener('click', () => {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(q.audioScript);
                        utterance.lang = q.langCode || 'en-US'; 
                        utterance.rate = 0.9;
                        utterance.onstart = () => {
                            btn.classList.add('bg-green-500'); btn.classList.remove('bg-blue-500');
                            if(ping) ping.classList.remove('hidden');
                        };
                        utterance.onend = () => {
                            btn.classList.add('bg-blue-500'); btn.classList.remove('bg-green-500');
                            if(ping) ping.classList.add('hidden');
                        };
                        window.speechSynthesis.speak(utterance);
                    });
                }
            }, 0);
        }

        // --- B. WRITING (FIX LỖI TRÀN MÀN HÌNH) ---
        if (q.type === 'writing') {
            const wrapper = document.createElement('div');
            // FIX QUAN TRỌNG: Đổi flex-row -> flex-col (xếp dọc) để không bị tràn
            wrapper.className = "flex flex-col w-full gap-3 mt-2"; 
            
            const questionTextContainer = document.createElement('div');
            questionTextContainer.className = "w-full mb-1 text-center";
            const questionText = document.createElement('div');
            questionText.className = "text-lg font-bold leading-relaxed text-gray-800"; // Chữ nhỏ hơn xíu cho vừa
            questionText.innerHTML = q.question.replace(/_+/g, '<span class="inline-block w-12 border-b-4 border-blue-400 mx-1"></span>');
            questionTextContainer.appendChild(questionText);
            
            container.appendChild(questionTextContainer);

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'writing-input';
            // FIX: Căn giữa text (text-center), input full width
            input.className = "w-full p-3 text-lg font-bold text-center placeholder-gray-300 transition-all bg-white border-2 border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:shadow-lg";
            input.placeholder = "Nhập đáp án...";
            input.autocomplete = "off";
            
            const feedbackMsg = document.createElement('div');
            feedbackMsg.id = 'writing-feedback-msg';
            // FIX: Bỏ min-w-fit để không bị tràn, cho full width
            feedbackMsg.className = "hidden w-full px-4 py-2 text-sm font-bold text-center transition-all rounded-xl"; 

            input.addEventListener('input', (e) => {
                if (!answered) {
                    if(e.target.value.trim().length > 0) enableNextButton(); 
                    else disableNextButton();
                }
            });

            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter' && e.target.value.trim().length > 0 && !answered) {
                    checkWritingAnswerAndNext();
                }
            });

            wrapper.appendChild(input);
            wrapper.appendChild(feedbackMsg);
            container.appendChild(wrapper);
            return; 
        }

        // --- C. MULTIPLE CHOICE (TỐI ƯU KHOẢNG CÁCH) ---
        if (q.options && q.options.length > 0) {
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                // FIX: Giảm padding p-4 -> p-3 để nút gọn hơn
                btn.className = 'flex items-center w-full gap-3 p-3 font-bold text-left text-white shadow-md answer-btn rounded-xl transition-all transform hover:scale-[1.01] active:scale-95';
                
                const colors = [
                    'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
                    'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
                    'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 
                    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                ];
                btn.style.background = colors[index % colors.length];
                
                btn.innerHTML = `
                    <span class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-black shadow-inner flex-shrink-0">${String.fromCharCode(65 + index)}</span>
                    <span class="flex-1 text-sm md:text-base leading-snug">${option}</span>
                `;
                btn.addEventListener('click', () => selectAnswer(index));
                container.appendChild(btn);
            });
        }
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
            const points = Math.round(100 / questions.length);
            feedback.innerHTML = `🎉 Chính xác! +${points} điểm`;
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
                btn.style.transform = 'scale(1.02)';
                btn.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
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

   async function showResults() {
    // 1. Xử lý điểm số cơ bản
    score = Math.round(score); 
    if (score > 100) score = 100;

    const percentage = Math.round((correctCount / questions.length) * 100);
    const unlockedWheel = score >= 50; 
    
    // 2. Logic Phân Tích AI (Dựa trên điểm số và ngôn ngữ)
    // Lưu ý: Đảm bảo bạn đã có hàm getStudentRank() định nghĩa ở bên ngoài
    const currentLang = (participantData && participantData.language) ? participantData.language : 'en';
    
    // Nếu chưa có hàm getStudentRank, hệ thống sẽ dùng giá trị mặc định này để không bị lỗi
    let rankInfo = { label: 'Triển vọng', message: 'Bạn đã hoàn thành bài thi.', course_recommend: 'Khóa Giao tiếp Cơ bản' };
    if (typeof getStudentRank === 'function') {
        rankInfo = getStudentRank(score, currentLang);
    }

    // 3. Hiển thị thông số lên màn hình kết quả
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-answers').textContent = correctCount;
    document.getElementById('percentage').textContent = `${percentage}%`;

    // -----------------------------------------------------------
    // 🔥 TÍCH HỢP BIZFLY WEBHOOK TẠI ĐÂY
    // -----------------------------------------------------------
   
    // -----------------------------------------------------------

    // 4. Render AI Report Card (Thẻ báo cáo AI)
    const aiReportHTML = `
        <div class="mb-6 animate-fade-in-up">
            <div class="relative p-5 text-left border border-blue-200 bg-blue-50/80 rounded-2xl shadow-sm">
                <div class="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <span>🤖</span> AI ANALYSIS
                </div>
                
                <div class="flex items-center gap-3 mb-3">
                    <div class="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md text-3xl">
                        ${score >= 80 ? '🥇' : (score >= 50 ? '🥈' : '🥉')}
                    </div>
                    <div>
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Trình độ tương đương</div>
                        <div class="text-xl font-black text-blue-800">${rankInfo.label}</div>
                    </div>
                </div>

                <div class="mb-4 text-sm leading-relaxed text-gray-700 bg-white p-4 rounded-xl border border-blue-100 shadow-inner">
                    ${rankInfo.message}
                </div>

                <div class="pt-3 mt-3 border-t border-blue-200/50">
                    <div class="mb-1 text-xs font-bold text-gray-500 uppercase tracking-wide">Khóa học đề xuất tại Hallo Saigon:</div>
                    <div class="flex items-center justify-between p-3 text-white shadow-md bg-gradient-to-r from-orange-500 to-red-500 rounded-xl transform transition-transform hover:scale-[1.02]">
                        <div class="font-bold text-sm flex items-center gap-2">
                            <span>🔥</span> ${rankInfo.course_recommend}
                        </div>
                        <div class="text-xl">➔</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Chèn AI Report vào giao diện
    let reportContainer = document.getElementById('ai-report-container');
    if (!reportContainer) {
        reportContainer = document.createElement('div');
        reportContainer.id = 'ai-report-container';
        // Tìm vị trí chèn: Sau khối điểm số
        const scoreBlock = document.querySelector('#screen-results .bg-gradient-to-br'); 
        if(scoreBlock) scoreBlock.insertAdjacentElement('afterend', reportContainer);
    }
    reportContainer.innerHTML = aiReportHTML;

    // 5. Render Skill Bars (Biểu đồ kỹ năng)
    // Lưu ý: Đảm bảo biến skillMetrics đã được tính toán trong quá trình làm bài
    if (typeof skillMetrics !== 'undefined') {
        let skillsHTML = '<div class="space-y-4 mb-6 w-full p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">';
        for (const [cat, data] of Object.entries(skillMetrics)) {
            if (data.total > 0) {
                const percent = Math.round((data.current / data.total) * 100);
                const displayTotal = Math.round(data.total);
                const displayCurrent = Math.round(data.current);

                let displayCat = cat;
                // Mapping tên kỹ năng sang tiếng Việt
                if(cat === 'LISTENING') displayCat = '🎧 Nghe Hiểu (Listening)';
                else if(cat === 'READING') displayCat = '📖 Đọc Hiểu (Reading)';
                else if(cat === 'GRAMMAR') displayCat = '✍️ Ngữ Pháp (Grammar)';
                else if(cat === 'VOCABULARY') displayCat = '🔤 Từ Vựng (Vocabulary)';
                else if(cat === 'WRITING') displayCat = '📝 Kỹ Năng Viết (Writing)';
                else if(cat === 'NUMBERS') displayCat = '🔢 Số Học (Numbers)';
                else if(cat === 'GREETING') displayCat = '👋 Giao Tiếp (Greeting)';

                skillsHTML += `
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between text-xs font-bold text-gray-600 uppercase tracking-wide">
                            <span>${displayCat}</span>
                            <span class="text-blue-600">${displayCurrent}/${displayTotal}</span>
                        </div>
                        <div class="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out" style="width: ${percent}%"></div>
                        </div>
                    </div>
                `;
            }
        }
        skillsHTML += '</div>';

        // Chèn Skill Bars vào giao diện
        const resultCard = document.querySelector('#screen-results .card-3d');
        let skillsContainer = document.getElementById('skills-breakdown');
        if (!skillsContainer) {
            skillsContainer = document.createElement('div');
            skillsContainer.id = 'skills-breakdown';
            const beforeTarget = document.getElementById('unlock-message') || document.querySelector('#screen-results .grid');
            if(beforeTarget && resultCard) {
                resultCard.insertBefore(skillsContainer, beforeTarget);
            } else if (resultCard) {
                resultCard.appendChild(skillsContainer);
            }
        }
        skillsContainer.innerHTML = skillsHTML;
    }

    // 6. Logic Vòng Quay May Mắn (Lucky Wheel)
    const unlockMsg = document.getElementById('unlock-message');
    const spinBtn = document.getElementById('spin-wheel-btn');
    const resultEmoji = document.getElementById('result-emoji');

    if (resultEmoji) {
        if (score === 100) resultEmoji.textContent = '🏆';
        else if (score >= 80) resultEmoji.textContent = '🎉';
        else if (score >= 60) resultEmoji.textContent = '😊';
        else resultEmoji.textContent = '💪';
    }
    
    if (unlockedWheel) {
        if(unlockMsg) unlockMsg.classList.remove('hidden');
        if(spinBtn) spinBtn.classList.remove('hidden');
        if (typeof createConfetti === 'function') createConfetti();
    } else {
        if(unlockMsg) unlockMsg.classList.add('hidden');
        if(spinBtn) spinBtn.classList.add('hidden');
    }
    
    // 7. Lưu dữ liệu Session & Gửi Google Sheet (nếu có)
    if (participantData) {
        participantData.score = score;
        participantData.unlocked_wheel = unlockedWheel;
        participantData.rank = rankInfo.label;
        participantData.ai_advice = rankInfo.course_recommend;
        
        if (typeof skillMetrics !== 'undefined') {
            let skillReport = [];
            for (const [cat, data] of Object.entries(skillMetrics)) {
                 skillReport.push(`${cat}: ${Math.round(data.current)}/${Math.round(data.total)}`);
            }
            participantData.skill_breakdown = skillReport.join(' | ');
        }

        saveSession(participantData); 

        // Gửi Google Sheet (giữ nguyên logic cũ của bạn nếu cần)
        if (typeof sendDataToGoogleSheet === 'function') {
            showLoading(true);
            try {
                await sendDataToGoogleSheet(participantData);
            } catch (err) {
                console.error("Lỗi gửi Google Sheet:", err);
            } finally {
                showLoading(false);
            }
        }
    }
    
    // 8. Hiển thị màn hình kết quả
    showScreen('results');
}

    // Wheel functions
    let wheelCanvas, wheelCtx, wheelRotation = 0, isSpinning = false;

    function initWheel() {
        wheelCanvas = document.getElementById('wheel-canvas');
        if (!wheelCanvas) return;
        wheelCtx = wheelCanvas.getContext('2d');
        const size = wheelCanvas.offsetWidth;
        wheelCanvas.width = size;
        wheelCanvas.height = size;
        drawWheel();
    }

    function drawWheel() {
        if (!wheelCtx || !wheelCanvas) return;
        
        const centerX = wheelCanvas.width / 2;
        const centerY = wheelCanvas.height / 2;
        const radius = wheelCanvas.width / 2 - 10;
        const segmentAngle = (2 * Math.PI) / prizes.length;
        
        wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        
        prizes.forEach((prize, index) => {
            const startAngle = index * segmentAngle + wheelRotation;
            const endAngle = startAngle + segmentAngle;
            
            wheelCtx.beginPath();
            wheelCtx.moveTo(centerX, centerY);
            wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
            wheelCtx.closePath();
            wheelCtx.fillStyle = prize.color;
            wheelCtx.fill();
            wheelCtx.stroke();
            
            wheelCtx.save();
            wheelCtx.translate(centerX, centerY);
            wheelCtx.rotate(startAngle + segmentAngle / 2);
            wheelCtx.textAlign = 'center';
            wheelCtx.fillStyle = '#fff';
            wheelCtx.font = 'bold 12px Poppins';
            wheelCtx.fillText(prize.emoji, radius * 0.75, 5);
            wheelCtx.restore();
        });
    }

    async function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        
        const spinBtn = document.getElementById('spin-btn');
        spinBtn.disabled = true;
        document.getElementById('spin-btn-text').textContent = 'Đang quay... 🎯';
        
        const spins = 5 + Math.random() * 3;
        const extraDegrees = Math.random() * 360;
        const totalRotation = spins * 360 + extraDegrees;
        const duration = 4000;
        const startTime = Date.now();
        const startRotation = wheelRotation;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            wheelRotation = startRotation + (totalRotation * Math.PI / 180) * easeOut;
            drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isSpinning = false;
                const segmentAngle = (2 * Math.PI) / prizes.length;
                const normalizedRotation = (2 * Math.PI - wheelRotation % (2 * Math.PI)) % (2 * Math.PI);
                const prizeIndex = Math.floor(normalizedRotation / segmentAngle);
                const wonPrize = prizes[prizeIndex];
                
                showPrize(wonPrize);
                createConfetti();
                
                if (participantData) {
                    participantData.prize_won = wonPrize.name;
                    sendDataToGoogleSheet(participantData);
                }
            }
        }
        animate();
    }

    function showPrize(prize) {
        const prizeDisplay = document.getElementById('prize-display');
        document.getElementById('prize-text').textContent = `Bạn nhận được: ${prize.emoji} ${prize.name}`;
        prizeDisplay.classList.remove('hidden');
    }

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

    // --- ELEMENT SDK ---
    async function onConfigChange(cfg) {
        config = { ...defaultConfig, ...cfg };
        const titleEl = document.getElementById('quiz-title-display');
        if (titleEl) titleEl.textContent = config.quiz_title;
        document.body.style.fontFamily = config.font_family;
    }

    if (window.elementSdk) {
        window.elementSdk.init({ defaultConfig, onConfigChange });
    }

    initDataSDK();
   
});
document.addEventListener('DOMContentLoaded', () => {
    // Xử lý nút Messenger mở Fanpage trực tiếp (Không qua OA)
    const messengerBtn = document.getElementById('messenger-btn');
    if (messengerBtn) {
        messengerBtn.addEventListener('click', () => {
            // Mở link Messenger web trực tiếp
            const messengerUrl = "https://m.me/100083047195100";
            
            // Nếu đang trong Zalo Mini App, ưu tiên dùng Webview của Zalo để mượt hơn
            if (window.zmpSdk && window.zmpSdk.openWebview) {
                window.zmpSdk.openWebview({
                    url: messengerUrl,
                    config: { style: "bottomSheet" }
                });
            } else {
                // Nếu chạy trên trình duyệt thường (localhost), mở tab mới
                window.open(messengerUrl, "_blank");
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const zaloOABtn = document.getElementById('zalo-oa-btn');
    
    if (zaloOABtn) {
        zaloOABtn.addEventListener('click', async () => {
            const oaId = "2112176407138597287";
            
            if (window.zmpSdk) {
                try {
                    // Mở cửa sổ chat với OA bằng API của Zalo Mini App SDK
                    await window.zmpSdk.openChat({
                        type: 'oa',
                        id: oaId
                    });
                } catch (error) {
                    // Phương án dự phòng mở qua trình duyệt web
                    window.open(`https://zalo.me/${oaId}`, "_blank");
                }
            } else {
                // Môi trường trình duyệt PC
                window.open(`https://zalo.me/${oaId}`, "_blank");
            }
        });
    }
});