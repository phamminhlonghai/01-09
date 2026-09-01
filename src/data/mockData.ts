import { VoiceTalent, VoiceBrief } from '../types';

export const INITIAL_TALENTS: VoiceTalent[] = [
  {
    id: 'talent-minh-anh',
    name: 'Minh Anh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    gender: 'Nữ',
    region: 'Miền Bắc',
    title: 'Voice Talent Chuyên nghiệp TVC & Thương hiệu',
    bio: 'Hơn 7 năm kinh nghiệm lồng tiếng cho các chiến dịch TVC hàng đầu như Vinamilk, Shopee, Techcombank. Chất giọng Bắc chuẩn Hà Nội, thanh lịch, ấm áp và truyền cảm hứng.',
    rating: 4.98,
    reviewCount: 142,
    completedProjects: 280,
    basePricePerMinute: 450000,
    turnaroundHours: 12,
    tags: ['Miền Bắc', 'Quảng cáo TVC', 'Podcast', 'Thanh lịch', 'Truyền cảm'],
    equipment: {
      mic: 'Neumann TLM 103',
      soundcard: 'Apollo Twin X QUAD',
      room: 'Phòng thu tiêu âm chuẩn WhisperRoom -60dB'
    },
    featuredInHero: true,
    sampleAudios: [
      {
        id: 'sample-ma-1',
        title: 'TVC Quảng cáo Sữa Vinamilk - Khởi đầu ngày mới',
        category: 'Quảng cáo TVC',
        durationSec: 15,
        tone: 'Thanh lịch, ấm áp',
        scriptSnippet: 'Khởi đầu ngày mới tràn đầy năng lượng cùng dòng sữa tươi thuần khiết từ thiên nhiên...',
        waveformData: [10, 6, 8, 4, 9, 3, 7, 10, 6, 8, 5, 7, 9, 4, 8, 6, 9, 3, 5],
        audioFrequency: 240,
        soundType: 'warm'
      },
      {
        id: 'sample-ma-2',
        title: 'Podcast Câu chuyện khởi nghiệp số #42',
        category: 'Podcast & Radio',
        durationSec: 20,
        tone: 'Trầm ấm, sâu lắng',
        scriptSnippet: 'Chào mừng các bạn đã quay trở lại với series Podcast Đổi Mới và Sáng Tạo...',
        waveformData: [5, 7, 9, 4, 8, 6, 9, 3, 5, 8, 10, 6, 4, 7, 9, 5, 6, 8, 4],
        audioFrequency: 220,
        soundType: 'soft'
      },
      {
        id: 'sample-ma-3',
        title: 'Thuyết minh Phim tài liệu Di sản Hà Nội',
        category: 'Thuyết minh Tài liệu',
        durationSec: 18,
        tone: 'Trang trọng, hoài niệm',
        scriptSnippet: 'Hà Nội mùa thu, những hàng cây cơm nguội vàng rực rỡ bên bờ hồ Hoàn Kiếm...',
        waveformData: [6, 8, 5, 7, 9, 4, 8, 6, 9, 3, 5, 7, 8, 9, 6, 4, 5, 8, 7],
        audioFrequency: 230,
        soundType: 'warm'
      }
    ]
  },
  {
    id: 'talent-thanh-tung',
    name: 'Thanh Tùng',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    gender: 'Nam',
    region: 'Miền Bắc',
    title: 'Voice Actor & Đạo diễn lồng tiếng kỳ cựu',
    bio: 'Chất giọng Nam Bắc dày dặn, uy quyền và đầy nội lực. Chuyên trị các thể loại Trailer phim điện ảnh, TVC ngân hàng, ô tô và phim tài liệu chính luận.',
    rating: 4.95,
    reviewCount: 210,
    completedProjects: 430,
    basePricePerMinute: 500000,
    turnaroundHours: 8,
    tags: ['Miền Bắc', 'Quảng cáo TVC', 'Quyền lực', 'Trailer phim', 'Trầm ấm'],
    equipment: {
      mic: 'Sennheiser MKH 416',
      soundcard: 'RME Babyface Pro FS',
      room: 'Studio cách âm chuyên nghiệp tiêu chuẩn Netflix'
    },
    featuredInHero: true,
    sampleAudios: [
      {
        id: 'sample-tt-1',
        title: 'TVC Ô tô VinFast VF9 - Đẳng cấp tiên phong',
        category: 'Quảng cáo TVC',
        durationSec: 16,
        tone: 'Quyền lực, nội lực, sang trọng',
        scriptSnippet: 'Vượt trên mọi chuẩn mực. Khẳng định vị thế thủ lĩnh cùng công nghệ kiến tạo tương lai.',
        waveformData: [4, 8, 10, 6, 3, 8, 5, 9, 7, 10, 4, 6, 8, 9, 7, 5, 8, 10, 6],
        audioFrequency: 135,
        soundType: 'deep'
      },
      {
        id: 'sample-tt-2',
        title: 'Trailer Phim bom tấn Chiến tranh & Danh dự',
        category: 'Game & Trailer',
        durationSec: 18,
        tone: 'Hào hùng, kịch tính',
        scriptSnippet: 'Khi bóng tối bao trùm, chỉ có lòng quả cảm mới soi sáng con đường trở về...',
        waveformData: [8, 10, 7, 9, 5, 8, 10, 6, 4, 7, 9, 5, 8, 10, 6, 3, 7, 9, 6],
        audioFrequency: 140,
        soundType: 'dramatic'
      },
      {
        id: 'sample-tt-3',
        title: 'Sách nói: Đắc Nhân Tâm (Chương 1)',
        category: 'Sách nói (Audiobook)',
        durationSec: 22,
        tone: 'Trầm ấm, chiêm nghiệm',
        scriptSnippet: 'Nếu bạn muốn lấy mật, đừng phá tổ ong. Bài học đầu tiên về cách đối nhân xử thế...',
        waveformData: [5, 7, 8, 6, 9, 4, 7, 8, 6, 5, 8, 7, 9, 6, 4, 7, 8, 5, 6],
        audioFrequency: 130,
        soundType: 'deep'
      }
    ]
  },
  {
    id: 'talent-ngoc-han',
    name: 'Ngọc Hân',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    gender: 'Nữ',
    region: 'Miền Nam',
    title: 'Voice Artist Sài Gòn & Chuyên gia Sách nói',
    bio: 'Chất giọng Nam Bộ ngọt ngào, gần gũi và truyền cảm xúc tự nhiên. Top 1 Voice Talent được yêu thích trên Fonos và Voiz FM năm 2023.',
    rating: 4.99,
    reviewCount: 320,
    completedProjects: 510,
    basePricePerMinute: 400000,
    turnaroundHours: 16,
    tags: ['Miền Nam', 'Sách nói (Audiobook)', 'EdTech', 'Ngọt ngào', 'Truyền cảm'],
    equipment: {
      mic: 'Shure SM7B + Cloudlifter',
      soundcard: 'Universal Audio Volt 276',
      room: 'Acoustic Studio tiêu âm chuyên dụng'
    },
    sampleAudios: [
      {
        id: 'sample-nh-1',
        title: 'Sách nói: Cây Cam Ngọt Của Tôi',
        category: 'Sách nói (Audiobook)',
        durationSec: 18,
        tone: 'Ngọt ngào, xúc động',
        scriptSnippet: 'Đôi khi ta cần phải lắng nghe tiếng nói thầm thì của những hàng cây trong khu vườn nhỏ...',
        waveformData: [4, 7, 9, 6, 8, 5, 9, 7, 8, 6, 4, 7, 9, 5, 8, 6, 7, 9, 5],
        audioFrequency: 250,
        soundType: 'soft'
      },
      {
        id: 'sample-nh-2',
        title: 'Khóa học E-Learning Tư Duy Tài Chính Cá Nhân',
        category: 'EdTech & E-Learning',
        durationSec: 15,
        tone: 'Rõ ràng, sư phạm, thân thiện',
        scriptSnippet: 'Chào mừng các bạn đến với học phần 2: Cách xây dựng quỹ dự phòng tài chính khẩn cấp...',
        waveformData: [6, 8, 7, 9, 5, 7, 8, 6, 9, 7, 5, 8, 6, 9, 7, 4, 8, 6, 7],
        audioFrequency: 245,
        soundType: 'warm'
      }
    ]
  },
  {
    id: 'talent-tuan-kiet',
    name: 'Tuấn Kiệt',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    gender: 'Nam',
    region: 'Miền Nam',
    title: 'Lồng tiếng Game, Nhân vật Hoạt hình & Gen Z Commercials',
    bio: 'Biến hóa giọng nói đa dạng từ nhân vật anh hùng anime đến giọng đọc trẻ trung năng động cho các chiến dịch viral TikTok/Reels.',
    rating: 4.92,
    reviewCount: 95,
    completedProjects: 190,
    basePricePerMinute: 380000,
    turnaroundHours: 6,
    tags: ['Miền Nam', 'Game & Trailer', 'Năng động', 'Lồng tiếng Phim', 'Hài hước'],
    equipment: {
      mic: 'Rode NT1 5th Gen 32-bit float',
      soundcard: 'Audient iD14 MKII',
      room: 'Home Studio Treated Booth'
    },
    sampleAudios: [
      {
        id: 'sample-tk-1',
        title: 'Lồng tiếng Tướng Game MOBA - Hỏa Thần Ryze',
        category: 'Game & Trailer',
        durationSec: 14,
        tone: 'Năng động, hào sảng, chiến binh',
        scriptSnippet: 'Lửa rực cháy trong tim! Hãy sẵn sàng cho trận quyết chiến bảo vệ thánh địa!',
        waveformData: [7, 9, 10, 8, 6, 9, 10, 7, 8, 6, 9, 10, 7, 8, 9, 6, 8, 10, 7],
        audioFrequency: 180,
        soundType: 'energetic'
      },
      {
        id: 'sample-tk-2',
        title: 'TVC Trà Sữa Tươi Trân Châu - Năng Lượng Đỉnh Cao',
        category: 'Quảng cáo TVC',
        durationSec: 15,
        tone: 'Trẻ trung, tươi vui, hóm hỉnh',
        scriptSnippet: 'Uống là cuốn! Đậm vị trà, béo ngậy vị sữa tươi thượng hạng, thử ngay!',
        waveformData: [6, 8, 9, 7, 10, 6, 8, 9, 7, 5, 8, 10, 6, 8, 7, 9, 6, 8, 7],
        audioFrequency: 190,
        soundType: 'cheerful'
      }
    ]
  },
  {
    id: 'talent-lan-huong',
    name: 'Lan Hương',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    gender: 'Nữ',
    region: 'Miền Trung',
    title: 'Giọng Nữ Huế/Đà Nẵng & Thuyết minh Văn hóa Du lịch',
    bio: 'Chất giọng miền Trung chuẩn Huế thanh tao, nhẹ nhàng và giàu chất thơ. Thích hợp cho các video du lịch văn hóa, bảo tàng và ẩm thực truyền thống.',
    rating: 4.97,
    reviewCount: 68,
    completedProjects: 115,
    basePricePerMinute: 420000,
    turnaroundHours: 24,
    tags: ['Miền Trung', 'Thuyết minh Tài liệu', 'Dịu dàng', 'Du lịch', 'Truyền cảm'],
    equipment: {
      mic: 'Audio-Technica AT4040',
      soundcard: 'Focusrite Scarlett 4i4 4th Gen',
      room: 'Studio tiêu âm chuyên dụng Đà Nẵng'
    },
    sampleAudios: [
      {
        id: 'sample-lh-1',
        title: 'Video Du Lịch: Nét Đẹp Cố Đô Huế Bên Dòng Sông Hương',
        category: 'Thuyết minh Tài liệu',
        durationSec: 17,
        tone: 'Dịu dàng, tao nhã, tha thiết',
        scriptSnippet: 'Sông Hương như dải lụa mềm vắt qua kinh thành cổ kính, lắng đọng trầm tích ngàn năm...',
        waveformData: [4, 6, 8, 5, 7, 9, 6, 4, 7, 8, 5, 6, 8, 7, 5, 7, 6, 8, 5],
        audioFrequency: 235,
        soundType: 'soft'
      }
    ]
  },
  {
    id: 'talent-quoc-bao',
    name: 'Quốc Bảo',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    gender: 'Nam',
    region: 'Miền Bắc',
    title: 'Giọng đọc Radio, IVR Tổng đài & Trợ lý ảo AI',
    bio: 'Phát âm tròn vành rõ chữ, chuẩn phong cách phát thanh viên đài truyền hình quốc gia. Đã thu âm cho hơn 50 hệ thống IVR ngân hàng & viễn thông.',
    rating: 4.96,
    reviewCount: 165,
    completedProjects: 340,
    basePricePerMinute: 390000,
    turnaroundHours: 10,
    tags: ['Miền Bắc', 'Tổng đài IVR & Trợ lý ảo AI', 'Chuẩn đài', 'Chuyên nghiệp', 'Rõ ràng'],
    equipment: {
      mic: 'Electro-Voice RE20',
      soundcard: 'Motu M2',
      room: 'Broadcast Spec Studio'
    },
    sampleAudios: [
      {
        id: 'sample-qb-1',
        title: 'Lời chào Tổng đài Tự động Ngân hàng Quốc tế',
        category: 'Tổng đài IVR & Trợ lý ảo AI',
        durationSec: 15,
        tone: 'Chuẩn mực, lịch sự, ân cần',
        scriptSnippet: 'Cảm ơn Quý khách đã gọi đến Tổng đài Chăm sóc Khách hàng 24/7. Vui lòng bấm phím 1 để chọn tiếng Việt...',
        waveformData: [5, 7, 6, 8, 7, 6, 8, 7, 6, 8, 7, 6, 8, 7, 6, 8, 7, 6, 7],
        audioFrequency: 160,
        soundType: 'warm'
      }
    ]
  }
];

