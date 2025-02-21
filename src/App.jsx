import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const apiUrl = 'https://bajaj-backend-v8ts.onrender.com/bfhl'; // Updated backend URL

  const handleSubmit = async () => {
    try {
      setError('');
      const parsedData = JSON.parse(inputData);
      const res = await axios.post(apiUrl, parsedData);
      setResponse(res);
      console.log("this is backend res: ", res);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Invalid JSON or server error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response.data;
    let filteredData = {};
    if (selectedOptions.includes('Numbers')) filteredData.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = alphabets;
    if (selectedOptions.includes('Highest Alphabet')) filteredData.highest_alphabet = highest_alphabet;
    return JSON.stringify(filteredData, null, 2);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">BFHL Frontend</h1>
      <textarea
        className="border p-2 w-full max-w-md"
        rows="4"
        placeholder='Enter JSON, e.g., {"data": ["A","C","z"]}'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleSubmit}>Submit</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
  <div className="mt-4">
    <label className="block font-medium mb-2">Select Data to View:</label>
    
    {/* Multi-select dropdown */}
    <select
      multiple
      className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
      onChange={(e) => {
        const selectedValues = [...e.target.selectedOptions].map(o => o.value);
        setSelectedOptions(selectedValues);
      }}
    >
      <option value="Numbers">Numbers</option>
      <option value="Alphabets">Alphabets</option>
      <option value="Highest Alphabet">Highest Alphabet</option>
    </select>

    {/* Display selected options */}
    {selectedOptions.length > 0 && (
      <div className="mt-2 p-2 bg-blue-100 rounded">
        <strong>Selected:</strong> {selectedOptions.join(", ")}
      </div>
    )}

    {/* Response rendering */}
    <pre className="bg-gray-200 p-4 mt-2">{renderResponse()}</pre>
  </div>
)}

    </div>
  );
}