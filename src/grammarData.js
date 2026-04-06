export const grammarData = [
  {
    "lesson": "Lesson 1",
    "grammar": [
      {
        "title": "X は Y です",
        "explanation": "This structure is used to identify the topic of a sentence. 'は' (pronounced 'wa') is a topic-marking particle. It highlights what you are talking about. 'です' (desu) functions like the verb 'to be' (am, is, are).",
        "structure": "[X] は [Y] です。",
        "examples": [
          { "japanese": "私は学生です。", "english": "I am a student." },
          { "japanese": "メアリーさんは先生です。", "english": "Mary is a teacher." }
        ],
        "notes": "Always pronounce the topic particle 'は' as 'wa', not 'ha'.",
        "practice": [
          { "type": "fill-in-blanks", "question": "私（　）田中（　）。", "answer": "は, です" },
          { "type": "translation", "question": "Translate: 'Mr. Smith is a doctor.'", "answer": "スミスさんは医者です。" },
          { "type": "sentence-creation", "question": "Use 'は' and 'です' to introduce yourself.", "answer": "私は[Your Name]です。" }
        ]
      },
      {
        "title": "Question Sentences (か)",
        "explanation": "To turn a Japanese sentence into a question, simply add the particle 'か' (ka) to the end of the sentence. You do not need to change the word order.",
        "structure": "[Statement] + か。",
        "examples": [
          { "japanese": "留学生ですか。", "english": "Are you an international student?" },
          { "japanese": "専攻は何ですか。", "english": "What is your major?" }
        ],
        "notes": "In Japanese writing, a question mark '?' is often omitted because 'か' already marks a question, but it is common in casual writing.",
        "practice": [
          { "type": "fill-in-blanks", "question": "何時です（　）。", "answer": "か" },
          { "type": "translation", "question": "Translate: 'Are you a university student?'", "answer": "大学生ですか。" }
        ]
      },
      {
        "title": "Noun の Noun",
        "explanation": "The particle 'の' (no) connects two nouns. It often means 's (possessive), but more generally, Noun 1 modifies or describes Noun 2.",
        "structure": "[Noun 1] の [Noun 2]",
        "examples": [
          { "japanese": "たけしさんの電話番号", "english": "Takeshi's phone number" },
          { "japanese": "日本語の先生", "english": "A teacher of Japanese (Japanese language teacher)" },
          { "japanese": "さくら大学の学生", "english": "A student of Sakura University" }
        ],
        "notes": "Notice that the modifying noun comes FIRST, unlike English where it can sometimes come after (e.g., 'teacher OF Japanese').",
        "practice": [
          { "type": "fill-in-blanks", "question": "私（　）本です。", "answer": "の" },
          { "type": "translation", "question": "Translate: 'My university'", "answer": "私の大学" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 2",
    "grammar": [
      {
        "title": "これ / それ / あれ / どれ",
        "explanation": "These are demonstrative pronouns used to point at things. They function as independent nouns. 'これ' is close to the speaker, 'それ' is close to the listener, 'あれ' is far from both, and 'どれ' is the question word 'which'.",
        "structure": "これ / それ / あれ + は + [Noun] + です。",
        "examples": [
          { "japanese": "これは私の本です。", "english": "This is my book." },
          { "japanese": "それは何ですか。", "english": "What is that (near you)?" },
          { "japanese": "あれは私の自転車です。", "english": "That one over there is my bicycle." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "（　）は時計です。(Pointing to something far away)", "answer": "あれ" },
          { "type": "translation", "question": "Translate: 'Which one is your pen?'", "answer": "どれがあなたのペンですか。" }
        ]
      },
      {
        "title": "この / その / あの / どの + Noun",
        "explanation": "These modify nouns and must always be followed by a noun. They have the same directional rules as これ/それ/あれ.",
        "structure": "この / その / あの / どの + [Noun]",
        "examples": [
          { "japanese": "この時計はいくらですか。", "english": "How much is this watch?" },
          { "japanese": "そのかばんは私のです。", "english": "That bag is mine." },
          { "japanese": "どのカメラですか。", "english": "Which camera is it?" }
        ],
        "notes": "Never use この/その/あの without a noun directly attached.",
        "practice": [
          { "type": "fill-in-blanks", "question": "（　）本は三千円です。(This book)", "answer": "この" },
          { "type": "translation", "question": "Translate: 'Who's is that watch over there?'", "answer": "あの時計はだれのですか。" }
        ]
      },
      {
        "title": "ここ / そこ / あそこ / どこ",
        "explanation": "Place words: Here (close to speaker), There (close to listener), Over there (far from both), and Where.",
        "structure": "ここ / そこ / あそこ / どこ",
        "examples": [
          { "japanese": "トイレはここです。", "english": "The restroom is here." },
          { "japanese": "銀行はどこですか。", "english": "Where is the bank?" }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'The library is over there.'", "answer": "図書館はあそこです。" }
        ]
      },
      {
        "title": "だれの Noun",
        "explanation": "To ask who something belongs to, use 'だれ' (who) combined with the particle 'の' (possession).",
        "structure": "だれの + [Noun]",
        "examples": [
          { "japanese": "これはだれのかばんですか。", "english": "Whose bag is this?" },
          { "japanese": "それはスーさんの靴です。", "english": "That is Sue's shoes." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "あれは（　）自転車ですか。(Whose)", "answer": "だれの" }
        ]
      },
      {
        "title": "Noun も",
        "explanation": "The particle 'も' (mo) means 'also' or 'too'. It replaces the topic particle 'は'.",
        "structure": "[Noun] も [Y] です。",
        "examples": [
          { "japanese": "マキさんは日本人です。タケシさんも日本人です。", "english": "Maki is Japanese. Takeshi is also Japanese." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I am a student too.'", "answer": "私も学生です。" }
        ]
      },
      {
        "title": "Noun じゃないです",
        "explanation": "This is the negative form of 'です'. It means 'is not'.",
        "structure": "[X] は [Y] じゃないです。",
        "examples": [
          { "japanese": "山田さんは学生じゃないです。", "english": "Mr. Yamada is not a student." }
        ],
        "notes": "More formal versions include 'じゃありません' and 'ではありません'.",
        "practice": [
          { "type": "sentence-creation", "question": "Deny this statement: 私は先生です。", "answer": "私は先生じゃないです。" }
        ]
      },
      {
        "title": "~ね / ~よ",
        "explanation": "These are sentence-ending particles. 'ね' (ne) asks for confirmation or agreement ('Right?'). 'よ' (yo) asserts new information ('I tell you').",
        "structure": "[Sentence] + ね / よ。",
        "examples": [
          { "japanese": "高いですね。", "english": "It's expensive, isn't it?" },
          { "japanese": "おいしいですよ。", "english": "It is delicious, you know." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "いい天気です（　）。 (seeking agreement)", "answer": "ね" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 3",
    "grammar": [
      {
        "title": "Verb Types and Conjugation (~ます / ~ません)",
        "explanation": "Japanese verbs are grouped into Ru-verbs, U-verbs, and Irregular verbs. To make them polite, we change them into the ~ます (affirmative) and ~ません (negative) forms.",
        "structure": "Ru-verbs: Drop る + ます/ません\nU-verbs: Change 'u' sound to 'i' sound + ます/ません\nIrregular: する -> します / くる -> きます",
        "examples": [
          { "japanese": "私は毎日コーヒーを飲みます。", "english": "I drink coffee every day." },
          { "japanese": "今日は朝ごはんを食べません。", "english": "I will not eat breakfast today." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "音楽を（　）。(I listen to music - きく)", "answer": "聞きます" },
          { "type": "translation", "question": "Translate: 'I do not sleep.' (verb: ねる)", "answer": "私は寝ません。" }
        ]
      },
      {
        "title": "Particles (を、で、に、へ)",
        "explanation": "Particles show the grammatical function of words.\n- を: Marks the direct object of an action.\n- で: Marks the location of an action.\n- に: Marks time (when), or destination of motion.\n- へ: Marks destination (similar to に for motion).",
        "structure": "[Object] を [Verb]\n[Location] で [Verb]\n[Time/Destination] に [Verb]",
        "examples": [
          { "japanese": "図書館で本を読みます。", "english": "I will read books in the library." },
          { "japanese": "週末に京都へ行きます。", "english": "I will go to Kyoto on the weekend." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "学校（　）行きます。", "answer": "に / へ" },
          { "type": "translation", "question": "Translate: 'I will watch TV at home.'", "answer": "家でテレビを見ます。" }
        ]
      },
      {
        "title": "Time References (When to use に)",
        "explanation": "You use 'に' with precise times (days of the week, times, dates). You do NOT use 'に' for relative times (today, tomorrow, every day, next week).",
        "structure": "[Specific Time] に",
        "examples": [
          { "japanese": "日曜日に映画を見ます。", "english": "I will watch a movie on Sunday." },
          { "japanese": "明日、勉強します。", "english": "I will study tomorrow." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "今日（　）学校に行きます。(No particle / に)", "answer": "No particle" }
        ]
      },
      {
        "title": "~ませんか (Invitation)",
        "explanation": "To politely invite someone to do something, use the negative question form of the verb: '~ませんか'.",
        "structure": "[Verb stem] + ませんか。",
        "examples": [
          { "japanese": "一緒に昼ごはんを食べませんか。", "english": "Won't you eat lunch with me?" },
          { "japanese": "テニスをしませんか。", "english": "Would you like to play tennis?" }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Would you like to drink coffee?'", "answer": "コーヒーを飲みませんか。" }
        ]
      },
      {
        "title": "Frequency Adverbs",
        "explanation": "Adverbs like 毎日(every day), よく(often), 時々(sometimes), あまり(not much), ぜんぜん(not at all). 'あまり' and 'ぜんぜん' must be used with a negative verb.",
        "structure": "[Frequency] + [Verb]",
        "examples": [
          { "japanese": "私はよくスポーツをします。", "english": "I often play sports." },
          { "japanese": "私はぜんぜんテレビを見ません。", "english": "I don't watch TV at all." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Use 'あまり' to say you don't read books much.", "answer": "私はあまり本を読みません。" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 4",
    "grammar": [
      {
        "title": "あります / います",
        "explanation": "Both verbs mean 'there is / is located'. 'あります' is used for non-living things (plants, objects). 'います' is used for living things (humans, animals).",
        "structure": "[Thing/Person] が あります / います。",
        "examples": [
          { "japanese": "あそこにマクドナルドがあります。", "english": "There is a McDonald's over there." },
          { "japanese": "今日、クラスがあります。", "english": "I have class today." },
          { "japanese": "あそこに猫がいます。", "english": "There is a cat over there." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "あそこに犬が（　）。", "answer": "います" },
          { "type": "translation", "question": "Translate: 'There is a TV.'", "answer": "テレビがあります。" }
        ]
      },
      {
        "title": "Describing Where Things Are",
        "explanation": "To describe location, use location words: 上 (above), 下 (under), 中 (inside), 外 (outside), 前 (front), 後ろ (behind), 右 (right), 左 (left), 隣 (next to), 近く (near).",
        "structure": "[Entity X] は [Entity Y] の [Location word] にあります / います。",
        "examples": [
          { "japanese": "ねこはテーブルの下にいます。", "english": "The cat is under the table." },
          { "japanese": "本はかばんの中にあります。", "english": "The book is inside the bag." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'The bank is next to the post office.'", "answer": "銀行は郵便局の隣にあります。" }
        ]
      },
      {
        "title": "Past Tense of です (Noun / な-adj)",
        "explanation": "To form the past tense of です, it changes to でした. The negative past is じゃなかったです.",
        "structure": "Affirmative: ~でした\nNegative: ~じゃなかったです",
        "examples": [
          { "japanese": "私は学生でした。", "english": "I was a student." },
          { "japanese": "昨日、元気じゃなかったです。", "english": "I was not well yesterday." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "きのうは日曜日（　）。(past affirmative)", "answer": "でした" }
        ]
      },
      {
        "title": "Past Tense of Verbs",
        "explanation": "Verbs in polite form change from ~ます to ~ました (past affirmative) and ~ません to ~ませんでした (past negative).",
        "structure": "Affirmative: ~ました\nNegative: ~ませんでした",
        "examples": [
          { "japanese": "昨日、日本語を勉強しました。", "english": "I studied Japanese yesterday." },
          { "japanese": "昨日の夜、寝ませんでした。", "english": "I did not sleep last night." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I watched a movie.'", "answer": "映画を見ました。" }
        ]
      },
      {
        "title": "も (also)",
        "explanation": "When two identical actions/states share the same object or destination, the particle 'も' replaces を, は, or が.",
        "structure": "[Noun] も",
        "examples": [
          { "japanese": "メアリーさんは靴を買いました。かばんも買いました。", "english": "Mary bought shoes. She bought a bag too." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Combine these: 私は肉を食べます。魚を食べます。(Use も)", "answer": "私は肉を食べます。魚も食べます。" }
        ]
      },
      {
        "title": "一時間 (duration)",
        "explanation": "To specify the duration of an action, add '時間' (hours) typically after a number. Note: particles do not follow duration nouns.",
        "structure": "[Duration] [Verb]",
        "examples": [
          { "japanese": "私は三時間勉強しました。", "english": "I studied for three hours." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "私は一時間（　）勉強しました。 (No particle)", "answer": "No particle (blank)" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 5",
    "grammar": [
      {
        "title": "Adjective Conjugation",
        "explanation": "There are two types of adjectives: い-adjectives and な-adjectives. \nい-adj:\nPresent Affirmative: ~いです\nPresent Negative: ~くないです\nPast Affirmative: ~かったです\nPast Negative: ~くなかったです\nExceptions: いい (good) -> よくないです / よかったです.\n\nな-adj:\nThese conjugate exactly like Nouns (です / じゃないです / でした / じゃなかったです).",
        "structure": "[Noun] は [Adjective]",
        "examples": [
          { "japanese": "このお茶は熱いです。", "english": "This tea is hot." },
          { "japanese": "その映画は面白くなかったです。", "english": "That movie was not interesting." },
          { "japanese": "ここは静かでした。", "english": "It was quiet here." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'The test was difficult.' (むずかしい)", "answer": "テストは難しかったです。" }
        ]
      },
      {
        "title": "Adjectives + Nouns",
        "explanation": "When modifying a noun: \nい-adjectives keep their 'い'.\nな-adjectives take 'な' before the noun.",
        "structure": "[Adjective]い + [Noun]\n[Adjective]な + [Noun]",
        "examples": [
          { "japanese": "面白い映画を見ました。", "english": "I watched an interesting movie." },
          { "japanese": "静かな公園が好きです。", "english": "I like quiet parks." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "きれい（　）海に行きました。", "answer": "な" }
        ]
      },
      {
        "title": "好き / きらい (Likes and Dislikes)",
        "explanation": "好き (to like) and きらい (to dislike) are な-adjectives. The item being liked or disliked is marked with 'が'. '大好き' means to love, '大嫌い' means to hate.",
        "structure": "[Person] は [Item] が 好きです / きらいです。",
        "examples": [
          { "japanese": "私は猫が好きです。", "english": "I like cats." },
          { "japanese": "ロバートさんは野菜が大嫌いです。", "english": "Robert hates vegetables." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I love Japanese food.'", "answer": "私は日本食が大好きです。" }
        ]
      },
      {
        "title": "ましょう / ましょうか",
        "explanation": "Both express 'Let's...'. 'ましょう' is a strong suggestion 'Let's do X'. 'ましょうか' asks for an opinion 'Shall we do X?'.",
        "structure": "[Verb stem] + ましょう / ましょうか",
        "examples": [
          { "japanese": "一緒に図書館で勉強しましょう。", "english": "Let's study at the library together." },
          { "japanese": "どこで食べましょうか。", "english": "Where shall we eat?" }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'Let's drink coffee.'", "answer": "コーヒーを飲みましょう。" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 6",
    "grammar": [
      {
        "title": "Te-form (て form)",
        "explanation": "The Te-form links verb phrases. \nRu-verbs: る -> て\nU-verbs: \nう、つ、る -> って\nむ、ぶ、ぬ -> んで\nく -> いて\nぐ -> いで\nす -> して\nExceptions: 行く -> 行って \nIrregular: する->して、くる->きて",
        "structure": "Te-form conjugation",
        "examples": [
          { "japanese": "食べる -> 食べて", "english": "to eat -> eat and..." },
          { "japanese": "飲む -> 飲んで", "english": "to drink -> drink and..." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "書く -> （　）", "answer": "書いて" }
        ]
      },
      {
        "title": "~てください (Request)",
        "explanation": "To make a polite request, use the Te-form + ください.",
        "structure": "[Te-form] + ください。",
        "examples": [
          { "japanese": "漢字を書いてください。", "english": "Please write the kanji." },
          { "japanese": "ちょっと待ってください。", "english": "Please wait a moment." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Please read this book.'", "answer": "この本を読んでください。" }
        ]
      },
      {
        "title": "~てもいいです (Permission)",
        "explanation": "To ask for or grant permission, use Te-form + もいいですか / もいいです ('Is it okay if...? / It is okay to...').",
        "structure": "[Te-form] + もいいです(か)。",
        "examples": [
          { "japanese": "テレビを見てもいいですか。", "english": "May I watch TV?" },
          { "japanese": "はい、見てもいいですよ。", "english": "Yes, you may watch it." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Ask for permission to take a picture. (写真をとる)", "answer": "写真をとってもいいですか。" }
        ]
      },
      {
        "title": "~てはいけません (Prohibition)",
        "explanation": "To strongly prohibit something ('You must not...'), use Te-form + はいけません.",
        "structure": "[Te-form] + はいけません。",
        "examples": [
          { "japanese": "ここで写真を撮ってはいけません。", "english": "You must not take pictures here." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'You must not eat in class.'", "answer": "クラスで食べてはいけません。" }
        ]
      },
      {
        "title": "Describing Two Activities (Sequence)",
        "explanation": "You can connect multiple actions using the Te-form. The sentence tense is determined by the final verb.",
        "structure": "[Action 1 (て)], [Action 2 (Tense)]",
        "examples": [
          { "japanese": "図書館に行って、本を借りました。", "english": "I went to the library and borrowed a book." },
          { "japanese": "6時に起きて、朝ごはんを食べます。", "english": "I wake up at six and eat breakfast." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I listened to music and went to sleep.'", "answer": "音楽を聞いて、寝ました。" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 7",
    "grammar": [
      {
        "title": "~ている (Action in progress / Resultant state)",
        "explanation": "The Te-form + いる describes an ongoing action ('is doing') OR a state resulting from a past action (e.g., 'is married', 'is dead', 'lives in').",
        "structure": "[Te-form] + います",
        "examples": [
          { "japanese": "スーさんは今勉強しています。", "english": "Sue is studying right now." },
          { "japanese": "山下先生は結婚しています。", "english": "Professor Yamashita is married." },
          { "japanese": "私は東京に住んでいます。", "english": "I live in Tokyo." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I am reading a book now.'", "answer": "私は今本を読んでいます。" }
        ]
      },
      {
        "title": "メアリーさんは髪が長いです (A is B in C)",
        "explanation": "When describing a physical attribute of a person or thing, the topic takes は, and the specific part takes が.",
        "structure": "[Person/Thing] は [Body Part] が [Adjective]です。",
        "examples": [
          { "japanese": "メアリーさんは髪が長いです。", "english": "Mary has long hair. (As for Mary, her hair is long.)" },
          { "japanese": "トムさんは背が高いです。", "english": "Tom is tall. (As for Tom, his height is tall.)" }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'Elephants have a long trunk(鼻).' (ぞう = Elephant)", "answer": "ぞうは鼻が長いです。" }
        ]
      },
      {
        "title": "Te-forms for Joining Sentences (Adjectives/Nouns)",
        "explanation": "To connect multiple adjectives or nouns, use their Te-forms.\nい-adj: Drop い + くて\nな-adj: + で\nNoun: + で",
        "structure": "[Adj 1 (て)], [Adj 2]",
        "examples": [
          { "japanese": "安くて、おいしいです。", "english": "It is cheap and delicious." },
          { "japanese": "元気で、親切です。", "english": "They are energetic and kind." },
          { "japanese": "日本人で、学生です。", "english": "He is Japanese and a student." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'The hotel was old and cheap.'", "answer": "ホテルは古くて、安かったです。" }
        ]
      },
      {
        "title": "Verb stem + に行く (Purpose of motion)",
        "explanation": "To say you are going somewhere TO DO something, use the Verb Stem + に行く/来る/帰る.",
        "structure": "[Destination] に [Verb Stem] に 行く/来る/帰る",
        "examples": [
          { "japanese": "デパートにかばんを買いに行きました。", "english": "I went to the department store to buy a bag." },
          { "japanese": "日本へ日本語を勉強しに来ました。", "english": "I came to Japan to study Japanese." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I went to Kyoto to take pictures.'", "answer": "京都に写真を撮りに行きました。" }
        ]
      },
      {
        "title": "人がいます (Counting people)",
        "explanation": "When counting people, use the counter '人' (にん). Exception: 1 person is ひとり, 2 people is ふたり. The number typically comes AFTER the particle.",
        "structure": "[Noun] が [Number] います",
        "examples": [
          { "japanese": "クラスに学生が五人います。", "english": "There are five students in the class." },
          { "japanese": "私の家族は四人です。", "english": "My family has four people." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "一人、二人、（　）、四人", "answer": "三人 (さんにん)" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 8",
    "grammar": [
      {
        "title": "Short Forms (Present Tense)",
        "explanation": "Short forms are the dictionary plain forms of verbs and adjectives, used in casual speech or as part of other grammatical constructs.\nVerbs: Dictionary form (affirmative) / ~ない form (negative)\nい-adj: ~い (aff) / ~くない (neg)\nな-adj/Nouns: ~だ (aff) / ~じゃない (neg)",
        "structure": "Plain Dictionary forms / ない-forms",
        "examples": [
          { "japanese": "食べる / 食べない", "english": "Eat / Don't eat" },
          { "japanese": "かわいい / かわいくない", "english": "Cute / Not cute" },
          { "japanese": "元気だ / 元気じゃない", "english": "Energetic / Not energetic" }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "行く (negative short form: （　）)", "answer": "行かない" }
        ]
      },
      {
        "title": "~と思います (I think that)",
        "explanation": "Use Short Form + と思います to express an opinion or what you think.",
        "structure": "[Short Form] + と思います",
        "examples": [
          { "japanese": "明日雨が降ると思います。", "english": "I think it will rain tomorrow." },
          { "japanese": "漢字は難しいと思います。", "english": "I think Kanji is difficult." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I think the exam is easy.' (簡単 - な adj)", "answer": "試験は簡単だと思います。" }
        ]
      },
      {
        "title": "~と言っていました (They said that)",
        "explanation": "Use Short Form + と言っていました to quote what someone said.",
        "structure": "[Person] は [Short Form] + と言っていました。",
        "examples": [
          { "japanese": "スーさんは明日来ると言っていました。", "english": "Sue said she will come tomorrow." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Takeshi said he is busy.'", "answer": "たけしさんは忙しいと言っていました。" }
        ]
      },
      {
        "title": "~のが好きです / おもしろいです",
        "explanation": "To use a verb clause as a noun ('Doing something'), append 'の' after the short form verb.",
        "structure": "[Verb Short Form] + のが 好きです / 上手です",
        "examples": [
          { "japanese": "私は音楽を聞くのが好きです。", "english": "I like listening to music." },
          { "japanese": "メアリーさんは日本語を話すのが上手です。", "english": "Mary is good at speaking Japanese." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I hate cleaning my room.' (掃除(そうじ)する)", "answer": "私は部屋を掃除するのが嫌いです。" }
        ]
      },
      {
        "title": "何か / 何も",
        "explanation": "何か = Something/Anything. 何も = Nothing/Not anything. '何も' must be followed by a negative verb.",
        "structure": "何か + [Verb Affirmative/Question] / 何も + [Verb Negative]",
        "examples": [
          { "japanese": "休みに何かしましたか。", "english": "Did you do anything during the holidays?" },
          { "japanese": "いいえ、何もしませんでした。", "english": "No, I didn't do anything." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "（　）食べません。", "answer": "何も" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 9",
    "grammar": [
      {
        "title": "Past Tense Short Forms",
        "explanation": "Short forms in the past tense.\nVerbs: た-form (affirmative - same rules as て-form but with た/だ) / ~なかった (negative)\nい-adj: ~かった / ~くなかった\nな-adj/Noun: ~だった / ~じゃなかった",
        "structure": "た-form / なかった form",
        "examples": [
          { "japanese": "食べた / 食べなかった", "english": "Ate / Did not eat" },
          { "japanese": "行った / 行かなかった", "english": "Went / Did not go" }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "飲む (Past affirmative short: （　）)", "answer": "飲んだ" }
        ]
      },
      {
        "title": "Qualifying Nouns with Verbs",
        "explanation": "In Japanese, a verb clause can exist directly in front of a noun to describe it, exactly like an adjective. Use the SHORT FORM of the verb.",
        "structure": "[Verb Short Form clause] + [Noun]",
        "examples": [
          { "japanese": "私がよく行くレストラン", "english": "The restaurant that I often go to" },
          { "japanese": "昨日買った本を読みました。", "english": "I read the book that I bought yesterday." }
        ],
        "notes": "Notice that the subject inside the modifying clause usually takes 'が' instead of 'は'.",
        "practice": [
          { "type": "translation", "question": "Translate: 'The person who is drinking coffee is Mr. Yamada.'", "answer": "コーヒーを飲んでいる人は山田さんです。" }
        ]
      },
      {
        "title": "まだ ~ていません (Have not ... yet)",
        "explanation": "To say you have not done something YET, use まだ + Te-form + いません. (Literally: I am in the state of not having done it).",
        "structure": "まだ + [Te-form] + いません。",
        "examples": [
          { "japanese": "まだ昼ごはんを食べていません。", "english": "I have not eaten lunch yet." },
          { "japanese": "私はまだ決めていません。", "english": "I haven't decided yet." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I haven't written the essay yet.'", "answer": "まだ作文を書いていません。" }
        ]
      },
      {
        "title": "~から (Because)",
        "explanation": "The particle 'から' at the end of a clause means 'because'. In Japanese, the reason clause comes BEFORE 'から'.",
        "structure": "[Reason Clause] から、[Situation].",
        "examples": [
          { "japanese": "忙しいから、行きません。", "english": "Because I am busy, I won't go." },
          { "japanese": "明日テストがあるから、勉強します。", "english": "Because I have a test tomorrow, I will study." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I didn't eat because I wasn't hungry.'", "answer": "お腹がすいていなかったから、食べませんでした。" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 10",
    "grammar": [
      {
        "title": "Comparison between two items (AのほうがBより / AとBとどちらのほうが)",
        "explanation": "To ask which of two things is better/taller/faster, use: Aと Bと どちらのほうが [Adj] ですか.\nTo reply, A is more [Adj] than B: Aのほうが Bより [Adj]です.",
        "structure": "A のほうが B より [Adj]です。",
        "examples": [
          { "japanese": "中国と日本とどちらのほうが大きいですか。", "english": "Which is larger, China or Japan?" },
          { "japanese": "中国のほうが日本より大きいです。", "english": "China is larger than Japan." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Trains are faster than buses.' (電車 = train, バス = bus)", "answer": "電車のほうがバスより速いです。" }
        ]
      },
      {
        "title": "Comparison among three or more (のなかでAが一番)",
        "explanation": "To state what is the BEST/MOST among a category of three or more, use [Category] の中で [A] が 一番 [Adj] です.",
        "structure": "[Category] の中で [A] が 一番 [Adj] です。",
        "examples": [
          { "japanese": "季節の中でいつが一番好きですか。", "english": "What season do you like the best?" },
          { "japanese": "秋が一番好きです。", "english": "I like autumn the best." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'Among fruits, I like apples the most.'", "answer": "果物の中でりんごが一番好きです。" }
        ]
      },
      {
        "title": "Adjective/Noun + の",
        "explanation": "When the noun is understood from context, you can replace it with 'の' to mean 'the one'. Like saying 'the red one' instead of 'the red bag'.",
        "structure": "[Adjective] + の\n[Noun] + の",
        "examples": [
          { "japanese": "私は黒いかばんがあります。赤いのもあります。", "english": "I have a black bag. I also have a red one." },
          { "japanese": "その時計はだれのですか。\n私のです。", "english": "Whose watch is that? \nIt is mine. (My one)" }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Which shoes will you buy? I will buy the black ones.'", "answer": "どの靴を買いますか。黒いのを買います。" }
        ]
      },
      {
        "title": "~つもりです (Plan to do)",
        "explanation": "Describes a firm plan or intention. Add つもりです after a present tense short form (affirmative or negative).",
        "structure": "[Short form present] + つもりです",
        "examples": [
          { "japanese": "明日、映画を見るつもりです。", "english": "I plan to see a movie tomorrow." },
          { "japanese": "今日は勉強しないつもりです。", "english": "I intend to not study today." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I plan to go to Japan next year.'", "answer": "来年、日本に行くつもりです。" }
        ]
      },
      {
        "title": "Adjective + なる (To become)",
        "explanation": "Indicates a change of state.\nい-adj: Drop い + くなる\nな-adj/Noun: + になる",
        "structure": "[Adj base] + く/に + なる",
        "examples": [
          { "japanese": "暖かくなりました。", "english": "It has become warm." },
          { "japanese": "メアリーさんは先生になります。", "english": "Mary will become a teacher." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "静か（　）なります。", "answer": "に" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 11",
    "grammar": [
      {
        "title": "~たいです (Want to do)",
        "explanation": "To say you want to DO something (verbs), replace the ~ます stem with ~たいです. Conjugates like an い-adjective.",
        "structure": "[Verb stem] + たいです",
        "examples": [
          { "japanese": "私は日本に行きたいです。", "english": "I want to go to Japan." },
          { "japanese": "何も食べたくないです。", "english": "I don't want to eat anything." }
        ],
        "notes": "When using たい, the particle を can often be replaced with が.",
        "practice": [
          { "type": "sentence-creation", "question": "Say: 'I want to watch a movie.'", "answer": "私は映画を見たいです。" }
        ]
      },
      {
        "title": "~たり ~たりする (Doing things such as)",
        "explanation": "Used to give a non-exhaustive list of actions (Do things like A and B). Use the た-form of the verb.",
        "structure": "[Verb た-form]り、[Verb た-form]り する",
        "examples": [
          { "japanese": "週末は買い物をしたり、映画を見たりしました。", "english": "Over the weekend, I did things like shopping and watching a movie." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Today I will read books and listen to music.' (Among other things)", "answer": "今日は本を読んだり、音楽を聞いたりします。" }
        ]
      },
      {
        "title": "~ことがある (Have the experience of)",
        "explanation": "Describes past experience (Have done...). Use the た-form verb + ことがある / ことがあります.",
        "structure": "[Verb た-form] + ことがあります",
        "examples": [
          { "japanese": "富士山に登ったことがあります。", "english": "I have climbed Mt. Fuji." },
          { "japanese": "ヨーロッパに行ったことがありません。", "english": "I have never been to Europe." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Ask: 'Have you ever eaten sushi?'", "answer": "寿司を食べたことがありますか。" }
        ]
      },
      {
        "title": "Noun A や Noun B (A and B, for example)",
        "explanation": "Like the particle と (and), but 'や' implies the list is incomplete (A, B, and so on).",
        "structure": "[Noun A] や [Noun B]",
        "examples": [
          { "japanese": "京都や大阪に行きました。", "english": "I went to places like Kyoto and Osaka." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "猫（　）犬が好きです。(Cats, dogs, etc.)", "answer": "や" }
        ]
      }
    ]
  },
  {
    "lesson": "Lesson 12",
    "grammar": [
      {
        "title": "~んです (Explanation)",
        "explanation": "Used to provide an explanation, state an excuse, or ask for an explanation. It gives sentences a 'Listen, here's the reason' nuance.",
        "structure": "[Short form] + んです\nException: Noun/な-adj takes なんです",
        "examples": [
          { "japanese": "どうして遅れたんですか。\nバスが来なかったんです。", "english": "Why were you late?\n(The reason is) the bus didn't come." },
          { "japanese": "明日テストがあるんです。", "english": "It's because I have a test tomorrow." }
        ],
        "notes": "In written language, 'のです' is often used instead of 'んです'.",
        "practice": [
          { "type": "fill-in-blanks", "question": "雨が降っている（　）。(reasoning tone)", "answer": "んです" }
        ]
      },
      {
        "title": "~すぎる (Too much)",
        "explanation": "Attaches to verb stems and adjective bases to mean 'too much / excessively'. It conjugates like a Ru-verb.",
        "structure": "[Verb stem / Adj base] + すぎる",
        "examples": [
          { "japanese": "昨日、お酒を飲みすぎました。", "english": "I drank too much alcohol yesterday." },
          { "japanese": "この本は高すぎます。", "english": "This book is too expensive." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'I ate too much.'", "answer": "食べすぎました。" }
        ]
      },
      {
        "title": "~ほうがいいです (Better to do)",
        "explanation": "Used to give advice (You had better do...). \nAffirmative advice: た-form + ほうがいい\nNegative advice: ない-form + ほうがいい",
        "structure": "[Verb た form] + ほうがいいですよ\n[Verb ない form] + ほうがいいですよ",
        "examples": [
          { "japanese": "毎日運動したほうがいいですよ。", "english": "You had better exercise every day." },
          { "japanese": "タバコを吸わないほうがいいですよ。", "english": "You had better not smoke." }
        ],
        "practice": [
          { "type": "sentence-creation", "question": "Give advice to sleep early. (早く寝る)", "answer": "早く寝たほうがいいですよ。" }
        ]
      },
      {
        "title": "~ので (Given that / Since)",
        "explanation": "A more formal and objective version of 'から' (because/since). Usually followed by polite requests or apologies.",
        "structure": "[Short form] + ので\nException: Noun/な-adj takes なので",
        "examples": [
          { "japanese": "今日は日曜日なので、銀行は休みです。", "english": "Since today is Sunday, the bank is closed." },
          { "japanese": "宿題がたくさんあったので、寝ませんでした。", "english": "Given that there was a lot of homework, I didn't sleep." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'Since it is cold, please close the window.'", "answer": "寒いので、窓を閉めてください。" }
        ]
      },
      {
        "title": "~なくちゃいけません (Must do)",
        "explanation": "Meaning 'Must do'. Drop the 'ない' from the negative short form and add 'なくちゃいけません' (casual 'have to'). Formal is 'なければいけません'.",
        "structure": "[Verb ~ない stem] + なくちゃいけません",
        "examples": [
          { "japanese": "明日テストがあるから、勉強しなくちゃいけません。", "english": "Because I have a test tomorrow, I must study." }
        ],
        "practice": [
          { "type": "fill-in-blanks", "question": "薬を（飲む）なくちゃいけません -> 薬を（　）なくちゃいけません。", "answer": "飲ま" }
        ]
      },
      {
        "title": "~でしょう (Probably)",
        "explanation": "Used to make a guess or prediction. Follows short forms. Spoken with a rising intonation, it asks for agreement ('Right?').",
        "structure": "[Short form] + でしょう\nException: Noun/な-adj do not take だ.",
        "examples": [
          { "japanese": "明日は雨が降るでしょう。", "english": "It will probably rain tomorrow." },
          { "japanese": "北海道は寒いでしょう。", "english": "Hokkaido is probably cold." }
        ],
        "practice": [
          { "type": "translation", "question": "Translate: 'It was probably busy yesterday.'", "answer": "昨日は忙しかったでしょう。" }
        ]
      }
    ]
  }
];
