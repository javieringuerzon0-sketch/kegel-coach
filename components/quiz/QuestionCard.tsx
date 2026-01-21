import React, { useState, useEffect } from 'react';
import { Question, LocalizedString } from '../../types';
import OptionButton from './OptionButton';

interface QuestionCardProps {
  question: Question;
  onSelect: (value: string) => void;
  language: string;
  t: (ls: LocalizedString | string) => string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, t }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Reset local selection state when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <div className="w-full max-w-xl mx-auto py-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-10 leading-tight tracking-tight uppercase">
        {t(question.text)}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            label={t(option.label)}
            selected={selectedOption === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;