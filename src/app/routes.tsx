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
  { id: 'road', icon: 'truck' as IconName, name: ['Cross-border road', '跨境陆运', '跨境陸運'] as Copy, intro: ['Seamless trucking between Mainland China, Hong Kong and Southeast Asia.', '贯通中国内地、香港及东南亚的无缝陆运网络。', '貫通中國內地、香港及東南亞的無縫陸運網絡。'] as Copy },
  { id: 'rail', icon: 'route' as IconName, name: ['Rail freight', '铁路运输', '鐵路運輸'] as Copy, intro: ['A balanced option for cost, capacity and transit time across Eurasia.', '兼顾欧亚运输成本、运力及时间的平衡方案。', '兼顧歐亞運輸成本、運力及時間的平衡方案。'] as Copy },
  { id: 'customs', icon: 'check' as IconName, name: ['Customs clearance', '报关清关', '報關清關'] as Copy, intro: ['Accurate documentation and local support at every border.', '在每个口岸提供准确单证及本地支持。', '在每個口岸提供準確單證及本地支援。'] as Copy },
  { id: 'warehouse', icon: 'warehouse' as IconName, name: ['Warehousing', '仓储配送', '倉儲配送'] as Copy, intro: ['Consolidation, inventory handling and regional fulfilment.', '提供集货、库存管理及区域履约服务。', '提供集貨、庫存管理及區域履約服務。'] as Copy },
  { id: 'insurance', icon: 'box' as IconName, name: ['Cargo insurance', '货运保险', '貨運保險'] as Copy, intro: ['Practical protection built around your cargo and route.', '根据货物及路线提供切合实际的保障。', '根據貨物及路線提供切合實際的保障。'] as Copy },
];

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
    <div className="container footer-bottom"><span>© 2026 Magni Technology Limited</span><nav aria-label={t(['Legal', '法律信息', '法律資訊'])}>{legalPages.map((page) => <Link key={page.id} to={`/legal/${page.id}`}>{t(page.name)}</Link>)}</nav></div>
  </footer>;
}

