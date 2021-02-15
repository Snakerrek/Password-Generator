const passwordCheckForm = document.getElementById('passwordCheckForm');

passwordCheckForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const passwordToCheck = document.getElementById('passwordToCheck');
  checkPassword(passwordToCheck.value);
});

function checkPassword(passwordToCheck) {
  grade = gradePassword(passwordToCheck);

  updatePasswordGradeText(grade);
  updatePasswordGradeGraphic(grade);
}

function gradePassword(password) {
  let passwordLength = password.length;
  let possibleCharacters = countPossibleCharactersInPassword(password);
  let possibleCharactersCombination = Math.pow(
    possibleCharacters,
    passwordLength
  );
  // just for debug
  console.log(`Possible characters: ${possibleCharacters}`);
  console.log(`Password length: ${passwordLength}`);
  console.log(
    `Number of possible character combinations: ${possibleCharactersCombination}`
  );
}

function countPossibleCharactersInPassword(password) {
  let bigLettersUsed = false;
  let smallLettersUsed = false;
  let symbolsUsed = false;
  let numbersUsed = false;
  let possibleCharacters = 0;

  for (let i = 0; i < password.length; i++) {
    let char = password[i].charCodeAt(0);
    if (char > 96 && char < 123) {
      smallLettersUsed = true;
    } else if (char > 64 && char < 91) {
      bigLettersUsed = true;
    } else if (char > 47 && char < 58) {
      numbersUsed = true;
    } else if (
      (char > 32 && char < 48) ||
      (char > 90 && char < 97) ||
      (char > 57 && char < 65)
    ) {
      symbolsUsed = true;
    }
  }
  if (smallLettersUsed) possibleCharacters += 26;
  if (bigLettersUsed) possibleCharacters += 26;
  if (numbersUsed) possibleCharacters += 10;
  if (symbolsUsed) possibleCharacters += 27;

  return possibleCharacters;
}

function updatePasswordGradeText(grade) {
  const passwordGrade = document.getElementById('passwordGrade');
  let color;
  let text;
  switch (grade) {
    case 1:
      color = 'red';
      text = 'Very Weak';
      break;
    case 2:
      color = 'red';
      text = 'Weak';
      break;
    case 3:
      color = 'yellow';
      text = 'Medium';
      break;
    case 4:
      color = 'green';
      text = 'Strong';
      break;
    case 5:
      color = 'green';
      text = 'Very Strong';
      break;
  }
  passwordGrade.style.color = color;
  passwordGrade.textContent = text;
}

function updatePasswordGradeGraphic(grade) {
  const gradeSegments = document.getElementsByClassName('password-segment');
  color = 'red';
  if (grade === 3) {
    color = 'yellow';
  } else if (grade > 3) {
    color = 'green';
  }
  for (let i = 0; i < grade; i++) {
    gradeSegments[i].style.background = color;
  }
}
