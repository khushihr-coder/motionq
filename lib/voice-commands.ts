type Language = 'en' | 'hi' | 'mr';

interface Router {
    push: (href: string) => void;
}

interface CommandContext {
    router: Router;
    setLang: (lang: Language) => void;
    speak: (text: string, lang: Language) => void;
    setIsListening: (isListening: boolean) => void;
}

export const processCommand = (
    text: string,
    lang: Language,
    ctx: CommandContext
) => {
    const normalized = text
        .normalize("NFC")
        .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    if (lang === 'en') {
        processEnglish(normalized, ctx);
    } else if (lang === 'hi') {
        processHindi(normalized, ctx);
    } else if (lang === 'mr') {
        processMarathi(normalized, ctx);
    }
};

const fuzzyMatch = (words: string[], text: string) => {
    return words.some(word => text.includes(word));
};

const processEnglish = (text: string, ctx: CommandContext) => {
    const { router, setLang, speak, setIsListening } = ctx;

    // Language Switching
    if (
        ["hindi", "hi", "switch to hindi", "change to hindi", "translate to hindi"].some(kw => text.includes(kw))
    ) {
        speak("Switching to Hindi", 'hi');
        setLang('hi');
        return;
    }
    if (
        ["marathi", "switch to marathi", "change to marathi", "translate to marathi"].some(kw => text.includes(kw))
    ) {
        speak("Switching to Marathi", 'mr');
        setLang('mr');
        return;
    }

    // Navigation
    const navMap: Record<string, string> = {
        "home": "/", "go home": "/",
        "problem": "/problem", "go to problem": "/problem",
        "solution": "/solution", "go to solution": "/solution",
        "demo": "/demo", "go to demo": "/demo",
        "download": "/download",
        "results": "/results",
        "team": "/team",
        "privacy": "/privacy",
        "login": "/login",
        "sign up": "/register", "register": "/register",
    };

    for (const key of Object.keys(navMap)) {
        if (text.includes(key)) {
            if (window.location.pathname !== navMap[key]) {
                speak(`Navigating to ${key}`, 'en');
                router.push(navMap[key]);
            }
            return;
        }
    }

    // Scrolling
    if (text.includes("scroll up")) {
        speak("Scrolling up", 'en');
        window.scrollBy({ top: -400, behavior: "smooth" });
        return;
    }
    if (text.includes("scroll down")) {
        speak("Scrolling down", 'en');
        window.scrollBy({ top: 400, behavior: "smooth" });
        return;
    }

    // Chat
    if (["open chat", "show chat", "open chatbot"].some(kw => text.includes(kw))) {
        const chatButton = document.getElementById("open-chatbot-button");
        if (chatButton) {
            chatButton.click();
            speak("Opening chat", 'en');
        }
        return;
    }
    if (["close chat", "hide chat", "close chatbot"].some(kw => text.includes(kw))) {
        window.dispatchEvent(new Event("close-chatbot"));
        speak("Closing chat", 'en');
        return;
    }
};

