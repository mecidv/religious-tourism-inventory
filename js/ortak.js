/* Ortak: canlı veri, iki dilli site metinleri, yapı ikonları ve atıf biçimleri.
   Site önce kendi içindeki yedek veriyle açılır, ardından Google E-Tablo'daki
   güncel veriyi (Yapılar, Metinler, onaylı Fotoğraflar) yükler. */
(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const I = window.I18N || { en: false, t: k => k };

  // E-Tablodaki "Metinler" sayfası boşsa kullanılacak varsayılanlar ( _en = İngilizce )
  const VARSAYILAN = {
    proje_ozet: "Anadolu, Roma, Doğu Roma ve Osmanlı dönemlerinden günümüze ulaşan, farklı inanç topluluklarına ait zengin bir kültürel mirasa ev sahipliği yapmaktadır. Bu proje, Türkiye’nin il, ilçe ve kırsal alanlarında bulunan kilise, manastır ve şapelleri resmi kaynaklar ve bilimsel yayınlar üzerinden tek bir envanterde bir araya getirmeyi ve haritalandırmayı amaçlamaktadır. Çalışma, söz konusu yapıları ülkemizin kültürel mirasının bir parçası olarak görünür kılmayı, inanç turizmi ve kültür turizmi açısından değerlendirilmelerine katkı sunmayı ve kültür envanteri çalışmalarını desteklemeyi hedeflemektedir.",
    proje_ozet_en: "Anatolia is home to a rich cultural heritage of diverse faith communities, accumulated through the Roman, Eastern Roman and Ottoman periods. This project brings together, in a single inventory and map, the churches, monasteries and chapels located in the provinces, districts and rural areas of Türkiye, drawing on official sources and scholarly publications. It aims to make these buildings visible as part of the country’s cultural heritage, to support their assessment for faith and cultural tourism, and to contribute to cultural inventory work.",
    yontem_ozet: "Çalışmada nitel araştırma yöntemlerinden doküman analizi tekniği kullanılmıştır. Patrikhanelerin, Kültür ve Turizm Bakanlığı’nın, Vakıflar Genel Müdürlüğü koruma kurullarının, UNESCO’nun, valilik, kaymakamlık ve belediyelerin resmi kaynakları ile bilimsel yayınlar karşılaştırmalı olarak taranmıştır. Her yapı için konum, güncel işlev, koruma durumu ve UNESCO listelerindeki yeri kaydedilmiştir.",
    yontem_ozet_en: "The study employed document analysis, a qualitative research technique. Official sources of the patriarchates, the Ministry of Culture and Tourism, the conservation councils of the General Directorate of Foundations, UNESCO, governorships, district governorships and municipalities, together with scholarly publications, were reviewed comparatively. For each building, the location, current use, conservation status and UNESCO listing were recorded.",

    yazar_ad: "Arş. Gör. A. Mecid Vergül",
    yazar_ad_en: "Res. Asst. A. Mecid Vergül",
    yazar_unvan: "Araştırma Görevlisi, İstanbul Gelişim Üniversitesi",
    yazar_unvan_en: "Research Assistant, Istanbul Gelişim University",
    yazar_ozgecmis: "İstanbul Gelişim Üniversitesi İktisadi, İdari ve Sosyal Bilimler Fakültesi Turizm Rehberliği Bölümü’nde araştırma görevlisi olarak görev yapmaktadır. Kastamonu Üniversitesi Sosyal Bilimler Enstitüsü Turizm İşletmeciliği Ana Bilim Dalı’nda “Türkiye’de Hristiyan Kültür Mirasının Haritalandırılması” başlıklı yüksek lisans tezini 2024 yılında tamamlamıştır. Doktora çalışmalarında sanal gerçeklik ve 360 derece görüntüleme teknolojilerinin turizme uyarlanması ile destinasyon pazarlaması alanlarına odaklanmaktadır. Başlıca araştırma alanları arasında Anadolu medeniyetleri ve kültür mirası yönetimi, inanç turizmi ile kültürel ve tarihi alanlar yer almaktadır. İngilizce dilinde profesyonel turist rehberidir.",
    yazar_ozgecmis_en: "Research assistant in the Department of Tourism Guidance, Faculty of Economics, Administrative and Social Sciences, Istanbul Gelişim University. He completed his master’s thesis, “Mapping the Christian Cultural Heritage in Türkiye”, at the Department of Tourism Management, Institute of Social Sciences, Kastamonu University, in 2024. His doctoral research focuses on the adaptation of virtual reality and 360-degree imaging technologies to tourism and on destination marketing. His research interests include Anatolian civilisations and cultural heritage management, faith tourism, and cultural and historical sites. He is a professional English-speaking tourist guide.",
    yazar_foto: "img/ekip/mecid-vergul.jpg",
    yazar_baglanti: "https://avesis.gelisim.edu.tr/avergul",

    danisman_ad: "Prof. Dr. Canan Tanrısever",
    danisman_unvan: "Tez danışmanı, Kastamonu Üniversitesi Turizm Fakültesi",
    danisman_unvan_en: "Thesis supervisor, Faculty of Tourism, Kastamonu University",
    danisman_ozgecmis: "Kastamonu Üniversitesi Turizm Fakültesi Turizm Rehberliği Bölümü’nde öğretim üyesi olarak görev yapmakta olup bölüm başkanlığı görevini de yürütmüştür. Çalışmaları turist rehberliği eğitimi, kültür rotaları, diaspora turizmi ve turist rehberlerinin kültürlerarası duyarlılığı gibi konular üzerinde yoğunlaşmakta; turizm işletmeciliği ile gastronomi ve mutfak sanatları alanlarına da uzanmaktadır. Kültür Rotaları Derneği’nin akademik üyeleri arasında yer almakta olup Future Tourism Trends, Volume 1: Tourism in the Changing World adlı uluslararası eserin yazarlarındandır. İngilizce dilinde profesyonel turist rehberidir. Bu projenin dayandığı yüksek lisans tezinin danışmanlığını üstlenmiştir.",
    danisman_ozgecmis_en: "Professor in the Department of Tourism Guidance, Faculty of Tourism, Kastamonu University, where she has also served as head of department. Her research focuses on tourist guide education, cultural routes, diaspora tourism and the intercultural sensitivity of tourist guides, and extends to tourism management and gastronomy. She is an academic member of the Culture Routes Society and a co-author of Future Tourism Trends, Volume 1: Tourism in the Changing World. She is a professional English-speaking tourist guide and supervised the master’s thesis on which this project is based.",
    danisman_foto: "img/ekip/canan-tanrisever.jpg",
    danisman_baglanti: "https://unis.kastamonu.edu.tr/akademisyen/ctanrisever",

    // Makale (yayımlanınca E-Tablodan doldurulur)
    makale_yazarlar: "", makale_yil: "", makale_baslik: "", makale_cilt: "", makale_sayi: "", makale_sayfalar: "", makale_doi: "",
    makale_dergi: "International Journal of Religious Tourism and Pilgrimage",
    // Envanterin Zenodo DOI'si (Zenodo kaydı oluşunca doldurulur)
    site_doi: "10.5281/zenodo.24338235",
    makale_dergi_baglanti: "https://arrow.tudublin.ie/ijrtp/",
    makale_dergi_not: "Scopus’ta dizinlenen dergi, SCImago (SJR 2025) sıralamasında Din Araştırmaları (Religious Studies) kategorisinde Q1’dedir.",
    makale_dergi_not_en: "The journal is indexed in Scopus and ranked Q1 in Religious Studies in the SCImago Journal Rank (SJR 2025).",

    // Tez
    tez_yazar: "Vergül, Ahmet Mecid", tez_yil: "2024",
    tez_baslik: "Türkiye’de Hristiyan kültür mirasının haritalandırılması",
    tez_baslik_en: "Mapping the Christian cultural heritage in Türkiye",
    tez_kurum: "Kastamonu Üniversitesi", tez_kurum_en: "Kastamonu University", tez_sehir: "Kastamonu", tez_baglanti: "",

    // Site / veri seti
    site_yazarlar: "Vergül, A. Mecid; Tanrısever, Canan", site_yil: String(new Date().getFullYear()),
    site_baslik: "Türkiye İnanç Turizmi Yaşayan Envanter Projesi",
    site_baslik_en: "Religious Tourism of Türkiye: Living Inventory Project",

    iletisim_eposta: "info.mecid@gmail.com",
    kisisel_site: "https://www.mecidvergul.com",
    kvkk_metni: "Bu sitedeki geribildirim formları aracılığıyla isteğe bağlı olarak paylaşılan ad ve e-posta bilgileri, yalnızca gönderiyle ilgili geri dönüş yapılması ve gönderinin değerlendirilmesi amacıyla proje yürütücüsü tarafından işlenmektedir. Bu bilgiler sitede yayımlanmamakta ve üçüncü kişilerle paylaşılmamaktadır. Gönderiler, proje yürütücüsünün Google hesabında saklanmaktadır. Gönderilen fotoğraflar, gönderenin onayı alınarak ve adıyla birlikte sitede yayımlanabilir. 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 11. maddesi kapsamındaki haklarınızı kullanmak ve verilerinizin silinmesini talep etmek için proje yürütücüsüyle iletişime geçebilirsiniz.",
    kvkk_metni_en: "Names and email addresses optionally provided through the feedback forms on this site are processed by the project coordinator solely to respond to and evaluate the submission. They are not published on the site or shared with third parties. Submissions are stored in the project coordinator’s Google account. Submitted photos may be published on the site with the contributor’s consent and name. To exercise your rights under Article 11 of the Turkish Personal Data Protection Law No. 6698, or to request deletion of your data, please contact the project coordinator."
  };

  // ---------- Yapı ikonları (renkten bağımsız olarak şekilleriyle ayrışır) ----------
  const SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <symbol id="ik-kilise" viewBox="0 0 24 24"><g style="stroke:var(--ikon-kenar,#fff)" stroke-width="1.6" stroke-linejoin="round" paint-order="stroke" fill="currentColor">
    <path d="M10 22V12.4l5.5-4.6 5.5 4.6V22z"/>
    <path d="M6.2 1.2h1.6v1.8h1.8v1.6H7.8v1.6l2.4 2.6V22H3.8V8.8l2.4-2.6V4.6H4.4V3h1.8z"/></g>
    <path d="M14.3 22v-3.4a1.2 1.2 0 0 1 2.4 0V22z" style="fill:var(--ikon-kenar,#fff)"/><path d="M6.2 22v-4a.8.8 0 0 1 1.6 0v4z" style="fill:var(--ikon-kenar,#fff)"/></symbol>
  <symbol id="ik-manastir" viewBox="0 0 24 24"><g style="stroke:var(--ikon-kenar,#fff)" stroke-width="1.5" stroke-linejoin="round" paint-order="stroke" fill="currentColor">
    <path d="M11.4 4.6h1.2v1.5h1.4v1.1h-1.4v2.4h-1.2V7.2H10V6.1h1.4z"/>
    <path d="M7.4 14.2a4.6 4.6 0 0 1 9.2 0z"/>
    <path d="M1.5 22V9.2h1.6v1.4h1.1V9.2h1.6v1.4h1.1V9.2h1.6v4.6h8.9V9.2h1.6v1.4h1.1V9.2h1.6v1.4h1.1V9.2h1.6V22z"/></g>
    <path d="M10.3 22v-3.6a1.7 1.7 0 0 1 3.4 0V22z" style="fill:var(--ikon-kenar,#fff)"/></symbol>
  <symbol id="ik-sapel" viewBox="0 0 24 24"><g style="stroke:var(--ikon-kenar,#fff)" stroke-width="1.6" stroke-linejoin="round" paint-order="stroke" fill="currentColor">
    <path d="M11.3 2.8h1.4v1.6h1.5v1.3h-1.5v2.6h-1.4V5.7H9.8V4.4h1.5z"/>
    <path d="M5.5 22v-8.8L12 8.6l6.5 4.6V22z"/></g>
    <path d="M10.8 22v-3.2a1.2 1.2 0 0 1 2.4 0V22z" style="fill:var(--ikon-kenar,#fff)"/></symbol>
</svg>`;
  const IKON_ID = { "Kilise": "ik-kilise", "Manastır": "ik-manastir", "Şapel": "ik-sapel" };
  const IKON_SINIF = { "Kilise": "kilise", "Manastır": "manastir", "Şapel": "sapel" };
  function spriteEkle() {
    if (document.getElementById("ik-kilise")) return;
    const d = document.createElement("div"); d.innerHTML = SPRITE; document.body.insertBefore(d.firstChild, document.body.firstChild);
  }
  if (document.body) spriteEkle(); else document.addEventListener("DOMContentLoaded", spriteEkle);

  // ---------- Atıf biçimleri ----------
  const yazarlar = (s) => String(s || "").split(";").map(x => x.trim()).filter(Boolean).map(x => {
    const [soy, ad] = x.split(",").map(y => (y || "").trim()); return { soy, ad: ad || "" };
  });
  const bas = (ad) => ad.split(/[\s-]+/).filter(Boolean).map(p => p[0].toLocaleUpperCase("tr") + ".").join(" ");
  const basBitisik = (ad) => bas(ad).replace(/ /g, "");
  function listeBirlestir(arr, son) { if (arr.length <= 1) return arr.join(""); if (arr.length === 2) return arr[0] + " " + son + " " + arr[1]; return arr.slice(0, -1).join(", ") + ", " + son + " " + arr[arr.length - 1]; }
  const doiUrl = (d) => d ? "https://doi.org/" + d.replace(/^https?:\/\/(dx\.)?doi\.org\//, "") : "";
  const ilkBuyuk = (s) => s;

  function eserler() {
    const m = (k) => Ortak.ham(k);
    const en = I.en;
    const list = [];
    const mak = {
      tip: "makale", au: yazarlar(m("makale_yazarlar")), yil: m("makale_yil"), baslik: m("makale_baslik"), dergi: m("makale_dergi"),
      cilt: m("makale_cilt"), sayi: m("makale_sayi"), sayfa: m("makale_sayfalar"), doi: m("makale_doi"), url: m("makale_dergi_baglanti")
    };
    if (mak.baslik && mak.au.length) list.push(mak);
    // Makale yayımlandıktan sonra önerilen atıf makale + envanterdir; tez yalnızca makale yokken listelenir
    else list.push({ tip: "tez", au: yazarlar(m("tez_yazar")), yil: m("tez_yil"), baslik: m("tez_baslik"), baslikEn: m("tez_baslik_en"),
      kurum: en ? m("tez_kurum_en") || m("tez_kurum") : m("tez_kurum"), sehir: m("tez_sehir"), url: m("tez_baglanti") });
    // Envanterin Zenodo DOI'si varsa bağlantı olarak DOI kullanılır
    const siteUrl = m("site_doi") ? doiUrl(m("site_doi")) : location.href.split(/[?#]/)[0].replace(/(index|harita)\.html$/, "");
    list.push({ tip: "site", au: yazarlar(m("site_yazarlar")), yil: m("site_yil"), baslik: en ? m("site_baslik_en") || m("site_baslik") : m("site_baslik"), url: siteUrl });
    return list;
  }

  // Her biçim { html, metin } döndürür
  const BICIMLER = {
    apa: { ad: "APA 7", f(e, en) {
      const ve = en ? "&" : "ve";
      const au = e.au.map(a => `${a.soy}, ${bas(a.ad)}`);
      const yazar = au.length < 2 ? au[0] : au.slice(0, -1).join(", ") + (en ? `, ${ve} ` : ` ${ve} `) + au[au.length - 1];
      if (e.tip === "makale") {
        const cs = `<i>${e.cilt}</i>${e.sayi ? `(${e.sayi})` : ""}`;
        return `${yazar} (${e.yil}). ${e.baslik}. <i>${e.dergi}</i>${e.cilt ? ", " + cs : ""}${e.sayfa ? ", " + e.sayfa : ""}.${e.doi ? " " + doiUrl(e.doi) : ""}`;
      }
      if (e.tip === "tez") return `${yazar} (${e.yil}). <i>${e.baslik}</i>${en && e.baslikEn ? ` [${e.baslikEn}]` : ""} [${I.t("tez_turu")}, ${e.kurum}].${e.url ? " " + e.url : ""}`;
      return `${yazar} (${e.yil}). <i>${e.baslik}</i> [${I.t("site_turu")}]. ${e.url}`;
    } },
    mla: { ad: "MLA 9", f(e, en) {
      const ve = en ? "and" : "ve";
      const a0 = e.au[0]; let yazar = `${a0.soy}, ${a0.ad}`;
      if (e.au.length === 2) yazar += `, ${ve} ${e.au[1].ad} ${e.au[1].soy}`; else if (e.au.length > 2) yazar += ", et al";
      if (e.tip === "makale") return `${yazar}. “${e.baslik}.” <i>${e.dergi}</i>${e.cilt ? `, vol. ${e.cilt}` : ""}${e.sayi ? `, no. ${e.sayi}` : ""}, ${e.yil}${e.sayfa ? `, pp. ${e.sayfa}` : ""}${e.doi ? ", " + doiUrl(e.doi) : ""}.`;
      if (e.tip === "tez") return `${yazar}. <i>${e.baslik}</i>. ${e.yil}. ${e.kurum}, ${I.t("tez_turu")}.`;
      return `${yazar}. <i>${e.baslik}</i>. ${e.yil}, ${e.url.replace(/^https?:\/\//, "")}.`;
    } },
    chicago: { ad: "Chicago", f(e, en) {
      const ve = en ? "and" : "ve";
      const a0 = e.au[0]; const rest = e.au.slice(1).map(a => `${a.ad} ${a.soy}`);
      const yazar = rest.length === 1 ? `${a0.soy}, ${a0.ad}${en ? "," : ""} ${ve} ${rest[0]}` : listeBirlestir([`${a0.soy}, ${a0.ad}`].concat(rest), ve);
      if (e.tip === "makale") return `${yazar}. ${e.yil}. “${e.baslik}.” <i>${e.dergi}</i>${e.cilt ? ` ${e.cilt}` : ""}${e.sayi ? ` (${e.sayi})` : ""}${e.sayfa ? `: ${e.sayfa}` : ""}.${e.doi ? " " + doiUrl(e.doi) + "." : ""}`;
      if (e.tip === "tez") return `${yazar}. ${e.yil}. “${e.baslik}.” ${I.t("tez_turu")}, ${e.kurum}.`;
      return `${yazar}. ${e.yil}. <i>${e.baslik}</i>. ${e.url}.`;
    } },
    harvard: { ad: "Harvard", f(e, en) {
      const ve = en ? "and" : "ve";
      const yazar = listeBirlestir(e.au.map(a => `${a.soy}, ${basBitisik(a.ad)}`), ve);
      if (e.tip === "makale") return `${yazar} (${e.yil}) ‘${e.baslik}’, <i>${e.dergi}</i>${e.cilt ? `, ${e.cilt}` : ""}${e.sayi ? `(${e.sayi})` : ""}${e.sayfa ? `, pp. ${e.sayfa}` : ""}.${e.doi ? " doi: " + e.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "") + "." : ""}`;
      if (e.tip === "tez") return `${yazar} (${e.yil}) <i>${e.baslik}</i>. ${I.t("tez_turu")}. ${e.kurum}.`;
      return `${yazar} (${e.yil}) <i>${e.baslik}</i>. ${en ? "Available at" : "Erişim adresi"}: ${e.url}.`;
    } },
    ieee: { ad: "IEEE", f(e, en) {
      const ve = en ? "and" : "ve";
      const yazar = listeBirlestir(e.au.map(a => `${bas(a.ad)} ${a.soy}`), ve);
      if (e.tip === "makale") return `${yazar}, “${e.baslik},” <i>${e.dergi}</i>${e.cilt ? `, vol. ${e.cilt}` : ""}${e.sayi ? `, no. ${e.sayi}` : ""}${e.sayfa ? `, pp. ${e.sayfa}` : ""}, ${e.yil}${e.doi ? `, doi: ${e.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}` : ""}.`;
      if (e.tip === "tez") return `${yazar}, “${e.baslik},” ${en ? "M.S. thesis" : "Yüksek lisans tezi"}, ${e.kurum}, ${e.sehir}, ${en ? "Türkiye" : "Türkiye"}, ${e.yil}.`;
      return `${yazar}, “${e.baslik}.” ${e.yil}. [Online]. ${en ? "Available" : "Erişim"}: ${e.url}`;
    } },
    bibtex: { ad: "BibTeX", ham: true, f(e, en) {
      const key = (e.au[0] ? norm(e.au[0].soy) : "anon") + e.yil;
      const au = e.au.map(a => `${a.soy}, ${a.ad}`).join(" and ");
      if (e.tip === "makale") return `@article{${key},\n  author = {${au}},\n  title = {${e.baslik}},\n  journal = {${e.dergi}},\n  year = {${e.yil}},${e.cilt ? `\n  volume = {${e.cilt}},` : ""}${e.sayi ? `\n  number = {${e.sayi}},` : ""}${e.sayfa ? `\n  pages = {${e.sayfa.replace(/[–-]/, "--")}},` : ""}${e.doi ? `\n  doi = {${e.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}},` : ""}\n}`;
      if (e.tip === "tez") return `@mastersthesis{${key},\n  author = {${au}},\n  title = {${e.baslik}},\n  school = {${e.kurum}},\n  year = {${e.yil}},\n  type = {${I.t("tez_turu")}}\n}`;
      return `@misc{${key}harita,\n  author = {${au}},\n  title = {${e.baslik}},\n  year = {${e.yil}},\n  howpublished = {\\url{${e.url}}},\n  note = {${I.t("site_turu")}}\n}`;
    } },
    ris: { ad: "RIS", ham: true, f(e) {
      const L = [];
      L.push("TY  - " + ({ makale: "JOUR", tez: "THES", site: "ELEC" }[e.tip]));
      e.au.forEach(a => L.push(`AU  - ${a.soy}, ${a.ad}`));
      L.push("PY  - " + e.yil); L.push("TI  - " + e.baslik);
      if (e.tip === "makale") { L.push("JO  - " + e.dergi); if (e.cilt) L.push("VL  - " + e.cilt); if (e.sayi) L.push("IS  - " + e.sayi);
        if (e.sayfa) { const [sp, ep] = e.sayfa.split(/[–-]/); L.push("SP  - " + sp); if (ep) L.push("EP  - " + ep); }
        if (e.doi) L.push("DO  - " + e.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")); }
      if (e.tip === "tez") { L.push("PB  - " + e.kurum); L.push("M3  - " + I.t("tez_turu")); }
      if (e.tip === "site") L.push("UR  - " + e.url);
      L.push("ER  - "); return L.join("\n");
    } }
  };
  const norm = (s) => String(s || "").toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]/g, "");
  const esc0 = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const duz = (html) => { const d = document.createElement("div"); d.innerHTML = html; return d.textContent; };

  // ---------- Dönen rakam sayacı ----------
  const AZALT = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function sayac(el, deger, secenek) {
    secenek = secenek || {};
    const metin = Number(deger).toLocaleString(secenek.yerel || (I.en ? "en-GB" : "tr-TR"));
    if (AZALT) { el.textContent = metin; return; }
    const eski = el.dataset.sayac;
    const yapiAyni = eski && eski.length === metin.length && el.querySelector(".od-s");
    if (!yapiAyni) {
      // Rakam şeritlerini kur; ilk gösterimde sıfırdan dönerek başlar
      el.innerHTML = `<span class="vh od-metin"></span><span aria-hidden="true" class="od">${[...metin].map(ch => /\d/.test(ch)
        ? `<span class="od-h"><span class="od-s">${"01234567890123456789".split("").map(d => `<span>${d}</span>`).join("")}</span></span>`
        : `<span class="od-a">${ch}</span>`).join("")}</span>`;
      const seritler = el.querySelectorAll(".od-s");
      seritler.forEach(s => { s.style.transition = "none"; s.style.transform = "translate3d(0,0,0)"; });
      void el.offsetHeight;
    }
    const rakamlar = [...metin].filter(ch => /\d/.test(ch));
    const seritler = el.querySelectorAll(".od-s");
    seritler.forEach((s, i) => {
      const hedef = Number(rakamlar[i]) + 10;
      s.style.transition = `transform ${secenek.sure || 1100}ms cubic-bezier(.2,.75,.15,1) ${(seritler.length - 1 - i) * 70}ms`;
      s.style.transform = `translate3d(0,${-hedef * 5}%,0)`;
    });
    const vh = el.querySelector(".od-metin"); if (vh) vh.textContent = metin;
    el.dataset.sayac = metin;
  }

  const Ortak = {
    sayac,
    metinler: Object.assign({}, VARSAYILAN),
    fotolar: [],
    canli: false,
    IKON_ID, IKON_SINIF,

    ikon(tur, ek) {
      const id = IKON_ID[tur] || "ik-kilise";
      return `<svg class="ik ik-${IKON_SINIF[tur] || "kilise"}${ek ? " " + ek : ""}" viewBox="0 0 24 24" aria-hidden="true"><use href="#${id}"/></svg>`;
    },

    yukle() {
      if (this._p) return this._p;
      if (!CFG.FEEDBACK_ENDPOINT) { this._p = Promise.resolve(null); return this._p; }
      const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      const t = setTimeout(() => ctrl && ctrl.abort(), 12000);
      // Ziyaret: aynı tarayıcıdan günde bir kez sayılır; kişisel veri gönderilmez
      let ziyaret = "";
      // ?sayma=0 bu tarayıcıyı sayaç dışında bırakır (site sahibinin kendi ziyaretleri için), ?sayma=1 yeniden saydırır
      try { const sp = new URLSearchParams(location.search).get("sayma"); if (sp === "0") localStorage.setItem("sayma", "hayir"); else if (sp === "1") localStorage.removeItem("sayma"); } catch (e) { /* yoksay */ }
      let saymaKapali = false; try { saymaKapali = localStorage.getItem("sayma") === "hayir"; } catch (e) { /* yoksay */ }
      if (!saymaKapali) try { const gun = new Date().toISOString().slice(0, 10); if (localStorage.getItem("ziyaret_gun") !== gun) { localStorage.setItem("ziyaret_gun", gun); ziyaret = "&ziyaret=1"; } } catch (e) { /* depolama kapalıysa sayılmaz */ }
      this._p = fetch(CFG.FEEDBACK_ENDPOINT + "?islem=veri" + ziyaret, ctrl ? { signal: ctrl.signal } : {})
        .then(r => r.json())
        .then(v => {
          clearTimeout(t);
          if (v && v.metinler) Object.keys(v.metinler).forEach(k => { const s = String(v.metinler[k] || "").trim(); if (s) this.metinler[k] = s; });
          if (v && Array.isArray(v.fotolar)) this.fotolar = v.fotolar;
          if (v && v.sayac !== "" && v.sayac != null && Number.isFinite(Number(v.sayac)) && Number(v.sayac) >= 0) this.ziyaret = Number(v.sayac);   // sıfır da gösterilir
          // Ay ve yıl dökümü (Apps Script sürümü destekliyorsa)
          if (v && Number.isFinite(Number(v.sayac_ay)) && Number.isFinite(Number(v.sayac_yil)) && v.donem_yil) { this.ziyaretAy = Number(v.sayac_ay); this.ziyaretYil = Number(v.sayac_yil); this.donemYil = String(v.donem_yil); }
          if (v && v.guncelleme) this.veriGuncelleme = String(v.guncelleme);
          if (v && Array.isArray(v.yapilar) && v.yapilar.length > 50) { this.canli = true; return v.yapilar; }
          return null;
        })
        .catch(() => null);
      return this._p;
    },

    // Son güncelleme: sitenin yayımlanan son sürümü (surum.js) ile e-tablodaki son değişiklikten hangisi yeniyse; tarih ve saat
    sonGuncellemeTarihi() {
      const S = window.SITE_SURUM || {};
      const adaylar = [S.tarih, this.veriGuncelleme, CFG.SITE_GUNCELLEME].map(x => x ? new Date(x) : null).filter(d => d && !isNaN(d));
      return adaylar.length ? new Date(Math.max(...adaylar)) : null;
    },
    sonGuncelleme() {
      const d = this.sonGuncellemeTarihi(); if (!d) return "";
      const yer = I.en ? "en-GB" : "tr-TR", tz = { timeZone: "Europe/Istanbul" };
      const gun = d.toLocaleDateString(yer, Object.assign({ day: "numeric", month: "long", year: "numeric" }, tz));
      const saat = d.toLocaleTimeString(yer, Object.assign({ hour: "2-digit", minute: "2-digit" }, tz));
      return `${gun}, ${saat}`;
    },
    // Türkçe yer eki: 2026'da, 2027'de, 2033'te …
    yilEki(y) {
      const n = Number(y), b = n % 10, o = Math.floor(n / 10) % 10;
      const birler = ["", "de", "de", "te", "te", "te", "da", "de", "de", "da"], onlar = ["", "da", "de", "da", "ta", "de", "ta", "te", "de", "da"];
      const ek = b ? birler[b] : (o ? onlar[o] : "de");
      return `${y}’${ek}`;
    },
    // Ziyaret, güncelleme ve sürüm bilgisi. bant: true ise başa "Claude ile geliştirildi" de eklenir
    siteBilgi(el, bant) {
      if (!el) return;
      const parca = [];
      const sb = (n) => `<b class="sb-sayi" data-n="${n}"></b>`;
      if (bant) parca.push(`<span class="sb-claude"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5Z" fill="currentColor"/></svg><span>${esc0(I.t("gelistiren"))}</span></span>`);
      if (this.ziyaret != null) {
        const goz = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M1.5 10S5 3.8 10 3.8 18.5 10 18.5 10 15 16.2 10 16.2 1.5 10 1.5 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.6" fill="currentColor"/></svg>`;
        const metin = this.ziyaretAy != null
          ? I.t("ziyaret_dokum", { ay: sb(this.ziyaretAy), yil: I.en ? this.donemYil : this.yilEki(this.donemYil), yilS: sb(this.ziyaretYil), top: sb(this.ziyaret) })
          : `${sb(this.ziyaret)} ${esc0(I.t("ziyaret"))}`;
        parca.push(`<span class="sb-ziyaret" title="${esc0(I.t("ziyaret_not"))}">${goz}<span>${metin}</span></span>`);
      }
      const tarih = this.sonGuncelleme(), S = window.SITE_SURUM;
      if (tarih) parca.push(`<span class="sb-surum"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16.2 7.2A6.6 6.6 0 0 0 4 6.3M3.8 12.8A6.6 6.6 0 0 0 16 13.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 2.8v3.6h3.6M16 17.2v-3.6h-3.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc0(I.t("son_guncelleme"))}: <b>${esc0(tarih)}</b>${S && S.surum ? ` · <a href="sss.html#${I.en ? "surum-en" : "surum"}" class="sb-surum-ad" title="${esc0(I.t("surum_not"))}">${esc0(I.t("surum"))} <b>${esc0(S.surum)}</b></a>` : ""}</span></span>`);
      el.innerHTML = parca.join("");
      el.querySelectorAll(".sb-sayi").forEach(b => sayac(b, Number(b.dataset.n), { sure: 1400 }));
    },

    // Footer'daki tez künyesi (APA 7)
    tezKunye() { const e = eserler().find(x => x.tip === "tez"); return e ? BICIMLER.apa.f(e, I.en) : ""; },

    ham(k) { return this.metinler[k] || ""; },
    // Dile göre metin: İngilizcede önce *_en anahtarına bakılır
    m(k) { if (I.en) { const e = this.metinler[k + "_en"]; if (e) return e; } return this.metinler[k] || ""; },

    // Atıf bölümü: biçim sekmeleri + her eser için kopyalanabilir künye
    atifHtml(esc) {
      esc = esc || esc0;
      const bicim = Ortak._bicim || "apa";
      const list = eserler();
      const makaleVar = list.some(e => e.tip === "makale");
      const dergi = this.m("makale_dergi"), dergiLink = this.m("makale_dergi_baglanti"), not = this.m("makale_dergi_not");
      const sekmeler = `<div class="atif-sekmeler" role="tablist" aria-label="${esc(I.t("atif_bicim"))}">${Object.keys(BICIMLER).map(k =>
        `<button type="button" role="tab" data-bicim="${k}" aria-selected="${k === bicim}">${BICIMLER[k].ad}</button>`).join("")}</div>`;
      const baslik = { makale: I.t("atif_makale"), tez: I.t("atif_tez"), site: I.t("atif_site") };
      let html = sekmeler;
      // Önerilen atıf: öncelikli eser (makale, yoksa tez) ile envanter birlikte; tek tıkla ikisi birden kopyalanır
      const bc = BICIMLER[bicim], ana = list[0], env = list.find(e => e.tip === "site");
      if (ana && env && ana !== env) {
        const metinIci = (e) => { const s0 = e.au.map(a => a.soy); const ad = s0.length > 2 ? `${s0[0]} ${I.en ? "et al." : "vd."}` : s0.join(I.en ? " & " : " ve "); return `${ad}, ${e.yil}`; };
        const ikisi = [ana, env].map(e => { const c = bc.f(e, I.en); return bc.ham ? c : duz(c); }).join(bc.ham ? "\n\n" : "\n");
        html += `<div class="atif-blok atif-oneri"><h4>${esc(I.t("atif_oneri"))}</h4><p class="atif-not">${esc(I.t(makaleVar ? "atif_oneri_not" : "atif_oneri_not_tez"))}</p>
          ${bc.ham ? "" : `<p class="atif-metinici">${esc(I.t("atif_metin_ici"))}: <b>(${esc(metinIci(ana))}; ${esc(metinIci(env))})</b></p>`}
          <div class="atif-dugmeler"><button type="button" class="btn btn-ana" data-kopyala="${esc(ikisi)}">${esc(I.t("atif_ikisini_kopyala"))}</button></div></div>`;
      }
      if (!makaleVar) {
        html += `<div class="atif-blok"><h4>${esc(I.t("atif_makale"))}</h4><p class="atif-not">${I.t("atif_makale_yakinda", { dergi: `<a href="${esc(dergiLink)}" target="_blank" rel="noopener"><i>${esc(dergi)}</i></a>` })}${not ? " " + esc(not) : ""} ${esc(I.t("atif_makale_yakinda2"))}</p></div>`;
      }
      list.forEach(e => {
        const b = BICIMLER[bicim];
        const cikti = b.f(e, I.en);
        const metin = b.ham ? cikti : duz(cikti);
        const icerik = b.ham ? `<pre class="atif-metin atif-ham">${esc(cikti)}</pre>` : `<blockquote class="atif-metin">${cikti}</blockquote>`;
        const notu = e.tip === "makale" ? `<p class="atif-not">${esc(I.t("atif_makale_once"))}${not ? " " + esc(not) : ""}</p>` : "";
        html += `<div class="atif-blok"><h4>${esc(baslik[e.tip])}</h4>${notu}${icerik}
          <div class="atif-dugmeler"><button type="button" class="btn btn-ghost" data-kopyala="${esc(metin)}">${esc(I.t("atif_kopyala"))}</button>
          ${b.ham ? `<button type="button" class="btn btn-ghost" data-indir="${esc(metin)}" data-dosya="${e.tip}.${bicim === "bibtex" ? "bib" : "ris"}">${esc(I.t("atif_indir"))}</button>` : ""}</div></div>`;
      });
      return html;
    },

    atifBagla(kutu) {
      // Biçim sekmeleri, kopyalama ve indirme
      kutu.addEventListener("click", async e => {
        const sek = e.target.closest("[data-bicim]");
        if (sek) { Ortak._bicim = sek.dataset.bicim; const hedef = sek.closest("[data-atif-kutu]") || kutu; hedef.innerHTML = Ortak.atifHtml(); return; }
        const ind = e.target.closest("[data-indir]");
        if (ind) {
          const blob = new Blob([ind.getAttribute("data-indir")], { type: "text/plain;charset=utf-8" });
          const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = ind.getAttribute("data-dosya");
          document.body.appendChild(a); a.click(); a.remove(); return;
        }
        const b = e.target.closest("[data-kopyala]"); if (!b) return;
        const metin = b.getAttribute("data-kopyala");
        let ok = false;
        try { await navigator.clipboard.writeText(metin); ok = true; } catch (err) {
          const ta = document.createElement("textarea"); ta.value = metin; document.body.appendChild(ta); ta.select();
          try { ok = document.execCommand("copy"); } catch (e2) { ok = false; } ta.remove();
        }
        const eski = b.textContent; b.textContent = ok ? I.t("kopyalandi") : I.t("kopyalanamadi");
        setTimeout(() => { b.textContent = eski; }, 1800);
      });
    },

    normalize(list, ILLER) {
      const bolge = Object.fromEntries((ILLER || []).map(i => [i.ad, i.bolge]));
      const sayi = v => { const n = Number(String(v).replace(",", ".")); return isFinite(n) ? n : NaN; };
      return list.map(r => {
        const ad = String(r.ad || "").trim();
        const tur = ["Kilise", "Manastır", "Şapel"].includes(r.tur) ? r.tur : "Kilise";
        const low = (ad + " " + (r.islev || "")).toLocaleLowerCase("tr");
        const icerir = [];
        if (/kilise|kilisi|katedral|bazilika|patrik|vaftizhane|martyrion/.test(low)) icerir.push("kilise");
        if (low.includes("manastır")) icerir.push("manastir");
        if (low.includes("şapel")) icerir.push("sapel");
        const un = String(r.unesco || "").trim();
        return {
          no: Number(r.no), il: String(r.il || "").trim(), ilce: String(r.ilce || "").trim(), yer: String(r.yer || "").trim(),
          ad, adTam: ad, tur, icerir,
          topluluk: String(r.topluluk || "").split(",").map(s => s.trim()).filter(Boolean),
          islev: String(r.islev || "").trim(), islevKat: String(r.islevKat || "Diğer / bilinmiyor").trim(),
          durum: String(r.durum || "").trim(), unesco: un === "Dünya Mirası" ? "Kalıcı" : (un === "Geçici Liste" ? "Geçici liste" : ""),
          bolge: bolge[String(r.il || "").trim()] || "", lat: sayi(r.lat), lng: sayi(r.lng),
          hassasiyet: String(r.hassasiyet || "İlçe merkezi").trim(), sayfa: r.sayfa || "", kaynak: String(r.kaynak || "").trim()
        };
      }).filter(y => y.no && y.ad && isFinite(y.lat) && isFinite(y.lng));
    }
  };
  // ---------- Tema (açık / koyu) ----------
  // Gündüz/gece düğmesi TR/EN gibi kaydırmalı iki parçalıdır; seçili parçanın altında bir kızak kayar
  function temaUygula(t) {
    document.documentElement.dataset.tema = t;
    document.querySelectorAll("[data-tema-dugme]").forEach(g => {
      g.setAttribute("aria-label", I.t("tema_etiket"));
      g.querySelectorAll("button[data-tema-deger]").forEach(b => {
        const d = b.dataset.temaDeger; b.setAttribute("aria-pressed", String(d === t));
        b.setAttribute("aria-label", I.t(d === "koyu" ? "tema_koyu" : "tema_acik")); b.title = b.getAttribute("aria-label");
      });
    });
  }
  temaUygula(document.documentElement.dataset.tema === "koyu" ? "koyu" : "acik");
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-tema-dugme] button[data-tema-deger]"); if (!b) return;
    const yeni = b.dataset.temaDeger;
    if (yeni === document.documentElement.dataset.tema) return;
    try { localStorage.setItem("tema", yeni); } catch (err) { /* yoksay */ }
    const kok = document.documentElement; kok.classList.add("tema-gecis");
    temaUygula(yeni);
    setTimeout(() => kok.classList.remove("tema-gecis"), 420);
    window.dispatchEvent(new CustomEvent("temadegisti", { detail: yeni }));
  });
  Ortak.temaUygula = temaUygula;

  window.Ortak = Ortak;
})();
