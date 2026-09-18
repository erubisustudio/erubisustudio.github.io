document.documentElement.classList.add('site-guard');
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});
document.addEventListener('dragstart', (event) => {
    if (event.target.closest && event.target.closest('img')) event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    const CONTACT_EMAIL = 'adrianelvisiale@gmail.com';
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('hidden') === false;
            mobileMenuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        mobileMenuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const contactModal = document.getElementById('contact-modal');
    const contactModalBackdrop = document.getElementById('contact-modal-backdrop');
    const contactModalContent = document.getElementById('contact-modal-content');
    const contactClose = document.getElementById('contact-modal-close');
    let lastFocus = null;

    window.openContactModal = () => {
        if (!contactModal) return;
        lastFocus = document.activeElement;
        document.body.style.overflow = 'hidden';
        contactModal.classList.remove('hidden');
        contactModal.classList.add('flex');
        contactModal.setAttribute('aria-hidden', 'false');
        void contactModal.offsetWidth;
        contactModalBackdrop.classList.remove('opacity-0');
        contactModalContent.classList.remove('scale-95', 'opacity-0');
        contactClose?.focus();
    };

    window.closeContactModal = () => {
        if (!contactModal) return;
        document.body.style.overflow = '';
        contactModal.setAttribute('aria-hidden', 'true');
        contactModalBackdrop.classList.add('opacity-0');
        contactModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            contactModal.classList.add('hidden');
            contactModal.classList.remove('flex');
            if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
        }, 300);
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && !contactModal.classList.contains('hidden')) {
            window.closeContactModal();
        }
    });

    window.copyEmail = () => {
        const emailSpan = document.getElementById('contact-email');
        if (!emailSpan) return;
        navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
            const originalText = CONTACT_EMAIL;
            emailSpan.textContent = window.__copiedLabel || 'Copied!';
            setTimeout(() => {
                emailSpan.textContent = originalText;
            }, 2000);
        });
    };

    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('photo-lightbox-img');
    const notes = Array.from(document.querySelectorAll('.postit'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let photoIndex = 0;
    let photoLastFocus = null;
    let photoOpen = false;

    function preloadPhoto(src) {
        if (!src) return;
        const probe = new Image();
        probe.src = src;
    }

    function lightboxFocusables() {
        return [document.getElementById('photo-lightbox-close'), document.getElementById('photo-lightbox-prev'), document.getElementById('photo-lightbox-next')].filter(Boolean);
    }

    function setLightboxPhoto(index, fromRect) {
        const note = notes[index];
        if (!note || !lightboxImg) return;
        photoIndex = index;
        const thumb = note.querySelector('img');
        lightboxImg.alt = thumb ? thumb.alt : '';
        const applyFlip = () => {
            if (!fromRect || reduceMotion.matches) {
                lightboxImg.style.transform = '';
                return;
            }
            const last = lightboxImg.getBoundingClientRect();
            if (!last.width || !last.height) return;
            const dx = fromRect.left - last.left;
            const dy = fromRect.top - last.top;
            const sx = fromRect.width / last.width;
            const sy = fromRect.height / last.height;
            lightboxImg.style.transition = 'none';
            lightboxImg.style.transformOrigin = 'top left';
            lightboxImg.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
            void lightboxImg.offsetWidth;
            lightboxImg.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
            lightboxImg.style.transform = 'translate(0, 0) scale(1)';
        };
        const onReady = () => applyFlip();
        lightboxImg.src = note.dataset.photo;
        if (lightboxImg.complete && lightboxImg.naturalWidth) onReady();
        else lightboxImg.addEventListener('load', onReady, { once: true });
        const prev = notes[index - 1];
        const next = notes[index + 1];
        if (prev) preloadPhoto(prev.dataset.photo);
        if (next) preloadPhoto(next.dataset.photo);
    }

    function openPhotoLightbox(index) {
        const note = notes[index];
        if (!lightbox || !note) return;
        photoLastFocus = document.activeElement;
        photoOpen = true;
        document.body.style.overflow = 'hidden';
        lightbox.hidden = false;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        const thumb = note.querySelector('img');
        setLightboxPhoto(index, thumb ? thumb.getBoundingClientRect() : null);
        document.getElementById('photo-lightbox-close')?.focus();
    }

    function closePhotoLightbox() {
        if (!lightbox || !photoOpen) return;
        photoOpen = false;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.hidden = true;
        lightboxImg.removeAttribute('src');
        lightboxImg.style.transform = '';
        lightboxImg.style.transition = '';
        document.body.style.overflow = '';
        if (photoLastFocus && typeof photoLastFocus.focus === 'function') photoLastFocus.focus();
    }

    function stepPhoto(delta) {
        if (!photoOpen || !notes.length) return;
        const nextIndex = (photoIndex + delta + notes.length) % notes.length;
        lightboxImg.style.transition = 'none';
        lightboxImg.style.transform = '';
        setLightboxPhoto(nextIndex, null);
    }

    notes.forEach((note, index) => {
        note.addEventListener('click', () => openPhotoLightbox(index));
        note.addEventListener('pointerenter', () => preloadPhoto(note.dataset.photo), { once: true });
    });
    document.getElementById('photo-lightbox-close')?.addEventListener('click', closePhotoLightbox);
    document.querySelector('.photo-lightbox__backdrop')?.addEventListener('click', closePhotoLightbox);
    document.getElementById('photo-lightbox-prev')?.addEventListener('click', () => stepPhoto(-1));
    document.getElementById('photo-lightbox-next')?.addEventListener('click', () => stepPhoto(1));
    document.addEventListener('keydown', (event) => {
        if (!photoOpen) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            closePhotoLightbox();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            stepPhoto(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            stepPhoto(1);
        } else if (event.key === 'Tab') {
            const items = lightboxFocusables();
            if (!items.length) return;
            const current = items.indexOf(document.activeElement);
            let next = event.shiftKey ? current - 1 : current + 1;
            if (next < 0) next = items.length - 1;
            if (next >= items.length) next = 0;
            event.preventDefault();
            items[next].focus();
        }
    });
});

