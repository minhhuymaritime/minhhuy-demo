// Nội dung chi tiết 3 dịch vụ — lấy nguyên văn từ minhhuymaritime.com.
export type ServiceSection = {
  heading: string
  body?: string
  items?: { label?: string; text?: string; sub?: string[] }[]
  timeline?: boolean // hiển thị items dạng timeline (quy trình các bước)
}

// [chỉ số dịch vụ][các mục]
export const SERVICE_DETAILS: Record<'vi' | 'en', ServiceSection[][]> = {
  vi: [
    // 0 — Kiểm tra, Bảo dưỡng & Cấp GCN
    [
      {
        heading: 'Giới thiệu chung',
        body: 'Theo quy định của Cục Đăng kiểm Việt Nam (VR) và các tổ chức Đăng kiểm quốc tế (IACS), hệ thống cứu sinh và cứu hỏa trên tàu biển bắt buộc phải được kiểm tra, bảo dưỡng định kỳ hàng năm để đảm bảo an toàn. Minh Huy cung cấp giải pháp bảo dưỡng trọn gói với đội ngũ kỹ sư và quy trình kiểm soát chặt chẽ.',
      },
      {
        heading: 'Hệ thống & thiết bị PCCC (FFE)',
        items: [
          { label: 'Hệ thống chữa cháy cố định', text: 'Kiểm tra trạm khí CO₂, đường ống rò rỉ, cân đo mức khí, van điều khiển. Kiểm tra hệ thống bọt, chất lượng bọt và tank chứa.' },
          { label: 'Thiết bị chữa cháy xách tay', text: 'Kiểm tra và thử thủy lực bình chữa cháy bột, CO₂, Foam, đảm bảo áp suất an toàn và niêm phong đầy đủ.' },
          { label: 'Hệ thống phát hiện cháy & vòi rồng', text: 'Kiểm tra độ nhạy đầu dò khói/nhiệt, tủ trung tâm báo cháy, lăng phun, van chặn và tủ trang bị.' },
          { label: 'Trang bị đội cứu hỏa', text: 'Kiểm tra bộ quần áo chống cháy, SCBA, EEBD với nạp khí sạch và thử độ kín mặt nạ.' },
        ],
      },
      {
        heading: 'Hệ thống & thiết bị cứu sinh (LSA)',
        items: [
          { label: 'Phao bè cứu sinh', text: 'Mở kiểm tra, thử áp lực, thử độ kín khít và sàn bè. Kiểm tra và thay thế định kỳ các phụ kiện trong túi trang bị như lương thực, nước uống, pháo hiệu, túi cứu thương.' },
          { label: 'Xuồng cứu sinh & thiết bị nâng hạ', text: 'Kiểm tra thân xuồng, hệ thống nhả móc, động cơ và truyền động. Thực hiện thử tải tĩnh và tải động định kỳ 1 năm và 5 năm.' },
          { label: 'Thiết bị cứu sinh cá nhân', text: 'Kiểm tra áo phao, vòng cứu sinh, bộ quần áo bơi chống mất nhiệt. Thay mới phụ kiện như đèn báo, còi hiệu theo tiêu chuẩn SOLAS.' },
        ],
      },
      {
        heading: 'Quy trình bảo dưỡng',
        timeline: true,
        items: [
          { label: 'Tiếp nhận, tư vấn và báo giá', text: 'Ghi nhận yêu cầu từ chủ tàu hoặc đại lý về danh mục thiết bị. Kiểm tra dữ liệu lịch sử, đối chiếu quy định Đăng kiểm và SOLAS để gửi báo giá chi tiết.' },
          { label: 'Khảo sát tại tàu', text: 'Kỹ thuật viên lên tàu đánh giá tình trạng thực tế hệ thống. Thực hiện kiểm tra sơ bộ, thống kê thiết bị cần bảo dưỡng.' },
          { label: 'Bảo dưỡng tại xưởng', text: 'Thực hiện quy trình bảo trì chuyên sâu: thử áp lực phao bè, kiểm tra mui và vỏ, thay trang bị cứu sinh hết hạn, thử thủy lực, nạp sạc khí, kiểm tra độ kín thiết bị. Tất cả được giám sát nghiêm ngặt.' },
          { label: 'Hoàn trả, lắp đặt và nghiệm thu', text: 'Lắp đặt thiết bị vào vị trí quy định. Kiểm tra vận hành lần cuối với thuyền viên, ký biên bản nghiệm thu và bàn giao giấy chứng nhận.' },
        ],
      },
    ],
    // 1 — Thi công trạm CO2
    [
      {
        heading: 'Tư vấn, thi công lắp đặt trạm chữa cháy bằng khí CO₂',
        body: 'Hệ thống chữa cháy CO₂ tập trung là lớp bảo vệ cuối cùng cho các khu vực nguy hiểm như buồng máy, buồng bơm và hầm hàng. Minh Huy cung cấp giải pháp trọn gói từ khâu tính toán thiết kế đến khi cấp chứng chỉ đăng kiểm.',
      },
      {
        heading: 'Các hạng mục chính',
        items: [
          { label: 'Cung cấp thiết bị chuyên dụng', text: 'Cung cấp bình khí CO₂ cao áp (loại 45kg/68L) đạt chuẩn, đầy đủ thông số áp suất làm việc (PW) và áp suất thử thủy lực (PH).' },
          { label: 'Thi công hệ thống đường ống', text: 'Gia công và lắp đặt đường ống góp (manifold), hệ thống ống dẫn khí sơn đỏ và các đầu xả khí đảm bảo độ bao phủ tối ưu.' },
          { label: 'Lắp đặt trạm điều khiển', text: 'Thiết lập tủ kích hoạt (Release Station), hệ thống cáp giật đồng thời hoặc kích hoạt bằng khí điều khiển.' },
        ],
      },
      {
        heading: 'Quy trình lắp đặt',
        timeline: true,
        items: [
          { label: 'Phân tích nhu cầu & tư vấn giải pháp', sub: ['Tiếp nhận hồ sơ kỹ thuật của tàu và yêu cầu từ chủ tàu', 'Tư vấn phương án lắp đặt tối ưu về vị trí đặt trạm'] },
          { label: 'Khảo sát hiện trường & thiết kế chi tiết', sub: ['Đo đạc hiện trạng, xác định tuyến đi của đường ống và vị trí các đầu phun', 'Lập sơ đồ flowchart hệ thống trạm CO₂'] },
          { label: 'Thi công & lắp đặt', sub: ['Lắp đặt dàn bình CO₂, ống nối mềm, van một chiều, van an toàn và các phụ kiện khác', 'Thi công hệ thống báo động trước khi xả khí (Pre-discharge alarm)', 'Sơn hoàn thiện hệ thống theo quy ước màu sắc'] },
          { label: 'Thử nghiệm, nghiệm thu & bàn giao chứng chỉ', sub: ['Thử kín đường ống bằng khí nén, kiểm tra thông suốt các đầu phun', 'Hướng dẫn vận hành và diễn tập thao tác', 'Cấp Giấy chứng nhận an toàn thiết bị theo yêu cầu Cục Đăng kiểm Việt Nam'] },
        ],
      },
    ],
    // 2 — Cung ứng hàng hải
    [
      {
        heading: 'Giới thiệu chung',
        body: 'Minh Huy cung cấp đầy đủ vật tư, thiết bị cứu sinh và cứu hỏa hàng hải — tất cả đều kèm đầy đủ chứng chỉ và đáp ứng các tiêu chuẩn, quy định của SOLAS cũng như Đăng kiểm Việt Nam.',
      },
      {
        heading: 'Thiết bị phòng cháy chữa cháy (FFE)',
        items: [
          { label: 'Bình chữa cháy các loại', text: 'Bình khí CO₂ (2kg, 5kg, v.v.), bình bột khô (ABC/BC) và bình bọt Foam.' },
          { label: 'Vật tư trạm CO₂ tập trung', text: 'Bình khí CO₂ cao áp loại 45kg (68L), van chai, ống nối chịu áp suất cao, van một chiều, hệ thống đầu phun khí.' },
          { label: 'Thiết bị bảo vệ hô hấp', text: 'Bộ thiết bị thở nén khí (SCBA) và thiết bị thở thoát hiểm khẩn cấp (EEBD).' },
          { label: 'Hệ thống dẫn nước chữa cháy', text: 'Vòi chữa cháy, lăng phun đa năng và các khớp nối tiêu chuẩn quốc tế.' },
        ],
      },
      {
        heading: 'Hệ thống trang thiết bị cứu sinh (LSA)',
        items: [
          { label: 'Trang bị bảo hộ cá nhân', sub: ['Áo phao cứu sinh có độ nổi cao, kèm còi và đèn tự sáng', 'Phao tròn trọng lượng chuẩn 2.5kg hoặc 4.3kg với dây ném và đèn tín hiệu', 'Bộ quần áo chống mất nhiệt để duy trì thân nhiệt trong nước lạnh', 'Bộ đồ dụng cụ cho người chữa cháy', 'Bộ quần áo chống hoá chất'] },
          { label: 'Tín hiệu cứu nạn & vật tư tiêu hao', sub: ['Tín hiệu cứu nạn gồm đuốc cầm tay, pháo hiệu dù và tín hiệu khói', 'Vật tư dự phòng: lương khô cứu sinh, túi nước uống, dụng cụ câu cá, gương tín hiệu, túi sơ cứu y tế'] },
          { label: 'Phao bè cứu sinh tự thổi (Liferaft)', text: 'Cung cấp các loại phao bè từ 6 đến 25 người.' },
        ],
      },
    ],
  ],
  en: [
    // 0 — Inspection, maintenance & certification
    [
      {
        heading: 'Overview',
        body: 'Per Vietnam Register (VR) and international classification societies (IACS), shipboard life-saving and fire-fighting systems must be inspected and serviced annually to ensure safety. Minh Huy provides full-package maintenance with experienced engineers and strict control procedures.',
      },
      {
        heading: 'Fire-fighting systems & equipment (FFE)',
        items: [
          { label: 'Fixed fire-fighting systems', text: 'Inspect the CO₂ station, pipe leakage, gas-level weighing and control valves. Check the foam system, foam quality and tanks.' },
          { label: 'Portable extinguishers', text: 'Inspect and hydraulically test powder, CO₂ and Foam extinguishers, ensuring safe pressure and full sealing.' },
          { label: 'Fire detection & hoses', text: 'Check smoke/heat detector sensitivity, the fire-alarm panel, nozzles, stop valves and equipment lockers.' },
          { label: 'Fire-team gear', text: 'Inspect fire suits, SCBA and EEBD with clean-air refilling and mask tightness test.' },
        ],
      },
      {
        heading: 'Life-saving systems & equipment (LSA)',
        items: [
          { label: 'Liferafts', text: 'Open inspection, pressure test, tightness and floor test. Periodic check and replacement of pack contents such as rations, drinking water, flares and first-aid kit.' },
          { label: 'Rescue boats & launching gear', text: 'Inspect the hull, release hooks, engine and transmission. Static and dynamic load tests at 1-year and 5-year intervals.' },
          { label: 'Personal life-saving gear', text: 'Inspect life jackets, lifebuoys and immersion suits. Replace accessories such as lights and whistles per SOLAS.' },
        ],
      },
      {
        heading: 'Maintenance process',
        timeline: true,
        items: [
          { label: 'Intake, consulting & quote', text: 'Log requests from owners or agents. Review history and cross-check Register and SOLAS rules to send a detailed quote.' },
          { label: 'On-board survey', text: 'Technicians board to assess the actual system condition, run a preliminary check and list equipment to service.' },
          { label: 'Workshop servicing', text: 'In-depth maintenance: liferaft pressure test, canopy and hull check, replacing expired gear, hydraulic test, gas refilling, tightness check — all strictly supervised.' },
          { label: 'Reinstall & acceptance', text: 'Refit equipment in place. Final operation check with the crew, sign acceptance and hand over certificates.' },
        ],
      },
    ],
    // 1 — CO2 station installation
    [
      {
        heading: 'Consulting & installation of CO₂ fire-fighting stations',
        body: 'A central CO₂ system is the last line of defense for hazardous spaces such as engine rooms, pump rooms and cargo holds. Minh Huy delivers a full-package solution from design calculation to register certification.',
      },
      {
        heading: 'Key items',
        items: [
          { label: 'Specialized equipment supply', text: 'Certified high-pressure CO₂ cylinders (45kg/68L) with full working-pressure (PW) and hydraulic-test (PH) specs.' },
          { label: 'Pipework installation', text: 'Fabricate and install the manifold, red-painted gas distribution pipes and gas discharge heads for optimal coverage.' },
          { label: 'Control station setup', text: 'Set up the Release Station with a simultaneous pull-cable system or pilot-gas activation.' },
        ],
      },
      {
        heading: 'Installation process',
        timeline: true,
        items: [
          { label: 'Needs analysis & solution consulting', sub: ['Receive the ship’s technical files and owner requirements', 'Advise the optimal installation layout and station location'] },
          { label: 'Site survey & detailed design', sub: ['Measure the site, set pipe routing and nozzle positions', 'Draw the CO₂ station flowchart'] },
          { label: 'Construction & installation', sub: ['Install the CO₂ bank, flexible hoses, check valves, safety valves and other accessories', 'Install the pre-discharge alarm system', 'Finish painting per the color code'] },
          { label: 'Testing, acceptance & certificate handover', sub: ['Pneumatic tightness test and nozzle-flow verification', 'Operation training and drills', 'Issue the equipment safety certificate per Vietnam Register'] },
        ],
      },
    ],
    // 2 — Marine supply
    [
      {
        heading: 'Overview',
        body: 'Minh Huy supplies a full range of marine life-saving and fire-fighting materials — all delivered with complete certificates and meeting SOLAS standards and Vietnam Register regulations.',
      },
      {
        heading: 'Fire-fighting equipment (FFE)',
        items: [
          { label: 'Extinguishers of all types', text: 'CO₂ (2kg, 5kg, etc.), dry-powder (ABC/BC) and Foam extinguishers.' },
          { label: 'Central CO₂ station materials', text: 'High-pressure 45kg (68L) CO₂ cylinders, cylinder valves, high-pressure hoses, check valves and nozzle systems.' },
          { label: 'Respiratory protection', text: 'Self-contained breathing apparatus (SCBA) and emergency escape breathing device (EEBD).' },
          { label: 'Fire water systems', text: 'Fire hoses, multi-purpose nozzles and international-standard couplings.' },
        ],
      },
      {
        heading: 'Life-saving equipment (LSA)',
        items: [
          { label: 'Personal protective gear', sub: ['High-buoyancy life jackets with whistle and self-igniting light', 'Standard 2.5kg or 4.3kg lifebuoys with throwing line and signal light', 'Immersion suits to retain body heat in cold water', "Firefighter's outfit and tool set", 'Chemical protective suits'] },
          { label: 'Distress signals & consumables', sub: ['Distress signals: hand torches, parachute flares and smoke signals', 'Backup supplies: survival rations, drinking-water pouches, fishing kit, signal mirror, first-aid kit'] },
          { label: 'Inflatable liferafts', text: 'Liferafts from 6 to 25 persons.' },
        ],
      },
    ],
  ],
}