const processHindi = (text: string, ctx: CommandContext) => {
    const { router, setLang, speak } = ctx;

    // Language Switching
    if (
        ["english", "eng", "अंग्रेजी", "इंग्लिश"].some(kw => text.includes(kw))
    ) {
        speak("Switching to English", 'en');
        setLang('en');
        return;
    }
    if (
        ["marathi", "मराठी"].some(kw => text.includes(kw))
    ) {
        speak("मराठी में बदल रहे हैं", 'mr');
        setLang('mr');
        return;
    }

    // Navigation
    const navMap: Record<string, string> = {
        "होम": "/", "घर": "/",
        "प्रॉब्लम": "/problem", "समस्या": "/problem",
        "सॉल्यूशन": "/solution", "समाधान": "/solution",
        "डेमो": "/demo",
        "डाउनलोड": "/download",
        "रिजल्ट": "/results", "परिणाम": "/results",
        "टीम": "/team",
        "प्राइवेसी": "/privacy", "गोपनीयता": "/privacy",
        "लॉगिन": "/login",
        "साइन अप": "/register", "रजिस्टर": "/register",
    };

    for (const key of Object.keys(navMap)) {
        if (text.includes(key)) {
            if (window.location.pathname !== navMap[key]) {
                speak(`${key} पर जा रहे हैं`, 'hi');
                router.push(navMap[key]);
            }
            return;
        }
    }

    // Scrolling
    if (text.includes('ऊपर')) {
        speak('ऊपर स्क्रोल किया', 'hi');
        window.scrollBy({ top: -400, behavior: 'smooth' });
        return;
    }
    if (text.includes('नीचे')) {
        speak('नीचे स्क्रोल किया', 'hi');
        window.scrollBy({ top: 400, behavior: 'smooth' });
        return;
    }

    // Video
    if (text.includes('वीडियो चलाओ') || text.includes('प्ले')) {
        const video = document.querySelector('video');
        if (video) {
            video.play().catch(() => { });
            speak('वीडियो चला रहे हैं', 'hi');
        }
        return;
    }
    if (text.includes('वीडियो रोको') || text.includes('पॉज')) {
        const video = document.querySelector('video');
        if (video) {
            video.pause();
            speak('वीडियो रोका', 'hi');
        }
        return;
    }

    // Chat
    const chatWords = ['चैट', 'चार', 'चाट', 'chat'];
    if (fuzzyMatch(chatWords, text) && text.includes('खोल')) {
        const chatButton = document.getElementById('open-chatbot-button');
        if (chatButton) {
            chatButton.click();
            speak('चैट खोल रहे हैं', 'hi');
        }
        return;
    }
    if (fuzzyMatch(chatWords, text) && (text.includes('बंद') || text.includes('छुपाओ'))) {
        window.dispatchEvent(new Event("close-chatbot"));
        speak('चैट बंद कर रहे हैं', 'hi');
        return;
    }
};

const processMarathi = (text: string, ctx: CommandContext) => {
    const { router, setLang, speak } = ctx;

    // Language Switching
    if (
        ["english", "eng", "इंग्रजी", "इंग्लिश"].some(kw => text.includes(kw))
    ) {
        speak("Switching to English", 'en');
        setLang('en');
        return;
    }
    if (
        ["hindi", "हिंदी"].some(kw => text.includes(kw))
    ) {
        speak("हिंदी मध्ये बदलत आहे", 'hi');
        setLang('hi');
        return;
    }

    // Navigation
    const navMap: Record<string, string> = {
        "होम": "/", "घर": "/",
        "प्रॉब्लेम": "/problem", "समस्या": "/problem",
        "सोल्यूशन": "/solution", "उपाय": "/solution",
        "डेमो": "/demo",
        "डाउनलोड": "/download",
        "रिझल्ट": "/results", "परिणाम": "/results",
        "टीम": "/team",
        "प्रायव्हसी": "/privacy", "गोपनीयता": "/privacy",
        "लॉगिन": "/login",
        "साइन अप": "/register", "रजिस्टर": "/register",
    };

    for (const key of Object.keys(navMap)) {
        if (text.includes(key)) {
            if (window.location.pathname !== navMap[key]) {
                speak(`${key} वर जात आहे`, 'mr');
                router.push(navMap[key]);
            }
            return;
        }
    }

    // Scrolling
    if (text.includes('वर')) {
        speak('वर स्क्रोल केले', 'mr');
        window.scrollBy({ top: -400, behavior: 'smooth' });
        return;
    }
    if (text.includes('खाली')) {
        speak('खाली स्क्रोल केले', 'mr');
        window.scrollBy({ top: 400, behavior: 'smooth' });
        return;
    }

    // Video
    if (text.includes('व्हिडिओ चालवा') || text.includes('प्ले')) {
        const video = document.querySelector('video');
        if (video) {
            video.play().catch(() => { });
            speak('व्हिडिओ चालवत आहे', 'mr');
        }
        return;
    }
    if (text.includes('व्हिडिओ थांबवा') || text.includes('पॉज')) {
        const video = document.querySelector('video');
        if (video) {
            video.pause();
            speak('व्हिडिओ थांबवले', 'mr');
        }
        return;
    }

    // Chat
    const chatWords = ['चॅट', 'गप्पा', 'chat'];
    if (fuzzyMatch(chatWords, text) && text.includes('उघडा')) {
        const chatButton = document.getElementById('open-chatbot-button');
        if (chatButton) {
            chatButton.click();
            speak('चॅट उघडत आहे', 'mr');
        }
        return;
    }
    if (fuzzyMatch(chatWords, text) && (text.includes('बंद') || text.includes('लपवा'))) {
        window.dispatchEvent(new Event("close-chatbot"));
        speak('चॅट बंद करत आहे', 'mr');
        return;
    }
};
