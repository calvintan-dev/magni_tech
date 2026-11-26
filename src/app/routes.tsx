import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router';
import { FormEvent, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MAP_HEIGHT, MAP_WIDTH, mapCountryLabels, mapLand, mapLocations, mapRoutes } from './networkMapData';
import { aboutContent, serviceDetails, solutionDetails } from './content';
import { legalPages } from './legal';

type Language = 'en' | 'zh-CN' | 'zh-HK';
type Copy = [string, string, string];
type IconName = 'arrow' | 'box' | 'check' | 'chevron' | 'clock' | 'globe' | 'menu' | 'plane' | 'route' | 'search' | 'ship' | 'truck' | 'warehouse' | 'whatsapp' | 'x' | 'chip' | 'gear' | 'cart' | 'snow' | 'crane';

// WhatsApp click-to-chat. Number in international format, digits only.
// PLACEHOLDER: uses the office line until the client confirms a WhatsApp number.
const WHATSAPP_NUMBER = '85239052188';
const whatsappLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const whatsappGreeting: Copy = [
  'Hello Magni, I would like to ask about a shipment.',
  '您好 Magni，我想咨询货运服务。',
  '您好 Magni，我想查詢貨運服務。',
];

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: 'en',
  setLanguage: () => undefined,
});

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
  box: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z" /><path d="M12 11v10" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m7 10 5 5 5-5" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  plane: <><path d="m3 11 18-7-7 18-3-8-8-3Z" /><path d="m11 14 5-5" /></>,
  route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a4 4 0 0 0 4-4v-4a4 4 0 0 1 3-4" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  ship: <><path d="M3 17c2 0 2 1.5 4 1.5S9 17 11 17s2 1.5 4 1.5 2-1.5 4-1.5" /><path d="m5 15-1-5h16l-2 5M8 10V5h8v5M11 5V2h2v3" /></>,
  truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  warehouse: <><path d="m3 9 9-6 9 6v11H3V9Z" /><path d="M7 20v-7h10v7M7 9h.01M12 9h.01M17 9h.01" /></>,
  x: <path d="M5 5l14 14M19 5 5 19" />,
  chip: <><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  gear: <><path d="m9 3 1-2h4l1 2 3 2 2 1 2 4-2 2v3l-1 3-4 2-2-1-3 1-3-2-3-1-1-4 1-2V8l3-3 2-2Z" /><circle cx="12" cy="11" r="4" /></>,
  cart: <><path d="M2 3h3l3 13h12l2-9H6" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
  snow: <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4M17 19l-1-4 4-1M4 14l4 1-1 4M17 5l-1 4 4 1" />,
  crane: <path d="M3 22V3h18M6 3l12 8H3l12-8M7 11v11M3 22h8M18 3v13M16 16h4v4h-4z" />,
  whatsapp: <><path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2l-4.5 1.3Z" /><path d="M9.2 8.2c-.3 3.4 3.2 6.9 6.6 6.6l.9-1.6-1.9-1-1 .9a4.8 4.8 0 0 1-2.6-2.6l.9-1-1-1.9-1.9.6Z" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function useI18n() {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = (copy: Copy) => copy[language === 'en' ? 0 : language === 'zh-CN' ? 1 : 2];
  return { language, setLanguage, t };
}

const services = [
  { id: 'sea', icon: 'ship' as IconName, name: ['Ocean freight', '海运服务', '海運服務'] as Copy, intro: ['Reliable FCL and LCL connections across Asia and key global ports.', '连接亚洲与全球主要港口的可靠整箱及拼箱服务。', '連接亞洲與全球主要港口的可靠整箱及拼箱服務。'] as Copy },
  { id: 'air', icon: 'plane' as IconName, name: ['Air freight', '空运服务', '空運服務'] as Copy, intro: ['Priority uplift and flexible routing for time-sensitive cargo.', '为时效敏感型货物提供优先舱位及灵活路线。', '為時效敏感型貨物提供優先艙位及靈活路線。'] as Copy },
  { id: 'road', icon: 'truck' as IconName, name: ['Cross-border road', '跨境陆运', '跨境陸運'] as Copy, intro: ['Door-to-door trucking between Mainland China, Hong Kong and Southeast Asia.', '往返中国内地、香港及东南亚的门到门陆运。', '往返中國內地、香港及東南亞的門到門陸運。'] as Copy },
  { id: 'rail', icon: 'route' as IconName, name: ['Rail freight', '铁路运输', '鐵路運輸'] as Copy, intro: ['A balanced option for cost, capacity and transit time across Eurasia.', '兼顾欧亚运输成本、运力及时间的平衡方案。', '兼顧歐亞運輸成本、運力及時間的平衡方案。'] as Copy },
  { id: 'customs', icon: 'check' as IconName, name: ['Customs clearance', '报关清关', '報關清關'] as Copy, intro: ['Accurate documentation and local support at every border.', '在每个口岸提供准确单证及本地支持。', '在每個口岸提供準確單證及本地支援。'] as Copy },
  { id: 'warehouse', icon: 'warehouse' as IconName, name: ['Warehousing', '仓储配送', '倉儲配送'] as Copy, intro: ['Consolidation, inventory handling and regional fulfilment.', '提供集货、库存管理及区域履约服务。', '提供集貨、庫存管理及區域履約服務。'] as Copy },
  { id: 'insurance', icon: 'box' as IconName, name: ['Cargo insurance', '货运保险', '貨運保險'] as Copy, intro: ['Practical protection built around your cargo and route.', '根据货物及路线提供切合实际的保障。', '根據貨物及路線提供切合實際的保障。'] as Copy },
];

const serviceTags: Record<string, Copy> = {
  sea: ['FCL · LCL', '整柜 · 拼箱', '整櫃 · 拼箱'],
  air: ['Express · Consolidated', '快件 · 集运', '快件 · 集運'],
  road: ['Mainland · HK · ASEAN', '内地 · 香港 · 东盟', '內地 · 香港 · 東盟'],
  rail: ['China–Europe · China–ASEAN', '中欧 · 中国—东盟', '中歐 · 中國—東盟'],
  customs: ['Import · Export · HS codes', '进口 · 出口 · HS 编码', '進口 · 出口 · HS 編碼'],
  warehouse: ['Overseas warehouse · Last mile', '海外仓 · 末端配送', '海外倉 · 末端配送'],
  insurance: ['Door-to-door cover', '门到门保障', '門到門保障'],
};

const solutions = [
  { id: 'electronics', icon: 'chip' as IconName, name: ['Electronics & technology', '电子及科技', '電子及科技'] as Copy, text: ['Secure handling for high-value, time-critical cargo.', '为高价值、时效敏感货物提供安全操作。', '為高價值、時效敏感貨物提供安全操作。'] as Copy },
  { id: 'auto-machinery', icon: 'gear' as IconName, name: ['Automotive & machinery', '汽车及机械', '汽車及機械'] as Copy, text: ['Dependable inbound parts and project movement.', '可靠的零部件进口及项目物流。', '可靠的零部件進口及項目物流。'] as Copy },
  { id: 'ecommerce', icon: 'cart' as IconName, name: ['Cross-border e-commerce', '跨境电商', '跨境電商'] as Copy, text: ['Flexible first-mile and regional fulfilment.', '灵活的头程及区域履约方案。', '靈活的頭程及區域履約方案。'] as Copy },
  { id: 'fmcg-cold-chain', icon: 'snow' as IconName, name: ['Consumer & cold chain', '快消及冷链', '快消及冷鏈'] as Copy, text: ['Controlled movement for fast-moving and sensitive goods.', '为快消及敏感货物提供可控运输。', '為快消及敏感貨物提供可控運輸。'] as Copy },
  { id: 'project-logistics', icon: 'crane' as IconName, name: ['Project logistics', '项目物流', '項目物流'] as Copy, text: ['Route planning and coordination for complex cargo.', '为复杂货物提供路线规划及协同。', '為複雜貨物提供路線規劃及協同。'] as Copy },
];

