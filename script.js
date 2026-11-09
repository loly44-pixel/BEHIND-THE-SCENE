
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  let currentScene = 0;
  let language = "ar";
  let soundEnabled = false;
  let audioContext = null;
  let currentTopic = null;
  let toastTimer = null;
  let quizIndex = 0;
  let quizScore = 0;
  let answered = false;

  const scenes = $$(".scene");
  const navDots = $$(".nav-dot");

  const modalBackdrop = $("#modalBackdrop");
  const modalIcon = $("#modalIcon");
  const modalTitle = $("#modalTitle");
  const modalContent = $("#modalContent");


  /* =====================================
     المحتوى العلمي والترجمة
  ===================================== */

  const translations = {

    ar: {

      sound: "الصوت",

      introEyebrow: "تجربة تفاعلية لاستكشاف المستقبل",
      introTitle: "هل أنتِ مستعدة<br><span>لاكتشاف المجهول؟</span>",
      introDescription:
        "رحلة داخل عالم الذكاء الاصطناعي، حيث تتحول الأسئلة إلى اكتشافات.",
      start: "ابدئي الرحلة",
      introCaption: "بوابة الاكتشاف",

      roomEyebrow: "مرحبًا بكِ في عالم الاكتشاف",
      roomTitle: "اختاري بوابتكِ",
      roomDescription:
        "كل عنصر يحمل قصة عن الذكاء الاصطناعي.",

      brainTitle: "العقل الذكي",
      brainSubtitle: "كيف يتعلم؟",

      artTitle: "مرسم الخيال",
      artSubtitle: "كيف يولد الصور؟",

      voiceTitle: "بوابة الصوت",
      voiceSubtitle: "كيف يفهم الكلام؟",

      visionTitle: "عين الآلة",
      visionSubtitle: "كيف يرى الصور؟",

      curiosityTitle: "شرارة الفضول",
      curiositySubtitle: "معلومة مدهشة",

      labTitle: "مختبر الإبداع",
      labSubtitle: "كيف صنعنا التجربة؟",

      roomHint: "انقري على أي مجسم لبدء الاكتشاف",

      curiosityEyebrow: "معلومة أثارت فضولي",
      curiosityHeading: "من الضوضاء<br><span>إلى صورة مدهشة!</span>",
      curiosityDescription:
        "كيف يمكن لنقاط عشوائية أن تتحول إلى صورة واضحة؟",

      stepOneTitle: "ضوضاء عشوائية",
      stepOneDescription:
        "يبدأ النموذج بنمط مليء بالتشويش.",

      stepTwoTitle: "إزالة التشويش",
      stepTwoDescription:
        "يتعلم النموذج إزالة التشويش تدريجيًا.",

      stepThreeTitle: "صورة جديدة",
      stepThreeDescription:
        "تتكون صورة تتوافق مع الوصف المطلوب.",

      curiosityNote:
        "هذه العملية من الأفكار الأساسية في نماذج الانتشار (Diffusion Models).",

      replay: "إعادة التجربة",
      visitLab: "انتقلي إلى مختبر الإبداع",

      labEyebrow: "خلف كواليس التجربة",
      labHeading: "مختبر <span>الإبداع</span>",
      labDescription:
        "كيف اجتمعت الفكرة والتقنية لصناعة هذه التجربة؟",

      toolLabel: "أداة الذكاء الاصطناعي",
      toolDescription:
        "أداة ذكاء اصطناعي ساعدت في تطوير الأفكار، تنظيم المحتوى، واقتراح الأكواد البرمجية.",

      contributionLabel: "مساهمتي الشخصية",
      contributionHeading: "أنا صاحبة الفكرة",

      contributionOne: "ابتكار فكرة الغرفة التفاعلية.",
      contributionTwo: "تحديد أهداف المشروع والمحتوى العلمي.",
      contributionThree: "اختيار التصميم وتنظيم المشاهد.",
      contributionFour: "تجربة الأكواد ومراجعة النتائج.",
      contributionFive:
        "تطوير التجربة بما يناسب متطلبات المشروع.",

      transparencyHeading: "الإنسان + الذكاء الاصطناعي",

      transparencyDescription:
        "ساعدت الأداة في التنفيذ والاقتراح، بينما بقيت الفكرة والاختيارات النهائية ومراجعة المحتوى من مسؤولية صاحبة المشروع.",

      sourcesLabel: "المصادر العلمية",

      challengeEyebrow: "اختبري معرفتك",
      challengeHeading: "تحدي <span>المستكشف</span>",
      challengeDescription:
        "هل أصبحتِ مستكشفة للذكاء الاصطناعي؟",

      nextQuestion: "السؤال التالي",
      resultTitle: "أحسنتِ يا مستكشفة!",
      restart: "إعادة التحدي",

      footerText: "رحلة تفاعلية في عالم الذكاء الاصطناعي",

      discoveryLabel: "اكتشاف جديد",
      backToRoom: "العودة إلى الغرفة",

      soundOn: "تم تفعيل الصوت",
      soundOff: "تم إيقاف الصوت",

      correct: "إجابة صحيحة! أحسنتِ.",
      wrong: "ليست الإجابة الصحيحة. حاولي مرة أخرى.",
      score: "نتيجتكِ",
      outOf: "من",

      topics: {

        brain: {

          icon: "🧠",

          title: "العقل الذكي: كيف يتعلم الذكاء الاصطناعي؟",

          body: `
            <p>
              الذكاء الاصطناعي (Artificial Intelligence)
              هو مجال في علوم الحاسب يهدف إلى تطوير أنظمة
              تستطيع تنفيذ مهام تحتاج عادةً إلى قدرات بشرية،
              مثل فهم اللغة والتعرف على الصور والتنبؤ.
            </p>

            <p>
              <strong>كيف يتعلم؟</strong>
              تتعلم بعض أنظمة الذكاء الاصطناعي الأنماط
              من البيانات والأمثلة، ثم تستخدم ما تعلمته
              لإنتاج توقعات أو استجابات.
            </p>

            <div class="highlight">
              تخيّلي أنكِ تعرضين على النظام آلاف الصور
              للقطط والكلاب. يمكنه تعلم الأنماط التي
              تساعده على التمييز بينها في صور جديدة.
            </div>

            <p>
              الذكاء الاصطناعي ليس عقلًا بشريًا داخل جهاز؛
              قدراته وحدوده تعتمد على تصميم النظام
              والبيانات والمهمة المطلوبة.
            </p>
          `
        },


        art: {

          icon: "🎨",

          title: "مرسم الخيال: كيف يولد الصور؟",

          body: `
            <p>
              تستطيع نماذج توليد الصور إنشاء صور جديدة
              انطلاقًا من وصف نصي.
            </p>

            <p>
              من الطرق المعروفة:
              <strong>نماذج الانتشار (Diffusion Models).</strong>
            </p>

            <p>
              تتعلم هذه النماذج التعامل مع الصور
              التي أضيف إليها التشويش أثناء التدريب.
              وعند التوليد، تبدأ غالبًا من ضوضاء عشوائية
              وتزيلها تدريجيًا لتكوين صورة تتوافق مع الوصف.
            </p>

            <div class="highlight">
              مثال: عند كتابة «مدينة مستقبلية تحت المطر»،
              يحاول النموذج إنشاء صورة تتوافق مع الكلمات
              والعلاقات التي تعلمها.
            </div>

            <p>
              قد تكون النتائج إبداعية، لكنها قد تحتوي
              على تفاصيل غير دقيقة؛ لذلك من المهم مراجعتها.
            </p>
          `
        },


        voice: {

          icon: "🎙️",

          title: "بوابة الصوت: كيف يفهم النظام الكلام؟",

          body: `
            <p>
              تتضمن أنظمة معالجة الكلام مراحل متعددة،
              وقد تختلف حسب التقنية المستخدمة.
            </p>

            <ul>
              <li>
                <strong>التقاط الصوت:</strong>
                تسجيل الموجة الصوتية.
              </li>

              <li>
                <strong>التعرف على الكلام:</strong>
                تحويل الصوت إلى نص.
              </li>

              <li>
                <strong>فهم اللغة:</strong>
                تحليل المعنى أو المقصود.
              </li>

              <li>
                <strong>الاستجابة:</strong>
                إنشاء رد نصي أو صوتي.
              </li>
            </ul>

            <div class="highlight">
              الترجمة الصوتية قد تجمع بين التعرف على الكلام،
              والترجمة النصية، ثم توليد الصوت باللغة الجديدة.
            </div>

            <p>
              قد تتأثر النتائج بالضوضاء واللهجات
              والكلمات غير الواضحة.
            </p>
          `
        },


        vision: {

          icon: "👁️",

          title: "عين الآلة: الرؤية الحاسوبية",

          body: `
            <p>
              الرؤية الحاسوبية (Computer Vision)
              تساعد الحاسوب على تحليل الصور والفيديو
              واستخراج المعلومات منها.
            </p>

            <p>من تطبيقاتها:</p>

            <ul>
              <li>اكتشاف الأشياء داخل الصور.</li>
              <li>تصنيف الصور.</li>
              <li>قراءة النصوص داخل الصور.</li>
              <li>المساعدة في فهم الطريق للأنظمة الذكية.</li>
            </ul>

            <div class="highlight">
              عندما يتعرف النظام على قطة في صورة،
              فإنه يحلل أنماطًا وسمات بصرية تعلمها
              من بيانات التدريب.
            </div>

            <p>
              وقد يتأثر الأداء بالإضاءة، وزاوية التصوير،
              وجودة الصورة، وبيانات التدريب.
            </p>
          `
        },


        curiosity: {

          icon: "💡",

          title: "معلومة أثارت فضولي!",

          body: `
            <p>
              بعض نماذج توليد الصور تستطيع البدء
              من <strong>ضوضاء عشوائية</strong>
              وتحويلها تدريجيًا إلى صورة مفهومة.
            </p>

            <p>
              في نماذج الانتشار، تتعلم الشبكة العصبية
              إزالة التشويش خطوة بخطوة حتى تتكون
              صورة تتوافق مع الوصف المطلوب.
            </p>

            <div class="highlight">
              تخيّلي أن آلاف النقاط العشوائية تتحول
              تدريجيًا إلى مشهد مليء بالألوان والتفاصيل!
            </div>

            <p>
              هذه الفكرة توضح أحد الأساليب المستخدمة
              في توليد الصور، وليست وصفًا لكل تقنيات
              الذكاء الاصطناعي.
            </p>
          `
        },


        lab: {

          icon: "🛠️",

          title: "مختبر الإبداع: كيف صنعنا التجربة؟",

          body: `
            <p>
              تم استخدام <strong>ChatGPT</strong>
              كمساعد في تطوير الأفكار وتنظيم المحتوى
              واقتراح الأكواد البرمجية.
            </p>

            <p><strong>مساهمتي الشخصية:</strong></p>

            <ul>
              <li>ابتكار فكرة الغرفة التفاعلية.</li>
              <li>تحديد أهداف المشروع والمحتوى العلمي.</li>
              <li>اختيار التصميم وتنظيم المشاهد.</li>
              <li>تجربة الأكواد ومراجعة النتائج.</li>
              <li>تطوير التجربة بما يناسب متطلبات المشروع.</li>
            </ul>

            <div class="highlight">
              الذكاء الاصطناعي أداة مساعدة،
              أما الفكرة والاختيارات النهائية
              ومراجعة المحتوى فهي من مسؤولية صاحبة المشروع.
            </div>

            <p>
              ملاحظة: المؤثرات الصوتية في هذا النموذج
              مولدة برمجيًا، ولا يتصل المشروع هنا
              بنموذج ذكاء اصطناعي مباشر.
            </p>
          `
        }

      }

    },


    en: {

      sound: "Sound",

      introEyebrow: "An interactive journey into the future",
      introTitle: "Are you ready<br><span>to discover the unknown?</span>",
      introDescription:
        "A journey into artificial intelligence, where questions become discoveries.",
      start: "Begin the journey",
      introCaption: "Discovery portal",

      roomEyebrow: "Welcome to the discovery universe",
      roomTitle: "Choose your portal",
      roomDescription:
        "Every object tells a story about artificial intelligence.",

      brainTitle: "The Smart Mind",
      brainSubtitle: "How does it learn?",

      artTitle: "Imagination Studio",
      artSubtitle: "How are images generated?",

      voiceTitle: "Voice Portal",
      voiceSubtitle: "How does it understand speech?",

      visionTitle: "Machine Vision",
      visionSubtitle: "How does it see images?",

      curiosityTitle: "Curiosity Spark",
      curiositySubtitle: "A surprising fact",

      labTitle: "Creative Lab",
      labSubtitle: "How did we build this?",

      roomHint: "Click an object to begin exploring",

      curiosityEyebrow: "A fact that sparked my curiosity",

      curiosityHeading:
        "From noise<br><span>to a surprising image!</span>",

      curiosityDescription:
        "How can random dots become a clear image?",

      stepOneTitle: "Random noise",
      stepOneDescription:
        "The model begins with a noisy pattern.",

      stepTwoTitle: "Denoising",
      stepTwoDescription:
        "The model gradually learns to remove noise.",

      stepThreeTitle: "A new image",
      stepThreeDescription:
        "An image matching the prompt is generated.",

      curiosityNote:
        "This process is a key idea in diffusion models.",

      replay: "Replay experiment",
      visitLab: "Visit the Creative Lab",

      labEyebrow: "Behind the experience",
      labHeading: "Creative <span>Lab</span>",
      labDescription:
        "How did creativity and technology come together?",

      toolLabel: "AI Tool",
      toolDescription:
        "An AI tool that assisted with brainstorming, content organization, and code suggestions.",

      contributionLabel: "My contribution",
      contributionHeading: "I am the creator",

      contributionOne:
        "Created the interactive-room concept.",

      contributionTwo:
        "Defined project goals and scientific content.",

      contributionThree:
        "Selected the design and organized the scenes.",

      contributionFour:
        "Tested the code and reviewed the results.",

      contributionFive:
        "Developed the experience to meet project requirements.",

      transparencyHeading:
        "Human + Artificial Intelligence",

      transparencyDescription:
        "The tool assisted with implementation and suggestions, while the creator remained responsible for the idea, final decisions, and content review.",

      sourcesLabel: "Scientific sources",

      challengeEyebrow: "Test your knowledge",
      challengeHeading: "Explorer <span>Challenge</span>",
      challengeDescription:
        "Are you now an AI explorer?",

      nextQuestion: "Next question",
      resultTitle: "Well done, explorer!",
      restart: "Restart challenge",

      footerText:
        "An interactive journey into artificial intelligence",

      discoveryLabel: "A new discovery",
      backToRoom: "Return to the room",

      soundOn: "Sound enabled",
      soundOff: "Sound disabled",

      correct: "Correct answer! Well done.",
      wrong: "Not quite. Try again.",
      score: "Your score",
      outOf: "out of",

      topics: {

        brain: {

          icon: "🧠",

          title: "The Smart Mind: How does AI learn?",

          body: `
            <p>
              Artificial intelligence (AI) is a field
              of computer science focused on systems
              that perform tasks typically associated
              with human abilities.
            </p>

            <p>
              <strong>How does it learn?</strong>
              Some AI systems learn patterns from data
              and examples, then use those patterns
              to generate predictions or responses.
            </p>

            <div class="highlight">
              Imagine showing a system thousands
              of cat and dog images. It may learn
              patterns that help distinguish them
              in new images.
            </div>

            <p>
              AI is not a human mind inside a device.
              Its abilities depend on its design,
              data, and task.
            </p>
          `
        },


        art: {

          icon: "🎨",

          title: "Imagination Studio: How are images generated?",

          body: `
            <p>
              Image-generation models can create
              new images from text prompts.
            </p>

            <p>
              One well-known approach is
              <strong>diffusion models.</strong>
            </p>

            <p>
              These models learn to handle noisy images
              during training. During generation,
              they often start with random noise
              and gradually remove it to create
              an image matching the prompt.
            </p>

            <div class="highlight">
              For example, “a futuristic city in the rain”
              guides the model to create an image
              aligned with the prompt.
            </div>

            <p>
              Results can be creative but may contain
              inaccuracies, so review them before use.
            </p>
          `
        },


        voice: {

          icon: "🎙️",

          title: "Voice Portal: How does AI process speech?",

          body: `
            <p>
              Speech-processing systems commonly
              involve several stages.
            </p>

            <ul>
              <li><strong>Capture:</strong> Record audio.</li>
              <li><strong>Recognition:</strong> Convert audio into text.</li>
              <li><strong>Understanding:</strong> Analyze meaning or intent.</li>
              <li><strong>Response:</strong> Generate a text or spoken reply.</li>
            </ul>

            <div class="highlight">
              Speech translation may combine speech
              recognition, text translation,
              and speech generation.
            </div>

            <p>
              Noise, accents, and unclear words
              can affect results.
            </p>
          `
        },


        vision: {

          icon: "👁️",

          title: "Machine Vision: Computer Vision",

          body: `
            <p>
              Computer vision helps computers analyze
              images and video to extract information.
            </p>

            <ul>
              <li>Object detection.</li>
              <li>Image classification.</li>
              <li>Reading text in images.</li>
              <li>Helping intelligent driving systems.</li>
            </ul>

            <div class="highlight">
              When a system recognizes a cat,
              it analyzes visual patterns learned
              from training data.
            </div>

            <p>
              Lighting, camera angle, image quality,
              and training data can affect performance.
            </p>
          `
        },


        curiosity: {

          icon: "💡",

          title: "A fact that sparked my curiosity!",

          body: `
            <p>
              Some image-generation models can begin
              with <strong>random noise</strong>
              and gradually transform it into
              a meaningful image.
            </p>

            <p>
              In diffusion models, a neural network
              learns to remove noise step by step
              until an image matching the prompt forms.
            </p>

            <div class="highlight">
              Imagine thousands of random dots
              gradually turning into a colorful scene!
            </div>

            <p>
              This describes one image-generation
              approach, not every AI technique.
            </p>
          `
        },


        lab: {

          icon: "🛠️",

          title: "Creative Lab: How did we build this?",

          body: `
            <p>
              <strong>ChatGPT</strong> was used
              as an assistant for brainstorming,
              organizing content, and suggesting code.
            </p>

            <p><strong>My contribution:</strong></p>

            <ul>
              <li>Created the interactive-room concept.</li>
              <li>Defined project goals and scientific content.</li>
              <li>Selected the design and organized scenes.</li>
              <li>Tested the code and reviewed results.</li>
              <li>Developed the experience to meet project requirements.</li>
            </ul>

            <div class="highlight">
              AI assisted with implementation.
              The creator remained responsible
              for the idea, decisions, and content review.
            </div>

            <p>
              Note: Sounds in this prototype
              are generated in code.
              It is not connected to a live AI model.
            </p>
          `
        }

      }

    }

  };


  /* =====================================
     الانتقال بين المشاهد
  ===================================== */

  function goToScene(index) {

    if (index < 0 || index >= scenes.length) return;

    if (index === currentScene) return;

    const previousScene = currentScene;

    scenes[previousScene].classList.remove("active");

    scenes[previousScene].classList.add(
      index > previousScene ? "exit-left" : "exit-right"
    );

    navDots[previousScene].classList.remove("active");

    currentScene = index;

    scenes[currentScene].classList.remove(
      "exit-left",
      "exit-right"
    );

    scenes[currentScene].classList.add("active");

    navDots[currentScene].classList.add("active");

    playTone(420, 0.07);

    if (currentScene === 2) {

      startParticleAnimation();

    }

  }


  navDots.forEach((dot) => {

    dot.addEventListener("click", () => {

      goToScene(Number(dot.dataset.scene));

    });

  });


  $("#startBtn").addEventListener("click", () => {

    goToScene(1);

  });


  $("#homeBtn").addEventListener("click", (event) => {

    event.preventDefault();

    goToScene(0);

  });


  $("#toLabBtn").addEventListener("click", () => {

    goToScene(3);

  });


  /* =====================================
     نافذة المعلومات
  ===================================== */

  function openTopic(topicKey) {

    const topic = translations[language].topics[topicKey];

    if (!topic) return;

    currentTopic = topicKey;

    modalIcon.textContent = topic.icon;

    modalTitle.textContent = topic.title;

    modalContent.innerHTML = topic.body;

    modalBackdrop.classList.add("open");

    modalBackdrop.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    playTone(650, 0.12);

    $("#modalClose").focus();

  }


  function closeModal() {

    modalBackdrop.classList.remove("open");

    modalBackdrop.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    playTone(380, 0.08);

  }


  $$(".room-object").forEach((object) => {

    object.addEventListener("click", () => {

      const topicKey = object.dataset.topic;

      if (topicKey === "curiosity") {

        goToScene(2);

        return;

      }

      if (topicKey === "lab") {

        goToScene(3);

        return;

      }

      openTopic(topicKey);

    });

  });


  $("#modalClose").addEventListener("click", closeModal);

  $("#modalBackBtn").addEventListener("click", closeModal);


  modalBackdrop.addEventListener("click", (event) => {

    if (event.target === modalBackdrop) {

      closeModal();

    }

  });


  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      modalBackdrop.classList.contains("open")
    ) {

      closeModal();

    }

  });


  /* =====================================
     الترجمة
  ===================================== */

  function applyLanguage() {

    const dictionary = translations[language];

    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";


    $$("[data-i18n]").forEach((element) => {

      const key = element.dataset.i18n;

      if (dictionary[key] !== undefined) {

        element.innerHTML = dictionary[key];

      }

    });


    $("#languageBtn").textContent =
      language === "ar" ? "EN" : "ع";


    $("#soundIcon").textContent =
      soundEnabled ? "♫" : "♩";


    $("#soundBtn").setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );


    updateQuizLanguage();


    if (
      modalBackdrop.classList.contains("open") &&
      currentTopic
    ) {

      const topic = dictionary.topics[currentTopic];

      modalIcon.textContent = topic.icon;

      modalTitle.textContent = topic.title;

      modalContent.innerHTML = topic.body;

    }

  }


  $("#languageBtn").addEventListener("click", () => {

    language = language === "ar" ? "en" : "ar";

    applyLanguage();

    playTone(580, 0.08);

  });


  /* =====================================
     الصوت
  ===================================== */

  function playTone(frequency = 520, duration = 0.1) {

    if (!soundEnabled) return;

    try {

      audioContext = audioContext ||
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();


      if (audioContext.state === "suspended") {

        audioContext.resume();

      }


      const oscillator = audioContext.createOscillator();

      const gain = audioContext.createGain();


      oscillator.type = "sine";

      oscillator.frequency.value = frequency;


      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
      );


      gain.gain.exponentialRampToValueAtTime(
        0.06,
        audioContext.currentTime + 0.02
      );


      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + duration
      );


      oscillator.connect(gain);

      gain.connect(audioContext.destination);


      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + duration + 0.02
      );

    } catch (error) {

      console.warn("Audio unavailable.", error);

    }

  }


  $("#soundBtn").addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    applyLanguage();

    showToast(
      translations[language][
        soundEnabled ? "soundOn" : "soundOff"
      ]
    );

    if (soundEnabled) {

      playTone(700, 0.12);

    }

  });


  /* =====================================
     رسائل قصيرة
  ===================================== */

  function showToast(message) {

    const toast = $("#toast");

    toast.textContent = message;

    toast.classList.add("show");

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {

      toast.classList.remove("show");

    }, 1800);

  }


  /* =====================================
     النجوم
  ===================================== */

  function createStars() {

    const starsContainer = $("#stars");

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {

      const star = document.createElement("span");

      star.className = "star";

      star.style.left = `${Math.random() * 100}%`;

      star.style.top = `${Math.random() * 100}%`;

      star.style.animationDelay =
        `${Math.random() * 4}s`;

      star.style.animationDuration =
        `${3 + Math.random() * 5}s`;

      fragment.appendChild(star);

    }

    starsContainer.appendChild(fragment);

  }


  /* =====================================
     تجربة الضوضاء والجسيمات
  ===================================== */

  function createParticles() {

    const stage = $("#particleStage");

    stage.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 180; i++) {

      const particle = document.createElement("span");

      particle.className = "particle";

      const startX = Math.random() * 100;

      const startY = Math.random() * 100;

      particle.dataset.startX = startX;

      particle.dataset.startY = startY;

      particle.style.left = `${startX}%`;

      particle.style.top = `${startY}%`;

      particle.style.opacity =
        Math.random() * 0.8 + 0.2;

      fragment.appendChild(particle);

    }

    stage.appendChild(fragment);

  }


  function startParticleAnimation() {

    createParticles();

    const particles = $$(".particle");

    particles.forEach((particle, index) => {

      const delay = index * 7;

      window.setTimeout(() => {

        const targetX = 50 + (Math.random() * 30 - 15);

        const targetY = 45 + (Math.random() * 25 - 12);


        const startX = Number(particle.dataset.startX);

        const startY = Number(particle.dataset.startY);


        particle.style.transform =
          `translate(
            ${(targetX - startX) * 3}px,
            ${(targetY - startY) * 3}px
          )`;


        particle.style.opacity = "0.9";

        particle.classList.add("settled");

      }, delay);

    });

  }


  $("#replayParticles").addEventListener("click", () => {

    startParticleAnimation();

    playTone(600, 0.1);

  });


  /* =====================================
     التحدي
  ===================================== */

  const quizQuestions = {

    ar: [

      {
        question:
          "ما التقنية التي تستطيع إنشاء الصور من الضوضاء؟",

        options: [
          "الشبكات التقليدية فقط",
          "نماذج الانتشار",
          "قواعد البيانات"
        ],

        answer: 1

      },

      {
        question:
          "ما المجال الذي يساعد الحاسوب على تحليل الصور؟",

        options: [
          "الرؤية الحاسوبية",
          "معالجة النصوص فقط",
          "قواعد البيانات"
        ],

        answer: 0

      },

      {
        question:
          "ما دور البيانات في تعلم الذكاء الاصطناعي؟",

        options: [
          "لا تؤثر على التعلم",
          "تساعد على تعلم الأنماط",
          "تمنع النظام من التنبؤ"
        ],

        answer: 1

      }

    ],


    en: [

      {
        question:
          "Which technique can generate images from noise?",

        options: [
          "Traditional networks only",
          "Diffusion models",
          "Databases"
        ],

        answer: 1

      },

      {
        question:
          "Which field helps computers analyze images?",

        options: [
          "Computer vision",
          "Text processing only",
          "Databases"
        ],

        answer: 0

      },

      {
        question:
          "What is the role of data in AI learning?",

        options: [
          "It has no effect",
          "It helps learn patterns",
          "It prevents prediction"
        ],

        answer: 1

      }

    ]

  };


  function renderQuestion() {

    const questions = quizQuestions[language];

    const question = questions[quizIndex];

    if (!question) return;

    answered = false;


    $("#questionCounter").textContent =
      `${String(quizIndex + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;


    $("#progressFill").style.width =
      `${((quizIndex + 1) / questions.length) * 100}%`;


    $("#questionText").textContent =
      question.question;


    $("#quizFeedback").textContent = "";


    $("#nextQuestion").disabled = true;

    $("#nextQuestion").style.display = "inline-flex";


    $("#quizResult").hidden = true;

    $("#quizOptions").style.display = "flex";

    $("#quizOptions").innerHTML = "";


    question.options.forEach((option, index) => {

      const button = document.createElement("button");

      button.type = "button";

      button.className = "quiz-option";

      button.textContent = option;

      button.dataset.answer = index;


      button.addEventListener("click", () => {

        checkAnswer(index);

      });


      $("#quizOptions").appendChild(button);

    });

  }


  function checkAnswer(selectedIndex) {

    if (answered) return;

    const question = quizQuestions[language][quizIndex];

    if (!question) return;

    answered = true;


    const options = $$(".quiz-option");

    options.forEach((option) => {

      option.disabled = true;

    });


    const correctIndex = question.answer;

    options[correctIndex].classList.add("correct");


    if (selectedIndex === correctIndex) {

      quizScore++;

      $("#quizFeedback").textContent =
        translations[language].correct;

      playTone(760, 0.12);

    } else {

      options[selectedIndex].classList.add("wrong");

      $("#quizFeedback").textContent =
        translations[language].wrong;

      playTone(280, 0.12);

    }


    $("#nextQuestion").disabled = false;


    const isLastQuestion =
      quizIndex === quizQuestions[language].length - 1;


    $("#nextQuestion").querySelector("[data-i18n]").textContent =
      translations[language][
        isLastQuestion ? "restart" : "nextQuestion"
      ];

  }


  function showQuizResult() {

    $("#quizOptions").style.display = "none";

    $("#nextQuestion").style.display = "none";

    $("#quizResult").hidden = false;


    const questions = quizQuestions[language];

    $("#resultScore").textContent =
      `${translations[language].score}: ${quizScore} ${translations[language].outOf} ${questions.length}`;


    $("#progressFill").style.width = "100%";

    playTone(850, 0.15);

  }


  $("#nextQuestion").addEventListener("click", () => {

    const questions = quizQuestions[language];


    if (quizIndex < questions.length - 1) {

      quizIndex++;

      renderQuestion();

    } else {

      showQuizResult();

    }

  });


  $("#restartQuiz").addEventListener("click", () => {

    quizIndex = 0;

    quizScore = 0;

    answered = false;

    renderQuestion();

  });


  function updateQuizLanguage() {

    if ($("#quizResult").hidden === false) {

      $("#questionText").textContent =
        translations[language].resultTitle;

      return;

    }

    renderQuestion();

  }


  /* =====================================
     بدء التجربة
  ===================================== */

  createStars();

  createParticles();

  applyLanguage();

  renderQuestion();

})();
