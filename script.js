
/* =========================================
   BEHIND THE SCENE
   Interaction, sound and translation
========================================= */

const scenes = [...document.querySelectorAll(".scene")];
const progressDots = [...document.querySelectorAll(".progress-dot")];

const nextButton = document.getElementById("nextScene");
const prevButton = document.getElementById("prevScene");

const languageToggle = document.getElementById("languageToggle");
const soundToggle = document.getElementById("soundToggle");
const soundIcon = document.getElementById("soundIcon");

const startJourney = document.getElementById("startJourney");
const restartJourney = document.getElementById("restartJourney");

const revealButton = document.getElementById("revealButton");
const revealStage = document.getElementById("revealStage");
const revealCaption = document.getElementById("revealCaption");

const sourceToggle = document.getElementById("sourceToggle");
const sourcePanel = document.getElementById("sourcePanel");

const discoveryDetail = document.getElementById("discoveryDetail");
const detailIcon = document.getElementById("detailIcon");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");

let currentScene = 0;
let currentLanguage = "ar";
let soundEnabled = true;
let audioContext = null;


/* =========================================
   TRANSLATION
========================================= */

const translations = {

  ar: {

    heroTitle: "خلف الستار",

    heroText:
      "هل تعرفين ما الذي يحدث خلف الأشياء التي تستخدمينها كل يوم؟",

    start: "ابدئي الرحلة",

    microCopy:
      "تجربة تفاعلية لاستكشاف الذكاء الاصطناعي",

    definitionTitle:
      "الذكاء الاصطناعي بعيني",

    definitionText:
      "أرى الذكاء الاصطناعي كمساحة تتعلم فيها الآلات من البيانات، لتساعدنا على فهم العالم واكتشاف احتمالات لم نكن نراها من قبل.",

    definitionFooter:
      "ليس بديلًا عن خيالنا، بل أداة توسّع حدوده.",

    discover: "اكتشفي ما حولك",

    aroundTitle:
      "الذكاء أقرب مما تتخيلين",

    aroundIntro:
      "اختاري أحد الأبواب الثلاثة واكتشفي كيف يعمل الذكاء الاصطناعي حولنا.",

    visionTitle:
      "الرؤية الذكية",

    visionShort:
      "كيف تفهم الآلة الصور؟",

    languageTitle:
      "فهم اللغة",

    languageShort:
      "كيف تفهم الآلة كلماتنا؟",

    recommendTitle:
      "التوصيات الذكية",

    recommendShort:
      "كيف تعرف المنصات ما قد يعجبنا؟",

    explore: "اكتشفي ←",

    chooseCard:
      "اختاري أحد الأبواب",

    chooseText:
      "اضغطي على أحد العناصر لتكتشفي ما وراءه.",

    surprise:
      "اكتشفي المفاجأة",

    surpriseTitle:
      "من الضوضاء إلى الصورة",

    surpriseIntro:
      "معلومة أثارت فضولي: بعض نماذج الذكاء الاصطناعي تستطيع توليد صورة من ضوضاء عشوائية، عبر إزالة الضوضاء تدريجيًا.",

    noiseCaption:
      "البداية: ضوضاء عشوائية",

    reveal:
      "اكشفي كيف تتكوّن الصورة",

    revealNote:
      "هذا مشهد توضيحي مبسط لفكرة إزالة الضوضاء، وليس محاكاة فعلية لنموذج توليد صور.",

    sources:
      "المصادر العلمية",

    behindScenes:
      "خلف كواليس تجربتي",

    toolsTitle:
      "الإنسان خلف الذكاء الاصطناعي",

    toolsIntro:
      "الذكاء الاصطناعي ساعدني على تحويل الفكرة إلى تجربة، لكن اختياراتي وتوجيهي هما ما منحاها هويتها.",

    toolOneTitle:
      "الأدوات",

    toolOneText:
      "هنا نوضح أسماء الأدوات التي استخدمتها فعلًا في البحث والتصميم والتطوير.",

    toolTwoTitle:
      "ماذا قدم الذكاء؟",

    toolTwoText:
      "ساعدني في استكشاف الأفكار، وتطوير المحتوى، وتحويل التصورات إلى عناصر رقمية.",

    toolThreeTitle:
      "بصمتي الشخصية",

    toolThreeText:
      "اخترت أسلوب التجربة، ووجهت التصميم، وراجعت المحتوى، وحددت ما أريد تغييره.",

    humanNote:
      "الأداة بين يدي، لكن الفكرة والرؤية والقرارات الإبداعية هي مسؤوليتي.",

    restart:
      "أعيدي الرحلة",

    noiseAfter:
      "الصورة تتشكل تدريجيًا",

    noiseComplete:
      "من الضوضاء إلى صورة متماسكة",

    visionDetail:
      "تستخدم أنظمة الرؤية الحاسوبية نماذج تتعلم من الصور والبيانات لتتعرف على الأشياء والأنماط. مثال: مساعدة السيارة على التعرف على المشاة.",

    languageDetail:
      "تتعلم نماذج معالجة اللغة أنماط الكلمات والسياق لتساعد في الترجمة، والتلخيص، وفهم الأسئلة.",

    recommendationDetail:
      "تحلل أنظمة التوصية أنماط التفاعل والاهتمامات لتقترح محتوى قد يكون مناسبًا للمستخدم.",

    soundOn:
      "تشغيل الصوت",

    soundOff:
      "إيقاف الصوت"

  },


  en: {

    heroTitle:
      "Behind the Scene",

    heroText:
      "Have you ever wondered what happens behind the things you use every day?",

    start:
      "Begin the journey",

    microCopy:
      "An interactive exploration of artificial intelligence",

    definitionTitle:
      "AI Through My Eyes",

    definitionText:
      "I see AI as a space where machines learn from data to help us understand the world and discover possibilities we might not have seen before.",

    definitionFooter:
      "Not a replacement for imagination, but a tool that expands it.",

    discover:
      "Discover what surrounds you",

    aroundTitle:
      "AI is closer than you think",

    aroundIntro:
      "Choose one of the three doors and discover how AI works around us.",

    visionTitle:
      "Computer Vision",

    visionShort:
      "How do machines understand images?",

    languageTitle:
      "Language Understanding",

    languageShort:
      "How do machines understand our words?",

    recommendTitle:
      "Smart Recommendations",

    recommendShort:
      "How do platforms know what we might like?",

    explore:
      "Explore →",

    chooseCard:
      "Choose a door",

    chooseText:
      "Click one of the elements to discover what is behind it.",

    surprise:
      "Discover the surprise",

    surpriseTitle:
      "From Noise to Image",

    surpriseIntro:
      "Something that fascinated me: some AI models can generate images from random noise by gradually removing the noise.",

    noiseCaption:
      "Beginning: Random noise",

    reveal:
      "Reveal how an image forms",

    revealNote:
      "This is a simplified visual explanation of denoising, not an actual simulation of an image-generation model.",

    sources:
      "Scientific sources",

    behindScenes:
      "Behind my experience",

    toolsTitle:
      "The Human Behind AI",

    toolsIntro:
      "AI helped me turn an idea into an experience, but my choices and direction gave it its identity.",

    toolOneTitle:
      "The Tools",

    toolOneText:
      "Here we identify the tools actually used for research, design, and development.",

    toolTwoTitle:
      "How AI Helped",

    toolTwoText:
      "It helped me explore ideas, develop content, and turn concepts into digital elements.",

    toolThreeTitle:
      "My Contribution",

    toolThreeText:
      "I chose the experience style, directed the design, reviewed the content, and decided what to change.",

    humanNote:
      "The tool is in my hands, but the idea, vision, and creative decisions are my responsibility.",

    restart:
      "Restart the journey",

    noiseAfter:
      "The image is gradually forming",

    noiseComplete:
      "From noise to a coherent image",

    visionDetail:
      "Computer vision systems use models trained on images and data to recognize objects and patterns. Example: helping a car recognize pedestrians.",

    languageDetail:
      "Language models learn patterns in words and context to help with translation, summarization, and understanding questions.",

    recommendationDetail:
      "Recommendation systems analyze interaction patterns and interests to suggest content that may be relevant to a user.",

    soundOn:
      "Sound on",

    soundOff:
      "Sound off"

  }

};


