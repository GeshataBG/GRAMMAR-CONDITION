/*
 GRAMMAR CONDITION — app.js
 Database contract:
 QUESTION_BANK[grammarLanguage][explanationLanguage][CEFR level] = exactly 25 items.
 Each item: { q, options: [4 strings], correct: 0..3, explanation }
 Only fully populated packs are playable. Missing packs are never filled with fake/template questions.
*/
"use strict";

const SUPPORTED_LANGUAGES = [
  "English","Bulgarian","Spanish","French","German","Italian","Portuguese",
  "Dutch","Russian","Ukrainian","Polish","Czech","Slovak","Romanian",
  "Greek","Turkish","Arabic","Hebrew","Japanese","Korean","Chinese",
  "Hindi","Swedish","Norwegian","Danish","Finnish","Icelandic","Hungarian",
  "Croatian","Serbian","Slovenian","Bosnian","Albanian","Macedonian",
  "Estonian","Latvian","Lithuanian","Irish","Welsh","Catalan","Basque",
  "Galician","Thai","Vietnamese","Indonesian","Malay","Filipino",
  "Persian","Urdu","Bengali","Tamil","Telugu","Marathi","Swahili",
  "Afrikaans","Amharic","Georgian","Armenian","Kazakh","Azerbaijani"
];
const LEVELS = ["A1","A2","B1","B2","C1","C2"];
const QUESTIONS_PER_LEVEL = 25;