function Home() {
  const { t } = useI18n();
  const { openQuote } = useLayout();
  const [tracking, setTracking] = useState('');
  const navigate = useNavigate();
  const track = (event: FormEvent) => { event.preventDefault(); navigate(`/tracking?no=${encodeURIComponent(tracking)}`); };
  return <>
    <section className="hero">
      <img src={`${import.meta.env.BASE_URL}images/magni-port-hero.png`} alt="" className="hero-image" /><div className="hero-overlay" />
      <div className="container hero-inner">
        <p className="eyebrow light">{t(['Built for trade across Asia', '为亚洲贸易而生', '為亞洲貿易而生'])}</p>
        <h1>{t(['Moving your business', '连接机遇，', '連接機遇，'])}<br /><em>{t(['forward.', '运达未来', '運達未來'])}</em></h1>
        <p className="hero-copy">{t(['Integrated freight and supply chain solutions connecting China, Hong Kong and Southeast Asia—with clarity at every handover.', '一体化货运及供应链方案，连接中国内地、香港与东南亚，每个交接环节清晰可控。', '一體化貨運及供應鏈方案，連接中國內地、香港與東南亞，每個交接環節清晰可控。'])}</p>
        <div className="hero-actions"><button className="button button-accent" onClick={openQuote}>{t(['Plan your shipment', '规划您的货运', '規劃您的貨運'])}<Icon name="arrow" size={18} /></button><Link className="text-button light-link" to="/services">{t(['Explore our services', '探索服务', '探索服務'])}<Icon name="arrow" size={17} /></Link></div>
      </div>
      <div className="container hero-foot"><span>22.3193° N</span><span>114.1694° E</span><span className="hero-foot-line" /><span>HONG KONG</span></div>
    </section>
    <section className="tracking-panel container">
      <div className="tracking-title"><span className="icon-box"><Icon name="search" /></span><div><p className="mini-label">{t(['Shipment visibility', '货运可视化', '貨運可視化'])}</p><h2>{t(['Track your cargo', '追踪您的货物', '追蹤您的貨物'])}</h2></div></div>
      <form className="tracking-form" onSubmit={track}><input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder={t(['Enter shipment or booking no.', '输入运单或订舱编号', '輸入運單或訂艙編號'])} /><button className="button button-dark">{t(['Track', '追踪', '追蹤'])}<Icon name="arrow" size={17} /></button></form>
      <div className="track-message">{t(['Demo: MAG260018', '演示编号：MAG260018', '示範編號：MAG260018'])}</div>
    </section>
    <section className="trust-strip"><div className="container trust-grid">{[
      ['12+', t(['Years of regional expertise', '年区域经验', '年區域經驗'])],
      ['18', t(['Markets connected across Asia', '个亚洲市场', '個亞洲市場'])],
      ['98.6%', t(['On-time documentation rate', '单证准时率', '單證準時率'])],
      ['24/7', t(['Operational visibility', '运营可视化', '營運可視化'])],
    ].map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
    <section className="section services-section"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">{t(['What we move', '运输服务', '運輸服務'])}</p><h2>{t(['One partner. Every link in the chain.', '一个伙伴，贯通供应链每一环。', '一個夥伴，貫通供應鏈每一環。'])}</h2></div><p>{t(['From a single pallet to a complex regional programme, we coordinate the details that keep your business moving.', '从单个托盘到复杂区域项目，我们协调每个细节，确保业务持续运转。', '從單個托盤到複雜區域項目，我們協調每個細節，確保業務持續運轉。'])}</p></div>
      <div className="services-grid">{services.slice(0, 4).map((service, index) => <article className="service-card" key={service.id}><div className="service-top"><span>0{index + 1}</span><Icon name={service.icon} size={31} /></div><div><small>{t(service.name)}</small><h3>{t(service.name)}</h3><p>{t(service.intro)}</p></div><Link to={`/services/${service.id}`}><span>{t(['Explore service', '查看服务', '查看服務'])}</span><Icon name="arrow" size={18} /></Link></article>)}</div>
      <div className="section-more"><Link className="text-button dark-link" to="/services">{t(['Explore all services', '查看全部服务', '查看全部服務'])}<Icon name="arrow" size={17} /></Link></div>
    </div></section>
    <section className="home-map-section"><div className="container home-map-grid"><div><p className="eyebrow">{t(['Our network', '网络覆盖', '網絡覆蓋'])}</p><h2>{t(['Local knowledge. Regional reach.', '本地经验，区域覆盖。', '本地經驗，區域覆蓋。'])}</h2><p>{t(['Our Hong Kong team connects manufacturing centres in China with major markets across Southeast Asia.', '香港团队连接中国制造中心与东南亚主要市场。', '香港團隊連接中國製造中心與東南亞主要市場。'])}</p><Link className="text-button dark-link" to="/network">{t(['Explore the network', '查看完整网络', '查看完整網絡'])}<Icon name="arrow" size={17} /></Link></div><NetworkMap compact /></div></section>
    <section className="section industries-section"><div className="container"><div className="section-heading compact"><div><p className="eyebrow">{t(['Industry solutions', '行业解决方案', '行業解決方案'])}</p><h2>{t(['Built around your cargo.', '围绕您的货物而设计。', '圍繞您的貨物而設計。'])}</h2></div><Link className="text-button dark-link" to="/solutions">{t(['View all solutions', '查看所有方案', '查看所有方案'])}<Icon name="arrow" size={17} /></Link></div><div className="industry-grid">{solutions.map((solution, index) => <Link className="industry-item" to={`/solutions/${solution.id}`} key={solution.id}><span>0{index + 1}</span><span className="industry-icon"><Icon name={solution.icon} size={28} /></span><div><h3>{t(solution.name)}</h3><p>{t(solution.text)}</p></div><Icon name="arrow" size={20} /></Link>)}</div></div></section>
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
      <p className="detail-lead">{t(['From booking to final handover, our specialists manage capacity, documentation and milestones as one connected operation.', '从订舱到最终交付，我们的专员统一管理运力、单证及各项里程碑。', '從訂艙到最終交付，我們的專員統一管理運力、單證及各項里程碑。'])}</p>
      <h2>{t(['What you can expect', '您可以期待', '您可以期待'])}</h2><div className="benefit-grid">{[
        t(['Route planning built around your priorities', '根据您的优先事项规划路线', '根據您的優先事項規劃路線']),
        t(['One point of contact across every handover', '每个交接环节均由专人负责', '每個交接環節均由專人負責']),
        t(['Clear milestone and exception updates', '清晰的里程碑及异常更新', '清晰的里程碑及異常更新']),
        t(['Local customs and documentation support', '本地清关及单证支持', '本地清關及單證支援']),
      ].map((item) => <div key={item}><Icon name="check" size={19} /><span>{item}</span></div>)}</div>
      <h2>{t(['How it works', '服务流程', '服務流程'])}</h2><div className="process-grid">{[
        t(['Plan', '规划', '規劃']), t(['Book', '订舱', '訂艙']), t(['Move', '运输', '運輸']), t(['Deliver', '交付', '交付']),
      ].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
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
  return <><PageHero eyebrow={t(['Industry solution', '行业方案', '行業方案'])} title={t(solution.name)} intro={t(solution.text)} /><section className="detail-section"><div className="container detail-layout"><aside><p>{t(['Industries', '行业', '行業'])}</p>{solutions.map((item) => <NavLink key={item.id} to={`/solutions/${item.id}`}><Icon name={item.icon} size={17} />{t(item.name)}</NavLink>)}</aside><article className="detail-content"><p className="detail-lead">{t(['Your supply chain must protect product integrity while keeping inventory, cost and delivery promises in balance. We build the operating model around those realities.', '您的供应链必须在保障产品完整性的同时，平衡库存、成本及交付承诺。我们围绕这些实际需求构建运营模式。', '您的供應鏈必須在保障產品完整性的同時，平衡庫存、成本及交付承諾。我們圍繞這些實際需求構建營運模式。'])}</p><h2>{t(['A connected approach', '一体化方案', '一體化方案'])}</h2><div className="feature-columns"><div><Icon name="route" size={27} /><h3>{t(['Route resilience', '路线韧性', '路線韌性'])}</h3><p>{t(['Primary and alternative routing planned from the start.', '从一开始便规划主要及备用路线。', '從一開始便規劃主要及備用路線。'])}</p></div><div><Icon name="box" size={27} /><h3>{t(['Cargo controls', '货物管控', '貨物管控'])}</h3><p>{t(['Handling instructions aligned across every partner.', '所有合作伙伴遵循统一操作指引。', '所有合作夥伴遵循統一操作指引。'])}</p></div><div><Icon name="clock" size={27} /><h3>{t(['Milestone clarity', '节点清晰', '節點清晰'])}</h3><p>{t(['Proactive updates before issues affect delivery.', '在问题影响交付前主动更新。', '在問題影響交付前主動更新。'])}</p></div></div><button className="button button-accent" onClick={openQuote}>{t(['Discuss your requirements', '讨论您的需求', '商討您的需求'])}<Icon name="arrow" size={17} /></button></article></div></section></>;
}

const offices = [
  { id: 'hk', x: 72, y: 41, type: 'office', name: ['Hong Kong', '香港', '香港'] as Copy, detail: ['Head office & control tower', '总部及运营控制中心', '總部及營運控制中心'] as Copy },
  { id: 'sz', x: 70, y: 36, type: 'warehouse', name: ['Shenzhen', '深圳', '深圳'] as Copy, detail: ['Consolidation warehouse', '集货仓库', '集貨倉庫'] as Copy },
  { id: 'sg', x: 71, y: 78, type: 'office', name: ['Singapore', '新加坡', '新加坡'] as Copy, detail: ['Regional partner office', '区域合作伙伴办公室', '區域合作夥伴辦公室'] as Copy },
  { id: 'bkk', x: 60, y: 60, type: 'gateway', name: ['Bangkok', '曼谷', '曼谷'] as Copy, detail: ['Road & ocean gateway', '陆运及海运门户', '陸運及海運門戶'] as Copy },
  { id: 'sgn', x: 69, y: 65, type: 'gateway', name: ['Ho Chi Minh City', '胡志明市', '胡志明市'] as Copy, detail: ['Ocean & air gateway', '海空运门户', '海空運門戶'] as Copy },
];

function NetworkMap({ compact = false, filter = 'all', selected, onSelect }: { compact?: boolean; filter?: string; selected?: string; onSelect?: (id: string) => void }) {
  const { t } = useI18n();
  const visible = offices.filter((office) => filter === 'all' || office.type === filter);
  return <div className={`network-map ${compact ? 'compact' : ''}`}>
    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img" aria-label={t(['Asia logistics network map', '亚洲物流网络地图', '亞洲物流網絡地圖'])}>
      <rect className="map-sea" width={MAP_WIDTH} height={MAP_HEIGHT} />
      {mapLand.map((country) => <path key={country.iso} className={`map-land ${country.primary ? '' : 'secondary'}`} d={country.d} />)}
      {mapCountryLabels.map((label) => <text key={label.en} className={`map-country ${label.sea ? 'sea' : ''}`} x={label.x} y={label.y} textAnchor="middle">{label.en}</text>)}
      {mapRoutes.filter((route) => visible.some((office) => office.id === route.to) || filter === 'all').map((route) => <path key={route.to} className="map-route" d={route.d} />)}
      {visible.map((office) => { const point = mapLocations[office.id]; return <g key={office.id} className={`map-pin ${office.type} ${selected === office.id ? 'selected' : ''}`} transform={`translate(${point.x} ${point.y})`} role="button" tabIndex={0} aria-label={t(office.name)} onClick={() => onSelect?.(office.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect?.(office.id); } }}>
        <circle r="16" className="pin-ring" /><circle r="6" className="pin-dot" /><text x={point.label.dx} y={point.label.dy} textAnchor={point.label.anchor}>{t(office.name)}</text>
      </g>; })}
    </svg>
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
  ].map(([key, label]) => <button className={filter === key ? 'selected' : ''} onClick={() => setFilter(key)} key={key}>{label}</button>)}</div><NetworkMap filter={filter} selected={selected} onSelect={setSelected} /><div className="location-card"><div><span>{t(['Selected location', '所选地点', '所選地點'])}</span><h2>{t(selectedOffice.name)}</h2><p>{t(selectedOffice.detail)}</p></div><div><strong>{t(['Capabilities', '服务能力', '服務能力'])}</strong><p>{t(['Freight coordination · Documentation · Local support', '货运协调 · 单证 · 本地支持', '貨運協調 · 單證 · 本地支援'])}</p></div></div></div></section></>;
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
  return <><PageHero eyebrow={t(['About Magni', '关于 Magni', '關於 Magni'])} title={t(['Regional logistics, personally managed.', '区域物流，专人负责。', '區域物流，專人負責。'])} intro={t(['A Hong Kong logistics company built around ownership, practical thinking and clear communication.', '一家以责任担当、务实思维及清晰沟通为核心的香港物流企业。', '一家以責任擔當、務實思維及清晰溝通為核心的香港物流企業。'])} /><section className="section"><div className="container story-grid"><div><p className="eyebrow">{t(['Our story', '我们的故事', '我們的故事'])}</p><h2>{t(['Close to the cargo. Closer to our customers.', '贴近货物，更贴近客户。', '貼近貨物，更貼近客戶。'])}</h2></div><div><p>{t(['Magni Technology Limited was established in Hong Kong to give growing businesses a more accountable way to manage freight across Asia. We combine direct access to China’s manufacturing centres with trusted capability across Southeast Asia.', 'Magni Technology Limited 成立于香港，致力为成长型企业提供更具责任感的亚洲货运管理方式。我们将中国制造中心的直接通道与东南亚的可靠服务能力相结合。', 'Magni Technology Limited 成立於香港，致力為成長型企業提供更具責任感的亞洲貨運管理方式。我們將中國製造中心的直接通道與東南亞的可靠服務能力相結合。'])}</p><div className="value-list">{[t(['Take ownership', '主动担当', '主動擔當']), t(['Communicate early', '及时沟通', '及時溝通']), t(['Solve practically', '务实解决', '務實解決'])].map((value) => <span key={value}><Icon name="check" size={18} />{value}</span>)}</div></div></div></section><CallToAction /></>;
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
const legalPages: { id: string; name: Copy; intro: Copy; sections: Array<{ title: Copy; body: Copy }> }[] = [
  {
    id: 'privacy',
    name: ['Privacy Policy', '隐私政策', '私隱政策'],
    intro: ['How Magni Technology Limited collects, uses and protects personal data.', 'Magni Technology Limited 如何收集、使用及保护个人资料。', 'Magni Technology Limited 如何收集、使用及保障個人資料。'],
    sections: [
      { title: ['1. Data we collect', '1. 我们收集的资料', '1. 我們收集的資料'], body: ['Contact details and shipment information you submit through our quote, contact and tracking forms.', '您通过询价、联系及追踪表单提交的联系方式及货运资料。', '您透過詢價、聯絡及追蹤表格提交的聯絡資料及貨運資料。'] },
      { title: ['2. How we use it', '2. 资料用途', '2. 資料用途'], body: ['To answer enquiries, prepare quotations and provide logistics services.', '用于回复咨询、准备报价及提供物流服务。', '用於回覆查詢、準備報價及提供物流服務。'] },
      { title: ['3. Sharing and retention', '3. 资料共享及保存', '3. 資料披露及保存'], body: ['Details pending client confirmation.', '具体内容待客户确认。', '具體內容待客戶確認。'] },
      { title: ['4. Your rights and contact', '4. 您的权利及联系方式', '4. 您的權利及聯絡方式'], body: ['Details pending client confirmation, in line with the Personal Data (Privacy) Ordinance (Cap. 486).', '具体内容待客户确认，并符合香港《个人资料（私隐）条例》（第486章）。', '具體內容待客戶確認，並符合《個人資料（私隱）條例》（第486章）。'] },
    ],
  },
  {
    id: 'terms',
    name: ['Terms of Service', '服务条款', '服務條款'],
    intro: ['The terms that apply when you use this website.', '使用本网站时适用的条款。', '使用本網站時適用的條款。'],
    sections: [
      { title: ['1. Use of this website', '1. 网站使用', '1. 網站使用'], body: ['Information on this website is for general reference and does not form a contract.', '本网站信息仅供一般参考，并不构成合同。', '本網站資訊僅供一般參考，並不構成合約。'] },
      { title: ['2. Quotations', '2. 报价', '2. 報價'], body: ['Online enquiries are not binding. A quotation is confirmed only in writing by our team.', '网上询价不具约束力，报价以我们团队的书面确认为准。', '網上詢價不具約束力，報價以我們團隊的書面確認為準。'] },
      { title: ['3. Liability', '3. 责任', '3. 責任'], body: ['Details pending client confirmation.', '具体内容待客户确认。', '具體內容待客戶確認。'] },
      { title: ['4. Governing law', '4. 适用法律', '4. 適用法律'], body: ['Details pending client confirmation.', '具体内容待客户确认。', '具體內容待客戶確認。'] },
    ],
  },
  {
    id: 'trading-terms',
    name: ['Standard Trading Conditions', '标准交易条款', '標準交易條款'],
    intro: ['The conditions under which Magni Technology Limited handles all business.', 'Magni Technology Limited 承办所有业务时适用的条款。', 'Magni Technology Limited 承辦所有業務時適用的條款。'],
    sections: [
      { title: ['1. Scope', '1. 适用范围', '1. 適用範圍'], body: ['These conditions apply to all freight forwarding, customs, warehousing and related services we provide.', '本条款适用于我们提供的所有货运代理、报关、仓储及相关服务。', '本條款適用於我們提供的所有貨運代理、報關、倉儲及相關服務。'] },
      { title: ['2. Customer obligations', '2. 客户责任', '2. 客戶責任'], body: ['Details pending client confirmation.', '具体内容待客户确认。', '具體內容待客戶確認。'] },
      { title: ['3. Liability limits', '3. 责任限额', '3. 責任限額'], body: ['Details pending client confirmation.', '具体内容待客户确认。', '具體內容待客戶確認。'] },
      { title: ['4. Claims and time limits', '4. 索赔及时限', '4. 索償及時限'], body: ['Details pending client confirmation.', '具体内容待客户确认。', '具體內容待客戶確認。'] },
    ],
  },
];

function LegalPage() {
  const { t } = useI18n();
  const { legalId } = useParams();
  const page = legalPages.find((item) => item.id === legalId);
  if (!page) return <NotFound />;
  return <><PageHero eyebrow={t(['Legal', '法律信息', '法律資訊'])} title={t(page.name)} intro={t(page.intro)} /><section className="section"><div className="container detail-layout"><aside><p>{t(['Legal', '法律信息', '法律資訊'])}</p>{legalPages.map((item) => <NavLink key={item.id} to={`/legal/${item.id}`}>{t(item.name)}</NavLink>)}</aside><article className="legal-body"><p className="legal-note">{t(['Draft for review. Final text to be supplied by Magni Technology Limited.', '草稿待审阅，最终文本由 Magni Technology Limited 提供。', '草稿待審閱，最終文本由 Magni Technology Limited 提供。'])}</p>{page.sections.map((section) => <section key={section.title[0]}><h2>{t(section.title)}</h2><p>{t(section.body)}</p></section>)}</article></div></section></>;
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
      { path: '*', Component: NotFound },
    ],
  },
], { basename: import.meta.env.BASE_URL });