/* =========================================
   SCENE NAVIGATION
========================================= */

function showScene(index) {

  if (index < 0 || index >= scenes.length) {
    return;
  }

  currentScene = index;

  scenes.forEach((scene, i) => {

    scene.classList.toggle(
      "active",
      i === currentScene
    );

  });

  progressDots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === currentScene
    );

  });

  playSound("transition");

}


function nextScene() {

  if (currentScene < scenes.length - 1) {

    showScene(currentScene + 1);

  }

}


function previousScene() {

  if (currentScene > 0) {

    showScene(currentScene - 1);

  }

}


nextButton.addEventListener("click", nextScene);

prevButton.addEventListener("click", previousScene);


document.querySelectorAll(".next-scene").forEach(button => {

  button.addEventListener("click", nextScene);

});


progressDots.forEach(dot => {

  dot.addEventListener("click", () => {

    const index = Number(dot.dataset.scene);

    showScene(index);

  });

});


startJourney.addEventListener("click", () => {

  initializeAudio();

  showScene(1);

  playSound("portal");

});


restartJourney.addEventListener("click", () => {

  showScene(0);

  resetReveal();

});


/* =========================================
   LANGUAGE TOGGLE
========================================= */

function updateLanguage() {

  const dictionary = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;

  document.documentElement.dir =
    currentLanguage === "ar" ? "rtl" : "ltr";

  document.body.dir =
    currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {

    const key = element.dataset.i18n;

    if (dictionary[key]) {

      element.textContent = dictionary[key];

    }

  });

  languageToggle.textContent =
    currentLanguage === "ar" ? "EN" : "عربي";

  soundToggle.setAttribute(
    "aria-label",
    soundEnabled
      ? dictionary.soundOn
      : dictionary.soundOff
  );

  updateDiscoveryDetail();

  updateRevealCaption();

}


languageToggle.addEventListener("click", () => {

  currentLanguage =
    currentLanguage === "ar" ? "en" : "ar";

  updateLanguage();

  playSound("click");

});