(function () {
    const translations = {
        en: {
            t001: 'Philosophy',
            t002: 'Process',
            t003: 'Portfolio',
            t004: 'Skills',
            t005: 'Contact Me',
            t096: 'Photography',
            t097: 'A few frames. Click a note to look closer.',
            'photo-lightbox': 'Photograph',
            'photo-prev': 'Previous photograph',
            'photo-next': 'Next photograph',
            'atm-still': 'Still',
            'atm-sakura': 'Sakura',
            'atm-label': 'Atmosphere',
            t006: 'Philosophy',
            t007: 'Process',
            t008: 'Portfolio',
            t009: 'Skills',
            t010: 'Contact Me',
            role: 'Freelance photographer & web designer',
            t011: 'Art meets<br/>efficiency',
            t012: 'I work as a freelance photographer and web designer. Vision becomes images and interfaces, with elegance and precision.',
            t013: 'Explore Projects',
            t014: 'Philosophy',
            t015: 'Eliminating Muda',
            t016: "In Japanese production philosophy, 'Muda' means waste. We apply this concept to design and code, removing everything that does not add value to the final user experience. The result is a clean, essential, focused interface.",
            t017: 'The practice of Kaizen',
            t018: "Continuous improvement ('Kaizen') is at the center of our process. We never settle for the first iteration. We refine, optimize, and perfect every line of code and every visual detail until we reach the right balance.",
            t019: 'Process',
            t020: '01',
            t021: 'The Brief',
            t022: 'We start with a conversation. You tell me your idea, your goals, and what you expect from your new website. This helps me understand who you are and create something that truly represents you.',
            t023: '02',
            t024: 'Development',
            t025: 'This is where the work takes shape. I turn the concepts we discussed into a real structure that is fast, responsive, and beautiful on every device.',
            t026: '03',
            t027: 'Refinement',
            t028: 'I never settle for the first result. I check every detail, correct small flaws, and make sure everything flows smoothly. This is where your website becomes truly polished.',
            t029: '04',
            t030: 'Launch',
            t031: 'Once everything is ready and you are satisfied, I take it live. I publish your website, configure it correctly, and make sure it is ready to be found by your customers.',
            t032: 'Portfolio',
            t033: 'Nautical & Charter',
            t034: 'Karalis Charter',
            t035: 'Complete website restyling and implementation of custom features to enhance user experience, online booking performance, and brand presence for a luxury charter service in Sardinia.',
            t036: 'Digital Intelligence',
            t037: 'Investigation - OSINT Services',
            t038: 'An advanced digital intelligence dashboard for open-source research. It combines high-density information with a clean, functional interface for efficient analysis.',
            t039: 'Premium Networking',
            t040: 'Vera Social',
            t041: 'An exclusive social networking concept where authenticity has value. Designed with a premium, focused aesthetic to maximize brand signal and minimize noise.',
            t042: 'Skills',
            t043: 'For me, web development is a balance between art and logic. I apply <strong>Muda</strong> to remove everything that slows down your site, leaving space only for the essentials and speed. Through <strong>Kaizen</strong>, I refine every line of code through continuous improvement, delivering solid, secure solutions ready to grow over time.',
            t046: 'WordPress',
            t048: 'HTML5',
            t050: 'CSS',
            t052: 'JavaScript',
            t054: 'PHP',
            t055: 'UX/UI',
            t056: 'Photography',
            t078: 'Ready to start a project?',
            t079: 'Write to me to explore how we can collaborate.',
            t080: 'How to contact me',
            t081: 'Erubisu Studio — Freelance photographer & web designer',
            t082: '© 2026 Erubisu studio',
            t083: 'Privacy',
            t089: 'Choose how to contact me',
            t090: 'Email',
            t091: 'adrianelvisiale@gmail.com',
            t092: 'Click to copy',
            t093: 'LinkedIn',
            t094: 'Contact me on LinkedIn',
            t095: 'Open Profile',
            close: 'Close',
            copied: 'Copied!',
            'privacy-title': 'Privacy Policy',
            'privacy-updated': 'Last updated: 15 September 2026',
            'privacy-lead': 'This site is a static portfolio. There is no cookie banner because we do not use profiling cookies, analytics, advertising, or tracking pixels.',
            'privacy-h-controller': 'Data controller',
            'privacy-controller': 'Erubisu Studio (Adrian Iale). Email: <a href="mailto:adrianelvisiale@gmail.com">adrianelvisiale@gmail.com</a>. Website: <a href="https://erubisustudio.github.io/">https://erubisustudio.github.io</a>.',
            'privacy-h-data': 'What we process',
            'privacy-data-1': 'Email you send us. If you write to the address above, we receive your message and email address through our email provider. Legal basis: pre-contractual steps or legitimate interest in answering you. We keep messages only as long as needed to handle the request or to meet legal duties.',
            'privacy-data-2': 'LinkedIn. The LinkedIn button opens LinkedIn in a new tab. That service applies its own privacy policy.',
            'privacy-data-3': 'Language preference. Stored only in your browser (localStorage key site-language). It does not leave your device and is not used for profiling.',
            'privacy-data-4': 'Server logs. The hosting provider may record technical logs (such as IP address and user agent) to operate and secure the server. We do not use them for marketing.',
            'privacy-h-cookies': 'Cookies',
            'privacy-cookies': 'We do not set advertising or analytics cookies. Fonts are hosted on this website. We do not load Google Fonts or other third-party tracking scripts.',
            'privacy-h-rights': 'Your rights',
            'privacy-rights': 'Under the GDPR you may request access, rectification, erasure, restriction, objection, or portability, and you may lodge a complaint with the Garante per la protezione dei dati personali (Italy). Write to the email above.',
            'privacy-h-japan': 'Contact from Japan',
            'privacy-japan': 'If you contact us from Japan, we use your personal information only to respond to that request, for that purpose, and for no other use.'
        },
        ja: {
            t001: '思想',
            t002: 'プロセス',
            t003: '制作実績',
            t004: 'スキル',
            t005: 'お問い合わせ',
            t096: '写真',
            t097: 'いくつかのカット。メモをクリックすると寄ります。',
            'photo-lightbox': '写真',
            'photo-prev': '前の写真',
            'photo-next': '次の写真',
            'atm-still': '間',
            'atm-sakura': 'サクラ',
            'atm-label': '表示',
            t006: '思想',
            t007: 'プロセス',
            t008: '制作実績',
            t009: 'スキル',
            t010: 'お問い合わせ',
            role: 'フリーランスの写真家・ウェブデザイナー',
            t011: 'アートが<br/>効率と出会う',
            t012: 'フリーランスの写真家であり、ウェブデザイナーです。ビジョンを、気品と精度をもって写真と画面へ落とし込みます。',
            t013: '制作を見る',
            t014: '思想',
            t015: 'ムダを削る',
            t016: '日本のものづくりの考え方では、「ムダ」は無駄を意味します。この考えをデザインとコードに当てはめ、最終的な体験に価値を加えないものは取り除きます。結果として、清らかで、必要最小限で、焦点の定まったインターフェースになります。',
            t017: 'カイゼンの実践',
            t018: '継続的な改善（カイゼン）が工程の中心です。最初の案では終わりません。コードの一行、視覚の細部まで磨き、均衡に達するまで最適化します。',
            t019: 'プロセス',
            t020: '01',
            t021: 'ヒアリング',
            t022: 'まず対話から始めます。アイデア、目的、新しいサイトに求めることを教えてください。あなた自身を理解し、本当に表すものを作るために必要です。',
            t023: '02',
            t024: '開発',
            t025: 'ここで形になります。話し合った構想を、どの端末でも速く、美しく動く実体の構造へ変えます。',
            t026: '03',
            t027: '磨き込み',
            t028: '最初の結果では終わりません。細部を点検し、小さな欠点を直し、流れが滑らかかを確かめます。サイトが本当に整う段階です。',
            t029: '04',
            t030: '公開',
            t031: 'すべてが整い、ご満足いただけたら公開します。サイトをオンラインにし、正しく設定し、お客様に見つかる状態にします。',
            t032: '制作実績',
            t033: '船舶・チャーター',
            t034: 'Karalis Charter',
            t035: 'サルデーニャのラグジュアリーチャーター向けに、サイトを全面的に再構築し、体験、オンライン予約、ブランドの存在感を高める機能を実装しました。',
            t036: 'デジタルインテリジェンス',
            t037: 'Investigation - OSINT Services',
            t038: 'オープンソース調査向けの高度なデジタルインテリジェンスのダッシュボードです。高密度の情報と、清らかで機能的なインターフェースを合わせ、効率的な分析を支えます。',
            t039: 'プレミアムネットワーキング',
            t040: 'Vera Social',
            t041: '真正さに価値がある、限定的なソーシャルネットワーキングの構想です。ブランドの信号を最大化し、ノイズを最小化するため、焦点の定まったプレミアムな美意識で設計しました。',
            t042: 'スキル',
            t043: 'ウェブ開発は、私にとって芸術と論理の均衡です。<strong>ムダ</strong>を適用し、サイトを遅くするものを取り除き、本質と速度だけを残します。<strong>カイゼン</strong>により、コードの一行を継続的に磨き、堅牢で安全、長く育てられる解決を届けます。',
            t046: 'WordPress',
            t048: 'HTML5',
            t050: 'CSS',
            t052: 'JavaScript',
            t054: 'PHP',
            t055: 'UX/UI',
            t056: '写真',
            t078: 'プロジェクトを始めませんか',
            t079: '協働の形を探るため、ご連絡ください。',
            t080: '連絡方法',
            t081: 'Erubisu Studio — フリーランスの写真家・ウェブデザイナー',
            t082: '© 2026 Erubisu studio',
            t083: 'プライバシー',
            t089: 'ご連絡方法をお選びください',
            t090: 'メール',
            t091: 'adrianelvisiale@gmail.com',
            t092: 'クリックでコピー',
            t093: 'LinkedIn',
            t094: 'LinkedInで連絡する',
            t095: 'プロフィールを開く',
            close: '閉じる',
            copied: 'コピーしました',
            'privacy-title': 'プライバシーポリシー',
            'privacy-updated': '最終更新：2026年9月15日',
            'privacy-lead': '本サイトは静的なポートフォリオです。プロファイリング用Cookie、アクセス解析、広告、トラッキングピクセルを使わないため、同意バナーは表示しません。',
            'privacy-h-controller': '個人情報の管理者',
            'privacy-controller': 'Erubisu Studio（Adrian Iale）。メール：<a href="mailto:adrianelvisiale@gmail.com">adrianelvisiale@gmail.com</a>。ウェブサイト：<a href="https://erubisustudio.github.io/">https://erubisustudio.github.io</a>。',
            'privacy-h-data': '取り扱う情報',
            'privacy-data-1': 'お送りいただくメール。上記アドレスへご連絡いただいた場合、メール事業者を通じてメッセージとメールアドレスを受け取ります。根拠は、契約前の手続、または返信するための正当な利益です。対応、または法令上の義務に必要な期間のみ保管します。',
            'privacy-data-2': 'LinkedIn。ボタンは新しいタブでLinkedInを開きます。同サービスのプライバシーポリシーが適用されます。',
            'privacy-data-3': '言語の設定。お使いのブラウザ内（localStorage の site-language）にのみ保存します。端末の外へは出さず、プロファイリングにも使いません。',
            'privacy-data-4': 'サーバーログ。ホスティング事業者は、運用とセキュリティのため、IPアドレスやユーザーエージェントなどの技術ログを記録する場合があります。マーケティングには使いません。',
            'privacy-h-cookies': 'Cookie',
            'privacy-cookies': '広告・解析用のCookieは設定しません。フォントはこのサイトで配信しています。Google Fontsや、追跡目的の第三者スクリプトは読み込みません。',
            'privacy-h-rights': 'お客様の権利',
            'privacy-rights': 'GDPRに基づき、開示、訂正、削除、制限、異議、データポータビリティを請求でき、イタリアのデータ保護当局（Garante per la protezione dei dati personali）へ苦情を申し立てることができます。上記メールへご連絡ください。',
            'privacy-h-japan': '日本からのお問い合わせ',
            'privacy-japan': '日本からご連絡いただいた場合、そのお問い合わせに返信する目的に限り、個人情報を利用します。他の目的には使いません。'
        }
    };

    const metaTranslations = {
        en: {
            title: 'Erubisu Studio | Freelance Photographer & Web Designer',
            'meta:name:description': 'Erubisu Studio – Freelance photographer and web designer. Japanese aesthetic principles, photography, and modern code for focused digital work.',
            'meta:name:keywords': 'freelance photographer, web designer, photography, web design, front-end development, portfolio, Japanese minimalism, UI/UX, Erubisu Studio',
            'meta:name:twitter:title': 'Erubisu Studio | Freelance Photographer & Web Designer',
            'meta:name:twitter:description': 'Freelance photographer and web designer. Japanese aesthetics, photography, and modern code.',
            'meta:property:og:title': 'Erubisu Studio | Freelance Photographer & Web Designer',
            'meta:property:og:description': 'Freelance photographer and web designer. Art meets efficiency.'
        },
        ja: {
            title: 'Erubisu Studio | フリーランスの写真家・ウェブデザイナー',
            'meta:name:description': 'Erubisu Studio — フリーランスの写真家・ウェブデザイナー。日本の美意識、写真、現代のコードで、焦点の定まった仕事をします。',
            'meta:name:keywords': 'フリーランス, 写真家, ウェブデザイナー, 写真, ウェブデザイン, フロントエンド, ポートフォリオ, 日本のミニマリズム, UI/UX, Erubisu Studio',
            'meta:name:twitter:title': 'Erubisu Studio | フリーランスの写真家・ウェブデザイナー',
            'meta:name:twitter:description': 'フリーランスの写真家・ウェブデザイナー。日本の美意識、写真、現代のコード。',
            'meta:property:og:title': 'Erubisu Studio | フリーランスの写真家・ウェブデザイナー',
            'meta:property:og:description': 'フリーランスの写真家・ウェブデザイナー。アートが効率と出会う。'
        }
    };

    const altTranslations = {
        en: [
            'Erubisu Studio',
            'Professional profile',
            'Karalis Charter Interface',
            'OSINT Lab Interface',
            'Vera Social Interface',
            'Cow standing in a field at sunset',
            'White swan preening its wing',
            'Goldfinch perched on a reed against a blue sky',
            'Small pale flower on a dark ground',
            'Macro of a magenta flower',
            'Children reaching for soap bubbles in a piazza',
            'Person sitting on a cliff above a dry valley'
        ],
        ja: [
            'Erubisu Studio',
            'プロフィール写真',
            'Karalis Charterの画面',
            'OSINT Labの画面',
            'Vera Socialの画面',
            '夕暮れの牧草地に立つ牛',
            '羽を整える白鳥',
            '青空を背景に、葦にとまるゴシキヒワ',
            '暗い背景の小さな花',
            'マゼンタの花の接写',
            '広場でシャボン玉に手を伸ばす子どもたち',
            '乾いた谷を見下ろす崖に座る人'
        ]
    };

    const allowedLanguages = ['en', 'ja'];
    let currentLanguage = 'en';

    function normalizeLanguage(lang) {
        return allowedLanguages.includes(lang) ? lang : 'en';
    }

    function updateSwitcherState(lang) {
        document.querySelectorAll('[data-lang-switch]').forEach((button) => {
            const active = button.dataset.langSwitch === lang;
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
            button.classList.toggle('text-on-surface-variant', !active);
        });
        document.querySelectorAll('.language-switcher, .mobile-language-switcher').forEach((switcher) => {
            switcher.setAttribute('aria-label', lang === 'ja' ? '言語の選択' : 'Language selector');
        });
    }

    function updateMetadata(lang) {
        const meta = metaTranslations[lang] || metaTranslations.en;
        const isPrivacy = Boolean(document.querySelector('[data-i18n="privacy-title"]'));
        const privacyTitle = translations[lang]?.['privacy-title'];
        if (isPrivacy && privacyTitle) {
            document.title = privacyTitle + ' | Erubisu Studio';
            const desc = translations[lang]?.['privacy-lead'];
            const descTag = document.querySelector('meta[name="description"]');
            if (descTag && desc) descTag.setAttribute('content', desc);
        } else if (meta.title) {
            document.title = meta.title;
        }
        Object.entries(meta).forEach(([key, value]) => {
            if (!key.startsWith('meta:')) return;
            const parts = key.split(':');
            const selector = parts[1] === 'name'
                ? `meta[name="${parts.slice(2).join(':')}"]`
                : `meta[property="${parts.slice(2).join(':')}"]`;
            const tag = document.querySelector(selector);
            if (tag) tag.setAttribute('content', value);
        });
    }

    function applyLanguage(lang) {
        lang = normalizeLanguage(lang);
        currentLanguage = lang;
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            const value = translations[lang]?.[key];
            if (value !== undefined) el.textContent = value;
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.dataset.i18nHtml;
            const value = translations[lang]?.[key];
            if (value !== undefined) el.innerHTML = value;
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            const key = el.dataset.i18nAriaLabel;
            const value = translations[lang]?.[key];
            if (value !== undefined) el.setAttribute('aria-label', value);
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((img) => {
            const index = Number(img.dataset.i18nAlt);
            const value = altTranslations[lang]?.[index];
            if (value !== undefined) img.setAttribute('alt', value);
        });

        updateSwitcherState(lang);
        updateAtmosphereState(currentAtmosphere);
        updateMetadata(lang);
        window.__copiedLabel = translations[lang]?.copied || translations.en.copied;
        try {
            localStorage.setItem('site-language', lang);
        } catch (_) { /* private mode */ }
    }

    window.setSiteLanguage = applyLanguage;

    const allowedAtmosphere = ['still', 'sakura'];
    let currentAtmosphere = 'still';
    let sakura = null;

    function normalizeAtmosphere(mode) {
        return allowedAtmosphere.includes(mode) ? mode : 'still';
    }

    function updateAtmosphereState(mode) {
        document.querySelectorAll('[data-atmosphere]').forEach((button) => {
            const active = button.dataset.atmosphere === mode;
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
            button.classList.toggle('text-on-surface-variant', !active);
        });
        const label = translations[currentLanguage]?.['atm-label'] || 'Atmosphere';
        document.querySelectorAll('.atmosphere-switcher, .mobile-atmosphere-switcher').forEach((el) => {
            el.setAttribute('aria-label', label);
        });
    }

    function createSakura(canvas) {
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        const colors = ['#c9a0a4', '#d4b4b0', '#b8898c'];
        let running = false;
        let raf = 0;
        let petals = [];
        const COUNT = 16;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function spawn(scatterY) {
            return {
                x: Math.random() * window.innerWidth,
                y: scatterY ? Math.random() * window.innerHeight : -28,
                s: 12 + Math.random() * 10,
                r: Math.random() * Math.PI * 2,
                vr: (Math.random() - 0.5) * 0.03,
                vy: 0.32 + Math.random() * 0.42,
                vx: 0.1 + Math.random() * 0.2,
                sway: Math.random() * Math.PI * 2,
                vs: 0.008 + Math.random() * 0.012,
                flip: Math.random() * Math.PI * 2,
                vf: 0.02 + Math.random() * 0.03,
                color: colors[(Math.random() * colors.length) | 0],
                alpha: 0.45 + Math.random() * 0.25
            };
        }

        function drawPetal(p) {
            const s = p.s;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.r);
            ctx.scale(Math.cos(p.flip), 1);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-s * 0.22, -s * 0.12, -s * 0.72, -s * 0.32, -s * 0.38, -s * 0.88);
            ctx.bezierCurveTo(-s * 0.16, -s * 1.08, 0, -s * 0.72, 0, -s * 0.72);
            ctx.bezierCurveTo(0, -s * 0.72, s * 0.16, -s * 1.08, s * 0.38, -s * 0.88);
            ctx.bezierCurveTo(s * 0.72, -s * 0.32, s * 0.22, -s * 0.12, 0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
            ctx.lineWidth = Math.max(0.6, s * 0.04);
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.08);
            ctx.quadraticCurveTo(-s * 0.04, -s * 0.45, 0, -s * 0.78);
            ctx.stroke();
            ctx.restore();
        }

        function tick() {
            if (!running) return;
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);
            for (const p of petals) {
                p.sway += p.vs;
                p.flip += p.vf;
                p.x += p.vx + Math.sin(p.sway) * 0.45;
                p.y += p.vy;
                p.r += p.vr;
                if (p.y > h + 24 || p.x > w + 32 || p.x < -32) {
                    Object.assign(p, spawn(false));
                }
                drawPetal(p);
            }
            raf = requestAnimationFrame(tick);
        }

        function start() {
            if (running || reduce.matches) return;
            resize();
            if (!petals.length) {
                petals = Array.from({ length: COUNT }, () => spawn(true));
            }
            canvas.hidden = false;
            running = true;
            raf = requestAnimationFrame(tick);
        }

        function stop() {
            running = false;
            cancelAnimationFrame(raf);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.hidden = true;
        }

        window.addEventListener('resize', () => {
            if (running) resize();
        });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(raf);
            } else if (running) {
                raf = requestAnimationFrame(tick);
            }
        });
        reduce.addEventListener('change', () => {
            if (reduce.matches) stop();
        });

        return {
            start,
            stop,
            reduced: () => reduce.matches
        };
    }

    function applyAtmosphere(mode) {
        mode = normalizeAtmosphere(mode);
        if (sakura && sakura.reduced()) mode = 'still';
        currentAtmosphere = mode;
        document.documentElement.dataset.atmosphere = mode;
        updateAtmosphereState(mode);
        if (!sakura) {
            const canvas = document.getElementById('sakura-layer');
            if (canvas) sakura = createSakura(canvas);
        }
        if (mode === 'sakura') sakura?.start();
        else sakura?.stop();
        try {
            localStorage.setItem('site-atmosphere', mode);
        } catch (_) { /* private mode */ }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-lang-switch]').forEach((button) => {
            button.addEventListener('click', () => {
                applyLanguage(button.dataset.langSwitch);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
            });
        });

        document.querySelectorAll('[data-atmosphere]').forEach((button) => {
            button.addEventListener('click', () => {
                applyAtmosphere(button.dataset.atmosphere);
            });
        });

        const params = new URLSearchParams(window.location.search);
        let savedLanguage = 'en';
        try {
            savedLanguage = normalizeLanguage(localStorage.getItem('site-language'));
        } catch (_) { /* private mode */ }
        const requestedLanguage = normalizeLanguage(params.get('lang'));
        const initialLanguage = params.has('lang') ? requestedLanguage : savedLanguage;
        applyLanguage(initialLanguage);

        let savedAtmosphere = 'still';
        try {
            savedAtmosphere = normalizeAtmosphere(localStorage.getItem('site-atmosphere'));
        } catch (_) { /* private mode */ }
        applyAtmosphere(savedAtmosphere);

        if ('IntersectionObserver' in window) {
            const scrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            document.querySelectorAll('.animate-on-scroll').forEach((el) => scrollObserver.observe(el));
        } else {
            document.querySelectorAll('.animate-on-scroll').forEach((el) => el.classList.add('fade-in-visible'));
        }
    });
})();
