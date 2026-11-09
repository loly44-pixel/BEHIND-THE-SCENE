// =====================================
// AI ROOM — Interactive Experience
// =====================================

const scenes = [...document.querySelectorAll(".scene")];
const navDots = [...document.querySelectorAll(".nav-dot")];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const languageBtn = document.getElementById("languageBtn");
const soundBtn = document.getElementById("soundBtn");
const soundLabel = document.getElementById("soundLabel");

const objectModal = document.getElementById("objectModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalBackBtn = document.getElementById("modalBackBtn");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalIcon = document.getElementById("modalIcon");

const quizOptions = [...document.querySelectorAll(".quiz-option")];
const quizFeedback = document.getElementById("quizFeedback");
const toFinalBtn = document.getElementById("toFinalBtn");
const restartBtn = document.getElementById("restartBtn");

let currentScene = 0;
let currentLanguage = "ar";
let soundEnabled = true;
let quizSolved = false;

// -------------------------------------
// Scene navigation
// -------------------------------------

function showScene(index) {
  if (index < 0 || index >= scenes.length) return;

  currentScene = index;

  scenes.forEach((scene, i) => {
    scene.classList.toggle("active", i === currentScene);
  });

  navDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentScene);
  });

  prevBtn.disabled = currentScene === 0;
  nextBtn.disabled = currentScene === scenes.length - 1;

  prevBtn.style.opacity = currentScene === 0 ? "0.35" : "1";
  nextBtn.style.opacity = currentScene === scenes.length - 1 ? "0.35" : "1";

  playSound(420, 0.045);
}

function goNext() {
  if (currentScene < scenes.length - 1) {
    showScene(currentScene + 1);
  }
}

function goPrevious() {
  if (currentScene > 0) {
    showScene(currentScene - 1);
  }
}

prevBtn.addEventListener("click", goPrevious);
nextBtn.addEventListener("click", goNext);

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = Number(button.dataset.go);
    showScene(target);
  });
});

// -------------------------------------
// Language toggle: Arabic / English
// -------------------------------------

function updateLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.body.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
    const translatedText =
      currentLanguage === "ar"
        ? element.dataset.ar
        : element.dataset.en;

    element.innerHTML = translatedText;
  });

  languageBtn.textContent = currentLanguage === "ar" ? "EN" : "عربي";

  soundLabel.textContent =
    currentLanguage === "ar"
      ? "الصوت"
      : "Sound";

  updateQuizFeedback();
}

languageBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "ar" ? "en" : "ar";
  updateLanguage();
  playSound(600, 0.05);
});

// -------------------------------------
// Sound effects
// -------------------------------------

function playSound(frequency = 440, duration = 0.08) {
  if (!soundEnabled) return;

  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);

    oscillator.onended = () => {
      audioContext.close();
    };
  } catch (error) {
    // إذا لم يدعم المتصفح الصوت، تستمر التجربة بشكل طبيعي.
  }
}

soundBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;

  soundLabel.textContent =
    currentLanguage === "ar"
      ? soundEnabled
        ? "الصوت"
        : "الصوت مغلق"
      : soundEnabled
        ? "Sound"
        : "Sound off";

  soundBtn.classList.toggle("sound-off", !soundEnabled);

  if (soundEnabled) {
    playSound(550, 0.08);
  }
});

// -------------------------------------
// Interactive room objects
// -------------------------------------

