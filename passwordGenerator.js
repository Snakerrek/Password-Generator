const charAmountRange = document.getElementById('charAmountRange');
const charAmountNumber = document.getElementById('charAmountNumber');
const passwordGeneratorForm = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');

let charactersArray = [];

const syncCharacterAmount = (event) => {
  const value = event.target.value;
  charAmountNumber.value = value;
  charAmountRange.value = value;
};

charAmountRange.addEventListener('input', syncCharacterAmount);
charAmountNumber.addEventListener('input', syncCharacterAmount);

passwordGeneratorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const settings = generatePasswordSettings();
  generateCharactersArray(settings);
  const password = generatePassword(settings.charAmount);
  passwordDisplay.innerText = password;
});

function generatePasswordSettings() {
  const passwordSettings = {
    charAmount: document.getElementById('charAmountNumber').value,
    upperLetters: document.getElementById('upLetters').checked,
    numbers: document.getElementById('numbers').checked,
    symbols: document.getElementById('symbols').checked,
  };
  return passwordSettings;
}

function generatePassword(charAmount) {
  let password = '';
  for (let i = 0; i < charAmount; i++) {
    let char = String.fromCharCode(
      charactersArray[Math.floor(Math.random() * charactersArray.length)]
    );
    password += char;
  }
  charactersArray = [];
  return password;
}

function generateCharactersArray(passwordSettings) {
  fillArray(97, 122); // lowercase letters
  if (passwordSettings.upperLetters) {
    fillArray(65, 90); // Uppercase letters
  }
  if (passwordSettings.numbers) {
    fillArray(48, 57); // Numbers
  }
  if (passwordSettings.symbols) {
    fillArray(33, 47);
    fillArray(58, 64); // Symbols
    fillArray(91, 96);
  }
}

function fillArray(from, to) {
  for (let i = from; i < to; i++) {
    charactersArray.push(i);
  }
}
