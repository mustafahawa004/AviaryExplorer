import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = ({ imageUrl }) => {
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performInference = async () => {
      try {
        // Send the image URL to your backend server
        const response = await axios.post(`http://localhost:5000/infer`, {
          url: imageUrl,
        });

        // Set the result data
        setResultData(response.data.predictions);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    performInference();
  }, [imageUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {resultData.map((item, index) => (
          <li key={index}>
            Class: {item.class}, Confidence: {item.confidence}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