const objectInformation = {
  robot: {
    icon: "🤖",
    title: {
      ar: "الروبوت الذكي",
      en: "The Smart Robot"
    },
    text: {
      ar: "الروبوت آلة يمكن برمجتها لتنفيذ مهام محددة. بعض الروبوتات تستخدم الذكاء الاصطناعي لتتعرف على الأشياء أو تتفاعل مع البيئة المحيطة بها.",
      en: "A robot is a machine that can be programmed to perform tasks. Some robots use AI to recognize objects or interact with their surroundings."
    }
  },

  computer: {
    icon: "💻",
    title: {
      ar: "الحاسوب",
      en: "The Computer"
    },
    text: {
      ar: "الحاسوب ينفذ العمليات الحسابية والمنطقية بسرعة كبيرة. وتعمل كثير من أنظمة الذكاء الاصطناعي على الحواسيب أو الخوادم لمعالجة البيانات والتعلم منها.",
      en: "A computer performs calculations and logical operations quickly. Many AI systems run on computers or servers to process data and learn from it."
    }
  },

  brain: {
    icon: "✺",
    title: {
      ar: "الشبكة العصبية",
      en: "The Neural Network"
    },
    text: {
      ar: "الشبكة العصبية نموذج حاسوبي مستوحى بشكل مبسط من طريقة ترابط الخلايا العصبية. تتعلم الأنماط من أمثلة كثيرة، ثم تستخدم ما تعلمته لإنتاج توقعات أو نتائج.",
      en: "A neural network is a computational model loosely inspired by connections between neurons. It learns patterns from many examples and uses them to make predictions or produce results."
    }
  }
};

function openObjectModal(objectName) {
  const info = objectInformation[objectName];

  if (!info) return;

  modalIcon.textContent = info.icon;
  modalTitle.textContent = info.title[currentLanguage];
  modalText.textContent = info.text[currentLanguage];

  objectModal.classList.add("open");
  objectModal.setAttribute("aria-hidden", "false");

  playSound(680, 0.07);
}

function closeObjectModal() {
  objectModal.classList.remove("open");
  objectModal.setAttribute("aria-hidden", "true");

  playSound(350, 0.05);
}

document.querySelectorAll("[data-object]").forEach((objectButton) => {
  objectButton.addEventListener("click", () => {
    openObjectModal(objectButton.dataset.object);
  });
});

modalCloseBtn.addEventListener("click", closeObjectModal);
modalBackBtn.addEventListener("click", closeObjectModal);

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeObjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && objectModal.classList.contains("open")) {
    closeObjectModal();
  }
});

// -------------------------------------
// Explorer quiz
// -------------------------------------

function updateQuizFeedback() {
  if (!quizSolved) return;

  quizFeedback.textContent =
    currentLanguage === "ar"
      ? "إجابة صحيحة! كلمة «عين» هنا تعني نبع الماء. ✨"
      : "Correct! Here, “عين” means a water spring. ✨";
}

quizOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (quizSolved) return;

    const isCorrect = option.dataset.answer === "correct";

    if (isCorrect) {
      quizSolved = true;
      option.classList.add("correct");

      quizOptions.forEach((otherOption) => {
        otherOption.disabled = true;
      });

      quizFeedback.textContent =
        currentLanguage === "ar"
          ? "إجابة صحيحة! كلمة «عين» هنا تعني نبع الماء. ✨"
          : "Correct! Here, “عين” means a water spring. ✨";

      toFinalBtn.classList.remove("hidden");

      playSound(760, 0.12);
    } else {
      option.classList.add("wrong");

      quizFeedback.textContent =
        currentLanguage === "ar"
          ? "مو هذا المعنى في الجملة. جرّبي مرة ثانية!"
          : "That is not the meaning in this sentence. Try again!";

      playSound(220, 0.1);

      setTimeout(() => {
        option.classList.remove("wrong");
      }, 700);
    }
  });
});

// -------------------------------------
// Restart experience from the beginning
// -------------------------------------

function restartExperience() {
  currentScene = 0;
  quizSolved = false;

  quizOptions.forEach((option) => {
    option.disabled = false;
    option.classList.remove("correct", "wrong");
  });

  quizFeedback.textContent = "";
  toFinalBtn.classList.add("hidden");

  closeObjectModal();
  showScene(0);

  playSound(500, 0.1);
}

restartBtn.addEventListener("click", restartExperience);

// -------------------------------------
// Initialize
// -------------------------------------

updateLanguage();
showScene(0);