// Starter content supplied with this project: English A1 and Bulgarian A1,
// both with English-language explanations. Add further verified packs below.
const QUESTION_BANK = {
  English: {
    English: {
      A1: [
      { q: "Choose the correct form: She ___ a student.", options: ["am", "is", "are", "be"], correct: 1, explanation: "Use 'is' with he, she and it." },
      { q: "Complete: They ___ from Italy.", options: ["is", "am", "are", "be"], correct: 2, explanation: "Use 'are' with the subject 'they'." },
      { q: "Choose the correct article: ___ apple.", options: ["a", "an", "the", "no article"], correct: 1, explanation: "Use 'an' before a vowel sound." },
      { q: "Choose the plural of 'child'.", options: ["childs", "childes", "children", "childrens"], correct: 2, explanation: "'Children' is the irregular plural." },
      { q: "Complete: I ___ coffee every morning.", options: ["drink", "drinks", "drinking", "drank"], correct: 0, explanation: "Use the base verb with 'I' in the present simple." },
      { q: "Choose the correct sentence.", options: ["He don't like tea.", "He doesn't likes tea.", "He doesn't like tea.", "He not like tea."], correct: 2, explanation: "Use doesn't + base verb with he/she/it." },
      { q: "Complete: ___ you speak English?", options: ["Does", "Are", "Do", "Is"], correct: 2, explanation: "Use 'do' to form present simple questions with 'you'." },
      { q: "Choose the correct possessive: This is ___ book.", options: ["I", "me", "my", "mine's"], correct: 2, explanation: "Use 'my' before a noun." },
      { q: "Complete: There ___ two chairs in the room.", options: ["is", "are", "am", "be"], correct: 1, explanation: "Use 'are' with plural nouns." },
      { q: "Choose the correct preposition: The cat is ___ the table.", options: ["on", "at", "to", "from"], correct: 0, explanation: "Use 'on' for something resting on a surface." },
      { q: "Complete: Yesterday, we ___ to the park.", options: ["go", "goes", "went", "going"], correct: 2, explanation: "'Went' is the past simple of 'go'." },
      { q: "Choose the correct form: She can ___ very well.", options: ["swims", "swimming", "swim", "to swim"], correct: 2, explanation: "A modal verb is followed by the base form." },
      { q: "Choose the correct question.", options: ["What time it is?", "What time is it?", "What is time it?", "What time does it?"], correct: 1, explanation: "In this question, place 'is' before the subject 'it'." },
      { q: "Complete: My brother is ___ than me.", options: ["tall", "taller", "tallest", "more tall"], correct: 1, explanation: "Use the -er comparative form of 'tall'." },
      { q: "Choose the correct pronoun: Anna is my friend. ___ is kind.", options: ["He", "It", "They", "She"], correct: 3, explanation: "Use 'she' for a female person." },
      { q: "Complete: We ___ watching TV now.", options: ["am", "is", "are", "be"], correct: 2, explanation: "Present continuous uses are + verb-ing with 'we'." },
      { q: "Choose the correct negative: I ___ have a car.", options: ["doesn't", "don't", "isn't", "aren't"], correct: 1, explanation: "Use don't with 'I' in the present simple." },
      { q: "Complete: This is ___ orange.", options: ["a", "an", "some", "any"], correct: 1, explanation: "Use 'an' before the vowel sound in 'orange'." },
      { q: "Choose the correct sentence.", options: ["There is a book on the desk.", "There are a book on the desk.", "There be a book on desk.", "There am a book on the desk."], correct: 0, explanation: "Use 'there is' with a singular noun." },
      { q: "Complete: How ___ water do you need?", options: ["many", "much", "few", "several"], correct: 1, explanation: "Use 'much' with uncountable nouns such as water." },
      { q: "Choose the past form of 'have'.", options: ["haved", "has", "had", "having"], correct: 2, explanation: "The past simple of 'have' is 'had'." },
      { q: "Complete: I get up ___ seven o'clock.", options: ["in", "on", "at", "to"], correct: 2, explanation: "Use 'at' with clock times." },
      { q: "Choose the correct form: He ___ playing football.", options: ["like", "likes", "liking", "liked"], correct: 1, explanation: "Add -s to the present simple verb with he/she/it." },
      { q: "Complete: These ___ my keys.", options: ["is", "am", "are", "be"], correct: 2, explanation: "Use 'are' with the plural demonstrative 'these'." },
      { q: "Choose the correct sentence.", options: ["I have 15 years old.", "I am 15 years old.", "I has 15 years old.", "I be 15 years old."], correct: 1, explanation: "Use the verb 'be' to state age in English." }
    ]
    }
  },
  Bulgarian: {
    English: {
      A1: [
      { q: "Избери правилната форма: Аз ___ ученик.", options: ["съм", "си", "е", "са"], correct: 0, explanation: "С местоимението „аз“ се използва формата „съм“." },
      { q: "Попълни: Тя ___ книга.", options: ["чета", "четеш", "чете", "четат"], correct: 2, explanation: "При „тя“ глаголът е във форма за 3 л., ед. ч." },
      { q: "Коя дума е съществително име?", options: ["тичам", "красив", "маса", "бързо"], correct: 2, explanation: "„Маса“ назовава предмет и е съществително име." },
      { q: "Избери множественото число на „молив“.", options: ["моливи", "молива", "моливът", "моливе"], correct: 0, explanation: "Правилната форма за множествено число е „моливи“." },
      { q: "Попълни: Ние ___ в България.", options: ["живея", "живееш", "живее", "живеем"], correct: 3, explanation: "С „ние“ се използва форма за 1 л., мн. ч." },
      { q: "Кое изречение е правилно?", options: ["Аз имам куче.", "Аз има куче.", "Аз имаш куче.", "Аз имат куче."], correct: 0, explanation: "С „аз“ правилната форма е „имам“." },
      { q: "Избери правилния членуван подлог: ___ чете.", options: ["Ученика", "Ученикът", "Ученико", "Ученик"], correct: 1, explanation: "Пълен член -ът се използва при подлог от мъжки род, ед. ч." },
      { q: "Попълни: Вчера ние ___ на кино.", options: ["отиваме", "отидохме", "отивам", "отиде"], correct: 1, explanation: "„Отидохме“ е форма за минало свършено време, 1 л. мн. ч." },
      { q: "Коя дума е прилагателно име?", options: ["пиша", "син", "вчера", "под"], correct: 1, explanation: "„Син“ назовава признак на предмет." },
      { q: "Попълни: Децата ___ в парка.", options: ["играе", "играя", "играят", "играеш"], correct: 2, explanation: "Съществителното „децата“ изисква форма за 3 л. мн. ч." },
      { q: "Избери правилното местоимение: Мария е тук. ___ е готова.", options: ["Той", "Тя", "То", "Те"], correct: 1, explanation: "„Тя“ замества съществително име от женски род, ед. ч." },
      { q: "Коя форма е правилна?", options: ["по-хубав", "по хубав", "по-хубаво", "най хубав"], correct: 0, explanation: "Сравнителната степен се образува с „по-“ и дефис." },
      { q: "Попълни: Книгата е ___ масата.", options: ["на", "със", "от", "до"], correct: 0, explanation: "Предлогът „на“ показва местоположение върху повърхност." },
      { q: "Избери правилната форма: Две ___ стоят на масата.", options: ["чаша", "чаши", "чашата", "чашѝ"], correct: 1, explanation: "След числителното две се използва бройна форма „чаши“." },
      { q: "Коя дума е глагол?", options: ["светъл", "песен", "пиша", "високо"], correct: 2, explanation: "„Пиша“ назовава действие и е глагол." },
      { q: "Попълни: Ти ___ ли български?", options: ["говоря", "говориш", "говори", "говорим"], correct: 1, explanation: "С „ти“ се използва форма за 2 л., ед. ч." },
      { q: "Кое изречение е въпросително?", options: ["Днес е слънчево.", "Къде живееш?", "Обичам музика.", "Ела тук."], correct: 1, explanation: "Въпросителното изречение задава въпрос и завършва с въпросителен знак." },
      { q: "Попълни: Аз ___ закуска всяка сутрин.", options: ["закусвам", "закусваш", "закусва", "закусват"], correct: 0, explanation: "С „аз“ глаголът е във форма за 1 л., ед. ч." },
      { q: "Избери правилната форма за минало време: Той ___ вчера.", options: ["работи", "работих", "работеше", "работиха"], correct: 2, explanation: "„Работеше“ е форма за минало несвършено време, 3 л., ед. ч." },
      { q: "Коя дума е наречие?", options: ["бързо", "бърз", "бързина", "бързам"], correct: 0, explanation: "„Бързо“ пояснява действие и е наречие." },
      { q: "Попълни: Това са ___ приятели.", options: ["мой", "моя", "моите", "моето"], correct: 2, explanation: "„Приятели“ е в множествено число, затова използваме „моите“." },
      { q: "Избери правилния предлог: Отивам ___ училище.", options: ["в", "със", "от", "под"], correct: 0, explanation: "В този контекст правилният предлог е „в“." },
      { q: "Кое е правилното отрицание?", options: ["Аз не знам.", "Аз незнам.", "Аз ни знам.", "Аз не-знам."], correct: 0, explanation: "Частицата „не“ с глагол се пише отделно." },
      { q: "Попълни: Момичето ___ красиво.", options: ["съм", "си", "е", "са"], correct: 2, explanation: "Със „то/момичето“ се използва „е“." },
      { q: "Избери правилното изречение.", options: ["Те учи български.", "Те учат български.", "Те учиш български.", "Те учим български."], correct: 1, explanation: "С „те“ се използва форма за 3 л., мн. ч." }
    ]
    }
  }
};


