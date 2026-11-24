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
   },
   {
    "id": "apa-reference-generator",
    "n": {
     "en": "APA 7 Reference List Generator",
     "es": "Generador de lista de referencias APA 7",
     "pt": "Gerador de lista de referências APA 7",
     "id": "Pembuat Daftar Pustaka APA 7",
     "hi": "APA 7 संदर्भ सूची जनरेटर",
     "ar": "منشئ قائمة المراجع بنمط APA 7"
    },
    "a": {
     "en": "Create APA 7th edition references and a sorted reference list for journal articles, books, web pages and more. Choose the source type, fill in the details and add each reference to the list. The tool formats author names, dates, italics, edition, pages and DOIs, and also shows the in-text citation. It does not look up sources online, so check titles, proper nouns and capitalisation against your source.",
     "es": "Crea referencias en formato APA 7.ª edición y una lista de referencias ordenada para artículos, libros, páginas web y más. Elige el tipo de fuente, completa los datos y añade cada referencia a la lista. La herramienta da formato a nombres de autores, fechas, cursivas, edición, páginas y DOI, y muestra también la cita en el texto. No busca fuentes en internet, así que revisa títulos, nombres propios y mayúsculas con tu fuente.",
     "pt": "Crie referências no formato APA 7.ª edição e uma lista de referências em ordem alfabética para artigos, livros, páginas da web e mais. Escolha o tipo de fonte, preencha os dados e adicione cada referência à lista. A ferramenta formata nomes de autores, datas, itálico, edição, páginas e DOI, e também mostra a citação no texto. Ela não busca fontes na internet, então confira títulos, nomes próprios e maiúsculas com a sua fonte.",
     "id": "Buat referensi format APA edisi ke-7 dan daftar pustaka yang terurut abjad untuk artikel jurnal, buku, halaman web, dan lainnya. Pilih jenis sumber, isi datanya, lalu tambahkan setiap referensi ke daftar. Alat ini memformat nama penulis, tanggal, huruf miring, edisi, halaman, dan DOI, serta menampilkan sitasi dalam teks. Alat ini tidak mencari sumber di internet, jadi periksa judul, nama diri, dan kapitalisasi dengan sumber Anda.",
     "hi": "जर्नल लेख, पुस्तकों, वेब पेज और अन्य स्रोतों के लिए APA 7वें संस्करण के संदर्भ और वर्णानुक्रम में संदर्भ सूची बनाएँ। स्रोत का प्रकार चुनें, विवरण भरें और हर संदर्भ को सूची में जोड़ें। टूल लेखकों के नाम, तारीख़, इटैलिक, संस्करण, पृष्ठ और DOI को फ़ॉर्मेट करता है और पाठ में उद्धरण भी दिखाता है। यह इंटरनेट पर स्रोत नहीं खोजता, इसलिए शीर्षक, विशेष नाम और बड़े-छोटे अक्षर अपने स्रोत से मिलाकर जाँचें।",
     "ar": "أنشئ مراجع بنمط APA الإصدار السابع وقائمة مراجع مرتّبة أبجديًا للمقالات العلمية والكتب وصفحات الويب وغيرها. اختر نوع المصدر وأدخل البيانات ثم أضف كل مرجع إلى القائمة. تنسّق الأداة أسماء المؤلفين والتواريخ والخط المائل والطبعة والصفحات وDOI، وتعرض أيضًا الاستشهاد داخل النص. لا تبحث الأداة عن المصادر على الإنترنت، لذا راجع العناوين والأسماء العلم وحالة الأحرف مقابل مصدرك."
    },
    "ui": {
     "a_type": "Source type|Tipo de fuente|Tipo de fonte|Jenis sumber|स्रोत का प्रकार|نوع المصدر",
     "a_rl": "Language of the reference|Idioma de la referencia|Idioma da referência|Bahasa referensi|संदर्भ की भाषा|لغة المرجع",
     "a_au": "Authors (one per line: Family, Given)|Autores (uno por línea: Apellido, Nombre)|Autores (um por linha: Sobrenome, Nome)|Penulis (satu per baris: Nama keluarga, Nama depan)|लेखक (प्रति पंक्ति एक: उपनाम, नाम)|المؤلفون (واحد في كل سطر: اللقب، الاسم)",
     "a_ed": "Editors (one per line: Family, Given)|Editores (uno por línea: Apellido, Nombre)|Organizadores (um por linha: Sobrenome, Nome)|Editor (satu per baris: Nama keluarga, Nama depan)|संपादक (प्रति पंक्ति एक: उपनाम, नाम)|المحررون (واحد في كل سطر: اللقب، الاسم)",
     "a_yr": "Year (blank = n.d.)|Año (vacío = s. f.)|Ano (vazio = s.d.)|Tahun (kosong = t.t.)|वर्ष (खाली = n.d.)|السنة (فارغ = د.ت.)",
     "a_mo": "Month (optional)|Mes (opcional)|Mês (opcional)|Bulan (opsional)|महीना (वैकल्पिक)|الشهر (اختياري)",
     "a_dy": "Day (e.g. 5 or 12–14)|Día (p. ej. 5 o 12–14)|Dia (ex.: 5 ou 12–14)|Tanggal (mis. 5 atau 12–14)|दिन (जैसे 5 या 12–14)|اليوم (مثل 5 أو 12–14)",
     "a_ti": "Title|Título|Título|Judul|शीर्षक|العنوان",
     "a_cj": "Journal title|Título de la revista|Título do periódico|Judul jurnal|जर्नल का नाम|عنوان المجلة العلمية",
     "a_cm": "Magazine or newspaper title|Título de la revista o periódico|Título da revista ou jornal|Judul majalah atau surat kabar|पत्रिका या अख़बार का नाम|اسم المجلة أو الصحيفة",
     "a_cb": "Book or proceedings title|Título del libro o de las actas|Título do livro ou dos anais|Judul buku atau prosiding|पुस्तक या प्रोसीडिंग्स का शीर्षक|عنوان الكتاب أو وقائع المؤتمر",
     "a_cc": "Conference name|Nombre del congreso|Nome do evento|Nama konferensi|सम्मेलन का नाम|اسم المؤتمر",
     "a_vo": "Volume|Volumen|Volume|Volume|खंड|المجلد",
     "a_is": "Issue|Número|Número|Nomor terbitan|अंक|العدد",
     "a_pg": "Pages or article number|Páginas o número de artículo|Páginas ou número do artigo|Halaman atau nomor artikel|पृष्ठ या लेख संख्या|الصفحات أو رقم المقالة",
     "a_edn": "Edition (e.g. 2)|Edición (p. ej. 2)|Edição (ex.: 2)|Edisi (mis. 2)|संस्करण (जैसे 2)|الطبعة (مثل 2)",
     "a_pub": "Publisher|Editorial|Editora|Penerbit|प्रकाशक|الناشر",
     "a_sw": "Website name|Nombre del sitio web|Nome do site|Nama situs web|वेबसाइट का नाम|اسم الموقع",
     "a_sv": "Platform (e.g. YouTube)|Plataforma (p. ej. YouTube)|Plataforma (ex.: YouTube)|Platform (mis. YouTube)|प्लेटफ़ॉर्म (जैसे YouTube)|المنصة (مثل YouTube)",
     "a_st": "Database or repository (optional)|Base de datos o repositorio (opcional)|Base de dados ou repositório (opcional)|Basis data atau repositori (opsional)|डेटाबेस या रिपॉज़िटरी (वैकल्पिक)|قاعدة البيانات أو المستودع (اختياري)",
     "a_in": "University or institution|Universidad o institución|Universidade ou instituição|Universitas atau institusi|विश्वविद्यालय या संस्था|الجامعة أو المؤسسة",
     "a_lv": "Degree level|Nivel académico|Nível acadêmico|Jenjang|उपाधि स्तर|المستوى الأكاديمي",
     "a_rn": "Report number (optional)|Número de informe (opcional)|Número do relatório (opcional)|Nomor laporan (opsional)|रिपोर्ट संख्या (वैकल्पिक)|رقم التقرير (اختياري)",
     "a_ct": "Presentation type|Tipo de presentación|Tipo de apresentação|Jenis presentasi|प्रस्तुति का प्रकार|نوع العرض",
     "a_pl": "City, country|Ciudad, país|Cidade, país|Kota, negara|शहर, देश|المدينة، الدولة",
     "a_lk": "DOI or URL|DOI o URL|DOI ou URL|DOI atau URL|DOI या URL|DOI أو الرابط",
     "a_ac": "Date accessed (optional)|Fecha de consulta (opcional)|Data de acesso (opcional)|Tanggal akses (opsional)|एक्सेस की तारीख़ (वैकल्पिक)|تاريخ الاطلاع (اختياري)",
     "a_org": "Author is an organization (use name as typed)|El autor es una organización (usar el nombre tal cual)|O autor é uma organização (usar o nome como digitado)|Penulis adalah organisasi (pakai nama apa adanya)|लेखक एक संगठन है (नाम जैसा लिखा है वैसा रखें)|المؤلف جهة أو منظمة (استخدم الاسم كما كُتب)",
     "a_aed": "The authors are editors of the book|Los autores son editores del libro|Os autores são organizadores do livro|Penulis adalah editor buku|लेखक पुस्तक के संपादक हैं|المؤلفون هم محررو الكتاب",
     "a_unp": "Unpublished|Inédita|Não publicada|Tidak dipublikasikan|अप्रकाशित|غير منشورة",
     "a_sc": "Convert title to sentence case (check proper nouns)|Pasar el título a mayúscula de oración (revisa nombres propios)|Converter o título para maiúscula de frase (confira nomes próprios)|Ubah judul ke huruf kapital kalimat (periksa nama diri)|शीर्षक को वाक्य केस में बदलें (विशेष नाम जाँचें)|تحويل العنوان إلى حالة الجملة (راجع الأسماء العلم)",
     "a_t_journal": "Journal article|Artículo de revista científica|Artigo de periódico científico|Artikel jurnal|जर्नल लेख|مقالة في مجلة علمية",
     "a_t_magazine": "Magazine article|Artículo de revista|Artigo de revista|Artikel majalah|पत्रिका लेख|مقالة في مجلة",
     "a_t_newspaper": "Newspaper article|Artículo de periódico|Artigo de jornal|Artikel surat kabar|अख़बार लेख|مقالة في صحيفة",
     "a_t_book": "Book|Libro|Livro|Buku|पुस्तक|كتاب",
     "a_t_chapter": "Book chapter or proceedings paper|Capítulo de libro o ponencia publicada|Capítulo de livro ou trabalho em anais|Bab buku atau makalah prosiding|पुस्तक का अध्याय या प्रोसीडिंग्स पेपर|فصل في كتاب أو ورقة في وقائع مؤتمر",
     "a_t_webpage": "Web page|Página web|Página da web|Halaman web|वेब पेज|صفحة ويب",
     "a_t_report": "Report|Informe|Relatório|Laporan|रिपोर्ट|تقرير",
     "a_t_thesis": "Thesis or dissertation|Tesis|Tese ou dissertação|Skripsi, tesis, atau disertasi|शोध-प्रबंध|رسالة جامعية أو أطروحة",
     "a_t_conference": "Conference presentation|Presentación en congreso|Apresentação em evento|Presentasi konferensi|सम्मेलन प्रस्तुति|عرض في مؤتمر",
     "a_t_video": "Online video|Video en línea|Vídeo online|Video daring|ऑनलाइन वीडियो|فيديو عبر الإنترنت",
     "a_prev": "Preview|Vista previa|Pré-visualização|Pratinjau|पूर्वावलोकन|معاينة",
     "a_cite": "In-text citation|Cita en el texto|Citação no texto|Sitasi dalam teks|पाठ में उद्धरण|الاستشهاد داخل النص",
     "a_add": "Add to list|Añadir a la lista|Adicionar à lista|Tambah ke daftar|सूची में जोड़ें|إضافة إلى القائمة",
     "a_list": "Reference list|Lista de referencias|Lista de referências|Daftar pustaka|संदर्भ सूची|قائمة المراجع",
     "a_empty": "No references yet. Fill in the form and press “Add to list”.|Aún no hay referencias. Completa el formulario y pulsa «Añadir a la lista».|Ainda não há referências. Preencha o formulário e toque em «Adicionar à lista».|Belum ada referensi. Isi formulir lalu tekan «Tambah ke daftar».|अभी कोई संदर्भ नहीं है। फ़ॉर्म भरें और «सूची में जोड़ें» दबाएँ।|لا توجد مراجع بعد. املأ النموذج واضغط «إضافة إلى القائمة».",
     "a_rm": "Remove|Quitar|Remover|Hapus|हटाएँ|إزالة",
     "a_edit": "Edit|Editar|Editar|Ubah|संपादित करें|تعديل",
     "a_cpl": "Copy list|Copiar lista|Copiar lista|Salin daftar|सूची कॉपी करें|نسخ القائمة",
     "a_cll": "Clear list|Vaciar lista|Limpar lista|Kosongkan daftar|सूची साफ़ करें|مسح القائمة",
     "a_note": "Check each reference against your source and your institution’s guide.|Revisa cada referencia con tu fuente y con la guía de tu institución.|Confira cada referência com a sua fonte e com o guia da sua instituição.|Periksa setiap referensi dengan sumbernya dan pedoman institusi Anda.|हर संदर्भ को अपने स्रोत और अपनी संस्था की गाइड से मिलाकर जाँचें।|راجع كل مرجع مقابل مصدره ودليل مؤسستك."
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
     "es": "Cifra texto con una contraseña usando AES-256-GCM. La clave se deriva de tu contraseña con PBKDF2 (SHA-256, 600.000 iteraciones) y una sal aleatoria, y cada cifrado usa un nonce aleatorio, por lo que el mismo texto da un resultado distinto cada vez. Todo ocurre en tu navegador. Si pierdes la contraseña, el texto no se puede recuperar. Usa una contraseña larga y única.",
     "pt": "Criptografa texto com uma senha usando AES-256-GCM. A chave é derivada da sua senha com PBKDF2 (SHA-256, 600.000 iterações) e um sal aleatório, e cada criptografia usa um nonce aleatório, então o mesmo texto gera um resultado diferente a cada vez. Tudo acontece no seu navegador. Se você perder a senha, o texto não poderá ser recuperado. Use uma senha longa e única.",
     "id": "Mengenkripsi teks dengan kata sandi memakai AES-256-GCM. Kunci diturunkan dari kata sandi Anda dengan PBKDF2 (SHA-256, 600.000 iterasi) dan salt acak, dan setiap enkripsi memakai nonce acak, sehingga teks yang sama menghasilkan keluaran berbeda setiap kali. Semuanya terjadi di browser Anda. Jika kata sandi hilang, teks tidak dapat dipulihkan. Gunakan kata sandi yang panjang dan unik.",
     "hi": "पासवर्ड से AES-256-GCM का उपयोग करके टेक्स्ट को एन्क्रिप्ट करता है। कुंजी आपके पासवर्ड से PBKDF2 (SHA-256, 6,00,000 पुनरावृत्तियाँ) और एक यादृच्छिक सॉल्ट के साथ बनती है, और हर एन्क्रिप्शन में यादृच्छिक नॉन्स लगता है, इसलिए एक ही टेक्स्ट हर बार अलग परिणाम देता है। सब कुछ आपके ब्राउज़र में होता है। पासवर्ड खो जाने पर टेक्स्ट वापस नहीं पाया जा सकता। लंबा और अनूठा पासवर्ड उपयोग करें।",
     "ar": "يشفّر النص بكلمة مرور باستخدام AES-256-GCM. يُشتق المفتاح من كلمة مرورك عبر PBKDF2 (SHA-256 و600,000 تكرار) مع ملح عشوائي، ويُستخدم nonce عشوائي في كل تشفير، فيعطي النص نفسه ناتجًا مختلفًا في كل مرة. كل شيء يحدث داخل متصفحك. إذا فقدت كلمة المرور فلا يمكن استرجاع النص. استخدم كلمة مرور طويلة وفريدة."
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
     "pt": "Converte entre milímetros, centímetros, metros, quilômetros, polegadas, pés, jardas, milhas e milhas náuticas (nmi). Os resultados usam definições exatas, por exemplo 1 polegada = 25,4 mm e 1 milha = 1.609,344 m, e são exibidos com até 10 algarismos significativos.",
     "id": "Mengonversi antara milimeter, sentimeter, meter, kilometer, inci, kaki, yard, mil, dan mil laut (nmi). Hasil memakai definisi pasti, misalnya 1 inci = 25,4 mm dan 1 mil = 1.609,344 m, serta ditampilkan hingga 10 angka signifikan.",
     "hi": "मिलीमीटर, सेंटीमीटर, मीटर, किलोमीटर, इंच, फ़ुट, गज़, मील और नॉटिकल मील (nmi) के बीच बदलता है। परिणाम सटीक परिभाषाओं पर आधारित हैं, जैसे 1 इंच = 25.4 mm और 1 मील = 1,609.344 m, और अधिकतम 10 सार्थक अंकों तक दिखाए जाते हैं।",
     "ar": "يحوّل بين الميليمترات والسنتيمترات والأمتار والكيلومترات والبوصات والأقدام والياردات والأميال والأميال البحرية (nmi). تعتمد النتائج على تعريفات دقيقة، مثل 1 بوصة = 25.4 مم و1 ميل = 1,609.344 م، وتُعرض بما يصل إلى 10 أرقام معنوية."
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
     "es": "Convierte entre milímetros cuadrados, centímetros cuadrados, metros cuadrados, hectáreas, kilómetros cuadrados, pulgadas cuadradas, pies cuadrados, yardas cuadradas, acres y millas cuadradas. Una hectárea son 10.000 m² y un acre son 4046,8564224 m².",
     "pt": "Converte entre milímetros quadrados, centímetros quadrados, metros quadrados, hectares, quilômetros quadrados, polegadas quadradas, pés quadrados, jardas quadradas, acres e milhas quadradas. Um hectare são 10.000 m² e um acre são 4.046,8564224 m².",
     "id": "Mengonversi antara milimeter persegi, sentimeter persegi, meter persegi, hektare, kilometer persegi, inci persegi, kaki persegi, yard persegi, acre, dan mil persegi. Satu hektare adalah 10.000 m² dan satu acre adalah 4.046,8564224 m².",
     "hi": "वर्ग मिलीमीटर, वर्ग सेंटीमीटर, वर्ग मीटर, हेक्टेयर, वर्ग किलोमीटर, वर्ग इंच, वर्ग फ़ुट, वर्ग गज़, एकड़ और वर्ग मील के बीच बदलता है। एक हेक्टेयर 10,000 m² और एक एकड़ 4,046.8564224 m² के बराबर है।",
     "ar": "يحوّل بين المليمترات المربعة والسنتيمترات المربعة والأمتار المربعة والهكتارات والكيلومترات المربعة والبوصات المربعة والأقدام المربعة والياردات المربعة والأكرات والأميال المربعة. الهكتار الواحد يساوي 10,000 م² والأكر الواحد يساوي 4,046.8564224 م²."
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
     "ar": "يحوّل الأعداد من 1 إلى 3,999 إلى أرقام رومانية والعكس. اكتب أرقامًا لتحصل على رقم روماني، أو اكتب رقمًا رومانيًا مثل MCMXCIV لتحصل على العدد. يُقبل التدوين الطرحي القياسي فقط، لذا IIII غير صالح بينما IV صالح."
    }
   },
   {
    "id": "number-to-words",
    "n": {
     "en": "Number to Words Converter",
     "es": "Conversor de números a letras",
     "pt": "Conversor de número por extenso",
     "id": "Angka ke Teks (Terbilang)",
     "hi": "संख्या से शब्द कन्वर्टर",
     "ar": "محوّل الأرقام إلى كلمات"
    },
    "a": {
     "en": "Converts a number into words in English, Spanish, Portuguese, Indonesian, Hindi or Arabic. It handles whole numbers up to 15 digits, decimals (read digit by digit), negative numbers and an optional currency or unit word, for example “one hundred twenty-three rupiah”. Choose lowercase, sentence case, Title Case or UPPERCASE, and tick the British option to add “and” in English (one hundred and twenty-three). Spanish uses the long scale (mil millones, billón), Portuguese follows Brazilian usage and Hindi uses lakh and crore.",
     "es": "Convierte un número en palabras en inglés, español, portugués, indonesio, hindi o árabe. Admite enteros de hasta 15 dígitos, decimales (se leen dígito a dígito), números negativos y una moneda o unidad opcional, por ejemplo «ciento veintitrés pesos». Elige minúsculas, tipo oración, tipo título o MAYÚSCULAS, y marca la opción británica para añadir «and» en inglés (one hundred and twenty-three). El español usa la escala larga (mil millones, billón), el portugués sigue el uso de Brasil y el hindi usa lakh y crore.",
     "pt": "Converte um número em palavras em inglês, espanhol, português, indonésio, hindi ou árabe. Aceita inteiros de até 15 dígitos, decimais (lidos dígito a dígito), números negativos e uma moeda ou unidade opcional, por exemplo “cento e vinte e três reais”. Escolha minúsculas, frase, título ou MAIÚSCULAS e marque a opção britânica para acrescentar “and” em inglês (one hundred and twenty-three). O espanhol usa a escala longa (mil millones, billón), o português segue o uso do Brasil e o hindi usa lakh e crore.",
     "id": "Mengubah angka menjadi tulisan kata dalam bahasa Inggris, Spanyol, Portugis, Indonesia, Hindi, atau Arab. Mendukung bilangan bulat sampai 15 digit, desimal (dibaca digit per digit), bilangan negatif, serta kata mata uang atau satuan opsional, misalnya “seratus dua puluh tiga rupiah”. Pilih huruf kecil, kalimat, judul, atau HURUF BESAR, dan centang opsi Britania untuk menambahkan “and” dalam bahasa Inggris (one hundred and twenty-three). Bahasa Spanyol memakai skala panjang (mil millones, billón), bahasa Portugis mengikuti pemakaian Brasil, dan bahasa Hindi memakai lakh dan crore.",
     "hi": "किसी संख्या को अंग्रेज़ी, स्पेनिश, पुर्तगाली, इंडोनेशियाई, हिन्दी या अरबी में शब्दों में बदलता है। यह 15 अंकों तक की पूर्ण संख्याएँ, दशमलव (अंक-अंक करके पढ़े जाते हैं), ऋणात्मक संख्याएँ और वैकल्पिक मुद्रा या इकाई का शब्द स्वीकार करता है, जैसे «एक सौ तेईस रुपये»। छोटे अक्षर, वाक्य, शीर्षक या बड़े अक्षर चुनें, और अंग्रेज़ी में “and” जोड़ने के लिए ब्रिटिश विकल्प चुनें (one hundred and twenty-three)। स्पेनिश दीर्घ मापक्रम (mil millones, billón) का प्रयोग करती है, पुर्तगाली ब्राज़ील के चलन का पालन करती है और हिन्दी में लाख व करोड़ चलते हैं।",
     "ar": "يحوّل العدد إلى كلمات بالإنجليزية أو الإسبانية أو البرتغالية أو الإندونيسية أو الهندية أو العربية. يقبل أعدادًا صحيحة حتى 15 رقمًا، وكسورًا عشرية (تُقرأ رقمًا رقمًا)، وأعدادًا سالبة، وكلمة اختيارية للعملة أو الوحدة، مثل «مائة وثلاثة وعشرون ريال». اختر الأحرف الصغيرة أو حالة الجملة أو حالة العنوان أو الأحرف الكبيرة، وفعّل الخيار البريطاني لإضافة «and» في الإنجليزية (one hundred and twenty-three). تستخدم الإسبانية المقياس الطويل (mil millones وbillón)، وتتبع البرتغالية الاستعمال البرازيلي، وتستخدم الهندية اللاخ والكرور."
    },
    "ui": {
     "n2w_in": "Number|Número|Número|Angka|संख्या|العدد",
     "n2w_lang": "Output language|Idioma del resultado|Idioma do resultado|Bahasa hasil|परिणाम की भाषा|لغة النتيجة",
     "n2w_case": "Letter case|Mayúsculas y minúsculas|Maiúsculas e minúsculas|Huruf besar/kecil|अक्षर केस|حالة الأحرف",
     "n2w_unit": "Currency or unit (optional)|Moneda o unidad (opcional)|Moeda ou unidade (opcional)|Mata uang atau satuan (opsional)|मुद्रा या इकाई (वैकल्पिक)|العملة أو الوحدة (اختياري)",
     "n2w_brit": "English: use “and” (British style)|Inglés: usar «and» (estilo británico)|Inglês: usar “and” (estilo britânico)|Inggris: pakai “and” (gaya Britania)|अंग्रेज़ी: “and” लगाएँ (ब्रिटिश शैली)|الإنجليزية: استخدام «and» (النمط البريطاني)",
     "n2w_range": "Number too long. Use up to 15 digits before the decimal point and 30 after it.|Número demasiado largo. Usa hasta 15 dígitos antes del separador decimal y 30 después.|Número longo demais. Use até 15 dígitos antes da vírgula decimal e 30 depois.|Angka terlalu panjang. Gunakan maksimal 15 digit sebelum tanda desimal dan 30 digit sesudahnya.|संख्या बहुत लंबी है। दशमलव से पहले अधिकतम 15 और बाद में 30 अंक रखें।|العدد طويل جدًا. استخدم حتى 15 رقمًا قبل الفاصلة العشرية و30 رقمًا بعدها."
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
   },
   {
    "id": "excel-to-statistics",
    "n": {
     "en": "Excel to Statistics",
     "es": "Excel a estadísticas",
     "pt": "Excel para estatísticas",
     "id": "Excel ke Statistik",
     "hi": "Excel से सांख्यिकी",
     "ar": "من Excel إلى الإحصاءات"
    },
    "a": {
     "en": "Turn spreadsheet data into statistics and charts without writing code. Upload an Excel (.xlsx) or CSV file, paste cells copied from Excel, or type the values by hand, then tick what you want: descriptive statistics (you choose exactly which ones, optionally by group), frequency tables, normality tests, homogeneity of variances, correlation, t-tests, one-way and two-way ANOVA with Tukey HSD, Mann–Whitney, Wilcoxon, Kruskal–Wallis, Friedman, chi-square, binomial test, linear and logistic regression and Cronbach's alpha. Eight chart types are included: bar chart, histogram, box plot, scatter plot, line chart, pie chart, Q–Q plot and correlation heat map. Tables can be copied or downloaded as Excel or CSV, charts as SVG or PNG, and everything is calculated in your browser.",
     "es": "Convierte los datos de una hoja de cálculo en estadísticas y gráficos sin escribir código. Sube un archivo de Excel (.xlsx) o CSV, pega celdas copiadas de Excel o escribe los valores a mano y marca lo que quieras: estadísticos descriptivos (tú eliges cuáles, y por grupo si lo deseas), tablas de frecuencias, pruebas de normalidad, homogeneidad de varianzas, correlación, pruebas t, ANOVA de uno y dos factores con Tukey HSD, Mann–Whitney, Wilcoxon, Kruskal–Wallis, Friedman, chi cuadrado, prueba binomial, regresión lineal y logística y alfa de Cronbach. Incluye ocho tipos de gráfico: barras, histograma, diagrama de caja, dispersión, líneas, circular, gráfico Q–Q y mapa de calor de correlaciones. Las tablas se copian o se descargan como Excel o CSV, los gráficos como SVG o PNG, y todo se calcula en tu navegador.",
     "pt": "Transforme os dados de uma planilha em estatísticas e gráficos sem escrever código. Envie um arquivo Excel (.xlsx) ou CSV, cole células copiadas do Excel ou digite os valores à mão e marque o que deseja: estatísticas descritivas (você escolhe quais, e por grupo se quiser), tabelas de frequência, testes de normalidade, homogeneidade de variâncias, correlação, testes t, ANOVA de um e dois fatores com Tukey HSD, Mann–Whitney, Wilcoxon, Kruskal–Wallis, Friedman, qui-quadrado, teste binomial, regressão linear e logística e alfa de Cronbach. São oito tipos de gráfico: barras, histograma, boxplot, dispersão, linhas, pizza, gráfico Q–Q e mapa de calor de correlações. As tabelas podem ser copiadas ou baixadas como Excel ou CSV, os gráficos como SVG ou PNG, e tudo é calculado no seu navegador.",
     "id": "Ubah data lembar kerja menjadi statistik dan grafik tanpa menulis kode. Unggah berkas Excel (.xlsx) atau CSV, tempel sel yang disalin dari Excel, atau ketik nilainya secara manual, lalu centang yang diinginkan: statistik deskriptif (Anda memilih statistik mana saja, bisa per kelompok), tabel frekuensi, uji normalitas, homogenitas varians, korelasi, uji-t, ANOVA satu dan dua arah dengan Tukey HSD, Mann–Whitney, Wilcoxon, Kruskal–Wallis, Friedman, chi-kuadrat, uji binomial, regresi linear dan logistik, serta alfa Cronbach. Tersedia delapan jenis grafik: diagram batang, histogram, diagram kotak, diagram pencar, diagram garis, diagram lingkaran, plot Q–Q, dan peta panas korelasi. Tabel bisa disalin atau diunduh sebagai Excel atau CSV, grafik sebagai SVG atau PNG, dan semua perhitungan berjalan di browser Anda.",
     "hi": "स्प्रेडशीट के डेटा को बिना कोड लिखे सांख्यिकी और चार्ट में बदलें। Excel (.xlsx) या CSV फ़ाइल अपलोड करें, Excel से कॉपी की गई सेल पेस्ट करें या मान हाथ से टाइप करें, फिर जो चाहिए उसे चुनें: वर्णनात्मक सांख्यिकी (कौन-सी दिखानी है यह आप तय करते हैं, चाहें तो समूहवार), आवृत्ति तालिकाएँ, सामान्यता परीक्षण, प्रसरणों की समरूपता, सहसंबंध, t-परीक्षण, Tukey HSD सहित एक और दो तरफ़ा ANOVA, मान–व्हिटनी, विल्कॉक्सन, क्रुस्कल–वालिस, फ्रीडमैन, काई-वर्ग, द्विपद परीक्षण, रैखिक और लॉजिस्टिक समाश्रयण तथा क्रोनबाख अल्फ़ा। आठ प्रकार के चार्ट शामिल हैं: बार चार्ट, हिस्टोग्राम, बॉक्स प्लॉट, प्रकीर्ण आलेख, रेखा चार्ट, पाई चार्ट, Q–Q आलेख और सहसंबंध हीट मैप। तालिकाएँ कॉपी या Excel/CSV के रूप में और चार्ट SVG/PNG के रूप में डाउनलोड हो सकते हैं, और सारी गणना आपके ब्राउज़र में होती है।",
     "ar": "حوّل بيانات جدول البيانات إلى إحصاءات ومخططات دون كتابة أي شيفرة. ارفع ملف Excel (‎.xlsx) أو CSV، أو الصق خلايا منسوخة من Excel، أو اكتب القيم يدويًا، ثم حدّد ما تريد: الإحصاءات الوصفية (أنت تختار أيًّا منها، وحسب المجموعة إن شئت)، وجداول التكرار، واختبارات التوزيع الطبيعي، وتجانس التباينات، والارتباط، واختبارات t، وتحليل التباين أحادي وثنائي الاتجاه مع Tukey HSD، ومان–ويتني، وويلكوكسون، وكروسكال–واليس، وفريدمان، ومربع كاي، والاختبار ثنائي الحد، والانحدار الخطي واللوجستي، وألفا كرونباخ. تتوفر ثمانية أنواع من المخططات: الأعمدة، والمدرج التكراري، والصندوقي، والتشتت، والخطي، والدائري، ومخطط Q–Q، والخريطة الحرارية للارتباط. يمكن نسخ الجداول أو تنزيلها بصيغة Excel أو CSV، وتنزيل المخططات بصيغة SVG أو PNG، وتجري كل الحسابات في متصفحك."
    },
    "ui": {
     "s_data": "Data|Datos|Dados|Data|डेटा|البيانات",
     "s_file": "Excel or CSV file (.xlsx, .xlsm, .csv, .tsv, .txt)|Archivo Excel o CSV (.xlsx, .xlsm, .csv, .tsv, .txt)|Arquivo Excel ou CSV (.xlsx, .xlsm, .csv, .tsv, .txt)|Berkas Excel atau CSV (.xlsx, .xlsm, .csv, .tsv, .txt)|Excel या CSV फ़ाइल (.xlsx, .xlsm, .csv, .tsv, .txt)|ملف Excel أو CSV (‎.xlsx, .xlsm, .csv, .tsv, .txt)",
     "s_sheet": "Sheet|Hoja|Planilha|Lembar kerja|शीट|الورقة",
     "s_paste": "Or paste or type data here (cells copied from Excel work; first row = column names)|O pega o escribe los datos aquí (sirven las celdas copiadas de Excel; primera fila = nombres de columnas)|Ou cole ou digite os dados aqui (células copiadas do Excel funcionam; primeira linha = nomes das colunas)|Atau tempel/ketik data di sini (sel yang disalin dari Excel bisa; baris pertama = nama kolom)|या डेटा यहाँ पेस्ट करें या टाइप करें (Excel से कॉपी की गई सेल चलेंगी; पहली पंक्ति = कॉलम के नाम)|أو الصق البيانات أو اكتبها هنا (تصلح الخلايا المنسوخة من Excel؛ الصف الأول = أسماء الأعمدة)",
     "s_hdr": "First row contains column names|La primera fila contiene los nombres de columnas|A primeira linha contém os nomes das colunas|Baris pertama berisi nama kolom|पहली पंक्ति में कॉलम के नाम हैं|الصف الأول يحتوي على أسماء الأعمدة",
     "s_dec": "Decimal mark in the data|Separador decimal de los datos|Separador decimal dos dados|Tanda desimal pada data|डेटा में दशमलव चिह्न|العلامة العشرية في البيانات",
     "s_dec_a": "Automatic|Automático|Automático|Otomatis|स्वचालित|تلقائي",
     "s_dec_d": "Dot (1.5)|Punto (1.5)|Ponto (1.5)|Titik (1.5)|बिंदु (1.5)|نقطة (1.5)",
     "s_dec_c": "Comma (1,5)|Coma (1,5)|Vírgula (1,5)|Koma (1,5)|अल्पविराम (1,5)|فاصلة (1,5)",
     "s_ex": "Load example data|Cargar datos de ejemplo|Carregar dados de exemplo|Muat data contoh|उदाहरण डेटा लोड करें|تحميل بيانات مثال",
     "s_nodata": "Upload a file or type data to begin.|Sube un archivo o escribe datos para empezar.|Envie um arquivo ou digite dados para começar.|Unggah berkas atau ketik data untuk memulai.|शुरू करने के लिए फ़ाइल अपलोड करें या डेटा टाइप करें।|ارفع ملفًا أو اكتب بيانات للبدء.",
     "s_info": "{r} rows × {c} columns loaded.|{r} filas × {c} columnas cargadas.|{r} linhas × {c} colunas carregadas.|{r} baris × {c} kolom dimuat.|{r} पंक्तियाँ × {c} कॉलम लोड हुए।|تم تحميل {r} صفًا × {c} عمودًا.",
     "s_vars": "Variables (change the type if it was detected wrongly)|Variables (cambia el tipo si se detectó mal)|Variáveis (altere o tipo se foi detectado errado)|Variabel (ubah tipe jika terdeteksi salah)|वेरिएबल (गलत पहचान हो तो प्रकार बदलें)|المتغيرات (غيّر النوع إذا اكتُشف خطأً)",
     "s_vname": "Variable|Variable|Variável|Variabel|वेरिएबल|المتغير",
     "s_vtype": "Type|Tipo|Tipo|Tipe|प्रकार|النوع",
     "s_vnum": "Numeric|Numérica|Numérica|Numerik|संख्यात्मक|رقمي",
     "s_vcat": "Category|Categoría|Categoria|Kategori|श्रेणी|فئوي",
     "s_vn": "Valid|Válidos|Válidos|Valid|मान्य|صالح",
     "s_vmiss": "Missing|Faltantes|Ausentes|Hilang|अनुपलब्ध|مفقود",
     "s_prev": "Preview (first 10 rows)|Vista previa (primeras 10 filas)|Pré-visualização (primeiras 10 linhas)|Pratinjau (10 baris pertama)|पूर्वावलोकन (पहली 10 पंक्तियाँ)|معاينة (أول 10 صفوف)",
     "s_an": "Analyses (tick the ones you want)|Análisis (marca los que quieras)|Análises (marque as que deseja)|Analisis (centang yang diinginkan)|विश्लेषण (जो चाहिए उन पर निशान लगाएँ)|التحليلات (حدّد ما تريد)",
     "s_a_desc": "Descriptive statistics|Estadísticos descriptivos|Estatísticas descritivas|Statistik deskriptif|वर्णनात्मक सांख्यिकी|الإحصاءات الوصفية",
     "s_a_freq": "Frequency tables|Tablas de frecuencias|Tabelas de frequência|Tabel frekuensi|आवृत्ति तालिकाएँ|جداول التكرار",
     "s_a_norm": "Normality tests (Shapiro–Wilk, Anderson–Darling, Lilliefors, Jarque–Bera)|Pruebas de normalidad (Shapiro–Wilk, Anderson–Darling, Lilliefors, Jarque–Bera)|Testes de normalidade (Shapiro–Wilk, Anderson–Darling, Lilliefors, Jarque–Bera)|Uji normalitas (Shapiro–Wilk, Anderson–Darling, Lilliefors, Jarque–Bera)|सामान्यता परीक्षण (शापिरो–विल्क, एंडरसन–डार्लिंग, लिलीफ़ोर्स, जार्क–बेरा)|اختبارات التوزيع الطبيعي (شابيرو–ويلك، أندرسون–دارلينغ، ليليفورز، جارك–بيرا)",
     "s_a_cor": "Correlation|Correlación|Correlação|Korelasi|सहसंबंध|الارتباط",
     "s_a_t1": "One-sample t-test|Prueba t de una muestra|Teste t de uma amostra|Uji-t satu sampel|एक-प्रतिदर्श t-परीक्षण|اختبار t لعينة واحدة",
     "s_a_t2": "Independent-samples t-test|Prueba t de muestras independientes|Teste t de amostras independentes|Uji-t sampel independen|स्वतंत्र प्रतिदर्श t-परीक्षण|اختبار t لعينتين مستقلتين",
     "s_a_tp": "Paired-samples t-test|Prueba t de muestras relacionadas|Teste t de amostras pareadas|Uji-t sampel berpasangan|युग्मित प्रतिदर्श t-परीक्षण|اختبار t لعينتين مترابطتين",
     "s_a_aov": "One-way ANOVA (with Tukey HSD)|ANOVA de un factor (con Tukey HSD)|ANOVA de um fator (com Tukey HSD)|ANOVA satu arah (dengan Tukey HSD)|एकतरफ़ा ANOVA (Tukey HSD सहित)|تحليل التباين أحادي الاتجاه (مع Tukey HSD)",
     "s_a_mw": "Mann–Whitney U test|Prueba U de Mann–Whitney|Teste U de Mann–Whitney|Uji U Mann–Whitney|मान–व्हिटनी U परीक्षण|اختبار مان–ويتني U",
     "s_a_wx": "Wilcoxon signed-rank test|Prueba de rangos con signo de Wilcoxon|Teste de postos sinalizados de Wilcoxon|Uji peringkat bertanda Wilcoxon|विल्कॉक्सन चिह्नित-कोटि परीक्षण|اختبار ويلكوكسون للرتب الموقعة",
     "s_a_kw": "Kruskal–Wallis test|Prueba de Kruskal–Wallis|Teste de Kruskal–Wallis|Uji Kruskal–Wallis|क्रुस्कल–वालिस परीक्षण|اختبار كروسكال–واليس",
     "s_a_chi": "Chi-square test of independence|Prueba de chi cuadrado de independencia|Teste qui-quadrado de independência|Uji chi-kuadrat independensi|स्वतंत्रता का काई-वर्ग परीक्षण|اختبار مربع كاي للاستقلالية",
     "s_a_reg": "Linear regression|Regresión lineal|Regressão linear|Regresi linear|रैखिक समाश्रयण|الانحدار الخطي",
     "s_vars_sel": "Variables|Variables|Variáveis|Variabel|वेरिएबल|المتغيرات",
     "s_all": "Select all|Seleccionar todo|Selecionar tudo|Pilih semua|सभी चुनें|تحديد الكل",
     "s_none": "Select none|Quitar todo|Limpar seleção|Hapus pilihan|कुछ नहीं चुनें|إلغاء التحديد",
     "s_stats": "Statistics to show|Estadísticos a mostrar|Estatísticas a mostrar|Statistik yang ditampilkan|दिखाई जाने वाली सांख्यिकी|الإحصاءات المطلوب عرضها",
     "s_tr": "Variables as rows (transpose the table)|Variables en filas (transponer la tabla)|Variáveis nas linhas (transpor a tabela)|Variabel sebagai baris (transpos tabel)|वेरिएबल पंक्तियों में (तालिका पलटें)|المتغيرات في الصفوف (تبديل الجدول)",
     "s_dep": "Numeric variable|Variable numérica|Variável numérica|Variabel numerik|संख्यात्मक वेरिएबल|المتغير الرقمي",
     "s_grp": "Grouping variable|Variable de agrupación|Variável de agrupamento|Variabel pengelompok|समूह वेरिएबल|متغير التجميع",
     "s_g1": "Group 1|Grupo 1|Grupo 1|Kelompok 1|समूह 1|المجموعة 1",
     "s_g2": "Group 2|Grupo 2|Grupo 2|Kelompok 2|समूह 2|المجموعة 2",
     "s_var1": "Variable 1|Variable 1|Variável 1|Variabel 1|वेरिएबल 1|المتغير 1",
     "s_var2": "Variable 2|Variable 2|Variável 2|Variabel 2|वेरिएबल 2|المتغير 2",
     "s_pred": "Predictors (numeric variables)|Predictores (variables numéricas)|Preditores (variáveis numéricas)|Prediktor (variabel numerik)|पूर्वसूचक (संख्यात्मक वेरिएबल)|المتغيرات المستقلة (رقمية)",
     "s_mu": "Test value μ₀|Valor de prueba μ₀|Valor de teste μ₀|Nilai uji μ₀|परीक्षण मान μ₀|القيمة المختبَرة μ₀",
     "s_alt": "Alternative|Alternativa|Alternativa|Hipotesis alternatif|वैकल्पिक परिकल्पना|الفرضية البديلة",
     "s_alt2": "Two-sided|Bilateral|Bilateral|Dua arah|द्वि-पक्षीय|ثنائي الطرف",
     "s_altg": "Greater|Mayor|Maior|Lebih besar|अधिक|أكبر",
     "s_altl": "Less|Menor|Menor|Lebih kecil|कम|أصغر",
     "s_method": "Method|Método|Método|Metode|विधि|الطريقة",
     "s_tukey": "Tukey HSD post hoc comparisons|Comparaciones post hoc de Tukey HSD|Comparações post hoc de Tukey HSD|Uji lanjut Tukey HSD|Tukey HSD पश्च-परीक्षण तुलना|المقارنات البعدية Tukey HSD",
     "s_opt": "Options|Opciones|Opções|Opsi|विकल्प|الخيارات",
     "s_alpha": "Significance level α (confidence level = 1 − α)|Nivel de significancia α (confianza = 1 − α)|Nível de significância α (confiança = 1 − α)|Taraf signifikansi α (tingkat kepercayaan = 1 − α)|सार्थकता स्तर α (विश्वास स्तर = 1 − α)|مستوى الدلالة α (مستوى الثقة = 1 − α)",
     "s_dg": "Decimal places in results|Decimales en los resultados|Casas decimais nos resultados|Angka desimal pada hasil|परिणामों में दशमलव स्थान|الخانات العشرية في النتائج",
     "s_run": "Run analysis|Ejecutar análisis|Executar análise|Jalankan analisis|विश्लेषण चलाएँ|تشغيل التحليل",
     "s_xlsx": "Download Excel (.xlsx)|Descargar Excel (.xlsx)|Baixar Excel (.xlsx)|Unduh Excel (.xlsx)|Excel (.xlsx) डाउनलोड करें|تنزيل Excel (.xlsx)",
     "s_csv": "Download CSV|Descargar CSV|Baixar CSV|Unduh CSV|CSV डाउनलोड करें|تنزيل CSV",
     "s_cpall": "Copy all results|Copiar todos los resultados|Copiar todos os resultados|Salin semua hasil|सभी परिणाम कॉपी करें|نسخ كل النتائج",
     "s_sn": "n (valid)|n (válidos)|n (válidos)|n (valid)|n (मान्य)|n (الصالحة)",
     "s_sm": "Missing|Faltantes|Ausentes|Hilang|अनुपलब्ध|المفقودة",
     "s_ssum": "Sum|Suma|Soma|Jumlah|योग|المجموع",
     "s_mean": "Mean|Media|Média|Rata-rata|माध्य|المتوسط",
     "s_sem": "Std. error of mean|Error estándar de la media|Erro padrão da média|Galat baku rata-rata|माध्य की मानक त्रुटि|الخطأ المعياري للمتوسط",
     "s_ci": "Confidence interval of the mean|Intervalo de confianza de la media|Intervalo de confiança da média|Interval kepercayaan rata-rata|माध्य का विश्वास अंतराल|فترة الثقة للمتوسط",
     "s_cil": "Mean CI lower bound ({l}%)|Límite inferior IC de la media ({l}%)|Limite inferior IC da média ({l}%)|Batas bawah IK rata-rata ({l}%)|माध्य अंतराल निचली सीमा ({l}%)|الحد الأدنى لفترة ثقة المتوسط ({l}%)",
     "s_cih": "Mean CI upper bound ({l}%)|Límite superior IC de la media ({l}%)|Limite superior IC da média ({l}%)|Batas atas IK rata-rata ({l}%)|माध्य अंतराल ऊपरी सीमा ({l}%)|الحد الأعلى لفترة ثقة المتوسط ({l}%)",
     "s_med": "Median|Mediana|Mediana|Median|माध्यिका|الوسيط",
     "s_mode": "Mode|Moda|Moda|Modus|बहुलक|المنوال",
     "s_min": "Minimum|Mínimo|Mínimo|Minimum|न्यूनतम|الحد الأدنى",
     "s_max": "Maximum|Máximo|Máximo|Maksimum|अधिकतम|الحد الأقصى",
     "s_rng": "Range|Rango|Amplitude|Rentang|परास|المدى",
     "s_q1": "1st quartile (Q1)|1.er cuartil (Q1)|1.º quartil (Q1)|Kuartil 1 (Q1)|प्रथम चतुर्थक (Q1)|الربيع الأول (Q1)",
     "s_q3": "3rd quartile (Q3)|3.er cuartil (Q3)|3.º quartil (Q3)|Kuartil 3 (Q3)|तृतीय चतुर्थक (Q3)|الربيع الثالث (Q3)",
     "s_iqr": "Interquartile range (IQR)|Rango intercuartílico (IQR)|Amplitude interquartílica (IQR)|Rentang antarkuartil (IQR)|अंतर-चतुर्थक परास (IQR)|المدى الربيعي (IQR)",
     "s_var": "Variance (sample, n − 1)|Varianza (muestral, n − 1)|Variância (amostral, n − 1)|Varians (sampel, n − 1)|प्रसरण (प्रतिदर्श, n − 1)|التباين (للعينة، n − 1)",
     "s_sd": "Std. deviation (sample, n − 1)|Desviación estándar (muestral, n − 1)|Desvio padrão (amostral, n − 1)|Simpangan baku (sampel, n − 1)|मानक विचलन (प्रतिदर्श, n − 1)|الانحراف المعياري (للعينة، n − 1)",
     "s_varp": "Variance (population, n)|Varianza (poblacional, n)|Variância (populacional, n)|Varians (populasi, n)|प्रसरण (जनसंख्या, n)|التباين (للمجتمع، n)",
     "s_sdp": "Std. deviation (population, n)|Desviación estándar (poblacional, n)|Desvio padrão (populacional, n)|Simpangan baku (populasi, n)|मानक विचलन (जनसंख्या, n)|الانحراف المعياري (للمجتمع، n)",
     "s_cv": "Coefficient of variation (%)|Coeficiente de variación (%)|Coeficiente de variação (%)|Koefisien variasi (%)|विचरण गुणांक (%)|معامل الاختلاف (%)",
     "s_skew": "Skewness|Asimetría|Assimetria|Skewness (kemencengan)|विषमता (स्क्यूनेस)|الالتواء",
     "s_kurt": "Kurtosis (excess)|Curtosis (exceso)|Curtose (excesso)|Kurtosis (kelebihan)|कर्टोसिस (अतिरिक्त)|التفلطح (الزائد)",
     "s_n_desc": "Quartiles use the inclusive method (same as Excel QUARTILE.INC). Skewness and kurtosis follow Excel SKEW and KURT (kurtosis is excess kurtosis). Outliers are values beyond 1.5 × IQR from the quartiles.|Los cuartiles usan el método inclusivo (igual que QUARTILE.INC de Excel). La asimetría y la curtosis siguen SKEW y KURT de Excel (la curtosis es el exceso). Los valores atípicos están a más de 1,5 × IQR de los cuartiles.|Os quartis usam o método inclusivo (igual ao QUARTIL.INC do Excel). Assimetria e curtose seguem ASSIMETRIA e CURT do Excel (curtose em excesso). Valores atípicos estão a mais de 1,5 × IQR dos quartis.|Kuartil memakai metode inklusif (sama dengan QUARTILE.INC Excel). Skewness dan kurtosis mengikuti SKEW dan KURT Excel (kurtosis berupa kelebihan). Pencilan adalah nilai yang lebih dari 1,5 × IQR dari kuartil.|चतुर्थक समावेशी विधि से निकलते हैं (Excel QUARTILE.INC जैसे)। विषमता और कर्टोसिस Excel के SKEW और KURT के अनुसार हैं (कर्टोसिस अतिरिक्त है)। बाह्य मान चतुर्थकों से 1.5 × IQR से अधिक दूर के मान हैं।|تُحسب الأرباع بالطريقة الشاملة (مثل QUARTILE.INC في Excel). الالتواء والتفلطح يتبعان SKEW وKURT في Excel (التفلطح هو الزائد). القيم الشاذة هي القيم التي تبعد أكثر من 1.5 × IQR عن الأرباع.",
     "s_stat": "Statistic|Estadístico|Estatística|Statistik|सांख्यिकी|الإحصائية",
     "s_value": "Value|Valor|Valor|Nilai|मान|القيمة",
     "s_val": "Value|Valor|Valor|Nilai|मान|القيمة",
     "s_freq": "Frequency|Frecuencia|Frequência|Frekuensi|आवृत्ति|التكرار",
     "s_vpct": "Valid %|% válido|% válido|% valid|मान्य %|% الصالح",
     "s_cpct": "Cumulative %|% acumulado|% acumulado|% kumulatif|संचयी %|% التراكمي",
     "s_na": "Missing|Faltantes|Ausentes|Hilang|अनुपलब्ध|مفقود",
     "s_tot": "Total|Total|Total|Total|कुल|المجموع",
     "s_trunc": "Only the first {n} categories are shown.|Solo se muestran las primeras {n} categorías.|Apenas as primeiras {n} categorias são mostradas.|Hanya {n} kategori pertama yang ditampilkan.|केवल पहली {n} श्रेणियाँ दिखाई गई हैं।|تُعرض أول {n} فئة فقط.",
     "s_res": "Result|Resultado|Resultado|Hasil|परिणाम|النتيجة",
     "s_sg": "Significant|Significativo|Significativo|Signifikan|सार्थक|دالّ",
     "s_ns": "Not significant|No significativo|Não significativo|Tidak signifikan|सार्थक नहीं|غير دالّ",
     "s_nrm": "Normal (p ≥ α)|Normal (p ≥ α)|Normal (p ≥ α)|Normal (p ≥ α)|सामान्य (p ≥ α)|طبيعي (p ≥ α)",
     "s_nnrm": "Not normal (p < α)|No normal (p < α)|Não normal (p < α)|Tidak normal (p < α)|सामान्य नहीं (p < α)|غير طبيعي (p < α)",
     "s_e_sw": "Needs 3 to 5000 values that are not all equal|Requiere de 3 a 5000 valores no todos iguales|Requer de 3 a 5000 valores não todos iguais|Perlu 3 sampai 5000 nilai yang tidak semuanya sama|3 से 5000 मान चाहिए जो सब बराबर न हों|يتطلب 3 إلى 5000 قيمة غير متساوية جميعها",
     "s_n_norm": "The null hypothesis of every test is that the data come from a normal distribution. Shapiro–Wilk is the usual choice for 3 to 5000 values.|La hipótesis nula de cada prueba es que los datos provienen de una distribución normal. Shapiro–Wilk es la opción habitual para 3 a 5000 valores.|A hipótese nula de cada teste é que os dados vêm de uma distribuição normal. Shapiro–Wilk é a opção usual para 3 a 5000 valores.|Hipotesis nol setiap uji menyatakan data berasal dari distribusi normal. Shapiro–Wilk adalah pilihan yang lazim untuk 3 sampai 5000 nilai.|हर परीक्षण की शून्य परिकल्पना है कि डेटा सामान्य बंटन से आया है। 3 से 5000 मानों के लिए शापिरो–विल्क सामान्य विकल्प है।|الفرضية الصفرية في كل اختبار أن البيانات تتبع توزيعًا طبيعيًا. شابيرو–ويلك هو الخيار المعتاد لعدد قيم من 3 إلى 5000.",
     "s_cmat": "{m} correlation matrix|Matriz de correlación de {m}|Matriz de correlação de {m}|Matriks korelasi {m}|{m} सहसंबंध आव्यूह|مصفوفة ارتباط {m}",
     "s_cpair": "{m} correlation by pair (CI {l}%)|Correlación de {m} por pares (IC {l}%)|Correlação de {m} por pares (IC {l}%)|Korelasi {m} per pasangan (IK {l}%)|{m} सहसंबंध जोड़ीवार (अंतराल {l}%)|ارتباط {m} لكل زوج (فترة الثقة {l}%)",
     "s_lo": "CI lower|IC inferior|IC inferior|IK bawah|अंतराल निचला|الحد الأدنى للفترة",
     "s_hi": "CI upper|IC superior|IC superior|IK atas|अंतराल ऊपरी|الحد الأعلى للفترة",
     "s_n_cor": "Pairs use all rows where both variables have values. Spearman p-values use the t approximation.|Los pares usan todas las filas con valores en ambas variables. Los valores p de Spearman usan la aproximación t.|Os pares usam todas as linhas com valores nas duas variáveis. Os valores p de Spearman usam a aproximação t.|Pasangan memakai semua baris yang kedua variabelnya berisi nilai. Nilai p Spearman memakai pendekatan t.|जोड़ी में वे सभी पंक्तियाँ ली जाती हैं जिनमें दोनों वेरिएबल के मान हैं। स्पीयरमैन p-मान t सन्निकटन से निकलते हैं।|تستخدم الأزواج كل الصفوف التي فيها قيم للمتغيرين. تعتمد قيم p لسبيرمان على تقريب t.",
     "s_md": "Mean difference|Diferencia de medias|Diferença de médias|Selisih rata-rata|माध्य अंतर|فرق المتوسطين",
     "s_n_ci": "Confidence level {l}%.|Nivel de confianza {l}%.|Nível de confiança {l}%.|Tingkat kepercayaan {l}%.|विश्वास स्तर {l}%।|مستوى الثقة {l}%.",
     "s_gdesc": "Group statistics|Estadísticos por grupo|Estatísticas por grupo|Statistik per kelompok|समूहवार सांख्यिकी|إحصاءات المجموعات",
     "s_sed": "Std. error of difference|Error estándar de la diferencia|Erro padrão da diferença|Galat baku selisih|अंतर की मानक त्रुटि|الخطأ المعياري للفرق",
     "s_test": "Test|Prueba|Teste|Uji|परीक्षण|الاختبار",
     "s_stud": "Student's t-test (equal variances)|Prueba t de Student (varianzas iguales)|Teste t de Student (variâncias iguais)|Uji-t Student (varians sama)|स्टूडेंट t-परीक्षण (समान प्रसरण)|اختبار t لستيودنت (تباينان متساويان)",
     "s_welch": "Welch's t-test (unequal variances)|Prueba t de Welch (varianzas desiguales)|Teste t de Welch (variâncias desiguais)|Uji-t Welch (varians tidak sama)|वेल्च t-परीक्षण (असमान प्रसरण)|اختبار t لويلش (تباينان غير متساويين)",
     "s_lev": "Levene's test (median-based)|Prueba de Levene (basada en la mediana)|Teste de Levene (baseado na mediana)|Uji Levene (berbasis median)|लेवेन परीक्षण (माध्यिका आधारित)|اختبار ليفين (قائم على الوسيط)",
     "s_eqv": "Equal variances (p ≥ α)|Varianzas iguales (p ≥ α)|Variâncias iguais (p ≥ α)|Varians sama (p ≥ α)|समान प्रसरण (p ≥ α)|تباينات متساوية (p ≥ α)",
     "s_neqv": "Unequal variances (p < α)|Varianzas desiguales (p < α)|Variâncias desiguais (p < α)|Varians tidak sama (p < α)|असमान प्रसरण (p < α)|تباينات غير متساوية (p < α)",
     "s_n_t2": "Use Student's row if variances are equal, otherwise Welch's row. The difference is group 1 minus group 2.|Usa la fila de Student si las varianzas son iguales; si no, la de Welch. La diferencia es grupo 1 menos grupo 2.|Use a linha de Student se as variâncias forem iguais; caso contrário, a de Welch. A diferença é grupo 1 menos grupo 2.|Pakai baris Student jika varians sama, selain itu baris Welch. Selisih = kelompok 1 dikurangi kelompok 2.|प्रसरण समान हों तो स्टूडेंट वाली पंक्ति, नहीं तो वेल्च वाली देखें। अंतर = समूह 1 − समूह 2।|استخدم صف ستيودنت إذا تساوى التباينان، وإلا فصف ويلش. الفرق = المجموعة 1 − المجموعة 2.",
     "s_pairs": "Pairs used|Pares usados|Pares usados|Pasangan dipakai|प्रयुक्त जोड़ियाँ|الأزواج المستخدمة",
     "s_mdd": "Mean of differences|Media de las diferencias|Média das diferenças|Rata-rata selisih|अंतरों का माध्य|متوسط الفروق",
     "s_sdd": "SD of differences|DE de las diferencias|DP das diferenças|SB selisih|अंतरों का मानक विचलन|الانحراف المعياري للفروق",
     "s_src": "Source|Fuente|Fonte|Sumber|स्रोत|المصدر",
     "s_btw": "Between groups|Entre grupos|Entre grupos|Antar kelompok|समूहों के बीच|بين المجموعات",
     "s_wth": "Within groups|Dentro de grupos|Dentro dos grupos|Dalam kelompok|समूहों के भीतर|داخل المجموعات",
     "s_wanova": "Welch's ANOVA (unequal variances)|ANOVA de Welch (varianzas desiguales)|ANOVA de Welch (variâncias desiguais)|ANOVA Welch (varians tidak sama)|वेल्च ANOVA (असमान प्रसरण)|تحليل التباين لويلش (تباينات غير متساوية)",
     "s_cmp": "Comparison|Comparación|Comparação|Perbandingan|तुलना|المقارنة",
     "s_diff": "Difference|Diferencia|Diferença|Selisih|अंतर|الفرق",
     "s_padj": "p (adjusted)|p (ajustado)|p (ajustado)|p (disesuaikan)|p (समायोजित)|p (المعدّل)",
     "s_e_tk": "Tukey comparisons are skipped for more than 15 groups.|Se omiten las comparaciones de Tukey con más de 15 grupos.|As comparações de Tukey são omitidas com mais de 15 grupos.|Perbandingan Tukey dilewati untuk lebih dari 15 kelompok.|15 से अधिक समूहों के लिए Tukey तुलना छोड़ दी जाती है।|تُتجاوز مقارنات Tukey عند وجود أكثر من 15 مجموعة.",
     "s_mrank": "Mean rank|Rango promedio|Posto médio|Peringkat rata-rata|औसत कोटि|متوسط الرتب",
     "s_meth": "Method|Método|Método|Metode|विधि|الطريقة",
     "s_m_ex": "Exact|Exacto|Exato|Eksak|यथार्थ|دقيق",
     "s_m_nm": "Normal approximation with continuity correction|Aproximación normal con corrección de continuidad|Aproximação normal com correção de continuidade|Pendekatan normal dengan koreksi kontinuitas|सांतत्य सुधार सहित सामान्य सन्निकटन|تقريب طبيعي مع تصحيح الاستمرارية",
     "s_rbc": "Rank-biserial r|r biserial de rangos|r bisserial de postos|r biserial peringkat|कोटि-द्विश्रेणीय r|r الثنائي للرتب",
     "s_n_mw": "W is the Mann–Whitney U of group 1. Exact p-values are used when both groups have fewer than 50 values and there are no ties.|W es la U de Mann–Whitney del grupo 1. Se usan valores p exactos si ambos grupos tienen menos de 50 valores y no hay empates.|W é a U de Mann–Whitney do grupo 1. Valores p exatos são usados quando ambos os grupos têm menos de 50 valores e não há empates.|W adalah U Mann–Whitney kelompok 1. Nilai p eksak dipakai bila kedua kelompok berisi kurang dari 50 nilai dan tidak ada nilai kembar.|W समूह 1 का मान–व्हिटनी U है। दोनों समूहों में 50 से कम मान और कोई बराबर मान न होने पर यथार्थ p-मान लिया जाता है।|W هو إحصاء مان–ويتني U للمجموعة 1. تُستخدم قيم p الدقيقة عندما تحتوي كل مجموعة على أقل من 50 قيمة دون قيم مكررة.",
     "s_nz": "Non-zero differences|Diferencias distintas de cero|Diferenças diferentes de zero|Selisih tidak nol|गैर-शून्य अंतर|الفروق غير الصفرية",
     "s_medd": "Median of differences|Mediana de las diferencias|Mediana das diferenças|Median selisih|अंतरों की माध्यिका|وسيط الفروق",
     "s_n_wx": "V is the sum of ranks of the positive differences. Zero differences are dropped. Exact p-values are used for fewer than 50 pairs without ties or zeros.|V es la suma de rangos de las diferencias positivas. Se descartan las diferencias nulas. Se usan valores p exactos con menos de 50 pares sin empates ni ceros.|V é a soma dos postos das diferenças positivas. Diferenças nulas são descartadas. Valores p exatos são usados com menos de 50 pares sem empates nem zeros.|V adalah jumlah peringkat selisih positif. Selisih nol dibuang. Nilai p eksak dipakai untuk kurang dari 50 pasangan tanpa nilai kembar atau nol.|V धनात्मक अंतरों की कोटियों का योग है। शून्य अंतर हटा दिए जाते हैं। 50 से कम जोड़ियों में, बिना बराबर मान या शून्य के, यथार्थ p-मान लिया जाता है।|V هو مجموع رتب الفروق الموجبة. تُحذف الفروق الصفرية. تُستخدم قيم p الدقيقة لأقل من 50 زوجًا دون تكرار أو أصفار.",
     "s_obs": "Observed counts|Frecuencias observadas|Frequências observadas|Frekuensi teramati|प्रेक्षित आवृत्तियाँ|التكرارات المشاهَدة",
     "s_exp": "Expected counts|Frecuencias esperadas|Frequências esperadas|Frekuensi harapan|अपेक्षित आवृत्तियाँ|التكرارات المتوقعة",
     "s_pchi": "Pearson's chi-square|Chi cuadrado de Pearson|Qui-quadrado de Pearson|Chi-kuadrat Pearson|पियर्सन काई-वर्ग|مربع كاي لبيرسون",
     "s_yates": "Yates' continuity correction (2×2)|Corrección de continuidad de Yates (2×2)|Correção de continuidade de Yates (2×2)|Koreksi kontinuitas Yates (2×2)|येट्स सांतत्य सुधार (2×2)|تصحيح الاستمرارية ليتس (2×2)",
     "s_fisher": "Fisher's exact test (2×2)|Prueba exacta de Fisher (2×2)|Teste exato de Fisher (2×2)|Uji eksak Fisher (2×2)|फ़िशर यथार्थ परीक्षण (2×2)|اختبار فيشر الدقيق (2×2)",
     "s_w5": "{p}% of the expected counts are below 5, so the chi-square result may be unreliable. For 2×2 tables use the Fisher result.|El {p}% de las frecuencias esperadas es menor que 5, por lo que el chi cuadrado puede no ser fiable. En tablas 2×2 usa el resultado de Fisher.|{p}% das frequências esperadas são menores que 5, então o qui-quadrado pode não ser confiável. Em tabelas 2×2 use o resultado de Fisher.|{p}% frekuensi harapan kurang dari 5, sehingga hasil chi-kuadrat bisa kurang andal. Pada tabel 2×2 gunakan hasil Fisher.|{p}% अपेक्षित आवृत्तियाँ 5 से कम हैं, इसलिए काई-वर्ग परिणाम अविश्वसनीय हो सकता है। 2×2 तालिका में फ़िशर परिणाम देखें।|{p}% من التكرارات المتوقعة أقل من 5، لذا قد لا يكون مربع كاي موثوقًا. في جداول 2×2 استخدم نتيجة فيشر.",
     "s_rse": "Residual std. error|Error estándar residual|Erro padrão residual|Galat baku residual|अवशिष्ट मानक त्रुटि|الخطأ المعياري للبواقي",
     "s_dfr": "Residual df|gl residuales|gl residuais|db residual|अवशिष्ट df|درجات حرية البواقي",
     "s_int": "(Intercept)|(Intercepto)|(Intercepto)|(Konstanta)|(अवरोध)|(الثابت)",
     "s_coef": "Coefficients|Coeficientes|Coeficientes|Koefisien|गुणांक|المعاملات",
     "s_term": "Term|Término|Termo|Suku|पद|الحد",
     "s_est": "Estimate|Estimación|Estimativa|Estimasi|अनुमान|التقدير",
     "s_se": "Std. error|Error estándar|Erro padrão|Galat baku|मानक त्रुटि|الخطأ المعياري",
     "s_beta": "Std. beta|Beta estandarizado|Beta padronizado|Beta terstandar|मानकीकृत बीटा|بيتا المعيارية",
     "s_e_big": "The data is too large (limit: {r} rows, {c} columns, 15 MB).|Los datos son demasiado grandes (límite: {r} filas, {c} columnas, 15 MB).|Os dados são grandes demais (limite: {r} linhas, {c} colunas, 15 MB).|Data terlalu besar (batas: {r} baris, {c} kolom, 15 MB).|डेटा बहुत बड़ा है (सीमा: {r} पंक्तियाँ, {c} कॉलम, 15 MB)।|البيانات كبيرة جدًا (الحد: {r} صف و{c} عمود و15 ميغابايت).",
     "s_e_empty": "No data found. Check the file, the first-row setting and the decimal mark.|No se encontraron datos. Revisa el archivo, la opción de primera fila y el separador decimal.|Nenhum dado encontrado. Verifique o arquivo, a opção da primeira linha e o separador decimal.|Data tidak ditemukan. Periksa berkas, pengaturan baris pertama, dan tanda desimal.|कोई डेटा नहीं मिला। फ़ाइल, पहली पंक्ति की सेटिंग और दशमलव चिह्न जाँचें।|لم يُعثر على بيانات. تحقق من الملف وإعداد الصف الأول والعلامة العشرية.",
     "s_e_fmt": "This file type is not supported. Save the sheet as .xlsx or .csv, or paste the cells.|Este tipo de archivo no es compatible. Guarda la hoja como .xlsx o .csv, o pega las celdas.|Este tipo de arquivo não é compatível. Salve a planilha como .xlsx ou .csv, ou cole as células.|Jenis berkas ini tidak didukung. Simpan lembar kerja sebagai .xlsx atau .csv, atau tempel selnya.|यह फ़ाइल प्रकार समर्थित नहीं है। शीट को .xlsx या .csv में सहेजें, या सेल पेस्ट करें।|نوع الملف هذا غير مدعوم. احفظ الورقة بصيغة .xlsx أو .csv أو الصق الخلايا.",
     "s_e_zip": "The file could not be read. It may be damaged or password-protected.|No se pudo leer el archivo. Puede estar dañado o protegido con contraseña.|Não foi possível ler o arquivo. Ele pode estar danificado ou protegido por senha.|Berkas tidak dapat dibaca. Mungkin rusak atau dilindungi kata sandi.|फ़ाइल पढ़ी नहीं जा सकी। वह क्षतिग्रस्त या पासवर्ड से सुरक्षित हो सकती है।|تعذّرت قراءة الملف. قد يكون تالفًا أو محميًا بكلمة مرور.",
     "s_e_none": "Select at least one analysis.|Selecciona al menos un análisis.|Selecione pelo menos uma análise.|Pilih setidaknya satu analisis.|कम से कम एक विश्लेषण चुनें।|اختر تحليلًا واحدًا على الأقل.",
     "s_e_vars": "Select valid variables of the right type for this analysis.|Selecciona variables válidas del tipo correcto para este análisis.|Selecione variáveis válidas do tipo certo para esta análise.|Pilih variabel yang valid dengan tipe yang sesuai untuk analisis ini.|इस विश्लेषण के लिए सही प्रकार के मान्य वेरिएबल चुनें।|اختر متغيرات صالحة من النوع المناسب لهذا التحليل.",
     "s_e_stats": "Tick at least one statistic to show.|Marca al menos un estadístico.|Marque pelo menos uma estatística.|Centang setidaknya satu statistik.|कम से कम एक सांख्यिकी चुनें।|حدّد إحصائية واحدة على الأقل.",
     "s_e_two": "Select at least two numeric variables.|Selecciona al menos dos variables numéricas.|Selecione pelo menos duas variáveis numéricas.|Pilih setidaknya dua variabel numerik.|कम से कम दो संख्यात्मक वेरिएबल चुनें।|اختر متغيرين رقميين على الأقل.",
     "s_e_mu": "The test value must be a number.|El valor de prueba debe ser un número.|O valor de teste deve ser um número.|Nilai uji harus berupa angka.|परीक्षण मान एक संख्या होना चाहिए।|يجب أن تكون القيمة المختبَرة رقمًا.",
     "s_e_need": "Not enough valid data for this analysis.|No hay datos válidos suficientes para este análisis.|Não há dados válidos suficientes para esta análise.|Data valid tidak cukup untuk analisis ini.|इस विश्लेषण के लिए पर्याप्त मान्य डेटा नहीं है।|لا توجد بيانات صالحة كافية لهذا التحليل.",
     "s_e_grp": "Choose two different groups that both contain data.|Elige dos grupos distintos que contengan datos.|Escolha dois grupos diferentes que contenham dados.|Pilih dua kelompok berbeda yang sama-sama berisi data.|दो अलग समूह चुनें जिनमें डेटा हो।|اختر مجموعتين مختلفتين تحتويان على بيانات.",
     "s_e_grp2": "The grouping variable needs at least two categories with data.|La variable de agrupación necesita al menos dos categorías con datos.|A variável de agrupamento precisa de pelo menos duas categorias com dados.|Variabel pengelompok membutuhkan setidaknya dua kategori yang berisi data.|समूह वेरिएबल में डेटा वाली कम से कम दो श्रेणियाँ होनी चाहिए।|يحتاج متغير التجميع إلى فئتين على الأقل تحتويان على بيانات.",
     "s_e_lv": "Too many categories for this analysis.|Demasiadas categorías para este análisis.|Categorias demais para esta análise.|Terlalu banyak kategori untuk analisis ini.|इस विश्लेषण के लिए श्रेणियाँ बहुत अधिक हैं।|عدد الفئات كبير جدًا لهذا التحليل.",
     "s_e_sing": "The predictors are perfectly correlated, so the regression cannot be computed. Remove one of them.|Los predictores están perfectamente correlacionados y la regresión no se puede calcular. Quita uno.|Os preditores são perfeitamente correlacionados e a regressão não pode ser calculada. Remova um deles.|Prediktor berkorelasi sempurna sehingga regresi tidak dapat dihitung. Hapus salah satunya.|पूर्वसूचक पूरी तरह सहसंबद्ध हैं, इसलिए समाश्रयण नहीं निकल सकता। उनमें से एक हटाएँ।|المتغيرات المستقلة مترابطة تمامًا ولا يمكن حساب الانحدار. احذف أحدها.",
     "s_e_fail": "This analysis could not be completed with the selected data.|No se pudo completar este análisis con los datos seleccionados.|Não foi possível concluir esta análise com os dados selecionados.|Analisis ini tidak dapat diselesaikan dengan data yang dipilih.|चुने गए डेटा से यह विश्लेषण पूरा नहीं हो सका।|تعذّر إكمال هذا التحليل بالبيانات المحددة.",
     "s_n_lf": "Lilliefors p-values are approximate; '> 0.1' means the p-value is above 0.1.|Los valores p de Lilliefors son aproximados; '> 0.1' significa que el valor p es mayor que 0.1.|Os valores p de Lilliefors são aproximados; '> 0.1' significa que o valor p é maior que 0.1.|Nilai p Lilliefors bersifat pendekatan; '> 0.1' berarti nilai p di atas 0,1.|लिलीफ़ोर्स p-मान सन्निकट हैं; '> 0.1' का अर्थ है कि p-मान 0.1 से ऊपर है।|قيم p لليليفورز تقريبية؛ تعني '> 0.1' أن قيمة p أكبر من 0.1.",
     "s_n_rows": "Only rows where every selected variable has a value are used.|Solo se usan las filas en las que todas las variables elegidas tienen valor.|Apenas as linhas em que todas as variáveis escolhidas têm valor são usadas.|Hanya baris yang semua variabel terpilihnya berisi nilai yang dipakai.|केवल वे पंक्तियाँ ली जाती हैं जिनमें चुने गए सभी वेरिएबल के मान हैं।|تُستخدم فقط الصفوف التي فيها قيم لكل المتغيرات المختارة.",
     "s_n_t3": "Type III sums of squares with sum-to-zero coding. With unequal group sizes the results can differ from other types.|Sumas de cuadrados de tipo III con codificación de suma cero. Con tamaños de grupo desiguales, los resultados pueden diferir de otros tipos.|Somas de quadrados do tipo III com codificação de soma zero. Com tamanhos de grupo desiguais, os resultados podem diferir de outros tipos.|Jumlah kuadrat tipe III dengan pengkodean jumlah-nol. Jika ukuran kelompok tidak sama, hasilnya bisa berbeda dari tipe lain.|प्रकार III वर्ग-योग, योग-शून्य कोडिंग के साथ। समूहों के आकार असमान होने पर परिणाम अन्य प्रकारों से भिन्न हो सकते हैं।|مجاميع مربعات من النوع III بترميز مجموعه صفر. عند اختلاف أحجام المجموعات قد تختلف النتائج عن الأنواع الأخرى.",
     "s_n_binom": "Exact binomial test; the confidence interval is the exact (Clopper–Pearson) interval at {l}%.|Prueba binomial exacta; el intervalo de confianza es el exacto (Clopper–Pearson) al {l}%.|Teste binomial exato; o intervalo de confiança é o exato (Clopper–Pearson) a {l}%.|Uji binomial eksak; interval kepercayaannya adalah interval eksak (Clopper–Pearson) pada {l}%.|यथार्थ द्विपद परीक्षण; विश्वास अंतराल {l}% पर यथार्थ (क्लॉपर–पियर्सन) अंतराल है।|اختبار ثنائي الحد دقيق؛ فترة الثقة هي الفترة الدقيقة (كلوبر–بيرسون) عند {l}%.",
     "s_a_hom": "Homogeneity of variances|Homogeneidad de varianzas|Homogeneidade de variâncias|Homogenitas varians|प्रसरणों की समरूपता|تجانس التباينات",
     "s_a_aov2": "Two-way ANOVA|ANOVA de dos factores|ANOVA de dois fatores|ANOVA dua arah|द्वि-तरफ़ा ANOVA|تحليل التباين ثنائي الاتجاه",
     "s_a_fried": "Friedman test|Prueba de Friedman|Teste de Friedman|Uji Friedman|फ्रीडमैन परीक्षण|اختبار فريدمان",
     "s_a_gof": "Chi-square goodness of fit|Bondad de ajuste chi cuadrado|Aderência qui-quadrado|Uji kesesuaian chi-kuadrat|काई-वर्ग सुसंगतता परीक्षण|اختبار حسن المطابقة بمربع كاي",
     "s_a_binom": "Binomial (proportion) test|Prueba binomial (proporción)|Teste binomial (proporção)|Uji binomial (proporsi)|द्विपद (अनुपात) परीक्षण|اختبار ثنائي الحد (النسبة)",
     "s_a_logit": "Binary logistic regression|Regresión logística binaria|Regressão logística binária|Regresi logistik biner|द्विआधारी लॉजिस्टिक समाश्रयण|الانحدار اللوجستي الثنائي",
     "s_a_alpha": "Reliability (Cronbach's alpha)|Fiabilidad (alfa de Cronbach)|Confiabilidade (alfa de Cronbach)|Reliabilitas (alfa Cronbach)|विश्वसनीयता (क्रोनबाख अल्फ़ा)|الثبات (ألفا كرونباخ)",
     "s_by": "Split by (optional)|Dividir por (opcional)|Dividir por (opcional)|Pisahkan menurut (opsional)|इसके अनुसार बाँटें (वैकल्पिक)|التقسيم حسب (اختياري)",
     "s_pct_in": "Custom percentiles (0–100, e.g. 5, 95)|Percentiles personalizados (0–100, p. ej. 5, 95)|Percentis personalizados (0–100, ex.: 5, 95)|Persentil kustom (0–100, mis. 5, 95)|कस्टम शतमक (0–100, जैसे 5, 95)|نسب مئوية مخصصة (0–100، مثل 5، 95)",
     "s_gmean": "Geometric mean|Media geométrica|Média geométrica|Rata-rata geometrik|गुणोत्तर माध्य|المتوسط الهندسي",
     "s_hmean": "Harmonic mean|Media armónica|Média harmônica|Rata-rata harmonik|हरात्मक माध्य|المتوسط التوافقي",
     "s_tmean": "5% trimmed mean|Media recortada al 5%|Média aparada a 5%|Rata-rata terpangkas 5%|5% छँटा हुआ माध्य|المتوسط المشذَّب 5%",
     "s_mad": "Median absolute deviation (MAD)|Desviación absoluta mediana (MAD)|Desvio absoluto mediano (MAD)|Simpangan median mutlak (MAD)|माध्यिका निरपेक्ष विचलन (MAD)|الانحراف المطلق الوسيط (MAD)",
     "s_sess": "Std. error of skewness|Error estándar de la asimetría|Erro padrão da assimetria|Galat baku skewness|विषमता की मानक त्रुटि|الخطأ المعياري للالتواء",
     "s_sek": "Std. error of kurtosis|Error estándar de la curtosis|Erro padrão da curtose|Galat baku kurtosis|कर्टोसिस की मानक त्रुटि|الخطأ المعياري للتفلطح",
     "s_outl": "Outliers (beyond 1.5 × IQR)|Valores atípicos (más de 1,5 × IQR)|Valores atípicos (além de 1,5 × IQR)|Pencilan (lebih dari 1,5 × IQR)|बाह्य मान (1.5 × IQR से अधिक)|القيم الشاذة (أكثر من 1.5 × IQR)",
     "s_ssq": "Sum of squares (Σx²)|Suma de cuadrados (Σx²)|Soma dos quadrados (Σx²)|Jumlah kuadrat (Σx²)|वर्गों का योग (Σx²)|مجموع المربعات (Σx²)",
     "s_t_sw": "Shapiro–Wilk|Shapiro–Wilk|Shapiro–Wilk|Shapiro–Wilk|शापिरो–विल्क|شابيرو–ويلك",
     "s_t_ad": "Anderson–Darling|Anderson–Darling|Anderson–Darling|Anderson–Darling|एंडरसन–डार्लिंग|أندرسون–دارلينغ",
     "s_t_lf": "Lilliefors (Kolmogorov–Smirnov)|Lilliefors (Kolmogorov–Smirnov)|Lilliefors (Kolmogorov–Smirnov)|Lilliefors (Kolmogorov–Smirnov)|लिलीफ़ोर्स (कोलमोगोरोव–स्मिरनोव)|ليليفورز (كولموغوروف–سميرنوف)",
     "s_t_jb": "Jarque–Bera|Jarque–Bera|Jarque–Bera|Jarque–Bera|जार्क–बेरा|جارك–بيرا",
     "s_levm": "Levene's test (mean-based)|Prueba de Levene (basada en la media)|Teste de Levene (baseado na média)|Uji Levene (berbasis rata-rata)|लेवेन परीक्षण (माध्य आधारित)|اختبار ليفين (قائم على المتوسط)",
     "s_bart": "Bartlett's test|Prueba de Bartlett|Teste de Bartlett|Uji Bartlett|बार्टलेट परीक्षण|اختبار بارتليت",
     "s_fa": "Factor A|Factor A|Fator A|Faktor A|कारक A|العامل A",
     "s_fb": "Factor B|Factor B|Fator B|Faktor B|कारक B|العامل B",
     "s_inter": "Include the interaction (A × B)|Incluir la interacción (A × B)|Incluir a interação (A × B)|Sertakan interaksi (A × B)|अंतःक्रिया (A × B) शामिल करें|تضمين التفاعل (A × B)",
     "s_cells": "Cell statistics|Estadísticos por celda|Estatísticas por célula|Statistik per sel|सेलवार सांख्यिकी|إحصاءات الخلايا",
     "s_err": "Error|Error|Erro|Galat|त्रुटि|الخطأ",
     "s_cat": "Category variable|Variable categórica|Variável categórica|Variabel kategori|श्रेणी वेरिएबल|المتغير الفئوي",
     "s_props": "Expected proportions (optional, e.g. 1:2:1; default equal)|Proporciones esperadas (opcional, p. ej. 1:2:1; por defecto iguales)|Proporções esperadas (opcional, ex.: 1:2:1; padrão iguais)|Proporsi harapan (opsional, mis. 1:2:1; bawaan sama)|अपेक्षित अनुपात (वैकल्पिक, जैसे 1:2:1; डिफ़ॉल्ट समान)|النسب المتوقعة (اختياري، مثل 1:2:1؛ الافتراضي متساوية)",
     "s_resid": "Residual|Residuo|Resíduo|Residual|अवशिष्ट|الباقي",
     "s_sresid": "Std. residual|Residuo estandarizado|Resíduo padronizado|Residual terstandar|मानकीकृत अवशिष्ट|الباقي المعياري",
     "s_succ": "Success category|Categoría de éxito|Categoria de sucesso|Kategori sukses|सफलता श्रेणी|فئة النجاح",
     "s_p0": "Hypothesized proportion p₀|Proporción hipotética p₀|Proporção hipotética p₀|Proporsi hipotesis p₀|परिकल्पित अनुपात p₀|النسبة المفترضة p₀",
     "s_prop": "Sample proportion|Proporción muestral|Proporção amostral|Proporsi sampel|प्रतिदर्श अनुपात|نسبة العينة",
     "s_succn": "Successes|Éxitos|Sucessos|Jumlah sukses|सफलताएँ|عدد النجاحات",
     "s_dv2": "Outcome variable (2 categories)|Variable resultado (2 categorías)|Variável de resultado (2 categorias)|Variabel hasil (2 kategori)|परिणाम वेरिएबल (2 श्रेणियाँ)|متغير النتيجة (فئتان)",
     "s_evt": "Event category (the one being modelled)|Categoría del evento (la que se modela)|Categoria do evento (a que é modelada)|Kategori kejadian (yang dimodelkan)|घटना श्रेणी (जिसका मॉडल बन रहा है)|فئة الحدث (المُنمذجة)",
     "s_evtn": "Events|Eventos|Eventos|Jumlah kejadian|घटनाएँ|عدد الأحداث",
     "s_dev": "Deviance (−2 log-likelihood)|Devianza (−2 log-verosimilitud)|Deviância (−2 log-verossimilhança)|Devians (−2 log-likelihood)|डेविएन्स (−2 लॉग-संभाविता)|الانحراف (−2 لوغاريتم الإمكان)",
     "s_dev0": "Null deviance|Devianza nula|Deviância nula|Devians nol|शून्य डेविएन्स|الانحراف الصفري",
     "s_lrchi": "Likelihood-ratio χ²|χ² de razón de verosimilitud|χ² da razão de verossimilhança|χ² rasio likelihood|संभाविता-अनुपात χ²|مربع كاي لنسبة الإمكان",
     "s_mcf": "McFadden R²|R² de McFadden|R² de McFadden|R² McFadden|मैकफैडेन R²|R² لماكفادن",
     "s_cs": "Cox & Snell R²|R² de Cox y Snell|R² de Cox e Snell|R² Cox & Snell|कॉक्स और स्नेल R²|R² لكوكس وسنيل",
     "s_nag": "Nagelkerke R²|R² de Nagelkerke|R² de Nagelkerke|R² Nagelkerke|नागेलकर्के R²|R² لناجلكيرك",
     "s_acc": "Overall accuracy (%)|Exactitud global (%)|Acurácia geral (%)|Akurasi keseluruhan (%)|कुल सटीकता (%)|الدقة الكلية (%)",
     "s_or": "Odds ratio|Razón de momios (odds ratio)|Razão de chances (odds ratio)|Rasio odds|ऑड्स अनुपात|نسبة الأرجحية",
     "s_orlo": "OR CI lower|IC inferior de OR|IC inferior da OR|IK bawah OR|OR अंतराल निचला|الحد الأدنى لفترة OR",
     "s_orhi": "OR CI upper|IC superior de OR|IC superior da OR|IK atas OR|OR अंतराल ऊपरी|الحد الأعلى لفترة OR",
     "s_class": "Classification table (cut-off 0.5)|Tabla de clasificación (punto de corte 0.5)|Tabela de classificação (ponto de corte 0,5)|Tabel klasifikasi (titik potong 0,5)|वर्गीकरण तालिका (कट-ऑफ 0.5)|جدول التصنيف (نقطة القطع 0.5)",
     "s_obsp": "Observed \\ Predicted|Observado \\ Predicho|Observado \\ Previsto|Teramati \\ Prediksi|प्रेक्षित \\ पूर्वानुमानित|المشاهَد \\ المتوقَّع",
     "s_pcor": "% correct|% correcto|% correto|% benar|% सही|% الصحيح",
     "s_items": "Items (numeric variables)|Ítems (variables numéricas)|Itens (variáveis numéricas)|Butir (variabel numerik)|आइटम (संख्यात्मक वेरिएबल)|العناصر (متغيرات رقمية)",
     "s_item": "Item|Ítem|Item|Butir|आइटम|العنصر",
     "s_alpha_t": "Cronbach's alpha|Alfa de Cronbach|Alfa de Cronbach|Alfa Cronbach|क्रोनबाख अल्फ़ा|ألفا كرونباخ",
     "s_alpha_std": "Standardized alpha|Alfa estandarizado|Alfa padronizado|Alfa terstandar|मानकीकृत अल्फ़ा|ألفا المعيارية",
     "s_rbar": "Mean inter-item correlation|Correlación media entre ítems|Correlação média entre itens|Rata-rata korelasi antarbutir|आइटमों के बीच औसत सहसंबंध|متوسط الارتباط بين العناصر",
     "s_nitems": "Number of items|Número de ítems|Número de itens|Jumlah butir|आइटमों की संख्या|عدد العناصر",
     "s_ncases": "Cases used|Casos usados|Casos usados|Kasus dipakai|प्रयुक्त प्रकरण|الحالات المستخدمة",
     "s_ritem": "Corrected item–total r|r ítem-total corregida|r item-total corrigida|r butir-total terkoreksi|संशोधित आइटम–कुल r|r المصحَّح بين العنصر والمجموع",
     "s_adel": "Alpha if item deleted|Alfa si se elimina el ítem|Alfa se o item for excluído|Alfa jika butir dihapus|आइटम हटाने पर अल्फ़ा|ألفا عند حذف العنصر",
     "s_pctrow": "Row percentages (%)|Porcentajes por fila (%)|Porcentagens por linha (%)|Persentase baris (%)|पंक्ति प्रतिशत (%)|النسب المئوية للصفوف (%)",
     "s_pctcol": "Column percentages (%)|Porcentajes por columna (%)|Porcentagens por coluna (%)|Persentase kolom (%)|कॉलम प्रतिशत (%)|النسب المئوية للأعمدة (%)",
     "s_showpct": "Show row and column percentages|Mostrar porcentajes por fila y columna|Mostrar porcentagens por linha e coluna|Tampilkan persentase baris dan kolom|पंक्ति और कॉलम प्रतिशत दिखाएँ|عرض النسب المئوية للصفوف والأعمدة",
     "s_e_bin": "The outcome variable needs exactly two categories with data.|La variable resultado necesita exactamente dos categorías con datos.|A variável de resultado precisa de exatamente duas categorias com dados.|Variabel hasil harus memiliki tepat dua kategori yang berisi data.|परिणाम वेरिएबल में डेटा वाली ठीक दो श्रेणियाँ होनी चाहिए।|يجب أن يحتوي متغير النتيجة على فئتين بالضبط تحتويان على بيانات.",
     "s_e_cells": "Some combinations of the two factors have no data. Turn off the interaction.|Algunas combinaciones de los dos factores no tienen datos. Desactiva la interacción.|Algumas combinações dos dois fatores não têm dados. Desative a interação.|Beberapa kombinasi kedua faktor tidak memiliki data. Matikan interaksi.|दोनों कारकों के कुछ संयोजनों में डेटा नहीं है। अंतःक्रिया बंद करें।|بعض تركيبات العاملين لا تحتوي على بيانات. أوقف التفاعل.",
     "s_e_conv": "The model did not converge.|El modelo no convergió.|O modelo não convergiu.|Model tidak konvergen.|मॉडल अभिसरित नहीं हुआ।|لم يتقارب النموذج.",
     "s_e_p0": "The hypothesized proportion must be between 0 and 1.|La proporción hipotética debe estar entre 0 y 1.|A proporção hipotética deve estar entre 0 e 1.|Proporsi hipotesis harus di antara 0 dan 1.|परिकल्पित अनुपात 0 और 1 के बीच होना चाहिए।|يجب أن تكون النسبة المفترضة بين 0 و1.",
     "s_e_prop": "Enter one positive number per category, for example 1:2:1.|Introduce un número positivo por categoría, por ejemplo 1:2:1.|Informe um número positivo por categoria, por exemplo 1:2:1.|Masukkan satu angka positif per kategori, misalnya 1:2:1.|हर श्रेणी के लिए एक धनात्मक संख्या दें, जैसे 1:2:1।|أدخل رقمًا موجبًا لكل فئة، مثل 1:2:1.",
     "s_e_sep": "Some estimates are very large; the groups may be perfectly separated, so the results may be unreliable.|Algunas estimaciones son muy grandes; los grupos pueden estar perfectamente separados y los resultados no ser fiables.|Algumas estimativas são muito grandes; os grupos podem estar perfeitamente separados e os resultados podem não ser confiáveis.|Beberapa estimasi sangat besar; kelompok mungkin terpisah sempurna sehingga hasilnya bisa tidak andal.|कुछ अनुमान बहुत बड़े हैं; समूह पूरी तरह अलग हो सकते हैं, इसलिए परिणाम अविश्वसनीय हो सकते हैं।|بعض التقديرات كبيرة جدًا؛ قد تكون المجموعات منفصلة تمامًا وقد لا تكون النتائج موثوقة.",
     "s_c_sec": "Charts (tick the ones you want)|Gráficos (marca los que quieras)|Gráficos (marque os que deseja)|Grafik (centang yang diinginkan)|चार्ट (जो चाहिए उन पर निशान लगाएँ)|المخططات (حدّد ما تريد)",
     "s_c_bar": "Bar chart|Gráfico de barras|Gráfico de barras|Diagram batang|बार चार्ट|مخطط أعمدة",
     "s_c_hist": "Histogram|Histograma|Histograma|Histogram|हिस्टोग्राम|مدرج تكراري",
     "s_c_box": "Box plot|Diagrama de caja|Diagrama de caixa (boxplot)|Diagram kotak (box plot)|बॉक्स प्लॉट|مخطط صندوقي",
     "s_c_scat": "Scatter plot|Diagrama de dispersión|Diagrama de dispersão|Diagram pencar (scatter plot)|प्रकीर्ण आलेख|مخطط التشتت",
     "s_c_line": "Line chart|Gráfico de líneas|Gráfico de linhas|Diagram garis|रेखा चार्ट|مخطط خطي",
     "s_c_pie": "Pie chart|Gráfico circular|Gráfico de pizza|Diagram lingkaran|पाई चार्ट|مخطط دائري",
     "s_c_qq": "Normal Q–Q plot|Gráfico Q–Q normal|Gráfico Q–Q normal|Plot Q–Q normal|सामान्य Q–Q आलेख|مخطط Q–Q الطبيعي",
     "s_c_heat": "Correlation heat map|Mapa de calor de correlaciones|Mapa de calor de correlações|Peta panas korelasi|सहसंबंध हीट मैप|خريطة حرارية للارتباط",
     "s_c_val": "Bar height shows|La altura de la barra muestra|A altura da barra mostra|Tinggi batang menunjukkan|बार की ऊँचाई दिखाती है|يعرض ارتفاع العمود",
     "s_c_ynum": "Numeric variable (for mean, median, sum)|Variable numérica (para media, mediana, suma)|Variável numérica (para média, mediana, soma)|Variabel numerik (untuk rata-rata, median, jumlah)|संख्यात्मक वेरिएबल (माध्य, माध्यिका, योग के लिए)|المتغير الرقمي (للمتوسط والوسيط والمجموع)",
     "s_c_err": "Error bars (for the mean)|Barras de error (para la media)|Barras de erro (para a média)|Batang galat (untuk rata-rata)|त्रुटि पट्टियाँ (माध्य के लिए)|أشرطة الخطأ (للمتوسط)",
     "s_c_no": "None|Ninguna|Nenhuma|Tidak ada|कोई नहीं|بدون",
     "s_c_se": "Standard error|Error estándar|Erro padrão|Galat baku|मानक त्रुटि|الخطأ المعياري",
     "s_c_sd": "Standard deviation|Desviación estándar|Desvio padrão|Simpangan baku|मानक विचलन|الانحراف المعياري",
     "s_c_ci": "Confidence interval|Intervalo de confianza|Intervalo de confiança|Interval kepercayaan|विश्वास अंतराल|فترة الثقة",
     "s_c_by": "Second category (optional)|Segunda categoría (opcional)|Segunda categoria (opcional)|Kategori kedua (opsional)|दूसरी श्रेणी (वैकल्पिक)|فئة ثانية (اختياري)",
     "s_c_none": "(none)|(ninguna)|(nenhuma)|(tidak ada)|(कोई नहीं)|(بدون)",
     "s_c_stack": "Stacked bars|Barras apiladas|Barras empilhadas|Batang bertumpuk|स्टैक्ड बार|أعمدة مكدسة",
     "s_c_pc": "Percent (%)|Porcentaje (%)|Porcentagem (%)|Persen (%)|प्रतिशत (%)|النسبة المئوية (%)",
     "s_c_errn": "Error bars: {e}|Barras de error: {e}|Barras de erro: {e}|Batang galat: {e}|त्रुटि पट्टियाँ: {e}|أشرطة الخطأ: {e}",
     "s_c_bins": "Rule for the number of bins|Regla para el número de intervalos|Regra para o número de classes|Aturan jumlah kelas (bin)|बिन की संख्या का नियम|قاعدة عدد الفئات",
     "s_c_nb": "Custom number of bins (optional)|Número personalizado de intervalos (opcional)|Número personalizado de classes (opcional)|Jumlah kelas (bin) kustom (opsional)|बिन की कस्टम संख्या (वैकल्पिक)|عدد فئات مخصص (اختياري)",
     "s_c_dens": "Show density with a normal curve|Mostrar densidad con curva normal|Mostrar densidade com curva normal|Tampilkan densitas dengan kurva normal|सामान्य वक्र के साथ घनत्व दिखाएँ|عرض الكثافة مع منحنى طبيعي",
     "s_c_dsty": "Density|Densidad|Densidade|Densitas|घनत्व|الكثافة",
     "s_c_group": "Group (optional)|Grupo (opcional)|Grupo (opcional)|Kelompok (opsional)|समूह (वैकल्पिक)|المجموعة (اختياري)",
     "s_c_x": "X axis|Eje X|Eixo X|Sumbu X|X अक्ष|المحور X",
     "s_c_y": "Y axis|Eje Y|Eixo Y|Sumbu Y|Y अक्ष|المحور Y",
     "s_c_fit": "Add a straight trend line|Añadir una línea de tendencia recta|Adicionar uma linha de tendência reta|Tambahkan garis tren lurus|सीधी प्रवृत्ति रेखा जोड़ें|إضافة خط اتجاه مستقيم",
     "s_c_series": "Variables (one line each)|Variables (una línea cada una)|Variáveis (uma linha cada)|Variabel (satu garis masing-masing)|वेरिएबल (प्रत्येक की एक रेखा)|المتغيرات (خط لكل متغير)",
     "s_c_row": "Row number|Número de fila|Número da linha|Nomor baris|पंक्ति संख्या|رقم الصف",
     "s_c_tq": "Theoretical quantiles|Cuantiles teóricos|Quantis teóricos|Kuantil teoretis|सैद्धांतिक चतुर्थक|المئينات النظرية",
     "s_c_sq": "Sample quantiles|Cuantiles muestrales|Quantis amostrais|Kuantil sampel|प्रतिदर्श चतुर्थक|المئينات العينية",
     "s_c_other": "Other|Otros|Outros|Lainnya|अन्य|أخرى",
     "s_c_t_cnt": "Frequency of {v}|Frecuencia de {v}|Frequência de {v}|Frekuensi {v}|{v} की आवृत्ति|تكرار {v}",
     "s_c_t_pct": "Percent of {v}|Porcentaje de {v}|Porcentagem de {v}|Persentase {v}|{v} का प्रतिशत|نسبة {v}",
     "s_c_t_stat": "{s} of {y} by {v}|{s} de {y} por {v}|{s} de {y} por {v}|{s} {y} menurut {v}|{v} के अनुसार {y} का {s}|{s} لـ {y} حسب {v}",
     "s_c_t_hist": "Histogram of {v}|Histograma de {v}|Histograma de {v}|Histogram {v}|{v} का हिस्टोग्राम|مدرج تكراري لـ {v}",
     "s_c_t_by": "{y} by {g}|{y} por {g}|{y} por {g}|{y} menurut {g}|{g} के अनुसार {y}|{y} حسب {g}",
     "s_c_t_vs": "{y} vs {x}|{y} frente a {x}|{y} versus {x}|{y} terhadap {x}|{x} के सापेक्ष {y}|{y} مقابل {x}",
     "s_c_t_qq": "Normal Q–Q plot: {v}|Gráfico Q–Q normal: {v}|Gráfico Q–Q normal: {v}|Plot Q–Q normal: {v}|सामान्य Q–Q आलेख: {v}|مخطط Q–Q الطبيعي: {v}",
     "s_c_dsvg": "Download SVG|Descargar SVG|Baixar SVG|Unduh SVG|SVG डाउनलोड करें|تنزيل SVG",
     "s_c_dpng": "Download PNG|Descargar PNG|Baixar PNG|Unduh PNG|PNG डाउनलोड करें|تنزيل PNG"
    },
    "script": "stats.js"
   }
  ]
 }
];
