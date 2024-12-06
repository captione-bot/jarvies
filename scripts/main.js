const questions = [
  {
    image: "assets/images/arvie-back.jpg",
    question: "DO YOU THINK ARVIE'S BACK HAS IMPROVED?",
    answers: [
      {
        text: "YES, SUPER YUMMY!😋",
        correct: true,
      },
      {
        text: "Not enough!",
        correct: false,
      },
      {
        text: "HOLY MAMAMIA!",
        correct: false,
      },
      {
        text: "NO, GRIND MORE BISH!",
        correct: false,
      },
    ],
    type: "close-ended",
  },
  {
    image: "assets/images/cams.jpg",
    question: "Sir, what kind of haircut is this sir?",
    answers: [
      {
        text: "Mullet, 'di na mauulet",
        correct: false,
      },
      {
        text: "Crim",
        correct: false,
      },
      {
        text: "burst fade + v cut",
        correct: true,
      },
      {
        text: "Pompadour",
        correct: false,
      },
    ],
    type: "close-ended",
  },
  {
    image: "assets/images/kuys.png",
    question: "age test hihihi",
    answers: [
      {
        text: "12yrs old",
        correct: false,
      },
      {
        text: "45yrs old",
        correct: false,
      },
      {
        text: "51yrs old",
        correct: false,
      },
      {
        text: "23yrs old",
        correct: true,
      },
    ],
    type: "close-ended",
  },
  {
    image: "assets/images/gelo.jpg",
    question: `Do you believe in the saying, "Like Father, like Daughter"?`,
    type: "open-ended",
  },
  {
    image: "assets/images/bald.jpg",
    question: "Which one do you think is bald?",
    answers: [
      {
        text: "1",
      },
      {
        text: "2",
      },
      {
        text: "3",
      },
      {
        text: "4",
      },
      {
        text: "5",
      },
    ],
    type: "dropdown",
  },
  {
    image: "assets/images/day.jpg",
    question: "Which type of training day is this?",
    answers: [
      {
        text: "Leg day",
      },
      {
        text: "Push day",
      },
      {
        text: "Pull day",
      },
      {
        text: "All day",
      },
    ],
    type: "checkbox",
  },
];

// element selectors
const quizSection = document.querySelector(".quiz-section");
const quizImage = document.querySelector(".quiz-image");
const quizQuestion = document.querySelector(".quiz-question");
const quizQuestionTwo = document.querySelector(".q-large");
const quizAnswers = document.querySelector(".quiz-answers");
const nextBtn = document.querySelector(".next-btn");
const restartBtn = document.querySelector(".restart-btn");
const restartImage = document.querySelector(".restart-image");
const openEnded = document.querySelectorAll(".open-ended");
const closeEnded = document.querySelectorAll(".close-ended");
const quizHeading = document.querySelector(".quiz-heading h1");

// will display the 'next' button if needed
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});

restartBtn.addEventListener("click", () => {
  location.reload();
});

// for shuffling choices based questions
let shuffledQuestions, currentQuestionIndex;

const startGame = () => {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextQuestion();
};

const nextQuestion = () => {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

const showQuestion = (question) => {
  quizQuestion.textContent = question.question;
  quizQuestionTwo.textContent = question.question;
  quizImage.src = question.image;

  switch (question.type) {
    case "close-ended":
      question.answers.forEach((answer) => {
        const ansBtn = document.createElement("button");
        ansBtn.textContent = answer.text;
        ansBtn.classList.add("quiz-btn");
        ansBtn.classList.add("btn");

        if (answer.correct) ansBtn.dataset.correct = answer.correct;

        ansBtn.addEventListener("click", selectAnswer);
        quizAnswers.appendChild(ansBtn);
      });
      break;
    case "open-ended":
      const textBox = document.createElement("input");
      textBox.classList.add("textbox");
      textBox.placeholder = "Type here";
      textBox.addEventListener("keyup", () => {
        if (textBox.value) nextBtn.classList.remove("hide");
        else nextBtn.classList.add("hide");
      });
      quizAnswers.appendChild(textBox);
      break;
    case "dropdown":
      const dropdown = document.createElement("select");
      dropdown.addEventListener("change", selectDropdownAnswer);
      question.answers.forEach((answer) => {
        const option = new Option(answer.text, answer.text);
        dropdown.appendChild(option);
      });
      quizAnswers.appendChild(dropdown);
      break;
    case "checkbox":
      question.answers.forEach((answer) => {
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        const label = document.createElement("label");
        label.textContent = answer.text;
        label.classList.add("quiz-btn");
        label.classList.add("btn");
        label.classList.add("quiz-checkbox");
        label.appendChild(checkBox);

        label.addEventListener("click", selectCheckboxAnswer);
        quizAnswers.appendChild(label);
      });
      break;
  }
};

const resetState = () => {
  nextBtn.classList.add("hide");
  while (quizAnswers.firstChild) {
    quizAnswers.removeChild(quizAnswers.firstChild);
  }
};

const selectDropdownAnswer = () => {
  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
    if (shuffledQuestions.length == currentQuestionIndex + 1) {
      quizHeading.textContent = "Thank you for using the Jarvies Quiz App!";
      restartBtn.classList.remove("hide");
      nextBtn.classList.add("hide");
    }
  } else {
    restartImage.classList.remove("hide");
  }
};

const selectCheckboxAnswer = () => {
  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
    if (shuffledQuestions.length == currentQuestionIndex + 1) {
      quizHeading.textContent = "Thank you for using the Jarvies Quiz App!";
      restartBtn.classList.remove("hide");
      nextBtn.classList.add("hide");
    }
  } else {
    restartImage.classList.remove("hide");
  }
};

const selectAnswer = () => {
  Array.from(quizAnswers.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
    if (shuffledQuestions.length == currentQuestionIndex + 1) {
      quizHeading.textContent = "Thank you for using the Jarvies Quiz App!";
      restartBtn.classList.remove("hide");
      nextBtn.classList.add("hide");
    }
  } else {
    restartImage.classList.remove("hide");
  }
};

const setStatusClass = (element, correct) => {
  clearStatusClass(element);
  if (correct) element.classList.add("correct");
  else element.classList.add("wrong");
};

const clearStatusClass = (element) => {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};

startGame();
