const mainGlassWaterLevelElement = document.getElementById('main-glass-water-level');
const mainGlassWaterLevelValueElement = document.getElementById('water-level-value');
const mainGlassWaterLevelPercentageElement = document.getElementById('water-level-percentage');
const smallerGlasses = document.querySelectorAll('.small-glass');
const filledGlassesNumber = document.getElementById('filled-glasses-number');
const resetButton = document.getElementById('reset-water-tracker-button');

const MAX_CAPACITY = 3;
const SMALL_GLASS_CAPACITY = 0.25;
let mainGlassWaterLevel = 0;

const updateInfo = () => {
  mainGlassWaterLevelElement.style.height = `${(mainGlassWaterLevel / MAX_CAPACITY) * 96}%`;
  mainGlassWaterLevelValueElement.innerText = `${mainGlassWaterLevel.toFixed(2)} Liters`;
  mainGlassWaterLevelPercentageElement.innerHTML = `${(
    (mainGlassWaterLevel / MAX_CAPACITY) *
    100
  ).toFixed(2)}% of daily goal achieved`;
  filledGlassesNumber.innerText = mainGlassWaterLevel / SMALL_GLASS_CAPACITY;
  mainGlassWaterLevel > 0
    ? resetButton.classList.add('visible')
    : resetButton.classList.remove('visible');
};

smallerGlasses.forEach((glass, index) => {
  glass.addEventListener('click', () => {
    const clickedGlassIndex = index;

    if (glass.classList.contains('filled')) {
      smallerGlasses.forEach((g, i) => {
        if (i >= clickedGlassIndex) {
          g.classList.remove('filled');
        }
      });
      mainGlassWaterLevel = clickedGlassIndex * SMALL_GLASS_CAPACITY;
    } else {
      smallerGlasses.forEach((g, i) => {
        if (i <= clickedGlassIndex) {
          g.classList.add('filled');
        }
      });
      mainGlassWaterLevel = (clickedGlassIndex + 1) * SMALL_GLASS_CAPACITY;
    }

    updateInfo();
  });
});

resetButton.addEventListener('click', () => {
  mainGlassWaterLevel = 0;
  smallerGlasses.forEach((glass) => glass.classList.remove('filled'));
  updateInfo();
});
