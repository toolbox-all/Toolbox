const CATS = {
  image:   { name: "Image tools",   color: "var(--pink)",   icon: "🖼️", text: "Shrink, resize and convert photos." },
  pdf:     { name: "PDF tools",     color: "var(--blue)",   icon: "📄", text: "Merge, split and convert PDF files." },
  text:    { name: "Text tools",    color: "var(--teal)",   icon: "✍️", text: "Count words and change text case." },
  calc:    { name: "Calculators",   color: "var(--amber)",  icon: "🧮", text: "Age, percentages and unit conversion." },
  utility: { name: "Utilities",     color: "var(--violet)", icon: "🎨", text: "QR codes, colors and typing practice." }
};

const TOOLS = [
  { n: "Image Compressor",    s: "image-compressor",    c: "image",   i: "🗜️", d: "Reduce image file size without losing quality.", p: 1 },
  { n: "Image Resizer",       s: "image-resizer",       c: "image",   i: "📐", d: "Change image width and height in pixels." },
  { n: "Image Converter",     s: "image-converter",     c: "image",   i: "🔄", d: "Convert between JPG, PNG and WebP." },
  { n: "QR Code Generator",   s: "qr-generator",        c: "utility", i: "🔳", d: "Turn any link or text into a QR code.", p: 1 },
  { n: "PDF Merger",          s: "pdf-merger",          c: "pdf",     i: "📚", d: "Combine several PDFs into one file.", p: 1 },
  { n: "PDF Splitter",        s: "pdf-splitter",        c: "pdf",     i: "✂️", d: "Split a PDF into separate pages or ranges." },
  { n: "PDF to Image",        s: "pdf-to-image",        c: "pdf",     i: "🖨️", d: "Save every PDF page as a PNG or JPG." },
  { n: "Word Counter",        s: "word-counter",        c: "text",    i: "🔤", d: "Count words, sentences and reading time.", p: 1 },
  { n: "Character Counter",   s: "character-counter",   c: "text",    i: "🔡", d: "Count characters with and without spaces." },
  { n: "Text Case Converter", s: "text-case-converter", c: "text",    i: "Aa", d: "Switch text to upper, lower, title or sentence case." },
  { n: "Age Calculator",      s: "age-calculator",      c: "calc",    i: "🎂", d: "Find your exact age in years, months and days." },
  { n: "Percentage Calculator", s: "percentage-calculator", c: "calc", i: "％", d: "Work out percentages, increases and discounts.", p: 1 },
  { n: "Unit Converter",      s: "unit-converter",      c: "calc",    i: "⚖️", d: "Convert length, weight, temperature and more." },
  { n: "Typing Speed Test",   s: "typing-speed-test",   c: "utility", i: "⌨️", d: "Measure your typing speed in words per minute.", p: 1 },
  { n: "Color Picker",        s: "color-picker",        c: "utility", i: "🎨", d: "Pick colors and copy HEX, RGB or HSL codes." }
];

const $ = id => document.getElementById(id);
let activeCat = "all";

function card(t) {
  const cat = CATS[t.c];
  return `<a class="card" href="tools/${t.s}.html" style="--c:${cat.color}">
    <span class="ico" aria-hidden="true">${t.i}</span>
    <h3>${t.n}</h3>
    <p>${t.d}</p>
    <small>${cat.name}</small>
  </a>`;
}

function renderPopular() {
  $("popular-grid").innerHTML = TOOLS.filter(t => t.p).map(card).join("");
}

function renderCategories() {
  $("cat-grid").innerHTML = Object.entries(CATS).map(([key, c]) => {
    const count = TOOLS.filter(t => t.c === key).length;
    return `<button class="cat" data-cat="${key}" style="--c:${c.color}">
      <span class="ico" aria-hidden="true">${c.icon}</span>
      <h3>${c.name}</h3>
      <p>${c.text}</p>
      <small>${count} tool${count > 1 ? "s" : ""}</small>
    </button>`;
  }).join("");
  $("chips").innerHTML = Object.entries(CATS).map(([key, c]) =>
    `<button data-cat="${key}" style="--c:${c.color}">${c.name}</button>`).join("");
}

function renderAll() {
  const q = $("search").value.trim().toLowerCase();
  const list = TOOLS.filter(t =>
    (activeCat === "all" || t.c === activeCat) &&
    (!q || (t.n + " " + t.d + " " + CATS[t.c].name).toLowerCase().includes(q)));
  $("tool-grid").innerHTML = list.map(card).join("");
  $("empty").hidden = list.length > 0;
  $("reset").hidden = activeCat === "all" && !q;
  $("all-title").textContent = activeCat === "all" ? "All tools" : CATS[activeCat].name;
}

function goToAll() { $("all-tools").scrollIntoView({ behavior: "smooth" }); }

document.addEventListener("click", e => {
  const b = e.target.closest("[data-cat]");
  if (b) { activeCat = b.dataset.cat; renderAll(); goToAll(); }
});
$("search").addEventListener("input", () => {
  activeCat = "all";
  renderAll();
  if ($("search").value.trim()) goToAll();
});
$("reset").addEventListener("click", () => {
  activeCat = "all"; $("search").value = ""; renderAll();
});

$("year").textContent = new Date().getFullYear();
renderPopular(); renderCategories(); renderAll();
