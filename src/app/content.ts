/*
  Page content for the service, solution and about pages, in English, Simplified and Traditional Chinese.

  DRAFT FOR CLIENT REVIEW: transit times are typical industry ranges, and the routes, history and
  milestones are drafted from the brief. Magni must confirm every figure, year and route before launch.
*/
export type Copy = [string, string, string];
export type Step = { title: Copy; text: Copy };

export type ServiceDetail = {
  lead: Copy;
  cargo: Copy[];
  transit: { lane: Copy; time: Copy }[];
  transitNote: Copy;
  routes: Copy[];
  documents: Copy[];
  process: Step[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  sea: {
    lead: [
      'Full container (FCL) and shared container (LCL) shipping from Hong Kong and the South China ports to every main port in Southeast Asia. We book the space, collect from the factory, handle export clearance and track the container to the destination port or your door.',
      '从香港及华南港口出发，提供整柜（FCL）及拼箱（LCL）海运，覆盖东南亚各主要港口。我们负责订舱、工厂提货、出口报关，并全程追踪货柜直至目的港或门到门交付。',
      '從香港及華南港口出發，提供整櫃（FCL）及拼箱（LCL）海運，覆蓋東南亞各主要港口。我們負責訂艙、工廠提貨、出口報關，並全程追蹤貨櫃直至目的港或門到門交付。',
    ],
    cargo: [
      ['Palletised and cartoned general cargo', '托盘及纸箱包装的一般货物', '卡板及紙箱包裝的一般貨物'],
      ['Machinery and heavy equipment (flat rack, open top)', '机械及重型设备（框架箱、开顶箱）', '機械及重型設備（框架櫃、開頂櫃）'],
      ['Consumer goods and retail replenishment', '消费品及零售补货', '消費品及零售補貨'],
      ['Chilled and frozen goods in reefer containers', '冷藏货柜运输的冷链及冷冻货物', '冷藏貨櫃運輸的冷鏈及冷凍貨物'],
    ],
    transit: [
      { lane: ['Hong Kong → Ho Chi Minh City', '香港 → 胡志明市', '香港 → 胡志明市'], time: ['3–4 days', '3–4 天', '3–4 天'] },
      { lane: ['Hong Kong → Singapore', '香港 → 新加坡', '香港 → 新加坡'], time: ['4–6 days', '4–6 天', '4–6 天'] },
      { lane: ['Shenzhen → Laem Chabang (Bangkok)', '深圳 → 林查班（曼谷）', '深圳 → 林查班（曼谷）'], time: ['5–7 days', '5–7 天', '5–7 天'] },
      { lane: ['Shenzhen → Port Klang', '深圳 → 巴生港', '深圳 → 巴生港'], time: ['6–8 days', '6–8 天', '6–8 天'] },
    ],
    transitNote: ['Port to port, sailing time only. LCL adds 2–4 days for consolidation.', '港到港航行时间，拼箱需另加 2–4 天集货时间。', '港到港航行時間，拼箱需另加 2–4 天集貨時間。'],
    routes: [
      ['Hong Kong, Yantian and Shekou to Singapore, Port Klang and Jakarta', '香港、盐田、蛇口至新加坡、巴生港及雅加达', '香港、鹽田、蛇口至新加坡、巴生港及雅加達'],
      ['South China to Laem Chabang, Ho Chi Minh City and Haiphong', '华南至林查班、胡志明市及海防', '華南至林查班、胡志明市及海防'],
      ['South China to Manila and Cebu', '华南至马尼拉及宿务', '華南至馬尼拉及宿務'],
    ],
    documents: [
      ['Commercial invoice', '商业发票', '商業發票'],
      ['Packing list', '装箱单', '裝箱單'],
      ['Bill of lading (issued by us or the carrier)', '提单（由我们或船公司签发）', '提單（由我們或船公司簽發）'],
      ['Certificate of origin: Form E or RCEP, to lower import duty', '原产地证：Form E 或 RCEP，可降低进口关税', '原產地證：Form E 或 RCEP，可降低進口關稅'],
      ['Export customs declaration (we prepare it)', '出口报关单（由我们准备）', '出口報關單（由我們準備）'],
    ],
    process: [
      { title: ['Quote and booking', '报价及订舱', '報價及訂艙'], text: ['We confirm the sailing, the container type and the all-in cost.', '确认船期、柜型及全包费用。', '確認船期、櫃型及全包費用。'] },
      { title: ['Pickup and loading', '提货及装柜', '提貨及裝櫃'], text: ['Trucking from your factory; LCL is consolidated at our Shenzhen warehouse.', '从工厂提货，拼箱货物在深圳仓库集货。', '從工廠提貨，拼箱貨物在深圳倉庫集貨。'] },
      { title: ['Export clearance', '出口报关', '出口報關'], text: ['Declarations filed before the cut-off so the container makes its vessel.', '截关前完成申报，确保货柜顺利上船。', '截關前完成申報，確保貨櫃順利上船。'] },
      { title: ['Arrival and delivery', '到港及派送', '到港及派送'], text: ['Import clearance through our partners and delivery to your warehouse.', '由合作伙伴办理进口清关并派送至您的仓库。', '由合作夥伴辦理進口清關並派送至您的倉庫。'] },
    ],
  },
  air: {
    lead: [
      'Airport-to-airport and door-to-door air freight out of Hong Kong International Airport, one of the busiest cargo airports in the world. Use it for launches, urgent replenishment, samples and anything too valuable to sit on a ship.',
      '经香港国际机场（全球最繁忙的货运机场之一）提供机场到机场及门到门空运。适合新品上市、紧急补货、样品及高价值货物。',
      '經香港國際機場（全球最繁忙的貨運機場之一）提供機場到機場及門到門空運。適合新品上市、緊急補貨、樣品及高價值貨物。',
    ],
    cargo: [
      ['High-value electronics and components', '高价值电子产品及零部件', '高價值電子產品及零部件'],
      ['Samples, spare parts and urgent repairs', '样品、备件及紧急维修件', '樣品、備件及緊急維修件'],
      ['Fashion and e-commerce stock', '时装及电商库存', '時裝及電商庫存'],
      ['Lithium batteries and other dangerous goods, with the right paperwork', '锂电池等危险品（需备齐文件）', '鋰電池等危險品（需備齊文件）'],
    ],
    transit: [
      { lane: ['Hong Kong → Singapore', '香港 → 新加坡', '香港 → 新加坡'], time: ['1–2 days', '1–2 天', '1–2 天'] },
      { lane: ['Hong Kong → Bangkok', '香港 → 曼谷', '香港 → 曼谷'], time: ['1–2 days', '1–2 天', '1–2 天'] },
      { lane: ['Hong Kong → Ho Chi Minh City', '香港 → 胡志明市', '香港 → 胡志明市'], time: ['1–2 days', '1–2 天', '1–2 天'] },
      { lane: ['Shenzhen factory → Southeast Asia door', '深圳工厂 → 东南亚门到门', '深圳工廠 → 東南亞門到門'], time: ['3–5 days', '3–5 天', '3–5 天'] },
    ],
    transitNote: ['Airport to airport unless marked door to door. Express space is available on request.', '除标明门到门外均为机场到机场时间，可按需安排快件舱位。', '除標明門到門外均為機場到機場時間，可按需安排快件艙位。'],
    routes: [
      ['Hong Kong (HKG) to Singapore, Bangkok, Kuala Lumpur and Ho Chi Minh City', '香港（HKG）至新加坡、曼谷、吉隆坡及胡志明市', '香港（HKG）至新加坡、曼谷、吉隆坡及胡志明市'],
      ['Hong Kong to Jakarta, Manila and Hanoi', '香港至雅加达、马尼拉及河内', '香港至雅加達、馬尼拉及河內'],
      ['Mainland cargo trucked to HKG for more flights and better rates', '内地货物经陆路转运至香港机场，航班更多、运价更优', '內地貨物經陸路轉運至香港機場，航班更多、運價更優'],
    ],
    documents: [
      ['Commercial invoice', '商业发票', '商業發票'],
      ['Packing list with weights and dimensions', '注明重量及尺寸的装箱单', '註明重量及尺寸的裝箱單'],
      ['Air waybill (we issue it)', '空运提单（由我们签发）', '空運提單（由我們簽發）'],
      ['MSDS and UN38.3 test report for batteries', '电池类货物需 MSDS 及 UN38.3 测试报告', '電池類貨物需 MSDS 及 UN38.3 測試報告'],
    ],
    process: [
      { title: ['Quote and space', '报价及舱位', '報價及艙位'], text: ['We check the flight, the chargeable weight and any dangerous goods rules.', '确认航班、计费重量及危险品规定。', '確認航班、計費重量及危險品規定。'] },
      { title: ['Pickup', '提货', '提貨'], text: ['Same-day collection in Hong Kong; next-day from the Pearl River Delta.', '香港当天提货，珠三角次日提货。', '香港即日提貨，珠三角翌日提貨。'] },
      { title: ['Screening and uplift', '安检及上机', '安檢及上機'], text: ['Security screening, export declaration and loading at HKG.', '在香港机场完成安检、出口申报及装机。', '在香港機場完成安檢、出口申報及裝機。'] },
      { title: ['Delivery', '派送', '派送'], text: ['Import clearance and delivery, with proof of delivery in tracking.', '进口清关及派送，追踪系统提供签收证明。', '進口清關及派送，追蹤系統提供簽收證明。'] },
    ],
  },
  road: {
    lead: [
      'Trucking across the Shenzhen–Hong Kong border every day, and overland from South China into Vietnam, Laos, Thailand and Malaysia. Faster than sea, cheaper than air, and the truck goes from your factory to the customer without a port in between.',
      '每日往返深港口岸的跨境陆运，以及从华南经陆路直达越南、老挝、泰国及马来西亚。比海运快、比空运省，货车由工厂直达客户，无需经港口中转。',
      '每日往返深港口岸的跨境陸運，以及從華南經陸路直達越南、老撾、泰國及馬來西亞。比海運快、比空運省，貨車由工廠直達客戶，無需經港口中轉。',
    ],
    cargo: [
      ['Factory cargo from the Pearl River Delta', '珠三角工厂货物', '珠三角工廠貨物'],
      ['E-commerce parcels and retail stock', '电商包裹及零售库存', '電商包裹及零售庫存'],
      ['Chilled food in temperature-controlled trucks', '温控货车运输的冷链食品', '溫控貨車運輸的冷鏈食品'],
      ['Oversized machinery, with route permits', '超大型机械（附路线许可）', '超大型機械（附路線許可）'],
    ],
    transit: [
      { lane: ['Shenzhen ⇄ Hong Kong', '深圳 ⇄ 香港', '深圳 ⇄ 香港'], time: ['Same or next day', '当天或次日', '即日或翌日'] },
      { lane: ['South China → Hanoi', '华南 → 河内', '華南 → 河內'], time: ['2–3 days', '2–3 天', '2–3 天'] },
      { lane: ['South China → Bangkok', '华南 → 曼谷', '華南 → 曼谷'], time: ['5–7 days', '5–7 天', '5–7 天'] },
      { lane: ['South China → Kuala Lumpur', '华南 → 吉隆坡', '華南 → 吉隆坡'], time: ['7–9 days', '7–9 天', '7–9 天'] },
    ],
    transitNote: ['Door to door, including border clearance on normal days.', '门到门时间，含正常情况下的口岸通关。', '門到門時間，含正常情況下的口岸通關。'],
    routes: [
      ['Shenzhen ⇄ Hong Kong via Shenzhen Bay and Lok Ma Chau', '经深圳湾及落马洲往返深港', '經深圳灣及落馬洲往返深港'],
      ['South China → Vietnam via Pingxiang and Dongxing', '华南经凭祥、东兴至越南', '華南經憑祥、東興至越南'],
      ['South China → Laos and Thailand via the Kunming–Bangkok corridor', '华南经昆曼公路至老挝及泰国', '華南經昆曼公路至老撾及泰國'],
      ['Onward to Malaysia and Singapore by road', '经陆路延伸至马来西亚及新加坡', '經陸路延伸至馬來西亞及新加坡'],
    ],
    documents: [
      ['Commercial invoice and packing list', '商业发票及装箱单', '商業發票及裝箱單'],
      ['Road cargo manifest (we file it)', '陆路舱单（由我们申报）', '陸路艙單（由我們申報）'],
      ['Export and import declarations', '出口及进口报关单', '出口及進口報關單'],
      ['Certificate of origin: Form E or RCEP', '原产地证：Form E 或 RCEP', '原產地證：Form E 或 RCEP'],
    ],
    process: [
      { title: ['Booking', '订车', '訂車'], text: ['Full truck or shared load, booked by the day you need it collected.', '整车或拼车，按您需要的提货日期安排。', '整車或拼車，按您需要的提貨日期安排。'] },
      { title: ['Collection', '提货', '提貨'], text: ['The truck loads at your factory and the seal number goes into tracking.', '货车在工厂装货，封条号码同步至追踪系统。', '貨車在工廠裝貨，封條號碼同步至追蹤系統。'] },
      { title: ['Border crossing', '口岸通关', '口岸通關'], text: ['Manifests and declarations are filed before the truck reaches the border.', '货车抵达口岸前已完成舱单及报关申报。', '貨車抵達口岸前已完成艙單及報關申報。'] },
      { title: ['Delivery', '派送', '派送'], text: ['Straight to the consignee, with a signed proof of delivery.', '直送收货人，并提供签收证明。', '直送收貨人，並提供簽收證明。'] },
    ],
  },
  rail: {
    lead: [
      'Container rail from China into Southeast Asia on the China–Laos Railway and the China–Vietnam line, and to Europe on the China–Europe Railway Express. Rail sits between sea and air: faster than a ship, a fraction of the cost of a plane.',
      '经中老铁路及中越铁路将货柜运往东南亚，并经中欧班列运往欧洲。铁路运输介于海运与空运之间：比海运快，成本远低于空运。',
      '經中老鐵路及中越鐵路將貨櫃運往東南亞，並經中歐班列運往歐洲。鐵路運輸介於海運與空運之間：比海運快，成本遠低於空運。',
    ],
    cargo: [
      ['Machinery and auto parts in full containers', '整柜运输的机械及汽车零部件', '整櫃運輸的機械及汽車零部件'],
      ['Consumer goods too heavy for air', '不适合空运的重货消费品', '不適合空運的重貨消費品'],
      ['Agricultural and food products (reefer on selected lines)', '农产品及食品（部分线路可提供冷藏柜）', '農產品及食品（部分線路可提供冷藏櫃）'],
      ['Inland cargo far from the coast', '远离沿海港口的内陆货物', '遠離沿海港口的內陸貨物'],
    ],
    transit: [
      { lane: ['Kunming → Vientiane (China–Laos Railway)', '昆明 → 万象（中老铁路）', '昆明 → 萬象（中老鐵路）'], time: ['1–2 days', '1–2 天', '1–2 天'] },
      { lane: ['South China → Hanoi', '华南 → 河内', '華南 → 河內'], time: ['3–5 days', '3–5 天', '3–5 天'] },
      { lane: ['Kunming → Bangkok (rail and road)', '昆明 → 曼谷（铁路接驳陆运）', '昆明 → 曼谷（鐵路接駁陸運）'], time: ['4–6 days', '4–6 天', '4–6 天'] },
      { lane: ['China → Europe (Railway Express)', '中国 → 欧洲（中欧班列）', '中國 → 歐洲（中歐班列）'], time: ['15–20 days', '15–20 天', '15–20 天'] },
    ],
    transitNote: ['Station to station. Departures are scheduled; we confirm the next train with your quote.', '站到站时间，按班列时刻发车，报价时会确认最近班次。', '站到站時間，按班列時刻發車，報價時會確認最近班次。'],
    routes: [
      ['China–Laos Railway: Kunming to Vientiane, onward to Thailand', '中老铁路：昆明至万象，延伸至泰国', '中老鐵路：昆明至萬象，延伸至泰國'],
      ['China–Vietnam rail via Pingxiang to Hanoi', '中越铁路经凭祥至河内', '中越鐵路經憑祥至河內'],
      ['China–Europe Railway Express from Chengdu, Chongqing and Xi’an', '中欧班列由成都、重庆及西安出发', '中歐班列由成都、重慶及西安出發'],
    ],
    documents: [
      ['Commercial invoice and packing list', '商业发票及装箱单', '商業發票及裝箱單'],
      ['Rail waybill (SMGS or CIM/SMGS)', '铁路运单（SMGS 或 CIM/SMGS）', '鐵路運單（SMGS 或 CIM/SMGS）'],
      ['Certificate of origin', '原产地证', '原產地證'],
      ['Export declaration', '出口报关单', '出口報關單'],
    ],
    process: [
      { title: ['Train and slot', '班列及舱位', '班列及艙位'], text: ['We book the container slot on the next suitable departure.', '为您预订最近合适班列的货柜舱位。', '為您預訂最近合適班列的貨櫃艙位。'] },
      { title: ['Drayage to the terminal', '短驳至站场', '短駁至站場'], text: ['Your container is trucked from the factory to the rail terminal.', '货柜由工厂经陆运短驳至铁路站场。', '貨櫃由工廠經陸運短駁至鐵路站場。'] },
      { title: ['Departure and border', '发车及过境', '發車及過境'], text: ['Customs and the rail border handover are handled on the way.', '途中办理海关手续及铁路口岸交接。', '途中辦理海關手續及鐵路口岸交接。'] },
      { title: ['Final mile', '末端派送', '末端派送'], text: ['Pickup at the destination station and delivery to your site.', '在目的站提柜并派送至您的地点。', '在目的站提櫃並派送至您的地點。'] },
    ],
  },
  customs: {
    lead: [
      'Export and import declarations on both sides of the border, done by our own customs team in Hong Kong and Shenzhen and by licensed partners in Southeast Asia. We classify your goods, apply for the free-trade certificates that cut duty, and keep the truck or container moving.',
      '由我们在香港及深圳的报关团队，以及东南亚持牌合作伙伴，办理口岸两侧的出口及进口申报。我们为货物归类、申请可降低关税的自贸协定证书，确保货车或货柜顺利通行。',
      '由我們在香港及深圳的報關團隊，以及東南亞持牌合作夥伴，辦理口岸兩側的出口及進口申報。我們為貨物歸類、申請可降低關稅的自貿協定證書，確保貨車或貨櫃順利通行。',
    ],
    cargo: [
      ['General cargo on any of our freight services', '使用我们任何货运服务的一般货物', '使用我們任何貨運服務的一般貨物'],
      ['Goods that need an import licence or permit', '需要进口许可证的货物', '需要進口許可證的貨物'],
      ['Food, cosmetics and health products', '食品、化妆品及保健品', '食品、化妝品及保健品'],
      ['Dangerous goods with full documentation', '文件齐全的危险品', '文件齊全的危險品'],
    ],
    transit: [
      { lane: ['Hong Kong export declaration', '香港出口申报', '香港出口申報'], time: ['Same day', '当天', '即日'] },
      { lane: ['Mainland China export clearance', '中国内地出口清关', '中國內地出口清關'], time: ['1 working day', '1 个工作日', '1 個工作日'] },
      { lane: ['Southeast Asia import clearance', '东南亚进口清关', '東南亞進口清關'], time: ['1–3 working days', '1–3 个工作日', '1–3 個工作日'] },
      { lane: ['Form E / RCEP certificate', 'Form E / RCEP 证书', 'Form E / RCEP 證書'], time: ['1–2 working days', '1–2 个工作日', '1–2 個工作日'] },
    ],
    transitNote: ['With complete documents. Inspections or permits can add time.', '以文件齐全为准，如遇查验或需许可证则需更长时间。', '以文件齊全為準，如遇查驗或需許可證則需更長時間。'],
    routes: [
      ['Hong Kong: air, sea and land control points', '香港：空运、海运及陆路管制站', '香港：空運、海運及陸路管制站'],
      ['Shenzhen: Shenzhen Bay, Huanggang, Yantian and Shekou', '深圳：深圳湾、皇岗、盐田及蛇口', '深圳：深圳灣、皇崗、鹽田及蛇口'],
      ['Southeast Asia: import clearance in Vietnam, Thailand, Malaysia and Singapore', '东南亚：越南、泰国、马来西亚及新加坡进口清关', '東南亞：越南、泰國、馬來西亞及新加坡進口清關'],
    ],
    documents: [
      ['Commercial invoice and packing list', '商业发票及装箱单', '商業發票及裝箱單'],
      ['HS code for each product (we can classify it)', '每项产品的 HS 编码（可由我们归类）', '每項產品的 HS 編碼（可由我們歸類）'],
      ['Certificate of origin: Form E or RCEP', '原产地证：Form E 或 RCEP', '原產地證：Form E 或 RCEP'],
      ['Import licence or permit, where the goods need one', '如货物需要，提供进口许可证', '如貨物需要，提供進口許可證'],
    ],
    process: [
      { title: ['Document check', '文件审核', '文件審核'], text: ['We review the invoice, packing list and HS codes before the goods move.', '货物发运前审核发票、装箱单及 HS 编码。', '貨物發運前審核發票、裝箱單及 HS 編碼。'] },
      { title: ['Duty planning', '关税规划', '關稅規劃'], text: ['We check which free-trade agreement lowers your duty and apply for it.', '确认可降低关税的自贸协定并代为申请。', '確認可降低關稅的自貿協定並代為申請。'] },
      { title: ['Declaration', '申报', '申報'], text: ['Export and import declarations filed electronically, ahead of arrival.', '在货物抵达前以电子方式提交出口及进口申报。', '在貨物抵達前以電子方式提交出口及進口申報。'] },
      { title: ['Release', '放行', '放行'], text: ['Customs release is posted in tracking, with duty and tax receipts.', '海关放行信息同步至追踪系统，并附税费单据。', '海關放行資訊同步至追蹤系統，並附稅費單據。'] },
    ],
  },
  warehouse: {
    lead: [
      'Consolidation in Shenzhen before export, and storage, pick-and-pack and last-mile delivery in Southeast Asia through partner warehouses. Send stock from several suppliers to one address; we combine it into one shipment and deliver it to your customers or stores.',
      '出口前在深圳集货，并通过合作伙伴仓库在东南亚提供仓储、拣货包装及末端派送。多家供应商的货物可送至同一地址，我们合并为一票出货，再派送给您的客户或门店。',
      '出口前在深圳集貨，並通過合作夥伴倉庫在東南亞提供倉儲、揀貨包裝及末端派送。多家供應商的貨物可送至同一地址，我們合併為一票出貨，再派送給您的客戶或門店。',
    ],
    cargo: [
      ['E-commerce stock with many SKUs', '多 SKU 的电商库存', '多 SKU 的電商庫存'],
      ['Retail replenishment for stores', '门店零售补货', '門店零售補貨'],
      ['Spare parts held near the customer', '靠近客户存放的备件', '靠近客戶存放的備件'],
      ['B2B pallets waiting for onward delivery', '待转运的 B2B 托盘货物', '待轉運的 B2B 卡板貨物'],
    ],
    transit: [
      { lane: ['Shenzhen consolidation to dispatch', '深圳集货至出货', '深圳集貨至出貨'], time: ['2–4 days', '2–4 天', '2–4 天'] },
      { lane: ['Inbound received and on the shelf', '入库上架', '入庫上架'], time: ['24–48 hours', '24–48 小时', '24–48 小時'] },
      { lane: ['Order picked and packed', '订单拣货包装', '訂單揀貨包裝'], time: ['Same day', '当天', '即日'] },
      { lane: ['Last-mile delivery in a capital city', '首都城市末端派送', '首都城市末端派送'], time: ['1–3 days', '1–3 天', '1–3 天'] },
    ],
    transitNote: ['For orders received before the daily cut-off.', '以每日截单时间前收到的订单为准。', '以每日截單時間前收到的訂單為準。'],
    routes: [
      ['Shenzhen: consolidation warehouse for export', '深圳：出口集货仓库', '深圳：出口集貨倉庫'],
      ['Hong Kong: transit storage and cross-docking', '香港：中转仓储及越库作业', '香港：中轉倉儲及越庫作業'],
      ['Partner warehouses in Singapore, Bangkok and Ho Chi Minh City', '新加坡、曼谷及胡志明市合作伙伴仓库', '新加坡、曼谷及胡志明市合作夥伴倉庫'],
    ],
    documents: [
      ['Advance shipping notice or packing list', '预先发货通知或装箱单', '預先發貨通知或裝箱單'],
      ['SKU list with barcodes', '附条码的 SKU 清单', '附條碼的 SKU 清單'],
      ['Delivery orders for each outbound shipment', '每票出货的派送单', '每票出貨的派送單'],
    ],
    process: [
      { title: ['Receive', '收货', '收貨'], text: ['Cartons are counted, checked for damage and scanned in.', '清点纸箱数量、检查破损并扫描入库。', '清點紙箱數量、檢查破損並掃描入庫。'] },
      { title: ['Store', '存储', '存儲'], text: ['Stock is put away by SKU and shown in your inventory report.', '按 SKU 上架存放，并显示在库存报表中。', '按 SKU 上架存放，並顯示在庫存報表中。'] },
      { title: ['Pick and pack', '拣货包装', '揀貨包裝'], text: ['Orders are picked, packed and labelled the day they arrive.', '订单当天完成拣货、包装及贴标。', '訂單即日完成揀貨、包裝及貼標。'] },
      { title: ['Deliver', '派送', '派送'], text: ['Handed to the last-mile carrier with a tracking number.', '交予末端派送商并提供追踪号码。', '交予末端派送商並提供追蹤號碼。'] },
    ],
  },
  insurance: {
    lead: [
      'All-risks cargo insurance for every mode we move, arranged before departure and priced on the value of your goods. If something is lost or damaged, we handle the survey and the claim with the insurer for you.',
      '为我们承运的各类运输方式提供一切险货运保险，于发运前安排，按货值计算保费。如货物遗失或损坏，由我们代您与保险公司处理查勘及理赔。',
      '為我們承運的各類運輸方式提供一切險貨運保險，於發運前安排，按貨值計算保費。如貨物遺失或損壞，由我們代您與保險公司處理查勘及理賠。',
    ],
    cargo: [
      ['General cargo on sea, air, road and rail', '海运、空运、陆运及铁路的一般货物', '海運、空運、陸運及鐵路的一般貨物'],
      ['High-value electronics and goods prone to theft', '高价值电子产品及易失窃货物', '高價值電子產品及易失竊貨物'],
      ['Project cargo and machinery', '项目货物及机械', '項目貨物及機械'],
      ['Temperature-controlled goods (spoilage cover on request)', '温控货物（可按需加保变质险）', '溫控貨物（可按需加保變質險）'],
    ],
    transit: [
      { lane: ['Cover confirmed', '确认承保', '確認承保'], time: ['Before departure', '发运前', '發運前'] },
      { lane: ['Certificate issued', '签发保险凭证', '簽發保險憑證'], time: ['Same day', '当天', '即日'] },
      { lane: ['Survey after a loss', '损失后查勘', '損失後查勘'], time: ['2–5 working days', '2–5 个工作日', '2–5 個工作日'] },
    ],
    transitNote: ['Cover must be in place before the goods leave; it cannot be added after a loss.', '保险须在货物发运前生效，发生损失后无法补保。', '保險須在貨物發運前生效，發生損失後無法補保。'],
    routes: [
      ['Every lane in our network, door to door', '覆盖我们网络内所有线路，门到门承保', '覆蓋我們網絡內所有線路，門到門承保'],
      ['Warehouse storage periods on request', '可按需承保仓储期间', '可按需承保倉儲期間'],
    ],
    documents: [
      ['Commercial invoice (sets the insured value)', '商业发票（作为保险金额依据）', '商業發票（作為保險金額依據）'],
      ['Packing list', '装箱单', '裝箱單'],
      ['Transport document: bill of lading or air waybill', '运输单据：提单或空运提单', '運輸單據：提單或空運提單'],
      ['For a claim: photos, survey report and delivery note', '理赔时：照片、查勘报告及签收单', '理賠時：照片、查勘報告及簽收單'],
    ],
    process: [
      { title: ['Declare the value', '申报货值', '申報貨值'], text: ['Tell us the invoice value when you book the shipment.', '订舱时告知发票金额。', '訂艙時告知發票金額。'] },
      { title: ['Cover in place', '保险生效', '保險生效'], text: ['We confirm the premium and issue the certificate before departure.', '确认保费并于发运前签发保险凭证。', '確認保費並於發運前簽發保險憑證。'] },
      { title: ['Report a loss', '报告损失', '報告損失'], text: ['Note any damage on the delivery receipt and send us photos.', '在签收单上注明损坏情况并发送照片给我们。', '在簽收單上註明損壞情況並發送照片給我們。'] },
      { title: ['Claim settled', '理赔结案', '理賠結案'], text: ['We arrange the survey and follow the claim through to payment.', '我们安排查勘并跟进理赔直至赔付。', '我們安排查勘並跟進理賠直至賠付。'] },
    ],
  },
};

export type SolutionDetail = {
  lead: Copy;
  cargo: Copy[];
  challenges: Step[];
  approach: Step[];
  services: string[];
};

export const solutionDetails: Record<string, SolutionDetail> = {
  electronics: {
    lead: [
      'Phones, components, servers and accessories made in South China and sold across Southeast Asia. The cargo is valuable, often carries lithium batteries and has short product cycles, so a late or lost shipment costs more than the freight.',
      '在华南生产、销往东南亚的手机、零部件、服务器及配件。这类货物价值高、常含锂电池且产品周期短，延误或遗失的损失远超运费。',
      '在華南生產、銷往東南亞的手機、零部件、伺服器及配件。這類貨物價值高、常含鋰電池且產品週期短，延誤或遺失的損失遠超運費。',
    ],
    cargo: [
      ['Semiconductors and components', '半导体及零部件', '半導體及零部件'],
      ['Phones, laptops and accessories', '手机、笔记本电脑及配件', '手機、筆記本電腦及配件'],
      ['Servers and networking equipment', '服务器及网络设备', '伺服器及網絡設備'],
      ['Products with lithium batteries', '含锂电池产品', '含鋰電池產品'],
    ],
    challenges: [
      { title: ['High value, high theft risk', '价值高、失窃风险高', '價值高、失竊風險高'], text: ['A single pallet can be worth more than the truck carrying it.', '一个托盘的价值可能高于承运货车。', '一個卡板的價值可能高於承運貨車。'] },
      { title: ['Battery rules', '电池运输规定', '電池運輸規定'], text: ['Lithium batteries need the right packing, labels and test reports to fly.', '锂电池须符合包装、标签及测试报告要求方可空运。', '鋰電池須符合包裝、標籤及測試報告要求方可空運。'] },
      { title: ['Launch dates', '上市日期', '上市日期'], text: ['Stock that arrives after a launch sells at a discount.', '新品上市后才到货的库存只能折价销售。', '新品上市後才到貨的庫存只能折價銷售。'] },
    ],
    approach: [
      { title: ['Sealed, tracked moves', '封签及全程追踪', '封簽及全程追蹤'], text: ['Seal numbers checked at every handover and trucks tracked from the factory to the airport.', '每次交接核对封条号码，货车由工厂至机场全程追踪。', '每次交接核對封條號碼，貨車由工廠至機場全程追蹤。'] },
      { title: ['Battery paperwork done first', '提前备妥电池文件', '提前備妥電池文件'], text: ['We check MSDS, UN38.3 and packing before booking, so cargo is not rejected at the airport.', '订舱前审核 MSDS、UN38.3 及包装，避免货物在机场被拒收。', '訂艙前審核 MSDS、UN38.3 及包裝，避免貨物在機場被拒收。'] },
      { title: ['Air for launches, sea for refills', '新品空运、补货海运', '新品空運、補貨海運'], text: ['Launch stock flies; steady replenishment moves by sea or road to keep the cost down.', '上市库存走空运，常规补货走海运或陆运以控制成本。', '上市庫存走空運，常規補貨走海運或陸運以控制成本。'] },
    ],
    services: ['air', 'sea', 'customs', 'insurance'],
  },
  'auto-machinery': {
    lead: [
      'Auto parts, production lines and heavy machinery moving between Chinese suppliers and assembly plants in Thailand, Vietnam, Malaysia and Indonesia. Parts must arrive in time for the line, and machines are often too big for a standard container.',
      '在中国供应商与泰国、越南、马来西亚及印尼装配厂之间运输汽车零部件、生产线及重型机械。零部件须准时送达生产线，而机械往往超出标准货柜尺寸。',
      '在中國供應商與泰國、越南、馬來西亞及印尼裝配廠之間運輸汽車零部件、生產線及重型機械。零部件須準時送達生產線，而機械往往超出標準貨櫃尺寸。',
    ],
    cargo: [
      ['Auto parts and components', '汽车零部件', '汽車零部件'],
      ['Production lines and moulds', '生产线及模具', '生產線及模具'],
      ['Construction and industrial machinery', '工程及工业机械', '工程及工業機械'],
      ['Vehicles and EV batteries', '整车及电动车电池', '整車及電動車電池'],
    ],
    challenges: [
      { title: ['Line-down risk', '停线风险', '停線風險'], text: ['One missing part can stop an assembly line.', '缺少一个零件就可能导致装配线停工。', '缺少一個零件就可能導致裝配線停工。'] },
      { title: ['Out-of-gauge cargo', '超限货物', '超限貨物'], text: ['Machines that are too tall or wide for a standard container.', '机械过高或过宽，无法装入标准货柜。', '機械過高或過闊，無法裝入標準貨櫃。'] },
      { title: ['Duty on parts', '零部件关税', '零部件關稅'], text: ['The wrong HS code on a part can double the import duty.', '零件 HS 编码有误可能令进口关税翻倍。', '零件 HS 編碼有誤可能令進口關稅翻倍。'] },
    ],
    approach: [
      { title: ['Scheduled parts runs', '定期零部件班车', '定期零部件班車'], text: ['Regular trucking and rail departures timed to the plant’s production plan.', '按工厂生产计划安排定期陆运及铁路发运。', '按工廠生產計劃安排定期陸運及鐵路發運。'] },
      { title: ['Flat racks and open tops', '框架箱及开顶箱', '框架櫃及開頂櫃'], text: ['Oversized machines move on special equipment, with lifting and lashing plans.', '超大型机械使用特种柜运输，并制定吊装及绑扎方案。', '超大型機械使用特種櫃運輸，並制定吊裝及綁紮方案。'] },
      { title: ['Classification and FTA duty savings', '归类及自贸协定减税', '歸類及自貿協定減稅'], text: ['Our customs team classifies each part and applies Form E or RCEP.', '报关团队为每个零件归类，并申请 Form E 或 RCEP。', '報關團隊為每個零件歸類，並申請 Form E 或 RCEP。'] },
    ],
    services: ['road', 'rail', 'sea', 'customs'],
  },
  ecommerce: {
    lead: [
      'First-mile logistics for online sellers shipping from China to Shopee, Lazada, TikTok Shop and their own stores in Southeast Asia. We collect from many suppliers, consolidate, clear customs and deliver to overseas warehouses or straight to buyers.',
      '为从中国发货至东南亚 Shopee、Lazada、TikTok Shop 及独立站的卖家提供头程物流。我们从多家供应商收货、集货、清关，并送至海外仓或直接派送给买家。',
      '為從中國發貨至東南亞 Shopee、Lazada、TikTok Shop 及獨立站的賣家提供頭程物流。我們從多家供應商收貨、集貨、清關，並送至海外倉或直接派送給買家。',
    ],
    cargo: [
      ['Fashion, beauty and home goods', '时装、美妆及家居用品', '時裝、美妝及家居用品'],
      ['Small electronics and accessories', '小型电子产品及配件', '小型電子產品及配件'],
      ['Bulk stock for overseas warehouses', '发往海外仓的批量库存', '發往海外倉的批量庫存'],
      ['Returns coming back for repair or resale', '退回维修或转售的退货', '退回維修或轉售的退貨'],
    ],
    challenges: [
      { title: ['Many suppliers, many SKUs', '供应商多、SKU 多', '供應商多、SKU 多'], text: ['Stock arrives from a dozen factories in different quantities.', '库存来自十几家工厂，数量各不相同。', '庫存來自十幾家工廠，數量各不相同。'] },
      { title: ['Sales peaks', '销售高峰', '銷售高峰'], text: ['11.11 and 12.12 need stock in the country weeks before the sale.', '双十一及双十二需提前数周将库存运抵目的国。', '雙十一及雙十二需提前數週將庫存運抵目的國。'] },
      { title: ['Marketplace rules', '平台规则', '平台規則'], text: ['Each platform has its own labelling and warehouse booking rules.', '每个平台都有各自的贴标及入仓预约规定。', '每個平台都有各自的貼標及入倉預約規定。'] },
    ],
    approach: [
      { title: ['Consolidation in Shenzhen', '深圳集货', '深圳集貨'], text: ['Suppliers deliver to our warehouse; we check, label and combine the stock.', '供应商送货至我们的仓库，由我们验货、贴标及合并。', '供應商送貨至我們的倉庫，由我們驗貨、貼標及合併。'] },
      { title: ['Mode by urgency', '按时效选择运输方式', '按時效選擇運輸方式'], text: ['Air for fast sellers, road and sea for bulk replenishment before peaks.', '畅销品走空运，大促前批量补货走陆运及海运。', '暢銷品走空運，大促前批量補貨走陸運及海運。'] },
      { title: ['Warehouse and last mile', '海外仓及末端派送', '海外倉及末端派送'], text: ['Inbound to marketplace or partner warehouses, then pick, pack and deliver.', '送入平台仓或合作仓库，再完成拣货、包装及派送。', '送入平台倉或合作倉庫，再完成揀貨、包裝及派送。'] },
    ],
    services: ['warehouse', 'air', 'road', 'customs'],
  },
  'fmcg-cold-chain': {
    lead: [
      'Food, drinks, cosmetics and other fast-moving consumer goods, including chilled and frozen products. Temperature, shelf life and import permits decide whether the goods can be sold on arrival.',
      '食品、饮料、化妆品等快消品，包括冷藏及冷冻产品。温度、保质期及进口许可决定货物到港后能否上架销售。',
      '食品、飲料、化妝品等快消品，包括冷藏及冷凍產品。溫度、保質期及進口許可決定貨物到港後能否上架銷售。',
    ],
    cargo: [
      ['Fresh fruit and vegetables', '新鲜水果及蔬菜', '新鮮水果及蔬菜'],
      ['Frozen meat and seafood', '冷冻肉类及海鲜', '冷凍肉類及海鮮'],
      ['Packaged food and drinks', '包装食品及饮料', '包裝食品及飲料'],
      ['Cosmetics and personal care', '化妆品及个人护理用品', '化妝品及個人護理用品'],
    ],
    challenges: [
      { title: ['Temperature', '温度控制', '溫度控制'], text: ['A few hours out of range can spoil a container of fruit.', '偏离温度范围数小时便可能令整柜水果变质。', '偏離溫度範圍數小時便可能令整櫃水果變質。'] },
      { title: ['Shelf life', '保质期', '保質期'], text: ['Retailers reject stock with too little shelf life left.', '剩余保质期过短的货物会被零售商拒收。', '剩餘保質期過短的貨物會被零售商拒收。'] },
      { title: ['Permits and certificates', '许可证及证书', '許可證及證書'], text: ['Food imports need health certificates and registrations.', '食品进口需要卫生证书及注册登记。', '食品進口需要衛生證書及註冊登記。'] },
    ],
    approach: [
      { title: ['Reefers and data loggers', '冷藏柜及温度记录仪', '冷藏櫃及溫度記錄儀'], text: ['Reefer containers and temperature-controlled trucks with a logged temperature record.', '使用冷藏货柜及温控货车，全程记录温度数据。', '使用冷藏貨櫃及溫控貨車，全程記錄溫度數據。'] },
      { title: ['The fastest lane that fits', '选择最快的合适线路', '選擇最快的合適線路'], text: ['Road to Vietnam and Thailand, sea or air to the islands, to protect shelf life.', '越南及泰国走陆运，海岛国家走海运或空运，以保障保质期。', '越南及泰國走陸運，海島國家走海運或空運，以保障保質期。'] },
      { title: ['Documents before departure', '发运前备妥文件', '發運前備妥文件'], text: ['Health certificates, labels and import permits checked before the goods leave.', '发运前核对卫生证书、标签及进口许可证。', '發運前核對衛生證書、標籤及進口許可證。'] },
    ],
    services: ['road', 'sea', 'customs', 'warehouse'],
  },
  'project-logistics': {
    lead: [
      'Plant equipment, energy projects and infrastructure cargo that has to reach a site in a set order and on a set date. We plan the route, the lifting and the paperwork for cargo that does not fit the usual rules.',
      '需按既定顺序及日期运抵现场的厂房设备、能源项目及基建货物。我们为不符合常规的货物规划路线、吊装及文件。',
      '需按既定順序及日期運抵現場的廠房設備、能源項目及基建貨物。我們為不符合常規的貨物規劃路線、吊裝及文件。',
    ],
    cargo: [
      ['Wind and solar equipment', '风电及光伏设备', '風電及光伏設備'],
      ['Factory and production-line relocations', '工厂及生产线搬迁', '工廠及生產線搬遷'],
      ['Steel structures and pre-fabricated modules', '钢结构及预制模块', '鋼結構及預製模組'],
      ['Transformers, generators and heavy lifts', '变压器、发电机及重吊货物', '變壓器、發電機及重吊貨物'],
    ],
    challenges: [
      { title: ['Size and weight', '尺寸及重量', '尺寸及重量'], text: ['Cargo that needs route surveys, permits and escorts.', '货物需要路线勘察、通行许可及护送。', '貨物需要路線勘察、通行許可及護送。'] },
      { title: ['Many suppliers', '供应商众多', '供應商眾多'], text: ['Parts of one project ship from several factories at once.', '同一项目的部件同时从多家工厂发出。', '同一項目的部件同時從多家工廠發出。'] },
      { title: ['Site deadlines', '现场工期', '現場工期'], text: ['Cranes and crews are booked for a date; late cargo costs money every day.', '吊机及施工队按日期预约，货物延误每天都在增加成本。', '吊機及施工隊按日期預約，貨物延誤每天都在增加成本。'] },
    ],
    approach: [
      { title: ['Route survey and lift plan', '路线勘察及吊装方案', '路線勘察及吊裝方案'], text: ['We check bridges, roads and ports, and plan every lift before shipping.', '发运前勘察桥梁、道路及港口，并制定每次吊装方案。', '發運前勘察橋樑、道路及港口，並制定每次吊裝方案。'] },
      { title: ['One schedule for all suppliers', '统一协调所有供应商', '統一協調所有供應商'], text: ['Shipments from each factory are consolidated and sequenced for the site.', '整合各工厂的货物，并按现场需要安排到货顺序。', '整合各工廠的貨物，並按現場需要安排到貨順序。'] },
      { title: ['Breakbulk and heavy-lift options', '散杂货及重吊方案', '散雜貨及重吊方案'], text: ['Flat racks, breakbulk vessels and specialist trucks, chosen per piece.', '按每件货物选择框架箱、散杂货船或特种车辆。', '按每件貨物選擇框架櫃、散雜貨船或特種車輛。'] },
    ],
    services: ['sea', 'road', 'customs', 'insurance'],
  },
};

export const aboutContent = {
  story: [
    [
      'Magni Technology Limited is a Hong Kong logistics company that moves cargo for manufacturers, traders and online sellers between China and Southeast Asia. We started with cross-border trucking between Shenzhen and Hong Kong and grew lane by lane into sea, air, rail, customs and warehousing.',
      'Magni Technology Limited 是一家香港物流公司，为制造商、贸易商及电商卖家提供中国与东南亚之间的货运服务。我们由深港跨境陆运起步，逐步拓展至海运、空运、铁路、报关及仓储。',
      'Magni Technology Limited 是一家香港物流公司，為製造商、貿易商及電商賣家提供中國與東南亞之間的貨運服務。我們由深港跨境陸運起步，逐步拓展至海運、空運、鐵路、報關及倉儲。',
    ] as Copy,
    [
      'Our operations desk in Hong Kong plans every shipment and stays with it to delivery. Customers deal with one team that knows their cargo, instead of a different agent at every border.',
      '香港运营中心负责规划每一票货物，并全程跟进至交付。客户只需对接一个熟悉其货物的团队，而非在每个口岸面对不同的代理。',
      '香港營運中心負責規劃每一票貨物，並全程跟進至交付。客戶只需對接一個熟悉其貨物的團隊，而非在每個口岸面對不同的代理。',
    ] as Copy,
  ],
  // DRAFT MILESTONES: placeholder years and events, to be replaced with the client's real history
  timeline: [
    { year: '2014', title: ['Founded in Hong Kong', '于香港成立', '於香港成立'] as Copy, text: ['Cross-border trucking between Shenzhen and Hong Kong.', '开展深港跨境陆运业务。', '開展深港跨境陸運業務。'] as Copy },
    { year: '2016', title: ['Shenzhen warehouse opens', '深圳仓库启用', '深圳倉庫啟用'] as Copy, text: ['Consolidation for LCL and multi-supplier orders.', '为拼箱及多供应商订单提供集货服务。', '為拼箱及多供應商訂單提供集貨服務。'] as Copy },
    { year: '2018', title: ['Sea and air freight', '开展海运及空运', '開展海運及空運'] as Copy, text: ['FCL, LCL and air services to Southeast Asia.', '推出至东南亚的整柜、拼箱及空运服务。', '推出至東南亞的整櫃、拼箱及空運服務。'] as Copy },
    { year: '2020', title: ['Customs team', '组建报关团队', '組建報關團隊'] as Copy, text: ['In-house declarations in Hong Kong and Shenzhen.', '在香港及深圳自行办理报关。', '在香港及深圳自行辦理報關。'] as Copy },
    { year: '2022', title: ['Overland to ASEAN and rail', '东盟陆运及铁路', '東盟陸運及鐵路'] as Copy, text: ['Trucking to Vietnam and Thailand; China–Laos Railway service.', '开通至越南及泰国的陆运，以及中老铁路服务。', '開通至越南及泰國的陸運，以及中老鐵路服務。'] as Copy },
    { year: '2026', title: ['Regional network', '区域网络', '區域網絡'] as Copy, text: ['Partner offices and gateways in Singapore, Bangkok and Ho Chi Minh City.', '在新加坡、曼谷及胡志明市设立合作伙伴办公室及门户。', '在新加坡、曼谷及胡志明市設立合作夥伴辦公室及門戶。'] as Copy },
  ],
  values: [
    { title: ['Take ownership', '主动担当', '主動擔當'] as Copy, text: ['One person owns your shipment from booking to delivery and answers for it.', '由专人负责您的货物，从订舱到交付全程跟进。', '由專人負責您的貨物，從訂艙到交付全程跟進。'] as Copy },
    { title: ['Communicate early', '及时沟通', '及時溝通'] as Copy, text: ['You hear about a delay when we see it, with the fix, not after the ETA has passed.', '一旦发现延误便即时通知并提供解决方案，而非等到预计到达时间过后。', '一旦發現延誤便即時通知並提供解決方案，而非等到預計到達時間過後。'] as Copy },
    { title: ['Solve practically', '务实解决', '務實解決'] as Copy, text: ['We pick the route that works for your cargo and budget, not the one that suits us.', '按您的货物及预算选择合适路线，而非对我们最方便的方案。', '按您的貨物及預算選擇合適路線，而非對我們最方便的方案。'] as Copy },
  ],
};
