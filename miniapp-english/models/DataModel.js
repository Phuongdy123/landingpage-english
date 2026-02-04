// ============================================================
// --- CẤU HÌNH HỆ THỐNG (CONFIG) ---
// ============================================================
const defaultConfig = {
    quiz_title: 'Global Citizen Challenge',
    quiz_subtitle: 'Kiểm tra trình độ chuẩn quốc tế: IELTS - TOPIK - HSK - JLPT',
    start_button_text: 'Bắt Đầu Test Ngay ✈️',
    questions_per_turn: 10 // Mặc định hiển thị 10 câu mỗi lần chơi
};

// ============================================================
// --- 1. KHO 50 CÂU HỎI TIẾNG ANH (CƠ BẢN - DỄ) ---
// ============================================================
const englishQuestionPool = [
    // ============================================================
    // --- 1. GRAMMAR (Ngữ pháp cơ bản & phổ thông) ---
    // ============================================================
    // Tenses (Các thì cơ bản: Quá khứ, Hiện tại hoàn thành, Tương lai)
    { id: 1, type: "multiple_choice", category: "GRAMMAR", question: "Last summer, I ______ to Da Nang with my family.", options: ["go", "goes", "went", "have gone"], correct: 2 },
    { id: 2, type: "multiple_choice", category: "GRAMMAR", question: "She ______ English for 5 years.", options: ["learns", "has learned", "is learning", "learned"], correct: 1 },
    { id: 3, type: "multiple_choice", category: "GRAMMAR", question: "Look! The bus ______.", options: ["comes", "is coming", "came", "will come"], correct: 1 },
    
    // Comparisons (So sánh hơn/nhất)
    { id: 4, type: "multiple_choice", category: "GRAMMAR", question: "Ho Chi Minh City is ______ than Hanoi.", options: ["big", "biger", "bigger", "more big"], correct: 2 },
    { id: 5, type: "multiple_choice", category: "GRAMMAR", question: "He is the ______ student in my class.", options: ["tall", "taller", "tallest", "most tall"], correct: 2 },
    
    // Passive Voice (Câu bị động đơn giản)
    { id: 6, type: "multiple_choice", category: "GRAMMAR", question: "This house ______ in 1990.", options: ["built", "was built", "is built", "builds"], correct: 1 },
    
    // Conditional Type 1 (Câu điều kiện loại 1 - Có thể xảy ra)
    { id: 7, type: "multiple_choice", category: "GRAMMAR", question: "If it rains, we ______ at home.", options: ["stay", "stayed", "will stay", "would stay"], correct: 2 },
    
    // Wish (Câu ước đơn giản)
    { id: 8, type: "multiple_choice", category: "GRAMMAR", question: "I don't have a car. I wish I ______ one.", options: ["have", "had", "will have", "am having"], correct: 1 },
    
    // Prepositions of Time (in/on/at)
    { id: 9, type: "multiple_choice", category: "GRAMMAR", question: "My birthday is ______ May.", options: ["on", "in", "at", "to"], correct: 1 },
    { id: 10, type: "multiple_choice", category: "GRAMMAR", question: "We usually watch TV ______ night.", options: ["in", "on", "at", "for"], correct: 2 },
    
    // Modals (Động từ khuyết thiếu)
    { id: 11, type: "multiple_choice", category: "GRAMMAR", question: "You ______ stop when the traffic light is red.", options: ["can", "must", "may", "will"], correct: 1 },
    { id: 12, type: "multiple_choice", category: "GRAMMAR", question: "I ______ swim when I was 5 years old.", options: ["can", "could", "should", "must"], correct: 1 },
    
    // Articles (a/an/the)
    { id: 13, type: "multiple_choice", category: "GRAMMAR", question: "My father is ______ engineer.", options: ["a", "an", "the", "Ø"], correct: 1 },
    
    // Question Words (Từ để hỏi)
    { id: 14, type: "multiple_choice", category: "GRAMMAR", question: "______ do you go to school? - By bus.", options: ["What", "Where", "How", "When"], correct: 2 },
    
    // Gerunds (V_ing sau động từ yêu thích)
    { id: 15, type: "multiple_choice", category: "GRAMMAR", question: "She enjoys ______ books in her free time.", options: ["read", "to read", "reading", "reads"], correct: 2 },
    
    // Because / Although
    { id: 16, type: "multiple_choice", category: "GRAMMAR", question: "______ he was tired, he finished his homework.", options: ["Because", "So", "Although", "But"], correct: 2 },
    
    // Used to
    { id: 17, type: "multiple_choice", category: "GRAMMAR", question: "I used to ______ football when I was a child.", options: ["play", "playing", "played", "plays"], correct: 0 },
    
    // Relative Clause simple (Who/Which)
    { id: 18, type: "multiple_choice", category: "GRAMMAR", question: "This is the book ______ I bought yesterday.", options: ["who", "which", "where", "when"], correct: 1 },
    
    // Tag Question simple
    { id: 19, type: "multiple_choice", category: "GRAMMAR", question: "You are a student, ______?", options: ["are you", "aren't you", "do you", "don't you"], correct: 1 },
    
    // Suggestion
    { id: 20, type: "multiple_choice", category: "GRAMMAR", question: "Let's ______ to the cinema.", options: ["go", "going", "to go", "went"], correct: 0 },

    // ============================================================
    // --- 2. VOCABULARY (Từ vựng đời sống thường ngày) ---
    // ============================================================
    { id: 21, type: "multiple_choice", category: "VOCABULARY", question: "We usually cook meals in the ______.", options: ["bedroom", "bathroom", "kitchen", "living room"], correct: 2 },
    { id: 22, type: "multiple_choice", category: "VOCABULARY", question: "My mother's brother is my ______.", options: ["aunt", "uncle", "cousin", "grandfather"], correct: 1 },
    { id: 23, type: "multiple_choice", category: "VOCABULARY", question: "Which animal is very big and has a long nose?", options: ["Lion", "Monkey", "Elephant", "Tiger"], correct: 2 },
    { id: 24, type: "multiple_choice", category: "VOCABULARY", question: "The opposite of 'Fast' is ______.", options: ["Slow", "Quick", "Hard", "Easy"], correct: 0 },
    { id: 25, type: "multiple_choice", category: "VOCABULARY", question: "You need a ______ to buy things at the supermarket.", options: ["passport", "money", "ticket", "map"], correct: 1 },
    { id: 26, type: "multiple_choice", category: "VOCABULARY", question: "It is very ______ in summer.", options: ["cold", "hot", "snowy", "freezing"], correct: 1 },
    { id: 27, type: "multiple_choice", category: "VOCABULARY", question: "A person who teaches students is a ______.", options: ["doctor", "farmer", "teacher", "driver"], correct: 2 },
    { id: 28, type: "multiple_choice", category: "VOCABULARY", question: "Yellow + Red = ______.", options: ["Blue", "Green", "Orange", "Black"], correct: 2 },
    { id: 29, type: "multiple_choice", category: "VOCABULARY", question: "I have a headache. I should go to the ______.", options: ["school", "market", "doctor", "park"], correct: 2 },
    { id: 30, type: "multiple_choice", category: "VOCABULARY", question: "We have breakfast in the ______.", options: ["morning", "afternoon", "evening", "night"], correct: 0 },
    { id: 31, type: "multiple_choice", category: "VOCABULARY", question: "Football, Tennis, and Swimming are ______.", options: ["subjects", "sports", "food", "music"], correct: 1 },
    { id: 32, type: "multiple_choice", category: "VOCABULARY", question: "Please turn ______ the lights before you leave.", options: ["on", "off", "up", "in"], correct: 1 },
    { id: 33, type: "multiple_choice", category: "VOCABULARY", question: "Can I ______ your pen, please?", options: ["lend", "borrow", "give", "take"], correct: 1 },
    { id: 34, type: "multiple_choice", category: "VOCABULARY", question: "Ha Long Bay is a famous ______ in Vietnam.", options: ["city", "food", "landmark", "school"], correct: 2 },
    { id: 35, type: "multiple_choice", category: "VOCABULARY", question: "I am thirsty. I want to drink ______.", options: ["bread", "water", "rice", "apple"], correct: 1 },
    { id: 36, type: "multiple_choice", category: "VOCABULARY", question: "The ______ rises in the East.", options: ["Moon", "Star", "Sun", "Earth"], correct: 2 },
    { id: 37, type: "multiple_choice", category: "VOCABULARY", question: "Tet is the Lunar New ______.", options: ["Month", "Year", "Week", "Day"], correct: 1 },
    { id: 38, type: "multiple_choice", category: "VOCABULARY", question: "My sister is very ______. She helps everyone.", options: ["kind", "lazy", "bad", "angry"], correct: 0 },
    { id: 39, type: "multiple_choice", category: "VOCABULARY", question: "How ______ is this shirt? - It's 100,000 VND.", options: ["many", "long", "much", "old"], correct: 2 },
    { id: 40, type: "multiple_choice", category: "VOCABULARY", question: "Where are you ______? - I am from Vietnam.", options: ["come", "from", "go", "live"], correct: 1 },

    // ============================================================
    // --- 3. WRITING (Điền từ đơn giản) ---
    // ============================================================
    // Irregular Verbs (Động từ bất quy tắc)
    { id: 41, type: "writing", category: "WRITING", question: "Write the past form of 'Go'. (Quá khứ của Go)", correctAnswer: "went" },
    { id: 42, type: "writing", category: "WRITING", question: "Write the past form of 'Buy'. (Quá khứ của Buy)", correctAnswer: "bought" },
    
    // Opposites (Từ trái nghĩa)
    { id: 43, type: "writing", category: "WRITING", question: "The opposite of 'Big' is ______.", correctAnswer: "small" },
    { id: 44, type: "writing", category: "WRITING", question: "The opposite of 'Happy' is ______.", correctAnswer: "sad" },
    
    // Prepositions (Giới từ)
    { id: 45, type: "writing", category: "WRITING", question: "I am good ______ Math. (Điền giới từ)", correctAnswer: "at" },
    { id: 46, type: "writing", category: "WRITING", question: "Wait ______ me! (Đợi tôi với)", correctAnswer: "for" },
    
    // Simple Grammar Fill-in
    { id: 47, type: "writing", category: "WRITING", question: "She ______ (not/go) to school yesterday. (Điền: didn't go)", correctAnswer: "didn't go" },
    { id: 48, type: "writing", category: "WRITING", question: "There ______ (be) four people in my family. (Điền: are)", correctAnswer: "are" },
    
    // Numbers/Words
    { id: 49, type: "writing", category: "WRITING", question: "One, Two, Three, ______. (Số 4 viết bằng chữ)", correctAnswer: "four" },
    { id: 50, type: "writing", category: "WRITING", question: "He is a ______ (cầu thủ) football player.", correctAnswer: "good" } // Hoặc chấp nhận nhiều đáp án thì logic check cần sửa, ở đây để 'good' hoặc 'famous' đều hợp lý nhưng code đang check cứng. Ta đổi câu hỏi cho rõ ràng hơn:
    // SỬA CÂU 50 CHO DỄ HƠN VÀ CHÍNH XÁC:
    , { id: 50, type: "writing", category: "WRITING", question: "What is your name? - My ______ is Nam.", correctAnswer: "name" }
];

