import React, { useState, ChangeEvent } from 'react';

const Example: React.FunctionComponent = () => {

  const [value, setValue] = useState('');
  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  
  return (
    <div>
      <input value={value} onChange={handleSetValue} />
    </div>
  );
}

export default Example;
