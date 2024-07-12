import React, { useState, useEffect } from 'eact';
import axios from 'axios';

function App() {
  const [id, setId] = useState('p'); // default ID
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchNumbers();
  }, [id]);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:9876/${id}`);
      const data = response.data;
      setWindowPrevState(data.windowPrevState);
      setWindowCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAvg(data.avg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={id} onChange={handleIdChange}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <p>
        Window Previous State: {windowPrevState.join(', ')}
      </p>
      <p>
        Window Current State: {windowCurrState.join(', ')}
      </p>
      <p>
        Numbers: {numbers.join(', ')}
      </p>
      <p>
        Average: {avg}
      </p>
    </div>
  );
}

export default App;