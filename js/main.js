document.addEventListener('DOMContentLoaded', () => {
            // Navigation Logic (Hides URLs from status bar)
            window.safeNavigate = (url) => {
                window.open(url, '_blank', 'noopener,noreferrer');
            };

            // Mobile Menu Logic
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuLinks = mobileMenu?.querySelectorAll('a');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });

                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }

            // Legal Modal Logic
            const legalModal = document.getElementById('legal-modal');
            const legalModalBackdrop = document.getElementById('legal-modal-backdrop');
            const legalModalContent = document.getElementById('legal-modal-content');
            const legalModalTitle = document.getElementById('legal-modal-title');
            const legalModalBody = document.getElementById('legal-modal-body');

            const legalData = {
                privacy: {
                    title: "Privacy Policy",
                    body: "We respect your digital space. We collect only the information essential to provide our services. Your data will never be transferred or sold to third parties, and it will be handled with maximum confidentiality and protected with high security standards."
                },
                cookie: {
                    title: "Cookie Policy",
                    body: "To keep the site fast and functional, we use only strictly necessary technical cookies. We removed invasive tracking scripts and unnecessary profiling cookies, fully respecting your privacy and offering a clean, fast experience."
                },
                gdpr: {
                    title: "GDPR Compliance",
                    body: "Your right to privacy is protected. In full compliance with the GDPR, we ensure full control over your personal data. At any time, you can request access, correction, or permanent deletion from our systems."
                }
            };

            window.openLegalModal = (type) => {
                const data = legalData[type];
                if (data && legalModal) {
                    document.body.style.overflow = 'hidden'; // Evita scorrimento sfondo
                    legalModalTitle.textContent = data.title;
                    legalModalBody.textContent = data.body;
                    
                    legalModal.classList.remove('hidden');
                    legalModal.classList.add('flex');
                    
                    void legalModal.offsetWidth;
                    
                    legalModalBackdrop.classList.remove('opacity-0');
                    legalModalContent.classList.remove('scale-95', 'opacity-0');
                }
            };

            window.closeLegalModal = () => {
                if (legalModal) {
                    document.body.style.overflow = ''; // Ripristina scorrimento
                    legalModalBackdrop.classList.add('opacity-0');
                    legalModalContent.classList.add('scale-95', 'opacity-0');
                    
                    setTimeout(() => {
                        legalModal.classList.add('hidden');
                        legalModal.classList.remove('flex');
                    }, 300);
                }
            };

            // Contact Modal Logic
            const contactModal = document.getElementById('contact-modal');
            const contactModalBackdrop = document.getElementById('contact-modal-backdrop');
            const contactModalContent = document.getElementById('contact-modal-content');

            window.openContactModal = () => {
                if (contactModal) {
                    document.body.style.overflow = 'hidden'; // Evita scorrimento sfondo
                    contactModal.classList.remove('hidden');
                    contactModal.classList.add('flex');
                    void contactModal.offsetWidth;
                    contactModalBackdrop.classList.remove('opacity-0');
                    contactModalContent.classList.remove('scale-95', 'opacity-0');
                }
            };

            window.closeContactModal = () => {
                if (contactModal) {
                    document.body.style.overflow = ''; // Ripristina scorrimento
                    contactModalBackdrop.classList.add('opacity-0');
                    contactModalContent.classList.add('scale-95', 'opacity-0');
                    setTimeout(() => {
                        contactModal.classList.add('hidden');
                        contactModal.classList.remove('flex');
                    }, 300);
                }
            };

            window.copyEmail = () => {
                const email = document.getElementById('contact-email').textContent;
                navigator.clipboard.writeText(email).then(() => {
                    const emailSpan = document.getElementById('contact-email');
                    const originalText = emailSpan.textContent;
                    emailSpan.textContent = 'Copied!';
                    setTimeout(() => {
                        emailSpan.textContent = originalText;
                    }, 2000);
                });
            };

            // Prevent Copy and Context Menu
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('keydown', e => {
                if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's')) {
                    e.preventDefault();
                }
            });

            // Cookie Banner Logic
            const cookieBanner = document.getElementById('cookie-banner');
            const acceptButton = document.getElementById('cookie-accept');
            const prefButton = document.getElementById('cookie-pref');

            if (cookieBanner) {
                // Check if consent was already given
                if (localStorage.getItem('cookie-consent') === 'accepted') {
                    cookieBanner.style.display = 'none';
                }

                const hideBanner = () => {
                    cookieBanner.classList.add('opacity-0', 'translate-y-10');
                    setTimeout(() => {
                        cookieBanner.style.display = 'none';
                    }, 500);
                    localStorage.setItem('cookie-consent', 'accepted');
                };

                if (acceptButton) acceptButton.addEventListener('click', hideBanner);
                if (prefButton) {
                    prefButton.addEventListener('click', () => {
                        hideBanner();
                        openLegalModal('cookie'); // Mostra la policy dei cookie se cliccano Preferenze
                    });
                }
            }
        });

