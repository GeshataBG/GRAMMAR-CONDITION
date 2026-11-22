/**
 * GRAMMAR CONDITION - Core Game Engine & Database (Fixed & Hardened)
 */

// 1. Списък с 60 поддържани езика
const SUPPORTED_LANGUAGES = [
  "English", "Bulgarian", "Spanish", "French", "German", "Italian", "Portuguese", 
  "Dutch", "Russian", "Ukrainian", "Polish", "Czech", "Slovak", "Romanian", 
  "Greek", "Turkish", "Arabic", "Hebrew", "Japanese", "Korean", "Chinese", 
  "Hindi", "Swedish", "Norwegian", "Danish", "Finnish", "Icelandic", "Hungarian", 
  "Croatian", "Serbian", "Slovenian", "Bosnian", "Albanian", "Macedonian", 
  "Estonian", "Latvian", "Lithuanian", "Irish", "Welsh", "Catalan", "Basque", 
  "Galician", "Thai", "Vietnamese", "Indonesian", "Malay", "Filipino", 
  "Persian", "Urdu", "Bengali", "Tamil", "Telugu", "Marathi", "Swahili", 
  "Afrikaans", "Amharic", "Georgian", "Armenian", "Kazakh", "Azerbaijani"
];

// Минимален брой въпроси според нивото (CEFR)
const LEVEL_REQUIREMENTS = {
  A1: 20,
  A2: 25,
  B1: 30,
  B2: 35,
  C1: 40,
  C2: 50
};

// 2. База данни с граматически въпроси
const QUESTION_BANK = {
  "English": {
    "English": {
      "A1": [
        {
          q: "Which sentence is grammatically correct?",
          options: ["Yesterday I eat cheese.", "Yesterday I ate cheese.", "Yesterday I eating cheese.", "Yesterday I eats cheese."],
          correct: 1,
          explanation: "Use the past simple form 'ate' because 'yesterday' indicates a completed action in the past."
        },
        {
          q: "Choose the correct article: 'She wants to buy ___ umbrella.'",
          options: ["a", "an", "the", "no article"],
          correct: 1,
          explanation: "Use 'an' before singular countable nouns starting with a vowel sound ('umbrella')."
        },
        {
          q: "Complete the sentence: 'They ___ from Spain.'",
          options: ["is", "am", "are", "be"],
          correct: 2,
          explanation: "The plural pronoun 'they' takes the verb form 'are' in the present simple."
        },
        {
          q: "Which question is correct?",
          options: ["Where you live?", "Where do you live?", "Where does you live?", "Where are you live?"],
          correct: 1,
          explanation: "Present simple questions with 'you' require the auxiliary verb 'do' before the subject."
        },
        {
          q: "Select the correct plural form: 'There are three ___ in the room.'",
          options: ["childs", "childrens", "children", "child"],
          correct: 2,
          explanation: "'Children' is the irregular plural form of the noun 'child'."
        }
      ],
      "B2": [
        {
          q: "Identify the correct passive transformation: 'Someone has stolen my bike.'",
          options: ["My bike was stolen.", "My bike has been stolen.", "My bike had been stolen.", "My bike is being stolen."],
          correct: 1,
          explanation: "Present perfect active ('has stolen') becomes present perfect passive ('has been stolen')."
        },
        {
          q: "Choose the correct third conditional form: 'If I ___ harder, I would have passed the exam.'",
          options: ["studied", "had studied", "would study", "have studied"],
          correct: 1,
          explanation: "The third conditional uses 'If + past perfect' ('had studied') to describe unreal past situations."
        }
      ],
      "C2": [
        {
          q: "Which sentence demonstrates correct inversion after a negative adverbial?",
          options: [
            "Scarcely had we arrived when it started to rain.",
            "Scarcely we had arrived when it started to rain.",
            "Scarcely had we arrived than it started to rain.",
            "Scarcely did we arrived when it started to rain."
          ],
          correct: 0,
          explanation: "'Scarcely' at the beginning of a clause triggers subject-auxiliary inversion ('had we') and pairs with 'when'."
        }
      ]
    }
  },
  "Bulgarian": {
    "English": {
      "A1": [
        {
          q: "Which Bulgarian sentence uses the correct definite article for a masculine noun as the grammatical subject?",
          options: [
            "Мъжът чете книга.",
            "Мъжа чете книга.",
            "Мъжът четат книга.",
            "Мъж чете книгата."
          ],
          correct: 0,
          explanation: "In Bulgarian, masculine singular nouns functioning as the grammatical subject take the full definite article '-ът' or '-ят' (Мъжът)."
        },
        {
          q: "Choose the correct form of the verb 'съм' (to be) for 'Ние' (We): 'Ние ___ студенти.'",
          options: ["съм", "си", "сте", "сме"],
          correct: 3,
          explanation: "The first-person plural ('ние') conjugation of 'съм' is 'сме'."
        },
        {
          q: "Which question particle is used to form a yes/no question in Bulgarian: 'Ти говориш ___ български?'",
          options: ["какво", "ли", "къде", "кой"],
          correct: 1,
          explanation: "The interrogative particle 'ли' is placed immediately after the verb to form standard yes/no questions."
        },
        {
          q: "Select the correct gender agreement: 'Това е ___ къща.' (This is a big house.)",
          options: ["голям", "голяма", "голямо", "големи"],
          correct: 1,
          explanation: "'Къща' (house) is a feminine noun, so the adjective must take the feminine ending '-а' (голяма)."
        }
      ]
    },
    "Bulgarian": {
      "A1": [
        {
          q: "Кое изречение е граматически правилно според правилото за пълен и кратък член?",
          options: [
            "Учителят влезе в класната стая.",
            "Учителя влезе в класната стая.",
            "Видях учителят в парка.",
            "Книгата е на ученикът."
          ],
          correct: 0,
          explanation: "Съществителното от мъжки род 'учителят' е подлог в изречението (кой влезе?), затова се пише с пълен член (-ят)."
        }
      ]
    }
  }
};

