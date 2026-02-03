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
    // --- GRAMMAR (Ngữ pháp cơ bản) ---
    { id: 1, type: "multiple_choice", category: "GRAMMAR", question: "I ______ a student.", options: ["is", "are", "am", "be"], correct: 2 },
    { id: 2, type: "multiple_choice", category: "GRAMMAR", question: "She ______ to school every day.", options: ["go", "goes", "going", "went"], correct: 1 },
    { id: 3, type: "multiple_choice", category: "GRAMMAR", question: "They ______ playing football now.", options: ["is", "am", "are", "be"], correct: 2 },
    { id: 4, type: "multiple_choice", category: "GRAMMAR", question: "______ you like pizza?", options: ["Do", "Does", "Is", "Are"], correct: 0 },
    { id: 5, type: "multiple_choice", category: "GRAMMAR", question: "Yesterday, I ______ to the park.", options: ["go", "goes", "went", "gone"], correct: 2 },
    { id: 6, type: "multiple_choice", category: "GRAMMAR", question: "He is ______ than his brother.", options: ["tall", "taller", "tallest", "more tall"], correct: 1 },
    { id: 7, type: "multiple_choice", category: "GRAMMAR", question: "This is ______ book.", options: ["my", "mine", "I", "me"], correct: 0 },
    { id: 8, type: "multiple_choice", category: "GRAMMAR", question: "There ______ two cats in the room.", options: ["is", "are", "am", "be"], correct: 1 },
    { id: 9, type: "multiple_choice", category: "GRAMMAR", question: "______ do you live?", options: ["What", "Who", "Where", "When"], correct: 2 },
    { id: 10, type: "multiple_choice", category: "GRAMMAR", question: "I can ______ English.", options: ["speak", "speaks", "speaking", "to speak"], correct: 0 },
    { id: 11, type: "multiple_choice", category: "GRAMMAR", question: "She ______ have a car.", options: ["don't", "doesn't", "isn't", "aren't"], correct: 1 },
    { id: 12, type: "multiple_choice", category: "GRAMMAR", question: "We ______ TV last night.", options: ["watch", "watches", "watched", "watching"], correct: 2 },
    { id: 13, type: "multiple_choice", category: "GRAMMAR", question: "Can you ______ me?", options: ["help", "helps", "helping", "to help"], correct: 0 },
    { id: 14, type: "multiple_choice", category: "GRAMMAR", question: "______ is your name?", options: ["Who", "What", "Where", "How"], correct: 1 },
    { id: 15, type: "multiple_choice", category: "GRAMMAR", question: "My mother is a doctor. ______ works in a hospital.", options: ["He", "She", "It", "They"], correct: 1 },
    { id: 16, type: "multiple_choice", category: "GRAMMAR", question: "Look! It ______ raining.", options: ["is", "are", "am", "was"], correct: 0 },
    { id: 17, type: "multiple_choice", category: "GRAMMAR", question: "I usually get up ______ 6 o'clock.", options: ["in", "on", "at", "to"], correct: 2 },
    { id: 18, type: "multiple_choice", category: "GRAMMAR", question: "______ is this pen? - It's $5.", options: ["How many", "How much", "How often", "How long"], correct: 1 },
    { id: 19, type: "multiple_choice", category: "GRAMMAR", question: "They ______ not happy yesterday.", options: ["was", "were", "did", "do"], correct: 1 },
    { id: 20, type: "multiple_choice", category: "GRAMMAR", question: "Would you like ______ coffee?", options: ["some", "any", "a", "an"], correct: 0 },

    // --- VOCABULARY (Từ vựng thông dụng) ---
    { id: 21, type: "multiple_choice", category: "VOCABULARY", question: "Which animal says 'Meow'?", options: ["Dog", "Cat", "Cow", "Pig"], correct: 1 },
    { id: 22, type: "multiple_choice", category: "VOCABULARY", question: "Apple is a ______.", options: ["Fruit", "Vegetable", "Meat", "Drink"], correct: 0 },
    { id: 23, type: "multiple_choice", category: "VOCABULARY", question: "My mother’s sister is my ______.", options: ["uncle", "aunt", "cousin", "niece"], correct: 1 },
    { id: 24, type: "multiple_choice", category: "VOCABULARY", question: "We sleep in the ______.", options: ["Kitchen", "Bathroom", "Bedroom", "Garage"], correct: 2 },
    { id: 25, type: "multiple_choice", category: "VOCABULARY", question: "The opposite of 'Big' is ______.", options: ["Small", "Tall", "Fat", "Long"], correct: 0 },
    { id: 26, type: "multiple_choice", category: "VOCABULARY", question: "We eat breakfast in the ______.", options: ["morning", "afternoon", "evening", "night"], correct: 0 },
    { id: 27, type: "multiple_choice", category: "VOCABULARY", question: "Blue and Yellow make ______.", options: ["Red", "Green", "Orange", "Purple"], correct: 1 },
    { id: 28, type: "multiple_choice", category: "VOCABULARY", question: "A person who flies a plane is a ______.", options: ["driver", "pilot", "doctor", "farmer"], correct: 1 },
    { id: 29, type: "multiple_choice", category: "VOCABULARY", question: "We use a ______ to cut paper.", options: ["knife", "scissors", "spoon", "fork"], correct: 1 },
    { id: 30, type: "multiple_choice", category: "VOCABULARY", question: "Monday, Tuesday, ______.", options: ["Thursday", "Friday", "Wednesday", "Sunday"], correct: 2 },
    { id: 31, type: "multiple_choice", category: "VOCABULARY", question: "The sun is ______.", options: ["hot", "cold", "wet", "dark"], correct: 0 },
    { id: 32, type: "multiple_choice", category: "VOCABULARY", question: "I have two hands and ten ______.", options: ["legs", "fingers", "arms", "heads"], correct: 1 },
    { id: 33, type: "multiple_choice", category: "VOCABULARY", question: "You read a ______.", options: ["book", "pen", "table", "chair"], correct: 0 },
    { id: 34, type: "multiple_choice", category: "VOCABULARY", question: "Summer is usually ______.", options: ["cold", "snowy", "hot", "rainy"], correct: 2 },
    { id: 35, type: "multiple_choice", category: "VOCABULARY", question: "A dog has four ______.", options: ["hands", "legs", "arms", "noses"], correct: 1 },
    { id: 36, type: "multiple_choice", category: "VOCABULARY", question: "Water is ______.", options: ["solid", "liquid", "gas", "food"], correct: 1 },
    { id: 37, type: "multiple_choice", category: "VOCABULARY", question: "My father drives a ______.", options: ["car", "house", "pen", "book"], correct: 0 },
    { id: 38, type: "multiple_choice", category: "VOCABULARY", question: "Fish live in ______.", options: ["sky", "water", "land", "tree"], correct: 1 },
    { id: 39, type: "multiple_choice", category: "VOCABULARY", question: "I wear ______ on my feet.", options: ["hat", "shoes", "gloves", "shirt"], correct: 1 },
    { id: 40, type: "multiple_choice", category: "VOCABULARY", question: "Five + Five = ______.", options: ["Nine", "Ten", "Eleven", "Eight"], correct: 1 },

    // --- WRITING (Điền từ đơn giản) ---
    { id: 41, type: "writing", category: "WRITING", question: "Write the opposite of 'Hot'.", correctAnswer: "cold" },
    { id: 42, type: "writing", category: "WRITING", question: "Write the number 12 in words.", correctAnswer: "twelve" },
    { id: 43, type: "writing", category: "WRITING", question: "Hello, how _____ you?", correctAnswer: "are" },
    { id: 44, type: "writing", category: "WRITING", question: "What is your _____? - My name is John.", correctAnswer: "name" },
    { id: 45, type: "writing", category: "WRITING", question: "I _____ to school by bus.", correctAnswer: "go" },
    { id: 46, type: "writing", category: "WRITING", question: "Thank you very _____.", correctAnswer: "much" },
    { id: 47, type: "writing", category: "WRITING", question: "Good morning, Good _____ (buổi chiều).", correctAnswer: "afternoon" },
    { id: 48, type: "writing", category: "WRITING", question: "One, Two, Three, _____.", correctAnswer: "four" },
    { id: 49, type: "writing", category: "WRITING", question: "He is a good _____ (học sinh).", correctAnswer: "student" },
    { id: 50, type: "writing", category: "WRITING", question: "This is _____ apple (mạo từ).", correctAnswer: "an" }
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