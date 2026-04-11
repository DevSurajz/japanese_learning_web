export const grammarData = [
  {
    "lesson": "Lesson 1",
    "lessonTitle": "New Friends",
    "lessonJapanese": "初めまして",
    "grammar": [
      {
        "title": "X は Y です — Identifying Who or What Something Is",
        "explanation": "The most fundamental sentence pattern in Japanese. Every beginner sentence starts here.\n\nは (pronounced 'wa', not 'ha') is called the topic particle. It marks what your sentence is about — your topic. Think of は as saying 'As for X...' or 'Speaking of X...'. It does not necessarily mean 'X is the subject doing the action' — it simply tells the listener what you are going to talk about.\n\nです (desu) is a polite copula. In English, it works like the verb 'to be' — is, am, are. It links the topic (X) to what you want to say about it (Y).\n\nSo the full pattern X は Y です means: 'As for X, it is Y' → 'X is Y'.\n\nThis pattern is used when:\n• Introducing yourself or others (私は田中です — I am Tanaka)\n• Stating someone's profession (山田さんは先生です — Yamada-san is a teacher)\n• Stating nationality (メアリーさんはアメリカ人です — Mary is American)\n• Stating category or identity (これは本です — This is a book)\n\nKey point: The particle は is always written as は (the hiragana for 'ha') but always pronounced 'wa' when used as a particle. This is one of Japanese's historical spellings that stuck around.",
        "structure": "[X] は [Y] です。",
        "examples": [
          { "japanese": "私は学生です。", "romaji": "Watashi wa gakusei desu.", "english": "I am a student." },
          { "japanese": "山田さんは先生です。", "romaji": "Yamada-san wa sensei desu.", "english": "Mr. Yamada is a teacher." },
          { "japanese": "メアリーさんはアメリカ人です。", "romaji": "Mearī-san wa Amerikajin desu.", "english": "Mary is American." },
          { "japanese": "これは日本語の本です。", "romaji": "Kore wa nihongo no hon desu.", "english": "This is a Japanese language book." }
        ],
        "notes": "Always pronounce は as 'wa' when it is used as the topic particle. The word 'desu' is often romanized as 'des' in fast speech — the 'u' at the end is nearly silent.",
        "practice": [
          { "type": "fill-in-blanks", "question": "私（　）田中（　）。", "answer": "は, です", "hint": "Topic particle + copula" },
          { "type": "translation", "question": "Translate: 'Mr. Smith is a doctor.'", "answer": "スミスさんは医者です。" },
          { "type": "sentence-creation", "question": "Use は and です to introduce yourself in Japanese.", "answer": "私は[Your Name]です。" }
        ]
      },
      {
        "title": "Question Sentences with か — Turning Statements into Questions",
        "explanation": "In English, we often change the word order to form a question ('You are a student' → 'Are you a student?'). Japanese does not work this way. Word order in Japanese stays exactly the same — you simply add the particle か (ka) to the end of the sentence.\n\nか is called the question particle. It signals to the listener that what you just said is a question. Think of か as a spoken question mark.\n\nBecause か already marks the sentence as a question, a written question mark '?' is technically optional. However, in casual modern writing (texting, social media), question marks are frequently added for clarity.\n\nTo answer a yes/no question:\n• Affirmative: はい (hai) — Yes\n• Negative: いいえ (iie) — No\n\nFor 'what' questions, use the question word 何 (なに / なん, nani/nan). When 何 comes before です or a counter, it is usually pronounced なん (nan).",
        "structure": "[Statement] + か。",
        "examples": [
          { "japanese": "留学生ですか。", "romaji": "Ryūgakusei desu ka?", "english": "Are you an international student?" },
          { "japanese": "専攻は何ですか。", "romaji": "Senkō wa nan desu ka?", "english": "What is your major?" },
          { "japanese": "日本語の先生ですか。", "romaji": "Nihongo no sensei desu ka?", "english": "Are you a Japanese language teacher?" }
        ],
        "notes": "Never use rising intonation alone without か in formal Japanese — it sounds incomplete. In casual conversation among close friends, か is sometimes dropped, but it is essential in polite speech.",
        "practice": [
          { "type": "fill-in-blanks", "question": "日本語の学生です（　）。", "answer": "か" },
          { "type": "translation", "question": "Translate: 'Are you a university student?'", "answer": "大学生ですか。" },
          { "type": "sentence-creation", "question": "Ask someone what their name is. (名前 = name)", "answer": "お名前は何ですか。" }
        ]
      },
      {
        "title": "Noun の Noun — Connecting Nouns with の",
        "explanation": "The particle の (no) is one of the most versatile particles in Japanese. Its core function is to connect two nouns, where the first noun modifies, describes, or qualifies the second noun.\n\nThe most common use of の is possession — like English 's:\n• たけしさんの電話番号 → Takeshi's phone number\n• 私の本 → my book\n\nBut の does much more than possession. It shows the relationship between two nouns in a very broad sense:\n• Category: 日本語の先生 → a teacher OF Japanese (Japanese teacher)\n• Affiliation: さくら大学の学生 → a student OF Sakura University\n• Location: 東京の大学 → a university IN Tokyo\n• Material: 木のいす → a chair MADE OF wood\n\nCritical rule: In Japanese, the modifier always comes BEFORE what it modifies. So 'teacher of Japanese' is literally 'Japanese-language's teacher' (日本語の先生). The logic flows right-to-left compared to English.\n\nYou can chain multiple の together: 私のクラスの先生 → my class's teacher → the teacher of my class.",
        "structure": "[Noun 1] の [Noun 2]",
        "examples": [
          { "japanese": "たけしさんの電話番号", "romaji": "Takeshi-san no denwa bangō", "english": "Takeshi's phone number" },
          { "japanese": "日本語の先生", "romaji": "Nihongo no sensei", "english": "Japanese language teacher" },
          { "japanese": "さくら大学の学生", "romaji": "Sakura daigaku no gakusei", "english": "A student of Sakura University" },
          { "japanese": "私の友達の名前", "romaji": "Watashi no tomodachi no namae", "english": "My friend's name" }
        ],
        "notes": "の is one of the most frequently used particles in Japanese. Master it early — you will use it in almost every sentence.",
        "practice": [
          { "type": "fill-in-blanks", "question": "私（　）本です。", "answer": "の" },
          { "type": "translation", "question": "Translate: 'My university'", "answer": "私の大学" },
          { "type": "translation", "question": "Translate: 'A student of Tokyo University'", "answer": "東京大学の学生" }
        ]
      },
      {
        "title": "～じゃないです / ではありません — Negative of です",
        "explanation": "Just as English has 'is not' to negate 'is', Japanese has じゃないです (or the more formal ではありません) to negate です.\n\nじゃ is a contraction of では (dewa). In spoken everyday Japanese, じゃ is far more common. In writing and formal situations, ではありません is preferred.\n\nThe negative forms by register:\n• Most casual: じゃない (just drop です)\n• Polite/everyday: じゃないです\n• Formal: じゃありません / ではありません\n• Most formal: ではございません\n\nWhen answering a negative question or correcting information, this pattern is essential. Notice that the structure remains exactly the same as X は Y です — only the ending changes.",
        "structure": "[X] は [Y] じゃないです。\n[X] は [Y] ではありません。",
        "examples": [
          { "japanese": "私は学生じゃないです。", "romaji": "Watashi wa gakusei ja nai desu.", "english": "I am not a student." },
          { "japanese": "山田さんは先生じゃないです。", "romaji": "Yamada-san wa sensei ja nai desu.", "english": "Mr. Yamada is not a teacher." },
          { "japanese": "これは私の本ではありません。", "romaji": "Kore wa watashi no hon dewa arimasen.", "english": "This is not my book. (formal)" }
        ],
        "notes": "You will often hear じゃない in casual speech without です. This is the plain/short form used among friends. Always use じゃないです or ではありません with people you don't know well.",
        "practice": [
          { "type": "sentence-creation", "question": "Deny this statement in casual form: 私は先生です。", "answer": "私は先生じゃないです。" },
          { "type": "translation", "question": "Translate formally: 'This is not my phone number.'", "answer": "これは私の電話番号ではありません。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 2",
    "lessonTitle": "Shopping",
    "lessonJapanese": "買い物",
    "grammar": [
      {
        "title": "これ / それ / あれ / どれ — Pointing at Things (Pronouns)",
        "explanation": "Japanese has a very organized system for pointing at things depending on physical distance. This system is called the ko-so-a-do system, and it runs through almost all demonstratives in Japanese.\n\nThe logic is distance-based:\n• こ (ko) words → close to the SPEAKER\n• そ (so) words → close to the LISTENER\n• あ (a) words → far from BOTH speaker and listener\n• ど (do) words → question words (which? where? etc.)\n\nThese four — これ, それ, あれ, どれ — are pronouns, meaning they stand alone as complete nouns and do not need to be followed by another noun.\n\nこれ (kore) = This / This one (near me)\nそれ (sore) = That / That one (near you)\nあれ (are) = That / That one over there (far from both of us)\nどれ (dore) = Which one? (used in questions)\n\nThink of it like this: if you and a friend are in a store, and you want to point at something on the shelf in front of you, you say これ. If your friend is holding something, you say それ. If something is on a high shelf far from both of you, you say あれ.",
        "structure": "これ / それ / あれ は [Noun] です。",
        "examples": [
          { "japanese": "これは私の本です。", "romaji": "Kore wa watashi no hon desu.", "english": "This is my book." },
          { "japanese": "それは何ですか。", "romaji": "Sore wa nan desu ka?", "english": "What is that (near you)?" },
          { "japanese": "あれは私の自転車です。", "romaji": "Are wa watashi no jitensha desu.", "english": "That over there is my bicycle." },
          { "japanese": "どれがあなたのですか。", "romaji": "Dore ga anata no desu ka?", "english": "Which one is yours?" }
        ],
        "notes": "これ, それ, あれ can replace nouns entirely. But この, その, あの MUST be followed by a noun (see next grammar point).",
        "practice": [
          { "type": "fill-in-blanks", "question": "（　）は時計です。(pointing to something far from both of you)", "answer": "あれ" },
          { "type": "translation", "question": "Translate: 'Which one is your pen?'", "answer": "どれがあなたのペンですか。" }
        ]
      },
      {
        "title": "この / その / あの / どの + Noun — Pointing at Things (Adjectives)",
        "explanation": "While これ/それ/あれ/どれ stand alone as pronouns, this group — この, その, あの, どの — must always be attached directly to a noun. They function as demonstrative adjectives (or determiners), the Japanese equivalent of English 'this [noun]', 'that [noun]'.\n\nThe same ko-so-a-do distance logic applies:\n• この (kono) = this [noun] — near speaker\n• その (sono) = that [noun] — near listener\n• あの (ano) = that [noun] over there — far from both\n• どの (dono) = which [noun]? — question\n\nFor example:\nこれ = This (standalone)\nこの + 本 = This book (attached to noun)\n\nYou cannot say この alone. It must always be followed by a noun immediately.\n\nA key difference from English: Japanese demonstrative adjectives never change form based on the noun. In English, you say 'this book', 'these books' — one vs. many. In Japanese, この本 works for both one book and many books. There is no singular/plural distinction.",
        "structure": "この / その / あの / どの + [Noun]",
        "examples": [
          { "japanese": "この時計はいくらですか。", "romaji": "Kono tokei wa ikura desu ka?", "english": "How much is this watch?" },
          { "japanese": "そのかばんは私のです。", "romaji": "Sono kaban wa watashi no desu.", "english": "That bag is mine." },
          { "japanese": "あの人はだれですか。", "romaji": "Ano hito wa dare desu ka?", "english": "Who is that person over there?" },
          { "japanese": "どのカメラですか。", "romaji": "Dono kamera desu ka?", "english": "Which camera is it?" }
        ],
        "notes": "Never use この/その/あの/どの without a noun immediately after them. This is a common beginner error. If you want to refer to something without naming it, use これ/それ/あれ/どれ instead.",
        "practice": [
          { "type": "fill-in-blanks", "question": "（　）本は三千円です。(This book)", "answer": "この" },
          { "type": "translation", "question": "Translate: 'Whose watch is that over there?'", "answer": "あの時計はだれのですか。" }
        ]
      },
      {
        "title": "ここ / そこ / あそこ / どこ — Place Words",
        "explanation": "This is the place version of the ko-so-a-do system. Instead of pointing at objects, these words refer to locations.\n\nここ (koko) = here — a location near the speaker\nそこ (soko) = there — a location near the listener\nあそこ (asoko) = over there — a location far from both\nどこ (doko) = where? — question word for location\n\nThese are used just like nouns in a sentence. They can be the topic (ここは…), the location (ここに…), or the destination (ここへ…).\n\nA very common usage is with あります/います to say something exists in a particular location:\nトイレはあそこです。→ The restroom is over there.\n銀行はどこですか。→ Where is the bank?\n\nNote that あそこ is the exception — it has one extra syllable compared to the pattern こ・そ・あ we'd expect. The standard pattern would give us 'あこ', but in Japanese it became あそこ.",
        "structure": "ここ / そこ / あそこ / どこ",
        "examples": [
          { "japanese": "トイレはここです。", "romaji": "Toire wa koko desu.", "english": "The restroom is here." },
          { "japanese": "銀行はどこですか。", "romaji": "Ginkō wa doko desu ka?", "english": "Where is the bank?" },
          { "japanese": "図書館はあそこです。", "romaji": "Toshokan wa asoko desu.", "english": "The library is over there." },
          { "japanese": "かばんはそこにあります。", "romaji": "Kaban wa soko ni arimasu.", "english": "The bag is there (near you)." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'The library is over there.'", "answer": "図書館はあそこです。" },
          { "type": "fill-in-blanks", "question": "すみません、トイレは（　）ですか。", "answer": "どこ" }
        ]
      },
      {
        "title": "Noun も — Also / Too / Either",
        "explanation": "The particle も (mo) is one of the most useful particles you'll learn early on. It replaces は (and sometimes が or を) and means 'also', 'too', or 'either' (in negative sentences).\n\nThe key is that も replaces the particle, not the noun. So instead of 'Noun は', you write 'Noun も' when you want to say 'Noun too'.\n\nExamples of replacement:\n• 私は学生です → 山田さんも学生です (I am a student → Yamada-san is also a student)\n• コーヒーを飲みます → お茶も飲みます (I drink coffee → I drink tea too)\n\nIn negative sentences, も means 'either / neither':\n• コーヒーを飲みません。お茶も飲みません。\n  I don't drink coffee. I don't drink tea either.\n\nWhen も is used for the same repeated action, it replaces を or が too:\n• 本を買いました。雑誌も買いました。\n  I bought a book. I also bought a magazine.",
        "structure": "[Noun] も [Y] です。\n[Noun] も [Verb]。",
        "examples": [
          { "japanese": "マキさんは日本人です。タケシさんも日本人です。", "romaji": "Maki-san wa Nihonjin desu. Takeshi-san mo Nihonjin desu.", "english": "Maki is Japanese. Takeshi is also Japanese." },
          { "japanese": "私も学生です。", "romaji": "Watashi mo gakusei desu.", "english": "I am also a student." },
          { "japanese": "本を読みます。雑誌も読みます。", "romaji": "Hon wo yomimasu. Zasshi mo yomimasu.", "english": "I read books. I also read magazines." }
        ],
        "notes": "も replaces は, が, or を, but it is added after other particles like に, で, へ, から. For example: 東京にも行きます (I'll go to Tokyo too).",
        "practice": [
          { "type": "translation", "question": "Translate: 'I am a student too.'", "answer": "私も学生です。" },
          { "type": "fill-in-blanks", "question": "メアリーさんは学生です。たけしさん（　）学生です。", "answer": "も" }
        ]
      },
      {
        "title": "～ね / ～よ — Sentence-Ending Particles",
        "explanation": "Japanese has a rich set of sentence-ending particles that add nuance, emotion, and social context to sentences. Two of the most common are ね and よ.\n\nね (ne) — Seeking Agreement or Confirmation\nね is used when the speaker assumes the listener shares the same knowledge or feeling, and is checking that assumption. It's like ending a sentence with 'right?', 'isn't it?', 'don't you think?' in English. It softens the sentence and invites the listener to agree.\n• 今日は暑いですね。→ It's hot today, isn't it?\n• このケーキはおいしいですね。→ This cake is delicious, right?\n\nよ (yo) — Asserting New Information\nよ is used when the speaker is telling the listener something they don't already know, or when emphasizing a point. It carries a tone of 'I'm telling you', 'you know', or 'trust me'. It's slightly more assertive than ね.\n• このレストランはおいしいですよ。→ This restaurant is delicious (I'm telling you / trust me).\n• 田中さんは先生ですよ。→ Tanaka-san IS a teacher, you know.\n\nCombined — よね\nYou can also combine them: よね. This means 'It's X, right? (I believe so but I'm checking with you)'. It's softer than よ but more assertive than ね alone.",
        "structure": "[Sentence] + ね。\n[Sentence] + よ。",
        "examples": [
          { "japanese": "高いですね。", "romaji": "Takai desu ne.", "english": "It's expensive, isn't it?" },
          { "japanese": "おいしいですよ。", "romaji": "Oishii desu yo.", "english": "It's delicious, I tell you." },
          { "japanese": "今日はいい天気ですね。", "romaji": "Kyō wa ii tenki desu ne.", "english": "The weather is nice today, isn't it?" },
          { "japanese": "大丈夫ですよ。", "romaji": "Daijōbu desu yo.", "english": "It's okay (don't worry)." }
        ],
        "notes": "ね and よ are fundamental to sounding natural in Japanese. Without them, sentences can feel blunt or robotic. Pay attention to how native speakers use them in conversation.",
        "practice": [
          { "type": "fill-in-blanks", "question": "いい天気です（　）。(seeking agreement)", "answer": "ね" },
          { "type": "fill-in-blanks", "question": "この映画はおもしろい（　）。(asserting information the listener might not know)", "answer": "よ" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 3",
    "lessonTitle": "Making a Date",
    "lessonJapanese": "デートの約束",
    "grammar": [
      {
        "title": "Verb Types and the Polite Present Tense (～ます / ～ません)",
        "explanation": "Japanese verbs do not change based on person or number — there is no difference between 'I eat', 'you eat', 'they eat'. Context tells you who. Instead, verbs change based on TENSE and POLITENESS LEVEL.\n\nAll Japanese verbs belong to one of three groups:\n\n【Group 1: Ru-verbs (一段動詞 / Ichidan verbs)】\nThese end in る in their dictionary form, and the syllable before る is always an 'i' or 'e' sound. To make the ます form, simply drop る and add ます.\n• 食べる (taberu → tabe + ます) = 食べます\n• 見る (miru → mi + ます) = 見ます\n• 起きる (okiru → oki + ます) = 起きます\n\n【Group 2: U-verbs (五段動詞 / Godan verbs)】\nThese end in a consonant + u sound (く, ぐ, す, つ, ぬ, ぶ, む, う, る). For ます form, the final 'u' sound changes to an 'i' sound, then add ます.\n• 飲む (nomu → nomi + ます) = 飲みます\n• 書く (kaku → kaki + ます) = 書きます\n• 話す (hanasu → hanashi + ます) = 話します\n• 読む (yomu → yomi + ます) = 読みます\n\n【Group 3: Irregular verbs】\nOnly two: する (suru → します / shimasu) and くる (kuru → きます / kimasu).\n\nNegative polite form: Replace ます with ません.\n食べます → 食べません (I don't eat)\n飲みます → 飲みません (I don't drink)\n\nThe polite present form (～ます) covers both present habits ('I eat breakfast every day') and future actions ('I will eat breakfast tomorrow'). Japanese does not have a separate future tense.",
        "structure": "Ru-verb: Drop る + ます/ません\nU-verb: Change 'u' → 'i' + ます/ません\nIrregular: する→します、くる→きます",
        "examples": [
          { "japanese": "私は毎日コーヒーを飲みます。", "romaji": "Watashi wa mainichi kōhī wo nomimasu.", "english": "I drink coffee every day." },
          { "japanese": "今日は朝ごはんを食べません。", "romaji": "Kyō wa asagohan wo tabemasen.", "english": "I will not eat breakfast today." },
          { "japanese": "毎日日本語を勉強します。", "romaji": "Mainichi nihongo wo benkyō shimasu.", "english": "I study Japanese every day." },
          { "japanese": "週末にテニスをします。", "romaji": "Shūmatsu ni tenisu wo shimasu.", "english": "I play tennis on weekends." }
        ],
        "notes": "One tricky case: some verbs end in る but are actually U-verbs. For example, 帰る (kaeru, to return) is an U-verb, not a Ru-verb. When in doubt, check a dictionary. You'll develop a feel for this over time.",
        "practice": [
          { "type": "fill-in-blanks", "question": "音楽を（　）。(I listen to music — きく)", "answer": "聞きます" },
          { "type": "translation", "question": "Translate: 'I do not sleep.' (verb: ねる)", "answer": "寝ません。" },
          { "type": "fill-in-blanks", "question": "日本語を（　）。(I study — べんきょうする)", "answer": "勉強します" }
        ]
      },
      {
        "title": "Particles を、で、に、へ — The Action Particles",
        "explanation": "Particles are small words that attach after nouns to show their role in the sentence. Four essential particles for actions are を, で, に, and へ.\n\n【を (wo) — Direct Object Marker】\nを marks the direct object — the noun that receives or is affected by the verb's action. It answers 'what?' or 'whom?'\n• 本を読みます → I read a book (reading WHAT? → a book)\n• 音楽を聞きます → I listen to music\nNote: を is written with the hiragana を but pronounced simply as 'o'.\n\n【で (de) — Location of Action】\nで marks where an action takes place. It answers 'where does this action happen?'\n• 図書館で勉強します → I study at the library (study WHERE? → at the library)\n• 家でテレビを見ます → I watch TV at home\nで also marks the means/tool used: バスで行きます (I go by bus).\n\n【に (ni) — Time and Destination】\nに has two main uses:\n1. Time: Marks a specific point in time (day of week, clock time, date)\n   • 月曜日に行きます → I go on Monday\n   • 七時に起きます → I wake up at seven o'clock\n2. Destination: Marks where you are going or arriving\n   • 学校に行きます → I go to school\n\n【へ (e) — Direction of Movement】\nへ (pronounced 'e' as a particle) marks direction toward a destination. It is very similar to に for destinations and often interchangeable, but へ emphasizes the direction of travel rather than the arrival point.\n• 東京へ行きます → I go toward Tokyo\n• 日本へ来ました → I came to Japan",
        "structure": "[Object] を [Verb]\n[Location] で [Verb]\n[Time/Destination] に [Verb]\n[Direction] へ [Verb]",
        "examples": [
          { "japanese": "図書館で本を読みます。", "romaji": "Toshokan de hon wo yomimasu.", "english": "I will read books at the library." },
          { "japanese": "週末に京都へ行きます。", "romaji": "Shūmatsu ni Kyōto e ikimasu.", "english": "I will go to Kyoto on the weekend." },
          { "japanese": "毎朝コーヒーを飲みます。", "romaji": "Mai asa kōhī wo nomimasu.", "english": "I drink coffee every morning." },
          { "japanese": "バスで学校に来ます。", "romaji": "Basu de gakkō ni kimasu.", "english": "I come to school by bus." }
        ],
        "notes": "A common confusion: に vs で for location. に is for existence (there IS something at a place — あります/います). で is for actions (something HAPPENS at a place — 食べます, 勉強します).",
        "practice": [
          { "type": "fill-in-blanks", "question": "学校（　）行きます。", "answer": "に / へ" },
          { "type": "translation", "question": "Translate: 'I will watch TV at home.'", "answer": "家でテレビを見ます。" },
          { "type": "fill-in-blanks", "question": "何時（　）起きますか。", "answer": "に" }
        ]
      },
      {
        "title": "When to Use に for Time — and When Not To",
        "explanation": "The particle に is used with specific, fixed points in time. However, not all time expressions take に. This is one of the most common particle mistakes beginners make.\n\n✅ USE に with:\n• Days of the week: 月曜日に (on Monday), 日曜日に (on Sunday)\n• Clock times: 七時に (at seven o'clock), 三時半に (at 3:30)\n• Months: 四月に (in April)\n• Years: 二〇二四年に (in 2024)\n• Dates: 三日に (on the 3rd)\n\n❌ DO NOT use に with:\n• Relative time words that depend on the current moment:\n  今日 (today), 明日 (tomorrow), 昨日 (yesterday)\n  今週 (this week), 来週 (next week), 先週 (last week)\n  今年 (this year), 来年 (next year), 去年 (last year)\n  今 (now), あとで (later)\n• Frequency words: 毎日 (every day), 毎週 (every week)\n\nThe rule of thumb: if the time expression has an absolute, countable value (seven o'clock, Monday, April 5th), use に. If it's relative to 'now' (today, tomorrow, next week), no に.",
        "structure": "[Specific time] に [Verb]\n[Relative time] [Verb] ← no に",
        "examples": [
          { "japanese": "日曜日に映画を見ます。", "romaji": "Nichiyōbi ni eiga wo mimasu.", "english": "I will watch a movie on Sunday." },
          { "japanese": "明日、勉強します。", "romaji": "Ashita, benkyō shimasu.", "english": "I will study tomorrow. (no に)" },
          { "japanese": "七時に起きます。", "romaji": "Shichi-ji ni okimasu.", "english": "I wake up at seven o'clock." },
          { "japanese": "毎日日本語を勉強します。", "romaji": "Mainichi nihongo wo benkyō shimasu.", "english": "I study Japanese every day. (no に)" }
        ],
        "notes": "When in doubt, ask yourself: 'Can I put a number on this time?' If yes (7 o'clock, 3rd day, Monday = 2nd day), use に. If it's relative to today (tomorrow, next week), no に.",
        "practice": [
          { "type": "fill-in-blanks", "question": "今日（　）学校に行きます。", "answer": "No particle (今日 is relative time)" },
          { "type": "fill-in-blanks", "question": "八時（　）ねます。", "answer": "に" }
        ]
      },
      {
        "title": "～ませんか — Inviting Someone to Do Something",
        "explanation": "When you want to politely invite someone to do something with you, Japanese uses a beautifully indirect construction: the negative question form of the polite verb, ～ませんか.\n\nLiterally, ませんか means 'Won't you...?' This indirectness is very characteristic of Japanese communication — instead of directly saying 'Let's do X', you ask 'Won't you do X with me?' It's a softer, more polite invitation that gives the other person room to decline without awkwardness.\n\nCompare the invitation forms:\n• ～ませんか — 'Won't you...?' (polite invitation, softer)\n• ～ましょう — 'Let's...!' (proposal, slightly stronger)\n• ～ましょうか — 'Shall we...?' (checking preference)\n\n～ませんか is the most natural choice when asking someone you don't know very well, or in a first invitation. Among close friends, ましょう is more common.",
        "structure": "[Verb stem] + ませんか。",
        "examples": [
          { "japanese": "一緒に昼ごはんを食べませんか。", "romaji": "Issho ni hirugohan wo tabemasen ka?", "english": "Won't you eat lunch with me?" },
          { "japanese": "テニスをしませんか。", "romaji": "Tenisu wo shimasen ka?", "english": "Would you like to play tennis?" },
          { "japanese": "映画を見ませんか。", "romaji": "Eiga wo mimasen ka?", "english": "Would you like to watch a movie?" }
        ],
        "notes": "A natural response to ませんか: はい、いいですね。ぜひ。→ 'Yes, that sounds good. Definitely.' Or politely declining: すみません、ちょっと… → 'Sorry, it's a bit difficult...' (a very Japanese soft refusal)",
        "practice": [
          { "type": "translation", "question": "Translate: 'Would you like to drink coffee?'", "answer": "コーヒーを飲みませんか。" },
          { "type": "sentence-creation", "question": "Invite someone to go shopping with you. (かいものをする)", "answer": "一緒にかいものをしませんか。" }
        ]
      },
      {
        "title": "Frequency Adverbs — よく、時々、あまり、ぜんぜん",
        "explanation": "Adverbs of frequency tell you how often an action happens. In Japanese, these adverbs usually come before the verb, often right before the verb or near the beginning of the predicate.\n\nFrom most to least frequent:\n• 毎日 (mainichi) = every day\n• よく (yoku) = often, frequently\n• 時々 (tokidoki) = sometimes\n• たまに (tama ni) = occasionally, once in a while\n• あまり～ない (amari ~nai) = not much, not very often [requires negative verb]\n• ぜんぜん～ない (zenzen ~nai) = not at all [requires negative verb]\n\nVery important rule: あまり and ぜんぜん MUST be used with a NEGATIVE verb form. You cannot say あまり食べます — that is grammatically wrong. You must say あまり食べません (I don't eat much).\n\nThis is the opposite of English, where 'not much' and 'not at all' are already negative in the adverb itself. In Japanese, the negativity must appear in the verb too.",
        "structure": "[Frequency adverb] + [Verb]\nあまり / ぜんぜん + [Negative verb]",
        "examples": [
          { "japanese": "私はよくスポーツをします。", "romaji": "Watashi wa yoku supōtsu wo shimasu.", "english": "I often play sports." },
          { "japanese": "時々映画を見ます。", "romaji": "Tokidoki eiga wo mimasu.", "english": "I sometimes watch movies." },
          { "japanese": "私はぜんぜんテレビを見ません。", "romaji": "Watashi wa zenzen terebi wo mimasen.", "english": "I don't watch TV at all." },
          { "japanese": "あまりお酒を飲みません。", "romaji": "Amari osake wo nomimasen.", "english": "I don't drink alcohol much." }
        ],
        "notes": "あまり and ぜんぜん with positive verbs is a very common beginner mistake. Always pair them with negative verb endings.",
        "practice": [
          { "type": "sentence-creation", "question": "Use あまり to say you don't read books much.", "answer": "私はあまり本を読みません。" },
          { "type": "fill-in-blanks", "question": "ぜんぜん日本語を（　）。(I don't speak Japanese at all)", "answer": "話しません" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 4",
    "lessonTitle": "The First Date",
    "lessonJapanese": "初めてのデート",
    "grammar": [
      {
        "title": "あります / います — Expressing Existence",
        "explanation": "These two verbs both translate as 'there is' or 'to exist' in English, but Japanese makes an important distinction that English does not:\n\nあります (arimasu) → used for inanimate objects, things that do not move on their own, and plants\nいます (imasu) → used for living, animate beings — people, animals, insects\n\nThis distinction is called the animacy distinction, and it runs deep in Japanese grammar.\n\nExamples:\n• テーブルの上にコーヒーがあります。(There is coffee on the table.) — coffee is inanimate → あります\n• 公園に子供がいます。(There are children in the park.) — children are animate → います\n• 庭に木があります。(There is a tree in the garden.) — trees, despite being living things biologically, are treated as inanimate in Japanese → あります\n\nThis verb is also used for events and possessions:\n• 今日クラスがあります。(I have class today.) — class is a thing/event → あります\n• 兄弟がいます。(I have siblings.) — siblings are people → います\n\nStructure: The thing that exists is marked with が (not は, when introducing new information). The location where it exists is marked with に.",
        "structure": "[Location] に [Thing/Person] が あります / います。",
        "examples": [
          { "japanese": "あそこにマクドナルドがあります。", "romaji": "Asoko ni Makudonarudo ga arimasu.", "english": "There is a McDonald's over there." },
          { "japanese": "今日、クラスがあります。", "romaji": "Kyō, kurasu ga arimasu.", "english": "I have class today." },
          { "japanese": "あそこに猫がいます。", "romaji": "Asoko ni neko ga imasu.", "english": "There is a cat over there." },
          { "japanese": "教室に学生が三人います。", "romaji": "Kyōshitsu ni gakusei ga san-nin imasu.", "english": "There are three students in the classroom." }
        ],
        "notes": "A common question: what about robots or dolls? Technically inanimate, but if they move and act like living things, speakers sometimes use います. This shows that language reflects perception, not strict biology.",
        "practice": [
          { "type": "fill-in-blanks", "question": "あそこに犬が（　）。", "answer": "います" },
          { "type": "fill-in-blanks", "question": "テーブルの上に本が（　）。", "answer": "あります" },
          { "type": "translation", "question": "Translate: 'There is a post office near here.'", "answer": "この近くに郵便局があります。" }
        ]
      },
      {
        "title": "Position Words — Describing Where Things Are",
        "explanation": "To describe the location of something in relation to another object, Japanese uses a set of location nouns. These always follow the pattern:\n\n[Reference object] の [location word] に あります/います\n\nThe key location words:\n• 上 (うえ, ue) = above, on top of\n• 下 (した, shita) = below, under, beneath\n• 中 (なか, naka) = inside, within\n• 外 (そと, soto) = outside\n• 前 (まえ, mae) = in front of, before\n• 後ろ (うしろ, ushiro) = behind, in back of\n• 右 (みぎ, migi) = to the right of\n• 左 (ひだり, hidari) = to the left of\n• 隣 (となり, tonari) = next to, beside (same category)\n• 近く (ちかく, chikaku) = near, close to\n• 間 (あいだ, aida) = between\n\nStructure: [Thing being located] は [reference object] の [location word] に あります/います.\n• ねこはテーブルの下にいます。\n  The cat is under the table.\n\nNote that this is different from English, where we say 'under the table' (location word + reference). In Japanese it's 'table's under' — the reference comes first, location word second.",
        "structure": "[X] は [Y] の [position word] に あります / います。",
        "examples": [
          { "japanese": "ねこはテーブルの下にいます。", "romaji": "Neko wa tēburu no shita ni imasu.", "english": "The cat is under the table." },
          { "japanese": "本はかばんの中にあります。", "romaji": "Hon wa kaban no naka ni arimasu.", "english": "The book is inside the bag." },
          { "japanese": "銀行は郵便局の隣にあります。", "romaji": "Ginkō wa yūbinkyoku no tonari ni arimasu.", "english": "The bank is next to the post office." },
          { "japanese": "駅はホテルとデパートの間にあります。", "romaji": "Eki wa hoteru to depāto no aida ni arimasu.", "english": "The station is between the hotel and the department store." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'The book is on the desk.'", "answer": "本は机の上にあります。" },
          { "type": "fill-in-blanks", "question": "かばんは椅子の（　）にあります。(under the chair)", "answer": "下" }
        ]
      },
      {
        "title": "Past Tense — でした and ませんでした",
        "explanation": "Japanese has a clean past tense system. Everything you've learned with です and ～ます simply shifts to past tense with these changes:\n\n【Nouns and な-adjectives with です】\nPresent affirmative: ～です → Past affirmative: ～でした\nPresent negative: ～じゃないです → Past negative: ～じゃなかったです\n\n• 学生です (I am a student) → 学生でした (I was a student)\n• 静かです (It is quiet) → 静かでした (It was quiet)\n• 元気じゃないです (I'm not well) → 元気じゃなかったです (I wasn't well)\n\n【Verbs with ～ます】\nPresent affirmative: ～ます → Past affirmative: ～ました\nPresent negative: ～ません → Past negative: ～ませんでした\n\n• 食べます (I eat) → 食べました (I ate)\n• 行きます (I go) → 行きました (I went)\n• 見ません (I don't watch) → 見ませんでした (I didn't watch)\n\nThe elegance of Japanese past tense: only the ending changes. The verb stem stays completely the same. Once you know the present form, the past is automatic.",
        "structure": "Noun/な-adj: でした / じゃなかったです\nVerb: ました / ませんでした",
        "examples": [
          { "japanese": "昨日、日本語を勉強しました。", "romaji": "Kinō, nihongo wo benkyō shimashita.", "english": "I studied Japanese yesterday." },
          { "japanese": "昨日の夜、寝ませんでした。", "romaji": "Kinō no yoru, nemasen deshita.", "english": "I did not sleep last night." },
          { "japanese": "子供の時、元気でした。", "romaji": "Kodomo no toki, genki deshita.", "english": "I was energetic when I was a child." },
          { "japanese": "映画はあまり面白くなかったです。", "romaji": "Eiga wa amari omoshiroku nakatta desu.", "english": "The movie wasn't very interesting." }
        ],
        "notes": "For い-adjectives: the past tense is ～かったです (not でした). 面白い → 面白かったです (was interesting). The negative past is ～くなかったです. This is covered more in Lesson 5.",
        "practice": [
          { "type": "fill-in-blanks", "question": "きのうは日曜日（　）。(past affirmative)", "answer": "でした" },
          { "type": "translation", "question": "Translate: 'I watched a movie.'", "answer": "映画を見ました。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 5",
    "lessonTitle": "A Trip to Okinawa",
    "lessonJapanese": "沖縄旅行",
    "grammar": [
      {
        "title": "い-Adjective Conjugation — All Four Forms",
        "explanation": "Japanese adjectives are very different from English ones — they conjugate, meaning they change form to show tense and negation, just like verbs do. There are two types: い-adjectives and な-adjectives.\n\nい-adjectives always end in い in their dictionary form (おもしろい, たかい, さむい). They conjugate by changing or adding to the end of the adjective:\n\n【Present tense】\n• Affirmative: [adjective]い + です\n  おもしろいです → It is interesting.\n• Negative: Drop い, add くない + です\n  おもしろくないです → It is not interesting.\n\n【Past tense】\n• Affirmative: Drop い, add かった + です\n  おもしろかったです → It was interesting.\n• Negative: Drop い, add くなかった + です\n  おもしろくなかったです → It was not interesting.\n\n⚠️ Special exception — いい (good / nice):\nいい is irregular. In all forms except the plain present affirmative, it becomes よ:\n• いい → よくない (not good)\n• いい → よかった (was good)\n• いい → よくなかった (was not good)\nNever say いくない or いかった — these are wrong.\n\nWhen い-adjectives modify nouns directly, they keep their い:\n• たかいビル = a tall building\n• おもしろい映画 = an interesting movie",
        "structure": "Present: [adj]い + です / [adj]くないです\nPast: [adj]かったです / [adj]くなかったです",
        "examples": [
          { "japanese": "このお茶は熱いです。", "romaji": "Kono ocha wa atsui desu.", "english": "This tea is hot." },
          { "japanese": "その映画は面白くなかったです。", "romaji": "Sono eiga wa omoshiroku nakatta desu.", "english": "That movie was not interesting." },
          { "japanese": "昨日は寒かったです。", "romaji": "Kinō wa samukatta desu.", "english": "It was cold yesterday." },
          { "japanese": "テストはよかったです。", "romaji": "Tesuto wa yokatta desu.", "english": "The test went well. (よかった = was good)" }
        ],
        "notes": "よかった！ (Yokatta!) is one of the most commonly heard expressions in Japanese — 'That's great!', 'I'm glad!', 'What a relief!' Literally it means 'it was good'. You'll hear this constantly.",
        "practice": [
          { "type": "translation", "question": "Translate: 'The test was difficult.' (むずかしい)", "answer": "テストは難しかったです。" },
          { "type": "conjugate", "question": "Conjugate いい into past negative.", "answer": "よくなかったです" }
        ]
      },
      {
        "title": "な-Adjective Conjugation",
        "explanation": "The second type of adjective in Japanese is the な-adjective (also called adjectival nouns or no-adjectives in some textbooks). Despite being called adjectives, they behave grammatically much more like nouns than like い-adjectives.\n\nExamples of common な-adjectives:\nきれい (pretty, clean), 静か (quiet), 好き (like), 嫌い (dislike), 有名 (famous), 便利 (convenient), 大切 (important), 元気 (healthy/energetic), 大丈夫 (okay, fine)\n\nな-adjectives conjugate exactly like nouns with です:\n\n• Present affirmative: [な-adj] + です\n  静かです → It is quiet.\n• Present negative: [な-adj] + じゃないです\n  静かじゃないです → It is not quiet.\n• Past affirmative: [な-adj] + でした\n  静かでした → It was quiet.\n• Past negative: [な-adj] + じゃなかったです\n  静かじゃなかったです → It was not quiet.\n\nWhen a な-adjective modifies a noun directly, you add な between the adjective and the noun:\n• 静かな公園 = a quiet park\n• きれいな人 = a pretty person\n• 有名なレストラン = a famous restaurant\n\nThis is where the name 'な-adjective' comes from — the な that appears before nouns.",
        "structure": "Predicate: [な-adj] + です / じゃないです / でした / じゃなかったです\nModifying: [な-adj] + な + [Noun]",
        "examples": [
          { "japanese": "ここは静かです。", "romaji": "Koko wa shizuka desu.", "english": "It is quiet here." },
          { "japanese": "静かな公園が好きです。", "romaji": "Shizuka na kōen ga suki desu.", "english": "I like quiet parks." },
          { "japanese": "この町は有名じゃないです。", "romaji": "Kono machi wa yūmei ja nai desu.", "english": "This town is not famous." },
          { "japanese": "子供の時、元気でした。", "romaji": "Kodomo no toki, genki deshita.", "english": "I was energetic when I was a child." }
        ],
        "notes": "Be careful: きれい ends in い but it is a な-adjective, NOT an い-adjective. You say きれいな (not きれいい) before a noun, and きれいじゃないです (not きれいくないです) for negation. When in doubt, check if an adjective is い or な in a dictionary.",
        "practice": [
          { "type": "fill-in-blanks", "question": "きれい（　）海に行きました。(beautiful sea)", "answer": "な" },
          { "type": "translation", "question": "Translate: 'Tokyo is a famous city.'", "answer": "東京は有名な町です。" }
        ]
      },
      {
        "title": "好き / 嫌い / 上手 / 下手 — Likes, Dislikes, Skills",
        "explanation": "好き (suki, to like), 嫌い (kirai, to dislike), 上手 (jōzu, good at), 下手 (heta, bad at) are all な-adjectives in Japanese. However, they have a unique grammatical feature: the object of these feelings is marked with が, not を.\n\nThis is counterintuitive for English speakers. In English: 'I like cats' — 'cats' is the object → might expect を. But in Japanese: 私は猫が好きです — が marks cats. Why? Because 好き functions like 'cats are likeable to me' rather than 'I do-like cats'.\n\nStructure: [Person] は [Object] が 好き/嫌い/上手/下手 です\n\nIntensifiers:\n• 大好き (daisuki) = love, really like\n• 大嫌い (daikirai) = hate, really dislike\n• 得意 (tokui) = good at, comfortable with (similar to 上手 but more subjective)\n• 苦手 (nigate) = not good at, uncomfortable with (similar to 下手 but softer)\n\nQuestion form: [Object] が好きですか → Do you like [object]?\nMore natural: [Object] は好きですか → Do you like [object]? (は used for contrast or known topics)",
        "structure": "[Person] は [Item] が 好き / 嫌い / 上手 / 下手 です。",
        "examples": [
          { "japanese": "私は猫が好きです。", "romaji": "Watashi wa neko ga suki desu.", "english": "I like cats." },
          { "japanese": "ロバートさんは野菜が大嫌いです。", "romaji": "Robāto-san wa yasai ga daikirai desu.", "english": "Robert hates vegetables." },
          { "japanese": "たけしさんはサッカーが上手です。", "romaji": "Takeshi-san wa sakkā ga jōzu desu.", "english": "Takeshi is good at soccer." },
          { "japanese": "私は料理が下手です。", "romaji": "Watashi wa ryōri ga heta desu.", "english": "I am bad at cooking." }
        ],
        "notes": "When talking about someone else's skill, 上手 is used. It is generally not polite to say 上手 about yourself (sounds boastful). Use 得意 for yourself instead: 料理が得意です (I'm good at cooking).",
        "practice": [
          { "type": "translation", "question": "Translate: 'I love Japanese food.'", "answer": "私は日本食が大好きです。" },
          { "type": "fill-in-blanks", "question": "私は日本語（　）好きです。", "answer": "が" }
        ]
      },
      {
        "title": "ましょう / ましょうか — Let's / Shall We",
        "explanation": "When you want to make a suggestion or proposal to do something together, Japanese uses ましょう or ましょうか.\n\nましょう (mashō): 'Let's do X'\nThis is a positive, confident suggestion. You're proposing an action and assuming the listener will go along. It's like saying 'Let's go!' rather than asking permission.\n• 行きましょう！→ Let's go!\n• 勉強しましょう。→ Let's study.\n\nましょうか (mashō ka): 'Shall we...? / Shall I...?'\nAdding か turns it into a question — you're asking the other person's opinion or offering to do something for them. It is softer and more considerate than ましょう alone.\n• どこで食べましょうか。→ Where shall we eat?\n• 手伝いましょうか。→ Shall I help you?\n\nFormation: Take the ます stem (verb stem) and add ましょう/ましょうか.\n• 食べます → 食べましょう\n• 行きます → 行きましょう\n• します → しましょう\n\nSocial note: Japanese communication tends to prefer the 'checking in' form (ましょうか) over the assertive form (ましょう) in many social situations. Asking 'shall we?' shows consideration for the other person.",
        "structure": "[Verb stem] + ましょう\n[Verb stem] + ましょうか",
        "examples": [
          { "japanese": "一緒に図書館で勉強しましょう。", "romaji": "Issho ni toshokan de benkyō shimashō.", "english": "Let's study at the library together." },
          { "japanese": "どこで食べましょうか。", "romaji": "Doko de tabemashō ka?", "english": "Where shall we eat?" },
          { "japanese": "そろそろ帰りましょうか。", "romaji": "Sorosoro kaerimashō ka?", "english": "Shall we head home soon?" }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'Let's drink coffee.'", "answer": "コーヒーを飲みましょう。" },
          { "type": "translation", "question": "Translate: 'Shall we watch a movie?'", "answer": "映画を見ましょうか。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 6",
    "lessonTitle": "A Day in Robert's Life",
    "lessonJapanese": "ロバートの一日",
    "grammar": [
      {
        "title": "The Te-form — Japanese's Most Versatile Verb Form",
        "explanation": "The te-form is arguably the most important verb form in Japanese. It is not a tense by itself — instead, it is a 'connector' form that links verbs and adjectives to other grammar patterns. You will use the te-form constantly.\n\nForming the te-form:\n\n【Ru-verbs (Group 1)】Simply drop る and add て:\n• 食べる → 食べて\n• 見る → 見て\n• 起きる → 起きて\n\n【U-verbs (Group 2)】The ending changes based on the final sound:\n• う, つ, る ending → って (double て)\n  買う→買って、待つ→待って、帰る→帰って\n• む, ぶ, ぬ ending → んで\n  飲む→飲んで、遊ぶ→遊んで、死ぬ→死んで\n• く ending → いて\n  書く→書いて、聞く→聞いて\n• ぐ ending → いで\n  泳ぐ→泳いで\n• す ending → して\n  話す→話して\n⚠️ Exception: 行く→行って (not 行いて)\n\n【Irregular verbs】\n• する → して\n• くる → きて\n\nBy itself, the te-form ending a sentence sounds abrupt or unfinished. It needs to be followed by something — another verb, ください, いる, etc. Its main uses include:\n1. Connecting sequential actions (and then...)\n2. Making requests (～てください)\n3. Expressing ongoing actions (～ている)\n4. Granting permission (～てもいい)\n5. Prohibiting (～てはいけない)",
        "structure": "Ru-verb: Drop る + て\nU-verb: various changes (see above)\nIrregular: する→して、くる→きて",
        "examples": [
          { "japanese": "食べる → 食べて", "romaji": "taberu → tabete", "english": "eat → (te-form)" },
          { "japanese": "飲む → 飲んで", "romaji": "nomu → nonde", "english": "drink → (te-form)" },
          { "japanese": "書く → 書いて", "romaji": "kaku → kaite", "english": "write → (te-form)" },
          { "japanese": "話す → 話して", "romaji": "hanasu → hanashite", "english": "speak → (te-form)" }
        ],
        "notes": "Mastering te-form conjugation takes practice. Many learners find it helpful to learn through singing/chanting the endings in groups: う/つ/る→って、む/ぶ/ぬ→んで、く→いて、ぐ→いで、す→して.",
        "practice": [
          { "type": "conjugate", "question": "書く → Te-form？", "answer": "書いて" },
          { "type": "conjugate", "question": "飲む → Te-form？", "answer": "飲んで" },
          { "type": "conjugate", "question": "する → Te-form？", "answer": "して" }
        ]
      },
      {
        "title": "～てください — Making Polite Requests",
        "explanation": "One of the most immediately useful patterns in Japanese: te-form + ください.\n\nください alone comes from the verb くださる (to give — honorific), meaning something like 'please give me [the action of]'. So literally, ～てください means 'please do ~ for me'. In practice, it is simply a polite request: 'Please do ~'.\n\nThis pattern is used constantly:\n• In classrooms: 読んでください (Please read)\n• In stores: ちょっと待ってください (Please wait a moment)\n• On signs: 入らないでください (Please do not enter)\n\nTo make it softer/more polite, add ちょっと or すみません before the request:\n• すみません、もう一度言ってください。\n  Excuse me, please say that one more time.\n\nStrength levels of requests:\n• てください — polite request (appropriate in most situations)\n• てくださいませんか — very polite, almost deferential ('Would you please be so kind as to...')\n• て (alone) — casual imperative, used among very close friends\n\nNegative request (please don't ~): Use ～ないでください (covered in Lesson 8)",
        "structure": "[Te-form] + ください。",
        "examples": [
          { "japanese": "漢字を書いてください。", "romaji": "Kanji wo kaite kudasai.", "english": "Please write the kanji." },
          { "japanese": "ちょっと待ってください。", "romaji": "Chotto matte kudasai.", "english": "Please wait a moment." },
          { "japanese": "ゆっくり話してください。", "romaji": "Yukkuri hanashite kudasai.", "english": "Please speak slowly." },
          { "japanese": "もう一度言ってください。", "romaji": "Mō ichido itte kudasai.", "english": "Please say it one more time." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Please read this book.'", "answer": "この本を読んでください。" },
          { "type": "sentence-creation", "question": "Ask someone to please write their name.", "answer": "名前を書いてください。" }
        ]
      },
      {
        "title": "～てもいいです — Asking for and Giving Permission",
        "explanation": "To ask if something is permitted or allowed, Japanese uses the te-form + もいいですか. To grant permission, use もいいです (without か).\n\nLiterally, this pattern says 'Is it okay if [action]?' — it's asking whether doing the action is acceptable.\n\n• Request permission: [Te-form] + もいいですか\n  写真を撮ってもいいですか → May I take a photo?\n\n• Grant permission: [Te-form] + もいいです\n  はい、撮ってもいいです → Yes, you may take a photo.\n\n• Refuse permission (politely):\n  ちょっと… (that's a bit...) — indirect soft refusal\n  いいえ、撮らないでください → No, please don't take photos.\n\nIn more formal situations, you might hear:\n• もよろしいですか — even more polite version of もいいですか\n\nThis pattern reflects a fundamental aspect of Japanese culture: asking for permission is seen as respectful and considerate, whereas doing something without asking can be seen as presumptuous.",
        "structure": "[Te-form] + もいいですか。(question)\n[Te-form] + もいいです。(permission)",
        "examples": [
          { "japanese": "テレビを見てもいいですか。", "romaji": "Terebi wo mite mo ii desu ka?", "english": "May I watch TV?" },
          { "japanese": "はい、見てもいいですよ。", "romaji": "Hai, mite mo ii desu yo.", "english": "Yes, you may watch it." },
          { "japanese": "ここに座ってもいいですか。", "romaji": "Koko ni suwatte mo ii desu ka?", "english": "May I sit here?" },
          { "japanese": "日本語で話してもいいですか。", "romaji": "Nihongo de hanashite mo ii desu ka?", "english": "Is it okay if I speak in Japanese?" }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Ask for permission to take a picture. (写真をとる)", "answer": "写真をとってもいいですか。" },
          { "type": "translation", "question": "Translate: 'May I use this dictionary?'", "answer": "この辞書を使ってもいいですか。" }
        ]
      },
      {
        "title": "～てはいけません — Prohibition",
        "explanation": "The opposite of もいいです is てはいけません — used to prohibit an action, meaning 'you must not...' or 'it is not allowed to...'.\n\nStructure: Te-form + はいけません\n\nThe は here is the contrastive particle (not the topic は). The phrase いけません comes from the verb いける meaning 'to be okay/allowed'. With は (contrasting), it means 'it will not do' or 'it is not okay'.\n\nThis form is quite strong and definitive — it's used for:\n• Official rules and prohibitions\n• Strict parental instructions\n• Signs and notices\n\nFor slightly softer prohibition: ～てはだめです (more informal)\nFor written notices: ～てはなりません (more formal/literary)\n\nComparing permission and prohibition:\n• 入ってもいいです → You may enter.\n• 入ってはいけません → You must not enter.\n• 入らないでください → Please don't enter. (request, softer)",
        "structure": "[Te-form] + はいけません。",
        "examples": [
          { "japanese": "ここで写真を撮ってはいけません。", "romaji": "Koko de shashin wo totte wa ikemasen.", "english": "You must not take pictures here." },
          { "japanese": "クラスで食べてはいけません。", "romaji": "Kurasu de tabete wa ikemasen.", "english": "You must not eat in class." },
          { "japanese": "図書館でしゃべってはいけません。", "romaji": "Toshokan de shabette wa ikemasen.", "english": "You must not talk in the library." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'You must not use a cell phone in class.'", "answer": "クラスで携帯を使ってはいけません。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 7",
    "lessonTitle": "Family Picture",
    "lessonJapanese": "家族の写真",
    "grammar": [
      {
        "title": "～ています — Ongoing Action and Resultant State",
        "explanation": "Te-form + います (ている) is one of the most important and nuanced patterns in Japanese. English speakers initially translate it as '-ing' (I am eating), but this misses half its meaning.\n\nている has TWO distinct uses:\n\n【Use 1: Action in Progress Right Now】\nFor action verbs (verbs that describe an action with a clear start and end), ている describes the action happening at this moment:\n• 食べています → I am eating (right now)\n• 勉強しています → I am studying (right now)\n• 雨が降っています → It is raining\n\n【Use 2: Resultant State】\nFor verbs that describe a change of state or a momentary action, ている describes the state that results AFTER the action is complete:\n• 結婚しています → He is married (the state resulting from having gotten married)\n• 住んでいます → I live in [place] (the state resulting from having moved there)\n• 眼鏡をかけています → She is wearing glasses (the state of having put them on)\n• 死んでいます → It is dead (the state resulting from having died)\n\nThis is a profound conceptual difference. Japanese focuses on 'what state has resulted', while English focuses on 'what action is happening'. Both are captured by ている.\n\nShort form (casual): ている often contracts to てる in spoken Japanese:\n• 食べている → 食べてる\n• 何してる？→ What are you doing?",
        "structure": "[Te-form] + います",
        "examples": [
          { "japanese": "スーさんは今勉強しています。", "romaji": "Sū-san wa ima benkyō shite imasu.", "english": "Sue is studying right now." },
          { "japanese": "山下先生は結婚しています。", "romaji": "Yamashita-sensei wa kekkon shite imasu.", "english": "Professor Yamashita is married." },
          { "japanese": "私は東京に住んでいます。", "romaji": "Watashi wa Tōkyō ni sunde imasu.", "english": "I live in Tokyo." },
          { "japanese": "外で雨が降っています。", "romaji": "Soto de ame ga futte imasu.", "english": "It is raining outside." }
        ],
        "notes": "A classic example to understand the two uses: 行く (to go) vs. 来る (to come). 行っています doesn't mean 'I am going' — it means 'I have gone [and am still there]'. 来ています means 'He has come [and is here now]'.",
        "practice": [
          { "type": "translation", "question": "Translate: 'I am reading a book now.'", "answer": "私は今本を読んでいます。" },
          { "type": "fill-in-blanks", "question": "田中さんは東京に（　）。(lives in Tokyo)", "answer": "住んでいます" }
        ]
      },
      {
        "title": "X は Y が [Adjective] — Describing Physical Attributes",
        "explanation": "This pattern looks unusual at first: a sentence with both は AND が. Understanding it reveals something important about how Japanese thinks about descriptions.\n\nIn English: 'Mary has long hair' or 'Mary's hair is long.'\nIn Japanese: メアリーさんは髪が長いです。\n\nLiterally this says: 'As for Mary — hair is long.' Mary is the overall topic (は), and 'hair' is the subject of the property being described (が).\n\nThis pattern is used when:\n• Describing physical features of people or animals\n• Describing parts of objects\n• The English equivalent often uses 'has' + adjective\n\nCommon examples:\n• 背が高い → tall (height is high)\n• 背が低い → short\n• 髪が長い → has long hair\n• 目が大きい → has big eyes\n• 足が速い → fast (legs are fast)\n• 頭がいい → smart (head is good)\n\nThis が is called the 'subject が' within a larger topic structure. The topic (は) sets the overall frame; the が marks what specifically has the property.",
        "structure": "[Person/Thing] は [Body Part/Attribute] が [Adjective]です。",
        "examples": [
          { "japanese": "メアリーさんは髪が長いです。", "romaji": "Mearī-san wa kami ga nagai desu.", "english": "Mary has long hair." },
          { "japanese": "トムさんは背が高いです。", "romaji": "Tomu-san wa se ga takai desu.", "english": "Tom is tall." },
          { "japanese": "あの子は目が大きいです。", "romaji": "Ano ko wa me ga ōkii desu.", "english": "That child has big eyes." },
          { "japanese": "キリンは首が長いです。", "romaji": "Kirin wa kubi ga nagai desu.", "english": "Giraffes have long necks." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'Elephants have long noses.' (ぞう = elephant, 鼻 = nose)", "answer": "ぞうは鼻が長いです。" }
        ]
      },
      {
        "title": "Verb Stem に 行く/来る/帰る — Going to Do Something",
        "explanation": "This pattern expresses the purpose of movement — why you are going, coming, or returning somewhere. It combines a verb stem with the direction particle に and a movement verb.\n\nStructure: [Destination] に [Action Verb Stem] に [Movement Verb]\n\nThe first に is the destination particle (to/toward the place). The second に marks the purpose (in order to do X).\n\nFor the purpose verb, you use the VERB STEM — the form that appears before ます:\n• 食べます → 食べ (stem)\n• 買います → 買い (stem)\n• 勉強します → 勉強し (stem)\n\nMovement verbs that follow:\n• 行く (iku) = to go\n• 来る (kuru) = to come\n• 帰る (kaeru) = to return, go back\n\nExamples:\n• デパートにかばんを買いに行きます。\n  I'm going to the department store to buy a bag.\n• 日本へ日本語を勉強しに来ました。\n  I came to Japan to study Japanese.\n• 家に昼ごはんを食べに帰ります。\n  I'll go back home to eat lunch.",
        "structure": "[Destination] に [Verb Stem] に 行く / 来る / 帰る",
        "examples": [
          { "japanese": "デパートにかばんを買いに行きました。", "romaji": "Depāto ni kaban wo kai ni ikimashita.", "english": "I went to the department store to buy a bag." },
          { "japanese": "日本へ日本語を勉強しに来ました。", "romaji": "Nihon e nihongo wo benkyō shi ni kimashita.", "english": "I came to Japan to study Japanese." },
          { "japanese": "友達の家に遊びに行きます。", "romaji": "Tomodachi no ie ni asobi ni ikimasu.", "english": "I'm going to my friend's house to hang out." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I went to Kyoto to take pictures.' (写真をとる)", "answer": "京都に写真を撮りに行きました。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 8",
    "lessonTitle": "Barbecue",
    "lessonJapanese": "バーベキュー",
    "grammar": [
      {
        "title": "Short Forms (Plain Forms) — The Foundation of Casual Japanese",
        "explanation": "Everything you've learned so far has been in the POLITE form — です, ます, ません, etc. Japanese, however, has two registers: polite (used with strangers, seniors, in formal settings) and plain/casual (used with close friends, family, in informal writing).\n\nThe plain forms are also called 'short forms' or 'dictionary forms'. They are essential for:\n1. Casual conversation with close friends\n2. Subordinate clauses (before と思います, から, etc.)\n3. Modifying nouns\n4. Many advanced grammar patterns\n\n【Verbs】\nPresent affirmative: dictionary form (食べる, 飲む, する)\nPresent negative: ない-form (食べない, 飲まない, しない)\n\nForming the ない-form (negative):\n• Ru-verbs: Drop る + ない → 食べる → 食べない\n• U-verbs: Change final 'u' sound to 'a' sound + ない\n  飲む→飲まない、書く→書かない、話す→話さない\n  ⚠️ Exception: ある (there is) → ない (not ある + ない)\n  ⚠️ Verbs ending in う: 買う→買わない (not 買あない)\n• Irregular: する→しない、くる→こない\n\n【い-adjectives】\nAffirmative: plain (高い, おもしろい)\nNegative: Drop い + くない (高くない, おもしろくない)\n\n【な-adjectives and Nouns】\nAffirmative: + だ (高価だ, 学生だ) — but だ is often dropped in practice\nNegative: + じゃない (高価じゃない, 学生じゃない)",
        "structure": "Verb: dict. form / ~ない\nい-adj: ~い / ~くない\nな-adj/Noun: ~だ / ~じゃない",
        "examples": [
          { "japanese": "食べる / 食べない", "romaji": "taberu / tabenai", "english": "Eat / Don't eat" },
          { "japanese": "行く / 行かない", "romaji": "iku / ikanai", "english": "Go / Don't go" },
          { "japanese": "かわいい / かわいくない", "romaji": "kawaii / kawaikunai", "english": "Cute / Not cute" },
          { "japanese": "元気だ / 元気じゃない", "romaji": "genki da / genki ja nai", "english": "Energetic / Not energetic" }
        ],
        "notes": "In actual casual conversation, the だ after な-adjectives and nouns is frequently dropped: 元気？ (How are you? / Are you well?) rather than 元気だ。",
        "practice": [
          { "type": "conjugate", "question": "行く → negative short form", "answer": "行かない" },
          { "type": "conjugate", "question": "食べる → negative short form", "answer": "食べない" },
          { "type": "conjugate", "question": "する → negative short form", "answer": "しない" }
        ]
      },
      {
        "title": "～と思います — Expressing Opinions and Thoughts",
        "explanation": "To express what you think or believe, Japanese uses [plain form] + と思います.\n\nと here is a quotation particle — it marks what follows as the content of thought or speech. 思います (omoimasu) means 'think'. So the literal meaning is: '[I] think [that: plain form statement]'.\n\nCritical rule: The verb/adjective before と must be in the PLAIN (short) form, not the polite form. This is because it's acting as a quoted thought, not a polite sentence on its own.\n\nCorrect: 難しいと思います。(I think it is difficult.)\nWrong: 難しいですと思います。\n\nFor な-adjectives and nouns in the present tense, add だ before と:\n• 静かだと思います (I think it is quiet)\n• 学生だと思います (I think he is a student)\n\nNegative opinions: Make the plain form negative, then add と思います:\n• 行かないと思います (I don't think I'll go / I think I won't go)\n\nFor first person, と思います is common. For second/third person (what others think), と思っています (ongoing thought) is more accurate.",
        "structure": "[Plain form] + と思います",
        "examples": [
          { "japanese": "明日雨が降ると思います。", "romaji": "Ashita ame ga furu to omoimasu.", "english": "I think it will rain tomorrow." },
          { "japanese": "漢字は難しいと思います。", "romaji": "Kanji wa muzukashii to omoimasu.", "english": "I think Kanji is difficult." },
          { "japanese": "あの映画は面白くないと思います。", "romaji": "Ano eiga wa omoshirokunai to omoimasu.", "english": "I don't think that movie is interesting." },
          { "japanese": "試験は簡単だと思います。", "romaji": "Shiken wa kantan da to omoimasu.", "english": "I think the exam is easy." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I think Japanese is fun.'", "answer": "日本語は楽しいと思います。" },
          { "type": "fill-in-blanks", "question": "明日は晴れる（　）思います。", "answer": "と" }
        ]
      },
      {
        "title": "～のが好きです / 上手です — Verb Nominalization with の",
        "explanation": "In Japanese, you can turn an entire verb clause into a noun by adding の after it. This process is called nominalization. The result can then be used anywhere a noun can be used — as a subject, object, or topic.\n\nThe short (plain) form of the verb + の = a noun meaning 'the act of [doing verb]'\n\n• 音楽を聞く + の = 音楽を聞くの (the act of listening to music)\n• 日本語を話す + の = 日本語を話すの (speaking Japanese)\n\nThen this nominalized phrase can be the subject of a sentence:\n• 音楽を聞くのが好きです。→ I like listening to music.\n• 日本語を話すのが難しいです。→ Speaking Japanese is difficult.\n• 料理するのが上手です。→ I am good at cooking.\n\nが after の is the same subject-marking が. The nominalized phrase is the subject of the predicate that follows.\n\nThis pattern works with any adjective or expression that takes が:\n• ～のが好きです (like doing ~)\n• ～のが嫌いです (dislike doing ~)\n• ～のが上手です (good at doing ~)\n• ～のが下手です (bad at doing ~)\n• ～のが難しいです (doing ~ is difficult)\n• ～のが楽しいです (doing ~ is fun)",
        "structure": "[Verb plain form] + のが [Adjective/Expression]",
        "examples": [
          { "japanese": "私は音楽を聞くのが好きです。", "romaji": "Watashi wa ongaku wo kiku no ga suki desu.", "english": "I like listening to music." },
          { "japanese": "メアリーさんは日本語を話すのが上手です。", "romaji": "Mearī-san wa nihongo wo hanasu no ga jōzu desu.", "english": "Mary is good at speaking Japanese." },
          { "japanese": "料理するのが楽しいです。", "romaji": "Ryōri suru no ga tanoshii desu.", "english": "Cooking is fun." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I hate cleaning my room.' (部屋を掃除する)", "answer": "私は部屋を掃除するのが嫌いです。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 9",
    "lessonTitle": "Kabuki",
    "lessonJapanese": "歌舞伎",
    "grammar": [
      {
        "title": "Past Short Forms — た-form and なかった-form",
        "explanation": "Just as present short forms are the foundation for many grammar patterns, you also need past short forms for patterns like と思います (past), noun modification, and more.\n\nVerb past short forms are formed using the た-form (also called ta-form). The good news: the rules for forming the た-form are almost identical to the て-form rules — just replace て/で with た/だ:\n\n【Ru-verbs】Drop る + た:\n• 食べる → 食べた\n• 見る → 見た\n\n【U-verbs】Same pattern as て-form:\n• う, つ, る → った: 買う→買った, 待つ→待った\n• む, ぶ, ぬ → んだ: 飲む→飲んだ, 遊ぶ→遊んだ\n• く → いた: 書く→書いた\n• ぐ → いだ: 泳ぐ→泳いだ\n• す → した: 話す→話した\n⚠️ 行く → 行った (exception)\n\n【Irregular】\n• する → した\n• くる → きた\n\nPast negative short form — just use なかった after the negative base:\n• 食べなかった (didn't eat)\n• 行かなかった (didn't go)\n• しなかった (didn't do)\n\nAdjectives and nouns:\n• い-adj: ～かった / ～くなかった\n• な-adj/Noun: ～だった / ～じゃなかった",
        "structure": "Verb: た-form / なかった-form\nい-adj: かった / くなかった\nな-adj/Noun: だった / じゃなかった",
        "examples": [
          { "japanese": "食べた / 食べなかった", "romaji": "tabeta / tabenakatta", "english": "Ate / Did not eat" },
          { "japanese": "行った / 行かなかった", "romaji": "itta / ikanakatta", "english": "Went / Did not go" },
          { "japanese": "面白かった / 面白くなかった", "romaji": "omoshirokatta / omoshirokunakatta", "english": "Was interesting / Was not interesting" }
        ],
        "practice": [
          { "type": "conjugate", "question": "飲む → past affirmative short form", "answer": "飲んだ" },
          { "type": "conjugate", "question": "する → past negative short form", "answer": "しなかった" }
        ]
      },
      {
        "title": "Relative Clauses — Qualifying Nouns with Verb Phrases",
        "explanation": "One of the most powerful features of Japanese grammar: you can place an entire sentence before a noun to describe or modify it, just like an adjective. This is called a relative clause.\n\nIn English, relative clauses come AFTER the noun:\n'The restaurant that I often go to' → the clause 'that I often go to' comes after 'restaurant'\n\nIn Japanese, the clause comes BEFORE the noun:\n私がよく行くレストラン → '[I often go to] restaurant' → the clause modifies from the left.\n\nThe verb in the modifying clause must be in the SHORT (plain) form, not the polite form.\n\nPresent: 昨日買った本 → the book [that I bought yesterday]\nPast: よく行くレストラン → the restaurant [that I often go to]\n\nVery important: Inside the modifying clause, the subject is often marked with が instead of は:\n• 私がよく行くレストラン → The restaurant that I often go to\n(If は were used: 私はよく行くレストラン — this sounds odd/incomplete)\n\nThis pattern is used constantly in natural Japanese to add detail and specificity to nouns.",
        "structure": "[Short form clause] + [Noun]",
        "examples": [
          { "japanese": "私がよく行くレストラン", "romaji": "Watashi ga yoku iku resutoran", "english": "The restaurant that I often go to" },
          { "japanese": "昨日買った本を読みました。", "romaji": "Kinō katta hon wo yomimashita.", "english": "I read the book that I bought yesterday." },
          { "japanese": "コーヒーを飲んでいる人は山田さんです。", "romaji": "Kōhī wo nonde iru hito wa Yamada-san desu.", "english": "The person who is drinking coffee is Mr. Yamada." },
          { "japanese": "日本語が話せる学生は少ないです。", "romaji": "Nihongo ga hanaseru gakusei wa sukunai desu.", "english": "There are few students who can speak Japanese." }
        ],
        "notes": "Unlike English, Japanese does not use relative pronouns like 'who', 'which', or 'that'. The clause simply sits before the noun directly.",
        "practice": [
          { "type": "translation", "question": "Translate: 'The person who is drinking coffee is Mr. Yamada.'", "answer": "コーヒーを飲んでいる人は山田さんです。" }
        ]
      },
      {
        "title": "～から — Giving a Reason (Because)",
        "explanation": "から (kara) at the end of a clause means 'because' or 'since', providing the reason for what comes in the main clause.\n\nCritical word order difference from English:\nIn English: 'I won't go BECAUSE I am busy.'\nIn Japanese: 'Busy だ から, I won't go.' → [Reason] から、[Result].\n\nThe reason comes FIRST. This reflects a general Japanese tendency to provide context before the conclusion.\n\nから follows the short/plain form of verbs and adjectives when used in casual speech, or the polite form in formal contexts:\n• 忙しいから、行きません。(casual reason, polite result)\n• 忙しいですから、行きません。(polite reason, polite result — more formal)\n\nFor な-adjectives and nouns in the present tense, add だ before から (casual) or です before から (polite):\n• 学生だから → because [I am] a student\n• 日曜日だから → because it's Sunday\n\nから vs. ので:\nBoth mean 'because'. から is more casual and subjective (my personal reason). ので is more formal, objective, and softens the causal relationship. Both are essential to learn.",
        "structure": "[Reason clause] から、[Result/Main clause]。",
        "examples": [
          { "japanese": "忙しいから、行きません。", "romaji": "Isogashii kara, ikimasen.", "english": "Because I am busy, I won't go." },
          { "japanese": "明日テストがあるから、勉強します。", "romaji": "Ashita tesuto ga aru kara, benkyō shimasu.", "english": "Because I have a test tomorrow, I will study." },
          { "japanese": "日本語が好きだから、日本に来ました。", "romaji": "Nihongo ga suki da kara, Nihon ni kimashita.", "english": "Because I like Japanese, I came to Japan." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Because it was cold, I didn't go outside.'", "answer": "寒かったから、外に出ませんでした。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 10",
    "lessonTitle": "Winter Vacation Plans",
    "lessonJapanese": "冬休みの計画",
    "grammar": [
      {
        "title": "Comparison — AのほうがBより / AとBとどちらのほうが",
        "explanation": "Japanese has specific structures for making comparisons between two things.\n\n【Stating that A is more ~ than B】\nA のほうが B より [adjective] です。\n• より (yori) = than\n• のほうが = literally 'in the direction of A' → 'A [is more]'\n\nExample: 電車のほうがバスより速いです。\n→ Trains are faster than buses.\n\nYou can also say: AはBより[adjective]です\n→ 日本は中国より小さいです。(Japan is smaller than China.)\n\n【Asking which of two things is more ~】\nA と B と どちらのほうが [adjective] ですか。\n→ Which is more [adjective], A or B?\n\n• どちら (dochira) = which (of the two) — polite\n• どっち (docchi) = which (casual)\n\nExample:\n犬と猫とどちらのほうが好きですか。\n→ Which do you like more, dogs or cats?\nAnswer: 犬のほうが好きです。\n→ I like dogs more.\n\nWhen the comparison is obvious from context, you can omit the より phrase:\n「コーヒーとお茶とどちらがいいですか。」「コーヒーのほうがいいです。」\n'Which would you prefer, coffee or tea?' 'Coffee, please.'",
        "structure": "A のほうが B より [Adj]です。\nA と B と どちらのほうが [Adj] ですか。",
        "examples": [
          { "japanese": "中国と日本とどちらのほうが大きいですか。", "romaji": "Chūgoku to Nihon to dochira no hō ga ōkii desu ka?", "english": "Which is larger, China or Japan?" },
          { "japanese": "中国のほうが日本より大きいです。", "romaji": "Chūgoku no hō ga Nihon yori ōkii desu.", "english": "China is larger than Japan." },
          { "japanese": "電車のほうがバスより速いです。", "romaji": "Densha no hō ga basu yori hayai desu.", "english": "Trains are faster than buses." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Summer is hotter than spring.'", "answer": "夏のほうが春より暑いです。" }
        ]
      },
      {
        "title": "Superlative — のなかで～が一番",
        "explanation": "To say something is 'the most ~' among a group of three or more, Japanese uses the construction:\n[Group] の中で [Item] が 一番 [adjective] です。\n\n一番 (ichiban) literally means 'number one'. Placed before an adjective, it functions as a superlative ('the most', 'the -est'). の中で (no naka de) means 'among / within'.\n\nFull structure:\n[Group] の中で [Item] が 一番 [adjective] です。\n\nExample:\n果物の中でりんごが一番好きです。\n→ Among fruits, I like apples the most.\n\n【Asking superlative questions】\n[Group] の中で何/どれ/どこ/いつ/だれ が 一番 [adjective] ですか。\n\nExamples:\n• 食べ物の中で何が一番好きですか。→ What food do you like most?\n• クラスの中でだれが一番背が高いですか。→ Who is the tallest in the class?\n• 季節の中でいつが一番好きですか。→ Which season do you like most?\n\n一番 can also be used without の中で when the comparison group is understood from context.",
        "structure": "[Group] の中で [Item] が 一番 [Adj] です。",
        "examples": [
          { "japanese": "季節の中でいつが一番好きですか。", "romaji": "Kisetsu no naka de itsu ga ichiban suki desu ka?", "english": "Which season do you like the most?" },
          { "japanese": "秋が一番好きです。", "romaji": "Aki ga ichiban suki desu.", "english": "I like autumn the most." },
          { "japanese": "クラスの中で山田さんが一番背が高いです。", "romaji": "Kurasu no naka de Yamada-san ga ichiban se ga takai desu.", "english": "Mr. Yamada is the tallest in the class." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'Among fruits, I like apples the most.'", "answer": "果物の中でりんごが一番好きです。" }
        ]
      },
      {
        "title": "～つもりです — Expressing Plans and Intentions",
        "explanation": "つもりです (tsumori desu) expresses a firm personal plan or intention — something you have already decided to do. It is more certain than 'thinking about doing' but less guaranteed than 'definitely will do'.\n\nFormation:\n• Plain form (present) + つもりです → plan to do ~\n• ない-form (negative) + つもりです → plan not to do ~\n\n明日映画を見るつもりです。\n→ I plan to watch a movie tomorrow.\n今日は勉強しないつもりです。\n→ I intend not to study today.\n\nつもり refers to the speaker's OWN intention. You cannot use it to state someone else's plans (use だろうと思います or 予定です for that).\n\nCompare different intention/plan expressions:\n• ～つもりです — firm personal intention/plan\n• ～と思っています — thinking of doing, considering\n• ～予定です (yotei desu) — scheduled, planned (on a calendar)\n• ～ましょうか — 'shall I/we' (lighter suggestion)\n\nつもりだった (past form) = 'I had intended to (but didn't)'\n• 行くつもりだったけど、行きませんでした。\n  I had planned to go, but I didn't.",
        "structure": "[Verb plain form] + つもりです\n[Verb ない-form] + つもりです",
        "examples": [
          { "japanese": "明日、映画を見るつもりです。", "romaji": "Ashita, eiga wo miru tsumori desu.", "english": "I plan to see a movie tomorrow." },
          { "japanese": "今日は勉強しないつもりです。", "romaji": "Kyō wa benkyō shinai tsumori desu.", "english": "I intend not to study today." },
          { "japanese": "来年、日本に行くつもりです。", "romaji": "Rainen, Nihon ni iku tsumori desu.", "english": "I plan to go to Japan next year." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I plan to go to Japan next year.'", "answer": "来年、日本に行くつもりです。" }
        ]
      },
      {
        "title": "Adjective/Noun + なる — To Become",
        "explanation": "なる (naru) is a verb meaning 'to become'. When attached to adjectives and nouns, it expresses a change of state — something becoming a certain way.\n\nThe attachment rules follow the adjective type:\n\n【い-adjectives】Drop the final い and add くなる:\n• 暖かい (warm) → 暖かくなる (become warm)\n• 面白い (interesting) → 面白くなる (become interesting)\n• いい (good) → よくなる (become better)\n\n【な-adjectives】Drop な and add になる:\n• 静か (quiet) → 静かになる (become quiet)\n• 有名 (famous) → 有名になる (become famous)\n\n【Nouns】Add になる directly:\n• 先生 (teacher) → 先生になる (become a teacher)\n• 大人 (adult) → 大人になる (become an adult)\n\nなる conjugates as a regular U-verb:\n• Present: なります\n• Past: なりました\n• Te-form: なって\n\nThis pattern is very natural in describing seasonal changes, life changes, improvements, and transformations:\n• 春になりました。→ Spring has come (it has become spring).\n• 日本語が上手になりました。→ My Japanese has gotten better.",
        "structure": "[い-adj base] + くなる\n[な-adj/Noun] + になる",
        "examples": [
          { "japanese": "暖かくなりました。", "romaji": "Atatakaku narimashita.", "english": "It has become warm." },
          { "japanese": "メアリーさんは先生になります。", "romaji": "Mearī-san wa sensei ni narimasu.", "english": "Mary will become a teacher." },
          { "japanese": "日本語が上手になりたいです。", "romaji": "Nihongo ga jōzu ni naritai desu.", "english": "I want to become good at Japanese." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "静か（　）なりました。(It became quiet)", "answer": "に" },
          { "type": "conjugate", "question": "Transform: いい → 'become good'", "answer": "よくなる" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 11",
    "lessonTitle": "After the Vacation",
    "lessonJapanese": "休みのあと",
    "grammar": [
      {
        "title": "～たいです — Expressing Personal Desire (Want to Do)",
        "explanation": "When you want to express a desire to DO something (a verb action), Japanese uses the たい (tai) form. This is different from ほしい (hoshii), which is used for wanting a noun/object.\n\nForming たい: Take the verb STEM (the ます form minus ます) and add たい.\n• 食べます → 食べ (stem) → 食べたい (want to eat)\n• 行きます → 行き (stem) → 行きたい (want to go)\n• します → し (stem) → したい (want to do)\n\nたい conjugates exactly like an い-adjective:\n• Present affirmative: 食べたいです (want to eat)\n• Present negative: 食べたくないです (don't want to eat)\n• Past affirmative: 食べたかったです (wanted to eat)\n• Past negative: 食べたくなかったです (didn't want to eat)\n\nParticle with たい: The object of the verb can take either を OR が:\n• すしを食べたいです (want to eat sushi)\n• すしが食べたいです (want to eat sushi) — が often implies a stronger or more specific craving\n\nImportant social note: In Japanese, expressing another person's desire with たい can sound presumptuous or incorrect, because you cannot know another person's inner feelings directly. Instead:\n• Own desire: ～たいです ✓\n• Other person's desire: ～たがっています (appears to want) or ～たいと言っていました (said they want to)",
        "structure": "[Verb stem] + たいです / たくないです / たかったです",
        "examples": [
          { "japanese": "私は日本に行きたいです。", "romaji": "Watashi wa Nihon ni ikitai desu.", "english": "I want to go to Japan." },
          { "japanese": "何も食べたくないです。", "romaji": "Nani mo tabetakunai desu.", "english": "I don't want to eat anything." },
          { "japanese": "子供の時、先生になりたかったです。", "romaji": "Kodomo no toki, sensei ni naritakatta desu.", "english": "When I was a child, I wanted to become a teacher." }
        ],
        "notes": "たい is only for your own desires (first person). For second/third person desires, you need different expressions. This reflects the Japanese linguistic distinction between what you know from experience (your own feelings) and what you can only observe (others' behaviors).",
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I want to watch a movie.'", "answer": "映画を見たいです。" },
          { "type": "conjugate", "question": "食べたい → negative form", "answer": "食べたくない(です)" }
        ]
      },
      {
        "title": "～たり～たりする — Listing Actions Non-Exhaustively",
        "explanation": "When you want to describe multiple activities without claiming the list is complete, Japanese uses the たり～たりする pattern. The English equivalent is 'do things like A and B' or 'do A, B, and so on'.\n\nThis is fundamentally different from listing with て-form, which connects actions in a sequential, exhaustive way:\n• て-form: 起きて、シャワーを浴びて、学校へ行きます (specific sequence)\n• たり: 週末はゲームをしたり、映画を見たりします (among other things)\n\nForming たり: Use the た-form (past short form) and add り.\n• 食べた → 食べたり\n• 行った → 行ったり\n• した → したり\n\nThe final verb in the pattern is always する (in the appropriate tense):\n• 週末は買い物をしたり、映画を見たりします。\n  On weekends I do things like shopping and watching movies.\n\nThe key nuance is the 'among other things' feeling — you are giving examples, not a complete list. This makes conversations more natural and less rigid.",
        "structure": "[Verb た-form] り、[Verb た-form] り + する",
        "examples": [
          { "japanese": "週末は買い物をしたり、映画を見たりしました。", "romaji": "Shūmatsu wa kaimono wo shitari, eiga wo mitari shimashita.", "english": "Over the weekend, I did things like shopping and watching a movie." },
          { "japanese": "夏休みは泳いだり、山に登ったりしました。", "romaji": "Natsuyasumi wa oyoidari, yama ni nobottari shimashita.", "english": "During summer vacation, I did things like swimming and hiking." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Today I will read books and listen to music, etc.'", "answer": "今日は本を読んだり、音楽を聞いたりします。" }
        ]
      },
      {
        "title": "～ことがある — Have Had the Experience of Doing ~",
        "explanation": "To talk about past experiences — things you have done at least once in your life, without specifying when — Japanese uses the た-form + ことがある.\n\nことがある literally means 'there is the fact of [having done]'. こと turns the verb phrase into a noun (a 'nominalization'), and がある states that this fact exists.\n\n• 富士山に登ったことがあります。\n  I have climbed Mt. Fuji. (At some point in my life, the experience exists.)\n\n• ヨーロッパに行ったことがありません。\n  I have never been to Europe. (The experience does not exist.)\n\nThis is not about a recent past action — it's about whether the experience exists in your life history. It does NOT say when the experience happened.\n\nCompare:\n• 去年、富士山に登りました。(I climbed Mt. Fuji last year.) — specific past event\n• 富士山に登ったことがあります。(I have climbed Mt. Fuji.) — life experience\n\nTo ask about experience:\n• ～したことがありますか。→ Have you ever done ~?\n\nTo say you have NEVER done something:\n• ～したことがありません。or ～したことはありません。",
        "structure": "[Verb た-form] + ことがあります / ことがありません",
        "examples": [
          { "japanese": "富士山に登ったことがあります。", "romaji": "Fujisan ni nobotta koto ga arimasu.", "english": "I have climbed Mt. Fuji." },
          { "japanese": "ヨーロッパに行ったことがありません。", "romaji": "Yōroppa ni itta koto ga arimasen.", "english": "I have never been to Europe." },
          { "japanese": "寿司を食べたことがありますか。", "romaji": "Sushi wo tabeta koto ga arimasu ka?", "english": "Have you ever eaten sushi?" }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Ask: 'Have you ever eaten natto?'", "answer": "納豆を食べたことがありますか。" }
        ]
      }
    ]
  },

  {
    "lesson": "Lesson 12",
    "lessonTitle": "Feeling Ill",
    "lessonJapanese": "病気",
    "grammar": [
      {
        "title": "～んです — Explaining and Seeking Explanation",
        "explanation": "～んです (or ～のです in formal/written Japanese) is one of the most nuanced and 'native-sounding' patterns in Japanese. Beginner students often don't learn it until later, but it is incredibly common in natural conversation.\n\nThe core function of んです is to mark a sentence as an explanation, a background context, or a reason. It signals to the listener: 'I am providing you with background information' or 'this is the explanation for the situation'.\n\nThink of んです as adding the feeling of:\n• 'The thing is...' [explanation being offered]\n• 'It's because...' [reason being given]\n• 'What's happening is...' [context being shared]\n\nForming んです:\nPlain form + んです (or のです in formal writing)\n• Verb: 行くんです、食べたんです\n• い-adj: 寒いんです、よかったんです\n• な-adj: 元気なんです (な-adj keeps な before ん)\n• Noun: 学生なんです (noun + な before ん)\n\nExamples of when to use it:\n• Explaining why you're late: バスが来なかったんです。(The bus didn't come — explaining a situation)\n• Asking for explanation: どうして遅れたんですか。(Why were you late? — seeking an explanation)\n• Sharing relevant context: 明日テストがあるんです。(The thing is, I have a test tomorrow — giving context for an action)\n\nWithout んです: バスが来ませんでした。(factual statement — the bus didn't come)\nWith んです: バスが来なかったんです。(explanation — 'that's because the bus didn't come')",
        "structure": "[Plain form] + んです\n[な-adj/Noun] + なんです",
        "examples": [
          { "japanese": "どうして遅れたんですか。\nバスが来なかったんです。", "romaji": "Dōshite okureta n desu ka?\nBasu ga konakatta n desu.", "english": "Why were you late?\n(The reason is) the bus didn't come." },
          { "japanese": "明日テストがあるんです。", "romaji": "Ashita tesuto ga aru n desu.", "english": "It's because I have a test tomorrow. / The thing is, I have a test tomorrow." },
          { "japanese": "実は日本語を勉強しているんです。", "romaji": "Jitsu wa nihongo wo benkyō shite iru n desu.", "english": "Actually, the thing is, I'm studying Japanese." }
        ],
        "notes": "んです is particularly important in questions. どうしてですか is blunt and slightly rude. どうしてなんですか sounds more natural. And if you want to explain your behavior or situation, always consider using んです.",
        "practice": [
          { "type": "fill-in-blanks", "question": "雨が降っている（　）。(offering explanation that it's raining)", "answer": "んです" },
          { "type": "translation", "question": "Explain: 'The thing is, I am tired.' (つかれている)", "answer": "つかれているんです。" }
        ]
      },
      {
        "title": "～すぎる — Too Much / Excessively",
        "explanation": "すぎる (sugiru) attaches to verb stems and adjective bases to mean 'too much' or 'excessively'. It describes a state or action that goes beyond an appropriate or desirable level.\n\nFormation:\n\n【Verbs】Attach to the verb STEM (remove ます):\n• 食べます → 食べ + すぎる → 食べすぎる (eat too much)\n• 飲みます → 飲み + すぎる → 飲みすぎる (drink too much)\n• します → し + すぎる → しすぎる (do too much)\n\n【い-adjectives】Remove い and add すぎる:\n• 高い (expensive) → 高すぎる (too expensive)\n• 忙しい (busy) → 忙しすぎる (too busy)\n\n【な-adjectives】Remove な/だ and add すぎる:\n• 静か (quiet) → 静かすぎる (too quiet)\n• 複雑 (complicated) → 複雑すぎる (too complicated)\n\nすぎる itself conjugates as a Ru-verb:\n• 食べすぎます (eat too much)\n• 食べすぎました (ate too much)\n• 食べすぎて、気持ち悪いです。(I ate too much and feel sick.)\n\nすぎる is a very productive suffix — once learned, you can attach it to almost any verb or adjective.",
        "structure": "[Verb stem / Adj base] + すぎる",
        "examples": [
          { "japanese": "昨日、お酒を飲みすぎました。", "romaji": "Kinō, osake wo nomisugimashita.", "english": "I drank too much alcohol yesterday." },
          { "japanese": "この本は高すぎます。", "romaji": "Kono hon wa takasugimasu.", "english": "This book is too expensive." },
          { "japanese": "食べすぎて、お腹が痛いです。", "romaji": "Tabesugite, onaka ga itai desu.", "english": "I ate too much and my stomach hurts." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I ate too much.'", "answer": "食べすぎました。" },
          { "type": "conjugate", "question": "ねる (to sleep) → 'slept too much' (past polite)", "answer": "ねすぎました" }
        ]
      },
      {
        "title": "～ほうがいいです — Giving Advice (You Should / You'd Better)",
        "explanation": "ほうがいいです (hō ga ii desu) is used to give advice — telling someone it is better or advisable to do (or not do) something. The nuance is like English 'you should', 'you'd better', or 'it would be better if you...'.\n\nThe form of the verb before ほうがいい depends on whether the advice is positive or negative:\n\n【Affirmative advice — 'You should do ~'】\nUse the た-form (past plain form) + ほうがいいです\n• 早く寝たほうがいいですよ。→ You should sleep early.\n• 薬を飲んだほうがいいですよ。→ You should take medicine.\n\n【Negative advice — 'You shouldn't do ~'】\nUse the ない-form + ほうがいいです\n• タバコを吸わないほうがいいですよ。→ You shouldn't smoke.\n• あまり甘いものを食べないほうがいいですよ。→ You shouldn't eat too many sweets.\n\nWhy does affirmative use the past form (た)? It's thought to reflect a sense of confidence — 'having done X is better' (presenting it as a completed good action). This is one of those patterns that just needs to be memorized.\n\nAdding よ at the end softens the advice slightly and marks it as new information for the listener. Without よ it can sound more demanding.",
        "structure": "[Verb た-form] + ほうがいいですよ (affirmative advice)\n[Verb ない-form] + ほうがいいですよ (negative advice)",
        "examples": [
          { "japanese": "毎日運動したほうがいいですよ。", "romaji": "Mainichi undō shita hō ga ii desu yo.", "english": "You had better exercise every day." },
          { "japanese": "タバコを吸わないほうがいいですよ。", "romaji": "Tabako wo suwanai hō ga ii desu yo.", "english": "You had better not smoke." },
          { "japanese": "早く病院に行ったほうがいいですよ。", "romaji": "Hayaku byōin ni itta hō ga ii desu yo.", "english": "You should go to the hospital soon." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Give advice: 'You should sleep early.' (早く寝る)", "answer": "早く寝たほうがいいですよ。" }
        ]
      },
      {
        "title": "～なくちゃいけません / ～なければいけません — Must Do",
        "explanation": "These patterns express obligation — 'must do', 'have to do', 'need to do'. They are among the most common ways to express necessity in Japanese.\n\nFormation — start from the ない-form:\nStep 1: Take the ない-form (negative plain form)\nStep 2: Drop the final い → you get the 'neg base'\nStep 3: Add the obligation ending\n\n食べない → 食べな + くちゃいけない\n行かない → 行かな + ければいけない\n\n【Casual/Spoken forms】:\n• ～なくちゃいけません (most common in speech)\n• ～なくちゃ (very casual — just the first half)\n• ～なきゃいけません\n• ～なきゃ (very casual)\n\n【Formal/Written forms】:\n• ～なければいけません\n• ～なければなりません (most formal)\n\nAll mean essentially the same thing — 'must do'. The difference is just formality level.\n\nExamples:\n• 薬を飲まなくちゃいけません。→ I must take my medicine.\n• もっと勉強しなければなりません。→ I must study more. (formal)\n• 宿題しなきゃ！→ I gotta do my homework! (very casual)",
        "structure": "[Verb neg-base] + なくちゃいけません\n[Verb neg-base] + なければいけません",
        "examples": [
          { "japanese": "明日テストがあるから、勉強しなくちゃいけません。", "romaji": "Ashita tesuto ga aru kara, benkyō shinakucha ikemasen.", "english": "Because I have a test tomorrow, I must study." },
          { "japanese": "もっと野菜を食べなければいけません。", "romaji": "Motto yasai wo tabenakereb a ikemasen.", "english": "I must eat more vegetables." },
          { "japanese": "早く起きなきゃ！", "romaji": "Hayaku okinakya!", "english": "I gotta wake up early!" }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I must go to the hospital.'", "answer": "病院に行かなくちゃいけません。" },
          { "type": "fill-in-blanks", "question": "薬を飲ま（　）なりません。(must take medicine — formal)", "answer": "なければ" }
        ]
      },
      {
        "title": "～ので — Because / Since (Formal Reason)",
        "explanation": "ので (node) is similar to から in meaning 'because' or 'since', but with an important difference in nuance and usage.\n\nから vs. ので:\n• から = subjective reason. 'Because I personally think/feel this is the reason.' More casual. Can sound a bit blunt in formal contexts.\n• ので = objective, explanatory reason. Softer, more polite. Often used in formal writing and when making requests, apologies, or explanations to people of higher status.\n\nFor polite situations — especially when making a request or apology because of a reason — ので is almost always preferred:\n• 体調が悪いので、休んでもいいですか。\n  Since I'm not feeling well, may I please rest?\n\nThis sounds far more polite than using から in the same sentence.\n\nFormation:\nPlain form + ので (same as から)\n⚠️ な-adjectives and nouns: add な before ので:\n• 学生なので → since [I am] a student\n• 静かなので → since it is quiet\n\nLocation in the sentence: Just like から, the reason clause using ので comes BEFORE the main clause.",
        "structure": "[Plain form] + ので\n[な-adj/Noun] + なので",
        "examples": [
          { "japanese": "今日は日曜日なので、銀行は休みです。", "romaji": "Kyō wa nichiyōbi na node, ginkō wa yasumi desu.", "english": "Since today is Sunday, the bank is closed." },
          { "japanese": "宿題がたくさんあったので、寝ませんでした。", "romaji": "Shukudai ga takusan atta node, nemasen deshita.", "english": "Since there was a lot of homework, I didn't sleep." },
          { "japanese": "体調が悪いので、休んでもいいですか。", "romaji": "Taichō ga warui node, yasunde mo ii desu ka?", "english": "Since I'm not feeling well, may I take a rest?" }
        ],
        "notes": "A good rule of thumb: use ので when you want to soften a request or explanation, especially with teachers, bosses, or people older than you. Use から in casual conversation with friends.",
        "practice": [
          { "type": "translation", "question": "Translate politely: 'Since it is cold, please close the window.'", "answer": "寒いので、窓を閉めてください。" }
        ]
      }
    ]
  }
];
