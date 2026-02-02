const defaultConfig = {
    quiz_title: 'Kiểm Tra Trình Độ Ngôn Ngữ',
    quiz_subtitle: 'Chọn ngôn ngữ và thử thách bản thân ngay!',
    start_button_text: 'Bắt Đầu Ngay 🚀',
    consent_text: 'Tôi đồng ý cung cấp số điện thoại để được tư vấn qua Zalo Mini App',
    congratulations_text: 'Chúc mừng! Bạn đã mở khóa vòng quay may mắn!',
    background_color: '#1e3a8a',
    card_color: '#ffffff',
    text_color: '#1f2937',
    primary_action_color: '#3b82f6',
    font_family: 'Poppins'
};

// Dữ liệu câu hỏi cho từng ngôn ngữ
const questionsData = {
    // 1. TIẾNG ANH (EN)
    en: [
      { question: 'What is your name?', options: ['My name is John.', 'I am fine.', 'I am 18 years old.', 'I live in Hanoi.'], correct: 0, category: 'Basic English' },
      { question: 'How are you today?', options: ['I am a student.', 'I am fine, thank you.', 'My name is Anna.', 'I like music.'], correct: 1, category: 'Basic English' },
      { question: 'Where are you from?', options: ['I am from Vietnam.', 'I am 20 years old.', 'I am a teacher.', 'I like coffee.'], correct: 0, category: 'Basic English' },
      { question: 'How old are you?', options: ['I am a student.', 'I am from Vietnam.', 'I am 18 years old.', 'I like English.'], correct: 2, category: 'Basic English' },
      { question: 'What do you do?', options: ['I am fine.', 'I am a student.', 'I am from Hanoi.', 'I am 18.'], correct: 1, category: 'Basic English' },
      { question: 'What time is it?', options: ['It is Monday.', 'It is sunny.', 'It is 7 o’clock.', 'It is near here.'], correct: 2, category: 'Basic English' },
      { question: 'Which one is a fruit?', options: ['Carrot', 'Apple', 'Potato', 'Onion'], correct: 1, category: 'Vocabulary' },
      { question: 'Choose the correct sentence.', options: ['She go to school.', 'She goes to school.', 'She going to school.', 'She gone to school.'], correct: 1, category: 'Grammar' },
      { question: 'I ___ coffee every morning.', options: ['drink', 'drinks', 'drank', 'drinking'], correct: 0, category: 'Grammar' },
      { question: 'They ___ playing football now.', options: ['is', 'are', 'was', 'be'], correct: 1, category: 'Grammar' },
      { question: 'Which word is a color?', options: ['Blue', 'Dog', 'Table', 'Run'], correct: 0, category: 'Vocabulary' },
      { question: 'What does “happy” mean?', options: ['Sad', 'Angry', 'Glad', 'Tired'], correct: 2, category: 'Vocabulary' },
      { question: 'How do you say “Xin chào” in English?', options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], correct: 1, category: 'Vocabulary' },
      { question: 'What is the plural of “child”?', options: ['Childs', 'Childes', 'Children', 'Child'], correct: 2, category: 'Grammar' },
      { question: 'She ___ to music every night.', options: ['listen', 'listens', 'listening', 'listened'], correct: 1, category: 'Grammar' },
      { question: 'Which sentence is correct?', options: ['I has a book.', 'I have a book.', 'I having a book.', 'I had have a book.'], correct: 1, category: 'Grammar' },
      { question: 'What is the opposite of “big”?', options: ['Tall', 'Long', 'Small', 'Wide'], correct: 2, category: 'Vocabulary' },
      { question: 'Where is the cat? – It is ___ the table.', options: ['in', 'on', 'at', 'to'], correct: 1, category: 'Grammar' },
      { question: 'How many days are there in a week?', options: ['Five', 'Six', 'Seven', 'Eight'], correct: 2, category: 'Basic English' },
      { question: 'Choose the correct greeting.', options: ['Good night (9 AM)', 'Good morning (8 AM)', 'Good evening (7 AM)', 'Goodbye (hello)'], correct: 1, category: 'Basic English' }
    ],

    // 2. TIẾNG TRUNG (ZH)
    zh: [
      { question: '“你好” (Nǐ hǎo) nghĩa là gì?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 1, category: 'Giao tiếp' },
      { question: 'Số 1 trong tiếng Trung là gì?', options: ['二 (Èr)', '三 (Sān)', '一 (Yī)', '四 (Sì)'], correct: 2, category: 'Số đếm' },
      { question: '“谢谢” (Xièxiè) nghĩa là gì?', options: ['Cảm ơn', 'Xin chào', 'Không có chi', 'Tạm biệt'], correct: 0, category: 'Giao tiếp' },
      { question: '“我是学生” (Wǒ shì xuéshēng) nghĩa là gì?', options: ['Tôi là giáo viên', 'Tôi là học sinh', 'Tôi là bác sĩ', 'Tôi là nhân viên'], correct: 1, category: 'Ngữ pháp' },
      { question: 'Từ nào nghĩa là "Mẹ"?', options: ['爸爸 (Bàba)', '妈妈 (Māma)', '哥哥 (Gēge)', '姐姐 (Jiějie)'], correct: 1, category: 'Gia đình' },
      { question: '“再见” (Zàijiàn) dùng khi nào?', options: ['Khi gặp mặt', 'Khi ăn cơm', 'Khi tạm biệt', 'Khi đi ngủ'], correct: 2, category: 'Giao tiếp' },
      { question: '“中国” (Zhōngguó) là nước nào?', options: ['Việt Nam', 'Trung Quốc', 'Hàn Quốc', 'Nhật Bản'], correct: 1, category: 'Từ vựng' },
      { question: '“喝水” (Hē shuǐ) nghĩa là gì?', options: ['Ăn cơm', 'Uống nước', 'Đi chơi', 'Ngủ'], correct: 1, category: 'Động từ' },
      { question: 'Câu hỏi "Bạn tên gì?" nói thế nào?', options: ['你叫什么名字？', '你是哪国人？', '几点了？', '你好吗？'], correct: 0, category: 'Giao tiếp' },
      { question: '“苹果” (Píngguǒ) là quả gì?', options: ['Cam', 'Chuối', 'Táo', 'Nho'], correct: 2, category: 'Từ vựng' },
      { question: '“今天” (Jīntiān) là khi nào?', options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Tuần sau'], correct: 1, category: 'Thời gian' },
      { question: 'Số 10 viết thế nào?', options: ['八', '九', '十', '七'], correct: 2, category: 'Số đếm' },
      { question: '“喜欢” (Xǐhuān) nghĩa là gì?', options: ['Ghét', 'Thích', 'Yêu', 'Biết'], correct: 1, category: 'Động từ' },
      { question: '“大” (Dà) nghĩa là gì?', options: ['To/Lớn', 'Nhỏ/Bé', 'Dài', 'Ngắn'], correct: 0, category: 'Tính từ' },
      { question: '“书” (Shū) là đồ vật gì?', options: ['Bút', 'Vở', 'Sách', 'Bàn'], correct: 2, category: 'Đồ vật' },
      { question: '“多少钱?” (Duōshǎo qián?) dùng để hỏi gì?', options: ['Hỏi đường', 'Hỏi tuổi', 'Hỏi giá tiền', 'Hỏi giờ'], correct: 2, category: 'Mua sắm' },
      { question: '“好” (Hǎo) nghĩa là gì?', options: ['Xấu', 'Tốt/Được', 'Sai', 'Buồn'], correct: 1, category: 'Tính từ' },
      { question: '“不” (Bù) dùng để làm gì?', options: ['Đồng ý', 'Phủ định (Không)', 'Khen ngợi', 'Chào hỏi'], correct: 1, category: 'Ngữ pháp' },
      { question: '“老师” (Lǎoshī) là ai?', options: ['Học sinh', 'Giáo viên', 'Hiệu trưởng', 'Bảo vệ'], correct: 1, category: 'Nghề nghiệp' },
      { question: '“米饭” (Mǐfàn) là món gì?', options: ['Mì', 'Bánh bao', 'Cơm trắng', 'Phở'], correct: 2, category: 'Ẩm thực' }
    ],

    // 3. TIẾNG HÀN (KR)
    kr: [
      { question: '“안녕하세요” (Annyeonghaseyo) nghĩa là gì?', options: ['Xin lỗi', 'Cảm ơn', 'Xin chào', 'Tạm biệt'], correct: 2, category: 'Giao tiếp' },
      { question: '“감사합니다” (Gamsahamnida) dùng khi nào?', options: ['Khi xin lỗi', 'Khi cảm ơn', 'Khi chào hỏi', 'Khi đi ngủ'], correct: 1, category: 'Giao tiếp' },
      { question: 'Từ nào nghĩa là "Tôi" (lịch sự)?', options: ['나 (Na)', '저 (Jeo)', '너 (Neo)', '우리 (Uri)'], correct: 1, category: 'Đại từ' },
      { question: '“학교” (Hakgyo) nghĩa là gì?', options: ['Bệnh viện', 'Trường học', 'Nhà hàng', 'Công ty'], correct: 1, category: 'Địa điểm' },
      { question: 'Số 1 trong hệ số Hán Hàn là?', options: ['일 (Il)', '이 (I)', '삼 (Sam)', '사 (Sa)'], correct: 0, category: 'Số đếm' },
      { question: '“사랑해요” (Saranghaeyo) nghĩa là gì?', options: ['Tôi ghét bạn', 'Tôi yêu bạn', 'Tôi đói', 'Tôi mệt'], correct: 1, category: 'Cảm xúc' },
      { question: '“김치” (Kimchi) là món gì?', options: ['Cơm cuộn', 'Bánh gạo', 'Kim chi', 'Mì lạnh'], correct: 2, category: 'Ẩm thực' },
      { question: '“엄마” (Eomma) nghĩa là gì?', options: ['Bố', 'Mẹ', 'Anh', 'Chị'], correct: 1, category: 'Gia đình' },
      { question: '“네” (Ne) nghĩa là gì?', options: ['Vâng/Đúng', 'Không', 'Có lẽ', 'Tại sao'], correct: 0, category: 'Giao tiếp' },
      { question: '“물” (Mul) là gì?', options: ['Cơm', 'Nước', 'Rượu', 'Trà'], correct: 1, category: 'Đồ uống' },
      { question: '“이름이 뭐예요?” nghĩa là gì?', options: ['Bạn bao nhiêu tuổi?', 'Bạn tên là gì?', 'Bạn đi đâu?', 'Bạn làm nghề gì?'], correct: 1, category: 'Giao tiếp' },
      { question: '“친구” (Chingu) là ai?', options: ['Kẻ thù', 'Bạn bè', 'Người yêu', 'Gia đình'], correct: 1, category: 'Mối quan hệ' },
      { question: '“가다” (Gada) là động từ gì?', options: ['Đi', 'Đến', 'Ăn', 'Ngủ'], correct: 0, category: 'Động từ' },
      { question: '“집” (Jip) nghĩa là gì?', options: ['Trường', 'Nhà', 'Phòng', 'Cửa hàng'], correct: 1, category: 'Địa điểm' },
      { question: '“맛있어요” (Masisseoyo) nghĩa là gì?', options: ['Không ngon', 'Ngon', 'Cay', 'Ngọt'], correct: 1, category: 'Cảm nhận' },
      { question: '“한국” (Hanguk) là nước nào?', options: ['Trung Quốc', 'Nhật Bản', 'Hàn Quốc', 'Việt Nam'], correct: 2, category: 'Quốc gia' },
      { question: '“선생님” (Seonsaengnim) là nghề gì?', options: ['Bác sĩ', 'Giáo viên', 'Ca sĩ', 'Diễn viên'], correct: 1, category: 'Nghề nghiệp' },
      { question: '“아니요” (Aniyo) nghĩa là gì?', options: ['Vâng', 'Không', 'Được', 'Tốt'], correct: 1, category: 'Giao tiếp' },
      { question: '“오늘” (Oneul) là khi nào?', options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Bây giờ'], correct: 1, category: 'Thời gian' },
      { question: '“얼마예요?” (Eolmayeyo?) dùng để hỏi gì?', options: ['Hỏi giờ', 'Hỏi đường', 'Hỏi giá tiền', 'Hỏi tên'], correct: 2, category: 'Mua sắm' }
    ],

    // 4. TIẾNG ĐỨC (DE)
    de: [
      { question: '“Guten Morgen” nghĩa là gì?', options: ['Chào buổi tối', 'Chào buổi sáng', 'Chúc ngủ ngon', 'Xin chào'], correct: 1, category: 'Chào hỏi' },
      { question: '“Danke” nghĩa là gì?', options: ['Xin lỗi', 'Tạm biệt', 'Cảm ơn', 'Làm ơn'], correct: 2, category: 'Giao tiếp' },
      { question: 'Số 1 trong tiếng Đức là?', options: ['Eins', 'Zwei', 'Drei', 'Vier'], correct: 0, category: 'Số đếm' },
      { question: '“Ja” nghĩa là gì?', options: ['Không', 'Có/Vâng', 'Có lẽ', 'Ai'], correct: 1, category: 'Giao tiếp' },
      { question: '“Nein” nghĩa là gì?', options: ['Có', 'Không', 'Được', 'Tốt'], correct: 1, category: 'Giao tiếp' },
      { question: '“Ich heiße...” dùng để làm gì?', options: ['Hỏi tên', 'Giới thiệu tên', 'Chào hỏi', 'Tạm biệt'], correct: 1, category: 'Giới thiệu' },
      { question: '“Wasser” là gì?', options: ['Bia', 'Nước', 'Rượu', 'Sữa'], correct: 1, category: 'Đồ uống' },
      { question: '“Mutter” nghĩa là gì?', options: ['Bố', 'Mẹ', 'Anh', 'Chị'], correct: 1, category: 'Gia đình' },
      { question: '“Tschüss” dùng khi nào?', options: ['Khi gặp mặt', 'Khi tạm biệt (thân mật)', 'Khi xin lỗi', 'Khi cảm ơn'], correct: 1, category: 'Giao tiếp' },
      { question: '“Deutschland” là nước nào?', options: ['Hà Lan', 'Đức', 'Pháp', 'Áo'], correct: 1, category: 'Quốc gia' },
      { question: '“Brot” là món gì?', options: ['Xúc xích', 'Bánh mì', 'Phô mai', 'Khoai tây'], correct: 1, category: 'Ẩm thực' },
      { question: '“Katze” là con gì?', options: ['Chó', 'Mèo', 'Chim', 'Chuột'], correct: 1, category: 'Động vật' },
      { question: '“Rot” là màu gì?', options: ['Xanh', 'Đỏ', 'Vàng', 'Đen'], correct: 1, category: 'Màu sắc' },
      { question: '“Gute Nacht” nghĩa là gì?', options: ['Chào buổi trưa', 'Chúc ngủ ngon', 'Chào buổi chiều', 'Hẹn gặp lại'], correct: 1, category: 'Chào hỏi' },
      { question: '“Buch” nghĩa là gì?', options: ['Bút', 'Sách', 'Bàn', 'Ghế'], correct: 1, category: 'Đồ vật' },
      { question: '“Woher kommst du?” nghĩa là gì?', options: ['Bạn tên gì?', 'Bạn bao nhiêu tuổi?', 'Bạn đến từ đâu?', 'Bạn làm gì?'], correct: 2, category: 'Giao tiếp' },
      { question: '“Schule” nghĩa là gì?', options: ['Nhà', 'Trường học', 'Bệnh viện', 'Công viên'], correct: 1, category: 'Địa điểm' },
      { question: '“Freund” nghĩa là gì?', options: ['Bạn bè (nam)', 'Kẻ thù', 'Hàng xóm', 'Thầy giáo'], correct: 0, category: 'Mối quan hệ' },
      { question: 'Số 10 trong tiếng Đức?', options: ['Acht', 'Neun', 'Zehn', 'Elf'], correct: 2, category: 'Số đếm' },
      { question: '“Bitte” có thể nghĩa là gì?', options: ['Không có chi/Làm ơn', 'Tạm biệt', 'Xin chào', 'Chúc mừng'], correct: 0, category: 'Giao tiếp' }
    ],

    // 5. TIẾNG NHẬT (JP)
    jp: [
      { question: '“こんにちは” (Konnichiwa) nghĩa là gì?', options: ['Chào buổi sáng', 'Xin chào (buổi trưa/chiều)', 'Chào buổi tối', 'Chúc ngủ ngon'], correct: 1, category: 'Chào hỏi' },
      { question: '“ありがとう” (Arigatou) nghĩa là gì?', options: ['Xin lỗi', 'Tạm biệt', 'Cảm ơn', 'Vâng'], correct: 2, category: 'Giao tiếp' },
      { question: '“私” (Watashi) nghĩa là gì?', options: ['Bạn', 'Tôi', 'Anh ấy', 'Cô ấy'], correct: 1, category: 'Đại từ' },
      { question: 'Số 1 trong tiếng Nhật là?', options: ['一 (Ichi)', '二 (Ni)', '三 (San)', '四 (Yon)'], correct: 0, category: 'Số đếm' },
      { question: '“さようなら” (Sayounara) dùng khi nào?', options: ['Khi gặp mặt', 'Khi tạm biệt', 'Khi ăn cơm', 'Khi đi ngủ'], correct: 1, category: 'Giao tiếp' },
      { question: '“先生” (Sensei) là nghề gì?', options: ['Bác sĩ', 'Giáo viên', 'Học sinh', 'Nhân viên'], correct: 1, category: 'Nghề nghiệp' },
      { question: '“はい” (Hai) nghĩa là gì?', options: ['Không', 'Vâng/Có', 'Có lẽ', 'Tại sao'], correct: 1, category: 'Giao tiếp' },
      { question: '“猫” (Neko) là con gì?', options: ['Chó', 'Mèo', 'Cá', 'Chim'], correct: 1, category: 'Động vật' },
      { question: '“日本” (Nihon) là nước nào?', options: ['Trung Quốc', 'Hàn Quốc', 'Nhật Bản', 'Việt Nam'], correct: 2, category: 'Quốc gia' },
      { question: '“すみません” (Sumimasen) dùng để làm gì?', options: ['Cảm ơn', 'Xin lỗi/Xin hỏi', 'Chào hỏi', 'Tạm biệt'], correct: 1, category: 'Giao tiếp' },
      { question: '“本” (Hon) là đồ vật gì?', options: ['Bút', 'Sách', 'Giấy', 'Cặp'], correct: 1, category: 'Đồ vật' },
      { question: '“おいしい” (Oishii) nghĩa là gì?', options: ['Dở', 'Ngon', 'Đắt', 'Rẻ'], correct: 1, category: 'Cảm nhận' },
      { question: '“水” (Mizu) là gì?', options: ['Lửa', 'Nước', 'Gió', 'Đất'], correct: 1, category: 'Tự nhiên' },
      { question: '“何” (Nani) nghĩa là gì?', options: ['Ai', 'Cái gì', 'Ở đâu', 'Khi nào'], correct: 1, category: 'Từ để hỏi' },
      { question: '“学生” (Gakusei) là ai?', options: ['Giáo viên', 'Học sinh/Sinh viên', 'Giám đốc', 'Bác sĩ'], correct: 1, category: 'Nghề nghiệp' },
      { question: '“好き” (Suki) nghĩa là gì?', options: ['Ghét', 'Thích', 'Sợ', 'Buồn'], correct: 1, category: 'Cảm xúc' },
      { question: 'Số 5 trong tiếng Nhật?', options: ['三 (San)', '四 (Yon)', '五 (Go)', '六 (Roku)'], correct: 2, category: 'Số đếm' },
      { question: '“赤” (Aka) là màu gì?', options: ['Trắng', 'Đen', 'Đỏ', 'Xanh'], correct: 2, category: 'Màu sắc' },
      { question: '“はじめまして” (Hajimemashite) dùng khi nào?', options: ['Lần đầu gặp mặt', 'Tạm biệt', 'Xin lỗi', 'Cảm ơn'], correct: 0, category: 'Giao tiếp' },
      { question: '“桜” (Sakura) là hoa gì?', options: ['Hoa hồng', 'Hoa sen', 'Hoa anh đào', 'Hoa cúc'], correct: 2, category: 'Thiên nhiên' }
    ]
};

// Biến chứa câu hỏi hiện tại (sẽ được set động)
let questions = []; 

// Hàm set câu hỏi theo ngôn ngữ
function setQuestionsByLanguage(langCode) {
    if (questionsData[langCode]) {
        questions = questionsData[langCode];
        return true;
    }
    return false;
}

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
    'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)'
];

const answerEmojis = ['🔵', '🟢', '🟣', '🟠'];