type LayoutContext = { openQuote: () => void };
function useLayout() { return useOutletContext<LayoutContext>(); }

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className={`brand ${inverse ? 'inverse' : ''}`}><span className="brand-mark"><span>M</span></span><span className="brand-copy"><strong>MAGNI</strong><small>TECHNOLOGY LIMITED</small></span></span>;
}

function Layout() {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('magni-language') as Language) || 'en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem('magni-language', next);
    setLanguageOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setLanguageOpen(false);
  }, [location.pathname]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <TranslatedLayout
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        languageOpen={languageOpen}
        setLanguageOpen={setLanguageOpen}
        openQuote={() => navigate('/quote')}
      />
    </LanguageContext.Provider>
  );
}

function TranslatedLayout({ menuOpen, setMenuOpen, languageOpen, setLanguageOpen, openQuote }: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  languageOpen: boolean;
  setLanguageOpen: (open: boolean) => void;
  openQuote: () => void;
}) {
  const { language, setLanguage, t } = useI18n();
  const serviceLabel = t(['Services', '服务', '服務']);
  const solutionLabel = t(['Solutions', '行业方案', '行業方案']);
  return (
    <div className="site-shell">
      <header className="header">
        <div className="utility-bar"><div className="container utility-inner"><p>{t(['Hong Kong connected. Asia delivered.', '立足香港，畅达亚洲。', '立足香港，暢達亞洲。'])}</p><div><span>{t(['24/7 operations desk', '全天候运营支持', '全天候營運支援'])}</span><span className="utility-separator" /><span>+852 3905 2188</span></div></div></div>
        <nav className="container navbar" aria-label={t(['Main navigation', '主导航', '主導覽'])}>
          <Link to="/" aria-label="Magni Technology Limited home"><Brand /></Link>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <div className="nav-group">
              <NavLink to="/services">{serviceLabel}<Icon name="chevron" size={13} /></NavLink>
              <div className="mega-menu">
                <div><p>{t(['Freight services', '运输服务', '運輸服務'])}</p>{services.slice(0, 4).map((item) => <Link to={`/services/${item.id}`} key={item.id}><Icon name={item.icon} size={18} />{t(item.name)}</Link>)}</div>
                <div><p>{t(['Supply chain', '供应链服务', '供應鏈服務'])}</p>{services.slice(4).map((item) => <Link to={`/services/${item.id}`} key={item.id}><Icon name={item.icon} size={18} />{t(item.name)}</Link>)}</div>
              </div>
            </div>
            <div className="nav-group">
              <NavLink to="/solutions">{solutionLabel}<Icon name="chevron" size={13} /></NavLink>
              <div className="mega-menu solution-menu"><div><p>{t(['By industry', '按行业', '按行業'])}</p>{solutions.map((item) => <Link to={`/solutions/${item.id}`} key={item.id}>{t(item.name)}<Icon name="arrow" size={15} /></Link>)}</div></div>
            </div>
            <NavLink to="/network">{t(['Network', '网络覆盖', '網絡覆蓋'])}</NavLink>
            <NavLink to="/tracking">{t(['Tracking', '货运追踪', '貨運追蹤'])}</NavLink>
            <NavLink to="/about">{t(['About', '关于我们', '關於我們'])}</NavLink>
            <NavLink to="/contact">{t(['Contact', '联系我们', '聯絡我們'])}</NavLink>
          </div>
          <div className="nav-actions">
            <div className="language-wrap">
              <button className="language" onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen}><Icon name="globe" size={16} />{language === 'en' ? 'EN' : language === 'zh-CN' ? '简' : '繁'}<Icon name="chevron" size={12} /></button>
              {languageOpen && <div className="language-menu">
                <button className={language === 'en' ? 'selected' : ''} onClick={() => setLanguage('en')}><span>EN</span>English</button>
                <button className={language === 'zh-CN' ? 'selected' : ''} onClick={() => setLanguage('zh-CN')}><span>简</span>简体中文</button>
                <button className={language === 'zh-HK' ? 'selected' : ''} onClick={() => setLanguage('zh-HK')}><span>繁</span>繁體中文</button>
              </div>}
            </div>
            <button className="button button-dark nav-quote" onClick={openQuote}>{t(['Get a quote', '获取报价', '索取報價'])}<Icon name="arrow" size={17} /></button>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><Icon name={menuOpen ? 'x' : 'menu'} size={24} /></button>
          </div>
        </nav>
      </header>
      <main><Outlet context={{ openQuote }} /></main>
      <a className="whatsapp-float" href={whatsappLink(t(whatsappGreeting))} target="_blank" rel="noopener noreferrer" aria-label={t(['Chat with us on WhatsApp', '通过 WhatsApp 联系我们', '透過 WhatsApp 聯絡我們'])} title="WhatsApp"><Icon name="whatsapp" size={26} /></a>
      <Footer />
    </div>
  );
}

function Footer() {
  const { t } = useI18n();
  return <footer>
    <div className="container footer-main">
      <div className="footer-brand"><Brand inverse /><p>{t(['Integrated logistics across China, Hong Kong and Southeast Asia.', '连接中国内地、香港及东南亚的一体化物流服务。', '連接中國內地、香港及東南亞的一體化物流服務。'])}</p></div>
      <div className="footer-nav"><strong>{t(['Explore', '探索', '探索'])}</strong><Link to="/services">{t(['Services', '服务', '服務'])}</Link><Link to="/network">{t(['Network', '网络覆盖', '網絡覆蓋'])}</Link><Link to="/about">{t(['About us', '关于我们', '關於我們'])}</Link></div>
      <div className="footer-nav"><strong>{t(['Contact', '联系', '聯絡'])}</strong><a href="tel:+85239052188">+852 3905 2188</a><a href="mailto:hello@magni-logistics.com">hello@magni-logistics.com</a><a className="whatsapp-link" href={whatsappLink(t(whatsappGreeting))} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={15} />WhatsApp</a><span>{t(['Hong Kong SAR', '中国香港特别行政区', '中國香港特別行政區'])}</span></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Magni Technology Limited</span><nav aria-label={t(['Legal', '法律信息', '法律資訊'])}>{legalPages.map((page) => <Link key={page.id} to={`/legal/${page.id}`}>{t(page.name)}</Link>)}<Link to="/credits">{t(['Photo credits', '图片来源', '圖片來源'])}</Link></nav></div>
  </footer>;
}

