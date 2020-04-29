import React, { useEffect, useState } from 'react';
import './style.css';

const Result = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="showMsg">
      <p>{message}</p>
    </div>
  );
};

export default Result;
