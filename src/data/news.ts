// ============================================================================
// TIN TỨC / BÀI ĐĂNG
// ----------------------------------------------------------------------------
// Để ĐĂNG TIN MỚI: thêm một object vào ĐẦU mảng NEWS bên dưới (tin mới nhất ở
// trên cùng — tin đầu tiên sẽ là tin nổi bật lớn bên trái).
//   - date:    ngày đăng, dạng 'YYYY-MM-DD'
//   - image:   đường dẫn ảnh trong thư mục /public (vd '/news-1.jpg').
//              Tạm thời đang dùng ảnh sẵn có; thay bằng ảnh thật khi có.
//   - link:    link bài Facebook gốc (nút "Xem trên Facebook" trong modal).
//   - tag/title/excerpt: điền cả 'vi' và 'en'. excerpt = tóm tắt ngắn (ngoài thẻ).
//   - body:    nội dung đầy đủ hiện trong modal. Ngăn các đoạn bằng dòng trống
//              (\n\n). Nếu chưa có bản tiếng Anh, có thể tạm để giống tiếng Việt.
//   - source:  (tuỳ chọn) nếu tin tổng hợp từ nguồn báo bên ngoài, điền
//              { name, url }. Khi có, modal hiện "Nguồn: ..." + nút "Đọc bài gốc"
//              thay cho nút Facebook.
// ============================================================================

export const FACEBOOK_PAGE = 'https://www.facebook.com/dichvuhanghai.minhhuy/'

export interface NewsItem {
  id: string
  date: string // 'YYYY-MM-DD'
  image: string
  link: string
  tag: { vi: string; en: string }
  title: { vi: string; en: string }
  excerpt: { vi: string; en: string }
  body: { vi: string; en: string }
  source?: { name: string; url: string }
}

