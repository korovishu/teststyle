import React, { useEffect } from 'react';
import { useState } from 'react';

const Title = ({ title }) => {
  const [currentValue, setCurrentValue] = useState(title); // you can manage data with it
  useEffect(() => {
    setCurrentValue(title);
  }, [title]);
  return (
    <input
      value={currentValue}
      onChange={e => {
        setCurrentValue(e.target.value);
      }}
      className="block border-none my-4 px-2 focus:border-none focus:outline-none text-2xl font-bold"
    />
  );
};

export default Title;
