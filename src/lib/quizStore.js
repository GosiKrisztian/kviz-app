export let quizzes = [];

export const addQuiz = (quiz) => {
  const index = quizzes.findIndex(q => q.id === quiz.id);
  if (index !== -1) {
    quizzes[index] = quiz;
  } else {
    quizzes.push(quiz);
  }
};

export const getQuizzes = () => {
  return [...quizzes];
};