// 3. Състояние на играта
const gameState = {
  questionLang: "English",
  answerLang: "English",
  difficulty: "A1",
  questions: [],
  currentIndex: 0,
  score: 0,
  userAnswers: [],
  isAnswered: false
};

// Помощна функция за безопасно задаване на текст
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// 4. Инициализация при зареждане на DOM
document.addEventListener("DOMContentLoaded", () => {
  initLanguageDropdowns();
  initDifficultyButtons();
  bindNavigationEvents();
  loadSavedStats();
  validateDatabaseAvailability();
});

// 5. Навигация между екраните
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
    screen.style.display = "none";
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = "block";
    requestAnimationFrame(() => target.classList.add("active"));
  }
}

function bindNavigationEvents() {
  const events = [
    { id: "btn-play-now", handler: () => showScreen("setup-screen") },
    { id: "btn-start-quiz", handler: startQuiz },
    { id: "btn-next-question", handler: handleNextQuestion },
    { id: "btn-play-again", handler: startQuiz },
    { id: "btn-back-home", handler: () => showScreen("home-screen") }
  ];

  events.forEach(({ id, handler }) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", handler);
  });
}

// 6. Търсещи се падащи менюта за 60-те езика
function initLanguageDropdowns() {
  setupSearchableSelect("question-lang-input", "question-lang-list", "questionLang");
  setupSearchableSelect("answer-lang-input", "answer-lang-list", "answerLang");
}

function setupSearchableSelect(inputId, listId, stateKey) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  if (!input || !list) return;

  input.value = gameState[stateKey];

  function renderOptions(filter = "") {
    list.innerHTML = "";
    const normalizedFilter = filter.trim().toLowerCase();
    const filtered = SUPPORTED_LANGUAGES.filter(lang =>
      lang.toLowerCase().includes(normalizedFilter)
    );

    if (filtered.length === 0) {
      const emptyItem = document.createElement("div");
      emptyItem.className = "dropdown-item empty";
      emptyItem.textContent = "No language found";
      list.appendChild(emptyItem);
      return;
    }

    filtered.forEach(lang => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      if (lang === gameState[stateKey]) item.classList.add("selected");
      item.textContent = lang;

      item.addEventListener("mousedown", (e) => {
        e.preventDefault();
        gameState[stateKey] = lang;
        input.value = lang;
        list.classList.remove("open");
        validateDatabaseAvailability();
      });

      list.appendChild(item);
    });
  }

  input.addEventListener("focus", () => {
    renderOptions("");
    list.classList.add("open");
  });

  input.addEventListener("input", (e) => {
    renderOptions(e.target.value);
    list.classList.add("open");
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      input.value = gameState[stateKey];
      list.classList.remove("open");
    }, 150);
  });
}

// 7. Избор на ниво на трудност (A1 - C2)
function initDifficultyButtons() {
  const diffButtons = document.querySelectorAll(".difficulty-btn");
  diffButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      diffButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      gameState.difficulty = btn.dataset.level || "A1";
      validateDatabaseAvailability();
    });
  });
}

