const dropdownLanguageBtn = document.getElementById('dropdown-language-button');

const currentLanguage = localStorage.getItem("i18nextLng") || "en";

const userLang = navigator.language || navigator.userLanguage;

i18next.use(i18nextXHRBackend).init({
    lng: currentLanguage,
    debug: true,
    fallbackLng: userLang,
    backend: {
        loadPath: "/assets/translations/{{lng}}.json",
    },
}, function (err, t) {
    updateContent();
});

function updateContent() {
    document.querySelectorAll("[i18n]").forEach(function (node) {
        node.innerHTML = i18next.t(node.getAttribute("i18n"));
    });
}

const handleCurrentLanguage  = (languageKey) => {
    let language = ''
    switch(languageKey){
        case 'en':
            language = 'English';
            break;
        case 'ar':
            language = 'العربية';
            break;
        case 'tr':
            language = 'Türkçe';
            break;
        default:
            language = 'English'
    }
    return dropdownLanguageBtn.textContent = language
}

function switchLanguage(lng) {
    i18next.changeLanguage(lng, function(err, t) {
        // update the content with the new language
        updateContent();
        localStorage.setItem("i18nextLng", lng);
        handleCurrentLanguage(lng)
    });
}



handleCurrentLanguage(currentLanguage);