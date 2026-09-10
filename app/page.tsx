"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Route =
  | "home"
  | "store"
  | "cart"
  | "about"
  | "contact"
  | "login"
  | "register"
  | "welcome"
  | "panel";

type Product = {
  id: number;
  name: string;
  pet: "سگ" | "گربه";
  brand: string;
  weight: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  { id: 1, name: "غذای خشک سگ هیلز Science Plan", pet: "سگ", brand: "هیلز", weight: "۲ کیلوگرم", price: 2210000, oldPrice: 2600000, image: "/ref-assets/pack-1.png", badge: "-15%" },
  { id: 2, name: "غذای خشک سگ مونژه Adult Dog", pet: "سگ", brand: "مونژه", weight: "۲.۵ کیلوگرم", price: 1890000, image: "/ref-assets/pack-2.png" },
  { id: 3, name: "غذای خشک سگ پروپلن Adult Small Breed", pet: "سگ", brand: "پروپلن", weight: "۲ کیلوگرم", price: 2140000, oldPrice: 2390000, image: "/ref-assets/pack-3.png", badge: "-10%" },
  { id: 4, name: "غذای خشک سگ رویال کنین Mini Adult", pet: "سگ", brand: "رویال کنین", weight: "۱.۵ کیلوگرم", price: 1950000, image: "/ref-assets/pack-4.png" },
  { id: 5, name: "غذای خشک گربه هیلز Adult Chicken", pet: "گربه", brand: "هیلز", weight: "۱.۵ کیلوگرم", price: 2250000, image: "/ref-assets/pack-5.png" },
  { id: 6, name: "غذای خشک گربه مونژه Adult Cat", pet: "گربه", brand: "مونژه", weight: "۱.۵ کیلوگرم", price: 1760000, image: "/ref-assets/pack-6.png" },
  { id: 7, name: "غذای خشک گربه پروپلن Sterilised", pet: "گربه", brand: "پروپلن", weight: "۱.۵ کیلوگرم", price: 2320000, oldPrice: 2640000, image: "/ref-assets/pack-7.png", badge: "-12%" },
  { id: 8, name: "غذای خشک گربه رویال کنین Indoor", pet: "گربه", brand: "رویال کنین", weight: "۲ کیلوگرم", price: 1960000, image: "/ref-assets/pack-8.png" },
];


const homeFeatured: Product[] = [
  { id: 101, name: "غذای خشک سگ پروپلن", pet: "سگ", brand: "پروپلن", weight: "۲.۵ کیلوگرم", price: 2570000, image: "/ref-assets/home-pack-1.png" },
  { id: 102, name: "غذای خشک سگ رویال کنین", pet: "سگ", brand: "رویال کنین", weight: "۲ کیلوگرم", price: 2090000, oldPrice: 2390000, image: "/ref-assets/home-pack-2.png", badge: "-12%" },
  { id: 103, name: "غذای خشک سگ آکانا", pet: "سگ", brand: "آکانا", weight: "۲.۵ کیلوگرم", price: 2450000, image: "/ref-assets/home-pack-3.png" },
  { id: 104, name: "غذای خشک گربه هیلز", pet: "گربه", brand: "هیلز", weight: "۲ کیلوگرم", price: 1890000, oldPrice: 2100000, image: "/ref-assets/home-pack-4.png", badge: "-10%" },
  { id: 105, name: "غذای خشک گربه مونژه", pet: "گربه", brand: "مونژه", weight: "۲ کیلوگرم", price: 1680000, image: "/ref-assets/home-pack-5.png" },
];

const money = (n: number) => `${new Intl.NumberFormat("fa-IR").format(n)} تومان`;

