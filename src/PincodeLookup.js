import React, { useState } from 'react';

const PincodeLookup = () => {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [postalData, setPostalData] = useState([]);

  const handleLookup = () => {
    setLoading(true);
    setError('');

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0 && data[0].Status === 'Success') {
          setPostalData(data[0].PostOffice);
        } else {
          setError('No data found for this pincode.');
        }
      })
      .catch(error => {
        setError('Error fetching data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setPincode(e.target.value);
  };

  return (
    <div className="pincode-lookup">
      <h1>Pincode Lookup</h1>
      <input
        type="text"
        value={pincode}
        onChange={handleChange}
        placeholder="Enter Pincode"
      />
      <button onClick={handleLookup}>Lookup</button>

      {loading && <div className="loader">Loading...</div>}
      
      {error && <div className="error">{error}</div>}

      <div className="postal-data">
        {postalData.map((postOffice, index) => (
          <div key={index} className="post-office">
            <p><strong>Post Office Name:</strong> {postOffice.Name}</p>
            <p><strong>Pincode:</strong> {postOffice.Pincode}</p>
            <p><strong>District:</strong> {postOffice.District}</p>
            <p><strong>State:</strong> {postOffice.State}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PincodeLookup;