// Проверка за налична база данни
function validateDatabaseAvailability() {
  const statusBanner = document.getElementById("db-status-message");
  const startBtn = document.getElementById("btn-start-quiz");
  if (!statusBanner || !startBtn) return;

  const qBank = QUESTION_BANK[gameState.questionLang]?.[gameState.answerLang]?.[gameState.difficulty];
  const requiredCount = LEVEL_REQUIREMENTS[gameState.difficulty] || 20;

  if (!qBank || qBank.length === 0) {
    statusBanner.style.display = "block";
    statusBanner.className = "status-warning";
    statusBanner.innerHTML = `<strong>In Development:</strong> The verified grammar database for <em>${gameState.questionLang}</em> (with <em>${gameState.answerLang}</em> instructions) at level <strong>${gameState.difficulty}</strong> is still being developed.`;
    startBtn.disabled = true;
  } else if (qBank.length < requiredCount) {
    statusBanner.style.display = "block";
    statusBanner.className = "status-info";
    statusBanner.innerHTML = `<strong>Preview Mode:</strong> Currently ${qBank.length} of ${requiredCount} required questions are verified for ${gameState.questionLang} (${gameState.difficulty}).`;
    startBtn.disabled = false;
  } else {
    statusBanner.style.display = "none";
    startBtn.disabled = false;
  }
}

// 8. Разбъркване (Fisher-Yates) и стартиране на теста
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  const rawQuestions = QUESTION_BANK[gameState.questionLang]?.[gameState.answerLang]?.[gameState.difficulty];

  if (!rawQuestions || rawQuestions.length === 0) {
    validateDatabaseAvailability();
    return;
  }

  gameState.questions = shuffleArray(rawQuestions).map(item => {
    const indexedOptions = item.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === item.correct
    }));
    return {
      q: item.q,
      options: shuffleArray(indexedOptions),
      explanation: item.explanation
    };
  });

  gameState.currentIndex = 0;
  gameState.score = 0;
  gameState.userAnswers = [];
  gameState.isAnswered = false;

  showScreen("game-screen");
  renderQuestion();
}

// 9. Визуализация на текущия въпрос
function renderQuestion() {
  gameState.isAnswered = false;
  const currentQ = gameState.questions[gameState.currentIndex];
  if (!currentQ) return;

  const total = gameState.questions.length;
  const currentNum = gameState.currentIndex + 1;
  const progressPercent = Math.round(((currentNum - 1) / total) * 100);

  setText("question-counter", `Question ${currentNum} / ${total}`);
  setText("progress-percentage", `Progress: ${progressPercent}%`);
  setText("question-text", currentQ.q);

  const progressFill = document.getElementById("progress-bar-fill");
  if (progressFill) progressFill.style.width = `${progressPercent}%`;

  const feedbackBox = document.getElementById("feedback-container");
  if (feedbackBox) {
    feedbackBox.style.display = "none";
    feedbackBox.className = "feedback-box";
  }

  const nextBtn = document.getElementById("btn-next-question");
  if (nextBtn) nextBtn.style.display = "none";

  const optionsContainer = document.getElementById("options-container");
  if (!optionsContainer) return;

  optionsContainer.innerHTML = "";
  const labels = ["A", "B", "C", "D"];

  currentQ.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";

    const letterSpan = document.createElement("span");
    letterSpan.className = "option-letter";
    letterSpan.textContent = labels[index] || "";

    const textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = opt.text;

    btn.appendChild(letterSpan);
    btn.appendChild(textSpan);

    btn.addEventListener("click", () => handleAnswerSelection(btn, opt, currentQ));
    optionsContainer.appendChild(btn);
  });
}

// 10. Обработка на избран отговор
function handleAnswerSelection(selectedBtn, selectedOption, currentQ) {
  if (gameState.isAnswered) return;
  gameState.isAnswered = true;

  const allButtons = document.querySelectorAll("#options-container .option-btn");
  const feedbackBox = document.getElementById("feedback-container");
  const nextBtn = document.getElementById("btn-next-question");

  let correctText = "";
  currentQ.options.forEach((opt, idx) => {
    if (allButtons[idx]) {
      allButtons[idx].disabled = true;
      if (opt.isCorrect) {
        correctText = opt.text;
        allButtons[idx].classList.add("correct");
      }
    }
  });

  if (feedbackBox) {
    feedbackBox.innerHTML = "";
    const titleDiv = document.createElement("div");
    titleDiv.className = "feedback-title";

    const expP = document.createElement("p");
    expP.className = "feedback-explanation";

    if (selectedOption.isCorrect) {
      gameState.score++;
      feedbackBox.classList.add("feedback-correct");
      titleDiv.textContent = "Correct! Well done!";
      expP.textContent = currentQ.explanation;
    } else {
      selectedBtn.classList.add("incorrect");
      feedbackBox.classList.add("feedback-incorrect");
      titleDiv.textContent = "Incorrect";
      expP.textContent = `Grammar Rule: ${currentQ.explanation}`;
    }

    feedbackBox.appendChild(titleDiv);
    feedbackBox.appendChild(expP);
    feedbackBox.style.display = "block";
  } else if (selectedOption.isCorrect) {
    gameState.score++;
  }

  gameState.userAnswers.push({
    question: currentQ.q,
    selectedText: selectedOption.text,
    correctText: correctText,
    isCorrect: selectedOption.isCorrect,
    explanation: currentQ.explanation
  });

  const total = gameState.questions.length;
  const completedPercent = Math.round(((gameState.currentIndex + 1) / total) * 100);
  setText("progress-percentage", `Progress: ${completedPercent}%`);

  const progressFill = document.getElementById("progress-bar-fill");
  if (progressFill) progressFill.style.width = `${completedPercent}%`;

  if (nextBtn) {
    nextBtn.style.display = "inline-flex";
    nextBtn.textContent = (gameState.currentIndex + 1 === total) ? "VIEW RESULTS" : "NEXT QUESTION";
  }
}

