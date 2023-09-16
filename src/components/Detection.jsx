import React, { useState } from 'react';
import axios from 'axios';

function Detection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await axios.post(
          'https://detect.roboflow.com/strawberry_counting/1',
          formData,
          {
            params: {
              api_key: '8w3m2VVWPU0w1H0faQtz',
            },
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Assuming the response.data contains your result
        setResult(response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <h2>Image Detection</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Detection;
