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

  const time = representTime(timeToBreakPasswordInSeconds);
  updateTime(time);
}

//Function for calculating estimated time to break a password (Not really reliable outcome)
//Calculations are based on numbers that i found on the internet
function calculateTimeToBreakPassword(password) {
  const passwordLength = password.length;
  const passwordDescription = describePassword(password);
  const possibleCombinations = Math.pow(
    passwordDescription.possibleCharacters,
    passwordLength
  );
  // I assume that passwords are not salted, (Radeon 9790 82.G c/s)
  const timeInSeconds = possibleCombinations / (82 * 1000000000); // 82.G c/s = 82 * 1000000000

  return timeInSeconds;
}

// Function for turning time in second to time in easier to read format
function representTime(timeInSeconds) {
  let time = {
    millennia: 0,
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  if (timeInSeconds / (1000 * 365 * 24 * 60 * 60) > 1) {
    time.millennia = Math.floor(timeInSeconds / (1000 * 365 * 24 * 60 * 60));
    timeInSeconds -= time.millennia * (1000 * 365 * 24 * 60 * 60);
  }
  if (timeInSeconds / (365 * 24 * 60 * 60) > 1) {
    time.years = Math.floor(timeInSeconds / (365 * 24 * 60 * 60));
    timeInSeconds -= time.years * (365 * 24 * 60 * 60);
  }
  if (timeInSeconds / (24 * 60 * 60) > 1) {
    time.days = Math.floor(timeInSeconds / (24 * 60 * 60));
    timeInSeconds -= time.days * (24 * 60 * 60);
  }
  if (timeInSeconds / (60 * 60) > 1) {
    time.hours = Math.floor(timeInSeconds / (60 * 60));
    timeInSeconds -= time.hours * (60 * 60);
  }
  if (timeInSeconds / 60 > 1) {
    time.minutes = Math.floor(timeInSeconds / 60);
    timeInSeconds -= time.minutes * 60;
  }

  time.seconds = Math.floor(timeInSeconds);
  return time;
}

function updateTime(time) {
  let timePeriods = [
    document.getElementById('millennia'),
    document.getElementById('years'),
    document.getElementById('days'),
    document.getElementById('hours'),
    document.getElementById('minutes'),
    document.getElementById('seconds'),
  ];

  if (time.millennia > 999999999999999) {
    for (let i = 1; i < timePeriods.length; i++) {
      timePeriods[i].style.display = 'none';
    }
    timePeriods[0].innerText = `Infinite time`;
  } else if (time.seconds === 0) {
    for (let i = 1; i < timePeriods.length; i++) {
      timePeriods[i].style.display = 'none';
    }
    timePeriods[0].innerText = `Instant`;
  } else {
    for (let i = 1; i < timePeriods.length; i++) {
      timePeriods[i].style.display = 'block';
    }
    timePeriods[0].innerText = `${time.millennia} Millennia`;
    timePeriods[1].innerText = `${time.years} Years`;
    timePeriods[2].innerText = `${time.days} Days`;
    timePeriods[3].innerText = `${time.hours} Hours`;
    timePeriods[4].innerText = `${time.minutes} Minutes`;
    timePeriods[5].innerText = `${time.seconds} Seconds`;
  }
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
  for (let i = 0; i < gradeSegments.length; i++) {
    gradeSegments[i].style.background = 'none';
  }
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
