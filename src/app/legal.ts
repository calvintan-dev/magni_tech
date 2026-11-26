/*
  Legal pages: Privacy Policy, Terms of Service and Standard Trading Conditions, in English,
  Simplified and Traditional Chinese.

  STANDARD TEMPLATE, drafted with AI as a starting point for a Hong Kong freight forwarder.
  It is not legal advice. Magni should have it reviewed by a Hong Kong lawyer and adjust the
  figures (liability limits, time limits, payment terms) and contact details before relying on it.
*/
import type { Copy } from './content';

export type LegalSection = { title: Copy; paragraphs: Copy[] };
export type LegalPage = { id: string; name: Copy; intro: Copy; updated: Copy; sections: LegalSection[] };

const UPDATED: Copy = ['Last updated: 26 November 2026', '最后更新：2026年11月26日', '最後更新：2026年11月26日'];
const EMAIL = 'janesong@magnibuys.com'; // same as the site's contact email

export const legalPages: LegalPage[] = [
  {
    id: 'privacy',
    name: ['Privacy Policy', '隐私政策', '私隱政策'],
    intro: [
      'How Magni Technology Limited collects, uses, shares and protects your personal data, in line with the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong.',
      'Magni Technology Limited 如何按照香港《个人资料（私隐）条例》（第486章）收集、使用、披露及保护您的个人资料。',
      'Magni Technology Limited 如何按照香港《個人資料（私隱）條例》（第486章）收集、使用、披露及保障您的個人資料。',
    ],
    updated: UPDATED,
    sections: [
      {
        title: ['1. Who we are', '1. 关于我们', '1. 關於我們'],
        paragraphs: [
          ['Magni Technology Limited ("Magni", "we", "us") is a logistics company registered in Hong Kong. We are the data user responsible for the personal data described in this policy.', 'Magni Technology Limited（下称"Magni"或"我们"）是一家在香港注册的物流公司，是本政策所述个人资料的资料使用者。', 'Magni Technology Limited（下稱「Magni」或「我們」）是一家在香港註冊的物流公司，是本政策所述個人資料的資料使用者。'],
        ],
      },
      {
        title: ['2. Personal data we collect', '2. 我们收集的个人资料', '2. 我們收集的個人資料'],
        paragraphs: [
          ['When you request a quote, contact us or book a shipment, we collect your name, company, job title, email address or phone number, and the shipment details you give us, such as origin, destination, cargo description and consignee details.', '当您询价、联系我们或预订货运时，我们会收集您的姓名、公司、职位、电邮地址或电话号码，以及您提供的货运资料，例如起运地、目的地、货物描述及收货人资料。', '當您詢價、聯絡我們或預訂貨運時，我們會收集您的姓名、公司、職位、電郵地址或電話號碼，以及您提供的貨運資料，例如起運地、目的地、貨物描述及收貨人資料。'],
          ['When you use the tracking page, we use the shipment or booking number you enter only to show its status.', '使用追踪页面时，您输入的运单或订舱编号只会用于显示货物状态。', '使用追蹤頁面時，您輸入的運單或訂艙編號只會用於顯示貨物狀態。'],
        ],
      },
      {
        title: ['3. How we use it', '3. 资料用途', '3. 資料用途'],
        paragraphs: [
          ['We use your personal data to answer enquiries, prepare quotations, arrange and track shipments, complete customs declarations, issue invoices, keep business records and meet our legal and regulatory duties.', '我们使用您的个人资料以回复查询、准备报价、安排及追踪货运、办理报关、开具发票、保存业务记录，并履行法律及监管责任。', '我們使用您的個人資料以回覆查詢、準備報價、安排及追蹤貨運、辦理報關、開具發票、保存業務記錄，並履行法律及監管責任。'],
          ['We will only send you marketing messages if you agree to receive them, and you can opt out at any time.', '我们只会在您同意后向您发送推广信息，您可随时取消订阅。', '我們只會在您同意後向您發送推廣訊息，您可隨時取消訂閱。'],
        ],
      },
      {
        title: ['4. Who we share it with', '4. 资料披露对象', '4. 資料披露對象'],
        paragraphs: [
          ['To move your cargo, we share the necessary details with carriers, shipping lines, airlines, trucking companies, warehouses, customs brokers, insurers and our overseas partner agents, and with customs and other government authorities where the law requires it.', '为运送您的货物，我们会向承运人、船公司、航空公司、运输公司、仓库、报关行、保险公司及海外合作代理提供所需资料，并在法律要求时提供予海关及其他政府部门。', '為運送您的貨物，我們會向承運人、船公司、航空公司、運輸公司、倉庫、報關行、保險公司及海外合作代理提供所需資料，並在法律要求時提供予海關及其他政府部門。'],
          ['Some of these parties are outside Hong Kong, for example in Mainland China and Southeast Asia, so your data may be transferred there. We only share what each party needs for the shipment. We do not sell personal data.', '部分对象位于香港以外，例如中国内地及东南亚，因此您的资料可能会转移至当地。我们只会提供各方处理货运所需的资料，绝不出售个人资料。', '部分對象位於香港以外，例如中國內地及東南亞，因此您的資料可能會轉移至當地。我們只會提供各方處理貨運所需的資料，絕不出售個人資料。'],
        ],
      },
      {
        title: ['5. How long we keep it', '5. 资料保存期限', '5. 資料保存期限'],
        paragraphs: [
          ['We keep shipment and billing records for seven years to meet Hong Kong tax and accounting rules. Enquiries that do not lead to a shipment are deleted after two years.', '为符合香港税务及会计规定，货运及账单记录会保存七年。未有成交的查询资料会在两年后删除。', '為符合香港稅務及會計規定，貨運及賬單記錄會保存七年。未有成交的查詢資料會在兩年後刪除。'],
        ],
      },
      {
        title: ['6. Security', '6. 资料安全', '6. 資料安全'],
        paragraphs: [
          ['We protect personal data with access controls, password-protected systems and confidentiality obligations on our staff and partners. No system is completely secure, but we take reasonable steps to prevent unauthorised access, loss or misuse.', '我们以权限管理、密码保护系统及员工和合作伙伴的保密责任保护个人资料。虽然没有系统绝对安全，但我们会采取合理措施防止未经授权的查阅、遗失或滥用。', '我們以權限管理、密碼保護系統及員工和合作夥伴的保密責任保障個人資料。雖然沒有系統絕對安全，但我們會採取合理措施防止未經授權的查閱、遺失或濫用。'],
        ],
      },
      {
        title: ['7. Cookies and this website', '7. Cookies 及本网站', '7. Cookies 及本網站'],
        paragraphs: [
          ['This website stores your language choice in your browser so the site opens in the same language next time. We do not use advertising cookies. If we add analytics in the future, we will update this policy.', '本网站会在您的浏览器中保存语言选择，以便下次以相同语言显示。我们不使用广告 Cookies。如日后加入流量分析工具，我们会更新本政策。', '本網站會在您的瀏覽器中保存語言選擇，以便下次以相同語言顯示。我們不使用廣告 Cookies。如日後加入流量分析工具，我們會更新本政策。'],
        ],
      },
      {
        title: ['8. Your rights', '8. 您的权利', '8. 您的權利'],
        paragraphs: [
          ['Under the Ordinance you may ask whether we hold your personal data, request a copy of it and ask us to correct it. We may charge a reasonable fee for a data access request, as the Ordinance allows.', '根据条例，您有权查询我们是否持有您的个人资料、索取副本及要求更正。我们可按条例规定就查阅资料要求收取合理费用。', '根據條例，您有權查詢我們是否持有您的個人資料、索取副本及要求更正。我們可按條例規定就查閱資料要求收取合理費用。'],
          [`To make a request or ask about this policy, email ${EMAIL}.`, `如需提出要求或查询本政策，请电邮至 ${EMAIL}。`, `如需提出要求或查詢本政策，請電郵至 ${EMAIL}。`],
        ],
      },
      {
        title: ['9. Changes to this policy', '9. 政策修订', '9. 政策修訂'],
        paragraphs: [
          ['We may update this policy from time to time. The date at the top shows when it last changed.', '我们可能会不时更新本政策，页首日期为最后修订日期。', '我們可能會不時更新本政策，頁首日期為最後修訂日期。'],
        ],
      },
    ],
  },
  {
    id: 'terms',
    name: ['Terms of Service', '服务条款', '服務條款'],
    intro: [
      'The terms that apply when you use this website. By using the site you agree to them.',
      '使用本网站时适用的条款。您使用本网站即表示同意这些条款。',
      '使用本網站時適用的條款。您使用本網站即表示同意這些條款。',
    ],
    updated: UPDATED,
    sections: [
      {
        title: ['1. About these terms', '1. 条款简介', '1. 條款簡介'],
        paragraphs: [
          ['This website is operated by Magni Technology Limited, Hong Kong. These terms cover the use of the website only. Freight, customs, warehousing and other services are provided under our Standard Trading Conditions.', '本网站由香港 Magni Technology Limited 营运。本条款只适用于网站使用。货运、报关、仓储及其他服务均按我们的标准交易条款提供。', '本網站由香港 Magni Technology Limited 營運。本條款只適用於網站使用。貨運、報關、倉儲及其他服務均按我們的標準交易條款提供。'],
        ],
      },
      {
        title: ['2. Information on the website', '2. 网站资料', '2. 網站資料'],
        paragraphs: [
          ['Service descriptions, transit times and routes on this website are general information. Actual schedules depend on carriers, customs and conditions at the time of shipment, and are confirmed in each quotation.', '本网站上的服务说明、时效及线路仅为一般资料。实际时间取决于承运人、海关及发运时的情况，并以每次报价确认为准。', '本網站上的服務說明、時效及線路僅為一般資料。實際時間取決於承運人、海關及發運時的情況，並以每次報價確認為準。'],
        ],
      },
      {
        title: ['3. Quotes and bookings', '3. 报价及订舱', '3. 報價及訂艙'],
        paragraphs: [
          ['An enquiry sent through the website is not a booking and does not bind either party. A quotation is valid only when confirmed in writing by our team, for the period stated on it.', '经本网站提交的询价并非订舱，对双方均不具约束力。报价须经我们团队书面确认后方为有效，并以报价所列有效期为准。', '經本網站提交的詢價並非訂艙，對雙方均不具約束力。報價須經我們團隊書面確認後方為有效，並以報價所列有效期為準。'],
        ],
      },
      {
        title: ['4. Shipment tracking', '4. 货物追踪', '4. 貨物追蹤'],
        paragraphs: [
          ['Tracking information comes from our systems and those of carriers and partners. We update it as quickly as we can, but it may be delayed or incomplete and should not be relied on as the only record of a shipment.', '追踪资料来自我们及承运人和合作伙伴的系统。我们会尽快更新，但资料可能有所延迟或不完整，不应作为货物的唯一记录。', '追蹤資料來自我們及承運人和合作夥伴的系統。我們會盡快更新，但資料可能有所延誤或不完整，不應作為貨物的唯一記錄。'],
        ],
      },
      {
        title: ['5. Acceptable use', '5. 合理使用', '5. 合理使用'],
        paragraphs: [
          ['You may not use the website for anything unlawful, submit false information, try to gain unauthorised access to our systems, or interfere with the site working normally.', '您不得将本网站用于任何违法用途、提交虚假资料、尝试未经授权进入我们的系统，或干扰网站正常运作。', '您不得將本網站用於任何違法用途、提交虛假資料、嘗試未經授權進入我們的系統，或干擾網站正常運作。'],
        ],
      },
      {
        title: ['6. Intellectual property', '6. 知识产权', '6. 知識產權'],
        paragraphs: [
          ['The text, design and logo on this website belong to Magni Technology Limited. Photographs from third parties are used under their own licences, listed on the Photo credits page. You may not copy or reuse the content for commercial purposes without our written permission.', '本网站的文字、设计及标志均属 Magni Technology Limited 所有。第三方图片按其各自许可使用，详见图片来源页面。未经我们书面同意，不得复制或将内容作商业用途。', '本網站的文字、設計及標誌均屬 Magni Technology Limited 所有。第三方圖片按其各自授權使用，詳見圖片來源頁面。未經我們書面同意，不得複製或將內容作商業用途。'],
        ],
      },
      {
        title: ['7. Links to other websites', '7. 外部链接', '7. 外部連結'],
        paragraphs: [
          ['Links to other websites are provided for convenience. We are not responsible for their content or privacy practices.', '本网站提供的外部链接仅为方便用户，我们不对其内容或私隐措施负责。', '本網站提供的外部連結僅為方便用戶，我們不對其內容或私隱措施負責。'],
        ],
      },
      {
        title: ['8. Limitation of liability', '8. 责任限制', '8. 責任限制'],
        paragraphs: [
          ['The website is provided "as is". As far as the law allows, we are not liable for any loss arising from use of the website or reliance on its information. Nothing in these terms limits liability that cannot be limited under Hong Kong law.', '本网站按"现状"提供。在法律允许的范围内，我们对因使用本网站或依赖其资料而产生的任何损失概不负责。本条款不限制香港法律规定不可限制的责任。', '本網站按「現狀」提供。在法律允許的範圍內，我們對因使用本網站或依賴其資料而產生的任何損失概不負責。本條款不限制香港法律規定不可限制的責任。'],
        ],
      },
      {
        title: ['9. Changes and governing law', '9. 条款修订及适用法律', '9. 條款修訂及適用法律'],
        paragraphs: [
          ['We may update these terms at any time; the date at the top shows the latest version. These terms are governed by the laws of the Hong Kong Special Administrative Region, and the Hong Kong courts have exclusive jurisdiction.', '我们可随时更新本条款，页首日期为最新版本。本条款受香港特别行政区法律管辖，香港法院具有专属管辖权。', '我們可隨時更新本條款，頁首日期為最新版本。本條款受香港特別行政區法律管轄，香港法院具有專屬管轄權。'],
        ],
      },
    ],
  },
  {
    id: 'trading-terms',
    name: ['Standard Trading Conditions', '标准交易条款', '標準交易條款'],
    intro: [
      'The conditions under which Magni Technology Limited provides all freight forwarding, customs, warehousing and related services. Every quotation and booking is made on these conditions.',
      'Magni Technology Limited 提供所有货运代理、报关、仓储及相关服务时适用的条款。所有报价及订舱均以本条款为准。',
      'Magni Technology Limited 提供所有貨運代理、報關、倉儲及相關服務時適用的條款。所有報價及訂艙均以本條款為準。',
    ],
    updated: UPDATED,
    sections: [
      {
        title: ['1. Definitions', '1. 定义', '1. 定義'],
        paragraphs: [
          ['"Company" means Magni Technology Limited. "Customer" means any person who asks the Company to provide a service, and anyone acting for them. "Goods" means the cargo and any container, pallet or packaging supplied by the Customer.', '"本公司"指 Magni Technology Limited。"客户"指要求本公司提供服务的任何人士及其代表。"货物"指货物本身及客户提供的任何货柜、托盘或包装。', '「本公司」指 Magni Technology Limited。「客戶」指要求本公司提供服務的任何人士及其代表。「貨物」指貨物本身及客戶提供的任何貨櫃、卡板或包裝。'],
        ],
      },
      {
        title: ['2. Application', '2. 适用范围', '2. 適用範圍'],
        paragraphs: [
          ['These conditions apply to every service the Company provides, whether or not a charge is made. If they conflict with a law that cannot be excluded, that law prevails to the extent of the conflict.', '本条款适用于本公司提供的所有服务，不论是否收费。如本条款与不可排除的法律相抵触，则在抵触范围内以该法律为准。', '本條款適用於本公司提供的所有服務，不論是否收費。如本條款與不可排除的法律相抵觸，則在抵觸範圍內以該法律為準。'],
          ['When the Company issues its own bill of lading or air waybill, the terms of that document apply to the carriage it covers.', '如本公司签发自有提单或空运提单，该单据所涵盖的运输以其条款为准。', '如本公司簽發自有提單或空運提單，該單據所涵蓋的運輸以其條款為準。'],
        ],
      },
      {
        title: ['3. The Company as agent', '3. 本公司作为代理', '3. 本公司作為代理'],
        paragraphs: [
          ['Unless it issues its own transport document, the Company acts as the Customer\'s agent in arranging carriage, customs clearance, storage and insurance with third parties, and those services are subject to the third parties\' own terms.', '除非本公司签发自有运输单据，否则本公司是以客户代理的身份向第三方安排运输、清关、仓储及保险，相关服务受第三方本身的条款约束。', '除非本公司簽發自有運輸單據，否則本公司是以客戶代理的身份向第三方安排運輸、清關、倉儲及保險，相關服務受第三方本身的條款約束。'],
        ],
      },
      {
        title: ['4. Customer obligations', '4. 客户责任', '4. 客戶責任'],
        paragraphs: [
          ['The Customer guarantees that the description, weight, value, HS code and origin of the Goods are accurate, that the Goods are properly packed and marked, and that all licences and permits needed for export and import have been obtained.', '客户保证货物的描述、重量、价值、HS 编码及原产地准确无误，货物包装及标记妥当，并已取得出口及进口所需的所有许可证及批文。', '客戶保證貨物的描述、重量、價值、HS 編碼及原產地準確無誤，貨物包裝及標記妥當，並已取得出口及進口所需的所有許可證及批文。'],
          ['The Customer is responsible for any duties, taxes, fines, storage or other costs caused by inaccurate information or missing documents.', '因资料不准确或文件不全而产生的任何关税、税项、罚款、仓租或其他费用，概由客户承担。', '因資料不準確或文件不全而產生的任何關稅、稅項、罰款、倉租或其他費用，概由客戶承擔。'],
        ],
      },
      {
        title: ['5. Dangerous and special goods', '5. 危险品及特殊货物', '5. 危險品及特殊貨物'],
        paragraphs: [
          ['Dangerous goods, including lithium batteries, and goods that are perishable, temperature-controlled or of high value, must be declared in writing before booking. The Company may refuse, hold or dispose of undeclared dangerous goods at the Customer\'s cost.', '危险品（包括锂电池）以及易腐、温控或高价值货物，必须在订舱前以书面申报。对于未申报的危险品，本公司有权拒收、扣留或处置，费用由客户承担。', '危險品（包括鋰電池）以及易腐、溫控或高價值貨物，必須在訂艙前以書面申報。對於未申報的危險品，本公司有權拒收、扣留或處置，費用由客戶承擔。'],
        ],
      },
      {
        title: ['6. Quotations, charges and payment', '6. 报价、收费及付款', '6. 報價、收費及付款'],
        paragraphs: [
          ['Quotations are based on the information the Customer provides and on rates at the time of quoting. Carrier surcharges, currency changes and additional services may change the final charge.', '报价以客户提供的资料及报价时的费率为准。承运人附加费、汇率变动及额外服务可能会影响最终收费。', '報價以客戶提供的資料及報價時的費率為準。承運人附加費、匯率變動及額外服務可能會影響最終收費。'],
          ['Invoices are payable within 30 days of the invoice date unless otherwise agreed in writing. Charges are payable even if the Goods are lost or damaged in transit.', '除另有书面协议外，发票须于开票日起30天内付清。即使货物在运输途中遗失或损坏，有关费用仍须支付。', '除另有書面協議外，發票須於開票日起30天內付清。即使貨物在運輸途中遺失或損壞，有關費用仍須支付。'],
        ],
      },
      {
        title: ['7. Insurance', '7. 保险', '7. 保險'],
        paragraphs: [
          ['The Goods are not insured by the Company unless the Customer asks for cargo insurance in writing before shipment and pays the premium. Insurance is then arranged with an insurer on that insurer\'s terms.', '除非客户在发运前以书面要求购买货运保险并支付保费，否则本公司不会为货物投保。届时保险将按承保公司的条款安排。', '除非客戶在發運前以書面要求購買貨運保險並支付保費，否則本公司不會為貨物投保。屆時保險將按承保公司的條款安排。'],
        ],
      },
      {
        title: ['8. Liability limits', '8. 责任限额', '8. 責任限額'],
        paragraphs: [
          ['The Company is liable only for loss or damage caused by its own negligence. Its liability is limited to 2 Special Drawing Rights per kilogram of the gross weight of the Goods lost or damaged, and in any case to a maximum of 75,000 Special Drawing Rights per shipment, unless a higher value has been declared and agreed in writing.', '本公司只对因其本身疏忽而造成的损失或损坏负责，赔偿责任以遗失或损坏货物毛重每公斤2个特别提款权为限，每票货物最高以75,000个特别提款权为限，除非已以书面申报并同意较高价值。', '本公司只對因其本身疏忽而造成的損失或損壞負責，賠償責任以遺失或損壞貨物毛重每公斤2個特別提款權為限，每票貨物最高以75,000個特別提款權為限，除非已以書面申報並同意較高價值。'],
          ['The Company is not liable for indirect or consequential loss, such as loss of profit, loss of market or delay, or for loss caused by events beyond its control, including natural disasters, strikes, war, government action or the acts of carriers and authorities.', '本公司不对间接或相应损失（例如利润损失、市场损失或延误）负责，亦不对其无法控制的事件所造成的损失负责，包括自然灾害、罢工、战争、政府行为或承运人及当局的行为。', '本公司不對間接或相應損失（例如利潤損失、市場損失或延誤）負責，亦不對其無法控制的事件所造成的損失負責，包括自然災害、罷工、戰爭、政府行為或承運人及當局的行為。'],
        ],
      },
      {
        title: ['9. Claims and time limits', '9. 索赔及时限', '9. 索償及時限'],
        paragraphs: [
          ['Any visible loss or damage must be noted on the delivery receipt. Claims must be notified to the Company in writing within 14 days of delivery, or, if the Goods are not delivered, within 14 days of the date they should have been delivered.', '任何明显的损失或损坏须在签收单上注明。索赔须于交付后14天内，或如货物未能交付，于应交付日期后14天内，以书面通知本公司。', '任何明顯的損失或損壞須在簽收單上註明。索償須於交付後14天內，或如貨物未能交付，於應交付日期後14天內，以書面通知本公司。'],
          ['The Company is discharged from all liability unless legal proceedings are started within nine months of delivery or of the date the Goods should have been delivered.', '除非在交付日期或应交付日期后九个月内提出法律诉讼，否则本公司将免除所有责任。', '除非在交付日期或應交付日期後九個月內提出法律訴訟，否則本公司將免除所有責任。'],
        ],
      },
      {
        title: ['10. Lien', '10. 留置权', '10. 留置權'],
        paragraphs: [
          ['The Company has a lien on all Goods and documents in its possession for any amount the Customer owes, on this or any other shipment. If payment is not made within 30 days of notice, the Company may sell the Goods and use the proceeds to pay the debt and its costs.', '对于客户就本票或任何其他货物所欠的款项，本公司对其管有的所有货物及文件享有留置权。如在通知后30天内仍未付款，本公司可出售货物，并以所得款项清偿欠款及有关费用。', '對於客戶就本票或任何其他貨物所欠的款項，本公司對其管有的所有貨物及文件享有留置權。如在通知後30天內仍未付款，本公司可出售貨物，並以所得款項清償欠款及有關費用。'],
        ],
      },
      {
        title: ['11. Governing law', '11. 适用法律', '11. 適用法律'],
        paragraphs: [
          ['These conditions are governed by the laws of the Hong Kong Special Administrative Region, and any dispute will be decided by the Hong Kong courts. If any part of these conditions is found to be invalid, the rest remains in force.', '本条款受香港特别行政区法律管辖，任何争议由香港法院裁决。如本条款任何部分被裁定无效，其余部分仍然有效。', '本條款受香港特別行政區法律管轄，任何爭議由香港法院裁決。如本條款任何部分被裁定無效，其餘部分仍然有效。'],
        ],
      },
    ],
  },
];