function handleNextQuestion() {
  gameState.currentIndex++;
  if (gameState.currentIndex < gameState.questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// 11. Финален екран с резултати
function showResults() {
  showScreen("results-screen");

  const total = gameState.questions.length;
  const correctCount = gameState.score;
  const incorrectCount = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  setText("res-score", `${correctCount} / ${total}`);
  setText("res-correct", String(correctCount));
  setText("res-incorrect", String(incorrectCount));
  setText("res-accuracy", `${accuracy}%`);
  setText("res-total", String(total));
  setText("res-q-lang", gameState.questionLang);
  setText("res-a-lang", gameState.answerLang);
  setText("res-level", gameState.difficulty);

  const chartCircle = document.getElementById("accuracy-circle");
  setText("accuracy-circle-text", `${accuracy}%`);
  if (chartCircle) {
    chartCircle.style.background = `conic-gradient(#10b981 ${accuracy * 3.6}deg, #1e293b 0deg)`;
  }

  const reviewContainer = document.getElementById("question-review-list");
  if (reviewContainer) {
    reviewContainer.innerHTML = "";
    const mistakes = gameState.userAnswers.filter(ans => !ans.isCorrect);

    if (mistakes.length === 0) {
      const msg = document.createElement("div");
      msg.className = "perfect-score-msg";
      msg.textContent = "Flawless victory! You answered every question correctly.";
      reviewContainer.appendChild(msg);
    } else {
      mistakes.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "review-card";

        const qDiv = document.createElement("div");
        qDiv.className = "review-question";
        qDiv.textContent = `${idx + 1}. ${item.question}`;

        const userDiv = document.createElement("div");
        userDiv.className = "review-user-ans";
        userDiv.innerHTML = `Your Answer: <span class="text-red"></span>`;
        userDiv.querySelector("span").textContent = item.selectedText;

        const corrDiv = document.createElement("div");
        corrDiv.className = "review-correct-ans";
        corrDiv.innerHTML = `Correct Answer: <span class="text-green"></span>`;
        corrDiv.querySelector("span").textContent = item.correctText;

        const expDiv = document.createElement("div");
        expDiv.className = "review-explanation";
        expDiv.textContent = `Explanation: ${item.explanation}`;

        card.append(qDiv, userDiv, corrDiv, expDiv);
        reviewContainer.appendChild(card);
      });
    }
  }

  saveStatsToLocalStorage(accuracy, total);
}

// 12. Локално съхранение на статистиката
function saveStatsToLocalStorage(accuracy, questionsCount) {
  try {
    const history = JSON.parse(localStorage.getItem("grammarConditionStats")) || {
      quizzesPlayed: 0,
      totalQuestionsAnswered: 0,
      bestAccuracy: 0
    };

    history.quizzesPlayed += 1;
    history.totalQuestionsAnswered += questionsCount;
    if (accuracy > history.bestAccuracy) {
      history.bestAccuracy = accuracy;
    }

    localStorage.setItem("grammarConditionStats", JSON.stringify(history));
    loadSavedStats();
  } catch (e) {
    console.warn("LocalStorage is unavailable:", e);
  }
}

function loadSavedStats() {
  try {
    const saved = JSON.parse(localStorage.getItem("grammarConditionStats"));
    if (saved) {
      setText("home-user-stats", `Quizzes Played: ${saved.quizzesPlayed} | Best Accuracy: ${saved.bestAccuracy}%`);
    }
  } catch (e) {
    console.warn("Could not load stats:", e);
  }
}
