import React from 'react';

const Question = ({ question, currentQuestionIndex, setCurrentQuestionIndex, score, setScore, questions }) => {
  const { question: questionText, correct_answer, incorrect_answers } = question;
  const options = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);

  const handleAnswerClick = (answer) => {
    if (answer === correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz finished! Your score is ${score + (answer === correct_answer ? 1 : 0)}/10`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{questionText}</h2>
      <div className="flex flex-col gap-3 mb-4">
        {options.map(option => (
          <button 
            key={option} 
            onClick={() => handleAnswerClick(option)}
            className="py-3 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          className="py-2 px-4 bg-gray-500 text-white font-medium rounded-md shadow-md hover:bg-gray-600 transition-colors"
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        <button 
          onClick={() => {
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
              alert(`Quiz finished! Your score is ${score}/10`);
            }
          }}
          className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition-colors"
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;
