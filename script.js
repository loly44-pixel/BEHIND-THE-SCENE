
(() => {
  "use strict";

  const copy = {
    ar: {
      brand: "غرفة الذكاء الاصطناعي",
      sound: "الصوت",
      eyebrow: "مساحة تفاعلية للاستكشاف",
      headline: "أهلًا بكِ في<br><span>غرفة الذكاء الاصطناعي</span>",
      instruction: "انقري على العناصر المضيئة واكتشفي ما وراءها",
      portalLabel: "من الفضول تبدأ الحكاية",
      click: "اضغطي للاستكشاف",
      brainLabel: "العقل الذكي",
      artLabel: "مرسم الخيال",
      voiceLabel: "بوابة الصوت",
      visionLabel: "عين الآلة",
      factLabel: "شرارة فضول",
      projectLabel: "ورشة الإنجاز",
      footer: "تجربة تعليمية تفاعلية",
      discovery: "اكتشاف جديد",
      back: "العودة إلى الغرفة",
      soundOn: "تم تفعيل الصوت",
      soundOff: "تم إيقاف الصوت",

      topics: {
        brain: {
          icon: "🧠",
          title: "ما الذكاء الاصطناعي؟",
          body: `
            <p>الذكاء الاصطناعي (AI) هو مجال في علوم الحاسب يطوّر أنظمة تستطيع تنفيذ مهام تحتاج عادةً إلى قدرات بشرية، مثل فهم اللغة، والتعرّف على الصور، والتنبؤ، وحل المشكلات.</p>

            <p><strong>كيف يتعلم؟</strong> تتعلم بعض أنظمة الذكاء الاصطناعي الأنماط من أمثلة وبيانات، ثم تستخدم ما تعلمته لإنتاج توقع أو استجابة عند مواجهة مدخل جديد.</p>

            <div class="highlight">
              تخيّلي أنكِ تعرضين على النظام آلاف الأمثلة؛ بدل أن تكتبي له كل قاعدة يدويًا، قد يتعلم الأنماط التي تساعده على التعامل مع مثال جديد.
            </div>

            <p>الذكاء الاصطناعي ليس عقلًا بشريًا داخل جهاز؛ قدراته وحدوده تعتمد على تصميم النظام والبيانات والمهمة المطلوبة.</p>
          `
        },

        art: {
          icon: "🎨",
          title: "مرسم الخيال: كيف تُولّد الصور؟",
          body: `
            <p>يمكن لنماذج توليد الصور أن تنشئ صورة جديدة من وصف نصّي. ومن الطرق المعروفة <strong>نماذج الانتشار (Diffusion Models)</strong>.</p>

            <p>في التدريب، تتعلم هذه النماذج كيف تتعامل مع صور أضيفت إليها مستويات من التشويش. وعند التوليد، تبدأ غالبًا من ضوضاء عشوائية وتزيلها تدريجيًا لتكوين صورة تتوافق مع الوصف.</p>

            <div class="highlight">
              مثال: إذا كتبنا «مدينة مستقبلية تحت المطر»، يحاول النموذج إنشاء صورة تتوافق مع الكلمات والعلاقات التي تعلمها، وليس استرجاع صورة واحدة بالضرورة.
            </div>

            <p>النتيجة إبداعية، لكنها قد تحتوي تفاصيل غير دقيقة؛ لذلك من المهم مراجعة الصورة قبل استخدامها.</p>
          `
        },

        voice: {
          icon: "🎙️",
          title: "بوابة الصوت: كيف يفهم النظام كلامنا؟",
          body: `
            <p>تعمل أنظمة الصوت عادةً عبر مراحل، وقد تختلف التفاصيل حسب التقنية المستخدمة:</p>

            <ul>
              <li><strong>التقاط الصوت:</strong> تسجيل الموجة الصوتية.</li>
              <li><strong>التعرّف على الكلام:</strong> تحويل الصوت إلى كلمات مكتوبة.</li>
              <li><strong>فهم اللغة:</strong> تحليل معنى الطلب أو المقصود منه.</li>
              <li><strong>الاستجابة:</strong> إنشاء رد نصي أو صوتي.</li>
            </ul>

            <div class="highlight">
              ميزة الترجمة الصوتية قد تجمع بين التعرّف على الكلام والترجمة النصية ثم توليد الصوت باللغة الجديدة.
            </div>

            <p>قد يخطئ النظام مع الضوضاء أو اللهجات أو الكلمات غير الواضحة، لذا تبقى المراجعة البشرية مفيدة.</p>
          `
        },

        vision: {
          icon: "👁️",
          title: "عين الآلة: الرؤية الحاسوبية",
          body: `
            <p>الرؤية الحاسوبية (Computer Vision) تساعد الحاسوب على تحليل الصور أو الفيديو واستخراج معلومات منها.</p>

            <p>من تطبيقاتها: اكتشاف الأشياء، تصنيف الصور، قراءة النصوص داخل الصور، ومساعدة أنظمة القيادة على فهم الطريق.</p>

            <div class="highlight">
              عندما يتعرّف النظام على قطة في صورة، فهو لا «يراها» بالطريقة البشرية؛ بل يحلل أنماطًا وسمات بصرية تعلمها من بيانات التدريب.
            </div>

            <p>وقد يتأثر الأداء بالإضاءة، وزاوية التصوير، وجودة الصورة، ومدى تمثيل بيانات التدريب للحالات المختلفة.</p>
          `
        },

        fact: {
          icon: "💡",
          title: "معلومة تثير الفضول",
          body: `
            <p>بعض نماذج توليد الصور تستطيع البدء من <strong>ضوضاء عشوائية</strong> ثم تحويلها تدريجيًا إلى صورة مفهومة عبر خطوات متتابعة.</p>

            <p>هذا يعني أن الصورة النهائية لا تكون مخزّنة مسبقًا كملف جاهز ينتظر العثور عليه؛ بل تُنشأ أثناء عملية التوليد وفق ما تعلمه النموذج وما يطلبه الوصف.</p>

            <div class="highlight">
              السؤال المثير: كيف تتحول نقاط تبدو عشوائية إلى مشهد له أشخاص وألوان وأماكن؟ هنا تظهر قوة النماذج التي تتعلم الأنماط من كميات كبيرة من البيانات.
            </div>

            <p>هذه الفكرة وصف مبسّط لنماذج الانتشار، وليست وصفًا لكل تقنيات الذكاء الاصطناعي.</p>
          `
        },

        project: {
          icon: "🛠️",
          title: "ورشة الإنجاز: دوري ودور أدوات الذكاء الاصطناعي",
          body: `
            <p>استخدمت أدوات الذكاء الاصطناعي كمساعد في <strong>توليد الأفكار، وتنظيم المحتوى، واقتراح الكود، ومراجعة الصياغة</strong> خلال بناء التجربة.</p>

            <p><strong>دوري أنا:</strong></p>

            <ul>
              <li>اختيار فكرة الغرفة التفاعلية وتحديد شكل التجربة.</li>
              <li>اختيار المعلومات التي تظهر في كل ركن وترتيبها.</li>
              <li>تجربة التفاعلات والترجمة والأصوات ومراجعة النتيجة.</li>
              <li>تعديل التصميم والكود بما يناسب متطلبات المشروع.</li>
            </ul>

            <div class="highlight">
              الأداة تساعد في التنفيذ، لكن اختيار الفكرة، وتحديد الهدف، والتحقق من المحتوى، واتخاذ القرارات النهائية مسؤولية صاحبة المشروع.
            </div>

            <p><strong>ملاحظة شفافية:</strong> هذه الصفحة تعرض نموذجًا تعليميًا تفاعليًا؛ أصوات النقر نغمات مولّدة برمجيًا، ولا يتصل المشروع هنا بنموذج ذكاء اصطناعي مباشر.</p>
          `
        }
      }
    },

    en: {
      brand: "AI Room",
      sound: "Sound",
      eyebrow: "An interactive space to explore",
      headline: "Welcome to the<br><span>Artificial Intelligence Room</span>",
      instruction: "Click the glowing objects to discover what’s behind them",
      portalLabel: "Curiosity starts the story",
      click: "Click to explore",
      brainLabel: "The Smart Mind",
      artLabel: "Imagination Studio",
      voiceLabel: "Voice Portal",
      visionLabel: "Machine Vision",
      factLabel: "Curiosity Spark",
      projectLabel: "The Workshop",
      footer: "An interactive learning experience",
      discovery: "A new discovery",
      back: "Return to the room",
      soundOn: "Sound enabled",
      soundOff: "Sound disabled",

      topics: {
        brain: {
          icon: "🧠",
          title: "What is Artificial Intelligence?",
          body: `
            <p>Artificial intelligence (AI) is a field of computer science focused on systems that perform tasks typically associated with human abilities, such as language understanding, image recognition, prediction, and problem-solving.</p>

            <p><strong>How does it learn?</strong> Some AI systems learn patterns from examples and data, then use those patterns to produce a prediction or response to new input.</p>

            <div class="highlight">
              Imagine showing a system thousands of examples. Instead of manually writing every rule, it may learn patterns that help it handle a new example.
            </div>

            <p>AI is not a human mind inside a device. Its abilities and limits depend on its design, data, and task.</p>
          `
        },

        art: {
          icon: "🎨",
          title: "Imagination Studio: How are images generated?",
          body: `
            <p>Image-generation models can create new images from text prompts. One well-known approach is <strong>diffusion models</strong>.</p>

            <p>During training, models learn from images with different levels of noise. During generation, they often start with random noise and gradually remove it to form an image matching the prompt.</p>

            <div class="highlight">
              For example, “a futuristic city in the rain” guides the model to create an image aligned with the prompt—not necessarily retrieve one specific image.
            </div>

            <p>Results can be creative but may contain inaccuracies, so review them before use.</p>
          `
        },

        voice: {
          icon: "🎙️",
          title: "Voice Portal: How does AI process speech?",
          body: `
            <p>Speech systems commonly involve several stages, which vary by technology:</p>

            <ul>
              <li><strong>Capture:</strong> Record the audio wave.</li>
              <li><strong>Speech recognition:</strong> Convert audio into text.</li>
              <li><strong>Language understanding:</strong> Analyze the meaning or intent.</li>
              <li><strong>Response:</strong> Produce a text or spoken reply.</li>
            </ul>

            <div class="highlight">
              Speech translation may combine speech recognition, text translation, and speech generation in another language.
            </div>

            <p>Noise, accents, and unclear words can affect results, so human review remains useful.</p>
          `
        },

        vision: {
          icon: "👁️",
          title: "Machine Vision: Computer Vision",
          body: `
            <p>Computer vision helps computers analyze images or video and extract information.</p>

            <p>Applications include object detection, image classification, reading text in images, and helping driving systems interpret roads.</p>

            <div class="highlight">
              When a system recognizes a cat, it does not “see” as a human does; it analyzes visual patterns learned from training data.
            </div>

            <p>Lighting, camera angle, image quality, and training-data coverage can affect performance.</p>
          `
        },

        fact: {
          icon: "💡",
          title: "A curiosity-sparking fact",
          body: `
            <p>Some image-generation models can begin with <strong>random noise</strong> and gradually transform it into a meaningful image through successive steps.</p>

            <p>The final image is not necessarily a pre-stored file waiting to be found; it is generated according to what the model learned and the prompt.</p>

            <div class="highlight">
              The fascinating question: how can seemingly random dots become a scene with people, colors, and places? This is where pattern-learning models show their power.
            </div>

            <p>This is a simplified description of diffusion models, not every AI technique.</p>
          `
        },

        project: {
          icon: "🛠️",
          title: "The Workshop: My role and AI tools",
          body: `
            <p>I used AI tools as assistants for <strong>brainstorming, organizing content, suggesting code, and reviewing wording</strong> while building this experience.</p>

            <p><strong>My role:</strong></p>

            <ul>
              <li>Choosing the interactive-room idea and defining the experience.</li>
              <li>Selecting and organizing the information in each room corner.</li>
              <li>Testing interactions, translation, sounds, and reviewing the result.</li>
              <li>Adjusting the design and code to fit the project requirements.</li>
            </ul>

            <div class="highlight">
              Tools can assist with implementation, but the project creator is responsible for the idea, goals, content checks, and final decisions.
            </div>

            <p><strong>Transparency:</strong> This is an interactive educational prototype. Click sounds are generated in code; the project is not connected to a live AI model.</p>
          `
        }
      }
    }
  };

  const $ = (selector) => document.querySelector(selector);

  const backdrop = $("#modalBackdrop");
  const modalTitle = $("#modalTitle");
  const modalBody = $("#modalBody");
  const modalSymbol = $("#modalSymbol");
  const soundToggle = $("#soundToggle");
  const langToggle = $("#langToggle");
  const modalClose = $("#modalClose");
  const modalDone = $("#modalDone");

  let language = "ar";
  let soundEnabled = false;
  let audioContext = null;
  let currentTopic = null;

  function applyLanguage() {
    const dict = copy[language];

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;

      if (dict[key] !== undefined) {
        node.innerHTML = dict[key];
      }
    });

    langToggle.textContent = language === "ar" ? "EN" : "ع";
    soundToggle.setAttribute("aria-pressed", String(soundEnabled));
    $("#soundIcon").textContent = soundEnabled ? "♫" : "♩";
  }

  function playTone(frequency = 520, duration = 0.09) {
    if (!soundEnabled) return;

    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.07,
        audioContext.currentTime + 0.015
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration + 0.02);
    } catch (error) {
      console.warn("Audio is unavailable in this browser.", error);
    }
  }

  function openTopic(topicKey) {
    const topic = copy[language].topics[topicKey];

    if (!topic) return;

    currentTopic = topicKey;

    modalSymbol.textContent = topic.icon;
    modalTitle.textContent = topic.title;
    modalBody.innerHTML = topic.body;

    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    playTone(650, 0.12);
    modalClose.focus();
  }

  function closeModal() {
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    playTone(390, 0.07);
  }

  document.querySelectorAll(".room-object").forEach((object) => {
    object.addEventListener("click", () => {
      openTopic(object.dataset.topic);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalDone.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && backdrop.classList.contains("open")) {
      closeModal();
    }
  });

  langToggle.addEventListener("click", () => {
    language = language === "ar" ? "en" : "ar";

    applyLanguage();

    if (backdrop.classList.contains("open") && currentTopic) {
      const topic = copy[language].topics[currentTopic];

      modalSymbol.textContent = topic.icon;
      modalTitle.textContent = topic.title;
      modalBody.innerHTML = topic.body;
    }

    playTone(580, 0.08);
  });

  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    applyLanguage();

    const toast = $("#toast");

    toast.textContent = copy[language][
      soundEnabled ? "soundOn" : "soundOff"
    ];

    toast.classList.add("show");

    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);

    if (soundEnabled) {
      playTone(720, 0.13);
    }
  });

  applyLanguage();
})();
