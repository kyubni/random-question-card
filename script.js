const card = document.getElementById("card");
const backImage = document.getElementById("back-image");
const resetBtn = document.getElementById("reset-btn");
const historyContainer = document.getElementById("history");

let isFlipped = false;

const allImages = Array.from({ length: 26 }, (_, i) => `images/back${i + 1}.jpg`);
let pool = [...allImages];

function pickRandomFromPool() {
  if (pool.length === 0) pool = [...allImages]; // 다 뽑았으면 리셋
  const index = Math.floor(Math.random() * pool.length);
  return pool.splice(index, 1)[0];
}

function addToHistory(imageSrc) {
  const thumb = document.createElement("img");
  thumb.src = imageSrc;
  thumb.classList.add("history-thumb");
  historyContainer.appendChild(thumb);
}

card.addEventListener("click", () => {
  if (!isFlipped) {
    const selected = pickRandomFromPool();
    backImage.src = selected;
    addToHistory(selected);

    card.classList.add("flipped");
    resetBtn.classList.remove("hidden");
    isFlipped = true;
  }
});

resetBtn.addEventListener("click", () => {
  card.classList.remove("flipped");
  backImage.src = "";
  resetBtn.classList.add("hidden");
  isFlipped = false;
});
