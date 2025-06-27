const card = document.getElementById("card");
const backImage = document.getElementById("back-image");
const resetBtn = document.getElementById("reset-btn");

const backImages = [
  "images/back1.jpg",
  "images/back2.jpg",
  "images/back3.jpg",
  "images/back4.jpg"
];

let isFlipped = false;

card.addEventListener("click", () => {
  if (!isFlipped) {
    const randomImage = backImages[Math.floor(Math.random() * backImages.length)];
    backImage.src = randomImage;
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
