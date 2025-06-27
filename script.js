const card = document.getElementById("card");
const backImage = document.getElementById("back-image");
const resetBtn = document.getElementById("draw-again");
const historyContainer = document.getElementById("history");

let isFlipped = false;
let isZoomed = false;
let previousSrc = "";

const allImages = Array.from({ length: 26 }, (_, i) => `images/back${i + 1}.jpg`);
let pool = [...allImages];

function pickRandomFromPool() {
  if (pool.length === 0) pool = [...allImages];
  const index = Math.floor(Math.random() * pool.length);
  return pool.splice(index, 1)[0];
}

function addToHistory(imageSrc) {
  const thumb = document.createElement("img");
  thumb.src = imageSrc;
  thumb.classList.add("history-thumb");
  thumb.addEventListener("click", () => {
    if (!isZoomed) {
      previousSrc = backImage.src;
      backImage.src = imageSrc;
      isZoomed = true;
    } else {
      backImage.src = previousSrc;
      isZoomed = false;
    }
  });
  historyContainer.appendChild(thumb);
}

card.addEventListener("click", () => {
  if (!isFlipped && !isZoomed) {
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
  isZoomed = false;
});
