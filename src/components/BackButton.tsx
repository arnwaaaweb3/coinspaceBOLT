import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleBack}
      className="back-button"
      aria-label="Back to Home"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;