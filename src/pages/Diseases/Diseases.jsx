import React, { useState } from "react";
import axios from "axios";
import "./Diseases.scss";
import qrcode from "../../assets/qrcode.png";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const roboflowApiKey = process.env.REACT_APP_ROBOFLOW_API_KEY;



function Diseases() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
  const [result, setResult] = useState(null);
  const [aiResponseText, setAiResponseText] = useState("");

  const countClasses = (predictions) => {
    const classData = {};

    predictions.forEach((prediction) => {
      const className = prediction.class;

      if (classData[className]) {
        classData[className].count++;
        classData[className].totalConfidence += prediction.confidence;
      } else {
        classData[className] = {
          count: 1,
          totalConfidence: prediction.confidence,
        };
      }
    });

    // Calculate average confidence for each class
    for (const className in classData) {
      classData[className].averageConfidence =
        classData[className].totalConfidence / classData[className].count;
    }

    return classData;
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
      fetchTomatoDisease(imageBase64);
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


  const OpenAIComponent = async (predictions) => {
     
    const classData = countClasses(predictions); 
    const diseasesList = Object.keys(classData).join(", ");
    
    const fullPrompt = `List ways farmers deal with ${diseasesList}`;

    try {
      const response2 = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: fullPrompt,
          model: 'text-davinci-003',
          max_tokens: 100,
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response2);
    //   const aiResponseText = response2.data.choices[0].text;
    setAiResponseText(response2.data.choices[0].text);
    // sendMessage(response2.data.choices[0].text);

    } catch (error) {
      console.error("Error with OpenAI request:", error);
      throw error;
    }
  };


  async function fetchTomatoDisease(imageBase64) {


    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/tomato_diseases-zr57u/1",
        params: {
          api_key: "8w3m2VVWPU0w1H0faQtz",
        },
        data: imageBase64, // Send base64 image data
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // Handle the response data here
      console.log(response.data);

      setResult(response.data);

      if (response.data.predictions) {
        OpenAIComponent(response.data.predictions);
      }
    

    } catch (error) {
      // Handle errors here
      console.error("Error fetching tomatoes", error);
    }

  }

  return (
    <div>
      <h1>Tomato Disease Diagnostics</h1>
      <h2>Quarantine and manage diseases quickly</h2>
      {imagePreview && (
        <div>
          <h2>Selected Image:</h2>
          <img className="img--tomatoes" src={imagePreview} alt="Tomatoes" />
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
          {result.predictions.length === 0 ? (
            <img className="qrcode" src={qrcode} alt="qrcode" />
          ) : (
            Object.entries(countClasses(result.predictions)).map(
              ([crop, data]) => (
                <div key={crop}>
                  <h2>
                    {crop}: {data.count}
                  </h2>
                  <p>Average Confidence: {data.averageConfidence.toFixed(2)}</p>
                </div>
              )
            )
          )}
        </div>
      )}
      <div>
        {aiResponseText ? (
            <div className = "container--text">
            <h1 className="container__openai">Recommendations</h1>
            <p className="container__openai">{aiResponseText}</p>
            </div>
        ) : ( <>
        </>) }
      </div>
    </div>
  );
}

export default Diseases;
