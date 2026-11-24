'use strict';
/* Legal pages in every site language. Returns { [lang]: { about, privacy, terms, contact } } as HTML. */
module.exports = ({ MAIL, DAY }) => {
  const m = `<a href="mailto:${MAIL}">${MAIL}</a>`;
  const a = (u, s) => `<a href="${u}" rel="noopener">${s}</a>`;
  const sec = list => list.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join('');
  const paras = list => list.map(p => `<p>${p}</p>`).join('');

  const D = {
    en: {
      about: [
        `Celverter is a small collection of free tools for everyday work: text utilities, cryptography tools, converters, calculators and file converters. Every tool runs in your browser, so your text and files stay on your device.`,
        `We add tools one at a time and check them against known examples. Results are provided for convenience; for financial, medical, legal or security decisions, please consult a qualified professional.`],
      updated: 'Last updated',
      privacy: [
        ['What we process', `The tools run inside your browser. The text, numbers, passwords and files you enter are not sent to our servers and are not stored by us.`],
        ['Server logs', `Our hosting provider may keep standard server logs (such as IP address, browser type and requested page) for security and troubleshooting.`],
        ['Data on your device', `When you choose a language we save that choice in your browser's local storage (key "lg") so the site can open in your language next time. You can clear it in your browser settings.`],
        ['Children', `Celverter is not directed at children under 13.`],
        ['Contact', `Questions about this policy: ${m}.`]],
      terms: [
        ['Use of the service', `Celverter is provided free of charge and "as is", without warranties of any kind. You are responsible for how you use the results.`],
        ['No professional advice', `Calculators give estimates for information only. They are not financial, medical or legal advice.`],
        ['Security tools', `Encryption, hashing and password tools run on your device. Classical ciphers such as Caesar, Vigenère and Atbash are for learning only. We cannot recover a lost password or decrypt your text, and you are responsible for keeping your passwords safe.`],
        ['Acceptable use', `Do not use the site to break the law, to attack or overload it, or to process content you have no right to use.`],
        ['Liability', `To the extent permitted by law, we are not liable for losses arising from use of the site or from errors in its results.`],
        ['Changes', `We may change the tools or these terms. Continued use means you accept the updated terms.`]],
      contact: `For questions, bug reports or tool suggestions, write to ${m}. We read every message but cannot promise a reply time.`
    },
    es: {
      about: [
        `Celverter es una pequeña colección de herramientas gratuitas para el trabajo diario: utilidades de texto, herramientas de criptografía, conversores, calculadoras y conversores de archivos. Todas las herramientas se ejecutan en tu navegador, así que tu texto y tus archivos permanecen en tu dispositivo.`,
        `Añadimos las herramientas una a una y las comprobamos con ejemplos conocidos. Los resultados se ofrecen para tu comodidad; para decisiones financieras, médicas, legales o de seguridad, consulta a un profesional cualificado.`],
      updated: 'Última actualización',
      privacy: [
        ['Qué tratamos', `Las herramientas se ejecutan dentro de tu navegador. El texto, los números, las contraseñas y los archivos que introduces no se envían a nuestros servidores ni los almacenamos.`],
        ['Registros del servidor', `Nuestro proveedor de alojamiento puede conservar registros estándar del servidor (como la dirección IP, el tipo de navegador y la página solicitada) por seguridad y para resolver problemas.`],
        ['Datos en tu dispositivo', `Cuando eliges un idioma, guardamos esa elección en el almacenamiento local de tu navegador (clave "lg") para que el sitio se abra en tu idioma la próxima vez. Puedes borrarla en los ajustes del navegador.`],
        ['Menores', `Celverter no está dirigido a menores de 13 años.`],
        ['Contacto', `Preguntas sobre esta política: ${m}.`]],
      terms: [
        ['Uso del servicio', `Celverter se ofrece gratis y "tal cual", sin garantías de ningún tipo. Eres responsable del uso que hagas de los resultados.`],
        ['Sin asesoramiento profesional', `Las calculadoras ofrecen estimaciones solo a título informativo. No constituyen asesoramiento financiero, médico ni legal.`],
        ['Herramientas de seguridad', `Las herramientas de cifrado, hash y contraseñas se ejecutan en tu dispositivo. Los cifrados clásicos como César, Vigenère y Atbash son solo para aprender. No podemos recuperar una contraseña perdida ni descifrar tu texto, y eres responsable de mantener seguras tus contraseñas.`],
        ['Uso aceptable', `No uses el sitio para infringir la ley, para atacarlo o sobrecargarlo, ni para procesar contenido que no tienes derecho a usar.`],
        ['Responsabilidad', `En la medida permitida por la ley, no somos responsables de las pérdidas derivadas del uso del sitio ni de errores en sus resultados.`],
        ['Cambios', `Podemos modificar las herramientas o estos términos. Seguir usando el sitio implica aceptar los términos actualizados.`]],
      contact: `Para preguntas, informes de errores o sugerencias de herramientas, escribe a ${m}. Leemos todos los mensajes, pero no podemos prometer un plazo de respuesta.`
    },
    pt: {
      about: [
        `O Celverter é uma pequena coleção de ferramentas gratuitas para o trabalho do dia a dia: utilitários de texto, ferramentas de criptografia, conversores, calculadoras e conversores de arquivos. Todas as ferramentas são executadas no seu navegador, então seu texto e seus arquivos permanecem no seu dispositivo.`,
        `Adicionamos as ferramentas uma a uma e as verificamos com exemplos conhecidos. Os resultados são fornecidos por conveniência; para decisões financeiras, médicas, jurídicas ou de segurança, consulte um profissional qualificado.`],
      updated: 'Última atualização',
      privacy: [
        ['O que processamos', `As ferramentas são executadas dentro do seu navegador. O texto, os números, as senhas e os arquivos que você informa não são enviados aos nossos servidores nem armazenados por nós.`],
        ['Registros do servidor', `Nosso provedor de hospedagem pode manter registros padrão do servidor (como endereço IP, tipo de navegador e página solicitada) para segurança e solução de problemas.`],
        ['Dados no seu dispositivo', `Quando você escolhe um idioma, salvamos essa escolha no armazenamento local do navegador (chave "lg") para que o site abra no seu idioma da próxima vez. Você pode apagá-la nas configurações do navegador.`],
        ['Crianças', `O Celverter não é direcionado a crianças menores de 13 anos.`],
        ['Contato', `Dúvidas sobre esta política: ${m}.`]],
      terms: [
        ['Uso do serviço', `O Celverter é oferecido gratuitamente e "como está", sem garantias de qualquer tipo. Você é responsável pelo uso que faz dos resultados.`],
        ['Sem aconselhamento profissional', `As calculadoras fornecem estimativas apenas para fins informativos. Não constituem aconselhamento financeiro, médico ou jurídico.`],
        ['Ferramentas de segurança', `As ferramentas de criptografia, hash e senhas são executadas no seu dispositivo. Cifras clássicas como César, Vigenère e Atbash servem apenas para aprendizado. Não podemos recuperar uma senha perdida nem descriptografar seu texto, e você é responsável por manter suas senhas em segurança.`],
        ['Uso aceitável', `Não use o site para violar a lei, para atacá-lo ou sobrecarregá-lo, nem para processar conteúdo que você não tem direito de usar.`],
        ['Responsabilidade', `Na medida permitida por lei, não somos responsáveis por perdas decorrentes do uso do site ou de erros em seus resultados.`],
        ['Alterações', `Podemos alterar as ferramentas ou estes termos. O uso continuado significa que você aceita os termos atualizados.`]],
      contact: `Para dúvidas, relatos de erros ou sugestões de ferramentas, escreva para ${m}. Lemos todas as mensagens, mas não podemos prometer um prazo de resposta.`
    },
    id: {
      about: [
        `Celverter adalah kumpulan kecil alat gratis untuk pekerjaan sehari-hari: alat teks, alat kriptografi, konverter, kalkulator, dan konverter berkas. Setiap alat berjalan di browser Anda, sehingga teks dan berkas Anda tetap berada di perangkat Anda.`,
        `Kami menambah alat satu per satu dan mengujinya dengan contoh yang diketahui. Hasil disediakan untuk kemudahan; untuk keputusan keuangan, medis, hukum, atau keamanan, silakan berkonsultasi dengan profesional yang berkualifikasi.`],
      updated: 'Terakhir diperbarui',
      privacy: [
        ['Yang kami proses', `Alat berjalan di dalam browser Anda. Teks, angka, kata sandi, dan berkas yang Anda masukkan tidak dikirim ke server kami dan tidak kami simpan.`],
        ['Log server', `Penyedia hosting kami dapat menyimpan log server standar (misalnya alamat IP, jenis browser, dan halaman yang diminta) untuk keamanan dan pemecahan masalah.`],
        ['Data di perangkat Anda', `Saat Anda memilih bahasa, pilihan itu disimpan di penyimpanan lokal browser (kunci "lg") agar situs terbuka dalam bahasa Anda berikutnya. Anda dapat menghapusnya lewat pengaturan browser.`],
        ['Anak-anak', `Celverter tidak ditujukan untuk anak di bawah 13 tahun.`],
        ['Kontak', `Pertanyaan tentang kebijakan ini: ${m}.`]],
      terms: [
        ['Penggunaan layanan', `Celverter disediakan gratis dan "apa adanya", tanpa jaminan apa pun. Anda bertanggung jawab atas cara Anda menggunakan hasilnya.`],
        ['Bukan nasihat profesional', `Kalkulator memberikan perkiraan hanya untuk informasi. Hasilnya bukan nasihat keuangan, medis, atau hukum.`],
        ['Alat keamanan', `Alat enkripsi, hash, dan kata sandi berjalan di perangkat Anda. Sandi klasik seperti Caesar, Vigenère, dan Atbash hanya untuk belajar. Kami tidak dapat memulihkan kata sandi yang hilang atau mendekripsi teks Anda, dan Anda bertanggung jawab menjaga keamanan kata sandi Anda.`],
        ['Penggunaan yang wajar', `Jangan gunakan situs ini untuk melanggar hukum, menyerang atau membebaninya, atau memproses konten yang tidak berhak Anda gunakan.`],
        ['Tanggung jawab', `Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian akibat penggunaan situs atau kesalahan pada hasilnya.`],
        ['Perubahan', `Kami dapat mengubah alat atau ketentuan ini. Dengan terus menggunakan situs, Anda menerima ketentuan yang diperbarui.`]],
      contact: `Untuk pertanyaan, laporan bug, atau saran alat, tulis ke ${m}. Kami membaca setiap pesan tetapi tidak dapat menjanjikan waktu balasan.`
    },
    hi: {
      about: [
        `Celverter रोज़मर्रा के काम के लिए मुफ़्त टूल्स का एक छोटा संग्रह है: टेक्स्ट टूल्स, क्रिप्टोग्राफ़ी टूल्स, कन्वर्टर, कैलकुलेटर और फ़ाइल कन्वर्टर। हर टूल आपके ब्राउज़र में चलता है, इसलिए आपका टेक्स्ट और आपकी फ़ाइलें आपके डिवाइस पर ही रहती हैं।`,
        `हम टूल एक-एक करके जोड़ते हैं और उन्हें ज्ञात उदाहरणों से जाँचते हैं। परिणाम सुविधा के लिए दिए गए हैं; वित्तीय, चिकित्सीय, कानूनी या सुरक्षा संबंधी निर्णयों के लिए कृपया किसी योग्य विशेषज्ञ से सलाह लें।`],
      updated: 'अंतिम अपडेट',
      privacy: [
        ['हम क्या प्रोसेस करते हैं', `टूल आपके ब्राउज़र के भीतर चलते हैं। आपके दर्ज किए गए टेक्स्ट, संख्याएँ, पासवर्ड और फ़ाइलें हमारे सर्वर पर नहीं भेजी जातीं और हम उन्हें सहेजते नहीं हैं।`],
        ['सर्वर लॉग', `हमारा होस्टिंग प्रदाता सुरक्षा और समस्या-निवारण के लिए मानक सर्वर लॉग (जैसे IP पता, ब्राउज़र का प्रकार और माँगा गया पेज) रख सकता है।`],
        ['आपके डिवाइस पर डेटा', `जब आप कोई भाषा चुनते हैं तो हम वह चुनाव आपके ब्राउज़र के लोकल स्टोरेज (कुंजी "lg") में सहेजते हैं ताकि अगली बार साइट आपकी भाषा में खुले। आप इसे ब्राउज़र सेटिंग्स से मिटा सकते हैं।`],
        ['बच्चे', `Celverter 13 वर्ष से कम उम्र के बच्चों के लिए नहीं है।`],
        ['संपर्क', `इस नीति के बारे में प्रश्न: ${m}।`]],
      terms: [
        ['सेवा का उपयोग', `Celverter मुफ़्त और "जैसा है वैसा" उपलब्ध कराया जाता है, किसी भी प्रकार की गारंटी के बिना। परिणामों का आप कैसे उपयोग करते हैं, इसकी ज़िम्मेदारी आपकी है।`],
        ['पेशेवर सलाह नहीं', `कैलकुलेटर केवल जानकारी के लिए अनुमान देते हैं। वे वित्तीय, चिकित्सीय या कानूनी सलाह नहीं हैं।`],
        ['सुरक्षा टूल', `एन्क्रिप्शन, हैश और पासवर्ड टूल आपके डिवाइस पर चलते हैं। सीज़र, विज़ेनर और अतबश जैसे पारंपरिक सिफ़र केवल सीखने के लिए हैं। हम खोया हुआ पासवर्ड वापस नहीं पा सकते और न ही आपका टेक्स्ट डिक्रिप्ट कर सकते हैं; अपने पासवर्ड सुरक्षित रखने की ज़िम्मेदारी आपकी है।`],
        ['स्वीकार्य उपयोग', `साइट का उपयोग कानून तोड़ने, उस पर हमला करने या उसे ओवरलोड करने, या ऐसी सामग्री प्रोसेस करने के लिए न करें जिसे उपयोग करने का आपको अधिकार नहीं है।`],
        ['दायित्व', `कानून द्वारा अनुमत सीमा तक, साइट के उपयोग या उसके परिणामों की त्रुटियों से होने वाली हानि के लिए हम उत्तरदायी नहीं हैं।`],
        ['बदलाव', `हम टूल या इन शर्तों में बदलाव कर सकते हैं। साइट का निरंतर उपयोग अद्यतन शर्तों की स्वीकृति माना जाएगा।`]],
      contact: `प्रश्नों, बग रिपोर्ट या टूल सुझावों के लिए ${m} पर लिखें। हम हर संदेश पढ़ते हैं, लेकिन उत्तर देने की समय-सीमा का वादा नहीं कर सकते।`
    },
    ar: {
      about: [
        `Celverter مجموعة صغيرة من الأدوات المجانية للأعمال اليومية: أدوات النصوص وأدوات التشفير والمحوّلات والحاسبات ومحوّلات الملفات. تعمل كل أداة داخل متصفحك، فتبقى نصوصك وملفاتك على جهازك.`,
        `نضيف الأدوات واحدة تلو الأخرى ونختبرها بأمثلة معروفة. تُقدَّم النتائج للتسهيل؛ وبالنسبة للقرارات المالية أو الطبية أو القانونية أو الأمنية يُرجى استشارة مختص مؤهل.`],
      updated: 'آخر تحديث',
      privacy: [
        ['ما الذي نعالجه', `تعمل الأدوات داخل متصفحك. لا تُرسل النصوص والأعداد وكلمات المرور والملفات التي تدخلها إلى خوادمنا ولا نخزّنها.`],
        ['سجلات الخادم', `قد يحتفظ مزوّد الاستضافة لدينا بسجلات خادم قياسية (مثل عنوان IP ونوع المتصفح والصفحة المطلوبة) لأغراض الأمان وإصلاح الأعطال.`],
        ['البيانات على جهازك', `عند اختيارك لغة نحفظ هذا الاختيار في التخزين المحلي لمتصفحك (المفتاح "lg") ليفتح الموقع بلغتك في المرة القادمة. يمكنك مسحه من إعدادات المتصفح.`],
        ['الأطفال', `Celverter غير موجّه إلى الأطفال دون 13 عامًا.`],
        ['التواصل', `للاستفسار عن هذه السياسة: ${m}.`]],
      terms: [
        ['استخدام الخدمة', `تُقدَّم Celverter مجانًا و"كما هي" دون أي ضمانات. أنت المسؤول عن طريقة استخدامك للنتائج.`],
        ['ليست استشارة مهنية', `تقدّم الحاسبات تقديرات للاطلاع فقط. وهي ليست استشارة مالية أو طبية أو قانونية.`],
        ['أدوات الأمان', `تعمل أدوات التشفير والتجزئة وكلمات المرور على جهازك. الشيفرات الكلاسيكية مثل قيصر وفيجينير وأتباش للتعلّم فقط. لا يمكننا استرجاع كلمة مرور مفقودة ولا فك تشفير نصك، وأنت المسؤول عن حفظ كلمات مرورك بأمان.`],
        ['الاستخدام المقبول', `لا تستخدم الموقع لمخالفة القانون أو لمهاجمته أو إرهاقه، ولا لمعالجة محتوى لا تملك حق استخدامه.`],
        ['المسؤولية', `إلى الحد الذي يسمح به القانون، لا نتحمل مسؤولية الخسائر الناتجة عن استخدام الموقع أو عن أخطاء في نتائجه.`],
        ['التغييرات', `قد نغيّر الأدوات أو هذه الشروط. ويعني استمرارك في الاستخدام قبولك للشروط المحدَّثة.`]],
      contact: `للاستفسارات أو الإبلاغ عن الأخطاء أو اقتراح أدوات، راسلنا على ${m}. نقرأ كل رسالة لكن لا نستطيع الوعد بموعد للرد.`
    }
  };

  const out = {};
  for (const l in D) {
    const x = D[l];
    out[l] = {
      about: paras(x.about),
      privacy: `<p>${x.updated}: ${DAY}.</p>` + sec(x.privacy),
      terms: sec(x.terms),
      contact: `<p>${x.contact}</p>`
    };
  }
  return out;
};