// English A2-C2: five complete grammar packs, 25 questions per level.
const EXTRA_QUESTION_BANK = {
  "English": {
    "English": {
      "A2": [
        {
          "q": "I ___ here since 2022.",
          "options": [
            "live",
            "lived",
            "have lived",
            "am living"
          ],
          "correct": 2,
          "explanation": "Use the present perfect with 'since' for a situation that continues now."
        },
        {
          "q": "If it ___ tomorrow, we will stay home.",
          "options": [
            "rains",
            "will rain",
            "rained",
            "raining"
          ],
          "correct": 0,
          "explanation": "Use present simple in the if-clause of the first conditional."
        },
        {
          "q": "There isn't ___ milk left.",
          "options": [
            "many",
            "much",
            "a few",
            "several"
          ],
          "correct": 1,
          "explanation": "Use 'much' with uncountable nouns."
        },
        {
          "q": "She is interested ___ learning Japanese.",
          "options": [
            "on",
            "at",
            "in",
            "for"
          ],
          "correct": 2,
          "explanation": "'Interested' is followed by 'in'."
        },
        {
          "q": "We ___ dinner when the phone rang.",
          "options": [
            "had",
            "were having",
            "have had",
            "are having"
          ],
          "correct": 1,
          "explanation": "Past continuous describes an action in progress when another event happened."
        },
        {
          "q": "This is the ___ film I've ever seen.",
          "options": [
            "better",
            "best",
            "good",
            "well"
          ],
          "correct": 1,
          "explanation": "Use the superlative 'best'."
        },
        {
          "q": "You ___ wear a seat belt; it's the law.",
          "options": [
            "might",
            "must",
            "could",
            "would"
          ],
          "correct": 1,
          "explanation": "'Must' expresses strong obligation."
        },
        {
          "q": "He asked me where I ___.",
          "options": [
            "live",
            "did I live",
            "lived",
            "do I live"
          ],
          "correct": 2,
          "explanation": "Reported questions use statement word order and often backshift."
        },
        {
          "q": "I haven't finished my homework ___.",
          "options": [
            "already",
            "yet",
            "still",
            "ever"
          ],
          "correct": 1,
          "explanation": "Use 'yet' in negative sentences about something expected."
        },
        {
          "q": "The museum ___ by thousands of people every year.",
          "options": [
            "visits",
            "is visited",
            "visited",
            "is visiting"
          ],
          "correct": 1,
          "explanation": "Present simple passive: be + past participle."
        },
        {
          "q": "You look tired. You ___ take a break.",
          "options": [
            "should",
            "mustn't",
            "can't",
            "would"
          ],
          "correct": 0,
          "explanation": "'Should' is used to give advice."
        },
        {
          "q": "We have lived here ___ five years.",
          "options": [
            "since",
            "during",
            "for",
            "from"
          ],
          "correct": 2,
          "explanation": "Use 'for' with a period of time."
        },
        {
          "q": "I prefer tea ___ coffee.",
          "options": [
            "than",
            "from",
            "to",
            "over"
          ],
          "correct": 2,
          "explanation": "The pattern is 'prefer A to B'."
        },
        {
          "q": "She speaks English ___ than her brother.",
          "options": [
            "fluent",
            "more fluently",
            "most fluent",
            "fluenter"
          ],
          "correct": 1,
          "explanation": "Use 'more' to form the comparative of 'fluently'."
        },
        {
          "q": "There are ___ people at the bus stop today.",
          "options": [
            "less",
            "fewer",
            "little",
            "much"
          ],
          "correct": 1,
          "explanation": "Use 'fewer' with countable plural nouns."
        },
        {
          "q": "I don't know ___ to solve this problem.",
          "options": [
            "what",
            "which",
            "how",
            "where"
          ],
          "correct": 2,
          "explanation": "Use 'how to' before an infinitive to describe a method."
        },
        {
          "q": "The train had left ___ we arrived.",
          "options": [
            "before",
            "while",
            "until",
            "during"
          ],
          "correct": 0,
          "explanation": "'Before' shows which past event happened earlier."
        },
        {
          "q": "Would you mind ___ the window?",
          "options": [
            "open",
            "to open",
            "opening",
            "opened"
          ],
          "correct": 2,
          "explanation": "'Would you mind' is followed by a gerund."
        },
        {
          "q": "This bag is ___ heavy for me to carry.",
          "options": [
            "enough",
            "too",
            "so much",
            "such"
          ],
          "correct": 1,
          "explanation": "Use 'too + adjective + to-infinitive' for excess."
        },
        {
          "q": "I have never ___ sushi.",
          "options": [
            "eat",
            "eating",
            "ate",
            "eaten"
          ],
          "correct": 3,
          "explanation": "Present perfect uses have/has + past participle."
        },
        {
          "q": "Let's ___ a taxi; we're late.",
          "options": [
            "take",
            "taking",
            "to take",
            "took"
          ],
          "correct": 0,
          "explanation": "After 'let's', use the base verb."
        },
        {
          "q": "He isn't as tall ___ his father.",
          "options": [
            "than",
            "like",
            "as",
            "from"
          ],
          "correct": 2,
          "explanation": "The equality comparison is 'as ... as'."
        },
        {
          "q": "I need ___ information about the course.",
          "options": [
            "an",
            "many",
            "some",
            "a few"
          ],
          "correct": 2,
          "explanation": "'Information' is uncountable."
        },
        {
          "q": "The children were excited ___ the trip.",
          "options": [
            "about",
            "for",
            "with",
            "at"
          ],
          "correct": 0,
          "explanation": "'Excited' is commonly followed by 'about'."
        },
        {
          "q": "If I have time, I ___ you later.",
          "options": [
            "called",
            "call",
            "will call",
            "would call"
          ],
          "correct": 2,
          "explanation": "The first conditional uses 'will' in the result clause."
        }
      ],
      "B1": [
        {
          "q": "By the time we arrived, the concert ___.",
          "options": [
            "started",
            "has started",
            "had started",
            "was starting"
          ],
          "correct": 2,
          "explanation": "Past perfect describes an event completed before another past event."
        },
        {
          "q": "If I ___ more free time, I'd learn another language.",
          "options": [
            "have",
            "had",
            "will have",
            "would have"
          ],
          "correct": 1,
          "explanation": "The second conditional uses past simple in the if-clause."
        },
        {
          "q": "She suggested ___ the meeting until Friday.",
          "options": [
            "postpone",
            "to postpone",
            "postponing",
            "postponed"
          ],
          "correct": 2,
          "explanation": "'Suggest' is followed by a gerund or a that-clause."
        },
        {
          "q": "The new bridge ___ next year.",
          "options": [
            "will complete",
            "will be completed",
            "completes",
            "has completed"
          ],
          "correct": 1,
          "explanation": "Future passive: will be + past participle."
        },
        {
          "q": "I wish I ___ how to play the piano.",
          "options": [
            "know",
            "knew",
            "have known",
            "will know"
          ],
          "correct": 1,
          "explanation": "Use 'wish + past simple' for an unreal present situation."
        },
        {
          "q": "Despite ___ tired, he finished the report.",
          "options": [
            "be",
            "being",
            "was",
            "to be"
          ],
          "correct": 1,
          "explanation": "'Despite' is followed by a noun or gerund."
        },
        {
          "q": "Neither the teacher nor the students ___ ready.",
          "options": [
            "was",
            "is",
            "were",
            "has been"
          ],
          "correct": 2,
          "explanation": "The verb agrees with the nearer subject, 'students'."
        },
        {
          "q": "You needn't ___ all the food; there is plenty.",
          "options": [
            "buy",
            "to buy",
            "buying",
            "bought"
          ],
          "correct": 0,
          "explanation": "'Needn't' is followed by the base verb."
        },
        {
          "q": "She denied ___ the confidential email.",
          "options": [
            "send",
            "to send",
            "sending",
            "sent"
          ],
          "correct": 2,
          "explanation": "'Deny' is followed by a gerund."
        },
        {
          "q": "The man ___ lives next door is a surgeon.",
          "options": [
            "which",
            "whose",
            "who",
            "where"
          ],
          "correct": 2,
          "explanation": "Use 'who' for people in a subject relative clause."
        },
        {
          "q": "I would rather you ___ me the truth.",
          "options": [
            "tell",
            "told",
            "will tell",
            "to tell"
          ],
          "correct": 1,
          "explanation": "'Would rather + subject' takes a past form for a present preference."
        },
        {
          "q": "Hardly ___ the house when it began to snow.",
          "options": [
            "we had left",
            "had we left",
            "we left",
            "did we leave"
          ],
          "correct": 1,
          "explanation": "Fronted 'hardly' requires subject-auxiliary inversion."
        },
        {
          "q": "The test was ___ difficult that many students needed extra time.",
          "options": [
            "such",
            "so",
            "too",
            "enough"
          ],
          "correct": 1,
          "explanation": "Use 'so + adjective + that-clause'."
        },
        {
          "q": "He accused her ___ lying.",
          "options": [
            "for",
            "with",
            "of",
            "about"
          ],
          "correct": 2,
          "explanation": "The pattern is 'accuse someone of doing something'."
        },
        {
          "q": "I regret ___ you that your application was unsuccessful.",
          "options": [
            "inform",
            "to inform",
            "informing",
            "informed"
          ],
          "correct": 1,
          "explanation": "'Regret + to-infinitive' is used to announce bad news."
        },
        {
          "q": "The company has ___ a new policy on remote work.",
          "options": [
            "taken",
            "done",
            "made",
            "set"
          ],
          "correct": 2,
          "explanation": "'Make a policy' is a natural collocation."
        },
        {
          "q": "Unless you ___ now, you'll miss the bus.",
          "options": [
            "leave",
            "will leave",
            "left",
            "would leave"
          ],
          "correct": 0,
          "explanation": "Use present simple after 'unless' for a future condition."
        },
        {
          "q": "She isn't used to ___ in such a noisy office.",
          "options": [
            "work",
            "worked",
            "working",
            "be working"
          ],
          "correct": 2,
          "explanation": "'Be used to' is followed by a noun or gerund."
        },
        {
          "q": "The book, ___ was published last year, became a bestseller.",
          "options": [
            "that",
            "who",
            "which",
            "whose"
          ],
          "correct": 2,
          "explanation": "Use 'which' in a non-defining relative clause about a thing."
        },
        {
          "q": "I had my laptop ___ yesterday.",
          "options": [
            "repair",
            "repaired",
            "repairing",
            "to repair"
          ],
          "correct": 1,
          "explanation": "'Have something done' uses a past participle."
        },
        {
          "q": "He acts as if he ___ everything.",
          "options": [
            "knows",
            "knew",
            "has known",
            "will know"
          ],
          "correct": 1,
          "explanation": "A past form after 'as if' can describe an unreal present situation."
        },
        {
          "q": "No sooner ___ than the lights went out.",
          "options": [
            "we sat down",
            "had we sat down",
            "we had sat down",
            "did we sit down"
          ],
          "correct": 1,
          "explanation": "'No sooner' at the beginning requires inversion."
        },
        {
          "q": "The instructions were clear enough for everyone ___ them.",
          "options": [
            "understand",
            "understanding",
            "to understand",
            "understood"
          ],
          "correct": 2,
          "explanation": "Use 'adjective + enough + to-infinitive'."
        },
        {
          "q": "She reminded me ___ the documents before the deadline.",
          "options": [
            "send",
            "sending",
            "to send",
            "sent"
          ],
          "correct": 2,
          "explanation": "'Remind someone' takes a to-infinitive for a task."
        },
        {
          "q": "I'd prefer ___ at home tonight rather than go out.",
          "options": [
            "stay",
            "staying",
            "to stay",
            "stayed"
          ],
          "correct": 2,
          "explanation": "Use 'would prefer + to-infinitive'."
        }
      ],
      "B2": [
        {
          "q": "Were the company ___ its prices, demand might fall.",
          "options": [
            "raise",
            "to raise",
            "raised",
            "raising"
          ],
          "correct": 1,
          "explanation": "Formal conditional inversion uses 'were + subject + to-infinitive'."
        },
        {
          "q": "Not only ___ the deadline, but she also forgot the meeting.",
          "options": [
            "she missed",
            "did she miss",
            "she had missed",
            "missed she"
          ],
          "correct": 1,
          "explanation": "Fronted 'not only' requires inversion."
        },
        {
          "q": "The proposal is believed ___ by the committee already.",
          "options": [
            "to approve",
            "to have been approved",
            "being approved",
            "to be approving"
          ],
          "correct": 1,
          "explanation": "Use a perfect passive infinitive for an earlier action."
        },
        {
          "q": "I'd sooner you ___ this matter with anyone else.",
          "options": [
            "don't discuss",
            "didn't discuss",
            "won't discuss",
            "not discuss"
          ],
          "correct": 1,
          "explanation": "'I'd sooner you' takes a past form for a present preference."
        },
        {
          "q": "Little ___ that the decision would cause controversy.",
          "options": [
            "they knew",
            "did they know",
            "they had known",
            "had they knew"
          ],
          "correct": 1,
          "explanation": "Negative adverbials such as 'little' trigger inversion."
        },
        {
          "q": "The evidence, ___ compelling, was not sufficient.",
          "options": [
            "however",
            "despite",
            "although",
            "nevertheless"
          ],
          "correct": 0,
          "explanation": "'However + adjective' means 'although it was ...'."
        },
        {
          "q": "He is alleged ___ the documents before the audit.",
          "options": [
            "destroy",
            "to destroy",
            "to have destroyed",
            "having destroyed"
          ],
          "correct": 2,
          "explanation": "Use a perfect infinitive for an alleged earlier action."
        },
        {
          "q": "The manager insisted that the report ___ rewritten.",
          "options": [
            "is",
            "was",
            "be",
            "will be"
          ],
          "correct": 2,
          "explanation": "Formal mandative clauses use the base form after 'insist that'."
        },
        {
          "q": "I would have called you if I ___ your number.",
          "options": [
            "had had",
            "would have had",
            "have had",
            "would had"
          ],
          "correct": 0,
          "explanation": "The third conditional uses past perfect in the if-clause."
        },
        {
          "q": "The more carefully you plan, ___ the outcome is likely to be.",
          "options": [
            "the good",
            "the better",
            "better",
            "the best"
          ],
          "correct": 1,
          "explanation": "Use 'the more ..., the better ...'."
        },
        {
          "q": "She has a tendency ___ minor problems out of proportion.",
          "options": [
            "blow",
            "to blow",
            "blowing",
            "blown"
          ],
          "correct": 1,
          "explanation": "The noun 'tendency' is followed by a to-infinitive."
        },
        {
          "q": "The article raises questions ___ relevance cannot be ignored.",
          "options": [
            "which",
            "whose",
            "of which",
            "that"
          ],
          "correct": 1,
          "explanation": "Use 'whose' to show possession in a relative clause."
        },
        {
          "q": "He denied ___ involved in the negotiations.",
          "options": [
            "to be",
            "being",
            "be",
            "been"
          ],
          "correct": 1,
          "explanation": "'Deny' takes a gerund."
        },
        {
          "q": "Only after the data had been checked ___ the error.",
          "options": [
            "they noticed",
            "did they notice",
            "they had noticed",
            "noticed they"
          ],
          "correct": 1,
          "explanation": "A fronted 'only after' phrase triggers inversion."
        },
        {
          "q": "The new regulations aim at ___ energy consumption.",
          "options": [
            "reduce",
            "to reduce",
            "reducing",
            "reduced"
          ],
          "correct": 2,
          "explanation": "The preposition 'at' is followed by a gerund."
        },
        {
          "q": "I would have preferred it if you ___ me earlier.",
          "options": [
            "tell",
            "told",
            "had told",
            "would tell"
          ],
          "correct": 2,
          "explanation": "An unreal past preference uses past perfect."
        },
        {
          "q": "So intense ___ that several spectators left early.",
          "options": [
            "the heat was",
            "was the heat",
            "the heat had",
            "did the heat"
          ],
          "correct": 1,
          "explanation": "Fronted 'so + adjective' can trigger inversion."
        },
        {
          "q": "The findings are consistent ___ previous research.",
          "options": [
            "to",
            "with",
            "for",
            "by"
          ],
          "correct": 1,
          "explanation": "The collocation is 'consistent with'."
        },
        {
          "q": "He acted as though nothing ___.",
          "options": [
            "happened",
            "has happened",
            "had happened",
            "would happen"
          ],
          "correct": 2,
          "explanation": "Past perfect can describe an unreal situation preceding a past action."
        },
        {
          "q": "The witness gave an account ___ differed from the official report.",
          "options": [
            "who",
            "where",
            "that",
            "whose"
          ],
          "correct": 2,
          "explanation": "Use 'that' as a defining relative pronoun for a thing."
        },
        {
          "q": "It is high time the government ___ action.",
          "options": [
            "takes",
            "took",
            "will take",
            "has taken"
          ],
          "correct": 1,
          "explanation": "'It is high time' is followed by a past form for a present necessity."
        },
        {
          "q": "The project was postponed, ___ the team's objections.",
          "options": [
            "although",
            "despite",
            "whereas",
            "however"
          ],
          "correct": 1,
          "explanation": "'Despite' is followed by a noun phrase."
        },
        {
          "q": "Rarely ___ such a comprehensive analysis.",
          "options": [
            "we have seen",
            "have we seen",
            "we saw",
            "did we saw"
          ],
          "correct": 1,
          "explanation": "'Rarely' at the beginning requires inversion."
        },
        {
          "q": "The suspect is thought ___ the country.",
          "options": [
            "to leave",
            "leaving",
            "to have left",
            "having left"
          ],
          "correct": 2,
          "explanation": "Use a perfect infinitive for an action believed to have happened earlier."
        },
        {
          "q": "I can't help ___ that something is missing.",
          "options": [
            "think",
            "to think",
            "thinking",
            "thought"
          ],
          "correct": 2,
          "explanation": "'Can't help' is followed by a gerund."
        }
      ],
      "C1": [
        {
          "q": "Had it not been for your advice, I ___ the wrong decision.",
          "options": [
            "would make",
            "would have made",
            "made",
            "had made"
          ],
          "correct": 1,
          "explanation": "'Had it not been for' is an inverted third conditional."
        },
        {
          "q": "The board's decision was contingent ___ approval.",
          "options": [
            "of",
            "on",
            "at",
            "for"
          ],
          "correct": 1,
          "explanation": "'Contingent' is followed by 'on'."
        },
        {
          "q": "Much as I ___ your enthusiasm, the proposal is impractical.",
          "options": [
            "admire",
            "am admiring",
            "have admired",
            "will admire"
          ],
          "correct": 0,
          "explanation": "'Much as' introduces a concessive clause."
        },
        {
          "q": "The report was so convoluted that it was scarcely ___.",
          "options": [
            "intelligible",
            "intelligibly",
            "intelligence",
            "intelligibility"
          ],
          "correct": 0,
          "explanation": "An adjective is needed after 'was scarcely'."
        },
        {
          "q": "He speaks with the authority of someone who ___ the issue for decades.",
          "options": [
            "researches",
            "has been researching",
            "is researching",
            "will research"
          ],
          "correct": 1,
          "explanation": "Present perfect continuous emphasizes an activity continuing over time."
        },
        {
          "q": "The minister's remarks were construed ___ an implicit admission.",
          "options": [
            "as",
            "for",
            "by",
            "to"
          ],
          "correct": 0,
          "explanation": "The collocation is 'construe something as something'."
        },
        {
          "q": "No matter how carefully the clause is worded, it remains open ___ interpretation.",
          "options": [
            "for",
            "to",
            "with",
            "at"
          ],
          "correct": 1,
          "explanation": "The expression is 'open to interpretation'."
        },
        {
          "q": "The editor requested that the final paragraph ___ revised.",
          "options": [
            "is",
            "be",
            "was",
            "being"
          ],
          "correct": 1,
          "explanation": "Formal mandative subjunctive uses the base form 'be'."
        },
        {
          "q": "The findings call into question the extent ___ the policy has worked.",
          "options": [
            "which",
            "to which",
            "at which",
            "for which"
          ],
          "correct": 1,
          "explanation": "The standard phrase is 'the extent to which'."
        },
        {
          "q": "Scarcely had negotiations begun ___ a dispute emerged.",
          "options": [
            "than",
            "when",
            "then",
            "while"
          ],
          "correct": 1,
          "explanation": "The correlative structure is 'scarcely ... when'."
        },
        {
          "q": "The author is less concerned with chronology ___ with motives.",
          "options": [
            "than",
            "as",
            "but",
            "rather"
          ],
          "correct": 0,
          "explanation": "Use the comparative structure 'less ... than'."
        },
        {
          "q": "Were the assumptions ___ correct, the model would need no adjustment.",
          "options": [
            "to be",
            "being",
            "been",
            "be"
          ],
          "correct": 0,
          "explanation": "'Were + subject + to-infinitive' is a formal hypothetical condition."
        },
        {
          "q": "The data should be treated with caution, ___ they are preliminary.",
          "options": [
            "given that",
            "whereas",
            "unless",
            "even"
          ],
          "correct": 0,
          "explanation": "'Given that' introduces a reason."
        },
        {
          "q": "She objected to the figures ___ presented without context.",
          "options": [
            "being",
            "be",
            "have been",
            "to be"
          ],
          "correct": 0,
          "explanation": "The passive gerund after 'object to' is 'being presented'."
        },
        {
          "q": "The findings are by no means ___; further replication is required.",
          "options": [
            "conclusive",
            "conclusion",
            "conclusively",
            "conclude"
          ],
          "correct": 0,
          "explanation": "An adjective is required after 'are'."
        },
        {
          "q": "He was on the verge of ___ the contract when new information emerged.",
          "options": [
            "sign",
            "to sign",
            "signing",
            "signed"
          ],
          "correct": 2,
          "explanation": "'On the verge of' is followed by a noun or gerund."
        },
        {
          "q": "The argument hinges ___ a distinction the author never defines.",
          "options": [
            "at",
            "in",
            "on",
            "with"
          ],
          "correct": 2,
          "explanation": "The phrasal verb is 'hinge on'."
        },
        {
          "q": "Were it not ___ the last-minute intervention, the scheme would have collapsed.",
          "options": [
            "to",
            "for",
            "with",
            "by"
          ],
          "correct": 1,
          "explanation": "The fixed expression is 'were it not for'."
        },
        {
          "q": "The committee reached a decision, the implications of ___ remain unclear.",
          "options": [
            "that",
            "which",
            "what",
            "whose"
          ],
          "correct": 1,
          "explanation": "Use 'which' in a non-defining relative clause."
        },
        {
          "q": "The speaker's tone was dismissive, ___ the polite wording.",
          "options": [
            "notwithstanding",
            "because",
            "whereas",
            "unless"
          ],
          "correct": 0,
          "explanation": "'Notwithstanding' means 'despite'."
        },
        {
          "q": "It is imperative that every applicant ___ the declaration.",
          "options": [
            "completes",
            "complete",
            "completed",
            "will complete"
          ],
          "correct": 1,
          "explanation": "Formal mandative subjunctive uses the base form."
        },
        {
          "q": "The claim is difficult to substantiate, let ___ prove conclusively.",
          "options": [
            "alone",
            "only",
            "even",
            "rather"
          ],
          "correct": 0,
          "explanation": "'Let alone' introduces something even more difficult."
        },
        {
          "q": "The policy has had unintended consequences, not least ___ the added burden.",
          "options": [
            "being",
            "be",
            "to be",
            "been"
          ],
          "correct": 0,
          "explanation": "'Not least being' introduces a significant example."
        },
        {
          "q": "Only by examining the correspondence ___ the events be reconstructed.",
          "options": [
            "we can",
            "can we",
            "we could",
            "could we to"
          ],
          "correct": 1,
          "explanation": "A fronted 'only by' phrase triggers inversion."
        },
        {
          "q": "The proposal, far from ___ costs, may increase them.",
          "options": [
            "reduce",
            "reducing",
            "reduced",
            "to reduce"
          ],
          "correct": 1,
          "explanation": "'Far from' is followed by a noun or gerund."
        }
      ],
      "C2": [
        {
          "q": "So deeply entrenched ___ that even modest reforms proved difficult.",
          "options": [
            "the conventions were",
            "were the conventions",
            "the conventions had",
            "did the conventions"
          ],
          "correct": 1,
          "explanation": "Fronted 'so + adjective/adverb' can trigger inversion."
        },
        {
          "q": "The ruling is predicated ___ the assumption that the evidence is admissible.",
          "options": [
            "in",
            "on",
            "at",
            "with"
          ],
          "correct": 1,
          "explanation": "The formal collocation is 'predicated on'."
        },
        {
          "q": "Were the premise less contentious, the conclusion ___.",
          "options": [
            "would accept",
            "would be accepted",
            "will be accepted",
            "had been accepted"
          ],
          "correct": 1,
          "explanation": "This is a second conditional with a passive result clause."
        },
        {
          "q": "The chairperson's intervention served only to ___ the disagreement.",
          "options": [
            "exacerbate",
            "alleviate",
            "reconcile",
            "abate"
          ],
          "correct": 0,
          "explanation": "'Exacerbate' means to make a problem worse."
        },
        {
          "q": "The document is couched in deliberately ___ terms.",
          "options": [
            "equivocal",
            "equivalent",
            "equitable",
            "equipped"
          ],
          "correct": 0,
          "explanation": "'Equivocal' means ambiguous or open to several interpretations."
        },
        {
          "q": "Not until the final paragraph ___ the author's premise.",
          "options": [
            "does the reader discern",
            "the reader discerns",
            "the reader did discern",
            "discerns the reader"
          ],
          "correct": 0,
          "explanation": "'Not until' at the beginning requires inversion in the main clause."
        },
        {
          "q": "The witness's recollection was at variance ___ the record.",
          "options": [
            "to",
            "with",
            "from",
            "against"
          ],
          "correct": 1,
          "explanation": "The idiom is 'at variance with'."
        },
        {
          "q": "The proposal was rejected, not so much because it was costly ___ because it was unworkable.",
          "options": [
            "but",
            "as",
            "than",
            "rather"
          ],
          "correct": 1,
          "explanation": "The correlative structure is 'not so much ... as ...'."
        },
        {
          "q": "The report makes no allowance ___ measurement error.",
          "options": [
            "to",
            "for",
            "with",
            "about"
          ],
          "correct": 1,
          "explanation": "The phrase is 'make allowance for'."
        },
        {
          "q": "The author is at pains ___ that correlation is not causation.",
          "options": [
            "to emphasise",
            "emphasising",
            "emphasise",
            "to emphasising"
          ],
          "correct": 0,
          "explanation": "'Be at pains to do something' takes a to-infinitive."
        },
        {
          "q": "Little did the researchers anticipate the extent ___ their findings would be challenged.",
          "options": [
            "which",
            "to which",
            "at which",
            "for which"
          ],
          "correct": 1,
          "explanation": "The correct phrase is 'the extent to which'."
        },
        {
          "q": "The settlement was reached on the understanding ___ neither party would comment.",
          "options": [
            "which",
            "what",
            "that",
            "whether"
          ],
          "correct": 2,
          "explanation": "'On the understanding that' introduces an agreement or condition."
        },
        {
          "q": "The evidence, such as it ___, falls short of the required standard.",
          "options": [
            "is",
            "was",
            "be",
            "were"
          ],
          "correct": 0,
          "explanation": "The fixed phrase is 'such as it is'."
        },
        {
          "q": "The argument is coherent, albeit ___ on an unverified premise.",
          "options": [
            "predicated",
            "predicating",
            "predicate",
            "to predicate"
          ],
          "correct": 0,
          "explanation": "'Predicated on' means based on."
        },
        {
          "q": "Were one ___ the figures at face value, the conclusion would seem unavoidable.",
          "options": [
            "taking",
            "to take",
            "taken",
            "take"
          ],
          "correct": 1,
          "explanation": "'Were one to + infinitive' is a formal hypothetical construction."
        },
        {
          "q": "The measure is unlikely to work, ___ the absence of an implementation plan.",
          "options": [
            "in view of",
            "whereas",
            "even though",
            "provided"
          ],
          "correct": 0,
          "explanation": "'In view of' means considering and is followed by a noun phrase."
        },
        {
          "q": "The distinction has implications ___ the interpretation of the statute.",
          "options": [
            "for",
            "to",
            "at",
            "with"
          ],
          "correct": 0,
          "explanation": "The standard collocation is 'implications for'."
        },
        {
          "q": "The qualification was so carefully phrased as to be almost ___.",
          "options": [
            "imperceptible",
            "imperceptibly",
            "perceptive",
            "perception"
          ],
          "correct": 0,
          "explanation": "An adjective is needed after 'be'."
        },
        {
          "q": "The panel was unanimous, ___ one member who abstained.",
          "options": [
            "bar",
            "barring",
            "excepting to",
            "unless"
          ],
          "correct": 1,
          "explanation": "'Barring' means 'except for'."
        },
        {
          "q": "The text is replete ___ allusions familiar to its original audience.",
          "options": [
            "by",
            "of",
            "with",
            "from"
          ],
          "correct": 2,
          "explanation": "'Replete' is followed by 'with'."
        },
        {
          "q": "The conclusion does not follow, however plausible it ___ appear.",
          "options": [
            "may",
            "might to",
            "can to",
            "should to"
          ],
          "correct": 0,
          "explanation": "'However + adjective + subject + may' is concessive."
        },
        {
          "q": "The new evidence casts doubt ___ the reliability of the testimony.",
          "options": [
            "in",
            "at",
            "on",
            "for"
          ],
          "correct": 2,
          "explanation": "The phrase is 'cast doubt on'."
        },
        {
          "q": "The policy was introduced, ostensibly ___ efficiency.",
          "options": [
            "for the sake of",
            "due",
            "because",
            "so that"
          ],
          "correct": 0,
          "explanation": "'For the sake of' means for the purpose of."
        },
        {
          "q": "There is little to be gained ___ revisiting an irreversible decision.",
          "options": [
            "to",
            "from",
            "with",
            "by"
          ],
          "correct": 1,
          "explanation": "The construction is 'gain from doing something'."
        },
        {
          "q": "The conclusions are persuasive only insofar as the data ___ reliable.",
          "options": [
            "remain",
            "remains",
            "remaining",
            "to remain"
          ],
          "correct": 0,
          "explanation": "The plural subject 'data' takes a plural verb in this formal usage."
        }
      ]
    }
  }
};
function mergeQuestionBanks(target, source) {
  Object.keys(source).forEach(language => {
    target[language] ??= {};
    Object.keys(source[language]).forEach(explanation => {
      target[language][explanation] ??= {};
      Object.assign(target[language][explanation], source[language][explanation]);
    });
  });
  return target;
}

