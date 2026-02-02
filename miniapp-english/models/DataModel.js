const defaultConfig = {
    quiz_title: 'Global Citizen Challenge',
    quiz_subtitle: 'Kiểm tra trình độ chuẩn quốc tế: IELTS - TOPIK - HSK - JLPT',
    start_button_text: 'Bắt Đầu Test Ngay ✈️',
    consent_text: 'Tôi đồng ý cung cấp thông tin để nhận lộ trình du học phù hợp',
    congratulations_text: 'Xuất sắc! Bạn đã mở khóa học bổng du học!',
    background_color: '#1e3a8a',
    card_color: '#ffffff',
    text_color: '#1f2937',
    primary_action_color: '#2563eb',
    font_family: 'Be Vietnam Pro', 
    questions_per_turn: 20 // Số câu hỏi hiển thị mỗi lần chơi
};

// ============================================================
// --- NGÂN HÀNG CÂU HỎI (20 CÂU / LEVEL) ---
// ============================================================
const questionsData = {
    // 1. TIẾNG ANH (IELTS Standard)
    en: {
        easy: [
            { type: 'choice', category: 'GRAMMAR', question: 'I ___ a student.', options: ['is', 'are', 'am', 'be'], correct: 2 },
            { type: 'choice', category: 'GRAMMAR', question: 'She ___ to school everyday.', options: ['go', 'goes', 'going', 'went'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'Which animal says "Meow"?', options: ['Dog', 'Cat', 'Cow', 'Pig'], correct: 1 },
            { type: 'choice', category: 'NUMBERS', question: 'Five + Five = ?', options: ['Nine', 'Ten', 'Eleven', 'Eight'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'They ___ playing football now.', options: ['is', 'am', 'are', 'be'], correct: 2 },
            { type: 'writing', category: 'WRITING', question: 'Write the opposite of "Hot".', correctAnswer: 'cold', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "My favorite color is Blue.", langCode: "en-US", question: 'What color?', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'We sleep in the ___.', options: ['Kitchen', 'Bathroom', 'Bedroom', 'Garage'], correct: 2 },
            { type: 'choice', category: 'GRAMMAR', question: '___ do you live?', options: ['What', 'Who', 'Where', 'When'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: 'Apple is a ___.', options: ['Fruit', 'Vegetable', 'Meat', 'Drink'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Yesterday, I ___ to the park.', options: ['go', 'goes', 'went', 'gone'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: 'My mother’s sister is my ___.', options: ['uncle', 'aunt', 'cousin', 'niece'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "Turn left at the traffic light.", langCode: "en-US", question: 'Direction?', options: ['Go straight', 'Turn right', 'Turn left', 'Stop'], correct: 2 },
            { type: 'writing', category: 'WRITING', question: 'Write the number 12 in words.', correctAnswer: 'twelve', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: 'He is ___ than his brother.', options: ['tall', 'taller', 'tallest', 'more tall'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'We eat breakfast in the ___.', options: ['morning', 'afternoon', 'evening', 'night'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Can you ___ swim?', options: ['to', 'ing', '(no word)', 'at'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "It's rainy today.", langCode: "en-US", question: 'Weather?', options: ['Sunny', 'Rainy', 'Cloudy', 'Snowy'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'The opposite of "Big" is ___.', options: ['Small', 'Tall', 'Fat', 'Long'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'This is ___ book.', options: ['my', 'mine', 'I', 'me'], correct: 0 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: 'I have lived here ___ 2010.', options: ['since', 'for', 'in', 'at'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'The flight takes ___ at 9:00 PM.', options: ['off', 'up', 'on', 'in'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Unless you hurry, you ___ the bus.', options: ['will miss', 'miss', 'missed', 'missing'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'He is responsible ___ the sales department.', options: ['of', 'for', 'to', 'in'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Past participle of "Buy" is _______.', correctAnswer: 'bought', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "We are out of stock.", langCode: "en-US", question: 'Meaning?', options: ['Full stock', 'No items left', 'Discount', 'New items'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'If I ___ you, I would accept the offer.', options: ['was', 'were', 'am', 'been'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'The meeting was called ___ due to bad weather.', options: ['in', 'out', 'off', 'up'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "Can I have the check, please?", langCode: "en-US", question: 'Where?', options: ['Park', 'School', 'Restaurant', 'Gym'], correct: 2 },
            { type: 'writing', category: 'WRITING', question: 'Complete: "Piece of _______" (Easy).', correctAnswer: 'cake', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: 'She suggests ___ a new plan.', options: ['create', 'to create', 'creating', 'created'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: 'A person who flies a plane is a ___.', options: ['driver', 'pilot', 'sailor', 'artist'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'This house ___ in 1990.', options: ['built', 'was built', 'is built', 'has built'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "I'd like to book a flight to Paris.", langCode: "en-US", question: 'Context?', options: ['Hotel', 'Restaurant', 'Airport/Travel Agency', 'Hospital'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: 'Please ___ your shoes before entering.', options: ['take off', 'put on', 'get up', 'look for'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'I look forward to ___ from you.', options: ['hear', 'hearing', 'heard', 'hears'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Noun form of "Happy" is "Happi..."', correctAnswer: 'ness', options: [] },
            { type: 'choice', category: 'VOCABULARY', question: 'The cost of living is increasing ___ .', options: ['rapid', 'rapidly', 'rapidity', 'rapids'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'He asked me where ___ .', options: ['do I live', 'did I live', 'I lived', 'I live'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "The deadline has been extended to Friday.", langCode: "en-US", question: 'New deadline?', options: ['Monday', 'Wednesday', 'Thursday', 'Friday'], correct: 3 }
        ],
        hard: [
            { type: 'choice', category: 'GRAMMAR', question: 'Scarcely had he entered the room ___ the phone rang.', options: ['than', 'when', 'then', 'after'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'The contract is ___ upon signature.', options: ['binding', 'bounding', 'bending', 'biding'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'It is essential that he ___ informed immediately.', options: ['be', 'is', 'was', 'were'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Synonym of "Decrease" starting with D.', correctAnswer: 'diminish', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "The merger has been called off indefinitely.", langCode: "en-US", question: 'Status?', options: ['Completed', 'Delayed', 'Cancelled', 'Started'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: 'His explanation was completely ___ .', options: ['plausible', 'plastic', 'plentiful', 'playful'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '___ he been more careful, the accident wouldn\'t have happened.', options: ['Has', 'Had', 'If', 'Should'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Complete: "Don\'t judge a book by its _______."', correctAnswer: 'cover', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "He's always pulling my leg.", langCode: "en-US", question: 'Meaning?', options: ['Hurting me', 'Joking', 'Massage', 'Helping'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'The board of directors ___ the proposal yesterday.', options: ['approve', 'approved', 'approves', 'approving'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'The sudden change in policy caught everyone off ___ .', options: ['guard', 'hand', 'foot', 'balance'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Not until the movie ended ___ realize he had lost his keys.', options: ['he did', 'did he', 'he was', 'was he'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'She has a ___ for learning languages.', options: ['knack', 'knock', 'knee', 'knot'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "The ubiquitous nature of smartphones has altered social interactions.", langCode: "en-US", question: 'Meaning of "ubiquitous"?', options: ['Rare', 'Expensive', 'Everywhere', 'Dangerous'], correct: 2 },
            { type: 'choice', category: 'GRAMMAR', question: 'I’d rather you ___ smoke in here.', options: ['don\'t', 'didn\'t', 'won\'t', 'not'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'A person who studies rocks is a "Geo..."', correctAnswer: 'logist', options: [] },
            { type: 'choice', category: 'VOCABULARY', question: 'The company is on the ___ of bankruptcy.', options: ['edge', 'verge', 'rim', 'side'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: 'Only by working hard ___ achieve your goals.', options: ['you can', 'can you', 'you will', 'will you'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "We need to address the elephant in the room.", langCode: "en-US", question: 'Idiom meaning?', options: ['Big animal', 'Obvious problem ignored', 'Small issue', 'Decoration'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: 'His speech was quite ___ ; I almost fell asleep.', options: ['monotonous', 'monotone', 'monopoly', 'monolith'], correct: 0 }
        ]
    },

    // 2. TIẾNG TRUNG (HSK Standard)
    zh: {
        easy: [
            { type: 'choice', category: 'GRAMMAR', question: '“你好” (Nǐ hǎo) nghĩa là?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            { type: 'choice', category: 'NUMBERS', question: 'Số 1 trong tiếng Trung?', options: ['二 (Èr)', '三 (Sān)', '一 (Yī)', '四 (Sì)'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: '“再见” (Zàijiàn) nghĩa là?', options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '我 ___ 越南人。 (Tôi LÀ người VN)', options: ['是 (shì)', '有 (yǒu)', '在 (zài)', '去 (qù)'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết phiên âm Pinyin của "Cảm ơn" (xi...)', correctAnswer: 'xiexie', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "现在是九点。", langCode: "zh-CN", question: 'Mấy giờ?', options: ['8:00', '9:00', '10:00', '7:00'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '“爸爸” (Bàba) là ai?', options: ['Mẹ', 'Bố', 'Anh trai', 'Em gái'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '他 ___ 哪儿？ (Anh ấy Ở đâu?)', options: ['去', '在', '是', '有'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '“明天” (Míngtiān) là khi nào?', options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Năm sau'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "我喜欢吃苹果。", langCode: "zh-CN", question: 'Thích ăn gì?', options: ['Chuối', 'Táo', 'Cam', 'Nho'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '这是___的书？(Sách CỦA ai)', options: ['什么', '谁', '哪', '几'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '“高兴” (Gāoxìng) nghĩa là gì?', options: ['Buồn', 'Vui vẻ', 'Tức giận', 'Mệt'], correct: 1 },
            { type: 'choice', category: 'NUMBERS', question: 'Số 10 tiếng Trung?', options: ['八 (Bā)', '九 (Jiǔ)', '十 (Shí)', '七 (Qī)'], correct: 2 },
            { type: 'listening', category: 'LISTENING', audioScript: "他对不起。", langCode: "zh-CN", question: 'Nói gì?', options: ['Cảm ơn', 'Xin lỗi', 'Tạm biệt', 'Chúc mừng'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Viết chữ Hán số 5.', correctAnswer: '五', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '你___吗？ (Bạn bận KHÔNG)', options: ['不', '没', '吗', '呢'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: '“学校” (Xuéxiào) là gì?', options: ['Bệnh viện', 'Trường học', 'Nhà hàng', 'Công ty'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '我有___个姐姐。 (Ba - Số lượng)', options: ['三', '第三', '三十', '十三'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "明天见。", langCode: "zh-CN", question: 'Ý nghĩa?', options: ['Hẹn mai gặp', 'Hẹn tuần sau', 'Tạm biệt', 'Xin chào'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Điền từ: 中国 (Trung ...)', correctAnswer: 'quoc', options: [] }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: '你 ___ 去哪儿？ (Bạn MUỐN đi đâu)', options: ['想', '喜欢', '爱', '看'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '他一边吃饭，___看电视。', options: ['一边', '一起', '一直', '一旦'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '服务员，请给我一___水。', options: ['杯', '本', '个', '只'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '虽然今天下雨，___他还是来了。', options: ['所以', '但是', '因为', '而且'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "前面左转就到了。", langCode: "zh-CN", question: 'Hướng dẫn?', options: ['Đi thẳng', 'Rẽ trái', 'Rẽ phải', 'Quay lại'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Viết chữ Hán: "Bắc Kinh" (Běijīng).', correctAnswer: '北京', options: [] },
            { type: 'choice', category: 'VOCABULARY', question: '请把护照和机票___给我。', options: ['出示', '出现', '出发', '出来'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '这本书我___看完了。 (Bổ ngữ kết quả)', options: ['已经', '正在', '一边', '就'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "今天太热了。", langCode: "zh-CN", question: 'Thời tiết?', options: ['Lạnh', 'Mát', 'Nóng', 'Mưa'], correct: 2 },
            { type: 'writing', category: 'WRITING', question: 'Điền từ: 因___ (Bởi vì - yīnwèi).', correctAnswer: '为', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '除了英语以外，他___会说法语。', options: ['都', '还', '就', '才'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '我对中国的历史很感___。 (Hứng thú)', options: ['兴趣', '有趣', '爱好', '意思'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '这件衣服___便宜___好看。', options: ['又...又', '虽然...但是', '因为...所以', '不但...而且'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "这件衣服有点儿贵，能不能便宜一点？", langCode: "zh-CN", question: 'Hành động?', options: ['Mua', 'Mặc cả', 'Trả lại', 'Thử đồ'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '我们要___保护环境。', options: ['注意', '愿意', '满意', '同意'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '你看___那个穿红裙子的女孩了吗？ (Bổ ngữ)', options: ['见', '看', '视', '望'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '这道菜的味道有点儿___。', options: ['咸', '盐', '烟', '严'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Lượng từ của xe: 一 ... 车 (liàng)', correctAnswer: '辆', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '快点儿，火车___开了。 (Sắp)', options: ['正在', '马上', '已经', '一直'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "祝你生日快乐。", langCode: "zh-CN", question: 'Dịp nào?', options: ['Năm mới', 'Sinh nhật', 'Giáng sinh', 'Tốt nghiệp'], correct: 1 }
        ],
        hard: [
            { type: 'choice', category: 'VOCABULARY', question: '这次考试对他来说是小菜一___。 (Dễ như ăn bánh)', options: ['盘', '碟', '碗', '杯'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '___下雨，我们也要去。', options: ['即使', '虽然', '但是', '因为'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '由于天气原因，航班被___了。', options: ['取消', '举行', '开始', '结束'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '与其在家里睡觉，___出去走走。', options: ['不如', '不然', '不过', '不只'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '我们需要___解决这个问题。', options: ['彻底', '到底', '根本', '基本'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Thành ngữ: "Mã đáo thành..." (Viết chữ Hán)', correctAnswer: '功', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "在这个问题上，我们的看法是一致的。", langCode: "zh-CN", question: 'Ý kiến?', options: ['Khác nhau', 'Giống nhau', 'Đối lập', 'Không rõ'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '无论发生什么，我___支持你。', options: ['都', '却', '才', '就'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "不论发生什么，我都支持你。", langCode: "zh-CN", question: 'Thái độ?', options: ['Phản đối', 'Ủng hộ', 'Thờ ơ', 'Lo lắng'], correct: 1 },
            { type: 'writing', category: 'WRITING', question: 'Viết từ: "Kinh tế" (Jīngjì)', correctAnswer: '经济', options: [] },
            { type: 'choice', category: 'VOCABULARY', question: '他的表现让大家感到非常___。 (Ngạc nhiên)', options: ['惊讶', '害怕', '生气', '高兴'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '既然你已经决定了，___就别后悔。', options: ['那么', '但是', '所以', '而且'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '我们要养成良好的生活___。', options: ['习惯', '惯例', '习俗', '风俗'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "这种现象在现代社会非常普遍。", langCode: "zh-CN", question: 'Hiện tượng này?', options: ['Hiếm', 'Phổ biến', 'Kỳ lạ', 'Mới'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '不但...而且... biểu thị quan hệ gì?', options: ['Chuyển ý', 'Tăng tiến', 'Nguyên nhân', 'Điều kiện'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '随着科技的发展，人们的生活发生了巨大的___。', options: ['变化', '变成', '变动', '变通'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Thành ngữ: "Nhập gia tùy..." (Súi)', correctAnswer: '俗', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '只有努力学习，___能取得好成绩。', options: ['才', '就', '都', '也'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "我看这部电影简直是浪费时间。", langCode: "zh-CN", question: 'Đánh giá?', options: ['Hay', 'Dở/Lãng phí', 'Bình thường', 'Cảm động'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '面临困难时，我们要保持___。', options: ['冷静', '安静', '平静', '宁静'], correct: 0 }
        ]
    },

    // 3. TIẾNG HÀN (TOPIK Standard)
    kr: {
        easy: [
            { type: 'choice', category: 'GRAMMAR', question: '“안녕하세요” nghĩa là gì?', options: ['Xin lỗi', 'Cảm ơn', 'Xin chào', 'Tạm biệt'], correct: 2 },
            { type: 'choice', category: 'VOCABULARY', question: '“사과” (Sagwa) là quả gì?', options: ['Táo', 'Nho', 'Cam', 'Dưa hấu'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '저는 학생___ (Là học sinh).', options: ['입니다', '입니까', '이', '가'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“가다” (Gada) nghĩa là?', options: ['Đi', 'Đến', 'Ăn', 'Ngủ'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '이것___ 무엇입니까? (Cái này LÀ cái gì?)', options: ['은', '을', '도', '로'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Số 1 (Thuần Hàn)?', options: ['하나 (Hana)', '둘 (Dul)', '셋 (Set)', '일 (Il)'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Kimchi" bằng tiếng Hàn.', correctAnswer: '김치', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết "Sữa" (Uyu) bằng tiếng Hàn.', correctAnswer: '우유', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "안녕히 가세요.", langCode: "ko-KR", question: 'Tình huống?', options: ['Gặp mặt', 'Tạm biệt (Người ở lại nói)', 'Tạm biệt (Người đi nói)', 'Xin lỗi'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "물 주세요.", langCode: "ko-KR", question: 'Muốn gì?', options: ['Cơm', 'Nước', 'Rượu', 'Kim chi'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '“학교” (Hakgyo) nghĩa là?', options: ['Bệnh viện', 'Trường học', 'Nhà', 'Công ty'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '어디에 ___? (Đi đâu)', options: ['가요', '봐요', '사요', '먹어요'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“감사합니다” dùng khi nào?', options: ['Xin lỗi', 'Cảm ơn', 'Chào hỏi', 'Ngủ'], correct: 1 },
            { type: 'choice', category: 'NUMBERS', question: 'Số 2 (Hán Hàn)?', options: ['일', '이', '삼', '사'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "이름이 뭐예요?", langCode: "ko-KR", question: 'Hỏi về?', options: ['Tên', 'Tuổi', 'Nghề nghiệp', 'Quốc tịch'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Mẹ" (Eomma).', correctAnswer: '엄마', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '무엇을 ___? (Làm gì)', options: ['해요', '가요', '와요', '자요'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“친구” (Chingu) là ai?', options: ['Bạn bè', 'Gia đình', 'Thầy giáo', 'Bác sĩ'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '밥을 ___ (Ăn).', options: ['먹어요', '마셔요', '읽어요', '들어요'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "사랑해요.", langCode: "ko-KR", question: 'Cảm xúc?', options: ['Ghét', 'Yêu', 'Sợ', 'Buồn'], correct: 1 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: 'Tiểu từ chủ ngữ là?', options: ['은/는', '이/가', '을/를', '에/에서'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '밥을 ___ (Ăn - Quá khứ).', options: ['먹어요', '먹었습니다', '먹을 거예요', '먹고'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '친구를 ___ (Gặp).', options: ['만납니다', '마십니다', '봅니다', '갑니다'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 씁니다. (Vì...nên)', options: ['오고', '와서', '오지만', '오면'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '병원에 ___ (Đi đến bệnh viện).', options: ['가요', '봐요', '사요', '입어요'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '영화를 ___ 싶어요. (Muốn)', options: ['보고', '보', '봐', '봅'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết đuôi câu kính trọng của "하다" -> "합..."', correctAnswer: '니다', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Điền từ: "Hàn..." (Quốc - Hanguk)', correctAnswer: '국', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "어디 아프세요?", langCode: "ko-KR", question: 'Địa điểm?', options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Công viên'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "몇 시에 만날까요?", langCode: "ko-KR", question: 'Hỏi về?', options: ['Địa điểm', 'Thời gian', 'Giá tiền', 'Phương tiện'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '제주도에 ___ 적이 있어요. (Đã từng)', options: ['가 본', '가는', '갈', '가서'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '시험에 ___ 기분이 좋아요. (Đỗ)', options: ['합격해서', '떨어져서', '실패해서', '공부해서'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '밥을 먹는 ___ 전화를 받았어요. (Trong khi)', options: ['동안', '후에', '전에', '때'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "맛있게 드세요.", langCode: "ko-KR", question: 'Khi nào nói?', options: ['Trước khi ăn', 'Sau khi ăn', 'Khi ngủ', 'Khi đi làm'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '주말에 보통 ___ 해요? (Làm gì)', options: ['무엇을', '어디를', '누구를', '언제를'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '날씨가 ___ 같아요. (Có vẻ lạnh)', options: ['추울 것', '춥', '추운', '추워서'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '매일 운동을 ___ 건강해져요. (Nếu)', options: ['하면', '해서', '하고', '하지만'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Quá khứ của "가다" (đã đi) -> "갔..."', correctAnswer: '어요', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '한국어를 ___ 어렵지 않아요. (Học thì)', options: ['배우면', '배워서', '배우고', '배우지만'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "조금 깎아 주세요.", langCode: "ko-KR", question: 'Hành động?', options: ['Mua hàng/Mặc cả', 'Hỏi đường', 'Chào hỏi', 'Cảm ơn'], correct: 0 }
        ],
        hard: [
            { type: 'choice', category: 'GRAMMAR', question: '비가 ___ 우산을 썼어요.', options: ['와서', '오면', '오지만', '오려고'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '한국에 ___ 적이 있어요. (Đã từng)', options: ['가 본', '가는', '갈', '가서'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '회의가 ___되었습니다. (Bị hủy)', options: ['취소', '시작', '계속', '예약'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '아무리 ___ 성공할 수 없어요. (Dù cố gắng)', options: ['노력해도', '노력해서', '노력하면', '노력하고'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '환경 ___을 해야 합니다. (Bảo vệ)', options: ['보호', '오염', '개발', '파괴'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '친구가 올 ___ 기다렸어요. (Đến khi)', options: ['때까지', '때문에', '때', '면서'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết: "Cảm ơn" (Gomawo - Bạn bè)', correctAnswer: '고마워', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Thủ đô Hàn Quốc: "Seo..."', correctAnswer: '울', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "잠시만 기다려 주십시오.", langCode: "ko-KR", question: 'Yêu cầu?', options: ['Đi ngay', 'Chờ một chút', 'Nói to lên', 'Im lặng'], correct: 1 },
            { type: 'listening', category: 'LISTENING', audioScript: "전화번호를 잘못 누르셨습니다.", langCode: "ko-KR", question: 'Vấn đề?', options: ['Nhầm số', 'Hết pin', 'Mất sóng', 'Hỏng máy'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "제 생각에는 반대입니다.", langCode: "ko-KR", question: 'Ý kiến?', options: ['Đồng ý', 'Phản đối', 'Không biết', 'Thắc mắc'], correct: 1 },
            { type: 'choice', category: 'GRAMMAR', question: '그 사람은 알면 ___ 좋은 사람이에요. (Càng...càng)', options: ['알수록', '알니까', '알지만', '알려고'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '스트레스를 ___ 합니다. (Giải tỏa)', options: ['해소해야', '받아야', '주어야', '쌓아야'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '비가 올 ___ 우산을 가져가세요. (Phòng khi)', options: ['까 봐', '줄 알았다', '수 있다', '지 모른다'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '경제 ___이 중요합니다. (Phát triển)', options: ['발전', '발생', '발견', '발명'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '공부하___ 잠이 들었어요. (Đang...thì)', options: ['다가', '면서', '자마자', '고'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Kính ngữ của "Ăn" (Meokda) -> "Deu..."', correctAnswer: 'sida', options: [] }, // Deusida
            { type: 'listening', category: 'LISTENING', audioScript: "성격이 활발한 편이에요.", langCode: "ko-KR", question: 'Tính cách?', options: ['Hoạt bát', 'Trầm tính', 'Nóng nảy', 'Lười biếng'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '바쁘실 ___ 참석해 주셔서 감사합니다. (Tuy...nhưng)', options: ['텐데', '테니까', '테지만', '텐데요'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '문제를 ___ 해결해야 합니다. (Tích cực)', options: ['적극적으로', '소극적으로', '부정적으로', '개인적으로'], correct: 0 }
        ]
    },

    // 4. TIẾNG ĐỨC (Goethe Zertifikat)
    de: {
        easy: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich ___ aus Vietnam.', options: ['komme', 'kommt', 'kommen', 'kam'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: '“Guten Morgen” nghĩa là?', options: ['Chào buổi sáng', 'Chào buổi tối', 'Chúc ngủ ngon', 'Tạm biệt'], correct: 0 },
             { type: 'choice', category: 'NUMBERS', question: 'Eins, Zwei, ___', options: ['Drei', 'Vier', 'Fünf', 'Sechs'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Das ist ___ Auto.', options: ['ein', 'eine', 'einen', 'einer'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wasser ist ___.', options: ['Blau', 'Rot', 'Gelb', 'Grün'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Er ___ Fußball.', options: ['spielt', 'spielen', 'spiele', 'spielst'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Ja oder ___ (Yes or No)', correctAnswer: 'nein', options: [] },
             { type: 'writing', category: 'WRITING', question: 'Danke ___ (Thank you very much)', correctAnswer: 'schon', options: [] },
             { type: 'listening', category: 'LISTENING', audioScript: "Mein Name ist Lisa.", langCode: "de-DE", question: 'Tên cô ấy?', options: ['Lisa', 'Lena', 'Laura', 'Lara'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Auf Wiedersehen!", langCode: "de-DE", question: 'Ý nghĩa?', options: ['Xin chào', 'Hẹn gặp lại', 'Xin lỗi', 'Cảm ơn'], correct: 1 },
             { type: 'choice', category: 'GRAMMAR', question: 'Wir ___ Deutsch.', options: ['lernen', 'lernt', 'lernst', 'lerne'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Der Apfel ist ___. (Đỏ)', options: ['rot', 'blau', 'grün', 'gelb'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Hast du ___ Bruder?', options: ['einen', 'ein', 'eine', 'einem'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: '“Mutter” nghĩa là?', options: ['Mẹ', 'Bố', 'Anh', 'Chị'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Ich wohne in Berlin.", langCode: "de-DE", question: 'Sống ở đâu?', options: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Số 10 trong tiếng Đức?', correctAnswer: 'zehn', options: [] },
             { type: 'choice', category: 'GRAMMAR', question: 'Sie ___ sehr nett.', options: ['ist', 'sind', 'seid', 'bin'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: '“Hund” là con gì?', options: ['Chó', 'Mèo', 'Chim', 'Cá'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Ich trinke ___ Kaffee.', options: ['keinen', 'kein', 'keine', 'nicht'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Wie geht es dir?", langCode: "de-DE", question: 'Hỏi về?', options: ['Sức khỏe', 'Tên', 'Tuổi', 'Nghề'], correct: 0 }
        ],
        medium: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich habe das Buch ___. (đã đọc)', options: ['gelesen', 'lese', 'liest', 'las'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wir fahren mit dem ___. (Tàu hỏa)', options: ['Zug', 'Auto', 'Flugzeug', 'Fahrrad'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Weil es regnet, ___ ich zu Hause.', options: ['bleibe', 'bleiben', 'geblieben', 'bleibst'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Ich gehe zum ___. (Bác sĩ)', options: ['Arzt', 'Lehrer', 'Bäcker', 'Fahrer'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Das ist der Mann, ___ ich gesehen habe.', options: ['den', 'der', 'dem', 'des'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Ich möchte ein Konto ___.', options: ['eröffnen', 'machen', 'tun', 'schließen'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Thủ đô Đức: B...', correctAnswer: 'berlin', options: [] },
             { type: 'writing', category: 'WRITING', question: 'Viết số 100 (Hundert)', correctAnswer: 'hundert', options: [] },
             { type: 'listening', category: 'LISTENING', audioScript: "Ein Bier, bitte.", langCode: "de-DE", question: 'Đang ở đâu?', options: ['Quán bar/nhà hàng', 'Trường học', 'Bệnh viện', 'Nhà thờ'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Wie spät ist es?", langCode: "de-DE", question: 'Hỏi về?', options: ['Giờ', 'Tiền', 'Tuổi', 'Tên'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Wenn ich Zeit habe, ___ ich dich.', options: ['besuche', 'besuchen', 'besucht', 'besuchst'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Kannst du mir helfen? Ich habe ein ___.', options: ['Problem', 'Glück', 'Spaß', 'Witz'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Ich interessiere mich ___ Musik.', options: ['für', 'über', 'an', 'auf'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Der Zug hat ___ . (Trễ)', options: ['Verspätung', 'Pünktlichkeit', 'Zeit', 'Pause'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Ich hätte gern das Menü.", langCode: "de-DE", question: 'Muốn gì?', options: ['Thực đơn', 'Thanh toán', 'Nước', 'Bàn'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Viết "Cảm ơn" (Danke).', correctAnswer: 'danke', options: [] },
             { type: 'choice', category: 'GRAMMAR', question: 'Obwohl er krank ist, ___ er zur Arbeit.', options: ['geht', 'gehen', 'ging', 'gegangen'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Am Wochenende gehe ich ins ___ .', options: ['Kino', 'Arbeit', 'Schule', 'Büro'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Das Auto, ___ dort steht, ist neu.', options: ['das', 'der', 'die', 'den'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Entschuldigung, wo ist der Bahnhof?", langCode: "de-DE", question: 'Tìm gì?', options: ['Nhà ga', 'Sân bay', 'Khách sạn', 'Bưu điện'], correct: 0 }
        ],
        hard: [
             { type: 'choice', category: 'GRAMMAR', question: 'Ich habe ___ meinen Schlüssel vergessen.', options: ['schon wieder', 'erst', 'bereits', 'damals'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Hätte ich Zeit, ___ ich kommen.', options: ['würde', 'werde', 'wurde', 'wird'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wir müssen eine Entscheidung ___.', options: ['treffen', 'machen', 'tun', 'nehmen'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Je mehr man lernt, ___ mehr weiß man.', options: ['desto', 'umso', 'so', 'dann'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Er wurde auf frischer ___ ertappt.', options: ['Tat', 'Hand', 'Fuß', 'Weg'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Es lohnt sich nicht, darüber ___ streiten.', options: ['zu', 'um', 'über', 'mit'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Từ trái nghĩa của "Schnell" (Nhanh) là "L..."', correctAnswer: 'langsam', options: [] },
             { type: 'writing', category: 'WRITING', question: 'Viết từ: "Bệnh viện" (Kranken...)', correctAnswer: 'haus', options: [] },
             { type: 'listening', category: 'LISTENING', audioScript: "Die Sitzung wurde verschoben.", langCode: "de-DE", question: 'Tình trạng cuộc họp?', options: ['Bị hoãn', 'Đang diễn ra', 'Kết thúc', 'Hủy bỏ'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Ich drücke dir die Daumen.", langCode: "de-DE", question: 'Ý nghĩa?', options: ['Chúc may mắn', 'Đừng lo', 'Cố lên', 'Tạm biệt'], correct: 0 },
             { type: 'listening', category: 'LISTENING', audioScript: "Das kommt nicht in Frage.", langCode: "de-DE", question: 'Thái độ?', options: ['Từ chối dứt khoát', 'Đồng ý', 'Xem xét', 'Có thể'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Er hat den Nagel auf den ___ getroffen.', options: ['Kopf', 'Fuß', 'Hand', 'Wand'], correct: 0 }, // Idiom
             { type: 'choice', category: 'GRAMMAR', question: 'Indem man viel liest, ___ man seinen Wortschatz.', options: ['erweitert', 'erweitern', 'erweiterte', 'erweiterten'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Diese Maßnahme ist völlig ___ . (Vô nghĩa)', options: ['sinnlos', 'sinnvoll', 'sinnlich', 'gesinnt'], correct: 0 },
             { type: 'choice', category: 'GRAMMAR', question: 'Kaum hatte er das Haus verlassen, ___ es zu regnen an.', options: ['fing', 'fang', 'fangen', 'fängt'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Wir müssen den Gürtel enger ___ . (Tiết kiệm)', options: ['schnallen', 'binden', 'machen', 'ziehen'], correct: 0 },
             { type: 'writing', category: 'WRITING', question: 'Danh từ của "Frei" (Tự do) là "Frei..."', correctAnswer: 'heit', options: [] },
             { type: 'choice', category: 'GRAMMAR', question: 'Er tut so, als ob er alles ___ .', options: ['wüsste', 'weiß', 'gewusst', 'wissen'], correct: 0 }, // Konjunktiv II
             { type: 'listening', category: 'LISTENING', audioScript: "Ich bin fix und fertig.", langCode: "de-DE", question: 'Cảm giác?', options: ['Kiệt sức', 'Vui vẻ', 'Hào hứng', 'Buồn chán'], correct: 0 },
             { type: 'choice', category: 'VOCABULARY', question: 'Das Projekt steckt noch in den ___ . (Giai đoạn đầu)', options: ['Kinderschuhen', 'Anfang', 'Start', 'Beginn'], correct: 0 }
        ]
    },

    // 5. TIẾNG NHẬT (JLPT Standard)
    jp: {
        easy: [
            { type: 'choice', category: 'GREETING', question: 'Konnichiwa (こんにちは) nghĩa là?', options: ['Chào buổi trưa', 'Chào buổi sáng', 'Chào buổi tối', 'Tạm biệt'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Watashi (私) nghĩa là?', options: ['Tôi', 'Bạn', 'Anh ấy', 'Cô ấy'], correct: 0 },
            { type: 'choice', category: 'NUMBERS', question: 'Ichi, Ni, ___', options: ['San', 'Yon', 'Go', 'Roku'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Kore ___ pen desu. (Đây LÀ bút)', options: ['wa', 'ga', 'wo', 'ni'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Neko (猫) là con gì?', options: ['Mèo', 'Chó', 'Cá', 'Chim'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Gakkou ___ ikimasu. (Đi ĐẾN trường)', options: ['e', 'ni', 'de', 'wo'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Arigatou nghĩa là "Cảm..."', correctAnswer: 'on', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Viết số 4 (Yon/Shi) bằng Romaji.', correctAnswer: 'yon', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "Ohayou Gozaimasu.", langCode: "ja-JP", question: 'Khi nào nói?', options: ['Buổi sáng', 'Buổi trưa', 'Buổi tối', 'Khi đi ngủ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Sumimasen.", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Xin lỗi/Xin hỏi', 'Cảm ơn', 'Tạm biệt', 'Chúc mừng'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Inu (犬) là con gì?', options: ['Chó', 'Mèo', 'Lợn', 'Gà'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Kore wa ___ desu ka? (Cái GÌ)', options: ['nan', 'doko', 'dare', 'itsu'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“Sensei” (先生) là ai?', options: ['Giáo viên', 'Học sinh', 'Bác sĩ', 'Nhân viên'], correct: 0 },
            { type: 'choice', category: 'NUMBERS', question: 'Số 10 tiếng Nhật?', options: ['Jyuu', 'Kyuu', 'Hachi', 'Nana'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Sayounara.", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Sách" (Hon).', correctAnswer: 'hon', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: 'Watashi ___ gakusei desu. (Cũng)', options: ['mo', 'wa', 'ga', 'no'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“Ashita” (明日) là khi nào?', options: ['Ngày mai', 'Hôm qua', 'Hôm nay', 'Năm sau'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Doko ___ desu ka? (Ở đâu)', options: ['ni', 'e', 'de', 'wa'], correct: 2 }, 
            { type: 'listening', category: 'LISTENING', audioScript: "Oyasuminasai.", langCode: "ja-JP", question: 'Khi nào nói?', options: ['Chúc ngủ ngon', 'Chào buổi sáng', 'Chào buổi tối', 'Tạm biệt'], correct: 0 }
        ],
        medium: [
            { type: 'choice', category: 'GRAMMAR', question: 'Gohan wo ___ kudasai. (Hãy ăn cơm)', options: ['tabete', 'taberu', 'tabeta', 'tabemasu'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Ashita (明日) là khi nào?', options: ['Ngày mai', 'Hôm qua', 'Hôm nay', 'Năm ngoái'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Eiga wo ___ koto ga arimasu. (Đã từng xem)', options: ['mita', 'miru', 'mite', 'minai'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Sensei (先生) là ai?', options: ['Giáo viên', 'Học sinh', 'Bác sĩ', 'Nhân viên'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Ame ga ___ sou desu. (Có vẻ sắp mưa)', options: ['furi', 'furu', 'futte', 'futta'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'Oishii (おいしい) nghĩa là?', options: ['Ngon', 'Dở', 'Đắt', 'Rẻ'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Sakura" (Hoa anh đào).', correctAnswer: 'sakura', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Sayounara nghĩa là "Tạm..."', correctAnswer: 'biet', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "Wakarimashita.", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Đã hiểu', 'Không hiểu', 'Đã quên', 'Không biết'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Kore wa ikura desu ka?", langCode: "ja-JP", question: 'Hỏi về?', options: ['Giá tiền', 'Thời gian', 'Địa điểm', 'Người'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Mado wo ___ kudasai. (Hãy mở)', options: ['akete', 'akeru', 'aketa', 'akemasu'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“Yasumi” (休み) nghĩa là?', options: ['Nghỉ ngơi', 'Làm việc', 'Học tập', 'Du lịch'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Nihongo ga ___ desu. (Giỏi)', options: ['jouzu', 'heta', 'suki', 'kirai'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“Tomodachi” (友達) là ai?', options: ['Bạn bè', 'Gia đình', 'Người yêu', 'Đồng nghiệp'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Mou ichido onegaishimasu.", langCode: "ja-JP", question: 'Yêu cầu?', options: ['Nhắc lại lần nữa', 'Nói chậm lại', 'Viết ra', 'Đi chỗ khác'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Viết "Núi" (Yama).', correctAnswer: 'yama', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: 'Mainichi 7-ji ni ___ . (Thức dậy)', options: ['okimasu', 'okite', 'okita', 'okiru'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: 'Kono hon wa ___ desu. (Thú vị)', options: ['omoshiroi', 'tsumaranai', 'muzukashii', 'yasashii'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "Daijoubu desu.", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Không sao/Ổn', 'Có vấn đề', 'Không được', 'Nguy hiểm'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '“Eki” (駅) là gì?', options: ['Nhà ga', 'Sân bay', 'Bến xe', 'Cảng'], correct: 0 }
        ],
        hard: [
            { type: 'choice', category: 'GRAMMAR', question: 'この本は読み___です。', options: ['やすい', 'にくい', 'たい', 'すぎ'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '行け___よかったです。 (Nếu đi thì tốt rồi)', options: ['ba', 'tara', 'nara', 'te'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '彼に連絡を___。 (Giữ liên lạc)', options: ['とる', 'やる', 'する', 'いく'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '日本語を勉強すれば___ほど難しいです。 (Càng...càng)', options: ['suru', 'sureba', 'shite', 'shita'], correct: 1 },
            { type: 'choice', category: 'VOCABULARY', question: '会議の準備が___しました。 (Hoàn thành)', options: ['完了', '完成', '完全', '完結'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '雨にも___、風にも負けず。 (Dù mưa...dù gió)', options: ['makezu', 'makete', 'makenai', 'make'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Thủ đô Nhật Bản (Tokyo).', correctAnswer: 'tokyo', options: [] },
            { type: 'writing', category: 'WRITING', question: 'Núi Phú Sĩ (Fuji...)', correctAnswer: 'san', options: [] },
            { type: 'listening', category: 'LISTENING', audioScript: "お世話になります。", langCode: "ja-JP", question: 'Khi nào dùng?', options: ['Cảm ơn sự giúp đỡ', 'Khi tức giận', 'Khi đi ngủ', 'Khi ăn cơm'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "ご検討ください。", langCode: "ja-JP", question: 'Yêu cầu gì?', options: ['Xem xét', 'Hủy bỏ', 'Đồng ý ngay', 'Từ chối'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "仕方がない。", langCode: "ja-JP", question: 'Thái độ?', options: ['Đành chịu thôi (Bó tay)', 'Rất vui', 'Rất buồn', 'Tức giận'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '努力した___、試験に合格した。 (Nhờ...)', options: ['かいがあって', 'せいで', 'おかげで', 'ために'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: '彼の態度は___できない。 (Không thể hiểu nổi)', options: ['理解', '解決', '説明', '納得'], correct: 3 }, 
            { type: 'choice', category: 'GRAMMAR', question: '行く___行かない___、連絡してください。 (Dù đi hay không)', options: ['にしろ...にしろ', 'とか...とか', 'やら...やら', 'だの...だの'], correct: 0 },
            { type: 'choice', category: 'VOCABULARY', question: 'この機会を___利用すべきだ。 (Tận dụng)', options: ['有効', '有利', '有益', '有名'], correct: 0 },
            { type: 'writing', category: 'WRITING', question: 'Thành ngữ: "Nhất kỳ nhất..." (Ichi-go Ichi-e)', correctAnswer: 'e', options: [] },
            { type: 'choice', category: 'GRAMMAR', question: '彼は来る___ない。 (Chắc chắn không)', options: ['はずが', 'わけが', 'ことが', 'ものが'], correct: 0 },
            { type: 'listening', category: 'LISTENING', audioScript: "申し訳ございません。", langCode: "ja-JP", question: 'Ý nghĩa?', options: ['Xin lỗi (Trang trọng)', 'Cảm ơn', 'Chúc mừng', 'Tạm biệt'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '日本人___、漢字が書けるとは限らない。', options: ['だからといって', 'ながら', 'ものの', 'うえに'], correct: 0 },
            { type: 'choice', category: 'GRAMMAR', question: '子供___、そんなことはわからない。', options: ['ならでは', 'なりに', 'にしては', 'ともなると'], correct: 2 }
        ]
    }
};

// ============================================================
// --- PHẦN LOGIC BẮT BUỘC ---
// ============================================================

// Biến chứa câu hỏi hiện tại
let questions = []; 

// Hàm trộn mảng (Shuffle)
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// HÀM QUAN TRỌNG: Lấy câu hỏi theo Ngôn ngữ & Cấp độ
function setQuestionsByLanguageAndLevel(langCode, level) {
    if (questionsData[langCode] && questionsData[langCode][level]) {
        let originalQuestions = questionsData[langCode][level];
        
        if (originalQuestions.length === 0) {
            console.warn(`Chưa có dữ liệu cho ${langCode} - ${level}`);
            alert("Dữ liệu đang cập nhật, vui lòng chọn ngôn ngữ/cấp độ khác!");
            return false;
        }

        // Tạo bản sao để không làm hỏng dữ liệu gốc
        let pool = [...originalQuestions];
        
        // Trộn câu hỏi ngẫu nhiên
        pool = shuffleArray(pool);

        // Lấy số lượng câu hỏi theo config (Mặc định 15 câu)
        const limit = defaultConfig.questions_per_turn || 15;
        questions = pool.slice(0, limit);

        console.log(`Đã tải thành công ${questions.length} câu hỏi (${langCode}-${level})`);
        return true;
    }
    
    console.error(`Không tìm thấy dữ liệu cho: ${langCode} -> ${level}`);
    return false;
}

// Dữ liệu phần thưởng
const prizes = [
    { name: 'Giảm 10% Phí Tư Vấn', color: '#FF6B6B', emoji: '💰' },
    { name: 'Sách Cẩm Nang Du Học', color: '#4ECDC4', emoji: '📚' },
    { name: 'Voucher Hồ Sơ $20', color: '#FFD93D', emoji: '🎫' },
    { name: 'Gói Tư Vấn Cao Cấp', color: '#95E1D3', emoji: '⭐' },
    { name: 'Cẩm Nang Chọn Trường', color: '#F38181', emoji: '🎓' },
    { name: 'Ưu Đãi Làm Visa', color: '#AA96DA', emoji: '✈️' },
    { name: 'Voucher Tài Liệu $50', color: '#FCBAD3', emoji: '🎁' },
    { name: 'Tư Vấn 1-1 Hướng Nghiệp', color: '#A8D8EA', emoji: '💼' }
];

const answerColors = [
    'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
];

const answerEmojis = ['A', 'B', 'C', 'D'];