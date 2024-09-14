import React, { useState, useEffect } from 'react';
import Question from './Question';

const Quiz = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        if (data.trivia_categories) {
          setCategories(data.trivia_categories);
        } else {
          console.error("Unexpected API response structure:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const startQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&type=multiple`);
      const data = await response.json();
      console.log("Quiz data fetched:", data);

      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
        setLoading(false);
        setQuizStarted(true);
      } else {
        console.error("No questions found in the API response:", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
      setLoading(false);
    }
  };

  if (loading && !quizStarted) return <div className="text-center text-xl text-gray-700">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Quiz App</h1>
        {!quizStarted ? (
          <div>
            <label className="block mb-4 text-lg font-semibold text-gray-700">Select Category:</label>
            <select 
              className="block w-full p-3 mb-6 border border-gray-300 rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button 
              className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors ${!selectedCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={startQuiz} 
              disabled={!selectedCategory}
            >
              Start Quiz
            </button>
          </div>
        ) : (
          questions.length > 0 ? (
            <Question 
              question={questions[currentQuestionIndex]} 
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              score={score}
              setScore={setScore}
              questions={questions} // Pass questions to Question component
            />
          ) : (
            <div className="text-center text-lg text-gray-700">No questions available.</div>
          )
        )}
      </div>
    </div>
  );
};

export default Quiz;