export const INITIAL_BRIEFS: VoiceBrief[] = [
  {
    id: 'brief-01',
    title: 'Casting Giọng đọc TVC Mùa Vu Lan - Nhãn hàng Sữa Bột',
    category: 'Quảng cáo TVC',
    targetGender: 'Nữ',
    targetRegion: 'Miền Bắc',
    tone: 'Ấm áp, truyền cảm, lay động cảm xúc',
    scriptText: 'Mẹ đã dành cả thanh xuân để nâng bước con đi. Hôm nay, hãy để con mang trọn vẹn tình yêu và sức khỏe gửi trao về mẹ...',
    wordCount: 85,
    estimatedDurationMin: 0.5,
    budget: '5.000.000 - 8.000.000 đ',
    deadlineDays: 2,
    usageType: 'Phát sóng truyền hình / Radio',
    licenseDuration: '1 năm',
    status: 'Open',
    createdAt: 'Vừa xong'
  },
  {
    id: 'brief-02',
    title: 'Bộ Sách nói 10 tập: Bí Quyết Đàm Phán Kinh Doanh',
    category: 'Sách nói (Audiobook)',
    targetGender: 'Nam',
    targetRegion: 'Miền Nam',
    tone: 'Trầm ấm, đĩnh đạc, thuyết phục',
    scriptText: 'Trong kinh doanh hiện đại, đàm phán không phải là đánh bại đối phương, mà là kiến tạo giá trị đồng thuận bền vững...',
    wordCount: 15000,
    estimatedDurationMin: 60,
    budget: '25.000.000 đ',
    deadlineDays: 10,
    usageType: 'Sách nói / Giáo dục',
    licenseDuration: 'Vĩnh viễn',
    status: 'Open',
    createdAt: 'Hôm qua'
  }
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Đăng Voice Brief',
    subtitle: 'Nhanh chóng trong 2 phút',
    description: 'Nhập kịch bản, chọn yêu cầu về tone giọng, vùng miền, thời hạn và ngân sách dự kiến của bạn.',
    iconName: 'edit_note',
    highlight: 'Hệ thống tự động tính số từ & thời lượng phát'
  },
  {
    step: 2,
    title: 'Nhận Audition & Tuyển chọn',
    subtitle: 'Nghe demo đọc thử kịch bản',
    description: 'Hàng trăm Voice Talent phù hợp gửi bản thu demo 15-30 giây từ chính kịch bản của bạn để bạn lựa chọn.',
    iconName: 'graphic_eq',
    highlight: 'Nghe thử miễn phí trước khi quyết định'
  },
  {
    step: 3,
    title: 'Hợp đồng & Giữ cọc an toàn',
    subtitle: 'Bảo vệ quyền lợi 100%',
    description: 'Vocalink giữ tiền cọc trong tài khoản trung gian an toàn. Tiền chỉ được chuyển khi bạn hoàn toàn hài lòng với file thu.',
    iconName: 'verified_user',
    highlight: 'Quy trình chuẩn hóa, hóa đơn VAT đầy đủ'
  },
  {
    step: 4,
    title: 'Thu âm & Duyệt chỉnh sửa',
    subtitle: 'File Master chất lượng cao',
    description: 'Talent thu âm tại studio chuyên nghiệp, gửi file WAV/MP3 chuẩn broadcast trong vòng 12-24 giờ kèm 2 lần chỉnh sửa miễn phí.',
    iconName: 'mic',
    highlight: 'Đảm bảo lọc sạch tạp âm, chuẩn dB'
  },
  {
    step: 5,
    title: 'Cấp chứng nhận Voice Rights',
    subtitle: 'Bảo hộ bản quyền âm thanh',
    description: 'Nhận file Master gốc cùng chứng chỉ bản quyền giọng nói (Voice Rights Certificate) bảo vệ pháp lý toàn diện cho thương hiệu.',
    iconName: 'workspace_premium',
    highlight: 'Cam kết không sao chép AI trái phép'
  }
];

