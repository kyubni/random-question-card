
const card = document.getElementById("card");
const frontImage = document.querySelector(".front");
const backImage = document.getElementById("back-image");
const resetBtn = document.getElementById("draw-again");
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
  if (!imageSrc) return;

  backImage.src = imageSrc;

  const thumb = document.createElement("img");
  thumb.src = imageSrc;
  thumb.className = "history-thumb";

  // ✅ 썸네일 클릭: 앞면일 땐 무시, 뒷면일 때만 작동
  thumb.addEventListener("click", () => {
    if (!isFlipped) return;

    if (currentZoomedImage === imageSrc) {
      // 이미 확대된 이미지 → 이전 이미지로 복원
      backImage.src = previousImageSrc;
      currentZoomedImage = null;
      isZoomed = false;
    } else {
      // 다른 썸네일을 클릭 → 현재 이미지 저장하고 교체
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
  currentZoomedImage = null;
});