/* One credit line for the stand-in photographs on the homepage (Wikimedia Commons licences). */
const photoCredits = [
  { by: 'U.S. Department of Agriculture', licence: 'Public domain', page: 'https://commons.wikimedia.org/wiki/File:Packages_on_UPS_conveyor_belt.jpg' },
  { by: 'Cjp24', licence: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Warehouse-plastic_industry2.jpg' },
  { by: 'MNXANL', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:201611_Shenzhen_Bay_Port_Shenzhen_Side.jpg' },
  { by: 'Destroducks', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Truck_on_Highway_Bridge.jpg' },
  { by: 'Daniel Lu', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Stonecutters_Bridge_and_Kwai_Tsing_Container_Terminals_Hong_Kong_2024_dllu.jpg' },
  { by: 'Jan Helebrant', licence: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Electronics_PCB_circuit_board_002_(51131186557).jpg' },
  { by: 'Marek Ślusarczyk', licence: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:001_Car_factory_assembly_line_-_Opel_factory_in_Gliwice,_Poland.jpg' },
  { by: 'Henry Söderlund', licence: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Cardboard_boxes_by_Henry_S%C3%B6derlund.jpg' },
  { by: 'PAULIX04', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Fresh_Rambutans_Piled_High.jpg' },
  { by: 'Oregon Department of Transportation', licence: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Truck_with_Windmill_Blade_on_its_way_to_Shepherds_Flat_Wind_Farm_(5812554418).jpg' },
  { by: 'Zairon', licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Singapore_Port_viewed_from_The_Pinnacle@Duxton_09.jpg' },
  { by: 'Lokomotive74', licence: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Laem_Chabang.jpg' },
  { by: 'Bem photography', licence: 'CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:C%E1%BA%A3ng_C%C3%A1t_L%C3%A1i.jpg' },
];
/* The photo credits page (/credits), linked from the footer: CC BY and CC BY-SA licences require the credit. */
function CreditsPage() {
  const { t } = useI18n();
  return <><PageHero eyebrow={t(['Photo credits', '图片来源', '圖片來源'])} title={t(['Photographs on this site.', '本网站使用的图片。', '本網站使用的圖片。'])} intro={t(['These photographs come from Wikimedia Commons and are used under the licences listed.', '以下图片来自 Wikimedia Commons，并按所列许可使用。', '以下圖片來自 Wikimedia Commons，並按所列許可使用。'])} />
    <section className="section"><div className="container legal-body"><ul className="detail-list">{photoCredits.map((credit) => <li key={credit.page}><Icon name="check" size={17} /><span><a href={credit.page} target="_blank" rel="noopener noreferrer">{credit.by}</a> · {credit.licence}</span></li>)}</ul></div></section></>;
}

/* Stand-in photographs (Wikimedia Commons, credited in the footer on the homepage). Replace with the client's own photos. */
const stock = (id: string) => ({
  src: `${import.meta.env.BASE_URL}images/stock/photo-${id}-960.jpg`,
  srcSet: `${import.meta.env.BASE_URL}images/stock/photo-${id}-500.jpg 500w, ${import.meta.env.BASE_URL}images/stock/photo-${id}-960.jpg 960w`,
});

const shipmentSteps: Array<{ title: Copy; text: Copy; photo: string; alt: Copy }> = [
  {
    title: ['01 · Send the cargo details', '01 · 提交货物资料', '01 · 提交貨物資料'],
    text: ['Origin, destination, commodity and weight. We reply with the mode, the route, the cost and the documents you will need.', '起运地、目的地、品名及重量。我们回复运输方式、线路、费用及所需单证。', '起運地、目的地、品名及重量。我們回覆運輸方式、線路、費用及所需單證。'],
    photo: 'f110091497', alt: ['A carton on a conveyor belt in a distribution centre', '配送中心输送带上的纸箱', '配送中心輸送帶上的紙箱'],
  },
  {
    title: ['02 · Pickup and consolidation', '02 · 提货及集货', '02 · 提貨及集貨'],
    text: ['We collect from your factory or supplier. LCL cargo is consolidated at our Shenzhen warehouse before it leaves.', '我们到工厂或供应商处提货，拼箱货物先在深圳仓库集货再出发。', '我們到工廠或供應商處提貨，拼箱貨物先在深圳倉庫集貨再出發。'],
    photo: 'f18189225', alt: ['Pallets of cargo in a warehouse aisle', '仓库通道中的货物托盘', '倉庫通道中的貨物托盤'],
  },
  {
    title: ['03 · Export and import clearance', '03 · 出口及进口清关', '03 · 出口及進口清關'],
    text: ['Our customs team files the declarations on both sides of the border, so the truck or container is not held at the port.', '报关团队在口岸两侧完成申报，货车或货柜不会滞留口岸。', '報關團隊在口岸兩側完成申報，貨車或貨櫃不會滯留口岸。'],
    photo: 'f52914747', alt: ['Shenzhen Bay Port border crossing at night', '夜间的深圳湾口岸', '夜間的深圳灣口岸'],
  },
  {
    title: ['04 · Delivery and proof', '04 · 派送及签收', '04 · 派送及簽收'],
    text: ['Door delivery across Southeast Asia, milestone updates in tracking, and a signed proof of delivery at the end.', '派送至东南亚各地收货点，追踪系统实时更新节点，最后提供签收证明。', '派送至東南亞各地收貨點，追蹤系統即時更新節點，最後提供簽收證明。'],
    photo: 'f100178807', alt: ['A container truck on a highway interchange', '高速公路立交桥上的货柜车', '高速公路立交橋上的貨櫃車'],
  },
];

/* Runs the skill's scroll moments (public/assets/moments) on the homepage only. */
function useMoments(deps: unknown[]) {
  useEffect(() => {
    (window as unknown as { __momentsManual: boolean }).__momentsManual = true;
    let cancelled = false;
    let api: { mount: (el: Element) => Promise<unknown>; unmountAll: (root: Element) => void } | null = null;
    const root = document.querySelector('main');
    import(/* @vite-ignore */ `${import.meta.env.BASE_URL}assets/moments/moments.js`).then((mod) => {
      if (cancelled || !root) return;
      api = mod;
      root.querySelectorAll('[data-moment]').forEach((el) => { mod.mount(el); });
    }).catch(() => {
      // a failed module leaves the photographs and steps showing as written
    });
    return () => { cancelled = true; if (api && root) api.unmountAll(root); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* One stand-in photograph per industry for the homepage peek panel (same order as `solutions`). */
const industryPhotos: Record<string, { photo: string; alt: Copy; pos?: string }> = {
  electronics: { photo: 'f126446193', alt: ['A microchip and its gold bond wires, close up', '微芯片及金线特写', '微晶片及金線特寫'] },
  'auto-machinery': { photo: 'f116381354', alt: ['Cars on a factory assembly line', '工厂装配线上的汽车', '工廠裝配線上的汽車'], pos: '30% 50%' },
  ecommerce: { photo: 'f139907477', alt: ['Stacks of flat-packed cardboard boxes', '成叠的扁平纸箱', '成疊的扁平紙箱'] },
  'fmcg-cold-chain': { photo: 'f199197470', alt: ['Fresh rambutans and mangosteens at a market', '市场上的新鲜红毛丹及山竹', '市場上的新鮮紅毛丹及山竹'], pos: '40% 50%' },
  'project-logistics': { photo: 'f24374661', alt: ['A wind turbine blade on an oversize-load trailer', '超限运输拖车上的风力发电机叶片', '超限運輸拖車上的風力發電機葉片'], pos: '35% 50%' },
};

function Home() {
  const { language, t } = useI18n();
  const { openQuote } = useLayout();
  const [tracking, setTracking] = useState('');
  const [peek, setPeek] = useState<string | null>(null);
  const navigate = useNavigate();
  useMoments([language]);
  const track = (event: FormEvent) => { event.preventDefault(); navigate(`/tracking?no=${encodeURIComponent(tracking)}`); };
  return <>
    <section className="hero">
      <img src={`${import.meta.env.BASE_URL}images/magni-port-hero.png`} alt="" className="hero-image" /><div className="hero-overlay" />
      <div className="container hero-inner">
        <p className="eyebrow light">{t(['B2B cross-border logistics · Hong Kong', 'B2B 跨境物流 · 香港', 'B2B 跨境物流 · 香港'])}</p>
        <h1>{t(['China to Southeast Asia,', '中国—东南亚', '中國—東南亞'])}<br /><em>{t(['road, sea and customs in one booking.', 'B2B 跨境陆运、海运、清关一站式', 'B2B 跨境陸運、海運、清關一站式'])}</em></h1>
        <p className="hero-copy">{t(['Trucking, FCL/LCL, air and rail for manufacturers and traders, with export and import clearance at every border. One Hong Kong team plans, books and tracks each shipment.', '为制造商及贸易商提供陆运、整柜/拼箱、空运及铁路运输，每个口岸的进出口清关一并处理。由香港团队统一规划、订舱及追踪每票货物。', '為製造商及貿易商提供陸運、整櫃/拼箱、空運及鐵路運輸，每個口岸的進出口清關一併處理。由香港團隊統一規劃、訂艙及追蹤每票貨物。'])}</p>
        <div className="hero-actions"><button className="button button-accent" onClick={openQuote}>{t(['Get a quote', '获取报价', '索取報價'])}<Icon name="arrow" size={18} /></button><Link className="text-button light-link" to="/services">{t(['View all 7 services', '查看全部 7 项服务', '查看全部 7 項服務'])}<Icon name="arrow" size={17} /></Link></div>
      </div>
      <div className="container hero-foot">{[
        t(['Cross-border trucking', '跨境陆运', '跨境陸運']), t(['FCL / LCL', '整柜 / 拼箱', '整櫃 / 拼箱']), t(['Air', '空运', '空運']), t(['Rail', '铁路', '鐵路']), t(['Customs clearance', '报关清关', '報關清關']),
      ].map((mode, index) => <span key={mode}>{index > 0 && <i className="hero-foot-dot" />}{mode}</span>)}</div>
    </section>
    <section className="tracking-panel container">
      <div className="tracking-title"><span className="icon-box"><Icon name="search" /></span><div><p className="mini-label">{t(['Shipment visibility', '货运可视化', '貨運可視化'])}</p><h2><label htmlFor="home-track-no">{t(['Track your cargo', '追踪您的货物', '追蹤您的貨物'])}</label></h2></div></div>
      <form className="tracking-form" onSubmit={track}><input id="home-track-no" value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder={t(['Enter shipment or booking no.', '输入运单或订舱编号', '輸入運單或訂艙編號'])} /><button className="button button-dark">{t(['Track', '追踪', '追蹤'])}<Icon name="arrow" size={17} /></button></form>
      <div className="track-message">{t(['Demo: MAG260018', '演示编号：MAG260018', '示範編號：MAG260018'])}</div>
    </section>
    {/* PLACEHOLDER FIGURES: every number and badge below must be confirmed by the client before launch. */}
    <section className="trust-strip"><div className="container">
      <div className="trust-grid">{[
        ['12+', t(['Years in service', '年服务经验', '年服務經驗'])],
        ['18', t(['Countries and ports covered', '个覆盖国家及口岸', '個覆蓋國家及口岸'])],
        ['20,000 m²', t(['Own warehouse space', '自营仓储面积', '自營倉儲面積'])],
        ['1,500 TEU', t(['Shipped every month', '月均货量', '月均貨量'])],
        ['300+', t(['Businesses served', '服务企业', '服務企業'])],
      ].map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <div className="badge-row"><span className="badge-label">{t(['Licences & memberships', '资质及会员', '資質及會員'])}</span>{['HAFFA', 'FIATA', 'IATA', 'AEO', 'ISO 9001'].map((badge) => <span className="badge" key={badge}>{badge}</span>)}</div>
    </div></section>
    <section className="section services-section"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">{t(['Services', '服务项目', '服務項目'])}</p><h2>{t(['Seven services, one booking desk.', '七项服务，一个订舱窗口。', '七項服務，一個訂艙窗口。'])}</h2></div><p>{t(['Pick a mode to see suitable cargo, transit times, routes and the documents you need.', '选择运输方式，查看适用货物、时效、线路及所需单证。', '選擇運輸方式，查看適用貨物、時效、線路及所需單證。'])}</p></div>
      <div className="services-grid">
        {services.map((service, index) => <Link className="service-card" to={`/services/${service.id}`} key={service.id}><div className="service-top"><span>0{index + 1}</span><Icon name={service.icon} size={31} /></div><div><small>{t(serviceTags[service.id])}</small><h3>{t(service.name)}</h3><p>{t(service.intro)}</p></div><span className="service-link"><span>{t(['View service', '查看服务', '查看服務'])}</span><Icon name="arrow" size={18} /></span></Link>)}
        <div className="service-card service-card-quote"><div><small>{t(['Not sure which mode?', '不确定选哪种方式？', '不確定選哪種方式？'])}</small><h3>{t(['Send the cargo details. We suggest the route.', '提供货物资料，我们为您建议路线。', '提供貨物資料，我們為您建議路線。'])}</h3></div><button className="button button-accent" onClick={openQuote}>{t(['Get a quote', '获取报价', '索取報價'])}<Icon name="arrow" size={17} /></button></div>
      </div>
    </div></section>
    {/* Moment 1 (dealt: pinned-chapters): the section holds while the four steps open one at a time */}
    <section className="process-section" key={`process-${language}`} data-moment="pinned-chapters" aria-labelledby="process-h">
      <div className="container mo-pc__grid">
        <div className="mo-pc__text">
          <div><p className="eyebrow">{t(['How it works', '操作流程', '操作流程'])}</p><h2 id="process-h">{t(['How a shipment moves with us.', '一票货物的完整流程。', '一票貨物的完整流程。'])}</h2></div>
          <ol className="mo-pc__steps">{shipmentSteps.map((step) => {
            const photo = stock(step.photo);
            return <li className="mo-pc__step" key={step.photo}>
              <h3>{t(step.title)}</h3>
              <p><span className="mo-pc__p-in">{t(step.text)}</span></p>
              <figure className="mo-pc__visual"><img src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 1023px) 100vw, 50vw" width="960" height="640" alt={t(step.alt)} loading="lazy" decoding="async" /></figure>
            </li>;
          })}</ol>
        </div>
        <div className="mo-pc__visuals" />
      </div>
    </section>
    <section className="home-map-section"><div className="container home-map-grid"><div><p className="eyebrow">{t(['Our network', '网络覆盖', '網絡覆蓋'])}</p><h2>{t(['Offices, warehouses and gateways across Asia.', '覆盖亚洲的办公室、仓库及口岸。', '覆蓋亞洲的辦公室、倉庫及口岸。'])}</h2><p>{t(['Our Hong Kong team connects manufacturing centres in China with major markets across Southeast Asia.', '香港团队连接中国制造中心与东南亚主要市场。', '香港團隊連接中國製造中心與東南亞主要市場。'])}</p><Link className="text-button dark-link" to="/network">{t(['Explore the network', '查看完整网络', '查看完整網絡'])}<Icon name="arrow" size={17} /></Link></div><NetworkMap compact /></div></section>
    <section className="section industries-section"><div className="container industries-split">
      <div>
        <div className="section-heading compact"><div><p className="eyebrow">{t(['Industry solutions', '行业解决方案', '行業解決方案'])}</p><h2>{t(['Logistics by industry.', '按行业划分的物流方案。', '按行業劃分的物流方案。'])}</h2></div></div>
        <div className="industry-grid">{solutions.map((solution, index) => <Link className={`industry-item ${peek === solution.id ? 'is-peek' : ''}`} to={`/solutions/${solution.id}`} key={solution.id} onMouseEnter={() => setPeek(solution.id)} onFocus={() => setPeek(solution.id)}><span>0{index + 1}</span><span className="industry-icon"><Icon name={solution.icon} size={28} /></span><div><h3>{t(solution.name)}</h3><p>{t(solution.text)}</p></div><Icon name="arrow" size={20} /></Link>)}</div>
        <Link className="text-button dark-link industries-more" to="/solutions">{t(['View all solutions', '查看所有方案', '查看所有方案'])}<Icon name="arrow" size={17} /></Link>
      </div>
      {/* Moment 2 (dealt: picture-develops, film look): the photograph develops once as it scrolls in */}
      <figure className="develop-frame" key={`develop-${language}`} data-moment="picture-develops"><img src={`${import.meta.env.BASE_URL}images/stock/photo-f187045971-1280.jpg`} srcSet={`${stock('f187045971').srcSet}, ${import.meta.env.BASE_URL}images/stock/photo-f187045971-1280.jpg 1280w`} sizes="(max-width: 860px) 200vw, 1500px" width="1280" height="640" alt={t(['Stonecutters Bridge with the Kwai Tsing container terminals behind it, Hong Kong', '昂船洲大桥及其后方的葵青货柜码头，香港', '昂船洲大橋及其後方的葵青貨櫃碼頭，香港'])} loading="lazy" decoding="async" />
        {/* peek layer: hovering or focusing an industry crossfades to its photograph */}
        <div className="peek-layer" aria-hidden={peek === null}>{solutions.map((solution) => {
          const item = industryPhotos[solution.id];
          const photo = stock(item.photo);
          return <img key={solution.id} className={peek === solution.id ? 'is-on' : ''} src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 860px) 100vw, 50vw" width="960" height="640" alt={peek === solution.id ? t(item.alt) : ''} style={item.pos ? { objectPosition: item.pos } : undefined} loading="lazy" decoding="async" />;
        })}</div>
      </figure>
    </div></section>
    <CallToAction />
  </>;
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro: string }) {
  return <section className="page-hero"><div className="container"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>;
}

function ServicesOverview() {
  const { t } = useI18n();
  return <><PageHero eyebrow={t(['Services', '服务', '服務'])} title={t(['Every mode. One accountable team.', '全方位运输，一个负责到底的团队。', '全方位運輸，一個負責到底的團隊。'])} intro={t(['Flexible freight and supply chain services designed around how your business actually works.', '根据您的实际业务模式设计灵活的货运及供应链服务。', '根據您的實際業務模式設計靈活的貨運及供應鏈服務。'])} /><CardOverview items={services.map((item) => ({ ...item, path: `/services/${item.id}` }))} /><CallToAction /></>;
}

function CardOverview({ items }: { items: Array<{ id: string; icon?: IconName; name: Copy; intro?: Copy; text?: Copy; path: string }> }) {
  const { t } = useI18n();
  return <section className="section"><div className="container overview-grid">{items.map((item, index) => <Link className="overview-card" to={item.path} key={item.id}><span className="overview-number">{String(index + 1).padStart(2, '0')}</span>{item.icon && <Icon name={item.icon} size={34} />}<h2>{t(item.name)}</h2><p>{t(item.intro || item.text!)}</p><span className="overview-link">{t(['Learn more', '了解更多', '了解更多'])}<Icon name="arrow" size={17} /></span></Link>)}</div></section>;
}

function ServiceDetail() {
  const { serviceId } = useParams();
  const { t } = useI18n();
  const { openQuote } = useLayout();
  const service = services.find((item) => item.id === serviceId);
  if (!service) return <NotFound />;
  return <><PageHero eyebrow={t(['Our services', '我们的服务', '我們的服務'])} title={t(service.name)} intro={t(service.intro)} />
    <section className="detail-section"><div className="container detail-layout"><aside><p>{t(['Services', '服务', '服務'])}</p>{services.map((item) => <NavLink key={item.id} to={`/services/${item.id}`}><Icon name={item.icon} size={18} />{t(item.name)}</NavLink>)}</aside><article className="detail-content">
      {(() => { const detail = serviceDetails[service.id]; return <>
        <p className="detail-lead">{t(detail.lead)}</p>
        <h2>{t(['Suitable cargo', '适用货物', '適用貨物'])}</h2>
        <div className="benefit-grid">{detail.cargo.map((item) => <div key={item[0]}><Icon name="check" size={19} /><span>{t(item)}</span></div>)}</div>
        <h2>{t(['Typical transit times', '典型时效', '典型時效'])}</h2>
        <div className="transit-table" role="table">{detail.transit.map((row) => <div className="transit-row" role="row" key={row.lane[0]}><span role="cell">{t(row.lane)}</span><strong role="cell">{t(row.time)}</strong></div>)}</div>
        <p className="detail-note">{t(detail.transitNote)}</p>
        <div className="detail-columns">
          <div><h2>{t(['Routes covered', '覆盖线路', '覆蓋線路'])}</h2><ul className="detail-list">{detail.routes.map((item) => <li key={item[0]}><Icon name="route" size={17} />{t(item)}</li>)}</ul></div>
          <div><h2>{t(['Documents you need', '所需单证', '所需單證'])}</h2><ul className="detail-list">{detail.documents.map((item) => <li key={item[0]}><Icon name="box" size={17} />{t(item)}</li>)}</ul></div>
        </div>
        <h2>{t(['How it works', '操作流程', '操作流程'])}</h2>
        <ol className="process-grid process-steps">{detail.process.map((step, index) => <li key={step.title[0]}><span>0{index + 1}</span><strong>{t(step.title)}</strong><p>{t(step.text)}</p></li>)}</ol>
      </>; })()}
      <div className="detail-cta"><div><h3>{t(['Ready to plan this shipment?', '准备规划这票货运？', '準備規劃這票貨運？'])}</h3><p>{t(['Share your origin, destination and cargo details.', '请提供起运地、目的地及货物资料。', '請提供起運地、目的地及貨物資料。'])}</p></div><button className="button button-accent" onClick={openQuote}>{t(['Request a quote', '获取报价', '索取報價'])}<Icon name="arrow" size={17} /></button></div>
    </article></div></section></>;
}

function SolutionsOverview() {
  const { language, t } = useI18n();
  const title = language === 'en'
    ? 'Logistics designed for what you make.'
    : <>{t(['', '为您的产品量身打造', '為您的產品量身打造'])}<br /><em>{t(['', '物流方案。', '物流方案。'])}</em></>;
  return <><PageHero eyebrow={t(['Industry solutions', '行业解决方案', '行業解決方案'])} title={title} intro={t(['We combine modes, controls and local expertise around the specific demands of your industry.', '我们根据您所在行业的具体需求，整合运输模式、管控措施及本地经验。', '我們根據您所在行業的具體需求，整合運輸模式、管控措施及本地經驗。'])} /><CardOverview items={solutions.map((item) => ({ ...item, path: `/solutions/${item.id}` }))} /><CallToAction /></>;
}

function SolutionDetail() {
  const { solutionId } = useParams();
  const { t } = useI18n();
  const { openQuote } = useLayout();
  const solution = solutions.find((item) => item.id === solutionId);
  if (!solution) return <NotFound />;
  return <><PageHero eyebrow={t(['Industry solution', '行业方案', '行業方案'])} title={t(solution.name)} intro={t(solution.text)} /><section className="detail-section"><div className="container detail-layout"><aside><p>{t(['Industries', '行业', '行業'])}</p>{solutions.map((item) => <NavLink key={item.id} to={`/solutions/${item.id}`}><Icon name={item.icon} size={17} />{t(item.name)}</NavLink>)}</aside><article className="detail-content">{(() => { const detail = solutionDetails[solution.id]; const icons: IconName[] = ['route', 'box', 'clock']; return <>
      <p className="detail-lead">{t(detail.lead)}</p>
      <h2>{t(['What we move', '我们运输的货物', '我們運輸的貨物'])}</h2>
      <div className="benefit-grid">{detail.cargo.map((item) => <div key={item[0]}><Icon name="check" size={19} /><span>{t(item)}</span></div>)}</div>
      <h2>{t(['What makes it hard', '行业难点', '行業難點'])}</h2>
      <div className="challenge-list">{detail.challenges.map((item, index) => <div key={item.title[0]}><span>0{index + 1}</span><div><h3>{t(item.title)}</h3><p>{t(item.text)}</p></div></div>)}</div>
      <h2>{t(['How we handle it', '我们的做法', '我們的做法'])}</h2>
      <div className="feature-columns">{detail.approach.map((item, index) => <div key={item.title[0]}><Icon name={icons[index % icons.length]} size={27} /><h3>{t(item.title)}</h3><p>{t(item.text)}</p></div>)}</div>
      <h2>{t(['Services we use', '相关服务', '相關服務'])}</h2>
      <div className="service-chips">{detail.services.map((id) => { const item = services.find((s) => s.id === id)!; return <Link key={id} to={`/services/${id}`}><Icon name={item.icon} size={18} />{t(item.name)}<Icon name="arrow" size={15} /></Link>; })}</div>
      <div className="detail-cta"><div><h3>{t(['Tell us about your cargo', '告诉我们您的货物情况', '告訴我們您的貨物情況'])}</h3><p>{t(['We reply with a route, a transit time and a cost.', '我们会回复建议路线、时效及费用。', '我們會回覆建議路線、時效及費用。'])}</p></div><button className="button button-accent" onClick={openQuote}>{t(['Get a quote', '获取报价', '索取報價'])}<Icon name="arrow" size={17} /></button></div>
    </>; })()}</article></div></section></>;
}

const offices = [
  { id: 'hk', x: 72, y: 41, type: 'office', name: ['Hong Kong', '香港', '香港'] as Copy, detail: ['Head office & control tower', '总部及运营控制中心', '總部及營運控制中心'] as Copy },
  { id: 'sz', x: 70, y: 36, type: 'warehouse', name: ['Shenzhen', '深圳', '深圳'] as Copy, detail: ['Consolidation warehouse', '集货仓库', '集貨倉庫'] as Copy },
  { id: 'sg', x: 71, y: 78, type: 'office', name: ['Singapore', '新加坡', '新加坡'] as Copy, detail: ['Regional partner office', '区域合作伙伴办公室', '區域合作夥伴辦公室'] as Copy },
  { id: 'bkk', x: 60, y: 60, type: 'gateway', name: ['Bangkok', '曼谷', '曼谷'] as Copy, detail: ['Road & ocean gateway', '陆运及海运门户', '陸運及海運門戶'] as Copy },
  { id: 'sgn', x: 69, y: 65, type: 'gateway', name: ['Ho Chi Minh City', '胡志明市', '胡志明市'] as Copy, detail: ['Ocean & air gateway', '海空运门户', '海空運門戶'] as Copy },
];

/* Stand-in photographs for each map location (Wikimedia Commons, credited in the footer). */
const locationPhotos: Record<string, { photo: string; small?: boolean; pos?: string; zoom?: boolean; alt: Copy }> = {
  hk: { photo: 'f187045971', pos: '62% 50%', alt: ['Stonecutters Bridge and the Kwai Tsing container terminals', '昂船洲大桥及葵青货柜码头', '昂船洲大橋及葵青貨櫃碼頭'] },
  sz: { photo: 'f18189225', alt: ['Pallets of cargo in a warehouse aisle', '仓库通道中的货物托盘', '倉庫通道中的貨物托盤'] },
  sg: { photo: 'f59042181', small: true, alt: ['Container cranes at the Port of Singapore', '新加坡港的货柜吊机', '新加坡港的貨櫃吊機'] },
  bkk: { photo: 'f3933265', alt: ['The entrance to Laem Chabang Port, Bangkok’s main seaport', '曼谷主要海港林查班港入口', '曼谷主要海港林查班港入口'] },
  sgn: { photo: 'f126458271', pos: '50% 50%', zoom: true, alt: ['A cargo ship at Cat Lai port, Ho Chi Minh City', '胡志明市吉莱港的货船', '胡志明市吉萊港的貨船'] },
};
const locationImg = (id: string) => {
  const item = locationPhotos[id];
  const base = `${import.meta.env.BASE_URL}images/stock/photo-${item.photo}`;
  return { src: item.small ? `${base}-500.jpg` : `${base}-960.jpg`, srcSet: item.small ? undefined : `${base}-500.jpg 500w, ${base}-960.jpg 960w`, pos: item.pos, style: { ...(item.pos ? { objectPosition: item.pos } : {}), ...(item.zoom ? { transform: 'scale(1.3)', transformOrigin: '50% 45%' } : {}) } };
};

function NetworkMap({ compact = false, filter = 'all', selected, onSelect }: { compact?: boolean; filter?: string; selected?: string; onSelect?: (id: string) => void }) {
  const { t } = useI18n();
  // a filter shows only its own type of location; the routes show only on "All locations"
  const visible = offices.filter((office) => filter === 'all' || office.type === filter);
  // hover card: a photograph of the place, placed beside the pin the pointer or keyboard is on
  const [hover, setHover] = useState<{ id: string; x: number; y: number; below: boolean } | null>(null);
  const showCard = (id: string, target: Element) => {
    const stage = target.closest('.map-stage');
    if (!stage) return;
    const s = stage.getBoundingClientRect();
    const p = target.querySelector('.pin-dot')!.getBoundingClientRect();
    const x = p.left + p.width / 2 - s.left;
    const y = p.top + p.height / 2 - s.top;
    setHover({ id, x, y, below: y < s.height * 0.42 });
  };
  const hovered = hover && offices.find((office) => office.id === hover.id);
  return <div className={`network-map ${compact ? 'compact' : ''}`}><div className="map-stage" onMouseLeave={() => setHover(null)}>
    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img" aria-label={t(['Asia logistics network map', '亚洲物流网络地图', '亞洲物流網絡地圖'])}>
      <rect className="map-sea" width={MAP_WIDTH} height={MAP_HEIGHT} />
      {mapLand.map((country) => <path key={country.iso} className={`map-land ${country.primary ? '' : 'secondary'}`} d={country.d} />)}
      {mapCountryLabels.map((label) => <text key={label.en} className={`map-country ${label.sea ? 'sea' : ''}`} x={label.x} y={label.y} textAnchor="middle">{label.en}</text>)}
      {filter === 'all' && mapRoutes.map((route) => <path key={route.to} className="map-route" d={route.d} />)}
      {visible.map((office) => { const point = mapLocations[office.id]; return <g key={office.id} className={`map-pin ${office.type} ${selected === office.id ? 'selected' : ''}`} transform={`translate(${point.x} ${point.y})`} role="button" tabIndex={0} aria-label={`${t(office.name)}, ${t(office.detail)}`} onMouseEnter={(event) => showCard(office.id, event.currentTarget)} onMouseLeave={() => setHover(null)} onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) showCard(office.id, event.currentTarget); }} onBlur={() => setHover(null)} onClick={() => onSelect?.(office.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect?.(office.id); } }}>
        <circle r="16" className="pin-ring" /><circle r="6" className="pin-dot" /><text x={point.label.dx} y={point.label.dy} textAnchor={point.label.anchor}>{t(office.name)}</text>
      </g>; })}
    </svg>
    {hovered && hover && (() => { const img = locationImg(hovered.id); return <div className={`map-card ${hovered.type} ${hover.below ? 'below' : ''}`} style={{ left: hover.x, top: hover.y }} aria-hidden="true">
      <div className="map-card-photo"><div className="photo-clip"><img src={img.src} srcSet={img.srcSet} sizes="260px" alt="" style={img.style} /></div></div>
      <div className="map-card-info"><strong>{t(hovered.name)}</strong><span><i />{t(hovered.detail)}</span></div>
    </div>; })()}
    </div>
    <div className="map-legend"><span><i className="office-dot" />{t(['Office', '办公室', '辦公室'])}</span><span><i className="warehouse-dot" />{t(['Warehouse', '仓库', '倉庫'])}</span><span><i className="gateway-dot" />{t(['Gateway', '门户', '門戶'])}</span></div>
  </div>;
}

function NetworkPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState('hk');
  const selectedOffice = offices.find((office) => office.id === selected)!;
  return <><PageHero eyebrow={t(['Our network', '网络覆盖', '網絡覆蓋'])} title={t(['Connected where your business moves.', '覆盖您的业务所至之处。', '覆蓋您的業務所至之處。'])} intro={t(['Operational reach across China and Southeast Asia, coordinated from Hong Kong.', '以香港为协调中心，运营网络覆盖中国及东南亚。', '以香港為協調中心，營運網絡覆蓋中國及東南亞。'])} /><section className="section network-page"><div className="container"><div className="map-filters">{[
    ['all', t(['All locations', '所有地点', '所有地點'])], ['office', t(['Offices', '办公室', '辦公室'])], ['warehouse', t(['Warehouses', '仓库', '倉庫'])], ['gateway', t(['Gateways', '门户', '門戶'])],
  ].map(([key, label]) => <button className={filter === key ? 'selected' : ''} onClick={() => setFilter(key)} key={key}>{label}</button>)}</div><NetworkMap filter={filter} selected={selected} onSelect={setSelected} /><div className="location-card">{(() => { const img = locationImg(selectedOffice.id); return <div className="location-photo"><img src={img.src} srcSet={img.srcSet} sizes="320px" alt={t(locationPhotos[selectedOffice.id].alt)} style={img.style} /></div>; })()}<div><span>{t(['Selected location', '所选地点', '所選地點'])}</span><h2>{t(selectedOffice.name)}</h2><p>{t(selectedOffice.detail)}</p></div><div><strong>{t(['Capabilities', '服务能力', '服務能力'])}</strong><p>{t(['Freight coordination · Documentation · Local support', '货运协调 · 单证 · 本地支持', '貨運協調 · 單證 · 本地支援'])}</p></div></div></div></section></>;
}

function TrackingPage() {
  const { t } = useI18n();
  const initial = new URLSearchParams(useLocation().search).get('no') || '';
  const [number, setNumber] = useState(initial);
  const [searched, setSearched] = useState(Boolean(initial));
  const found = number.trim().toUpperCase() === 'MAG260018';
  return <><PageHero eyebrow={t(['Shipment tracking', '货运追踪', '貨運追蹤'])} title={t(['Know where your cargo stands.', '掌握货物每一步。', '掌握貨物每一步。'])} intro={t(['Use your Magni shipment or booking number for the latest milestone.', '使用 Magni 运单或订舱编号查看最新节点。', '使用 Magni 運單或訂艙編號查看最新節點。'])} /><section className="section"><div className="container tracking-page"><form onSubmit={(event) => { event.preventDefault(); setSearched(true); }}><input value={number} onChange={(e) => { setNumber(e.target.value); setSearched(false); }} placeholder="MAG260018" /><button className="button button-accent">{t(['Track shipment', '追踪货物', '追蹤貨物'])}<Icon name="search" size={17} /></button></form>{searched && (found ? <div className="tracking-result"><div className="result-head"><div><span>{t(['In transit', '运输中', '運輸中'])}</span><h2>MAG260018</h2><p>{t(['Hong Kong → Singapore · Ocean freight', '香港 → 新加坡 · 海运', '香港 → 新加坡 · 海運'])}</p></div><strong>ETA 18 JUN</strong></div><ol>{[
    t(['Departed Hong Kong', '已离开香港', '已離開香港']), t(['Export customs cleared', '出口清关完成', '出口清關完成']), t(['Cargo received', '已接收货物', '已接收貨物']), t(['Booking confirmed', '订舱确认', '訂艙確認']),
  ].map((step, index) => <li className={index === 0 ? 'current' : ''} key={step}><i /><div><strong>{step}</strong><span>{index === 0 ? t(['Today · 09:42', '今天 · 09:42', '今天 · 09:42']) : t(['Completed', '已完成', '已完成'])}</span></div></li>)}</ol></div> : <div className="tracking-error">{t(['No shipment found. Check the number or try demo number MAG260018.', '未找到运单。请检查编号或尝试演示编号 MAG260018。', '未找到運單。請檢查編號或嘗試示範編號 MAG260018。'])}</div>)}</div></section></>;
}

function AboutPage() {
  const { t } = useI18n();
  return <><PageHero eyebrow={t(['About Magni', '关于 Magni', '關於 Magni'])} title={t(['Regional logistics, personally managed.', '区域物流，专人负责。', '區域物流，專人負責。'])} intro={t(['A Hong Kong logistics company built around ownership, practical thinking and clear communication.', '一家以责任担当、务实思维及清晰沟通为核心的香港物流企业。', '一家以責任擔當、務實思維及清晰溝通為核心的香港物流企業。'])} /><section className="section"><div className="container story-grid"><div><p className="eyebrow">{t(['Company profile', '公司简介', '公司簡介'])}</p><h2>{t(['A Hong Kong team for China–Southeast Asia freight.', '专注中国—东南亚货运的香港团队。', '專注中國—東南亞貨運的香港團隊。'])}</h2></div><div className="story-copy">{aboutContent.story.map((paragraph) => <p key={paragraph[0]}>{t(paragraph)}</p>)}</div></div></section>
    <section className="section about-photo-section"><div className="container about-photo-grid">
      <figure><img src={stock('f187045971').src} srcSet={stock('f187045971').srcSet} sizes="(max-width: 860px) 100vw, 50vw" width="960" height="480" alt={t(['Stonecutters Bridge and the Kwai Tsing container terminals, Hong Kong', '昂船洲大桥及葵青货柜码头，香港', '昂船洲大橋及葵青貨櫃碼頭，香港'])} loading="lazy" /></figure>
      <figure><img src={stock('f18189225').src} srcSet={stock('f18189225').srcSet} sizes="(max-width: 860px) 100vw, 50vw" width="960" height="640" alt={t(['Pallets of cargo in a warehouse aisle', '仓库通道中的货物托盘', '倉庫通道中的貨物托盤'])} loading="lazy" /></figure>
    </div></section>
    <section className="section timeline-section"><div className="container">
      <div className="section-heading compact"><div><p className="eyebrow">{t(['Our history', '发展历程', '發展歷程'])}</p><h2>{t(['From one border crossing to a regional network.', '从一个口岸到区域网络。', '從一個口岸到區域網絡。'])}</h2></div></div>
      <ol className="timeline">{aboutContent.timeline.map((item) => <li key={item.year}><span className="timeline-year">{item.year}</span><h3>{t(item.title)}</h3><p>{t(item.text)}</p></li>)}</ol>
    </div></section>
    <section className="section values-section"><div className="container">
      <div className="section-heading compact"><div><p className="eyebrow">{t(['How we work', '我们的工作方式', '我們的工作方式'])}</p><h2>{t(['Three promises to every customer.', '对每位客户的三个承诺。', '對每位客戶的三個承諾。'])}</h2></div></div>
      <div className="feature-columns">{aboutContent.values.map((value, index) => <div key={value.title[0]}><Icon name={(['check', 'clock', 'route'] as IconName[])[index]} size={27} /><h3>{t(value.title)}</h3><p>{t(value.text)}</p></div>)}</div>
    </div></section><CallToAction /></>;
}

function ContactPage() {
  const { t } = useI18n();
  return <><PageHero eyebrow={t(['Contact', '联系我们', '聯絡我們'])} title={t(['Talk to a logistics specialist.', '与物流专员沟通。', '與物流專員溝通。'])} intro={t(['Our Hong Kong team is ready to help with your next move.', '我们的香港团队随时协助您的下一票货运。', '我們的香港團隊隨時協助您的下一票貨運。'])} /><section className="section"><div className="container contact-grid"><div className="contact-card"><p className="eyebrow">{t(['Hong Kong office', '香港办公室', '香港辦公室'])}</p><h2>Magni Technology Limited</h2><p>{t(['Hong Kong SAR', '中国香港特别行政区', '中國香港特別行政區'])}</p><a href="tel:+85239052188">+852 3905 2188</a><a href="mailto:hello@magni-logistics.com">hello@magni-logistics.com</a><a className="button button-whatsapp" href={whatsappLink(t(whatsappGreeting))} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />{t(['Chat on WhatsApp', 'WhatsApp 咨询', 'WhatsApp 查詢'])}</a><span>{t(['Mon–Fri · 09:00–18:00 HKT', '周一至周五 · 09:00–18:00 香港时间', '週一至週五 · 09:00–18:00 香港時間'])}</span></div><ContactForm /></div></section></>;
}

function ContactForm() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  if (sent) return <div className="form-success"><Icon name="check" size={29} /><h2>{t(['Message ready', '留言已准备', '留言已準備'])}</h2><p>{t(['This frontend demo validated your message. Nothing was sent or stored.', '此前端演示已验证您的留言，但不会发送或储存任何资料。', '此前端示範已驗證您的留言，但不會傳送或儲存任何資料。'])}</p></div>;
  return <form className="page-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="form-row"><label>{t(['Name', '姓名', '姓名'])}<input required /></label><label>{t(['Email', '电邮', '電郵'])}<input required type="email" /></label></div><label>{t(['Company', '公司', '公司'])}<input /></label><label>{t(['How can we help?', '我们可以如何协助？', '我們可以如何協助？'])}<textarea required rows={5} /></label><button className="button button-accent">{t(['Send message', '发送留言', '傳送留言'])}<Icon name="arrow" size={17} /></button><small>{t(['Frontend demo — no data is sent or stored.', '此前端演示不会发送或储存资料。', '此前端示範不會傳送或儲存資料。'])}</small></form>;
}

function QuotePage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return <><PageHero eyebrow={t(['Request a quote', '获取报价', '索取報價'])} title={t(['Let’s plan your next move.', '让我们规划您的下一票货运。', '讓我們規劃您的下一票貨運。'])} intro={t(['Share the essentials and our team will come back with a practical route.', '请提供基本资料，我们的团队将为您制定切实可行的路线。', '請提供基本資料，我們的團隊將為您制定切實可行的路線。'])} /><section className="section"><div className="container quote-page">{sent ? <div className="form-success"><Icon name="check" size={31} /><h2>{t(['Enquiry ready', '询价已准备', '詢價已準備'])}</h2><p>{t(['This frontend demo has validated your details. Nothing was sent or stored.', '此前端演示已验证您的资料，但不会发送或储存。', '此前端示範已驗證您的資料，但不會傳送或儲存。'])}</p><Link className="button button-dark" to="/">{t(['Back to home', '返回首页', '返回首頁'])}</Link></div> : <form className="page-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><div className="form-row"><label>{t(['Origin', '起运地', '起運地'])}<input required placeholder={t(['e.g. Hong Kong', '例如：香港', '例如：香港'])} /></label><label>{t(['Destination', '目的地', '目的地'])}<input required placeholder={t(['e.g. Singapore', '例如：新加坡', '例如：新加坡'])} /></label></div><label>{t(['Service', '服务', '服務'])}<select required defaultValue=""><option value="" disabled>{t(['Select a service', '选择服务', '選擇服務'])}</option>{services.map((service) => <option key={service.id}>{t(service.name)}</option>)}</select></label><label>{t(['Cargo details', '货物资料', '貨物資料'])}<textarea required rows={4} placeholder={t(['Commodity, weight, volume and target date', '品名、重量、体积及目标日期', '品名、重量、體積及目標日期'])} /></label><div className="form-row"><label>{t(['Your name', '姓名', '姓名'])}<input required /></label><label>{t(['Email or phone', '电邮或电话', '電郵或電話'])}<input required /></label></div><button className="button button-accent">{t(['Send enquiry', '提交询价', '提交詢價'])}<Icon name="arrow" size={17} /></button><small>{t(['Frontend demo — no data is sent or stored.', '此前端演示不会发送或储存资料。', '此前端示範不會傳送或儲存資料。'])}</small></form>}</div></section></>;
}

function CallToAction() {
  const { t } = useI18n();
  const { openQuote } = useLayout();
  return <section className="cta-section"><div className="container cta-inner"><div><p className="eyebrow">{t(['Let’s move', '启程', '啟程'])}</p><h2>{t(['Where can we take your business next?', '下一程，与您共创业务新篇章。', '下一程，與您共創業務新篇章。'])}</h2></div><div className="cta-action"><p>{t(['Tell us what you need to move. Our team will respond with a practical route and clear next steps.', '告诉我们您的运输需求，我们将提供切实可行的路线及清晰的后续步骤。', '告訴我們您的運輸需求，我們將提供切實可行的路線及清晰的後續步驟。'])}</p><button className="button button-accent" onClick={openQuote}>{t(['Start a conversation', '开始咨询', '開始諮詢'])}<Icon name="arrow" size={18} /></button></div></div></section>;
}

// Legal pages (brief: footer must link 隐私政策 / 服务条款 / 标准交易条款).
// DRAFT structure only: final wording must come from the client and their legal adviser.
function LegalPage() {
  const { t } = useI18n();
  const { legalId } = useParams();
  const page = legalPages.find((item) => item.id === legalId);
  if (!page) return <NotFound />;
  return <><PageHero eyebrow={t(['Legal', '法律信息', '法律資訊'])} title={t(page.name)} intro={t(page.intro)} /><section className="section"><div className="container detail-layout"><aside><p>{t(['Legal', '法律信息', '法律資訊'])}</p>{legalPages.map((item) => <NavLink key={item.id} to={`/legal/${item.id}`}>{t(item.name)}</NavLink>)}</aside><article className="legal-body"><p className="legal-updated">{t(page.updated)}</p>{page.sections.map((section) => <section key={section.title[0]}><h2>{t(section.title)}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph[0]}>{t(paragraph)}</p>)}</section>)}</article></div></section></>;
}

function NotFound() {
  const { t } = useI18n();
  return <section className="not-found"><span>404</span><h1>{t(['This route has moved.', '此页面已移动。', '此頁面已移動。'])}</h1><Link className="button button-accent" to="/">{t(['Return home', '返回首页', '返回首頁'])}</Link></section>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: ServicesOverview },
      { path: 'services/:serviceId', Component: ServiceDetail },
      { path: 'solutions', Component: SolutionsOverview },
      { path: 'solutions/:solutionId', Component: SolutionDetail },
      { path: 'network', Component: NetworkPage },
      { path: 'tracking', Component: TrackingPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'quote', Component: QuotePage },
      { path: 'legal/:legalId', Component: LegalPage },
      { path: 'credits', Component: CreditsPage },
      { path: '*', Component: NotFound },
    ],
  },
], { basename: import.meta.env.BASE_URL });
