const passwordCheckForm = document.getElementById('passwordCheckForm');

passwordCheckForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const passwordToCheck = document.getElementById('passwordToCheck');
  checkPassword(passwordToCheck.value);
});

function checkPassword(passwordToCheck) {
  let grade = gradePassword(passwordToCheck);

  updatePasswordGradeText(grade);
  updatePasswordGradeGraphic(grade);

  calculateTimeToBreakPassword(passwordToCheck);
}

function calculateTimeToBreakPassword(password) {
  const passwordLength = password.length;
  const passwordDescription = describePassword(password);
  const possibleCharactersCombination = Math.pow(
    passwordDescription.possibleCharacters,
    passwordLength
  );
}

function gradePassword(password) {
  // GRADING RULES
  // Longer password is better
  // password with big letters, symbols and numbers are also stronger

  const passwordDescription = describePassword(password);
  let grade = 0;

  if (password.length > 7) {
    grade++;
    if (password.length > 15) {
      grade++;
    }
  }

  if (passwordDescription.bigLettersUsed) grade++;
  if (passwordDescription.symbolsUsed) grade++;
  if (passwordDescription.numbersUsed) grade++;

  return grade;
}

function describePassword(password) {
  let passwordDescription = {
    bigLettersUsed: false,
    smallLettersUsed: false,
    symbolsUsed: false,
    numbersUsed: false,
    possibleCharacters: 0,
  };

  for (let i = 0; i < password.length; i++) {
    let char = password[i].charCodeAt(0);
    if (char > 96 && char < 123) {
      passwordDescription.smallLettersUsed = true;
    } else if (char > 64 && char < 91) {
      passwordDescription.bigLettersUsed = true;
    } else if (char > 47 && char < 58) {
      passwordDescription.numbersUsed = true;
    } else if (
      (char > 32 && char < 48) ||
      (char > 90 && char < 97) ||
      (char > 57 && char < 65)
    ) {
      passwordDescription.symbolsUsed = true;
    }
  }
  if (passwordDescription.smallLettersUsed)
    passwordDescription.possibleCharacters += 26;
  if (passwordDescription.bigLettersUsed)
    passwordDescription.possibleCharacters += 26;
  if (passwordDescription.numbersUsed)
    passwordDescription.possibleCharacters += 10;
  if (passwordDescription.symbolsUsed)
    passwordDescription.possibleCharacters += 27;

  return passwordDescription;
}

function updatePasswordGradeText(grade) {
  const passwordGrade = document.getElementById('passwordGrade');
  let color;
  let text;
  switch (grade) {
    case 0:
      color = 'red';
      text = 'Extremely Weak';
      break;
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