function go(route: Route) {
  window.location.hash = route === "home" ? "" : route;
  window.scrollTo({ top: 0, behavior: "auto" });
}

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.7-3.7"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4.8 21a7.2 7.2 0 0 1 14.4 0"/></>,
    cart: <><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.5L20.5 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    headset: <><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm16 0h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z"/><path d="M17 19c0 1.1-.9 2-2 2h-3"/></>,
    shield: <><path d="M12 3 4.5 6v5.5c0 4.8 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.7 7.5-9.5V6L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    truck: <><path d="M3 6h11v10H3z"/><path d="M14 9h3l4 4v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    phone: <path d="M7.2 3.5 4.5 5.2c-.8.5-1.1 1.5-.8 2.4 2 5.6 6.4 10 12 12 .9.3 1.9 0 2.4-.8l1.7-2.7-4.5-2.2-1.4 2c-2.6-1.3-4.6-3.3-6-6l2-1.4-2.7-5Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    pin: <><path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z"/><circle cx="12" cy="9" r="2.4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    paw: <><circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5.5" cy="13" r="1.7"/><circle cx="18.5" cy="13" r="1.7"/><path d="M8 18c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.7-1.7 3-4 3s-4-1.3-4-3Z"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/>,
    box: <><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></>,
    tag: <><path d="M3 12.5 12.5 3H20v7.5L10.5 20 3 12.5Z"/><circle cx="16" cy="7" r="1"/></>,
    home: <><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  };
  return <svg {...common}>{paths[name] ?? paths.paw}</svg>;
}

function Logo() {
  return <button className="logo" onClick={() => go("home")} aria-label="صفحه اصلی پت اوکیو"><img src="/ref-assets/logo-wide.png" alt="پت اوکیو" /></button>;
}

function Header({ route, count }: { route: Route; count: number }) {
  const links: [Route, string][] = [["home", "صفحه اصلی"], ["store", "فروشگاه"], ["about", "درباره ما"], ["contact", "تماس با ما"]];
  return <header className="site-header shell">
    <Logo />
    <nav aria-label="ناوبری اصلی">{links.map(([r, label]) => <button key={r} className={route === r || (route === "cart" && r === "store") || (route === "panel" && r === "store") ? "active" : ""} onClick={() => go(r)}>{label}{r === "store" && <span className="nav-chevron">⌄</span>}</button>)}</nav>
    <div className="header-actions">
      <button className="head-icon" aria-label="جستجو"><Icon name="search" size={26}/></button>
      <button className="head-icon" aria-label="حساب کاربری" onClick={() => go("login")}><Icon name="user" size={26}/></button>
      <button className="head-icon cart-button" aria-label="سبد خرید" onClick={() => go("cart")}><Icon name="cart" size={27}/><span>{count}</span></button>
      <button className="consult-btn" onClick={() => go("contact")}><Icon name="headset" size={21}/>مشاوره خرید</button>
    </div>
  </header>;
}

const featureItems = [
  { icon: "lock", title: "پرداخت امن", text: "پرداخت آنلاین مطمئن" },
  { icon: "headset", title: "مشاوره تخصصی", text: "پاسخگویی قبل و بعد از خرید" },
  { icon: "truck", title: "ارسال سریع", text: "ارسال به سراسر کشور" },
  { icon: "shield", title: "تضمین اصالت کالا", text: "کالاهای اصل با ضمانت نامه" },
];

function FeatureStrip() {
  return <section className="feature-strip shell">{featureItems.map((item) => <div className="feature-item" key={item.title}><Icon name={item.icon} size={34}/><span><b>{item.title}</b><small>{item.text}</small></span></div>)}</section>;
}

function Footer() {
  return <>
    <FeatureStrip />
    <footer className="site-footer">
      <div className="shell footer-grid">
        <section className="footer-brand"><img src="/ref-assets/logo-wide.png" alt="Petokio"/><p>پت‌اوکیو، همراه همیشگی شما برای تغذیه بهتر و حال خوب سگ‌ها و گربه‌های دوست‌داشتنی‌تان 🧡</p><div className="socials"><span>◎</span><span>➤</span><span>◉</span><span>◌</span></div></section>
        <section><h4>دسترسی سریع</h4><button onClick={() => go("store")}>فروشگاه</button><button onClick={() => go("about")}>درباره ما</button><button onClick={() => go("contact")}>تماس با ما</button><button onClick={() => go("contact")}>مشاوره خرید</button></section>
        <section><h4>راهنمای مشتری</h4><button>سوالات متداول</button><button>روش‌های پرداخت</button><button>شرایط بازگشت کالا</button><button>حریم خصوصی</button></section>
        <section className="license"><h4>نمادها و مجوزها</h4><div><span>e<br/><small>نماد اعتماد</small></span><span>◉<br/><small>ساماندهی</small></span><span>V<br/><small>اتحادیه</small></span></div></section>
      </div>
      <div className="copyright">© تمامی حقوق این وب‌سایت متعلق به پت‌اوکیو است.</div>
    </footer>
  </>;
}