/* =========================================
   DISCOVERY CARDS
========================================= */

const discoveryCards = [
  ...document.querySelectorAll(".discovery-card")
];

let selectedDiscovery = null;


function updateDiscoveryDetail() {

  const dictionary = translations[currentLanguage];

  if (!selectedDiscovery) {

    detailTitle.textContent = dictionary.chooseCard;

    detailText.textContent = dictionary.chooseText;

    detailIcon.textContent = "✦";

    return;

  }

  const key = selectedDiscovery;

  const details = {

    vision: {
      title: dictionary.visionTitle,
      text: dictionary.visionDetail,
      icon: "◉"
    },

    language: {
      title: dictionary.languageTitle,
      text: dictionary.languageDetail,
      icon: "Aa"
    },

    recommendation: {
      title: dictionary.recommendTitle,
      text: dictionary.recommendDetail,
      icon: "✧"
    }

  };

  const selected = details[key];

  detailTitle.textContent = selected.title;

  detailText.textContent = selected.text;

  detailIcon.textContent = selected.icon;

}


discoveryCards.forEach(card => {

  card.addEventListener("click", () => {

    selectedDiscovery = card.dataset.discovery;

    discoveryCards.forEach(item => {

      item.classList.toggle(
        "selected",
        item === card
      );

    });

    updateDiscoveryDetail();

    playSound("discovery");

  });

});


/* =========================================
   SURPRISE REVEAL
========================================= */

let revealCompleted = false;


function updateRevealCaption() {

  const dictionary = translations[currentLanguage];

  if (revealCompleted) {

    revealCaption.textContent = dictionary.noiseComplete;

  } else {

    revealCaption.textContent = dictionary.noiseCaption;

  }

}


function resetReveal() {

  revealCompleted = false;

  revealStage.classList.remove("revealed");

  revealButton.disabled = false;

  revealButton.style.opacity = "1";

  revealButton.querySelector("span").textContent =
    translations[currentLanguage].reveal;

  updateRevealCaption();

}


revealButton.addEventListener("click", () => {

  if (revealCompleted) {

    resetReveal();

    return;

  }

  revealCompleted = true;

  revealStage.classList.add("revealed");

  revealCaption.textContent =
    translations[currentLanguage].noiseAfter;

  revealButton.querySelector("span").textContent =
    translations[currentLanguage].restart;

  playSound("reveal");

  setTimeout(() => {

    revealCaption.textContent =
      translations[currentLanguage].noiseComplete;

  }, 1800);

});


/* =========================================
   SOURCES
========================================= */

sourceToggle.addEventListener("click", () => {

  sourcePanel.classList.toggle("show");

  playSound("click");

});


/* =========================================
   AUDIO ENGINE
   No external audio files required
========================================= */

function initializeAudio() {

  if (!audioContext) {

    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {

      return;

    }

    audioContext = new AudioContextClass();

  }

  if (audioContext.state === "suspended") {

    audioContext.resume();

  }

}


function playTone(
  frequency,
  duration = 0.3,
  volume = 0.04,
  type = "sine",
  delay = 0
) {

  if (!soundEnabled) {

    return;

  }

  initializeAudio();

  if (!audioContext) {

    return;

  }

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  const startTime =
    audioContext.currentTime + delay;

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    frequency,
    startTime
  );

  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.03
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration
  );

  oscillator.connect(gain);

  gain.connect(audioContext.destination);

  oscillator.start(startTime);

  oscillator.stop(startTime + duration);

}


function playSound(name) {

  if (!soundEnabled) {

    return;

  }

  switch (name) {

    case "click":

      playTone(700, 0.12, 0.025);

      break;


    case "transition":

      playTone(380, 0.25, 0.02);

      playTone(570, 0.3, 0.02, "sine", 0.12);

      break;


    case "portal":

      playTone(220, 0.6, 0.035);

      playTone(440, 0.7, 0.03, "sine", 0.18);

      playTone(660, 0.8, 0.02, "sine", 0.35);

      break;


    case "discovery":

      playTone(520, 0.25, 0.035);

      playTone(780, 0.35, 0.03, "sine", 0.12);

      break;


    case "reveal":

      playTone(330, 0.4, 0.025);

      playTone(440, 0.5, 0.03, "sine", 0.25);

      playTone(660, 0.7, 0.035, "sine", 0.5);

      break;

  }

}


/* =========================================
   SOUND TOGGLE
========================================= */

soundToggle.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  soundIcon.textContent =
    soundEnabled ? "♫" : "×";

  soundToggle.setAttribute(
    "aria-pressed",
    String(soundEnabled)
  );

  if (soundEnabled) {

    initializeAudio();

    playSound("click");

  }

});


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener("keydown", event => {

  if (
    event.key === "ArrowRight" ||
    event.key === "ArrowLeft"
  ) {

    if (
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "A"
    ) {

      return;

    }

    if (event.key === "ArrowRight") {

      nextScene();

    } else {

      previousScene();

    }

  }

});


/* =========================================
   INITIALIZATION
========================================= */

updateLanguage();

showScene(0);

resetReveal();