export const NEWS: NewsItem[] = [
  {
    id: 'n5',
    date: '2026-05-28',
    image: '/images/news/news-rescue-hp90666.jpg',
    link: 'https://vimawa.gov.vn/vi/tin-tuc/tau-ca-hp-90666-ts-voi-11-ngu-dan-bi-chim-tren-vung-bien-vinh-bac-bo',
    tag: { vi: 'Tin ngành', en: 'Industry' },
    title: {
      vi: 'Cứu nạn an toàn 11 ngư dân tàu cá HP-90666-TS bị chìm trên Vịnh Bắc Bộ',
      en: 'All 11 fishermen rescued after fishing vessel HP-90666-TS sank in the Gulf of Tonkin',
    },
    excerpt: {
      vi: 'Tàu cá HP-90666-TS bị sóng đánh chìm cách đảo Long Châu khoảng 15 hải lý; lực lượng cứu nạn hàng hải cùng tàu SAR 411 đã tìm kiếm và cứu an toàn toàn bộ 11 ngư dân.',
      en: 'Fishing vessel HP-90666-TS sank about 15 nautical miles off Long Chau island; maritime rescue forces with SAR 411 searched for and safely rescued all 11 fishermen.',
    },
    body: {
      vi: 'Khoảng 17h00 ngày 26/5/2026, tàu cá HP-90666-TS cùng 11 ngư dân bị sóng lớn đánh chìm tại khu vực cách Đông Nam đảo Long Châu khoảng 15 hải lý trên vùng biển Vịnh Bắc Bộ.\n\nNhận được thông tin báo nạn lúc 08h58 ngày 27/5, Trung tâm Phối hợp tìm kiếm cứu nạn hàng hải Việt Nam đã điều động tàu SAR 411, phối hợp cùng Bộ đội Biên phòng Hải Phòng, Cảnh sát biển và Hải quân khẩn trương triển khai tìm kiếm.\n\nĐến 15h30 cùng ngày, lực lượng cứu được 9 người, còn 2 người mất tích. Công tác tìm kiếm được duy trì liên tục và đến 19h40, toàn bộ 11 ngư dân đã được tìm thấy, cứu vớt an toàn.\n\nVụ việc một lần nữa cho thấy vai trò sống còn của trang thiết bị an toàn hàng hải và công tác tìm kiếm cứu nạn trên biển — lĩnh vực mà Minh Huy luôn đồng hành cùng các chủ tàu và ngư dân.',
      en: 'At around 17:00 on 26 May 2026, the fishing vessel HP-90666-TS with 11 fishermen on board was sunk by heavy seas about 15 nautical miles south-east of Long Chau island in the Gulf of Tonkin.\n\nAfter receiving the distress report at 08:58 on 27 May, the Vietnam Maritime Search and Rescue Coordination Centre dispatched the SAR 411 vessel, coordinating with the Hai Phong Border Guard, Coast Guard and Navy to launch an urgent search.\n\nBy 15:30 that day, rescuers had recovered 9 people, with 2 still missing. The search continued without interruption and by 19:40 all 11 fishermen had been found and rescued safely.\n\nThe incident once again highlights the vital role of marine safety equipment and search-and-rescue operations at sea — a field in which Minh Huy stands alongside ship-owners and fishermen.',
    },
    source: {
      name: 'Trung tâm Phối hợp TKCN Hàng hải Việt Nam (Vinamarine)',
      url: 'https://vimawa.gov.vn/vi/tin-tuc/tau-ca-hp-90666-ts-voi-11-ngu-dan-bi-chim-tren-vung-bien-vinh-bac-bo',
    },
  },
  {
    id: 'n6',
    date: '2026-05-08',
    image: '/images/news/news-rescue-th92531.jpg',
    link: 'https://vimawa.gov.vn/vi/tin-tuc/kip-thoi-dieu-dong-tau-chuyen-dung-sar-411-cuu-nan-04-ngu-dan-tau-th-92531-ts-bi-chim-tai',
    tag: { vi: 'Tin ngành', en: 'Industry' },
    title: {
      vi: 'Điều động tàu SAR 411 cứu nạn kịp thời 4 ngư dân tàu TH-92531-TS bị chìm gần đảo Long Châu',
      en: 'SAR 411 dispatched to promptly rescue 4 fishermen from sunken vessel TH-92531-TS near Long Chau island',
    },
    excerpt: {
      vi: 'Tàu cá TH-92531-TS cùng 4 ngư dân bị chìm cách Tây Nam đảo Long Châu khoảng 8 hải lý; tàu SAR 411 phối hợp tàu hàng WAN HAI 101 cứu vớt an toàn cả 4 người.',
      en: 'Fishing vessel TH-92531-TS with 4 fishermen sank about 8 nautical miles south-west of Long Chau island; SAR 411 and the cargo ship WAN HAI 101 rescued all four safely.',
    },
    body: {
      vi: 'Hồi 12h43 ngày 07/5/2026, Trung tâm Phối hợp tìm kiếm cứu nạn hàng hải Việt Nam nhận được thông tin tàu cá TH-92531-TS cùng 04 ngư dân bị chìm tại vị trí cách Tây Nam đảo Long Châu khoảng 08 hải lý.\n\nTrung tâm lập tức triển khai các biện pháp ứng cứu, điều động tàu chuyên dụng SAR 411 khẩn cấp rời Hải Phòng, đồng thời xác định tàu hàng WAN HAI 101 (Đài Loan) đang hoạt động gần khu vực và đề nghị hỗ trợ.\n\nTàu WAN HAI 101 đã tiếp cận, cứu vớt an toàn 4 ngư dân. Tàu SAR 411 sau đó tiếp cận, thực hiện chăm sóc y tế ban đầu và tiếp nhận các nạn nhân.\n\nĐến 19h30 cùng ngày, tàu SAR 411 đưa 4 ngư dân về cầu cảng an toàn tại Hải Phòng, bàn giao cho các cơ quan chức năng. Vụ việc cho thấy hiệu quả của sự phối hợp giữa lực lượng cứu nạn chuyên trách và tàu thuyền hoạt động gần hiện trường.',
      en: 'At 12:43 on 7 May 2026, the Vietnam Maritime Search and Rescue Coordination Centre received a report that fishing vessel TH-92531-TS with 4 fishermen had sunk about 8 nautical miles south-west of Long Chau island.\n\nThe Centre immediately launched its response, urgently dispatching the specialised vessel SAR 411 from Hai Phong, while also identifying the cargo ship WAN HAI 101 (Taiwan) operating nearby and requesting its assistance.\n\nThe WAN HAI 101 reached the scene and safely rescued the 4 fishermen. SAR 411 then approached, provided initial medical care and took the survivors on board.\n\nBy 19:30 that day, SAR 411 brought the 4 fishermen safely to the quay in Hai Phong and handed them over to the authorities. The case demonstrates the effectiveness of coordination between dedicated rescue forces and ships operating near the scene.',
    },
    source: {
      name: 'Trung tâm Phối hợp TKCN Hàng hải Việt Nam (Vinamarine)',
      url: 'https://vimawa.gov.vn/vi/tin-tuc/kip-thoi-dieu-dong-tau-chuyen-dung-sar-411-cuu-nan-04-ngu-dan-tau-th-92531-ts-bi-chim-tai',
    },
  },
  {
    id: 'n3',
    date: '2026-05-22',
    image: '/images/news/news-imo-lsa.jpg',
    link: FACEBOOK_PAGE,
    tag: { vi: 'Tin ngành', en: 'Industry' },
    title: {
      vi: 'Cập nhật quy định IMO 2026 về xuồng cứu sinh và LSA Code',
      en: 'IMO 2026 updates on lifeboats and the LSA Code',
    },
    excerpt: {
      vi: 'Từ 01/01/2026, IMO siết quy định bảo dưỡng, thử tải xuồng cứu sinh, thiết bị hạ và cơ cấu nhả theo MSC.402(96) và LSA Code sửa đổi — đúng nhóm dịch vụ thế mạnh của Minh Huy.',
      en: 'From 1 Jan 2026, the IMO tightens rules on maintenance and load-testing of lifeboats, launching appliances and release gear under MSC.402(96) and the amended LSA Code — a core service of Minh Huy.',
    },
    body: {
      vi: 'Từ ngày 01/01/2026, nhiều quy định mới của IMO về bảo dưỡng, kiểm tra, thử tải và an toàn vận hành xuồng cứu sinh, xuồng cứu hộ, thiết bị hạ và cơ cấu nhả chính thức được áp dụng, dựa trên Resolution MSC.402(96) cùng các sửa đổi LSA Code (nổi bật là MSC.554(108), MSC.559(108)). Đây đúng là nhóm dịch vụ thế mạnh của Minh Huy.\n\nBảo dưỡng phải do đơn vị được ủy quyền. Theo MSC.402(96), việc bảo dưỡng thường niên và 5 năm đối với xuồng, tời, davit, móc nhả on-load/off-load bắt buộc do đơn vị dịch vụ được Cờ tàu/Đăng kiểm ủy quyền thực hiện. Thuyền viên chỉ làm các kiểm tra thường kỳ (tuần, tháng, diễn tập), không can thiệp sâu vào cơ cấu nhả.\n\nSiết thử nghiệm móc nhả và hệ hạ. Cơ cấu nhả phải được thử theo chu kỳ năm và 5 năm: kiểm tra trực quan móc, chốt, cáp, tời; thử trọn chu trình "chịu tải – nhả – reset – khóa"; tuyệt đối không bảo dưỡng khi móc đang chịu tải. Hệ hạ phải thử tải tĩnh và động để kiểm chứng độ bền, phanh và khả năng dừng an toàn.\n\nLSA Code đề cao an toàn khi hạ xuồng. Hệ móc không nhả on-load chỉ được nhả khi xuồng đã nổi trên nước; móc phải reset và khóa hoàn toàn trước khi chịu tải lại. Tốc độ hạ được khống chế trong giới hạn (tối thiểu theo công thức S = 0,4 + 0,02H, không nhỏ hơn 1,0 m/s; tối đa khoảng 1,3 m/s khi đầy tải) nhằm giảm lực va đập, bảo vệ thuyền viên.\n\nChủ tàu cần làm gì: rà soát kế hoạch bảo dưỡng lifeboat/rescue boat, bảo đảm bảo dưỡng năm và 5 năm do đơn vị được ủy quyền thực hiện; cập nhật quy trình kiểm tra nội bộ (weekly, monthly, drill); đánh giá lại hệ hạ, móc nhả và tốc độ hạ để đáp ứng LSA Code sửa đổi.\n\nVai trò của Minh Huy: cung cấp dịch vụ kiểm tra, bảo dưỡng, đại tu và thử tải xuồng cứu sinh, xuồng cứu hộ, thiết bị hạ và release gear theo MSC.402(96); tư vấn nâng cấp, hiệu chỉnh móc nhả và hệ hạ; hỗ trợ chuẩn bị hồ sơ, báo cáo, chứng chỉ phục vụ thanh tra Cờ tàu, Đăng kiểm và PSC.\n\n(Thông tin tổng hợp từ Resolution MSC.402(96), các sửa đổi LSA Code có hiệu lực từ 2026 và thông cáo "Raft of shipping rules in force from 1 January 2026" của IMO.)',
      en: 'From 1 January 2026, a set of new IMO rules on the maintenance, inspection, load-testing and safe operation of lifeboats, rescue boats, launching appliances and release gear came into force, based on Resolution MSC.402(96) and amendments to the LSA Code (notably MSC.554(108) and MSC.559(108)) — precisely Minh Huy\'s area of expertise.\n\nMaintenance must be done by authorised providers. Under MSC.402(96), annual and five-yearly servicing of boats, winches, davits and on-load/off-load release hooks must be carried out by service providers authorised by the Flag State or Class. Crews may only perform routine checks (weekly, monthly, drills) and must not work on the release gear themselves.\n\nTighter testing of release gear and launching systems. Release gear must be tested on annual and five-yearly cycles: visual inspection of hooks, pins, cables and winches; a full "load – release – reset – lock" operating cycle; and never servicing the hook while it is under load. Launching systems must undergo static and dynamic load tests to verify strength, brakes and safe stopping.\n\nThe LSA Code prioritises safe launching. Hooks without on-load release may only be released once the boat is fully waterborne; the hook must be fully reset and locked before taking load again. Lowering speed is kept within limits (minimum S = 0.4 + 0.02H but not less than 1.0 m/s; maximum around 1.3 m/s when fully loaded) to reduce impact and protect the crew.\n\nWhat ship-owners should do: review the lifeboat/rescue-boat maintenance plan, ensuring annual and five-yearly servicing is done by an authorised provider; update internal check procedures (weekly, monthly, drills); and reassess launching systems, release gear and lowering speed against the amended LSA Code.\n\nMinh Huy\'s role: inspection, maintenance, overhaul and load-testing of lifeboats, rescue boats, launching appliances and release gear per MSC.402(96); advice on upgrading and adjusting release gear and launching systems; and help preparing records, reports and certificates for Flag State, Class and PSC inspections.\n\n(Compiled from Resolution MSC.402(96), the LSA Code amendments effective from 2026 and the IMO note "Raft of shipping rules in force from 1 January 2026".)',
    },
  },
  {
    id: 'n2',
    date: '2026-05-03',
    image: '/images/hero/hero-supply.jpg',
    link: FACEBOOK_PAGE,
    tag: { vi: 'Cung ứng', en: 'Supply' },
    title: {
      vi: 'Bổ sung vật tư hàng hải: phao, áo phao, tín hiệu cấp cứu',
      en: 'Marine supplies restocked: lifebuoys, lifejackets, distress signals',
    },
    excerpt: {
      vi: 'Kho Minh Huy luôn sẵn các mặt hàng đạt chuẩn IMO/SOLAS, giao nhanh tại khu vực cảng và các tỉnh lân cận.',
      en: 'Our warehouse keeps IMO/SOLAS-compliant items in stock, with fast delivery around the port area.',
    },
    body: {
      vi: 'Kho hàng của Minh Huy vừa được bổ sung đa dạng vật tư hàng hải: phao tròn cứu sinh, áo phao, pháo hiệu, tín hiệu dù cấp cứu, vòi rồng chữa cháy và nhiều mặt hàng khác.\n\nTất cả sản phẩm đều đạt chuẩn IMO/SOLAS, có đầy đủ giấy tờ chứng nhận. Chúng tôi giao hàng nhanh tại khu vực cảng và các tỉnh lân cận.\n\nQuý khách cần báo giá hoặc tư vấn vật tư, vui lòng liên hệ trực tiếp với chúng tôi.',
      en: 'Minh Huy\'s warehouse has just been restocked with a wide range of marine supplies: lifebuoys, lifejackets, pyrotechnic signals, parachute distress flares, fire hoses and more.\n\nAll products meet IMO/SOLAS standards and come with full certification. We offer fast delivery around the port area and neighbouring provinces.\n\nFor quotes or supply advice, please get in touch with us directly.',
    },
  },
  {
    id: 'n7',
    date: '2026-06-12',
    image: '/images/news/news-lifeboat-mdsky.jpg',
    link: FACEBOOK_PAGE,
    tag: { vi: 'Hoạt động', en: 'Activities' },
    title: {
      vi: 'Minh Huy nâng hạ thành công xuồng cứu sinh tàu MD SKY trước sự chứng kiến của Đăng kiểm VR',
      en: 'Minh Huy successfully tests the lifeboat of M/V MD SKY, witnessed by Vietnam Register (VR)',
    },
    excerpt: {
      vi: 'Ngày 12/6/2026, Minh Huy hoàn tất thử nâng hạ xuồng cứu sinh của tàu MD SKY an toàn, đạt yêu cầu kỹ thuật trước sự chứng kiến của đăng kiểm viên VR.',
      en: 'On 12 June 2026, Minh Huy completed a safe lowering and raising test of the lifeboat on M/V MD SKY, meeting technical requirements under the witness of a VR surveyor.',
    },
    body: {
      vi: 'Ngày 12/06/2026, đội kỹ thuật Minh Huy đã tiến hành thử nâng hạ xuồng cứu sinh của tàu MD SKY thành công và an toàn dưới sự chứng kiến của đăng kiểm viên Cục Đăng kiểm Việt Nam (VR).\n\nQuá trình thử bao gồm kiểm tra cơ cấu hạ, móc nhả, tời và thao tác hạ – thu hồi xuồng theo đúng quy trình; toàn bộ hạng mục đều đạt yêu cầu kỹ thuật và an toàn.\n\nKết quả tiếp tục khẳng định năng lực của Minh Huy trong dịch vụ bảo dưỡng, thử tải xuồng cứu sinh và thiết bị hạ — sẵn sàng đồng hành cùng chủ tàu đáp ứng các yêu cầu của đăng kiểm.',
      en: 'On 12 June 2026, Minh Huy\'s technical team carried out a successful and safe lowering and raising test of the lifeboat on M/V MD SKY, witnessed by a surveyor from the Vietnam Register (VR).\n\nThe test covered the launching appliance, release gear and winch, along with lowering and recovering the boat following proper procedures; all items met the technical and safety requirements.\n\nThe result further confirms Minh Huy\'s capability in maintaining and load-testing lifeboats and launching appliances — ready to support ship-owners in meeting class requirements.',
    },
  },
]