function ProductCard({ product, onAdd, compact = false }: { product: Product; onAdd: (p: Product) => void; compact?: boolean }) {
  return <article className={`product-card${compact ? " compact" : ""}`}>
    <button className="heart-button" aria-label="افزودن به علاقه‌مندی"><Icon name="heart" size={19}/></button>
    {product.badge && <span className="sale-badge">{product.badge}</span>}
    <div className="product-image"><img src={product.image} alt={product.name}/></div>
    <h3>{product.name}</h3>
    <p>{product.weight}</p>
    <div className="product-price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
    <button className="primary-btn add-btn" onClick={() => onAdd(product)}><Icon name="cart" size={18}/>افزودن به سبد خرید</button>
  </article>;
}

function Home({ onAdd }: { onAdd: (p: Product) => void }) {
  const featured = homeFeatured;
  return <>
    <main className="home shell">
      <section className="home-hero">
        <div className="hero-art"><img src="/ref-assets/hero_art.png" alt="سگ و گربه پت اوکیو"/></div>
        <div className="hero-copy">
          <h1>حال خوب پت شما از<br/>تغذیه خوب شروع میشه</h1>
          <p>غذای خوب، برند مطمئن و راهنمایی تخصصی برای پت شما</p>
          <div className="hero-actions"><button className="primary-btn" onClick={() => go("store")}><Icon name="cart" size={18}/>مشاهده فروشگاه</button><button className="secondary-btn" onClick={() => go("contact")}><Icon name="headset" size={19}/>مشاوره خرید</button></div>
          <div className="hero-trust"><span><Icon name="shield" size={20}/>تضمین اصالت کالا</span><span><Icon name="truck" size={20}/>ارسال سریع</span><span><Icon name="headset" size={20}/>مشاوره تخصصی</span></div>
        </div>
      </section>

      <button className="visual-banner fast-banner" aria-label="ارسال یک ساعته تهران"><img src="/ref-assets/fast_art.png" alt="تهران یا اطراف تهرانی؟ هر چی بخوای یک ساعته به دستت میرسه"/></button>

      <section className="category-grid">
        <button onClick={() => go("store")}><img src="/ref-assets/dog_category.png" alt="برای سگ‌ها - مشاهده غذای سگ"/></button>
        <button onClick={() => go("store")}><img src="/ref-assets/cat_category.png" alt="برای گربه‌ها - مشاهده غذای گربه"/></button>
      </section>

      <div className="section-heading"><span><Icon name="paw" size={22}/></span><h2>پرفروش‌ترین محصولات</h2></div>
      <section className="home-products">{featured.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</section>

      <button className="visual-banner advisor-banner" onClick={() => go("contact")}><img src="/ref-assets/advisor.png" alt="برای انتخاب غذای مناسب پت مشاوره بگیرید"/></button>

      <div className="brand-strip-image"><img src="/ref-assets/brands.png" alt="برندهای رویال کنین، پروپلن، هیلز و مونژه"/></div>
    </main>
    <Footer />
  </>;
}

function Store({ onAdd }: { onAdd: (p: Product) => void }) {
  const [pet, setPet] = useState<"همه" | "سگ" | "گربه">("همه");
  const [query, setQuery] = useState("");
  const shown = products.filter((p) => (pet === "همه" || p.pet === pet) && p.name.includes(query));
  return <>
    <main className="store-page shell">
      <section className="store-hero"><div className="store-art"><img src="/ref-assets/store-scene.png" alt="سگ و گربه"/></div><div><div className="crumb">صفحه اصلی　/　فروشگاه <Icon name="home" size={16}/></div><h1>فروشگاه پت‌اوکیو</h1><p>غذای باکیفیت برای سگ‌ها و گربه‌ها</p></div></section>
      <section className="store-toolbar"><div className="search-field"><Icon name="search" size={23}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو در محصولات..."/></div><span>۲۴ محصول</span><select aria-label="مرتب‌سازی"><option>مرتب‌سازی:　پرفروش‌ترین</option><option>ارزان‌ترین</option><option>گران‌ترین</option></select><button className="filter-mobile">☷ فیلترها</button></section>
      <div className="store-layout">
        <aside className="filters">
          <FilterTitle>دسته‌بندی</FilterTitle>
          <label><input type="checkbox" checked={pet === "سگ" || pet === "همه"} onChange={() => setPet(pet === "سگ" ? "همه" : "سگ")}/>غذای سگ</label>
          <label><input type="checkbox" checked={pet === "گربه" || pet === "همه"} onChange={() => setPet(pet === "گربه" ? "همه" : "گربه")}/>غذای گربه</label>
          <hr/><FilterTitle>برند</FilterTitle>{["رویال کنین", "هیلز", "مونژه", "پروپلن"].map((b) => <label key={b}><input type="checkbox"/>{b}</label>)}
          <hr/><FilterTitle>بازه قیمت</FilterTitle><input className="price-range" type="range" min="850000" max="3500000" defaultValue="3000000"/><div className="range-labels"><span>۸۵۰,۰۰۰ تومان</span><span>۳,۵۰۰,۰۰۰ تومان</span></div>
          <hr/><FilterTitle>وزن محصول</FilterTitle>{["۱.۵ کیلوگرم", "۲ کیلوگرم", "۲.۵ کیلوگرم"].map((x) => <label key={x}><input type="checkbox"/>{x}</label>)}
          <hr/><FilterTitle>موجود بودن</FilterTitle><label><input type="checkbox"/>موجود در انبار</label>
          <hr/><FilterTitle>تخفیف‌دار</FilterTitle><label><input type="checkbox"/>فقط محصولات تخفیف‌دار</label>
          <button className="green-btn full">اعمال فیلتر</button><button className="secondary-btn full">حذف فیلترها</button>
        </aside>
        <section className="store-products">{shown.map((p) => <ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</section>
      </div>
      <section className="store-categories"><button onClick={() => setPet("سگ")}><img src="/ref-assets/dog_category.png" alt="برای سگ‌ها"/></button><button onClick={() => setPet("گربه")}><img src="/ref-assets/cat_category.png" alt="برای گربه‌ها"/></button></section>
      <div className="pagination"><button>قبلی ‹</button><b>۱</b><span>۲</span><span>۳</span><span>۴</span><button>بعدی ›</button></div>
    </main><Footer/>
  </>;
}

function FilterTitle({ children }: { children: ReactNode }) { return <h3><Icon name="paw" size={19}/>{children}</h3>; }

function Cart({ items, setItems, onAdd }: { items: Product[]; setItems: (p: Product[]) => void; onAdd: (p: Product) => void }) {
  const cartItems = items.length ? items.slice(0, 3) : products.slice(0, 3);
  const total = cartItems.reduce((s, p) => s + p.price, 0);
  return <>
    <main className="cart-page shell">
      <div className="cart-heading"><div className="crumb">صفحه اصلی　/　فروشگاه　/　سبد خرید</div><h1><Icon name="paw" size={35}/>سبد خرید شما</h1><p>محصولات انتخابی پت شما همین‌جاست</p></div>
      <div className="cart-layout">
        <section className="cart-table"><div className="cart-table-head"><span>محصول</span><span>قیمت واحد</span><span>تعداد</span><span>مجموع</span><span>حذف</span></div>{cartItems.map((p, index) => <div className="cart-row" key={`${p.id}-${index}`}><div className="cart-product"><img src={p.image} alt={p.name}/><span><b>{p.name}</b><small>وزن {p.weight}</small><em>{index === 1 ? "حاوی مرغ تازه" : "مناسب نژادهای کوچک"}</em></span></div><strong>{money(p.price)}</strong><div className="qty"><button>+</button><span>۱</span><button>−</button></div><strong>{money(p.price)}</strong><div className="cart-remove"><button onClick={() => setItems(cartItems.filter((_, i) => i !== index))}>⌫</button><button><Icon name="heart" size={19}/></button></div></div>)}</section>
        <aside className="cart-summary"><h2>خلاصه سفارش　▧</h2><p><span>مجموع کالاها</span><b>{money(total)}</b></p><p className="green-text"><span>تخفیف</span><b>− ۳۰۰,۰۰۰ تومان</b></p><p className="green-text"><span>هزینه ارسال</span><b>رایگان</b></p><hr/><h3><span>مبلغ نهایی</span><b>{money(Math.max(0, total - 300000))}</b></h3><label>کد تخفیف<div><input placeholder="کد تخفیف خود را وارد کنید"/><button>اعمال</button></div></label><button className="primary-btn full">ادامه فرآیند خرید　‹</button><button className="secondary-btn full" onClick={() => go("store")}>ادامه خرید　<Icon name="lock" size={17}/></button><small className="summary-note"><Icon name="shield" size={16}/>پرداخت امن و تضمین اصالت کالا</small></aside>
      </div>
      <section className="cart-recommend"><div className="cart-consult-art"><img src="/ref-assets/cart-consult.png" alt="مشاوره غذای پت"/></div><div><h3>برای انتخاب غذای مناسب پتت<br/>نیاز به راهنمایی داری؟</h3><button className="green-btn" onClick={() => go("contact")}><Icon name="headset" size={17}/>دریافت مشاوره خرید</button></div><div className="suggest-card"><ProductCard product={products[0]} onAdd={onAdd} compact/></div><div className="suggest-card"><ProductCard product={products[7]} onAdd={onAdd} compact/></div></section>
      <div className="empty-cart-banner"><span>اگر سبدت خالی شد، از فروشگاه شروع کن</span><small>صدها محصول باکیفیت برای سگ‌ها و گربه‌ها در انتظار پت شماست.</small><button className="secondary-btn" onClick={() => go("store")}>مشاهده فروشگاه ‹</button></div>
    </main><Footer/>
  </>;
}

function About() {
  return <>
    <main className="about-page shell">
      <section className="about-hero"><div className="about-art"><img src="/ref-assets/about-scene.png" alt="سگ و گربه"/></div><div><h1>درباره پت‌اوکیو</h1><p>ما اینجاییم تا بهترین تغذیه و مراقبت را برای سگ‌ها و گربه‌های شما فراهم کنیم.</p><p>با محصولات باکیفیت، قیمت مناسب و راهنمایی تخصصی در کنار شما هستیم<br/>تا پت عزیزتان سالم‌تر و شادتر زندگی کند.</p></div></section>
      <section className="about-values">{[
        ["shield", "محصولات اورجینال", "تمامی محصولات ما اورجینال و دارای اصالت کالا هستند. سلامت پت شما اولویت ماست."],
        ["tag", "قیمت‌گذاری مناسب", "کیفیت بالا با قیمت منصفانه تا بهترین انتخاب همیشه در دسترس شما باشد."],
        ["headset", "تیم متخصص و دامپزشکی", "تیم پت‌اوکیو از متخصصین تغذیه حیوانات و دامپزشکان تشکیل شده است."],
        ["box", "بسته حمایتی برای حیوانات بی‌سرپرست", "با هر خرید، یک بسته غذایی حمایتی برای حیوانات بی‌سرپرست ارسال می‌کنیم."],
        ["paw", "تنها واردکننده از فرانسه", "ما تنها واردکننده مستقیم محصولات منتخب از فرانسه هستیم تا از اصالت و کیفیت مطمئن باشید."],
      ].map(([icon, title, text]) => <article key={title}><Icon name={icon} size={43}/><h3>{title}</h3><p>{text}</p>{title.includes("حمایتی") && <button className="green-btn">ارسال رایگان</button>}</article>)}</section>
      <section className="about-bottom"><article className="why-card"><img src="/ref-assets/about-why.png" alt="چرا پت اوکیو"/></article><article className="team-card"><img src="/ref-assets/about-team.png" alt="تیم پت اوکیو"/></article></section>
      <section className="charity-banner"><div><b>♥　بسته غذایی حمایتی برای حیوانات بی‌سرپرست　♥</b><p>با هر خرید شما یک بسته غذایی حمایتی برای حیوانات بی‌سرپرست ارسال می‌کنیم.</p><strong>به صورت رایگان ارسال می‌شود</strong></div><button className="primary-btn">درخواست ارسال رایگان　♥</button></section>
    </main><Footer/>
  </>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <>
    <main className="contact-page shell">
      <section className="contact-hero"><div className="contact-art"><img src="/ref-assets/contact-scene.png" alt="سگ و گربه"/></div><div><h1>تماس با ما</h1><p>ما اینجاییم تا به سوالات شما درباره سفارش، محصولات و<br/>مشاوره خرید پاسخ بدیم.</p></div><div className="phone-art"><img src="/ref-assets/contact-phone.png" alt="تلفن"/></div></section>
      <section className="contact-cards">{[
        ["phone", "تلفن", "۰۲۱-۲۲۳۳۴۵۶۷\n۰۹۱۲-۱۲۳-۴۵۶۷"], ["mail", "ایمیل", "info@petokio.com"], ["pin", "آدرس", "تهران، خیابان شریعتی،\nپلاک ۱۲۴، واحد ۴"], ["clock", "ساعات کاری", "شنبه تا پنجشنبه\n۹:۰۰ تا ۱۸:۰۰"], ["user", "ما را دنبال کنید", "◎　➤　◉"]
      ].map(([icon,title,text]) => <article key={title}><Icon name={icon} size={32}/><div><h3>{title}</h3><p>{String(text).split("\n").map((t,i)=><span key={i}>{t}<br/></span>)}</p></div></article>)}</section>
      <div className="contact-main">
        <aside><section className="contact-consult"><img src="/ref-assets/cart-consult.png" alt="مشاوره خرید"/><div><h2>مشاوره خرید</h2><p>برای انتخاب بهترین غذای سگ یا گربه‌ات، تیم ما کنارته.</p><button className="green-btn"><Icon name="headset" size={17}/>درخواست مشاوره</button></div></section><section className="map-card"><div className="map-pin"><Icon name="paw" size={24}/></div><button>◌ مشاهده در نقشه</button></section></aside>
        <section className="message-form"><h2>فرم ارسال پیام　<Icon name="paw" size={21}/></h2><div className="form-grid"><label>نام<div className="input-wrap"><Icon name="user" size={19}/><input placeholder="مثال: علی محمدی"/></div></label><label>شماره تماس<div className="input-wrap"><Icon name="phone" size={19}/><input placeholder="مثال: ۰۹۱۲-۱۲۳-۴۵۶۷"/></div></label></div><label>موضوع<select><option>انتخاب موضوع</option><option>مشاوره خرید</option><option>پیگیری سفارش</option></select></label><label>پیام<textarea placeholder="پیام خود را بنویسید..."/></label><button className="primary-btn full" onClick={() => setSent(true)}>{sent ? "پیام شما ارسال شد ✓" : "ارسال پیام"}<Icon name="paw" size={19}/></button></section>
      </div>
    </main><Footer/>
  </>;
}

function Auth({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  return <>
    <main className={`auth-page shell ${isRegister ? "register-page" : ""}`}>
      <section className="auth-visual"><div className="auth-scene"/><div className="help-card"><Icon name="headset" size={47}/><div><h3>نیاز به راهنمایی دارید؟</h3><p>تیم پشتیبانی ما کنار شماست.</p><button className="green-btn" onClick={() => go("contact")}><Icon name="headset" size={16}/>دریافت مشاوره خرید</button></div></div></section>
      <section className="auth-form"><h1>{isRegister ? "ثبت‌نام" : "ورود"}<Icon name="paw" size={28}/></h1><p>{isRegister ? "برای ساخت حساب کاربری و خرید سریع‌تر، اطلاعات خود را وارد کنید." : "برای پیگیری سفارش و خرید سریع‌تر وارد حساب خود شوید."}</p>
        {isRegister && <AuthField label="نام و نام خانوادگی" icon="user" placeholder="مثال: علی احمدی"/>}
        <AuthField label="شماره موبایل" icon="phone" placeholder="مثال: ۰۹۱۲ ۱۲۳ ۴۵۶۷"/>
        <AuthField label="رمز عبور" icon="lock" placeholder="رمز عبور خود را وارد کنید" type="password"/>
        {isRegister && <AuthField label="تکرار رمز عبور" icon="lock" placeholder="رمز عبور را دوباره وارد کنید" type="password"/>}
        <div className="auth-options"><label><input type="checkbox"/>{isRegister ? "قوانین و حریم خصوصی را می‌پذیرم." : "مرا به خاطر بسپار"}</label>{!isRegister && <button>رمز عبور را فراموش کرده‌اید؟</button>}</div>
        <button className="primary-btn full" onClick={() => go(isRegister ? "welcome" : "panel")}>{isRegister ? "ثبت‌نام" : "ادامه"}</button>
        <button className="secondary-btn full">{isRegister ? "ثبت‌نام" : "ورود"} با کد تایید　▦</button>
        <div className="or"><span>یا</span></div>
        <div className="social-login"><button>ورود با Apple　●</button><button>ورود با Google　<span className="google-g">G</span></button></div>
        <p className="auth-switch">{isRegister ? "حساب کاربری دارید؟" : "حساب کاربری ندارید؟"} <button onClick={() => go(isRegister ? "login" : "register")}>{isRegister ? "ورود" : "ثبت‌نام"}</button></p>
        {!isRegister && <p className="privacy-note"><Icon name="shield" size={19}/>ورود شما به معنای پذیرش <b>قوانین و حریم خصوصی</b> است.</p>}
        {isRegister && <section className="verify-box"><h3>کد تایید　<Icon name="shield" size={21}/></h3><p>کد ارسال‌شده به شماره ۰۹۱۲ *** ۴۵۶۷ را وارد کنید</p><div>{[1,2,3,4].map(i=><input key={i} aria-label={`رقم ${i}`} maxLength={1}/>)}</div><button>ارسال مجدد (۰:۵۹)</button></section>}
      </section>
    </main><Footer/>
  </>;
}

function AuthField({ label, icon, placeholder, type = "text" }: { label: string; icon: string; placeholder: string; type?: string }) {
  return <label className="auth-field">{label}<div><Icon name={icon} size={20}/><input type={type} placeholder={placeholder}/></div></label>;
}

function Welcome() {
  const [petType, setPetType] = useState<"سگ" | "گربه">("سگ");
  return <main className="welcome-page shell">
    <div className="welcome-top"><button className="back-btn" onClick={() => go("home")}>←　بازگشت</button><Logo/><div className="steps"><span>مرحله ۱ از ۳</span><i className="current"/><i/><i/></div></div>
    <section className="welcome-main"><div className="welcome-visual"><img src="/ref-assets/welcome-scene.png" alt="به خانواده پت اوکیو خوش اومدی"/></div><form className="pet-profile" onSubmit={(e) => {e.preventDefault(); go("panel");}}><WelcomeField label="نام پت" icon="paw"><input placeholder="مثال: نانی"/></WelcomeField><WelcomeField label="نوع پت" icon="paw"><div className="pet-type"><button type="button" className={petType === "سگ" ? "selected" : ""} onClick={() => setPetType("سگ")}>♧　سگ</button><button type="button" className={petType === "گربه" ? "selected" : ""} onClick={() => setPetType("گربه")}>♧　گربه</button></div></WelcomeField><WelcomeField label="تاریخ تولد" icon="clock"><input placeholder="انتخاب تاریخ تولد"/></WelcomeField><WelcomeField label="نژاد (اختیاری)" icon="paw"><input placeholder="مثال: گلدن رتریور"/></WelcomeField><button className="primary-btn full" type="submit"><Icon name="paw" size={20}/>ثبت پروفایل پت</button><button className="skip-btn" type="button" onClick={() => go("panel")}>فعلاً رد می‌کنم</button></form></section>
    <section className="welcome-benefits"><article><div>🎁</div><h3>هدیه تولد پت</h3><p>تخفیف و هدیه ویژه<br/>برای تولد پت شما</p></article><article><div>🏷️</div><h3>پیشنهادهای ویژه</h3><p>تخفیف‌ها و پیشنهادهای<br/>ویژه مخصوص پت شما</p></article><article><div>🏅</div><h3>پیشنهاد مناسب سن و نژاد</h3><p>پیشنهادهای تخصصی<br/>براساس سن و نژاد پت</p></article></section>
  </main>;
}

function WelcomeField({ label, icon, children }: { label: string; icon: string; children: ReactNode }) { return <label className="welcome-field"><b>{label}<Icon name={icon} size={21}/></b>{children}</label>; }

function Panel() {
  return <>
    <main className="panel-page shell">
      <div className="panel-crumb">صفحه اصلی　/　پنل کاربری</div>
      <div className="panel-layout">
        <aside className="panel-nav"><button className="active"><Icon name="home" size={21}/>داشبورد</button>{[["box","سفارش‌های من"],["paw","پت‌های من"],["pin","آدرس‌ها"],["heart","علاقه‌مندی‌ها"],["tag","کدهای تخفیف"],["user","اطلاعات حساب"],["headset","پشتیبانی"]].map(([icon,label]) => <button key={label}><Icon name={icon} size={20}/>{label}</button>)}<hr/><button className="logout" onClick={() => go("home")}>↪　خروج</button></aside>
        <section className="dashboard">
          <section className="dashboard-hello"><div className="panel-scene"><img src="/ref-assets/panel-scene.png" alt="سگ و گربه"/></div><div><h1>سلام، رضا　👋</h1><p>همه چیز برای مدیریت سفارش‌ها، آدرس‌ها و پت‌های دوست‌داشتنی‌ات اینجاست.</p><div><button className="primary-btn">✎　ویرایش اطلاعات</button><button className="secondary-btn">▧　مشاهده سفارش‌ها</button></div></div></section>
          <section className="dashboard-stats">{[["box","سفارش‌های فعال","۲"],["tag","کد تخفیف فعال","۱"],["paw","پت‌های ثبت‌شده","۳"],["shield","امتیاز وفاداری","۳,۴۵۰"]].map(([icon,title,count]) => <article key={title}><Icon name={icon} size={35}/><div><small>{title}</small><b>{count}</b><button>مشاهده {title.includes("پت") ? "پت‌ها" : title.includes("تخفیف") ? "کدها" : title.includes("امتیاز") ? "امتیازات" : "سفارش‌ها"}</button></div></article>)}</section>
          <div className="dashboard-mid"><section className="pet-list"><div className="dash-section-title"><h2>پت‌های من　<Icon name="paw" size={22}/></h2><button className="green-btn" onClick={() => go("welcome")}>＋ افزودن پت جدید</button></div><div className="pet-cards"><article><div className="pet-photo dog-photo">🐶</div><div><h3>لئو (سگ)</h3><p>گلدن رتریور</p><small>تاریخ تولد: ۱۴۰۱/۰۶/۲۰</small><em>تولد نزدیکه 🎂</em></div><button>⋮</button></article><article><div className="pet-photo cat-photo">🐱</div><div><h3>میلو (گربه)</h3><p>پرشین</p><small>تاریخ تولد: ۱۴۰۲/۰۲/۱۵</small><em>هدیه تولد فعال 🎁</em></div><button>⋮</button></article></div></section><aside className="birthday-card"><h3>تاریخ تولد پتت رو ثبت کن</h3><p>و روز تولدش تخفیف ویژه بگیر 🎁</p><div>🎁</div><button className="green-btn">ثبت یا ویرایش تاریخ تولد</button></aside></div>
          <div className="dashboard-lower"><section className="orders"><div className="dash-section-title"><h2>سفارش‌های اخیر　<Icon name="box" size={21}/></h2><button>مشاهده همه سفارش‌ها</button></div><div className="order-head"><span>شماره سفارش</span><span>تاریخ</span><span>مبلغ</span><span>وضعیت</span><span>عملیات</span></div>{[["PT-۱۴۰۳-۰۰۷۵۶","۱۴۰۳/۰۳/۲۸","۵,۸۷۰,۰۰۰ تومان","در حال ارسال"],["PT-۱۴۰۳-۰۰۷۱۲","۱۴۰۳/۰۳/۲۰","۲,۳۴۰,۰۰۰ تومان","تحویل شده"],["PT-۱۴۰۳-۰۰۶۵۴","۱۴۰۳/۰۳/۰۸","۱,۹۶۰,۰۰۰ تومان","آماده پردازش"]].map((r,i) => <div className="order-row" key={r[0]}>{r.map((v,j) => <span key={j} className={j===3 ? `status s${i}` : ""}>{v}</span>)}<button>مشاهده جزئیات　‹</button></div>)}</section><aside className="address-card"><div className="dash-section-title"><h2>آدرس‌های من　<Icon name="pin" size={21}/></h2><button>＋ افزودن آدرس جدید</button></div><div><b>خانه　<span>پیش‌فرض</span></b><p>تهران، پاسداران، خیابان گل نبی، کوچه گلستان، پلاک ۱۲، واحد ۳</p><small>۰۹۱۲ ۱۲۳ ۴۵۶۷　☎</small></div></aside></div>
        </section>
      </div>
    </main><Footer/>
  </>;
}

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [items, setItems] = useState<Product[]>([products[3], products[5], products[2]]);
  useEffect(() => {
    const sync = () => setRoute((window.location.hash.slice(1) as Route) || "home");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const add = (p: Product) => setItems((current) => [...current, p]);
  let content: ReactNode;
  switch (route) {
    case "store": content = <Store onAdd={add}/>; break;
    case "cart": content = <Cart items={items} setItems={setItems} onAdd={add}/>; break;
    case "about": content = <About/>; break;
    case "contact": content = <Contact/>; break;
    case "login": content = <Auth mode="login"/>; break;
    case "register": content = <Auth mode="register"/>; break;
    case "welcome": content = <Welcome/>; break;
    case "panel": content = <Panel/>; break;
    default: content = <Home onAdd={add}/>;
  }
  return <div dir="rtl" className="app-root">{route !== "welcome" && <Header route={route} count={items.length}/>} {content}</div>;
}
