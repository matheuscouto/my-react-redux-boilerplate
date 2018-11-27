import React, { useState, ChangeEvent } from 'react';
import './App.css';

function App () {

  const [value, setValue] = useState('');
  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  
  return (
    <div className="App">
      <input value={value} onChange={handleSetValue} />
    </div>
  );
}

export default App;