export const VOICE_RIGHTS_FEATURES = [
  {
    title: 'Chứng nhận Bản quyền Giọng nói (Voice Rights Certificate)',
    desc: 'Mỗi bản ghi âm giao dịch qua Vocalink đều đi kèm chứng thư điện tử xác thực quyền sở hữu thương mại, phạm vi phát sóng và thời hạn sử dụng rõ ràng.',
    icon: 'verified'
  },
  {
    title: 'Cam kết Chống sao chép AI (Anti-Voice Cloning Policy)',
    desc: 'Văn bản bảo vệ chống lại việc sử dụng giọng thu âm của Voice Talent để huấn luyện mô hình AI/Deepfake khi chưa có thỏa thuận phụ lục bản quyền riêng biệt.',
    icon: 'security'
  },
  {
    title: 'Hợp đồng & Xuất hóa đơn đỏ (VAT)',
    desc: 'Hợp đồng pháp lý chuẩn hóa theo Luật Sở hữu Trí tuệ Việt Nam, xuất hóa đơn tài chính điện tử đầy đủ cho doanh nghiệp và Agency.',
    icon: 'receipt_long'
  },
  {
    title: 'Thanh toán Escrow Trung Gian An Toàn',
    desc: 'Tiền bản quyền và công thu âm được bảo vệ trong hệ thống Escrow. Chỉ giải ngân khi khách hàng bấm duyệt nghiệm thu chất lượng.',
    icon: 'lock'
  }
];