/* --- Script --- */

(function () {
    const translations = {
        "en": {
                "t001": "Philosophy",
                "t002": "Process",
                "t003": "Portfolio",
                "t004": "Skills",
                "t005": "Contact Me",
                "t006": "Philosophy",
                "t007": "Process",
                "t008": "Portfolio",
                "t009": "Skills",
                "t010": "Contact Me",
                "t011": "Art meets<br/>efficiency",
                "t012": "We turn vision into code with elegance and precision. A curated approach to digital development.",
                "t013": "Explore Projects",
                "t014": "Philosophy",
                "t015": "Eliminating Muda",
                "t016": "In Japanese production philosophy, 'Muda' means waste. We apply this concept to design and code, removing everything that does not add value to the final user experience. The result is a clean, essential, focused interface.",
                "t017": "The practice of Kaizen",
                "t018": "Continuous improvement ('Kaizen') is at the center of our process. We never settle for the first iteration. We refine, optimize, and perfect every line of code and every visual detail until we reach the right balance.",
                "t019": "Process",
                "t020": "\n                        01",
                "t021": "The Brief",
                "t022": "We start with a conversation. You tell me your idea, your goals, and what you expect from your new website. This helps me understand who you are and create something that truly represents you.",
                "t023": "\n                        02",
                "t024": "Development",
                "t025": "This is where the work takes shape. I turn the concepts we discussed into a real structure that is fast, responsive, and beautiful on every device.",
                "t026": "\n                        03",
                "t027": "Refinement",
                "t028": "I never settle for the first result. I check every detail, correct small flaws, and make sure everything flows smoothly. This is where your website becomes truly polished.",
                "t029": "\n                        04",
                "t030": "Launch",
                "t031": "Once everything is ready and you are satisfied, I take it live. I publish your website, configure it correctly, and make sure it is ready to be found by your customers.",
                "t032": "Portfolio",
                "t033": "Nautical & Charter",
                "t034": "Karalis Charter",
                "t035": "Complete website restyling and technical implementation of custom features to enhance user experience, visual presentation, and online charter booking performance.",
                "t036": "Digital Intelligence",
                "t037": "Investigation - OSINT Services",
                "t038": "An advanced digital intelligence dashboard for open-source research. It combines high-density information with a clean, functional interface for efficient analysis.",
                "t039": "Premium Networking",
                "t040": "Vera Social",
                "t041": "An exclusive social networking concept where authenticity has value. Designed with a premium, focused aesthetic to maximize brand signal and minimize noise.",
                "t042": "Skills",
                "t043": "For me, web development is a balance between art and logic. I apply <strong>Muda</strong> to remove everything that slows down your site, leaving space only for the essentials and speed. Through <strong>Kaizen</strong>, I refine every line of code through continuous improvement, delivering solid, secure solutions ready to grow over time.",
                "t044": "Muda",
                "t045": "Kaizen",
                "t046": "WordPress",
                "t047": "70%",
                "t048": "Html5",
                "t049": "75%",
                "t050": "CSS",
                "t051": "75%",
                "t052": "AI Knowledge",
                "t053": "80%",
                "t054": "Web Design Services",
                "t055": "Prices are <strong>VAT excluded</strong>: VAT must be considered separately. The service does not include website maintenance after launch.",
                "t056": "VAT excluded",
                "t057": "Basic Package",
                "t058": "600€",
                "t059": "VAT excluded",
                "t060": "4 Pages (Home, Services, About Us, Contact)",
                "t061": "Free domain included for one year",
                "t062": "Free cloud hosting included for one year",
                "t063": "Max 2 revisions included.",
                "t064": "Request Info",
                "t065": "Recommended",
                "t066": "Medium Package",
                "t067": "900€",
                "t068": "VAT excluded",
                "t069": "Includes everything in the Basic Package",
                "t070": "Security & privacy focus",
                "t071": "Data protection to prevent online information leaks",
                "t072": "Request Info",
                "t073": "Custom Package",
                "t074": "Custom Quote",
                "t075": "VAT to be considered separately",
                "t076": "Custom solutions, complex integrations, and bespoke platform development for specific needs.",
                "t077": "Let's Talk",
                "t078": "Ready to start a project?",
                "t079": "Write to me to explore how we can collaborate.",
                "t080": "\n<span class=\"material-symbols-outlined mr-2\">connect_without_contact</span>How to contact me",
                "t081": "Erubisu\n                        Studio - Web Design & Development",
                "t082": "\n                        © 2026 Erubisu studio\n                    ",
                "t083": "Privacy",
                "t084": "Cookie",
                "t085": "GDPR",
                "t086": "We use cookies to refine your digital experience. By continuing to browse, you accept our data management approach.",
                "t087": "Preferences",
                "t088": "Accept",
                "t089": "Choose how to contact me",
                "t090": "Email",
                "t091": "adrianelvisiale@gmail.com",
                "t092": "Click to copy",
                "t093": "LinkedIn",
                "t094": "Contact me on LinkedIn",
                "t095": "Open Profile",
                "t096": "Title",
                "t097": "Content",
                "t098": "Got it",
                "close": "Close"
        },
        "it": {
                "t001": "Filosofia",
                "t002": "Processo",
                "t003": "Portfolio",
                "t004": "Skills",
                "t005": "\n                Contattami\n            ",
                "t006": "Filosofia",
                "t007": "Processo",
                "t008": "Portfolio",
                "t009": "Skills",
                "t010": "Contattami",
                "t011": "\n                        L'arte incontra<br/>l'efficienza\n                    ",
                "t012": "\n                        Trasformiamo la visione in codice, con eleganza e precisione. Un approccio curatoriale allo\n                        sviluppo digitale.\n                    ",
                "t013": "\n                            Esplora i Progetti\n                        ",
                "t014": "Filosofia",
                "t015": "Eliminare il Muda",
                "t016": "Nella filosofia produttiva giapponese, 'Muda' rappresenta lo spreco.\n                            Applichiamo questo concetto al design e al codice, rimuovendo tutto ciò che non aggiunge\n                            valore all'esperienza finale dell'utente. Il risultato è un'interfaccia pulita, essenziale e\n                            focalizzata.",
                "t017": "La pratica del Kaizen",
                "t018": "Il miglioramento continuo ('Kaizen') è al centro del nostro processo. Non\n                            ci accontentiamo mai della prima iterazione. Rifiniamo, ottimizziamo e perfezioniamo ogni\n                            riga di codice e ogni dettaglio visivo fino a raggiungere l'equilibrio ottimale.",
                "t019": "Processo",
                "t020": "\n                        01",
                "t021": "Il Brief",
                "t022": "Iniziamo con una chiacchierata. Mi racconti la tua idea, i tuoi obiettivi e cosa ti aspetti dal tuo nuovo sito. Mi serve a capire chi sei per creare qualcosa che ti rappresenti davvero.",
                "t023": "\n                        02",
                "t024": "Lo Sviluppo",
                "t025": "Qui entro nel vivo. Trasformo i concetti di cui abbiamo parlato in una struttura reale, veloce e bella da vedere su ogni dispositivo.",
                "t026": "\n                        03",
                "t027": "Il Perfezionamento",
                "t028": "Non mi accontento mai del primo risultato. Controllo ogni dettaglio, correggo i piccoli difetti e mi assicuro che tutto scorra fluidamente. È la fase in cui rendo il tuo sito davvero impeccabile.",
                "t029": "\n                        04",
                "t030": "La Pubblicazione",
                "t031": "Una volta che tutto è pronto e sei soddisfatto, premo il tasto d'invio. Metto il tuo sito online, lo configuro correttamente e mi assicuro che sia pronto per essere trovato dai tuoi clienti.",
                "t032": "Portfolio",
                "t033": "Nautica & Charter",
                "t034": "Karalis Charter",
                "t035": "Restyling completo del sito web e sviluppo di nuove funzionalità su misura per migliorare l'esperienza utente, la resa visiva e le prestazioni di prenotazione online.",
                "t036": "Digital\n                            Intelligence",
                "t037": "Investigation - OSINT Services",
                "t038": "Una dashboard avanzata di digital\n                            intelligence per la ricerca open-source. Combina informazioni ad alta densità con\n                            un'interfaccia pulita e funzionale per un'analisi efficiente.",
                "t039": "Premium\n                            Networking",
                "t040": "Vera Social",
                "t041": "Un concetto di social networking\n                            esclusivo dove l'autenticità ha valore. Progettato con un'estetica premium e focalizzata per\n                            massimizzare il segnale del brand e minimizzare il rumore.",
                "t042": "Skills",
                "t043": "\n                        Per me, lo sviluppo web è un equilibrio tra arte e logica. Applico il <strong>Muda</strong> per\n                        rimuovere\n                        tutto ciò che rallenta il tuo sito, lasciando spazio solo all'essenziale e alla velocità.\n                        Grazie al <strong>Kaizen</strong>, perfeziono ogni riga di codice con un miglioramento\n                        costante,\n                        garantendo soluzioni solide, sicure e pronte a crescere nel tempo.\n                    ",
                "t044": "Muda",
                "t045": "Kaizen",
                "t046": "WordPress",
                "t047": "70%",
                "t048": "Html5",
                "t049": "75%",
                "t050": "CSS",
                "t051": "75%",
                "t052": "Ai Knowledge",
                "t053": "80%",
                "t054": "Web Design Services",
                "t055": "\n                    I prezzi indicati sono da intendersi <strong>IVA esclusa</strong>: l'IVA va considerata a parte. Il servizio non include la manutenzione del sito dopo la pubblicazione.\n                ",
                "t056": "IVA esclusa",
                "t057": "Pacchetto Base",
                "t058": "600€",
                "t059": "IVA esclusa",
                "t060": "4 Pagine (Home, Servizi, Chi siamo, Contatti)",
                "t061": "Dominio gratuito incluso per un anno",
                "t062": "Cloud-hosting gratuito per un anno",
                "t063": "Max 2 revisioni incluse.",
                "t064": "Richiedi Info",
                "t065": "\n                        Consigliato",
                "t066": "Pacchetto Medium",
                "t067": "900€",
                "t068": "IVA esclusa",
                "t069": "Include tutto il Pacchetto Base",
                "t070": "Focus su sicurezza & privacy",
                "t071": "Protezione dati per prevenire fughe di info online",
                "t072": "Richiedi Info",
                "t073": "Pacchetto Personalizzato",
                "t074": "Su Misura",
                "t075": "IVA da considerare a parte",
                "t076": "Soluzioni personalizzate,\n                        integrazioni complesse e sviluppo di piattaforme su misura per esigenze specifiche.",
                "t077": "Parliamone",
                "t078": "Vuoi iniziare un progetto?",
                "t079": "Scrivimi per esplorare come possiamo\n                    collaborare.",
                "t080": "\n<span class=\"material-symbols-outlined mr-2\">connect_without_contact</span>\n                        Come contattarmi\n                    ",
                "t081": "Erubisu\n                        Studio - Web Design & Development",
                "t082": "\n                        © 2026 Erubisu studio\n                    ",
                "t083": "Privacy",
                "t084": "Cookie",
                "t085": "GDPR",
                "t086": "\n                    Utilizziamo i cookie per affinare la tua esperienza digitale. Continuando la navigazione, accetti la\n                    nostra filosofia di gestione dati.\n                ",
                "t087": "Preferenze",
                "t088": "Accetta",
                "t089": "Scegli come contattarmi",
                "t090": "Email",
                "t091": "adrianelvisiale@gmail.com",
                "t092": "Clicca per copiare",
                "t093": "LinkedIn",
                "t094": "Contattami su LinkedIn",
                "t095": "Apri Profilo",
                "t096": "Titolo",
                "t097": "\n                Contenuto\n            ",
                "t098": "Ho capito",
                "close": "Chiudi"
        }
};
    const metaTranslations = {
        "en": {
                "title": "Erubisu Studio | Minimalist Web Design & Development",
                "description": "",
                "meta:name:description": "Erubisu Studio – Curated web development portfolio. We merge Japanese aesthetic principles with modern code efficiency to create unique digital experiences.",
                "meta:name:keywords": "web design, front-end development, portfolio, Japanese minimalism, UI/UX, Erubisu Studio, web agency Italy, curated design",
                "meta:name:twitter:title": "Erubisu Studio | Architectural Quiet Portfolio",
                "meta:name:twitter:description": "Curated web development between Japanese aesthetics and modern code.",
                "meta:property:og:title": "Erubisu Studio | Architectural Quiet Portfolio",
                "meta:property:og:description": "Art meets efficiency. Curated web development with elegance and precision."
        },
        "it": {
                "title": "Erubisu Studio | Sviluppo Web Design Minimalista",
                "meta:name:description": "Erubisu Studio – Portfolio di sviluppo web curatoriale. Uniamo l'arte dell'estetica giapponese all'efficienza del codice moderno per creare esperienze digitali uniche.",
                "meta:name:keywords": "web design, sviluppo front-end, portfolio, minimalismo giapponese, UI/UX, Erubisu Studio, web agency italia, design curatoriale",
                "meta:name:twitter:title": "Erubisu Studio | Architectural Quiet Portfolio",
                "meta:name:twitter:description": "Sviluppo web curatoriale tra estetica giapponese e codice moderno.",
                "meta:property:og:title": "Erubisu Studio | Architectural Quiet Portfolio",
                "meta:property:og:description": "L'arte incontra l'efficienza. Sviluppo web curatoriale con eleganza e precisione."
        }
};
    const altTranslations = {
        "en": [
                "Erubisu Studio",
                "Professional profile",
                "Karalis Charter Interface",
                "OSINT Lab Interface",
                "Vera Social Interface"
        ],
        "it": [
                "Erubisu Studio",
                "Professional profile",
                "Karalis Charter Interface",
                "OSINT Lab Interface",
                "Vera Social Interface"
        ]
};
    const legalTranslations = {
        "en": {
                "privacy": {
                        "title": "Privacy Policy",
                        "body": "We respect your digital space. We collect only the information essential to provide our services. Your data will never be transferred or sold to third parties, and it will be handled with maximum confidentiality and protected with high security standards."
                },
                "cookie": {
                        "title": "Cookie Policy",
                        "body": "To keep the site fast and functional, we use only strictly necessary technical cookies. We removed invasive tracking scripts and unnecessary profiling cookies, fully respecting your privacy and offering a clean, fast experience."
                },
                "gdpr": {
                        "title": "GDPR Compliance",
                        "body": "Your right to privacy is protected. In full compliance with the GDPR, we ensure full control over your personal data. At any time, you can request access, correction, or permanent deletion from our systems."
                },
                "copied": "Copied!"
        },
        "it": {
                "privacy": {
                        "title": "Privacy Policy",
                        "body": "Rispettiamo il tuo spazio digitale. Raccogliamo esclusivamente le informazioni essenziali per offrirti i nostri servizi. I tuoi dati non verranno mai ceduti o venduti a terzi, ma trattati con la massima riservatezza e protetti con standard di sicurezza elevati."
                },
                "cookie": {
                        "title": "Cookie Policy",
                        "body": "Per mantenere il sito performante e funzionale, utilizziamo solo cookie tecnici strettamente necessari. Abbiamo eliminato ogni script di tracciamento invasivo o cookie di profilazione non richiesto, nel pieno rispetto della tua privacy e per offrirti un'esperienza veloce e pulita."
                },
                "gdpr": {
                        "title": "Conformità GDPR",
                        "body": "Il tuo diritto alla riservatezza è garantito. In piena conformità con il GDPR, ti assicuriamo il controllo totale sui tuoi dati personali. In qualsiasi momento puoi richiederne l'accesso, la rettifica o la cancellazione definitiva dai nostri sistemi."
                },
                "copied": "Copiato!"
        }
};
    const allowedLanguages = ['en', 'it'];
    let currentLanguage = 'en';

    function normalizeLanguage(lang) {
        return allowedLanguages.includes(lang) ? lang : 'en';
    }

    function updateSwitcherState(lang) {
        document.querySelectorAll('[data-lang-switch]').forEach((button) => {
            const active = button.dataset.langSwitch === lang;
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
            button.classList.toggle('bg-primary', active);
            button.classList.toggle('text-on-primary', active);
            button.classList.toggle('text-on-surface-variant', !active);
            button.classList.toggle('hover:text-on-surface', !active);
        });
        document.querySelectorAll('.language-switcher, .mobile-language-switcher').forEach((switcher) => {
            switcher.setAttribute('aria-label', lang === 'it' ? 'Selettore lingua' : 'Language selector');
        });
    }

    function updateMetadata(lang) {
        const meta = metaTranslations[lang] || metaTranslations.en;
        if (meta.title) document.title = meta.title;
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
        localStorage.setItem('site-language', lang);
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

        window.openLegalModal = (type) => {
            const legalModal = document.getElementById('legal-modal');
            const legalModalBackdrop = document.getElementById('legal-modal-backdrop');
            const legalModalContent = document.getElementById('legal-modal-content');
            const legalModalTitle = document.getElementById('legal-modal-title');
            const legalModalBody = document.getElementById('legal-modal-body');
            const data = legalTranslations[currentLanguage]?.[type] || legalTranslations.en[type];
            if (data && legalModal) {
                document.body.style.overflow = 'hidden';
                legalModalTitle.textContent = data.title;
                legalModalBody.textContent = data.body;
                legalModal.classList.remove('hidden');
                legalModal.classList.add('flex');
                void legalModal.offsetWidth;
                legalModalBackdrop.classList.remove('opacity-0');
                legalModalContent.classList.remove('scale-95', 'opacity-0');
            }
        };

        window.copyEmail = () => {
            const emailSpan = document.getElementById('contact-email');
            if (!emailSpan) return;
            const email = emailSpan.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailSpan.textContent;
                emailSpan.textContent = legalTranslations[currentLanguage]?.copied || legalTranslations.en.copied;
                setTimeout(() => {
                    emailSpan.textContent = originalText;
                }, 2000);
            });
        };

        const params = new URLSearchParams(window.location.search);
        const requestedLanguage = normalizeLanguage(params.get('lang'));
        const savedLanguage = normalizeLanguage(localStorage.getItem('site-language'));
        const initialLanguage = params.has('lang') ? requestedLanguage : savedLanguage;
        applyLanguage(initialLanguage);

        // IntersectionObserver for GPU-accelerated scroll animations
        if ('IntersectionObserver' in window) {
            const scrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
        } else {
            document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('fade-in-visible'));
        }
    });
})();