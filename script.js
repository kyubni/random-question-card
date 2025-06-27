const card = document.getElementById("card");
const backImage = document.getElementById("back-image");
const resetBtn = document.getElementById("reset-btn");

let isFlipped = false;

// 26개 이미지와 초기 가중치
let backImages = Array.from({ length: 26 }, (_, i) => ({
  src: `images/back${i + 1}.jpg`,
  weight: 1
}));

function weightedRandom(images) {
  const totalWeight = images.reduce((sum, img) => sum + img.weight, 0);
  let rand = Math.random() * totalWeight;
  for (let img of images) {
    if (rand < img.weight) return img;
    rand -= img.weight;
  }
}

card.addEventListener("click", () => {
  if (!isFlipped) {
    const selected = weightedRandom(backImages);
    backImage.src = selected.src;

    // 가중치 감소 (최소 0.2까지 유지)
    selected.weight = Math.max(0.2, selected.weight * 0.5);

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