mergeQuestionBanks(QUESTION_BANK, EXTRA_QUESTION_BANK);

const state = {
  grammarLanguage: "English",
  explanationLanguage: "English",
  level: "A1",
  questions: [],
  index: 0,
  score: 0,
  answers: [],
  answered: false
};

const $ = (id) => document.getElementById(id);
const screens = ["home-screen","setup-screen","game-screen","results-screen"];

function showScreen(id) {
  screens.forEach(screenId => {
    const el = $(screenId);
    el.hidden = screenId !== id;
    el.classList.toggle("active", screenId === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getPack(language = state.grammarLanguage, explanation = state.explanationLanguage, level = state.level) {
  return QUESTION_BANK?.[language]?.[explanation]?.[level] || [];
}

function isValidQuestion(item) {
  return item && typeof item.q === "string" && item.q.trim() &&
    Array.isArray(item.options) && item.options.length === 4 &&
    item.options.every(option => typeof option === "string" && option.trim()) &&
    Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4 &&
    typeof item.explanation === "string" && item.explanation.trim();
}

function validatePack(pack) {
  if (!Array.isArray(pack) || pack.length !== QUESTIONS_PER_LEVEL) {
    return { valid: false, count: Array.isArray(pack) ? pack.length : 0, reason: "A complete pack must contain exactly 25 questions." };
  }
  if (!pack.every(isValidQuestion)) {
    return { valid: false, count: pack.length, reason: "One or more questions have an invalid structure." };
  }
  return { valid: true, count: pack.length, reason: "25/25 questions are ready." };
}

function updateAvailability() {
  const pack = getPack();
  const result = validatePack(pack);
  const status = $("database-status");
  const start = $("btn-start-quiz");
  start.disabled = !result.valid;
  status.className = "status " + (result.valid ? "ready" : "warning");
  status.textContent = result.valid
    ? `${state.grammarLanguage} · ${state.level}: ${result.reason}`
    : `${state.grammarLanguage} · ${state.level}: ${result.count}/25 questions. This language/level pack is not ready yet. Add 25 reviewed questions before starting.`;
}

function fillLanguageSelects() {
  const grammar = $("question-lang");
  const explanation = $("answer-lang");
  SUPPORTED_LANGUAGES.forEach(language => {
    grammar.add(new Option(language, language));
    explanation.add(new Option(language, language));
  });
  grammar.value = state.grammarLanguage;
  explanation.value = state.explanationLanguage;
  grammar.addEventListener("change", () => {
    state.grammarLanguage = grammar.value;
    updateAvailability();
  });
  explanation.addEventListener("change", () => {
    state.explanationLanguage = explanation.value;
    updateAvailability();
  });
}

function setupLevels() {
  document.querySelectorAll(".level-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".level-btn").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      state.level = button.dataset.level;
      updateAvailability();
    });
  });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  const pack = getPack();
  const validation = validatePack(pack);
  if (!validation.valid) {
    updateAvailability();
    return;
  }
  state.questions = shuffle(pack).map(question => {
    const options = shuffle(question.options.map((text, index) => ({
      text, correct: index === question.correct
    })));
    return { ...question, shuffledOptions: options };
  });
  state.index = 0;
  state.score = 0;
  state.answers = [];
  state.answered = false;
  $("quiz-meta").textContent = `${state.grammarLanguage} · ${state.level}`;
  showScreen("game-screen");
  renderQuestion();
}

function renderQuestion() {
  const question = state.questions[state.index];
  const total = state.questions.length;
  state.answered = false;
  $("question-counter").textContent = `Question ${state.index + 1} / ${total}`;
  $("progress-percentage").textContent = `${Math.round(state.index / total * 100)}%`;
  $("progress-fill").style.width = `${state.index / total * 100}%`;
  $("question-level").textContent = `${state.level} · GRAMMAR PRACTICE`;
  $("question-text").textContent = question.q;
  $("feedback").hidden = true;
  $("feedback").textContent = "";
  $("btn-next").disabled = true;
  $("btn-next").textContent = state.index === total - 1 ? "SEE RESULTS →" : "NEXT QUESTION →";

  const options = $("answer-options");
  options.replaceChildren();
  question.shuffledOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
    button.addEventListener("click", () => chooseAnswer(index));
    options.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (state.answered) return;
  state.answered = true;
  const question = state.questions[state.index];
  const selected = question.shuffledOptions[selectedIndex];
  const correctIndex = question.shuffledOptions.findIndex(option => option.correct);
  const correct = selected.correct;
  if (correct) state.score++;
  state.answers.push({ question, selectedIndex, correct });

  [...$("answer-options").children].forEach((button, index) => {
    button.disabled = true;
    if (question.shuffledOptions[index].correct) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("incorrect");
  });

  const feedback = $("feedback");
  feedback.hidden = false;
  const heading = document.createElement("strong");
  heading.textContent = correct ? "Correct! " : `Not quite. Correct answer: ${question.shuffledOptions[correctIndex].text}. `;
  feedback.append(heading, document.createTextNode(question.explanation));
  $("btn-next").disabled = false;
}

function nextQuestion() {
  if (!state.answered) return;
  if (state.index < state.questions.length - 1) {
    state.index++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  $("final-score").textContent = `${state.score}/${state.questions.length}`;
  const percent = Math.round(state.score / state.questions.length * 100);
  $("result-message").textContent = percent >= 80
    ? "Great work! Keep building your grammar skills."
    : percent >= 50
      ? "Good effort. Review the explanations and try again."
      : "Every attempt is practice. Review the answers and keep learning.";
  const list = $("review-list");
  list.replaceChildren();
  state.answers.forEach((answer, index) => {
    const item = document.createElement("article");
    item.className = `review-item ${answer.correct ? "good" : ""}`;
    const title = document.createElement("strong");
    title.textContent = `${index + 1}. ${answer.correct ? "Correct" : "Review this answer"}`;
    const question = document.createElement("div");
    question.textContent = answer.question.q;
    const explanation = document.createElement("div");
    explanation.textContent = answer.question.explanation;
    item.append(title, question, explanation);
    list.appendChild(item);
  });
  showScreen("results-screen");
}

function init() {
  fillLanguageSelects();
  setupLevels();
  $("btn-play-now").addEventListener("click", () => showScreen("setup-screen"));
  $("btn-back-home").addEventListener("click", () => showScreen("home-screen"));
  $("btn-start-quiz").addEventListener("click", startQuiz);
  $("btn-next").addEventListener("click", nextQuestion);
  $("btn-quit").addEventListener("click", () => showScreen("setup-screen"));
  $("btn-results-home").addEventListener("click", () => showScreen("home-screen"));
  $("btn-retry").addEventListener("click", startQuiz);
  updateAvailability();
}

document.addEventListener("DOMContentLoaded", init);

/*
 HOW TO ADD A NEW VERIFIED PACK:
 QUESTION_BANK.Spanish = {
   English: {
     A1: [ { q:"...", options:["...","...","...","..."], correct:0, explanation:"..." }, ...25 items... ],
     A2: [ ...exactly 25 reviewed questions... ]
   }
 };
 Keep grammar-language questions in the grammar language. Explanations must use
 the selected explanation language. The UI intentionally blocks packs with
 fewer or more than 25 questions.
*/