// ============================================================
// --- 2. CÁC NGÔN NGỮ KHÁC (Giữ nguyên) ---
// ============================================================
const otherLanguagesData = {
    // TIẾNG TRUNG (HSK)
    zh: {
        easy: [
            { type: 'choice', category: 'VOCABULARY', question: '“你好” (Nǐ hǎo) nghĩa là?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            { type: 'choice', category: 'NUMBERS', question: 'Số 1 trong tiếng Trung?', options: ['二 (Èr)', '三 (Sān)', '一 (Yī)', '四 (Sì)'], correct: 2 },
            { type: 'choice', category: 'GRAMMAR', question: '我 ___ 越南人。 (Tôi LÀ người VN)', options: ['是 (shì)', '有 (yǒu)', '在 (zài)', '去 (qù)'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết phiên âm Pinyin của "Cảm ơn" (xi...)', correctAnswer: 'xiexie' },
            { type: 'choice', category: 'VOCABULARY', question: '“爸爸” (Bàba) là ai?', options: ['Mẹ', 'Bố', 'Anh trai', 'Em gái'], correct: 1 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: '你 ___ 去哪儿？ (Bạn MUỐN đi đâu)', options: ['想', '喜欢', '爱', '看'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '他一边吃饭，___看电视。', options: ['一边', '一起', '一直', '一旦'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết chữ Hán: "Bắc Kinh" (Běijīng).', correctAnswer: '北京' },
            { type: 'choice', category: 'GRAMMAR', question: '虽然今天下雨，___他还是来了。', options: ['所以', '但是', '因为', '而且'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '服务员，请给我一___水。', options: ['杯', '本', '个', '只'], correct: 0 }
        ]
    },
    // TIẾNG HÀN (TOPIK)
    kr: {
        easy: [
            { type: 'choice', category: 'GRAMMAR', question: '“안녕하세요” nghĩa là gì?', options: ['Xin lỗi', 'Cảm ơn', 'Xin chào', 'Tạm biệt'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: '“사과” (Sagwa) là quả gì?', options: ['Táo', 'Nho', 'Cam', 'Dưa hấu'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '저는 학생___ (Là học sinh).', options: ['입니다', '입니까', '이', '가'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Kimchi" bằng tiếng Hàn.', correctAnswer: '김치' },
            { type: 'choice', category: 'VOCABULARY', question: '“가다” (Gada) nghĩa là?', options: ['Đi', 'Đến', 'Ăn', 'Ngủ'], correct: 0 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: 'Tiểu từ chủ ngữ là?', options: ['은/는', '이/가', '을/를', '에/에서'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '밥을 ___ (Ăn - Quá khứ).', options: ['먹어요', '먹었습니다', '먹을 거예요', '먹고'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Viết đuôi câu kính trọng của "하다" -> "합..."', correctAnswer: '니다' },
            { type: 'choice', category: 'VOCABULARY', question: '친구를 ___ (Gặp).', options: ['만납니다', '마십니다', '봅니다', '갑니다'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 씁니다. (Vì...nên)', options: ['오고', '와서', '오지만', '오면'], correct: 1 }
        ]
    },
    // TIẾNG ĐỨC (DE)
    de: {
        easy: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich ___ aus Vietnam.', options: ['komme', 'kommt', 'kommen', 'kam'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: '“Guten Morgen” nghĩa là?', options: ['Chào buổi sáng', 'Chào buổi tối', 'Chúc ngủ ngon', 'Tạm biệt'], correct: 0 },
             { type: 'choice', category: 'NUMBERS', question: 'Eins, Zwei, ___', options: ['Drei', 'Vier', 'Fünf', 'Sechs'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Ja oder ___ (Yes or No)', correctAnswer: 'nein' }
        ],
        medium: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich habe das Buch ___. (đã đọc)', options: ['gelesen', 'lese', 'liest', 'las'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wir fahren mit dem ___. (Tàu hỏa)', options: ['Zug', 'Auto', 'Flugzeug', 'Fahrrad'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Viết số 100 (Hundert)', correctAnswer: 'hundert' }
        ]
    },
    // TIẾNG NHẬT (JP)
    jp: {
        easy: [
            { type: 'choice', category: 'GREETING', question: 'Konnichiwa (こんにちは) nghĩa là?', options: ['Chào buổi trưa', 'Chào buổi sáng', 'Chào buổi tối', 'Tạm biệt'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Watashi (私) nghĩa là?', options: ['Tôi', 'Bạn', 'Anh ấy', 'Cô ấy'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Arigatou nghĩa là "Cảm..."', correctAnswer: 'on' },
            { type: 'choice', category: 'NUMBERS', question: 'Ichi, Ni, ___', options: ['San', 'Yon', 'Go', 'Roku'], correct: 0 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: 'Gohan wo ___ kudasai. (Hãy ăn cơm)', options: ['tabete', 'taberu', 'tabeta', 'tabemasu'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Ashita (明日) là khi nào?', options: ['Ngày mai', 'Hôm qua', 'Hôm nay', 'Năm ngoái'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Sakura" (Hoa anh đào).', correctAnswer: 'sakura' },
            { type: 'choice', category: 'GRAMMAR', question: 'Eiga wo ___ koto ga arimasu. (Đã từng xem)', options: ['mita', 'miru', 'mite', 'minai'], correct: 0 }
        ]
    }
};

// ============================================================
// --- 3. LOGIC XỬ LÝ (TRỘN & CẮT CÂU HỎI) ---
// ============================================================

// Biến chứa câu hỏi chính thức cho lượt chơi hiện tại
var questions = [];

/**
 * HÀM LOAD CÂU HỎI
 * @param {string} lang - Ngôn ngữ (en, zh, kr, de, jp)
 * @param {string} level - Cấp độ (easy, medium, hard) - *Với tiếng Anh sẽ bỏ qua level*
 */
function setQuestionsByLanguageAndLevel(lang, level) {
    let rawQuestions = [];

    // A. XỬ LÝ RIÊNG CHO TIẾNG ANH (Lấy từ Pool 50 câu)
    if (lang === 'en') {
        rawQuestions = [...englishQuestionPool]; // Copy mảng để không ảnh hưởng dữ liệu gốc
    } 
    // B. XỬ LÝ CHO CÁC NGÔN NGỮ KHÁC (Lấy theo Level như cũ)
    else if (otherLanguagesData[lang] && otherLanguagesData[lang][level]) {
        rawQuestions = [...otherLanguagesData[lang][level]];
    } else {
        console.warn("Không tìm thấy dữ liệu cho:", lang, level);
        return false;
    }

    // C. THUẬT TOÁN SHUFFLE (Xáo trộn ngẫu nhiên)
    // Dùng Fisher-Yates Shuffle để đảm bảo ngẫu nhiên thật sự
    for (let i = rawQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rawQuestions[i], rawQuestions[j]] = [rawQuestions[j], rawQuestions[i]];
    }

    // D. CẮT LẤY 10 CÂU
    const limit = defaultConfig.questions_per_turn || 10;
    questions = rawQuestions.slice(0, limit);

    console.log(`Đã tải ${questions.length} câu hỏi cho ${lang} (Nguồn: ${rawQuestions.length} câu).`);
    return true;
}

// Dữ liệu phần thưởng (Vòng quay may mắn)
const prizes = [
    { name: 'Giảm 10% Phí', color: '#FF6B6B', emoji: '💰' },
    { name: 'Sách Du Học', color: '#4ECDC4', emoji: '📚' },
    { name: 'Voucher $20', color: '#FFD93D', emoji: '🎫' },
    { name: 'Tư Vấn VIP', color: '#95E1D3', emoji: '⭐' },
    { name: 'Sổ Tay', color: '#F38181', emoji: '📒' },
    { name: 'Móc Khóa', color: '#AA96DA', emoji: '🧸' }
];