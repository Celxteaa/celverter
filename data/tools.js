'use strict';
/* Tool catalogue. One entry per tool: id (URL slug), n (name) and a (About text) in every language.
   To add a tool: add it here, add its UI in src/app.js (same id), and rebuild. */
module.exports = [
 {
  "slug": "text-tools",
  "k": "text",
  "tools": [
   {
    "id": "word-counter",
    "n": {
     "en": "Word Counter",
     "es": "Contador de palabras",
     "pt": "Contador de palavras",
     "id": "Penghitung Kata",
     "hi": "शब्द गिनने वाला",
     "ar": "عدّاد الكلمات"
    },
    "a": {
     "en": "Paste or type text to see the number of words, characters and lines update instantly. Words are counted as runs of non-space characters, so a hyphenated term counts as one word.",
     "es": "Pega o escribe texto para ver cómo se actualizan al instante el número de palabras, caracteres y líneas. Las palabras se cuentan como grupos de caracteres sin espacios, por lo que un término con guion cuenta como una palabra.",
     "pt": "Cole ou digite texto para ver o número de palavras, caracteres e linhas ser atualizado na hora. As palavras são contadas como sequências de caracteres sem espaço, então um termo com hífen conta como uma palavra.",
     "id": "Tempel atau ketik teks untuk melihat jumlah kata, karakter, dan baris yang diperbarui langsung. Kata dihitung sebagai rangkaian karakter tanpa spasi, jadi istilah dengan tanda hubung dihitung satu kata.",
     "hi": "टेक्स्ट पेस्ट करें या टाइप करें और शब्दों, अक्षरों और पंक्तियों की संख्या तुरंत अपडेट होते देखें। शब्द बिना स्पेस वाले वर्णों के समूह के रूप में गिने जाते हैं, इसलिए हाइफ़न वाला शब्द एक ही गिना जाता है।",
     "ar": "الصق نصًا أو اكتبه لترى عدد الكلمات والأحرف والأسطر يتحدّث فورًا. تُحتسب الكلمة على أنها سلسلة أحرف بلا مسافات، لذا فالمصطلح المشتمل على واصلة يُعدّ كلمة واحدة."
    }
   },
   {
    "id": "case-converter",
    "n": {
     "en": "Case Converter",
     "es": "Convertidor de mayúsculas y minúsculas",
     "pt": "Conversor de maiúsculas e minúsculas",
     "id": "Pengubah Huruf Besar Kecil",
     "hi": "केस कन्वर्टर",
     "ar": "محوّل حالة الأحرف"
    },
    "a": {
     "en": "Switch text between UPPERCASE, lowercase, Title Case and Sentence case without retyping. Title Case capitalises the first letter of every word and does not apply style-guide exceptions for small words. Scripts without letter case, such as Hindi and Arabic, are left unchanged.",
     "es": "Cambia el texto entre MAYÚSCULAS, minúsculas, Tipo título y Tipo oración sin volver a escribirlo. Tipo título pone en mayúscula la primera letra de cada palabra y no aplica las excepciones de palabras cortas de ninguna guía de estilo. Las escrituras sin mayúsculas ni minúsculas, como el hindi y el árabe, no cambian.",
     "pt": "Alterne o texto entre MAIÚSCULAS, minúsculas, Título e Frase sem digitar de novo. O formato Título coloca em maiúscula a primeira letra de cada palavra e não aplica as exceções para palavras curtas de nenhum guia de estilo. Escritas sem distinção entre maiúsculas e minúsculas, como hindi e árabe, permanecem iguais.",
     "id": "Ubah teks antara HURUF BESAR, huruf kecil, Title Case, dan huruf kapital kalimat tanpa mengetik ulang. Title Case mengkapitalkan huruf pertama setiap kata dan tidak menerapkan pengecualian kata kecil dari pedoman gaya tertentu. Aksara tanpa huruf besar-kecil, seperti Hindi dan Arab, dibiarkan apa adanya.",
     "hi": "टेक्स्ट को दोबारा टाइप किए बिना बड़े अक्षर, छोटे अक्षर, टाइटल केस और वाक्य केस के बीच बदलें। टाइटल केस हर शब्द का पहला अक्षर बड़ा करता है और किसी शैली-मार्गदर्शिका के छोटे शब्दों वाले अपवाद लागू नहीं करता। हिंदी और अरबी जैसी लिपियों में बड़े-छोटे अक्षर नहीं होते, इसलिए वे जस की तस रहती हैं।",
     "ar": "بدّل النص بين الأحرف الكبيرة والصغيرة وحالة العنوان وحالة الجملة دون إعادة كتابته. تجعل حالة العنوان الحرف الأول من كل كلمة كبيرًا ولا تطبّق استثناءات الكلمات القصيرة الواردة في أي دليل أسلوب. الكتابات التي لا تفرّق بين الأحرف الكبيرة والصغيرة، مثل العربية والهندية، تبقى كما هي."
    }
   },
   {
    "id": "ai-text-cleaner",
    "n": {
     "en": "AI Text Cleaner",
     "es": "Limpiador de texto de IA",
     "pt": "Limpador de texto de IA",
     "id": "Pembersih Teks Hasil AI",
     "hi": "AI टेक्स्ट क्लीनर",
     "ar": "منظّف نص الذكاء الاصطناعي"
    },
    "a": {
     "en": "Removes leftovers that chatbots often add when you copy their answers: Markdown symbols, citation markers, invisible characters, emoji, extra spaces and stock opening or closing lines. Choose which clean-ups to apply and review the result. It tidies formatting only; it does not rewrite the text and does not guarantee that an AI detector will miss it.",
     "es": "Elimina los restos que los chatbots suelen añadir al copiar sus respuestas: símbolos Markdown, marcas de cita, caracteres invisibles, emojis, espacios de más y frases fijas de apertura o cierre. Elige qué limpiezas aplicar y revisa el resultado. Solo ordena el formato; no reescribe el texto ni garantiza que un detector de IA no lo identifique.",
     "pt": "Remove os resíduos que os chatbots costumam deixar ao copiar suas respostas: símbolos Markdown, marcas de citação, caracteres invisíveis, emojis, espaços extras e frases fixas de abertura ou fechamento. Escolha quais limpezas aplicar e revise o resultado. Ele apenas organiza a formatação; não reescreve o texto nem garante que um detector de IA não o identifique.",
     "id": "Menghapus sisa-sisa yang sering ditambahkan chatbot saat jawabannya disalin: simbol Markdown, penanda sitasi, karakter tak terlihat, emoji, spasi berlebih, serta kalimat pembuka atau penutup baku. Pilih pembersihan yang ingin diterapkan lalu periksa hasilnya. Alat ini hanya merapikan format; tidak menulis ulang teks dan tidak menjamin teks lolos dari pendeteksi AI.",
     "hi": "चैटबॉट के उत्तर कॉपी करने पर जो अवशेष अक्सर साथ आ जाते हैं, उन्हें हटाता है: Markdown प्रतीक, उद्धरण चिह्न, अदृश्य अक्षर, इमोजी, अतिरिक्त स्पेस और तयशुदा शुरुआती या समापन पंक्तियाँ। चुनें कि कौन-सी सफ़ाई लागू करनी है और नतीजा जाँच लें। यह केवल फ़ॉर्मेट सुधारता है; टेक्स्ट दोबारा नहीं लिखता और यह गारंटी नहीं देता कि AI डिटेक्टर उसे नहीं पकड़ेगा।",
     "ar": "يزيل البقايا التي تضيفها روبوتات الدردشة غالبًا عند نسخ إجاباتها: رموز ماركداون وعلامات الاستشهاد والأحرف غير المرئية والرموز التعبيرية والمسافات الزائدة وجمل الافتتاح أو الختام الجاهزة. اختر عمليات التنظيف المطلوبة وراجع النتيجة. الأداة ترتّب التنسيق فقط؛ فهي لا تعيد كتابة النص ولا تضمن ألّا تكشفه أدوات رصد الذكاء الاصطناعي."
    }
   },
   {
    "id": "remove-duplicate-lines",
    "n": {
     "en": "Remove Duplicate Lines",
     "es": "Eliminar líneas duplicadas",
     "pt": "Remover linhas duplicadas",
     "id": "Hapus Baris Duplikat",
     "hi": "डुप्लिकेट लाइन हटाएँ",
     "ar": "حذف الأسطر المكررة"
    },
    "a": {
     "en": "Keeps the first occurrence of each line and removes later repeats, preserving the original order. Lines are compared exactly, so differences in case or spaces count as different lines.",
     "es": "Conserva la primera aparición de cada línea y elimina las repeticiones posteriores, manteniendo el orden original. Las líneas se comparan exactamente, así que las diferencias de mayúsculas o espacios cuentan como líneas distintas.",
     "pt": "Mantém a primeira ocorrência de cada linha e remove as repetições seguintes, preservando a ordem original. As linhas são comparadas exatamente, então diferenças de maiúsculas ou espaços contam como linhas diferentes.",
     "id": "Mempertahankan kemunculan pertama setiap baris dan menghapus pengulangan berikutnya, dengan urutan asli tetap terjaga. Baris dibandingkan persis, sehingga perbedaan huruf besar-kecil atau spasi dianggap baris berbeda.",
     "hi": "हर पंक्ति की पहली घटना को रखता है और बाद की दोहराई गई पंक्तियाँ हटा देता है, मूल क्रम बना रहता है। पंक्तियों की तुलना हू-ब-हू होती है, इसलिए बड़े-छोटे अक्षरों या स्पेस का अंतर अलग पंक्ति माना जाता है।",
     "ar": "يُبقي أول ظهور لكل سطر ويحذف التكرارات اللاحقة مع الحفاظ على الترتيب الأصلي. تُقارَن الأسطر حرفيًا، لذا فإن اختلاف حالة الأحرف أو المسافات يجعل السطر مختلفًا."
    }
   },
   {
    "id": "remove-line-breaks",
    "n": {
     "en": "Remove Line Breaks",
     "es": "Quitar saltos de línea",
     "pt": "Remover quebras de linha",
     "id": "Hapus Pemisah Baris",
     "hi": "लाइन ब्रेक हटाएँ",
     "ar": "إزالة فواصل الأسطر"
    },
    "a": {
     "en": "Joins multiple lines into one by replacing each line break, and the spaces around it, with a single space. Useful for text copied from PDFs or emails.",
     "es": "Une varias líneas en una sola sustituyendo cada salto de línea, y los espacios que lo rodean, por un único espacio. Es útil para texto copiado de PDF o correos electrónicos.",
     "pt": "Une várias linhas em uma só substituindo cada quebra de linha, e os espaços ao redor, por um único espaço. É útil para texto copiado de PDFs ou e-mails.",
     "id": "Menggabungkan beberapa baris menjadi satu dengan mengganti setiap pemisah baris beserta spasi di sekitarnya dengan satu spasi. Berguna untuk teks yang disalin dari PDF atau email.",
     "hi": "हर लाइन ब्रेक और उसके आसपास के स्पेस को एक स्पेस से बदलकर कई पंक्तियों को एक में जोड़ता है। PDF या ईमेल से कॉपी किए गए टेक्स्ट के लिए उपयोगी।",
     "ar": "يدمج عدة أسطر في سطر واحد باستبدال كل فاصل سطر والمسافات المحيطة به بمسافة واحدة. مفيد للنصوص المنسوخة من ملفات PDF أو رسائل البريد الإلكتروني."
    }
   },
   {
    "id": "sort-lines",
    "n": {
     "en": "Sort Lines",
     "es": "Ordenar líneas",
     "pt": "Ordenar linhas",
     "id": "Urutkan Baris",
     "hi": "लाइनें क्रमबद्ध करें",
     "ar": "ترتيب الأسطر"
    },
    "a": {
     "en": "Sorts lines alphabetically, A to Z or Z to A. Numbers inside lines are compared by value, so \"item 2\" comes before \"item 10\". The order follows the rules of the page language.",
     "es": "Ordena las líneas alfabéticamente, de la A a la Z o de la Z a la A. Los números dentro de las líneas se comparan por su valor, así que \"item 2\" va antes que \"item 10\". El orden sigue las reglas del idioma de la página.",
     "pt": "Ordena as linhas em ordem alfabética, de A a Z ou de Z a A. Os números dentro das linhas são comparados pelo valor, então \"item 2\" vem antes de \"item 10\". A ordem segue as regras do idioma da página.",
     "id": "Mengurutkan baris secara alfabet, A ke Z atau Z ke A. Angka di dalam baris dibandingkan menurut nilainya, sehingga \"item 2\" muncul sebelum \"item 10\". Urutan mengikuti aturan bahasa halaman.",
     "hi": "पंक्तियों को वर्णानुक्रम में A से Z या Z से A तक क्रमबद्ध करता है। पंक्तियों के भीतर की संख्याओं की तुलना उनके मान से होती है, इसलिए \"item 2\", \"item 10\" से पहले आता है। क्रम पेज की भाषा के नियमों के अनुसार तय होता है।",
     "ar": "يرتّب الأسطر أبجديًا من A إلى Z أو من Z إلى A. تُقارَن الأعداد داخل الأسطر بقيمتها، لذا يأتي \"item 2\" قبل \"item 10\". ويتبع الترتيب قواعد لغة الصفحة."
    }
   }
  ]
 },
 {
  "slug": "cryptography",
  "k": "crypto",
  "tools": [
   {
    "id": "morse-code",
    "n": {
     "en": "Morse Code Translator",
     "es": "Traductor de código Morse",
     "pt": "Tradutor de código Morse",
     "id": "Penerjemah Kode Morse",
     "hi": "मोर्स कोड अनुवादक",
     "ar": "مترجم شفرة مورس"
    },
    "a": {
     "en": "Translates text to Morse code and back. Letters are separated by a space and words by a slash. Letters, digits and common punctuation follow the international code, accented letters such as é, ñ and ç are supported, and an Arabic alphabet table is available. Hindi has no widely adopted international Morse table, so use Latin letters for it.",
     "es": "Traduce texto a código Morse y viceversa. Las letras se separan con un espacio y las palabras con una barra. Letras, números y signos de puntuación comunes siguen el código internacional; se admiten letras con acento como é, ñ y ç, y hay una tabla del alfabeto árabe. El hindi no tiene una tabla Morse internacional de uso extendido, así que usa letras latinas.",
     "pt": "Traduz texto para código Morse e vice-versa. As letras são separadas por um espaço e as palavras por uma barra. Letras, números e pontuação comum seguem o código internacional; letras acentuadas como é, ñ e ç são aceitas, e há uma tabela do alfabeto árabe. O hindi não tem uma tabela Morse internacional de uso amplo, então use letras latinas.",
     "id": "Menerjemahkan teks ke kode Morse dan sebaliknya. Huruf dipisahkan spasi dan kata dipisahkan garis miring. Huruf, angka, dan tanda baca umum mengikuti kode internasional; huruf beraksen seperti é, ñ, dan ç didukung, dan tersedia tabel alfabet Arab. Bahasa Hindi tidak memiliki tabel Morse internasional yang luas dipakai, jadi gunakan huruf Latin.",
     "hi": "टेक्स्ट को मोर्स कोड में और मोर्स कोड को वापस टेक्स्ट में बदलता है। अक्षरों के बीच एक स्पेस और शब्दों के बीच स्लैश रखा जाता है। अक्षर, अंक और सामान्य विराम-चिह्न अंतरराष्ट्रीय कोड के अनुसार हैं; é, ñ और ç जैसे उच्चारण-चिह्न वाले अक्षर भी समर्थित हैं, और अरबी वर्णमाला की तालिका उपलब्ध है। हिंदी के लिए व्यापक रूप से अपनाई गई कोई अंतरराष्ट्रीय मोर्स तालिका नहीं है, इसलिए लैटिन अक्षरों का उपयोग करें।",
     "ar": "يحوّل النص إلى شفرة مورس ويعيدها إلى نص. تُفصل الحروف بمسافة والكلمات بشرطة مائلة. تتبع الحروف والأرقام وعلامات الترقيم الشائعة الشفرة الدولية، وتُدعم الحروف ذات العلامات مثل é وñ وç، كما يتوفر جدول للأبجدية العربية. لا يوجد جدول مورس دولي واسع الاعتماد للهندية، لذا استخدم الحروف اللاتينية."
    }
   },
   {
    "id": "caesar-cipher",
    "n": {
     "en": "Caesar Cipher (ROT13)",
     "es": "Cifrado César (ROT13)",
     "pt": "Cifra de César (ROT13)",
     "id": "Sandi Caesar (ROT13)",
     "hi": "सीज़र सिफ़र (ROT13)",
     "ar": "شيفرة قيصر (ROT13)"
    },
    "a": {
     "en": "Shifts each letter A–Z by a fixed number of places in the alphabet. A shift of 13 is ROT13, which undoes itself. Only unaccented Latin letters change; digits, accented letters, spaces and other scripts stay as they are. The Caesar cipher is a historical puzzle and is trivial to break, so never use it to protect real data.",
     "es": "Desplaza cada letra A–Z un número fijo de posiciones del alfabeto. Un desplazamiento de 13 es ROT13, que se deshace a sí mismo. Solo cambian las letras latinas sin acento; los números, las letras con acento, los espacios y otras escrituras se mantienen. El cifrado César es un juego histórico y se rompe con facilidad, así que nunca lo uses para proteger datos reales.",
     "pt": "Desloca cada letra A–Z um número fixo de posições no alfabeto. Um deslocamento de 13 é o ROT13, que se desfaz sozinho. Só mudam as letras latinas sem acento; números, letras acentuadas, espaços e outras escritas permanecem iguais. A cifra de César é um quebra-cabeça histórico e é fácil de quebrar, por isso nunca a use para proteger dados reais.",
     "id": "Menggeser setiap huruf A–Z sejauh jumlah posisi tetap dalam alfabet. Pergeseran 13 adalah ROT13, yang membatalkan dirinya sendiri. Hanya huruf Latin tanpa aksen yang berubah; angka, huruf beraksen, spasi, dan aksara lain tetap. Sandi Caesar adalah teka-teki sejarah dan sangat mudah dipecahkan, jadi jangan pernah memakainya untuk melindungi data sungguhan.",
     "hi": "हर अक्षर A–Z को वर्णमाला में तय संख्या में आगे खिसकाता है। 13 की शिफ़्ट ROT13 कहलाती है, जो अपने आप उलट जाती है। केवल बिना उच्चारण-चिह्न वाले लैटिन अक्षर बदलते हैं; अंक, उच्चारण-चिह्न वाले अक्षर, स्पेस और अन्य लिपियाँ जस की तस रहती हैं। सीज़र सिफ़र एक ऐतिहासिक पहेली है और इसे आसानी से तोड़ा जा सकता है, इसलिए असली डेटा की सुरक्षा के लिए इसका उपयोग कभी न करें।",
     "ar": "يزيح كل حرف من A–Z عددًا ثابتًا من المواضع في الأبجدية. الإزاحة 13 هي ROT13 وتلغي نفسها بنفسها. تتغير الحروف اللاتينية الأساسية فقط؛ أما الأرقام والحروف ذات العلامات والمسافات والكتابات الأخرى فتبقى كما هي. شيفرة قيصر لغز تاريخي وكسرها سهل جدًا، لذا لا تستخدمها أبدًا لحماية بيانات حقيقية."
    }
   },
   {
    "id": "vigenere-cipher",
    "n": {
     "en": "Vigenère Cipher",
     "es": "Cifrado de Vigenère",
     "pt": "Cifra de Vigenère",
     "id": "Sandi Vigenère",
     "hi": "विज़ेनर सिफ़र",
     "ar": "شيفرة فيجينير"
    },
    "a": {
     "en": "Encrypts text with a repeating keyword: each letter of the key sets a different Caesar shift. Only A–Z letters in the text and the key are used; other characters pass through unchanged and do not advance the key. It is stronger than a single Caesar shift but is still a classical cipher that can be broken, so do not use it for sensitive data.",
     "es": "Cifra el texto con una palabra clave que se repite: cada letra de la clave define un desplazamiento César distinto. Solo se usan letras A–Z en el texto y en la clave; los demás caracteres pasan sin cambios y no avanzan la clave. Es más fuerte que un solo desplazamiento César, pero sigue siendo un cifrado clásico que puede romperse; no lo uses con datos sensibles.",
     "pt": "Cifra o texto com uma palavra-chave que se repete: cada letra da chave define um deslocamento de César diferente. Apenas letras A–Z do texto e da chave são usadas; os demais caracteres passam sem alteração e não avançam a chave. É mais forte que um único deslocamento de César, mas continua sendo uma cifra clássica que pode ser quebrada; não a use com dados sensíveis.",
     "id": "Mengenkripsi teks dengan kata kunci berulang: setiap huruf kunci menentukan pergeseran Caesar yang berbeda. Hanya huruf A–Z pada teks dan kunci yang dipakai; karakter lain dibiarkan dan tidak memajukan kunci. Sandi ini lebih kuat daripada satu pergeseran Caesar, tetapi tetap sandi klasik yang dapat dipecahkan, jadi jangan dipakai untuk data sensitif.",
     "hi": "दोहराए जाने वाले कुंजी शब्द से टेक्स्ट को एन्क्रिप्ट करता है: कुंजी का हर अक्षर एक अलग सीज़र शिफ़्ट तय करता है। टेक्स्ट और कुंजी में केवल A–Z अक्षर गिने जाते हैं; अन्य वर्ण बिना बदले रहते हैं और कुंजी को आगे नहीं बढ़ाते। यह एकल सीज़र शिफ़्ट से मज़बूत है, फिर भी एक पारंपरिक सिफ़र है जिसे तोड़ा जा सकता है, इसलिए संवेदनशील डेटा के लिए इसका उपयोग न करें।",
     "ar": "يشفّر النص بكلمة مفتاحية متكررة: كل حرف من المفتاح يحدد إزاحة قيصر مختلفة. تُستخدم حروف A–Z فقط في النص والمفتاح؛ وتمر الأحرف الأخرى دون تغيير ولا تُقدّم المفتاح. هي أقوى من إزاحة قيصر الواحدة، لكنها تظل شيفرة كلاسيكية يمكن كسرها، لذا لا تستخدمها مع بيانات حساسة."
    }
   },
   {
    "id": "atbash-cipher",
    "n": {
     "en": "Atbash Cipher",
     "es": "Cifrado Atbash",
     "pt": "Cifra Atbash",
     "id": "Sandi Atbash",
     "hi": "अतबश सिफ़र",
     "ar": "شيفرة أتباش"
    },
    "a": {
     "en": "Replaces each letter with its mirror in the alphabet: A becomes Z, B becomes Y and so on. Applying it twice returns the original text. Only unaccented Latin letters change. It is a simple historical cipher with no real security.",
     "es": "Sustituye cada letra por su reflejo en el alfabeto: la A pasa a Z, la B a Y, y así sucesivamente. Aplicarlo dos veces devuelve el texto original. Solo cambian las letras latinas sin acento. Es un cifrado histórico sencillo y no ofrece seguridad real.",
     "pt": "Substitui cada letra pelo seu espelho no alfabeto: A vira Z, B vira Y e assim por diante. Aplicá-lo duas vezes devolve o texto original. Só mudam as letras latinas sem acento. É uma cifra histórica simples e não oferece segurança real.",
     "id": "Mengganti setiap huruf dengan cerminannya dalam alfabet: A menjadi Z, B menjadi Y, dan seterusnya. Menerapkannya dua kali mengembalikan teks asli. Hanya huruf Latin tanpa aksen yang berubah. Ini sandi sejarah yang sederhana dan tidak memberi keamanan nyata.",
     "hi": "हर अक्षर को वर्णमाला में उसके दर्पण-अक्षर से बदलता है: A बनता है Z, B बनता है Y, और इसी तरह आगे। इसे दो बार लगाने पर मूल टेक्स्ट वापस मिल जाता है। केवल बिना उच्चारण-चिह्न वाले लैटिन अक्षर बदलते हैं। यह एक सरल ऐतिहासिक सिफ़र है और इसमें वास्तविक सुरक्षा नहीं है।",
     "ar": "يستبدل كل حرف بنظيره المقابل في الأبجدية: يصبح A هو Z وB هو Y وهكذا. وتطبيقه مرتين يعيد النص الأصلي. تتغير الحروف اللاتينية الأساسية فقط. هي شيفرة تاريخية بسيطة ولا توفر أمانًا حقيقيًا."
    }
   },
   {
    "id": "text-to-binary",
    "n": {
     "en": "Text to Binary and Hex",
     "es": "Texto a binario y hexadecimal",
     "pt": "Texto para binário e hexadecimal",
     "id": "Teks ke Biner dan Heksadesimal",
     "hi": "टेक्स्ट से बाइनरी और हेक्स",
     "ar": "نص إلى ثنائي وسداسي عشري"
    },
    "a": {
     "en": "Converts text to the numeric value of each UTF-8 byte, written in binary, octal, decimal or hexadecimal, and converts such numbers back to text. Because UTF-8 is used, accented letters and scripts such as Hindi or Arabic take more than one byte each. Separate the numbers with spaces when converting back.",
     "es": "Convierte texto en el valor numérico de cada byte UTF-8, escrito en binario, octal, decimal o hexadecimal, y vuelve a convertir esos números en texto. Como se usa UTF-8, las letras con acento y escrituras como el hindi o el árabe ocupan más de un byte cada una. Al convertir de vuelta, separa los números con espacios.",
     "pt": "Converte texto no valor numérico de cada byte UTF-8, escrito em binário, octal, decimal ou hexadecimal, e converte esses números de volta em texto. Como o UTF-8 é usado, letras acentuadas e escritas como hindi ou árabe ocupam mais de um byte cada. Ao converter de volta, separe os números com espaços.",
     "id": "Mengubah teks menjadi nilai numerik setiap byte UTF-8, ditulis dalam biner, oktal, desimal, atau heksadesimal, dan mengubah angka tersebut kembali menjadi teks. Karena memakai UTF-8, huruf beraksen dan aksara seperti Hindi atau Arab memerlukan lebih dari satu byte per karakter. Saat mengubah kembali, pisahkan angka dengan spasi.",
     "hi": "टेक्स्ट के हर UTF-8 बाइट का संख्यात्मक मान बाइनरी, ऑक्टल, दशमलव या हेक्साडेसिमल में लिखता है, और ऐसी संख्याओं को वापस टेक्स्ट में बदलता है। UTF-8 उपयोग होने के कारण उच्चारण-चिह्न वाले अक्षर और हिंदी या अरबी जैसी लिपियाँ प्रति अक्षर एक से अधिक बाइट लेती हैं। वापस बदलते समय संख्याओं को स्पेस से अलग रखें।",
     "ar": "يحوّل النص إلى القيمة العددية لكل بايت بترميز UTF-8 مكتوبة بالنظام الثنائي أو الثماني أو العشري أو السداسي عشري، ويعيد هذه الأعداد إلى نص. وبما أن الترميز UTF-8، فإن الحروف ذات العلامات والكتابات مثل الهندية أو العربية تشغل أكثر من بايت واحد لكل حرف. افصل بين الأعداد بمسافات عند التحويل العكسي."
    }
   },
   {
    "id": "base64-text",
    "n": {
     "en": "Base64 Encode and Decode",
     "es": "Codificar y decodificar Base64",
     "pt": "Codificar e decodificar Base64",
     "id": "Enkode dan Dekode Base64",
     "hi": "Base64 एन्कोड और डिकोड",
     "ar": "ترميز Base64 وفك ترميزه"
    },
    "a": {
     "en": "Encodes text as Base64 and decodes Base64 back to text, using UTF-8 so accents and non-Latin scripts survive the round trip. The decoder also accepts the URL-safe variant and missing padding. Base64 is an encoding, not encryption: anyone can reverse it.",
     "es": "Codifica texto en Base64 y decodifica Base64 a texto usando UTF-8, de modo que los acentos y las escrituras no latinas se conservan en el viaje de ida y vuelta. El decodificador también acepta la variante segura para URL y el relleno ausente. Base64 es una codificación, no un cifrado: cualquiera puede revertirla.",
     "pt": "Codifica texto em Base64 e decodifica Base64 para texto usando UTF-8, de modo que acentos e escritas não latinas se mantêm na ida e volta. O decodificador também aceita a variante segura para URL e o preenchimento ausente. Base64 é uma codificação, não uma criptografia: qualquer pessoa pode revertê-la.",
     "id": "Mengenkode teks ke Base64 dan mendekode Base64 kembali ke teks dengan UTF-8, sehingga aksen dan aksara non-Latin tetap utuh bolak-balik. Dekoder juga menerima varian aman-URL dan padding yang hilang. Base64 adalah pengodean, bukan enkripsi: siapa pun dapat membaliknya.",
     "hi": "टेक्स्ट को Base64 में एन्कोड करता है और Base64 को वापस टेक्स्ट में डिकोड करता है। UTF-8 के उपयोग से उच्चारण-चिह्न और गैर-लैटिन लिपियाँ दोनों दिशाओं में सुरक्षित रहती हैं। डिकोडर URL-सुरक्षित रूप और छूटी हुई पैडिंग भी स्वीकार करता है। Base64 एक एन्कोडिंग है, एन्क्रिप्शन नहीं: कोई भी इसे उलट सकता है।",
     "ar": "يرمّز النص إلى Base64 ويفك ترميز Base64 إلى نص باستخدام UTF-8، فتبقى العلامات والكتابات غير اللاتينية سليمة في الاتجاهين. كما يقبل فاكّ الترميز الصيغة الآمنة للروابط والحشو الناقص. Base64 ترميز وليس تشفيرًا: يمكن لأي شخص عكسه."
    }
   },
   {
    "id": "url-encoder",
    "n": {
     "en": "URL Encoder and Decoder",
     "es": "Codificador y decodificador de URL",
     "pt": "Codificador e decodificador de URL",
     "id": "Enkode dan Dekode URL",
     "hi": "URL एन्कोडर और डिकोडर",
     "ar": "ترميز الروابط وفك ترميزها"
    },
    "a": {
     "en": "Percent-encodes text so it can be placed safely inside a URL, and decodes percent-encoded text back. It encodes every reserved character, including / ? & = and #, so use it for a single value such as a query parameter, not for a whole address. Accented and non-Latin characters are encoded as UTF-8.",
     "es": "Codifica el texto con porcentaje para colocarlo con seguridad dentro de una URL, y decodifica texto codificado. Codifica todos los caracteres reservados, incluidos / ? & = y #, así que úsalo para un solo valor, como un parámetro de consulta, y no para una dirección completa. Los caracteres con acento y no latinos se codifican en UTF-8.",
     "pt": "Codifica o texto com porcentagem para colocá-lo com segurança dentro de uma URL, e decodifica texto codificado. Codifica todos os caracteres reservados, incluindo / ? & = e #, então use-o para um único valor, como um parâmetro de consulta, e não para um endereço completo. Caracteres acentuados e não latinos são codificados em UTF-8.",
     "id": "Mengenkode teks dengan persen agar aman ditempatkan di dalam URL, dan mendekode teks berkode persen. Alat ini mengenkode semua karakter terpesan, termasuk / ? & = dan #, jadi gunakan untuk satu nilai seperti parameter kueri, bukan untuk alamat lengkap. Karakter beraksen dan non-Latin dikodekan sebagai UTF-8.",
     "hi": "टेक्स्ट को प्रतिशत-एन्कोडिंग से URL के भीतर सुरक्षित रूप से रखने योग्य बनाता है और एन्कोड किए गए टेक्स्ट को वापस डिकोड करता है। यह / ? & = और # समेत सभी आरक्षित वर्णों को एन्कोड करता है, इसलिए इसे किसी क्वेरी पैरामीटर जैसे एक मान के लिए उपयोग करें, पूरे पते के लिए नहीं। उच्चारण-चिह्न वाले और गैर-लैटिन वर्ण UTF-8 में एन्कोड होते हैं।",
     "ar": "يرمّز النص بالنسبة المئوية ليوضع بأمان داخل رابط، ويفك ترميز النص المرمَّز. يرمّز كل الأحرف المحجوزة بما فيها / ? & = و #، لذا استخدمه لقيمة واحدة مثل معامل استعلام وليس لعنوان كامل. تُرمَّز الأحرف ذات العلامات وغير اللاتينية بترميز UTF-8."
    }
   },
   {
    "id": "hash-generator",
    "n": {
     "en": "Hash Generator (SHA-256, SHA-512)",
     "es": "Generador de hash (SHA-256, SHA-512)",
     "pt": "Gerador de hash (SHA-256, SHA-512)",
     "id": "Pembuat Hash (SHA-256, SHA-512)",
     "hi": "हैश जनरेटर (SHA-256, SHA-512)",
     "ar": "مولّد التجزئة (SHA-256 وSHA-512)"
    },
    "a": {
     "en": "Computes SHA-1, SHA-256, SHA-384 and SHA-512 hashes of your text using your browser's built-in cryptography. A hash is a fixed-length fingerprint: the same text always gives the same hash, and a tiny change gives a completely different one. Hashes cannot be turned back into text. SHA-1 is shown only for compatibility and should not be used for security.",
     "es": "Calcula los hashes SHA-1, SHA-256, SHA-384 y SHA-512 de tu texto con la criptografía integrada de tu navegador. Un hash es una huella de longitud fija: el mismo texto siempre da el mismo hash y un cambio mínimo da uno totalmente distinto. Un hash no puede convertirse de nuevo en texto. SHA-1 se muestra solo por compatibilidad y no debe usarse para seguridad.",
     "pt": "Calcula os hashes SHA-1, SHA-256, SHA-384 e SHA-512 do seu texto usando a criptografia integrada do navegador. Um hash é uma impressão digital de tamanho fixo: o mesmo texto sempre gera o mesmo hash, e uma mudança mínima gera um totalmente diferente. Um hash não pode ser convertido de volta em texto. O SHA-1 é exibido apenas por compatibilidade e não deve ser usado para segurança.",
     "id": "Menghitung hash SHA-1, SHA-256, SHA-384, dan SHA-512 dari teks Anda memakai kriptografi bawaan browser. Hash adalah sidik jari berpanjang tetap: teks yang sama selalu menghasilkan hash yang sama, dan perubahan sekecil apa pun menghasilkan hash yang sama sekali berbeda. Hash tidak dapat diubah kembali menjadi teks. SHA-1 hanya ditampilkan demi kompatibilitas dan tidak boleh dipakai untuk keamanan.",
     "hi": "आपके ब्राउज़र की अंतर्निहित क्रिप्टोग्राफ़ी से आपके टेक्स्ट के SHA-1, SHA-256, SHA-384 और SHA-512 हैश निकालता है। हैश तय लंबाई की एक अंगुली-छाप है: एक ही टेक्स्ट से हमेशा वही हैश मिलता है और ज़रा-सा बदलाव पूरी तरह अलग हैश देता है। हैश को वापस टेक्स्ट में नहीं बदला जा सकता। SHA-1 केवल संगतता के लिए दिखाया गया है और सुरक्षा के लिए उपयोग नहीं होना चाहिए।",
     "ar": "يحسب تجزئات SHA-1 وSHA-256 وSHA-384 وSHA-512 لنصك باستخدام التشفير المدمج في متصفحك. التجزئة بصمة ذات طول ثابت: النص نفسه يعطي دائمًا التجزئة نفسها، وأي تغيير بسيط يعطي تجزئة مختلفة تمامًا. لا يمكن إعادة التجزئة إلى نص. يُعرض SHA-1 للتوافق فقط ولا ينبغي استخدامه لأغراض الأمان."
    }
   },
   {
    "id": "aes-encryption",
    "n": {
     "en": "AES Text Encryption",
     "es": "Cifrado de texto AES",
     "pt": "Criptografia de texto AES",
     "id": "Enkripsi Teks AES",
     "hi": "AES टेक्स्ट एन्क्रिप्शन",
     "ar": "تشفير النص بـ AES"
    },
    "a": {
     "en": "Encrypts text with a password using AES-256-GCM. The key is derived from your password with PBKDF2 (SHA-256, 600,000 iterations) and a random salt, and a random nonce is used for each encryption, so the same text gives a different result every time. Everything happens in your browser. If you lose the password, the text cannot be recovered. Use a long, unique password.",
     "es": "Cifra texto con una contraseña usando AES-256-GCM. La clave se deriva de tu contraseña con PBKDF2 (SHA-256, 600 000 iteraciones) y una sal aleatoria, y cada cifrado usa un nonce aleatorio, por lo que el mismo texto da un resultado distinto cada vez. Todo ocurre en tu navegador. Si pierdes la contraseña, el texto no se puede recuperar. Usa una contraseña larga y única.",
     "pt": "Criptografa texto com uma senha usando AES-256-GCM. A chave é derivada da sua senha com PBKDF2 (SHA-256, 600 000 iterações) e um sal aleatório, e cada criptografia usa um nonce aleatório, então o mesmo texto gera um resultado diferente a cada vez. Tudo acontece no seu navegador. Se você perder a senha, o texto não poderá ser recuperado. Use uma senha longa e única.",
     "id": "Mengenkripsi teks dengan kata sandi memakai AES-256-GCM. Kunci diturunkan dari kata sandi Anda dengan PBKDF2 (SHA-256, 600.000 iterasi) dan salt acak, dan setiap enkripsi memakai nonce acak, sehingga teks yang sama menghasilkan keluaran berbeda setiap kali. Semuanya terjadi di browser Anda. Jika kata sandi hilang, teks tidak dapat dipulihkan. Gunakan kata sandi yang panjang dan unik.",
     "hi": "पासवर्ड से AES-256-GCM का उपयोग करके टेक्स्ट को एन्क्रिप्ट करता है। कुंजी आपके पासवर्ड से PBKDF2 (SHA-256, 6,00,000 पुनरावृत्तियाँ) और एक यादृच्छिक सॉल्ट के साथ बनती है, और हर एन्क्रिप्शन में यादृच्छिक नॉन्स लगता है, इसलिए एक ही टेक्स्ट हर बार अलग परिणाम देता है। सब कुछ आपके ब्राउज़र में होता है। पासवर्ड खो जाने पर टेक्स्ट वापस नहीं पाया जा सकता। लंबा और अनूठा पासवर्ड उपयोग करें।",
     "ar": "يشفّر النص بكلمة مرور باستخدام AES-256-GCM. يُشتق المفتاح من كلمة مرورك عبر PBKDF2 (SHA-256 و600000 تكرار) مع ملح عشوائي، ويُستخدم nonce عشوائي في كل تشفير، فيعطي النص نفسه ناتجًا مختلفًا في كل مرة. كل شيء يحدث داخل متصفحك. إذا فقدت كلمة المرور فلا يمكن استرجاع النص. استخدم كلمة مرور طويلة وفريدة."
    }
   },
   {
    "id": "password-generator",
    "n": {
     "en": "Password Generator",
     "es": "Generador de contraseñas",
     "pt": "Gerador de senhas",
     "id": "Pembuat Kata Sandi",
     "hi": "पासवर्ड जनरेटर",
     "ar": "مولّد كلمات المرور"
    },
    "a": {
     "en": "Creates random passwords using your browser's secure random number generator. Choose the length and which character types to include; the result contains at least one character of each selected type. Passwords are created on your device and are never sent or stored. Longer passwords are stronger, and each account should have its own.",
     "es": "Crea contraseñas aleatorias con el generador seguro de números aleatorios de tu navegador. Elige la longitud y los tipos de caracteres; el resultado contiene al menos un carácter de cada tipo seleccionado. Las contraseñas se crean en tu dispositivo y nunca se envían ni se guardan. Cuanto más larga, más fuerte es, y cada cuenta debería tener la suya.",
     "pt": "Cria senhas aleatórias com o gerador seguro de números aleatórios do navegador. Escolha o comprimento e os tipos de caracteres; o resultado contém pelo menos um caractere de cada tipo selecionado. As senhas são criadas no seu dispositivo e nunca são enviadas nem armazenadas. Quanto mais longa, mais forte, e cada conta deve ter a sua.",
     "id": "Membuat kata sandi acak dengan generator bilangan acak aman milik browser. Pilih panjang dan jenis karakter; hasilnya memuat setidaknya satu karakter dari tiap jenis yang dipilih. Kata sandi dibuat di perangkat Anda dan tidak pernah dikirim atau disimpan. Semakin panjang semakin kuat, dan setiap akun sebaiknya punya kata sandi sendiri.",
     "hi": "आपके ब्राउज़र के सुरक्षित यादृच्छिक संख्या जनरेटर से यादृच्छिक पासवर्ड बनाता है। लंबाई और वर्णों के प्रकार चुनें; नतीजे में हर चुने हुए प्रकार का कम से कम एक वर्ण होता है। पासवर्ड आपके डिवाइस पर बनते हैं और कभी भेजे या सहेजे नहीं जाते। जितना लंबा, उतना मज़बूत, और हर खाते का अपना अलग पासवर्ड होना चाहिए।",
     "ar": "ينشئ كلمات مرور عشوائية باستخدام مولّد الأعداد العشوائية الآمن في متصفحك. اختر الطول وأنواع الأحرف؛ وتحتوي النتيجة على حرف واحد على الأقل من كل نوع محدد. تُنشأ كلمات المرور على جهازك ولا تُرسل ولا تُخزَّن أبدًا. كلما كانت أطول كانت أقوى، ويجدر أن يكون لكل حساب كلمة مرور خاصة به."
    }
   }
  ]
 },
 {
  "slug": "converters",
  "k": "conv",
  "tools": [
   {
    "id": "length-converter",
    "n": {
     "en": "Length Converter",
     "es": "Conversor de longitud",
     "pt": "Conversor de comprimento",
     "id": "Konverter Panjang",
     "hi": "लंबाई कन्वर्टर",
     "ar": "محوّل الطول"
    },
    "a": {
     "en": "Converts between millimetres, centimetres, metres, kilometres, inches, feet, yards, miles and nautical miles (nmi). Results use exact definitions, for example 1 inch = 25.4 mm and 1 mile = 1,609.344 m, and are shown with up to 10 significant digits.",
     "es": "Convierte entre milímetros, centímetros, metros, kilómetros, pulgadas, pies, yardas, millas y millas náuticas (nmi). Los resultados usan definiciones exactas, por ejemplo 1 pulgada = 25,4 mm y 1 milla = 1609,344 m, y se muestran con hasta 10 cifras significativas.",
     "pt": "Converte entre milímetros, centímetros, metros, quilômetros, polegadas, pés, jardas, milhas e milhas náuticas (nmi). Os resultados usam definições exatas, por exemplo 1 polegada = 25,4 mm e 1 milha = 1609,344 m, e são exibidos com até 10 algarismos significativos.",
     "id": "Mengonversi antara milimeter, sentimeter, meter, kilometer, inci, kaki, yard, mil, dan mil laut (nmi). Hasil memakai definisi pasti, misalnya 1 inci = 25,4 mm dan 1 mil = 1.609,344 m, serta ditampilkan hingga 10 angka signifikan.",
     "hi": "मिलीमीटर, सेंटीमीटर, मीटर, किलोमीटर, इंच, फ़ुट, गज़, मील और नॉटिकल मील (nmi) के बीच बदलता है। परिणाम सटीक परिभाषाओं पर आधारित हैं, जैसे 1 इंच = 25.4 mm और 1 मील = 1,609.344 m, और अधिकतम 10 सार्थक अंकों तक दिखाए जाते हैं।",
     "ar": "يحوّل بين الميليمترات والسنتيمترات والأمتار والكيلومترات والبوصات والأقدام والياردات والأميال والأميال البحرية (nmi). تعتمد النتائج على تعريفات دقيقة، مثل 1 بوصة = 25.4 مم و1 ميل = 1609.344 م، وتُعرض بما يصل إلى 10 أرقام معنوية."
    }
   },
   {
    "id": "weight-converter",
    "n": {
     "en": "Weight Converter",
     "es": "Conversor de peso",
     "pt": "Conversor de peso",
     "id": "Konverter Berat",
     "hi": "वज़न कन्वर्टर",
     "ar": "محوّل الوزن"
    },
    "a": {
     "en": "Converts between milligrams, grams, kilograms, metric tonnes (t), ounces, pounds and stones. Strictly these are units of mass, which is what scales and everyday weight refer to. Results use exact definitions such as 1 lb = 0.45359237 kg.",
     "es": "Convierte entre miligramos, gramos, kilogramos, toneladas métricas (t), onzas, libras y stones. En rigor son unidades de masa, que es lo que miden las básculas y lo que se llama peso en el uso diario. Los resultados usan definiciones exactas, como 1 lb = 0,45359237 kg.",
     "pt": "Converte entre miligramas, gramas, quilogramas, toneladas métricas (t), onças, libras e stones. Estritamente são unidades de massa, que é o que as balanças medem e o que se chama de peso no dia a dia. Os resultados usam definições exatas, como 1 lb = 0,45359237 kg.",
     "id": "Mengonversi antara miligram, gram, kilogram, ton metrik (t), ounce (oz), pound (lb), dan stone (st). Secara ketat ini satuan massa, yang diukur timbangan dan disebut berat dalam keseharian. Hasil memakai definisi pasti seperti 1 lb = 0,45359237 kg.",
     "hi": "मिलीग्राम, ग्राम, किलोग्राम, मीट्रिक टन (t), औंस, पाउंड और स्टोन के बीच बदलता है। सख़्ती से ये द्रव्यमान की इकाइयाँ हैं, जिन्हें तराज़ू मापते हैं और रोज़मर्रा में वज़न कहा जाता है। परिणाम सटीक परिभाषाओं पर आधारित हैं, जैसे 1 lb = 0.45359237 kg।",
     "ar": "يحوّل بين الميليغرامات والغرامات والكيلوغرامات والأطنان المترية (t) والأونصات والأرطال والستونات. هذه في الدقة وحدات كتلة، وهي ما تقيسه الموازين وما يُسمّى وزنًا في الحياة اليومية. تعتمد النتائج على تعريفات دقيقة مثل 1 lb = 0.45359237 كغ."
    }
   },
   {
    "id": "temperature-converter",
    "n": {
     "en": "Temperature Converter",
     "es": "Conversor de temperatura",
     "pt": "Conversor de temperatura",
     "id": "Konverter Suhu",
     "hi": "तापमान कन्वर्टर",
     "ar": "محوّل درجة الحرارة"
    },
    "a": {
     "en": "Converts between degrees Celsius (°C), degrees Fahrenheit (°F) and kelvin (K). The formulas are °F = °C × 9/5 + 32 and K = °C + 273.15. Values below absolute zero (−273.15 °C) are not physically possible and are rejected.",
     "es": "Convierte entre grados Celsius (°C), grados Fahrenheit (°F) y kelvin (K). Las fórmulas son °F = °C × 9/5 + 32 y K = °C + 273,15. Los valores por debajo del cero absoluto (−273,15 °C) no son físicamente posibles y se rechazan.",
     "pt": "Converte entre graus Celsius (°C), graus Fahrenheit (°F) e kelvin (K). As fórmulas são °F = °C × 9/5 + 32 e K = °C + 273,15. Valores abaixo do zero absoluto (−273,15 °C) não são fisicamente possíveis e são rejeitados.",
     "id": "Mengonversi antara derajat Celsius (°C), derajat Fahrenheit (°F), dan kelvin (K). Rumusnya °F = °C × 9/5 + 32 dan K = °C + 273,15. Nilai di bawah nol mutlak (−273,15 °C) tidak mungkin secara fisik dan ditolak.",
     "hi": "डिग्री सेल्सियस (°C), डिग्री फ़ारेनहाइट (°F) और केल्विन (K) के बीच बदलता है। सूत्र हैं °F = °C × 9/5 + 32 और K = °C + 273.15। परम शून्य (−273.15 °C) से नीचे के मान भौतिक रूप से संभव नहीं हैं और अस्वीकार कर दिए जाते हैं।",
     "ar": "يحوّل بين الدرجة المئوية (°C) ودرجة فهرنهايت (°F) والكلفن (K). الصيغتان هما °F = °C × 9/5 + 32 وK = °C + 273.15. القيم الأدنى من الصفر المطلق (−273.15 °C) غير ممكنة فيزيائيًا وتُرفض."
    }
   },
   {
    "id": "volume-converter",
    "n": {
     "en": "Volume Converter",
     "es": "Conversor de volumen",
     "pt": "Conversor de volume",
     "id": "Konverter Volume",
     "hi": "आयतन कन्वर्टर",
     "ar": "محوّل الحجم"
    },
    "a": {
     "en": "Converts between millilitres, litres, cubic metres and the US customary units: teaspoon, tablespoon, fluid ounce, cup, pint, quart and gallon. These are US units, which differ from UK imperial ones, and the US cup is 236.588 mL, not the 250 mL used in many recipes.",
     "es": "Convierte entre mililitros, litros, metros cúbicos y las unidades habituales de EE. UU.: cucharadita, cucharada, onza líquida, taza, pinta, cuarto y galón. Son unidades estadounidenses, distintas de las imperiales del Reino Unido, y la taza de EE. UU. equivale a 236,588 mL, no a los 250 mL que usan muchas recetas.",
     "pt": "Converte entre mililitros, litros, metros cúbicos e as unidades usuais dos EUA: colher de chá, colher de sopa, onça fluida, xícara, pinta, quarto e galão. São unidades americanas, diferentes das imperiais do Reino Unido, e a xícara americana equivale a 236,588 mL, não aos 250 mL usados em muitas receitas.",
     "id": "Mengonversi antara mililiter, liter, meter kubik, dan satuan umum AS: sendok teh, sendok makan, fluid ounce, cangkir, pint, quart, dan galon. Ini satuan Amerika Serikat yang berbeda dari satuan imperial Inggris, dan cangkir AS setara 236,588 mL, bukan 250 mL seperti di banyak resep.",
     "hi": "मिलीलीटर, लीटर, घन मीटर और अमेरिकी प्रचलित इकाइयों के बीच बदलता है: चम्मच (tsp), बड़ा चम्मच (tbsp), फ़्लुइड औंस, कप, पिंट, क्वार्ट और गैलन। ये अमेरिकी इकाइयाँ हैं, जो ब्रिटिश इंपीरियल इकाइयों से अलग हैं, और अमेरिकी कप 236.588 mL का होता है, कई रेसिपियों में प्रयुक्त 250 mL का नहीं।",
     "ar": "يحوّل بين المليلترات واللترات والأمتار المكعبة ووحدات الولايات المتحدة الشائعة: الملعقة الصغيرة والكبيرة والأونصة السائلة والكوب والباينت والكوارت والغالون. هذه وحدات أمريكية تختلف عن الوحدات الإمبراطورية البريطانية، والكوب الأمريكي يساوي 236.588 مل وليس 250 مل كما في وصفات كثيرة."
    }
   },
   {
    "id": "speed-converter",
    "n": {
     "en": "Speed Converter",
     "es": "Conversor de velocidad",
     "pt": "Conversor de velocidade",
     "id": "Konverter Kecepatan",
     "hi": "गति कन्वर्टर",
     "ar": "محوّل السرعة"
    },
    "a": {
     "en": "Converts between metres per second (m/s), kilometres per hour (km/h), miles per hour (mph), knots (kn) and feet per second (ft/s). A knot is one nautical mile per hour, which is exactly 1.852 km/h.",
     "es": "Convierte entre metros por segundo (m/s), kilómetros por hora (km/h), millas por hora (mph), nudos (kn) y pies por segundo (ft/s). Un nudo es una milla náutica por hora, es decir, exactamente 1,852 km/h.",
     "pt": "Converte entre metros por segundo (m/s), quilômetros por hora (km/h), milhas por hora (mph), nós (kn) e pés por segundo (ft/s). Um nó é uma milha náutica por hora, ou seja, exatamente 1,852 km/h.",
     "id": "Mengonversi antara meter per detik (m/s), kilometer per jam (km/h), mil per jam (mph), knot (kn), dan kaki per detik (ft/s). Satu knot adalah satu mil laut per jam, yaitu tepat 1,852 km/jam.",
     "hi": "मीटर प्रति सेकंड (m/s), किलोमीटर प्रति घंटा (km/h), मील प्रति घंटा (mph), नॉट (kn) और फ़ुट प्रति सेकंड (ft/s) के बीच बदलता है। एक नॉट प्रति घंटे एक नॉटिकल मील के बराबर है, यानी ठीक 1.852 km/h।",
     "ar": "يحوّل بين المتر في الثانية (m/s) والكيلومتر في الساعة (km/h) والميل في الساعة (mph) والعقدة (kn) والقدم في الثانية (ft/s). العقدة تساوي ميلًا بحريًا واحدًا في الساعة، أي 1.852 كم/س بالضبط."
    }
   },
   {
    "id": "area-converter",
    "n": {
     "en": "Area Converter",
     "es": "Conversor de área",
     "pt": "Conversor de área",
     "id": "Konverter Luas",
     "hi": "क्षेत्रफल कन्वर्टर",
     "ar": "محوّل المساحة"
    },
    "a": {
     "en": "Converts between square millimetres, square centimetres, square metres, hectares, square kilometres, square inches, square feet, square yards, acres and square miles. One hectare is 10,000 m², and one acre is 4,046.8564224 m².",
     "es": "Convierte entre milímetros cuadrados, centímetros cuadrados, metros cuadrados, hectáreas, kilómetros cuadrados, pulgadas cuadradas, pies cuadrados, yardas cuadradas, acres y millas cuadradas. Una hectárea son 10 000 m² y un acre son 4046,8564224 m².",
     "pt": "Converte entre milímetros quadrados, centímetros quadrados, metros quadrados, hectares, quilômetros quadrados, polegadas quadradas, pés quadrados, jardas quadradas, acres e milhas quadradas. Um hectare são 10 000 m² e um acre são 4046,8564224 m².",
     "id": "Mengonversi antara milimeter persegi, sentimeter persegi, meter persegi, hektare, kilometer persegi, inci persegi, kaki persegi, yard persegi, acre, dan mil persegi. Satu hektare adalah 10.000 m² dan satu acre adalah 4.046,8564224 m².",
     "hi": "वर्ग मिलीमीटर, वर्ग सेंटीमीटर, वर्ग मीटर, हेक्टेयर, वर्ग किलोमीटर, वर्ग इंच, वर्ग फ़ुट, वर्ग गज़, एकड़ और वर्ग मील के बीच बदलता है। एक हेक्टेयर 10,000 m² और एक एकड़ 4,046.8564224 m² के बराबर है।",
     "ar": "يحوّل بين المليمترات المربعة والسنتيمترات المربعة والأمتار المربعة والهكتارات والكيلومترات المربعة والبوصات المربعة والأقدام المربعة والياردات المربعة والأكرات والأميال المربعة. الهكتار الواحد يساوي 10000 م² والأكر الواحد يساوي 4046.8564224 م²."
    }
   },
   {
    "id": "data-size-converter",
    "n": {
     "en": "Data Size Converter",
     "es": "Conversor de tamaño de datos",
     "pt": "Conversor de tamanho de dados",
     "id": "Konverter Ukuran Data",
     "hi": "डेटा आकार कन्वर्टर",
     "ar": "محوّل حجم البيانات"
    },
    "a": {
     "en": "Converts between bits, bytes and both decimal and binary multiples. Decimal units (kB, MB, GB, TB) use powers of 1,000, while binary units (KiB, MiB, GiB, TiB) use powers of 1,024. Storage makers usually quote decimal units, which can make a drive look smaller in some operating systems.",
     "es": "Convierte entre bits, bytes y múltiplos decimales y binarios. Las unidades decimales (kB, MB, GB, TB) usan potencias de 1000 y las binarias (KiB, MiB, GiB, TiB) potencias de 1024. Los fabricantes de almacenamiento suelen usar unidades decimales, por lo que una unidad puede parecer más pequeña en algunos sistemas operativos.",
     "pt": "Converte entre bits, bytes e múltiplos decimais e binários. As unidades decimais (kB, MB, GB, TB) usam potências de 1000 e as binárias (KiB, MiB, GiB, TiB) potências de 1024. Os fabricantes de armazenamento costumam usar unidades decimais, por isso um disco pode parecer menor em alguns sistemas operacionais.",
     "id": "Mengonversi antara bit, byte, serta kelipatan desimal dan biner. Satuan desimal (kB, MB, GB, TB) memakai pangkat 1.000, sedangkan satuan biner (KiB, MiB, GiB, TiB) memakai pangkat 1.024. Produsen penyimpanan biasanya memakai satuan desimal, sehingga kapasitas disk bisa tampak lebih kecil di sebagian sistem operasi.",
     "hi": "बिट, बाइट तथा दशमलव और बाइनरी गुणजों के बीच बदलता है। दशमलव इकाइयाँ (kB, MB, GB, TB) 1,000 की घातों का और बाइनरी इकाइयाँ (KiB, MiB, GiB, TiB) 1,024 की घातों का उपयोग करती हैं। स्टोरेज निर्माता आम तौर पर दशमलव इकाइयाँ बताते हैं, इसलिए कुछ ऑपरेटिंग सिस्टम में ड्राइव छोटी दिख सकती है।",
     "ar": "يحوّل بين البتات والبايتات والمضاعفات العشرية والثنائية. تستخدم الوحدات العشرية (kB وMB وGB وTB) قوى العدد 1000، بينما تستخدم الوحدات الثنائية (KiB وMiB وGiB وTiB) قوى العدد 1024. تذكر شركات التخزين عادةً الوحدات العشرية، ولهذا قد يبدو القرص أصغر في بعض أنظمة التشغيل."
    }
   },
   {
    "id": "time-converter",
    "n": {
     "en": "Time Unit Converter",
     "es": "Conversor de unidades de tiempo",
     "pt": "Conversor de unidades de tempo",
     "id": "Konverter Satuan Waktu",
     "hi": "समय इकाई कन्वर्टर",
     "ar": "محوّل وحدات الوقت"
    },
    "a": {
     "en": "Converts between milliseconds, seconds, minutes, hours, days and weeks. Months and years are left out on purpose because their length varies. A day is counted as exactly 24 hours and a week as exactly 7 days.",
     "es": "Convierte entre milisegundos, segundos, minutos, horas, días y semanas. Los meses y los años se omiten a propósito porque su duración varía. Un día se cuenta como exactamente 24 horas y una semana como exactamente 7 días.",
     "pt": "Converte entre milissegundos, segundos, minutos, horas, dias e semanas. Meses e anos ficam de fora de propósito porque sua duração varia. Um dia é contado como exatamente 24 horas e uma semana como exatamente 7 dias.",
     "id": "Mengonversi antara milidetik, detik, menit, jam, hari, dan minggu. Bulan dan tahun sengaja tidak disertakan karena panjangnya bervariasi. Satu hari dihitung tepat 24 jam dan satu minggu tepat 7 hari.",
     "hi": "मिलीसेकंड, सेकंड, मिनट, घंटे, दिन और सप्ताह के बीच बदलता है। महीने और वर्ष जानबूझकर शामिल नहीं किए गए हैं क्योंकि उनकी अवधि बदलती रहती है। एक दिन को ठीक 24 घंटे और एक सप्ताह को ठीक 7 दिन गिना जाता है।",
     "ar": "يحوّل بين المللي ثانية والثواني والدقائق والساعات والأيام والأسابيع. استُبعدت الأشهر والسنوات عمدًا لأن مدتها تتفاوت. يُحتسب اليوم 24 ساعة بالضبط والأسبوع 7 أيام بالضبط."
    }
   },
   {
    "id": "number-base-converter",
    "n": {
     "en": "Number Base Converter",
     "es": "Conversor de bases numéricas",
     "pt": "Conversor de bases numéricas",
     "id": "Konverter Sistem Bilangan",
     "hi": "संख्या प्रणाली कन्वर्टर",
     "ar": "محوّل الأنظمة العددية"
    },
    "a": {
     "en": "Converts whole numbers between binary (base 2), octal (base 8), decimal (base 10) and hexadecimal (base 16), and shows all four at once. Prefixes such as 0x, 0b and 0o and a minus sign are accepted. Very large integers are handled exactly, without rounding.",
     "es": "Convierte números enteros entre binario (base 2), octal (base 8), decimal (base 10) y hexadecimal (base 16), y muestra los cuatro a la vez. Se aceptan prefijos como 0x, 0b y 0o y el signo menos. Los enteros muy grandes se tratan con exactitud, sin redondeo.",
     "pt": "Converte números inteiros entre binário (base 2), octal (base 8), decimal (base 10) e hexadecimal (base 16), e mostra os quatro ao mesmo tempo. Prefixos como 0x, 0b e 0o e o sinal de menos são aceitos. Inteiros muito grandes são tratados com exatidão, sem arredondamento.",
     "id": "Mengonversi bilangan bulat antara biner (basis 2), oktal (basis 8), desimal (basis 10), dan heksadesimal (basis 16), serta menampilkan keempatnya sekaligus. Awalan seperti 0x, 0b, dan 0o serta tanda minus diterima. Bilangan bulat yang sangat besar ditangani secara tepat tanpa pembulatan.",
     "hi": "पूर्ण संख्याओं को बाइनरी (आधार 2), ऑक्टल (आधार 8), दशमलव (आधार 10) और हेक्साडेसिमल (आधार 16) के बीच बदलता है और चारों एक साथ दिखाता है। 0x, 0b और 0o जैसे उपसर्ग तथा ऋण चिह्न स्वीकार किए जाते हैं। बहुत बड़ी पूर्ण संख्याएँ बिना पूर्णांकन के सटीक रूप से संभाली जाती हैं।",
     "ar": "يحوّل الأعداد الصحيحة بين الثنائي (الأساس 2) والثماني (الأساس 8) والعشري (الأساس 10) والسداسي عشري (الأساس 16) ويعرض الأنظمة الأربعة معًا. تُقبل البادئات مثل 0x و0b و0o وإشارة الناقص. تُعالَج الأعداد الصحيحة الكبيرة جدًا بدقة ودون تقريب."
    }
   },
   {
    "id": "roman-numeral-converter",
    "n": {
     "en": "Roman Numeral Converter",
     "es": "Conversor de números romanos",
     "pt": "Conversor de números romanos",
     "id": "Konverter Angka Romawi",
     "hi": "रोमन अंक कन्वर्टर",
     "ar": "محوّل الأرقام الرومانية"
    },
    "a": {
     "en": "Converts numbers from 1 to 3,999 to Roman numerals and back. Type digits to get a Roman numeral, or type a Roman numeral such as MCMXCIV to get the number. Only standard subtractive notation is accepted, so IIII is not valid but IV is.",
     "es": "Convierte números del 1 al 3999 a números romanos y viceversa. Escribe cifras para obtener un número romano, o escribe un número romano como MCMXCIV para obtener el número. Solo se acepta la notación sustractiva estándar, así que IIII no es válido pero IV sí.",
     "pt": "Converte números de 1 a 3999 em números romanos e vice-versa. Digite algarismos para obter um número romano, ou digite um número romano como MCMXCIV para obter o número. Só a notação subtrativa padrão é aceita, então IIII não é válido, mas IV é.",
     "id": "Mengonversi angka 1 sampai 3.999 menjadi angka Romawi dan sebaliknya. Ketik angka untuk mendapatkan angka Romawi, atau ketik angka Romawi seperti MCMXCIV untuk mendapatkan angkanya. Hanya notasi pengurangan standar yang diterima, jadi IIII tidak valid tetapi IV valid.",
     "hi": "1 से 3,999 तक की संख्याओं को रोमन अंकों में और रोमन अंकों को वापस संख्या में बदलता है। रोमन अंक पाने के लिए अंक लिखें, या संख्या पाने के लिए MCMXCIV जैसा रोमन अंक लिखें। केवल मानक व्यवकलनात्मक संकेतन स्वीकार है, इसलिए IIII अमान्य है पर IV मान्य है।",
     "ar": "يحوّل الأعداد من 1 إلى 3999 إلى أرقام رومانية والعكس. اكتب أرقامًا لتحصل على رقم روماني، أو اكتب رقمًا رومانيًا مثل MCMXCIV لتحصل على العدد. يُقبل التدوين الطرحي القياسي فقط، لذا IIII غير صالح بينما IV صالح."
    }
   },
   {
    "id": "colour-converter",
    "n": {
     "en": "Colour Converter (HEX, RGB, HSL)",
     "es": "Conversor de color (HEX, RGB, HSL)",
     "pt": "Conversor de cores (HEX, RGB, HSL)",
     "id": "Konverter Warna (HEX, RGB, HSL)",
     "hi": "रंग कन्वर्टर (HEX, RGB, HSL)",
     "ar": "محوّل الألوان (HEX وRGB وHSL)"
    },
    "a": {
     "en": "Converts a colour between HEX, RGB and HSL notation and shows a preview. Enter a value such as #3b3bdb, rgb(59, 59, 219) or hsl(240, 69%, 55%). Short HEX codes like #fff are accepted. Converted values are rounded to whole numbers, so converting back may differ by one step.",
     "es": "Convierte un color entre las notaciones HEX, RGB y HSL y muestra una vista previa. Introduce un valor como #3b3bdb, rgb(59, 59, 219) o hsl(240, 69%, 55%). Se aceptan códigos HEX cortos como #fff. Los valores convertidos se redondean a números enteros, por lo que al convertir de vuelta puede haber una diferencia de un paso.",
     "pt": "Converte uma cor entre as notações HEX, RGB e HSL e mostra uma prévia. Digite um valor como #3b3bdb, rgb(59, 59, 219) ou hsl(240, 69%, 55%). Códigos HEX curtos como #fff são aceitos. Os valores convertidos são arredondados para números inteiros, então ao converter de volta pode haver diferença de um passo.",
     "id": "Mengonversi warna antara notasi HEX, RGB, dan HSL serta menampilkan pratinjau. Masukkan nilai seperti #3b3bdb, rgb(59, 59, 219), atau hsl(240, 69%, 55%). Kode HEX singkat seperti #fff diterima. Nilai hasil konversi dibulatkan ke bilangan bulat, sehingga saat dikonversi balik bisa berbeda satu langkah.",
     "hi": "किसी रंग को HEX, RGB और HSL संकेतन के बीच बदलता है और पूर्वावलोकन दिखाता है। #3b3bdb, rgb(59, 59, 219) या hsl(240, 69%, 55%) जैसा मान दर्ज करें। #fff जैसे छोटे HEX कोड स्वीकार हैं। बदले हुए मान पूर्ण संख्याओं में पूर्णांकित होते हैं, इसलिए वापस बदलने पर एक क़दम का अंतर आ सकता है।",
     "ar": "يحوّل اللون بين صيغ HEX وRGB وHSL ويعرض معاينة له. أدخل قيمة مثل #3b3bdb أو rgb(59, 59, 219) أو hsl(240, 69%, 55%). تُقبل رموز HEX المختصرة مثل #fff. تُقرَّب القيم المحوّلة إلى أعداد صحيحة، لذا قد يظهر فرق بمقدار خطوة واحدة عند التحويل العكسي."
    }
   },
   {
    "id": "timestamp-converter",
    "n": {
     "en": "Unix Timestamp Converter",
     "es": "Conversor de marca de tiempo Unix",
     "pt": "Conversor de timestamp Unix",
     "id": "Konverter Timestamp Unix",
     "hi": "यूनिक्स टाइमस्टैम्प कन्वर्टर",
     "ar": "محوّل الطابع الزمني Unix"
    },
    "a": {
     "en": "Converts a Unix timestamp to a readable date and a date back to a timestamp. A Unix timestamp counts the seconds since 1 January 1970 UTC. Numbers with 12 or more digits are read as milliseconds. A date such as 2026-11-15 10:30:00 without a time zone is read in your device's local time; add Z or an offset such as +07:00 to be explicit.",
     "es": "Convierte una marca de tiempo Unix en una fecha legible y una fecha en una marca de tiempo. Una marca de tiempo Unix cuenta los segundos desde el 1 de enero de 1970 UTC. Los números de 12 o más dígitos se leen como milisegundos. Una fecha como 2026-11-15 10:30:00 sin zona horaria se interpreta en la hora local de tu dispositivo; añade Z o un desfase como +07:00 para indicarlo explícitamente.",
     "pt": "Converte um timestamp Unix em uma data legível e uma data em um timestamp. Um timestamp Unix conta os segundos desde 1.º de janeiro de 1970 UTC. Números com 12 ou mais dígitos são lidos como milissegundos. Uma data como 2026-11-15 10:30:00 sem fuso horário é interpretada no horário local do seu dispositivo; acrescente Z ou um deslocamento como +07:00 para ser explícito.",
     "id": "Mengonversi timestamp Unix menjadi tanggal yang terbaca dan tanggal menjadi timestamp. Timestamp Unix menghitung detik sejak 1 Januari 1970 UTC. Angka dengan 12 digit atau lebih dibaca sebagai milidetik. Tanggal seperti 2026-11-15 10:30:00 tanpa zona waktu dibaca menurut waktu lokal perangkat Anda; tambahkan Z atau selisih seperti +07:00 agar eksplisit.",
     "hi": "यूनिक्स टाइमस्टैम्प को पढ़ने योग्य तारीख़ में और तारीख़ को टाइमस्टैम्प में बदलता है। यूनिक्स टाइमस्टैम्प 1 जनवरी 1970 UTC से बीते सेकंड गिनता है। 12 या अधिक अंकों वाली संख्याएँ मिलीसेकंड मानी जाती हैं। 2026-11-15 10:30:00 जैसी बिना टाइम ज़ोन वाली तारीख़ आपके डिवाइस के स्थानीय समय में पढ़ी जाती है; स्पष्टता के लिए Z या +07:00 जैसा ऑफ़सेट जोड़ें।",
     "ar": "يحوّل الطابع الزمني Unix إلى تاريخ مقروء والتاريخ إلى طابع زمني. يحسب الطابع الزمني Unix الثواني منذ 1 يناير 1970 بالتوقيت العالمي UTC. تُقرأ الأعداد المكوّنة من 12 رقمًا أو أكثر على أنها ميلي ثانية. التاريخ مثل 2026-11-15 10:30:00 بلا منطقة زمنية يُقرأ بالتوقيت المحلي لجهازك؛ أضف Z أو فرقًا مثل +07:00 للتحديد الصريح."
    }
   }
  ]
 },
 {
  "slug": "calculators",
  "k": "calc",
  "tools": [
   {
    "id": "percentage-calculator",
    "n": {
     "en": "Percentage Calculator",
     "es": "Calculadora de porcentaje",
     "pt": "Calculadora de porcentagem",
     "id": "Kalkulator Persentase",
     "hi": "प्रतिशत कैलकुलेटर",
     "ar": "حاسبة النسبة المئوية"
    },
    "a": {
     "en": "Enter a percentage and a value to get the percentage of that value, plus the value increased and decreased by that percentage.",
     "es": "Introduce un porcentaje y un valor para obtener el porcentaje de ese valor, además del valor aumentado y disminuido en ese porcentaje.",
     "pt": "Informe uma porcentagem e um valor para obter a porcentagem desse valor, além do valor aumentado e diminuído por essa porcentagem.",
     "id": "Masukkan persentase dan nilai untuk mendapatkan persentase dari nilai tersebut, serta nilai setelah ditambah dan dikurangi persentase itu.",
     "hi": "प्रतिशत और एक मान दर्ज करें ताकि उस मान का प्रतिशत मिले, साथ ही उस प्रतिशत से बढ़ा और घटा हुआ मान भी।",
     "ar": "أدخل نسبة مئوية وقيمة لتحصل على النسبة من تلك القيمة، إضافةً إلى القيمة بعد زيادتها وإنقاصها بتلك النسبة."
    }
   },
   {
    "id": "bmi-calculator",
    "n": {
     "en": "BMI Calculator",
     "es": "Calculadora de IMC",
     "pt": "Calculadora de IMC",
     "id": "Kalkulator BMI",
     "hi": "BMI कैलकुलेटर",
     "ar": "حاسبة مؤشر كتلة الجسم"
    },
    "a": {
     "en": "Body mass index is weight in kilograms divided by height in metres squared. Categories follow the WHO adult ranges. BMI is a screening figure only; it does not measure body fat and is not a diagnosis.",
     "es": "El índice de masa corporal es el peso en kilogramos dividido por la estatura en metros al cuadrado. Las categorías siguen los rangos de adultos de la OMS. El IMC es solo una cifra de cribado; no mide la grasa corporal y no es un diagnóstico.",
     "pt": "O índice de massa corporal é o peso em quilogramas dividido pela altura em metros ao quadrado. As categorias seguem as faixas de adultos da OMS. O IMC é apenas um número de triagem; não mede a gordura corporal e não é um diagnóstico.",
     "id": "Indeks massa tubuh adalah berat dalam kilogram dibagi tinggi dalam meter kuadrat. Kategori mengikuti rentang dewasa WHO. BMI hanya angka penapisan; tidak mengukur lemak tubuh dan bukan diagnosis.",
     "hi": "बॉडी मास इंडेक्स किलोग्राम में वज़न को मीटर में कद के वर्ग से भाग देने पर मिलता है। श्रेणियाँ WHO की वयस्क सीमाओं के अनुसार हैं। BMI केवल जाँच का एक आँकड़ा है; यह शरीर की चर्बी नहीं मापता और निदान नहीं है।",
     "ar": "مؤشر كتلة الجسم هو الوزن بالكيلوغرام مقسومًا على مربع الطول بالمتر. تتبع الفئات نطاقات البالغين لدى منظمة الصحة العالمية. المؤشر رقم للفحص الأولي فقط؛ فهو لا يقيس دهون الجسم وليس تشخيصًا."
    }
   },
   {
    "id": "loan-calculator",
    "n": {
     "en": "Loan Calculator",
     "es": "Calculadora de préstamos",
     "pt": "Calculadora de empréstimos",
     "id": "Kalkulator Cicilan Pinjaman",
     "hi": "लोन कैलकुलेटर",
     "ar": "حاسبة القروض"
    },
    "a": {
     "en": "Estimates the monthly payment of a fixed-rate loan with equal monthly instalments. Fees, taxes and rate changes are not included, so your lender's figures may differ.",
     "es": "Estima la cuota mensual de un préstamo de tasa fija con cuotas mensuales iguales. No incluye comisiones, impuestos ni cambios de tasa, por lo que las cifras de tu prestamista pueden diferir.",
     "pt": "Estima a parcela mensal de um empréstimo de taxa fixa com parcelas mensais iguais. Tarifas, impostos e mudanças de taxa não estão incluídos, então os valores do seu credor podem diferir.",
     "id": "Memperkirakan cicilan bulanan pinjaman bunga tetap dengan angsuran bulanan sama besar. Biaya, pajak, dan perubahan suku bunga tidak termasuk, sehingga angka dari pemberi pinjaman bisa berbeda.",
     "hi": "समान मासिक किस्तों वाले निश्चित दर के ऋण की मासिक किस्त का अनुमान लगाता है। शुल्क, कर और दरों में बदलाव शामिल नहीं हैं, इसलिए आपके ऋणदाता के आँकड़े अलग हो सकते हैं।",
     "ar": "يقدّر القسط الشهري لقرض بسعر فائدة ثابت وأقساط شهرية متساوية. لا تشمل الحسابات الرسوم والضرائب وتغيّر أسعار الفائدة، لذا قد تختلف أرقام جهة الإقراض."
    }
   },
   {
    "id": "age-calculator",
    "n": {
     "en": "Age Calculator",
     "es": "Calculadora de edad",
     "pt": "Calculadora de idade",
     "id": "Kalkulator Usia",
     "hi": "आयु कैलकुलेटर",
     "ar": "حاسبة العمر"
    },
    "a": {
     "en": "Shows your age in years, months and days, and the total days lived, counted up to today's date on your device.",
     "es": "Muestra tu edad en años, meses y días, y el total de días vividos, contados hasta la fecha de hoy en tu dispositivo.",
     "pt": "Mostra sua idade em anos, meses e dias, e o total de dias vividos, contados até a data de hoje no seu dispositivo.",
     "id": "Menampilkan usia dalam tahun, bulan, dan hari, serta total hari yang telah dijalani, dihitung sampai tanggal hari ini di perangkat Anda.",
     "hi": "आपकी आयु वर्षों, महीनों और दिनों में तथा जी गए कुल दिन दिखाता है, जिनकी गणना आपके डिवाइस की आज की तारीख़ तक होती है।",
     "ar": "يعرض عمرك بالسنوات والأشهر والأيام وإجمالي الأيام التي عشتها، محسوبةً حتى تاريخ اليوم على جهازك."
    }
   },
   {
    "id": "discount-calculator",
    "n": {
     "en": "Discount Calculator",
     "es": "Calculadora de descuentos",
     "pt": "Calculadora de descontos",
     "id": "Kalkulator Diskon",
     "hi": "छूट कैलकुलेटर",
     "ar": "حاسبة الخصم"
    },
    "a": {
     "en": "Enter the original price and the discount percentage to see the final price and the amount saved.",
     "es": "Introduce el precio original y el porcentaje de descuento para ver el precio final y el importe ahorrado.",
     "pt": "Informe o preço original e a porcentagem de desconto para ver o preço final e o valor economizado.",
     "id": "Masukkan harga asli dan persentase diskon untuk melihat harga akhir dan jumlah yang dihemat.",
     "hi": "मूल कीमत और छूट का प्रतिशत दर्ज करें और अंतिम कीमत तथा बचत की राशि देखें।",
     "ar": "أدخل السعر الأصلي ونسبة الخصم لترى السعر النهائي والمبلغ الموفَّر."
    }
   }
  ]
 },
 {
  "slug": "file-converters",
  "k": "files",
  "tools": [
   {
    "id": "image-converter",
    "n": {
     "en": "Image Converter (PNG, JPG, WebP)",
     "es": "Convertidor de imágenes (PNG, JPG, WebP)",
     "pt": "Conversor de imagens (PNG, JPG, WebP)",
     "id": "Konverter Gambar (PNG, JPG, WebP)",
     "hi": "इमेज कन्वर्टर (PNG, JPG, WebP)",
     "ar": "محوّل الصور (PNG وJPG وWebP)"
    },
    "a": {
     "en": "Convert an image between PNG, JPG and WebP using your browser's built-in image engine. The file never leaves your device. Transparent areas become white when saving as JPG, and quality only affects JPG and WebP.",
     "es": "Convierte una imagen entre PNG, JPG y WebP con el motor de imágenes integrado de tu navegador. El archivo nunca sale de tu dispositivo. Las zonas transparentes se vuelven blancas al guardar como JPG, y la calidad solo afecta a JPG y WebP.",
     "pt": "Converte uma imagem entre PNG, JPG e WebP usando o mecanismo de imagens integrado do navegador. O arquivo nunca sai do seu dispositivo. Áreas transparentes ficam brancas ao salvar como JPG, e a qualidade afeta apenas JPG e WebP.",
     "id": "Ubah gambar antara PNG, JPG, dan WebP memakai mesin gambar bawaan browser. Berkas tidak pernah meninggalkan perangkat Anda. Area transparan menjadi putih saat disimpan sebagai JPG, dan kualitas hanya memengaruhi JPG dan WebP.",
     "hi": "ब्राउज़र के अंतर्निहित इमेज इंजन से किसी इमेज को PNG, JPG और WebP के बीच बदलता है। फ़ाइल कभी आपके डिवाइस से बाहर नहीं जाती। JPG में सहेजते समय पारदर्शी हिस्से सफ़ेद हो जाते हैं, और गुणवत्ता केवल JPG और WebP को प्रभावित करती है।",
     "ar": "يحوّل صورة بين PNG وJPG وWebP باستخدام محرك الصور المدمج في متصفحك. لا يغادر الملف جهازك أبدًا. تصبح المناطق الشفافة بيضاء عند الحفظ بصيغة JPG، ولا تؤثر الجودة إلا في JPG وWebP."
    }
   },
   {
    "id": "image-resizer",
    "n": {
     "en": "Image Resizer",
     "es": "Cambiar tamaño de imagen",
     "pt": "Redimensionar imagem",
     "id": "Ubah Ukuran Gambar",
     "hi": "इमेज का आकार बदलें",
     "ar": "تغيير حجم الصورة"
    },
    "a": {
     "en": "Resize an image to a new width and height in pixels. Leave the height empty to keep the original proportions. Enlarging an image does not add detail.",
     "es": "Cambia el tamaño de una imagen a un nuevo ancho y alto en píxeles. Deja el alto vacío para mantener las proporciones originales. Agrandar una imagen no añade detalle.",
     "pt": "Altera o tamanho de uma imagem para uma nova largura e altura em pixels. Deixe a altura vazia para manter as proporções originais. Ampliar uma imagem não acrescenta detalhes.",
     "id": "Ubah ukuran gambar ke lebar dan tinggi baru dalam piksel. Kosongkan tinggi untuk mempertahankan proporsi asli. Memperbesar gambar tidak menambah detail.",
     "hi": "किसी इमेज को पिक्सल में नई चौड़ाई और ऊँचाई पर बदलता है। मूल अनुपात बनाए रखने के लिए ऊँचाई खाली छोड़ें। इमेज को बड़ा करने से उसमें ब्योरा नहीं बढ़ता।",
     "ar": "يغيّر حجم الصورة إلى عرض وارتفاع جديدين بالبكسل. اترك الارتفاع فارغًا للحفاظ على النسب الأصلية. تكبير الصورة لا يضيف إليها تفاصيل."
    }
   },
   {
    "id": "file-to-base64",
    "n": {
     "en": "File to Base64",
     "es": "Archivo a Base64",
     "pt": "Arquivo para Base64",
     "id": "Berkas ke Base64",
     "hi": "फ़ाइल से Base64",
     "ar": "ملف إلى Base64"
    },
    "a": {
     "en": "Turns a file into a Base64 data URL you can paste into code. Base64 makes data about one third larger and is an encoding, not encryption. Files up to 10 MB are supported.",
     "es": "Convierte un archivo en una URL de datos Base64 que puedes pegar en código. Base64 aumenta los datos en un tercio aproximadamente y es una codificación, no un cifrado. Se admiten archivos de hasta 10 MB.",
     "pt": "Transforma um arquivo em uma URL de dados Base64 que você pode colar no código. O Base64 aumenta os dados em cerca de um terço e é uma codificação, não uma criptografia. Arquivos de até 10 MB são suportados.",
     "id": "Mengubah berkas menjadi data URL Base64 yang dapat ditempel ke kode. Base64 membuat data sekitar sepertiga lebih besar dan merupakan pengodean, bukan enkripsi. Berkas hingga 10 MB didukung.",
     "hi": "किसी फ़ाइल को Base64 डेटा URL में बदलता है जिसे आप कोड में पेस्ट कर सकते हैं। Base64 डेटा को लगभग एक तिहाई बड़ा कर देता है और यह एन्कोडिंग है, एन्क्रिप्शन नहीं। 10 MB तक की फ़ाइलें समर्थित हैं।",
     "ar": "يحوّل ملفًا إلى رابط بيانات Base64 يمكنك لصقه في الشيفرة. يزيد Base64 حجم البيانات بنحو الثلث وهو ترميز وليس تشفيرًا. تُدعم الملفات حتى 10 ميغابايت."
    }
   },
   {
    "id": "json-to-csv",
    "n": {
     "en": "JSON to CSV",
     "es": "JSON a CSV",
     "pt": "JSON para CSV",
     "id": "JSON ke CSV",
     "hi": "JSON से CSV",
     "ar": "JSON إلى CSV"
    },
    "a": {
     "en": "Converts a JSON array of objects into CSV with a header row. Nested values are written as JSON text. Open the result in any spreadsheet app.",
     "es": "Convierte un arreglo JSON de objetos en CSV con una fila de encabezado. Los valores anidados se escriben como texto JSON. Abre el resultado en cualquier aplicación de hojas de cálculo.",
     "pt": "Converte um array JSON de objetos em CSV com uma linha de cabeçalho. Valores aninhados são escritos como texto JSON. Abra o resultado em qualquer aplicativo de planilhas.",
     "id": "Mengubah array objek JSON menjadi CSV dengan baris judul. Nilai bersarang ditulis sebagai teks JSON. Buka hasilnya di aplikasi spreadsheet apa pun.",
     "hi": "ऑब्जेक्ट्स के JSON ऐरे को शीर्षक पंक्ति वाले CSV में बदलता है। नेस्टेड मान JSON टेक्स्ट के रूप में लिखे जाते हैं। नतीजे को किसी भी स्प्रेडशीट ऐप में खोलें।",
     "ar": "يحوّل مصفوفة JSON من الكائنات إلى CSV مع صف عناوين. تُكتب القيم المتداخلة كنص JSON. افتح النتيجة في أي تطبيق جداول بيانات."
    }
   },
   {
    "id": "csv-to-json",
    "n": {
     "en": "CSV to JSON",
     "es": "CSV a JSON",
     "pt": "CSV para JSON",
     "id": "CSV ke JSON",
     "hi": "CSV से JSON",
     "ar": "CSV إلى JSON"
    },
    "a": {
     "en": "Converts CSV text with a header row into a JSON array of objects. Quoted fields and commas inside quotes are supported. All values are kept as text. The separator (comma, semicolon or tab) is detected automatically.",
     "es": "Convierte texto CSV con una fila de encabezado en un arreglo JSON de objetos. Se admiten campos entre comillas y comas dentro de las comillas. Todos los valores se conservan como texto. El separador (coma, punto y coma o tabulación) se detecta automáticamente.",
     "pt": "Converte texto CSV com uma linha de cabeçalho em um array JSON de objetos. Campos entre aspas e vírgulas dentro das aspas são suportados. Todos os valores são mantidos como texto. O separador (vírgula, ponto e vírgula ou tabulação) é detectado automaticamente.",
     "id": "Mengubah teks CSV dengan baris judul menjadi array objek JSON. Kolom dalam tanda kutip dan koma di dalamnya didukung. Semua nilai disimpan sebagai teks. Pemisah (koma, titik koma, atau tab) terdeteksi otomatis.",
     "hi": "शीर्षक पंक्ति वाले CSV टेक्स्ट को ऑब्जेक्ट्स के JSON ऐरे में बदलता है। उद्धरण चिह्नों वाले फ़ील्ड और उनके भीतर के अल्पविराम समर्थित हैं। सभी मान टेक्स्ट के रूप में रखे जाते हैं। विभाजक (अल्पविराम, अर्धविराम या टैब) अपने आप पहचाना जाता है।",
     "ar": "يحوّل نص CSV ذا صف عناوين إلى مصفوفة JSON من الكائنات. تُدعم الحقول المحاطة بعلامات اقتباس والفواصل داخلها. تُحفظ جميع القيم كنص. يُكتشف الفاصل (فاصلة أو فاصلة منقوطة أو tab) تلقائيًا."
    }
   }
  ]
 }
];
