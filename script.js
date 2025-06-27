const card = document.getElementById("card");
const frontImage = document.querySelector(".front");
const backImage = document.getElementById("back-image");
const drawAgainBtn = document.getElementById("draw-again");
const resetBtn = document.getElementById("reset-btn");
const historyContainer = document.getElementById("history");

let isFlipped = false;
let isZoomed = false;
let currentZoomedImage = null;
let previousImageSrc = "";

const totalImages = 26;
let usedImages = [];

function getRandomImage() {
  if (usedImages.length >= totalImages) return null;

  let index;
  do {
    index = Math.floor(Math.random() * totalImages) + 1;
  } while (usedImages.includes(index));

  usedImages.push(index);
  return `images/back${index}.jpg`;
}

function drawCard() {
  const imageSrc = getRandomImage();
  if (!imageSrc) {
    drawAgainBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    return;
  }

  backImage.src = imageSrc;

  const thumb = document.createElement("img");
  thumb.src = imageSrc;
  thumb.className = "history-thumb";

  // ✅ 썸네일 클릭: 앞면일 땐 무시
  thumb.addEventListener("click", () => {
    if (!isFlipped) return;

    if (currentZoomedImage === imageSrc) {
      backImage.src = previousImageSrc;
      currentZoomedImage = null;
      isZoomed = false;
    } else {
      previousImageSrc = backImage.src;
      backImage.src = imageSrc;
      currentZoomedImage = imageSrc;
      isZoomed = true;
    }
  });

  historyContainer.appendChild(thumb);
}

card.addEventListener("click", () => {
  if (!isFlipped && !isZoomed) {
    card.classList.add("flipped");
    drawCard();
    drawAgainBtn.classList.remove("hidden");
    isFlipped = true;
  }
});

drawAgainBtn.addEventListener("click", () => {
  if (!isZoomed) drawCard();
});

resetBtn.addEventListener("click", () => {
  // 초기화 로직
  usedImages = [];
  isFlipped = false;
  isZoomed = false;
  currentZoomedImage = null;
  backImage.src = "";
  card.classList.remove("flipped");
  historyContainer.innerHTML = "";

  // 버튼 조정
  resetBtn.classList.add("hidden");
  drawAgainBtn.classList.add("hidden"); // 앞면일 땐 숨김
});
