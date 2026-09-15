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
});

(function () {
    const translations = {
        en: {
            t001: 'Philosophy',
            t002: 'Process',
            t003: 'Portfolio',
            t004: 'Skills',
            t005: 'Contact Me',
            t006: 'Philosophy',
            t007: 'Process',
            t008: 'Portfolio',
            t009: 'Skills',
            t010: 'Contact Me',
            t011: 'Art meets<br/>efficiency',
            t012: 'We turn vision into code with elegance and precision. A curated approach to digital development.',
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
            t078: 'Ready to start a project?',
            t079: 'Write to me to explore how we can collaborate.',
            t080: 'How to contact me',
            t081: 'Erubisu Studio - Web Design & Development',
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
            t006: '思想',
            t007: 'プロセス',
            t008: '制作実績',
            t009: 'スキル',
            t010: 'お問い合わせ',
            t011: 'アートが<br/>効率と出会う',
            t012: 'ビジョンを、気品と精度をもってコードへ落とし込みます。デジタル開発への、厳選したアプローチです。',
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
            t078: 'プロジェクトを始めませんか',
            t079: '協働の形を探るため、ご連絡ください。',
            t080: '連絡方法',
            t081: 'Erubisu Studio - Web Design & Development',
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
            title: 'Erubisu Studio | Minimalist Web Design & Development',
            'meta:name:description': 'Erubisu Studio – Curated web development portfolio. We merge Japanese aesthetic principles with modern code efficiency to create unique digital experiences.',
            'meta:name:keywords': 'web design, front-end development, portfolio, Japanese minimalism, UI/UX, Erubisu Studio, web agency Italy, curated design',
            'meta:name:twitter:title': 'Erubisu Studio | Architectural Quiet Portfolio',
            'meta:name:twitter:description': 'Curated web development between Japanese aesthetics and modern code.',
            'meta:property:og:title': 'Erubisu Studio | Architectural Quiet Portfolio',
            'meta:property:og:description': 'Art meets efficiency. Curated web development with elegance and precision.'
        },
        ja: {
            title: 'Erubisu Studio | ミニマルなウェブデザインと開発',
            'meta:name:description': 'Erubisu Studio — 日本の美意識と現代のコード効率を合わせ、独自のデジタル体験を作るウェブ開発ポートフォリオ。',
            'meta:name:keywords': 'ウェブデザイン, フロントエンド, ポートフォリオ, 日本のミニマリズム, UI/UX, Erubisu Studio',
            'meta:name:twitter:title': 'Erubisu Studio | 建築的な静けさのポートフォリオ',
            'meta:name:twitter:description': '日本の美意識と現代のコードのあいだで行う、厳選したウェブ開発。',
            'meta:property:og:title': 'Erubisu Studio | 建築的な静けさのポートフォリオ',
            'meta:property:og:description': 'アートが効率と出会う。気品と精度のウェブ開発。'
        }
    };

    const altTranslations = {
        en: [
            'Erubisu Studio',
            'Professional profile',
            'Karalis Charter Interface',
            'OSINT Lab Interface',
            'Vera Social Interface'
        ],
        ja: [
            'Erubisu Studio',
            'プロフィール写真',
            'Karalis Charterの画面',
            'OSINT Labの画面',
            'Vera Socialの画面'
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
        updateMetadata(lang);
        window.__copiedLabel = translations[lang]?.copied || translations.en.copied;
        try {
            localStorage.setItem('site-language', lang);
        } catch (_) { /* private mode */ }
    }

    window.setSiteLanguage = applyLanguage;

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-lang-switch]').forEach((button) => {
            button.addEventListener('click', () => {
                applyLanguage(button.dataset.langSwitch);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
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
