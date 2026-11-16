/* Itmaen — quiz bank and Sunnah library (Arabic + English).
   Quiz: q = question, o = options (first listed is NOT necessarily correct), a = index of the correct option, x = short explanation. */
window.EXTRA = {

quizCats: {
  quran:   { ar:"القرآن الكريم", en:"The Quran" },
  prophets:{ ar:"الأنبياء", en:"Prophets" },
  seerah:  { ar:"السيرة النبوية", en:"The Prophet's life" },
  worship: { ar:"العبادات", en:"Worship" },
  sahaba:  { ar:"الصحابة", en:"Companions" }
},

quiz: [
 // ---------- Quran ----------
 {c:"quran",ar:{q:"كم عدد سور القرآن الكريم؟",o:["١١٠","١١٤","١٢٠","١٠٤"],x:"القرآن ١١٤ سورة، أولها الفاتحة وآخرها الناس."},en:{q:"How many surahs are in the Quran?",o:["110","114","120","104"],x:"The Quran has 114 surahs, from Al-Fatiha to An-Nas."},a:1},
 {c:"quran",ar:{q:"ما أطول سورة في القرآن؟",o:["آل عمران","النساء","البقرة","الأعراف"],x:"سورة البقرة أطول سورة، وعدد آياتها ٢٨٦ آية."},en:{q:"What is the longest surah?",o:["Al Imran","An-Nisa","Al-Baqarah","Al-A'raf"],x:"Al-Baqarah is the longest, with 286 verses."},a:2},
 {c:"quran",ar:{q:"ما أقصر سورة في القرآن؟",o:["الكوثر","الإخلاص","العصر","النصر"],x:"سورة الكوثر أقصر سورة، ثلاث آيات."},en:{q:"What is the shortest surah?",o:["Al-Kawthar","Al-Ikhlas","Al-'Asr","An-Nasr"],x:"Al-Kawthar is the shortest, with three verses."},a:0},
 {c:"quran",ar:{q:"ما السورة التي لا تبدأ بالبسملة؟",o:["الأنفال","التوبة","يونس","هود"],x:"سورة التوبة هي السورة الوحيدة التي لا تبدأ بالبسملة."},en:{q:"Which surah does not begin with Bismillah?",o:["Al-Anfal","At-Tawbah","Yunus","Hud"],x:"At-Tawbah is the only surah without the Bismillah at its start."},a:1},
 {c:"quran",ar:{q:"ما السورة التي فيها البسملة مرتين؟",o:["النمل","مريم","الفاتحة","الكهف"],x:"في سورة النمل البسملة في أولها وفي رسالة سليمان: ﴿إِنَّهُ مِن سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾."},en:{q:"Which surah contains the Bismillah twice?",o:["An-Naml","Maryam","Al-Fatiha","Al-Kahf"],x:"An-Naml: at its start and in Sulayman's letter (27:30)."},a:0},
 {c:"quran",ar:{q:"ما أعظم آية في القرآن؟",o:["آية الدين","آية الكرسي","آية النور","خواتيم البقرة"],x:"آية الكرسي أعظم آية في كتاب الله كما في صحيح مسلم."},en:{q:"Which is the greatest verse in the Quran?",o:["The verse of debt","Ayat al-Kursi","The verse of light","The end of Al-Baqarah"],x:"Ayat al-Kursi, as reported in Sahih Muslim."},a:1},
 {c:"quran",ar:{q:"ما السورة التي تعدل ثلث القرآن؟",o:["الفاتحة","يس","الإخلاص","الملك"],x:"قال النبي ﷺ عن ﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾: «إنها لتعدل ثلث القرآن» (البخاري)."},en:{q:"Which surah equals a third of the Quran?",o:["Al-Fatiha","Ya-Sin","Al-Ikhlas","Al-Mulk"],x:"The Prophet ﷺ said Al-Ikhlas equals a third of the Quran (Bukhari)."},a:2},
 {c:"quran",ar:{q:"ما أول ما نزل من القرآن؟",o:["الفاتحة","أول سورة العلق","أول سورة المدثر","آية الكرسي"],x:"أول ما نزل: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾ في غار حراء."},en:{q:"What was the first revelation?",o:["Al-Fatiha","The start of Al-'Alaq","The start of Al-Muddaththir","Ayat al-Kursi"],x:"\"Read in the name of your Lord who created\" in the cave of Hira."},a:1},
 {c:"quran",ar:{q:"ما السورة التي يُستحب قراءتها يوم الجمعة؟",o:["الكهف","يس","الملك","الرحمن"],x:"يُستحب قراءة سورة الكهف يوم الجمعة لحديث: «من قرأ سورة الكهف يوم الجمعة أضاء له من النور ما بين الجمعتين» (الحاكم والبيهقي)."},en:{q:"Which surah is recommended to read on Friday?",o:["Al-Kahf","Ya-Sin","Al-Mulk","Ar-Rahman"],x:"Reading Al-Kahf on Friday brings light between the two Fridays (Al-Hakim, Al-Bayhaqi)."},a:0},
 {c:"quran",ar:{q:"ما السورة ذات الثلاثين آية التي تشفع لقارئها حتى يُغفر له؟",o:["الملك","الواقعة","يس","السجدة"],x:"قال ﷺ: «سورة من القرآن ثلاثون آية شفعت لرجل حتى غُفر له، وهي تبارك الذي بيده الملك» (الترمذي وأبو داود)."},en:{q:"Which 30-verse surah intercedes for its reader?",o:["Al-Mulk","Al-Waqi'ah","Ya-Sin","As-Sajdah"],x:"Surah Al-Mulk (Tirmidhi, Abu Dawud)."},a:0},
 {c:"quran",ar:{q:"كم عدد أجزاء القرآن الكريم؟",o:["٢٠","٢٤","٣٠","٦٠"],x:"القرآن ٣٠ جزءًا، و٦٠ حزبًا."},en:{q:"How many juz are in the Quran?",o:["20","24","30","60"],x:"30 juz, or 60 hizb."},a:2},
 {c:"quran",ar:{q:"ما السورة التي ذُكر فيها اسم مريم وسُمّيت باسمها؟",o:["آل عمران","مريم","النساء","المائدة"],x:"سورة مريم، ومريم هي المرأة الوحيدة المذكورة باسمها في القرآن."},en:{q:"Which surah is named after Maryam?",o:["Al Imran","Maryam","An-Nisa","Al-Ma'idah"],x:"Surah Maryam; she is the only woman named in the Quran."},a:1},

 // ---------- Prophets ----------
 {c:"prophets",ar:{q:"كم عدد الأنبياء المذكورين بأسمائهم في القرآن؟",o:["٢٠","٢٥","٣١٣","١٢"],x:"ذُكر في القرآن ٢٥ نبيًا ورسولًا بأسمائهم."},en:{q:"How many prophets are named in the Quran?",o:["20","25","313","12"],x:"25 prophets and messengers are named."},a:1},
 {c:"prophets",ar:{q:"من النبي الذي ابتلعه الحوت؟",o:["موسى","يونس","إلياس","لوط"],x:"يونس عليه السلام، ويُلقّب بذي النون وصاحب الحوت."},en:{q:"Which prophet was swallowed by a whale?",o:["Musa","Yunus","Ilyas","Lut"],x:"Yunus, also called Dhun-Nun."},a:1},
 {c:"prophets",ar:{q:"من النبي الذي كلّمه الله تكليمًا؟",o:["إبراهيم","عيسى","موسى","نوح"],x:"﴿وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا﴾ [النساء: ١٦٤]."},en:{q:"Which prophet did Allah speak to directly?",o:["Ibrahim","'Isa","Musa","Nuh"],x:"\"And Allah spoke to Musa directly\" (4:164)."},a:2},
 {c:"prophets",ar:{q:"من النبي الملقّب بخليل الرحمن؟",o:["إبراهيم","إسماعيل","محمد ﷺ","إسحاق"],x:"﴿وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا﴾ [النساء: ١٢٥]."},en:{q:"Who is called the Friend (Khalil) of Allah?",o:["Ibrahim","Isma'il","Muhammad ﷺ","Ishaq"],x:"\"And Allah took Ibrahim as a close friend\" (4:125)."},a:0},
 {c:"prophets",ar:{q:"من النبي الذي ألان الله له الحديد؟",o:["سليمان","داود","ذو الكفل","هود"],x:"﴿وَأَلَنَّا لَهُ الْحَدِيدَ﴾ [سبأ: ١٠] عن داود عليه السلام."},en:{q:"For which prophet did Allah soften iron?",o:["Sulayman","Dawud","Dhul-Kifl","Hud"],x:"Dawud (34:10)."},a:1},
 {c:"prophets",ar:{q:"من النبي الذي فهم كلام النملة؟",o:["داود","سليمان","يوسف","صالح"],x:"سليمان عليه السلام في سورة النمل."},en:{q:"Which prophet understood the ant?",o:["Dawud","Sulayman","Yusuf","Salih"],x:"Sulayman, in Surah An-Naml."},a:1},
 {c:"prophets",ar:{q:"ما معجزة صالح عليه السلام؟",o:["العصا","الناقة","السفينة","إحياء الموتى"],x:"أخرج الله لقوم ثمود ناقة آيةً لهم."},en:{q:"What was the miracle of Salih?",o:["The staff","The she-camel","The Ark","Raising the dead"],x:"The she-camel sent to Thamud."},a:1},
 {c:"prophets",ar:{q:"كم سنة لبث نوح في قومه يدعوهم؟",o:["٩٥٠ سنة","٥٠٠ سنة","١٠٠٠ سنة","٣٠٠ سنة"],x:"﴿فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا﴾ [العنكبوت: ١٤]."},en:{q:"How long did Nuh stay among his people?",o:["950 years","500 years","1000 years","300 years"],x:"\"A thousand years minus fifty\" (29:14)."},a:0},
 {c:"prophets",ar:{q:"من النبي الذي تكلّم في المهد؟",o:["يحيى","عيسى","موسى","إسماعيل"],x:"عيسى عليه السلام: ﴿إِنِّي عَبْدُ اللَّهِ﴾ [مريم: ٣٠]."},en:{q:"Which prophet spoke in the cradle?",o:["Yahya","'Isa","Musa","Isma'il"],x:"'Isa: \"I am the servant of Allah\" (19:30)."},a:1},
 {c:"prophets",ar:{q:"من النبي الذي بنى الكعبة مع ابنه؟",o:["آدم","إبراهيم","نوح","يعقوب"],x:"إبراهيم وإسماعيل عليهما السلام [البقرة: ١٢٧]."},en:{q:"Who raised the Kaaba with his son?",o:["Adam","Ibrahim","Nuh","Ya'qub"],x:"Ibrahim and Isma'il (2:127)."},a:1},
 {c:"prophets",ar:{q:"ما اسم أبي يوسف عليه السلام؟",o:["إسحاق","إبراهيم","يعقوب","إسماعيل"],x:"يوسف بن يعقوب بن إسحاق بن إبراهيم عليهم السلام."},en:{q:"Who was the father of Yusuf?",o:["Ishaq","Ibrahim","Ya'qub","Isma'il"],x:"Ya'qub, son of Ishaq, son of Ibrahim."},a:2},

 // ---------- Seerah ----------
 {c:"seerah",ar:{q:"في أي عام وُلد النبي ﷺ؟",o:["عام الحزن","عام الفيل","عام الفتح","عام الوفود"],x:"وُلد ﷺ في عام الفيل بمكة."},en:{q:"In which year was the Prophet ﷺ born?",o:["Year of Sorrow","Year of the Elephant","Year of the Conquest","Year of Delegations"],x:"The Year of the Elephant, in Makkah."},a:1},
 {c:"seerah",ar:{q:"ما اسم أم النبي ﷺ؟",o:["حليمة السعدية","آمنة بنت وهب","فاطمة بنت أسد","خديجة"],x:"آمنة بنت وهب، وحليمة السعدية مرضعته."},en:{q:"What was the name of the Prophet's mother?",o:["Halimah","Aminah bint Wahb","Fatimah bint Asad","Khadijah"],x:"Aminah bint Wahb; Halimah was his wet nurse."},a:1},
 {c:"seerah",ar:{q:"كم كان عمر النبي ﷺ عند نزول الوحي؟",o:["٢٥ سنة","٣٠ سنة","٤٠ سنة","٥٣ سنة"],x:"نزل عليه الوحي وهو ابن أربعين سنة."},en:{q:"How old was the Prophet ﷺ when revelation began?",o:["25","30","40","53"],x:"He was forty."},a:2},
 {c:"seerah",ar:{q:"أين نزل الوحي أول مرة؟",o:["غار ثور","غار حراء","المسجد الحرام","جبل أحد"],x:"في غار حراء، وغار ثور هو الذي اختبأ فيه في الهجرة."},en:{q:"Where did the first revelation come?",o:["Cave of Thawr","Cave of Hira","The Sacred Mosque","Mount Uhud"],x:"The cave of Hira; Thawr was the cave of the Hijrah."},a:1},
 {c:"seerah",ar:{q:"من رافق النبي ﷺ في الهجرة؟",o:["عمر بن الخطاب","علي بن أبي طالب","أبو بكر الصديق","عثمان بن عفان"],x:"أبو بكر الصديق رضي الله عنه، وعلي نام في فراشه ليلة الهجرة."},en:{q:"Who accompanied the Prophet ﷺ on the Hijrah?",o:["'Umar","'Ali","Abu Bakr","'Uthman"],x:"Abu Bakr; 'Ali slept in his bed that night."},a:2},
 {c:"seerah",ar:{q:"ما أول غزوة كبرى في الإسلام؟",o:["أحد","الخندق","بدر","حنين"],x:"غزوة بدر الكبرى في رمضان من السنة الثانية للهجرة."},en:{q:"What was the first major battle in Islam?",o:["Uhud","The Trench","Badr","Hunayn"],x:"Badr, in Ramadan, 2 AH."},a:2},
 {c:"seerah",ar:{q:"ما أول مسجد بُني في الإسلام؟",o:["المسجد النبوي","مسجد قباء","المسجد الحرام","مسجد القبلتين"],x:"مسجد قباء، بناه النبي ﷺ عند وصوله المدينة."},en:{q:"What was the first mosque built in Islam?",o:["The Prophet's Mosque","Quba Mosque","The Sacred Mosque","Masjid al-Qiblatayn"],x:"Quba Mosque, built on arrival in Madinah."},a:1},
 {c:"seerah",ar:{q:"كم كان عمر النبي ﷺ عند وفاته؟",o:["٦٠","٦٣","٦٥","٧٠"],x:"توفي ﷺ وعمره ثلاث وستون سنة."},en:{q:"How old was the Prophet ﷺ when he passed away?",o:["60","63","65","70"],x:"Sixty-three."},a:1},
 {c:"seerah",ar:{q:"من أول من آمن من النساء؟",o:["عائشة","فاطمة","خديجة","سمية"],x:"خديجة بنت خويلد رضي الله عنها."},en:{q:"Who was the first woman to believe?",o:["'A'ishah","Fatimah","Khadijah","Sumayyah"],x:"Khadijah bint Khuwaylid."},a:2},
 {c:"seerah",ar:{q:"في أي سنة كان فتح مكة؟",o:["٦ هـ","٨ هـ","١٠ هـ","٢ هـ"],x:"فتح مكة في رمضان سنة ٨ للهجرة."},en:{q:"When was the conquest of Makkah?",o:["6 AH","8 AH","10 AH","2 AH"],x:"Ramadan, 8 AH."},a:1},

 // ---------- Worship ----------
 {c:"worship",ar:{q:"كم عدد ركعات السنن الرواتب في اليوم؟",o:["١٠","١٢","١٤","٨"],x:"«من صلى اثنتي عشرة ركعة في يوم وليلة بُني له بيت في الجنة» (مسلم)."},en:{q:"How many daily Sunnah (rawatib) rak'ahs?",o:["10","12","14","8"],x:"Twelve rak'ahs earn a house in Paradise (Muslim)."},a:1},
 {c:"worship",ar:{q:"ما أفضل الصيام بعد رمضان؟",o:["صيام عرفة","صيام شهر الله المحرم","صيام الاثنين","صيام شعبان"],x:"«أفضل الصيام بعد رمضان شهر الله المحرم» (مسلم)."},en:{q:"What is the best fasting after Ramadan?",o:["Arafah","The month of Muharram","Mondays","Sha'ban"],x:"\"The best fasting after Ramadan is Allah's month, Muharram\" (Muslim)."},a:1},
 {c:"worship",ar:{q:"ما الصلاة التي أوصى بها النبي ﷺ أبا هريرة مع صيام ثلاثة أيام من كل شهر والوتر قبل النوم؟",o:["ركعتا الضحى","تحية المسجد","صلاة الاستخارة","صلاة التسابيح"],x:"«أوصاني خليلي ﷺ بثلاث: صيام ثلاثة أيام من كل شهر، وركعتي الضحى، وأن أوتر قبل أن أنام» (متفق عليه)."},en:{q:"Which prayer did the Prophet ﷺ advise Abu Hurayrah to keep, with three fasts a month and Witr?",o:["Two rak'ahs of Duha","Tahiyyat al-masjid","Istikhara","Tasbih prayer"],x:"Two rak'ahs of Duha (Bukhari & Muslim)."},a:0},
 {c:"worship",ar:{q:"كم مرة يُقال «سبحان الله» بعد الصلاة؟",o:["١٠","٣٣","٣٤","١٠٠"],x:"٣٣ تسبيحة، و٣٣ تحميدة، و٣٣ تكبيرة، وتمام المائة لا إله إلا الله (مسلم)."},en:{q:"How many times is SubhanAllah said after prayer?",o:["10","33","34","100"],x:"33 each of tasbih, tahmid and takbir, completing 100 with tahlil (Muslim)."},a:1},
 {c:"worship",ar:{q:"ما نصاب زكاة الذهب؟",o:["٥٠ جرامًا","٨٥ جرامًا","١٠٠ جرام","٥٩٥ جرامًا"],x:"نصاب الذهب ٨٥ جرامًا تقريبًا، و٥٩٥ جرامًا للفضة."},en:{q:"What is the nisab of gold for zakat?",o:["50 g","85 g","100 g","595 g"],x:"About 85 g of gold; 595 g of silver."},a:1},
 {c:"worship",ar:{q:"ما الليلة التي هي خير من ألف شهر؟",o:["ليلة النصف من شعبان","ليلة القدر","ليلة الإسراء","ليلة العيد"],x:"﴿لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾ [القدر: ٣]."},en:{q:"Which night is better than a thousand months?",o:["Mid-Sha'ban","Laylat al-Qadr","Night of Isra","Eid night"],x:"\"Laylat al-Qadr is better than a thousand months\" (97:3)."},a:1},
 {c:"worship",ar:{q:"صيام يوم عرفة يكفّر…",o:["سنة ماضية فقط","سنتين: الماضية والباقية","ذنوب يوم","ثلاث سنوات"],x:"«صيام يوم عرفة أحتسب على الله أن يكفّر السنة التي قبله والسنة التي بعده» (مسلم)."},en:{q:"Fasting the Day of Arafah expiates…",o:["The past year only","Two years: past and coming","One day's sins","Three years"],x:"The past year and the coming one (Muslim)."},a:1},
 {c:"worship",ar:{q:"كم عدد أركان الإسلام؟",o:["٣","٥","٦","٧"],x:"الشهادتان، والصلاة، والزكاة، والصوم، والحج."},en:{q:"How many pillars of Islam are there?",o:["3","5","6","7"],x:"Testimony, prayer, zakat, fasting and Hajj."},a:1},
 {c:"worship",ar:{q:"كم عدد أركان الإيمان؟",o:["٥","٦","٤","٧"],x:"الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر خيره وشره."},en:{q:"How many pillars of faith (iman)?",o:["5","6","4","7"],x:"Belief in Allah, angels, books, messengers, the Last Day and divine decree."},a:1},

 // ---------- Companions ----------
 {c:"sahaba",ar:{q:"من الصحابي الملقّب بالفاروق؟",o:["أبو بكر","عمر بن الخطاب","علي بن أبي طالب","خالد بن الوليد"],x:"عمر بن الخطاب رضي الله عنه."},en:{q:"Which companion was called Al-Faruq?",o:["Abu Bakr","'Umar ibn al-Khattab","'Ali","Khalid ibn al-Walid"],x:"'Umar ibn al-Khattab."},a:1},
 {c:"sahaba",ar:{q:"من الصحابي الملقّب بذي النورين؟",o:["عثمان بن عفان","علي بن أبي طالب","الزبير","طلحة"],x:"عثمان بن عفان؛ لأنه تزوج ابنتي النبي ﷺ رقية ثم أم كلثوم."},en:{q:"Who was called Dhun-Nurayn (possessor of two lights)?",o:["'Uthman ibn 'Affan","'Ali","Az-Zubayr","Talhah"],x:"'Uthman, who married two of the Prophet's daughters."},a:0},
 {c:"sahaba",ar:{q:"من أول مؤذن في الإسلام؟",o:["بلال بن رباح","عبد الله بن زيد","ابن أم مكتوم","أبو محذورة"],x:"بلال بن رباح رضي الله عنه."},en:{q:"Who was the first muezzin in Islam?",o:["Bilal ibn Rabah","'Abdullah ibn Zayd","Ibn Umm Maktum","Abu Mahdhurah"],x:"Bilal ibn Rabah."},a:0},
 {c:"sahaba",ar:{q:"من الصحابي الملقّب بسيف الله المسلول؟",o:["حمزة","خالد بن الوليد","سعد بن أبي وقاص","عمرو بن العاص"],x:"خالد بن الوليد رضي الله عنه."},en:{q:"Who was called the Drawn Sword of Allah?",o:["Hamzah","Khalid ibn al-Walid","Sa'd ibn Abi Waqqas","'Amr ibn al-'As"],x:"Khalid ibn al-Walid."},a:1},
 {c:"sahaba",ar:{q:"من الصحابي الملقّب بأمين هذه الأمة؟",o:["أبو عبيدة بن الجراح","معاذ بن جبل","عبد الرحمن بن عوف","سلمان الفارسي"],x:"«لكل أمة أمين، وأمين هذه الأمة أبو عبيدة بن الجراح» (متفق عليه)."},en:{q:"Who was called the trustworthy one of this Ummah?",o:["Abu 'Ubaydah ibn al-Jarrah","Mu'adh ibn Jabal","'Abd ar-Rahman ibn 'Awf","Salman al-Farisi"],x:"Abu 'Ubaydah (Bukhari & Muslim)."},a:0},
 {c:"sahaba",ar:{q:"من الصحابي الذي أشار بحفر الخندق؟",o:["سلمان الفارسي","عمار بن ياسر","أبو ذر","حذيفة"],x:"سلمان الفارسي رضي الله عنه."},en:{q:"Who suggested digging the trench?",o:["Salman al-Farisi","'Ammar ibn Yasir","Abu Dharr","Hudhayfah"],x:"Salman al-Farisi."},a:0},
 {c:"sahaba",ar:{q:"من أكثر الصحابة روايةً للحديث؟",o:["ابن عباس","أبو هريرة","عائشة","أنس بن مالك"],x:"أبو هريرة رضي الله عنه."},en:{q:"Which companion narrated the most hadith?",o:["Ibn 'Abbas","Abu Hurayrah","'A'ishah","Anas ibn Malik"],x:"Abu Hurayrah."},a:1}
],

/* ---------- Sunnah library ---------- */
sunanCats: [
 {id:"prayer",  ic:"prayer", ar:"سنن الصلاة", en:"Sunnahs of prayer"},
 {id:"wake",    ic:"sun",    ar:"عند الاستيقاظ", en:"On waking up"},
 {id:"sleep",   ic:"moon",   ar:"قبل النوم", en:"Before sleep"},
 {id:"food",    ic:"food",   ar:"الطعام والشراب", en:"Eating and drinking"},
 {id:"wudu",    ic:"drop",   ar:"الوضوء والطهارة", en:"Wudu and purity"},
 {id:"masjid",  ic:"masjid", ar:"المسجد", en:"The mosque"},
 {id:"home",    ic:"home",   ar:"البيت واللباس", en:"Home and clothing"},
 {id:"people",  ic:"people", ar:"مع الناس", en:"With people"},
 {id:"friday",  ic:"star",   ar:"يوم الجمعة", en:"Friday"},
 {id:"travel",  ic:"travel", ar:"السفر", en:"Travel"},
 {id:"fasting", ic:"crescent",ar:"الصيام", en:"Fasting"}
],
sunan: [
 // prayer — sayings and actions inside prayer, plus voluntary prayers
 {c:"prayer",ar:{t:"السواك عند كل صلاة",d:"«لولا أن أشق على أمتي لأمرتهم بالسواك عند كل صلاة» (متفق عليه)."},en:{t:"Siwak before every prayer",d:"\"Were it not hard on my nation, I would have ordered them to use siwak before every prayer.\" (Bukhari & Muslim)"}},
 {c:"prayer",ar:{t:"السترة أمام المصلي",d:"«إذا صلى أحدكم فليصلِّ إلى سترة وليدنُ منها» (أبو داود)."},en:{t:"Praying towards a barrier (sutrah)",d:"\"When one of you prays, let him pray towards a sutrah and come close to it.\" (Abu Dawud)"}},
 {c:"prayer",ar:{t:"رفع اليدين مع التكبير",d:"عند تكبيرة الإحرام، والركوع، والرفع منه، والقيام من التشهد الأول (البخاري)."},en:{t:"Raising the hands with takbir",d:"At the opening takbir, before and after ruku', and when rising from the first tashahhud. (Bukhari)"}},
 {c:"prayer",ar:{t:"وضع اليمنى على اليسرى",d:"«كان الناس يؤمرون أن يضع الرجل اليد اليمنى على ذراعه اليسرى في الصلاة» (البخاري)."},en:{t:"Right hand over the left",d:"\"People were commanded to place the right hand on the left forearm in prayer.\" (Bukhari)"}},
 {c:"prayer",ar:{t:"دعاء الاستفتاح",d:"مثل: «سبحانك اللهم وبحمدك، وتبارك اسمك، وتعالى جدك، ولا إله غيرك» (أبو داود والترمذي)."},en:{t:"The opening supplication",d:"e.g. \"Glory be to You, O Allah, and praise; blessed is Your name, exalted Your majesty; there is no god but You.\" (Abu Dawud, Tirmidhi)"}},
 {c:"prayer",ar:{t:"التأمين بعد الفاتحة",d:"«إذا أمّن الإمام فأمّنوا، فإنه من وافق تأمينه تأمين الملائكة غُفر له ما تقدم من ذنبه» (متفق عليه)."},en:{t:"Saying Ameen after Al-Fatiha",d:"\"Whoever's Ameen coincides with the angels' Ameen, his past sins are forgiven.\" (Bukhari & Muslim)"}},
 {c:"prayer",ar:{t:"الإكثار من الدعاء في السجود",d:"«أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء» (مسلم)."},en:{t:"Abundant du'a in prostration",d:"\"The closest a servant is to his Lord is while prostrating, so make much du'a.\" (Muslim)"}},
 {c:"prayer",ar:{t:"«رب اغفر لي» بين السجدتين",d:"كان النبي ﷺ يقول بين السجدتين: «رب اغفر لي، رب اغفر لي» (أبو داود والنسائي)."},en:{t:"\"My Lord, forgive me\" between prostrations",d:"The Prophet ﷺ would say \"Rabbighfir li\" between the two prostrations. (Abu Dawud, An-Nasa'i)"}},
 {c:"prayer",ar:{t:"التورّك في التشهد الأخير",d:"في الصلاة الثلاثية والرباعية يجلس متوركًا في التشهد الأخير (البخاري)."},en:{t:"Tawarruk in the final tashahhud",d:"In three- and four-rak'ah prayers, sitting in tawarruk for the final tashahhud. (Bukhari)"}},
 {c:"prayer",ar:{t:"الاستعاذة من أربع قبل السلام",d:"«اللهم إني أعوذ بك من عذاب جهنم، ومن عذاب القبر، ومن فتنة المحيا والممات، ومن شر فتنة المسيح الدجال» (مسلم)."},en:{t:"Seeking refuge from four before salam",d:"From the punishment of Hell and the grave, the trials of life and death, and the Dajjal. (Muslim)"}},
 {c:"prayer",ar:{t:"السنن الرواتب ١٢ ركعة",d:"ركعتان قبل الفجر، وأربع قبل الظهر وركعتان بعده، وركعتان بعد المغرب، وركعتان بعد العشاء (الترمذي، وأصله في مسلم)."},en:{t:"The 12 rawatib rak'ahs",d:"2 before Fajr, 4 before and 2 after Dhuhr, 2 after Maghrib, 2 after Isha. (Tirmidhi; origin in Muslim)"}},
 {c:"prayer",ar:{t:"ركعتا الفجر",d:"«ركعتا الفجر خير من الدنيا وما فيها» (مسلم)."},en:{t:"The two rak'ahs before Fajr",d:"\"The two rak'ahs of Fajr are better than the world and all it contains.\" (Muslim)"}},
 {c:"prayer",ar:{t:"صلاة الضحى",d:"تُجزئ عن الصدقة على كل مفصل: «ويُجزئ من ذلك ركعتان يركعهما من الضحى» (مسلم)."},en:{t:"The Duha prayer",d:"\"Two rak'ahs of Duha suffice\" as charity for every joint. (Muslim)"}},
 {c:"prayer",ar:{t:"الوتر قبل النوم",d:"«اجعلوا آخر صلاتكم بالليل وترًا» (متفق عليه)."},en:{t:"Witr before sleeping",d:"\"Make Witr the last of your night prayer.\" (Bukhari & Muslim)"}},
 {c:"prayer",ar:{t:"تحية المسجد",d:"«إذا دخل أحدكم المسجد فلا يجلس حتى يصلي ركعتين» (متفق عليه)."},en:{t:"Greeting the mosque",d:"\"When one of you enters the mosque, let him not sit until he prays two rak'ahs.\" (Bukhari & Muslim)"}},
 {c:"prayer",ar:{t:"صلاة النافلة في البيت",d:"«فإن أفضل صلاة المرء في بيته إلا المكتوبة» (متفق عليه)."},en:{t:"Voluntary prayers at home",d:"\"The best prayer of a person is in his home, except the obligatory.\" (Bukhari & Muslim)"}},

 // waking
 {c:"wake",ar:{t:"دعاء الاستيقاظ",d:"«الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور» (البخاري)."},en:{t:"Du'a on waking",d:"\"Praise be to Allah who gave us life after death, and to Him is the resurrection.\" (Bukhari)"}},
 {c:"wake",ar:{t:"مسح أثر النوم عن الوجه",d:"«فجعل يمسح النوم عن وجهه بيده» (متفق عليه)."},en:{t:"Wiping sleep from the face",d:"\"He began wiping the traces of sleep from his face with his hand.\" (Bukhari & Muslim)"}},
 {c:"wake",ar:{t:"السواك عند القيام من الليل",d:"«كان النبي ﷺ إذا قام من الليل يشوص فاه بالسواك» (متفق عليه)."},en:{t:"Siwak on rising at night",d:"\"When the Prophet ﷺ rose at night, he cleaned his mouth with siwak.\" (Bukhari & Muslim)"}},
 {c:"wake",ar:{t:"غسل اليدين ثلاثًا",d:"«إذا استيقظ أحدكم من نومه فلا يغمس يده في الإناء حتى يغسلها ثلاثًا» (مسلم)."},en:{t:"Washing the hands three times",d:"\"When one of you wakes, let him not dip his hand in the vessel until he washes it three times.\" (Muslim)"}},

 // sleep
 {c:"sleep",ar:{t:"الوضوء قبل النوم",d:"«إذا أتيت مضجعك فتوضأ وضوءك للصلاة» (متفق عليه)."},en:{t:"Wudu before sleep",d:"\"When you go to bed, perform wudu as for prayer.\" (Bukhari & Muslim)"}},
 {c:"sleep",ar:{t:"النوم على الشق الأيمن",d:"«ثم اضطجع على شقك الأيمن» (متفق عليه)."},en:{t:"Sleeping on the right side",d:"\"Then lie on your right side.\" (Bukhari & Muslim)"}},
 {c:"sleep",ar:{t:"نفض الفراش",d:"«إذا أوى أحدكم إلى فراشه فلينفض فراشه بداخلة إزاره» (متفق عليه)."},en:{t:"Dusting off the bed",d:"\"When one of you goes to bed, let him dust it off.\" (Bukhari & Muslim)"}},
 {c:"sleep",ar:{t:"قراءة المعوذات والنفث",d:"كان يجمع كفيه وينفث فيهما ويقرأ الإخلاص والمعوذتين ويمسح بهما ما استطاع من جسده ثلاثًا (البخاري)."},en:{t:"Reciting the Mu'awwidhat and blowing",d:"He cupped his hands, blew into them, recited Al-Ikhlas, Al-Falaq and An-Nas, and wiped his body three times. (Bukhari)"}},
 {c:"sleep",ar:{t:"آية الكرسي قبل النوم",d:"«لن يزال عليك من الله حافظ، ولا يقربك شيطان حتى تصبح» (البخاري)."},en:{t:"Ayat al-Kursi before sleep",d:"\"A guardian from Allah will stay with you and no devil will come near you until morning.\" (Bukhari)"}},

 // food
 {c:"food",ar:{t:"التسمية قبل الأكل",d:"«يا غلام، سمِّ الله، وكُل بيمينك، وكُل مما يليك» (متفق عليه)."},en:{t:"Saying Bismillah before eating",d:"\"Young man, say Bismillah, eat with your right hand, and eat from what is near you.\" (Bukhari & Muslim)"}},
 {c:"food",ar:{t:"الأكل باليمين",d:"«إذا أكل أحدكم فليأكل بيمينه، وإذا شرب فليشرب بيمينه» (مسلم)."},en:{t:"Eating with the right hand",d:"\"When one of you eats, let him eat with his right hand, and drink with his right.\" (Muslim)"}},
 {c:"food",ar:{t:"إن نسي التسمية",d:"«فإن نسي في أوله فليقل: بسم الله أوله وآخره» (أبو داود والترمذي)."},en:{t:"If you forget Bismillah",d:"\"Let him say: Bismillahi awwalahu wa akhirahu.\" (Abu Dawud, Tirmidhi)"}},
 {c:"food",ar:{t:"الشرب على ثلاث دفعات",d:"«كان رسول الله ﷺ يتنفس في الشراب ثلاثًا» (متفق عليه)، أي خارج الإناء."},en:{t:"Drinking in three breaths",d:"\"He would breathe three times while drinking\" (outside the vessel). (Bukhari & Muslim)"}},
 {c:"food",ar:{t:"الشرب جالسًا",d:"نهى ﷺ أن يشرب الرجل قائمًا (مسلم)، والأكمل الشرب جالسًا."},en:{t:"Drinking while seated",d:"He ﷺ discouraged drinking while standing (Muslim); sitting is better."}},
 {c:"food",ar:{t:"لعق الأصابع",d:"«إذا أكل أحدكم فلا يمسح يده حتى يلعقها» (متفق عليه)."},en:{t:"Licking the fingers",d:"\"When one of you eats, let him not wipe his hand until he licks it.\" (Bukhari & Muslim)"}},
 {c:"food",ar:{t:"عدم عيب الطعام",d:"«ما عاب النبي ﷺ طعامًا قط، إن اشتهاه أكله وإلا تركه» (متفق عليه)."},en:{t:"Never criticising food",d:"\"The Prophet ﷺ never criticised food; if he liked it he ate it, otherwise he left it.\" (Bukhari & Muslim)"}},
 {c:"food",ar:{t:"حمد الله بعد الأكل",d:"«الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة» (أبو داود والترمذي)."},en:{t:"Praising Allah after eating",d:"\"Praise be to Allah who fed me this and provided it without any might or power from me.\" (Abu Dawud, Tirmidhi)"}},
 {c:"food",ar:{t:"الأكل في جماعة",d:"«طعام الواحد يكفي الاثنين، وطعام الاثنين يكفي الأربعة» (مسلم)."},en:{t:"Eating together",d:"\"Food for one suffices two, and food for two suffices four.\" (Muslim)"}},

 // wudu
 {c:"wudu",ar:{t:"التسمية قبل الوضوء",d:"«لا وضوء لمن لم يذكر اسم الله عليه» (أبو داود والترمذي)."},en:{t:"Bismillah before wudu",d:"\"There is no wudu for one who does not mention Allah's name over it.\" (Abu Dawud, Tirmidhi)"}},
 {c:"wudu",ar:{t:"البدء باليمين",d:"«كان النبي ﷺ يعجبه التيمن في تنعله وترجله وطهوره وفي شأنه كله» (متفق عليه)."},en:{t:"Starting with the right",d:"\"He liked to start with the right in wearing shoes, combing, purifying, and all his affairs.\" (Bukhari & Muslim)"}},
 {c:"wudu",ar:{t:"الدعاء بعد الوضوء",d:"«أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمدًا عبده ورسوله» تُفتح له أبواب الجنة الثمانية (مسلم)."},en:{t:"Du'a after wudu",d:"Saying the two testimonies after wudu opens the eight gates of Paradise. (Muslim)"}},
 {c:"wudu",ar:{t:"ركعتان بعد الوضوء",d:"سأل النبي ﷺ بلالًا عن أرجى عمله فقال: لم أتطهر طهورًا إلا صليت بذلك الطهور ما كُتب لي أن أصلي (متفق عليه)."},en:{t:"Two rak'ahs after wudu",d:"Bilal's most hopeful deed: praying after every purification. (Bukhari & Muslim)"}},
 {c:"wudu",ar:{t:"الاقتصاد في الماء",d:"«كان النبي ﷺ يتوضأ بالمُدّ» (متفق عليه)، أي بماء قليل."},en:{t:"Using little water",d:"\"The Prophet ﷺ performed wudu with a mudd\" (a small amount). (Bukhari & Muslim)"}},

 // masjid
 {c:"masjid",ar:{t:"تقديم الرجل اليمنى ودعاء الدخول",d:"«اللهم افتح لي أبواب رحمتك» عند الدخول، و«اللهم إني أسألك من فضلك» عند الخروج (مسلم)."},en:{t:"Right foot first and the entry du'a",d:"\"O Allah, open for me the doors of Your mercy\" on entering; \"I ask You of Your bounty\" on leaving. (Muslim)"}},
 {c:"masjid",ar:{t:"المشي إلى الصلاة بسكينة",d:"«إذا سمعتم الإقامة فامشوا إلى الصلاة وعليكم بالسكينة والوقار» (متفق عليه)."},en:{t:"Walking calmly to prayer",d:"\"When you hear the iqamah, walk to prayer with tranquility and dignity.\" (Bukhari & Muslim)"}},
 {c:"masjid",ar:{t:"التبكير والصف الأول",d:"«لو يعلم الناس ما في النداء والصف الأول ثم لم يجدوا إلا أن يستهموا عليه لاستهموا» (متفق عليه)."},en:{t:"Coming early, the first row",d:"\"If people knew the reward of the call and the first row, they would draw lots for it.\" (Bukhari & Muslim)"}},
 {c:"masjid",ar:{t:"الترديد مع المؤذن",d:"«إذا سمعتم المؤذن فقولوا مثل ما يقول» (متفق عليه)، ثم الصلاة على النبي ﷺ ودعاء الوسيلة."},en:{t:"Repeating after the muezzin",d:"\"When you hear the muezzin, say what he says\" then send salawat and ask for al-Wasilah. (Bukhari & Muslim)"}},

 // home & clothing
 {c:"home",ar:{t:"السواك عند دخول البيت",d:"«كان النبي ﷺ إذا دخل بيته بدأ بالسواك» (مسلم)."},en:{t:"Siwak on entering home",d:"\"When the Prophet ﷺ entered his house, he began with siwak.\" (Muslim)"}},
 {c:"home",ar:{t:"ذكر الله عند دخول البيت",d:"«إذا دخل الرجل بيته فذكر الله عند دخوله وعند طعامه قال الشيطان: لا مبيت لكم ولا عشاء» (مسلم)."},en:{t:"Remembering Allah on entering",d:"Then Satan says: \"No place to stay and no dinner for you.\" (Muslim)"}},
 {c:"home",ar:{t:"دعاء الخروج من البيت",d:"«بسم الله، توكلت على الله، لا حول ولا قوة إلا بالله» (أبو داود والترمذي)."},en:{t:"Du'a on leaving home",d:"\"In the name of Allah, I trust in Allah; there is no might nor power except with Allah.\" (Abu Dawud, Tirmidhi)"}},
 {c:"home",ar:{t:"لبس الحذاء باليمين",d:"«إذا انتعل أحدكم فليبدأ باليمين، وإذا نزع فليبدأ بالشمال» (متفق عليه)."},en:{t:"Shoes: right first",d:"\"When putting on shoes, start with the right; when removing, start with the left.\" (Bukhari & Muslim)"}},
 {c:"home",ar:{t:"دعاء لبس الثوب الجديد",d:"«اللهم لك الحمد أنت كسوتنيه، أسألك من خيره وخير ما صُنع له» (أبو داود والترمذي)."},en:{t:"Du'a for new clothes",d:"\"O Allah, praise is Yours; You clothed me with it. I ask You for its good and the good it was made for.\" (Abu Dawud, Tirmidhi)"}},
 {c:"home",ar:{t:"مساعدة أهل البيت",d:"سُئلت عائشة: ما كان النبي ﷺ يصنع في بيته؟ قالت: كان يكون في مهنة أهله (البخاري)."},en:{t:"Helping at home",d:"'A'ishah said: \"He used to serve his family.\" (Bukhari)"}},
 {c:"home",ar:{t:"دعاء دخول الخلاء",d:"«اللهم إني أعوذ بك من الخبث والخبائث» (متفق عليه)، و«غفرانك» عند الخروج (أبو داود والترمذي)."},en:{t:"Entering the restroom",d:"\"O Allah, I seek refuge in You from evil\" (Bukhari & Muslim); \"Your forgiveness\" on leaving. (Abu Dawud, Tirmidhi)"}},

 // people
 {c:"people",ar:{t:"إفشاء السلام",d:"«أولا أدلكم على شيء إذا فعلتموه تحاببتم؟ أفشوا السلام بينكم» (مسلم)."},en:{t:"Spreading salam",d:"\"Shall I tell you something that makes you love one another? Spread salam among you.\" (Muslim)"}},
 {c:"people",ar:{t:"التبسّم",d:"«تبسّمك في وجه أخيك لك صدقة» (الترمذي)."},en:{t:"Smiling",d:"\"Your smile in your brother's face is charity.\" (Tirmidhi)"}},
 {c:"people",ar:{t:"تشميت العاطس",d:"إذا عطس فقال: الحمد لله، فليقل له أخوه: يرحمك الله، ويرد: يهديكم الله ويصلح بالكم (البخاري)."},en:{t:"Responding to sneezing",d:"Sneezer: \"Alhamdulillah\"; others: \"Yarhamuk Allah\"; reply: \"Yahdikumullah wa yuslih balakum.\" (Bukhari)"}},
 {c:"people",ar:{t:"كظم التثاؤب",d:"«إذا تثاءب أحدكم فليمسك بيده على فيه» (مسلم)."},en:{t:"Covering a yawn",d:"\"When one of you yawns, let him cover his mouth with his hand.\" (Muslim)"}},
 {c:"people",ar:{t:"عيادة المريض",d:"«إن المسلم إذا عاد أخاه المسلم لم يزل في خُرفة الجنة حتى يرجع» (مسلم)."},en:{t:"Visiting the sick",d:"\"A Muslim who visits his sick brother remains in the harvest of Paradise until he returns.\" (Muslim)"}},
 {c:"people",ar:{t:"الهدية",d:"«تهادوا تحابوا» (البخاري في الأدب المفرد)."},en:{t:"Giving gifts",d:"\"Give gifts and you will love one another.\" (Al-Adab al-Mufrad)"}},
 {c:"people",ar:{t:"كفارة المجلس",d:"«سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك وأتوب إليك» عند القيام من المجلس (الترمذي)."},en:{t:"Expiation of a gathering",d:"\"Glory be to You, O Allah, and praise; I bear witness there is no god but You; I seek Your forgiveness and repent.\" (Tirmidhi)"}},

 // friday
 {c:"friday",ar:{t:"الغسل والطيب",d:"«غسل يوم الجمعة واجب على كل محتلم، وأن يستن، وأن يمس طيبًا إن وجد» (مسلم)."},en:{t:"Ghusl and perfume",d:"Ghusl on Friday, using siwak, and perfume if available. (Muslim)"}},
 {c:"friday",ar:{t:"التبكير إلى الجمعة",d:"«من راح في الساعة الأولى فكأنما قرّب بدنة» (متفق عليه)."},en:{t:"Going early to Jumu'ah",d:"\"Whoever goes in the first hour is as if he offered a camel.\" (Bukhari & Muslim)"}},
 {c:"friday",ar:{t:"الإكثار من الصلاة على النبي ﷺ",d:"«أكثروا عليّ من الصلاة يوم الجمعة وليلة الجمعة» (البيهقي)."},en:{t:"Abundant salawat",d:"\"Send abundant blessings on me on Friday and its night.\" (Al-Bayhaqi)"}},
 {c:"friday",ar:{t:"تحرّي ساعة الإجابة",d:"«فيه ساعة لا يوافقها عبد مسلم وهو قائم يصلي يسأل الله شيئًا إلا أعطاه إياه» (متفق عليه)، ورجّح كثير من العلماء أنها آخر ساعة بعد العصر."},en:{t:"Seeking the hour of response",d:"An hour in which any du'a is granted (Bukhari & Muslim); many scholars hold it is the last hour after Asr."}},

 // travel
 {c:"travel",ar:{t:"دعاء السفر",d:"«سبحان الذي سخر لنا هذا وما كنا له مقرنين، وإنا إلى ربنا لمنقلبون…» (مسلم)."},en:{t:"The travel du'a",d:"\"Glory be to Him who subjected this for us… and to our Lord we will return.\" (Muslim)"}},
 {c:"travel",ar:{t:"التكبير صعودًا والتسبيح نزولًا",d:"«كنا إذا صعدنا كبّرنا، وإذا نزلنا سبّحنا» (البخاري)."},en:{t:"Takbir going up, tasbih going down",d:"\"When we ascended we said takbir, and when we descended we said tasbih.\" (Bukhari)"}},
 {c:"travel",ar:{t:"السفر في جماعة",d:"«إذا خرج ثلاثة في سفر فليؤمّروا أحدهم» (أبو داود)."},en:{t:"Travelling in a group",d:"\"When three set out on a journey, let them appoint one as leader.\" (Abu Dawud)"}},
 {c:"travel",ar:{t:"دعاء نزول المكان",d:"«أعوذ بكلمات الله التامات من شر ما خلق» لم يضره شيء حتى يرتحل (مسلم)."},en:{t:"Du'a when stopping somewhere",d:"\"I seek refuge in Allah's perfect words from the evil of what He created\"; nothing will harm him until he leaves. (Muslim)"}},

 // fasting
 {c:"fasting",ar:{t:"السحور",d:"«تسحّروا فإن في السحور بركة» (متفق عليه)."},en:{t:"Suhoor",d:"\"Take suhoor, for in suhoor there is blessing.\" (Bukhari & Muslim)"}},
 {c:"fasting",ar:{t:"تعجيل الفطر",d:"«لا يزال الناس بخير ما عجّلوا الفطر» (متفق عليه)."},en:{t:"Hastening iftar",d:"\"People remain well as long as they hasten iftar.\" (Bukhari & Muslim)"}},
 {c:"fasting",ar:{t:"الفطر على رطب أو تمر أو ماء",d:"كان يفطر على رطبات، فإن لم تكن فتمرات، فإن لم تكن حسا حسوات من ماء (أبو داود والترمذي)."},en:{t:"Breaking the fast with dates or water",d:"Fresh dates, otherwise dry dates, otherwise sips of water. (Abu Dawud, Tirmidhi)"}},
 {c:"fasting",ar:{t:"دعاء الفطر",d:"«ذهب الظمأ، وابتلت العروق، وثبت الأجر إن شاء الله» (أبو داود)."},en:{t:"Du'a at iftar",d:"\"Thirst is gone, the veins are moistened, and the reward is certain, if Allah wills.\" (Abu Dawud)"}},
 {c:"fasting",ar:{t:"صيام ست من شوال",d:"«من صام رمضان ثم أتبعه ستًا من شوال كان كصيام الدهر» (مسلم)."},en:{t:"Six days of Shawwal",d:"\"Whoever fasts Ramadan then follows it with six of Shawwal, it is like fasting for a lifetime.\" (Muslim)"}}
]
};
