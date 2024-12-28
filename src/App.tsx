import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Sample compliance questions
const complianceQuestions = [
  {
    id: 1,
    question: 'Does your firm have written policies and procedures?',
    category: 'Documentation',
    importance: 'Critical'
  },
  {
    id: 2,
    question: 'Is your Form ADV up to date and filed within required deadlines?',
    category: 'Regulatory Filings',
    importance: 'Critical'
  },
  {
    id: 3,
    question: 'Do you maintain records of all client transactions and communications?',
    category: 'Record Keeping',
    importance: 'High'
  }
];

const ComplianceTest = () => {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = () => {
    const totalQuestions = complianceQuestions.length;
    const answeredYes = Object.values(answers).filter(answer => answer === 'yes').length;
    return {
      score: (answeredYes / totalQuestions) * 100,
      totalQuestions,
      compliantItems: answeredYes,
      nonCompliantItems: totalQuestions - answeredYes
    };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderQuestion = (question) => (
    <Card key={question.id} className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">
          {question.question}
        </CardTitle>
        <div className="text-sm text-gray-500">
          Category: {question.category} | Importance: {question.importance}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer(question.id, 'yes')}
            className={`px-4 py-2 rounded ${
              answers[question.id] === 'yes' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(question.id, 'no')}
            className={`px-4 py-2 rounded ${
              answers[question.id] === 'no' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200'
            }`}
          >
            No
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => {
    const results = calculateResults();
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Compliance Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              Overall Score: {results.score.toFixed(1)}%
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-100 rounded">
                <div className="font-semibold">Compliant Items</div>
                <div className="text-xl">{results.compliantItems}</div>
              </div>
              <div className="p-4 bg-red-100 rounded">
                <div className="font-semibold">Non-Compliant Items</div>
                <div className="text-xl">{results.nonCompliantItems}</div>
              </div>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Review Answers
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">RIA Compliance Test</h1>
      {showResults ? (
        renderResults()
      ) : (
        <div>
          {complianceQuestions.map(renderQuestion)}
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={Object.keys(answers).length !== complianceQuestions.length}
          >
            Submit Test
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplianceTest;