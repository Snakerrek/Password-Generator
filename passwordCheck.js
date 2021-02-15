const passwordCheckForm = document.getElementById('passwordCheckForm');

passwordCheckForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const passwordToCheck = document.getElementById('passwordToCheck');
  checkPassword(passwordToCheck.value);
});

// Main function for checking password
function checkPassword(passwordToCheck) {
  let grade = gradePassword(passwordToCheck);
  updatePasswordGradeText(grade);
  updatePasswordGradeGraphic(grade);

  let timeToBreakPasswordInSeconds = calculateTimeToBreakPassword(
    passwordToCheck
  );

  representTime(timeToBreakPasswordInSeconds);
}

// Function for calculating estimated time to break a password (Not really reliable outcome)
// Calculations are based on numbers provided here: https://security.stackexchange.com/questions/68930/john-the-ripper-calculating-brute-force-time-to-crack-password
function calculateTimeToBreakPassword(password) {
  const passwordLength = password.length;
  const passwordDescription = describePassword(password);
  const possibleCombinations = Math.pow(
    passwordDescription.possibleCharacters,
    passwordLength
  );
  const hashingCalculations = possibleCombinations * 12;
  const timeInSeconds = hashingCalculations / 14273; // 14273 c/s

  return timeInSeconds;
}

function representTime(time) {
  console.log(time);
  // millennia (1000 years)
  // years (12 months)
  // months (~30 days)
  // days (24 hours)
  // hours (60 minutes)
  // minutes (60 seconds)
}

// function for grading password from 0 to 5 based on rules described below
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

// this function take password and return object that describe password
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

// This function shows text describing password strength
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

// This function grabs all gradeSegments and 'colors' them to represent the password strength
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
