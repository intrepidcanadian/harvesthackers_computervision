import React, { useState } from "react";
import axios from "axios";
import "./CropCounter.scss"

function CropCounter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
  const [result, setResult] = useState(null);

  const countClasses = (predictions) => {
    const classCounts = {};

    predictions.forEach(prediction => {
      const className = prediction.class;
      if (classCounts[className]) {
        classCounts[className]++;
      } else {
        classCounts[className] = 1;
      }
    });

    return classCounts;
  };

  // Function to handle the file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setSelectedFile(file);

        // Preview the selected image
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      };
    
  // Function to handle the image upload and API request
  const handleUpload = async () => {
    if (selectedFile) {
      // Convert the selected file to base64
      const imageBase64 = await convertToBase64(selectedFile);

      // Make the API request with the base64 data
      fetchStrawberryCount(imageBase64);
    } else {
      alert("Please select an image before uploading.");
    }
  };


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Extract base64 data part
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  async function fetchStrawberryCount(imageBase64) {
    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/strawberry_counting/1",
        params: {
          api_key: "8w3m2VVWPU0w1H0faQtz",
        },
        data: imageBase64, // Send base64 image data
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      });
      // Handle the response data here
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching strawberry count:", error);
    }
  }
  

  return (
    <div>
      <h1>Counting Crop Inventory</h1>
      <h2>Red Strawberries</h2>
      {imagePreview && (
        <div>
          <h2>Selected Image:</h2>
          <img className = "img--strawberry" src={imagePreview} alt="Strawberry" />
        </div>
      )}
      <input
        type="file"
        accept="image/*" // Allow only image files to be selected
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Image</button>
      {result && (
        <div>
          {Object.entries(countClasses(result.predictions)).map(([crop, count]) => (
            <h2 key={crop}>{crop}: {count}</h2>
          ))}
        </div>
      )}


    </div>
  );
}

export default CropCounter;
