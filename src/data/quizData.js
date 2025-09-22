export const quizData = {
  Physics: {
    Mechanics: [
      {
        id: "p_q1",
        text: "Which of Newton's laws is also known as the law of inertia?",
        options: [
          { id: "a", text: "First Law" },
          { id: "b", text: "Second Law" },
          { id: "c", text: "Third Law" },
        ],
        correctAnswerId: "a",
      },
      {
        id: "p_q2",
        text: "What is the unit of Force?",
        options: [
          { id: "a", text: "Joule" },
          { id: "b", text: "Watt" },
          { id: "c", text: "Newton" },
        ],
        correctAnswerId: "c",
      },
      {
        id: "p_q3",
        text: "Work is done only when an object is...",
        options: [
          { id: "a", text: "Stationary" },
          { id: "b", text: "Displaced" },
          { id: "c", text: "Charged" },
        ],
        correctAnswerId: "b",
      },
    ],
    Thermodynamics: [
      {
        id: "p_q4",
        text: "What does the First Law of Thermodynamics state?",
        options: [
          { id: "a", text: "Energy cannot be created or destroyed" },
          { id: "b", text: "Entropy always increases" },
          { id: "c", text: "Absolute zero is unattainable" },
        ],
        correctAnswerId: "a",
      },
      {
        id: "p_q5",
        text: "What is the process with no heat transfer called?",
        options: [
          { id: "a", text: "Isothermal" },
          { id: "b", text: "Adiabatic" },
          { id: "c", text: "Isobaric" },
        ],
        correctAnswerId: "b",
      },
    ],
  },
  Chemistry: {
    "Atomic Structure": [
      {
        id: "c_q1",
        text: "Who discovered the electron?",
        options: [
          { id: "a", text: "Rutherford" },
          { id: "b", text: "J.J. Thomson" },
          { id: "c", text: "Chadwick" },
        ],
        correctAnswerId: "b",
      },
      {
        id: "c_q2",
        text: "What is the charge of a neutron?",
        options: [
          { id: "a", text: "Positive" },
          { id: "b", text: "Negative" },
          { id: "c", text: "Neutral" },
        ],
        correctAnswerId: "c",
      },
    ],
    "Chemical Bonding": [
      {
        id: "c_q3",
        text: "What type of bond is formed by sharing electrons?",
        options: [
          { id: "a", text: "Ionic Bond" },
          { id: "b", text: "Covalent Bond" },
          { id: "c", text: "Metallic Bond" },
        ],
        correctAnswerId: "b",
      },
    ],
  },
  // Add more dummy quizzes for other subjects here
};
