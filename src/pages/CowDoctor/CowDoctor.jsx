import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CowDoctor.scss";
import qrcode from "../../assets/qrcode.png";

function CowDoctor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [response, setResponse] = useState("");
  // const [OpenAIresponse, setOpenAIResponse] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchCowPoop = async (imageBase64) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://classify.roboflow.com/cow-poop/1",
        params: { api_key: "E3CxuGNdzksUx1IkIZTv" },
        data: imageBase64,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cow data:", error);
      throw error;
    }
  };

  // useEffect(() => {
  //   if (result && result.top) {
  //     OpenAIComponent().catch((error) => {
  //       console.error("Error in OpenAIComponent:", error);
  //     });
  //   }
  // }, [result]);


  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image before uploading.");
      return;
    }

    try {
      const imageBase64 = await convertToBase64(selectedFile);
      const cowPoopResult = await fetchCowPoop(imageBase64);
      setResult(cowPoopResult);
    } catch (error) {
      console.error("Error in handleUpload:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <div>
      <h1>Cow Doctor</h1>
      <h2>We help you heal your cow and text you when they are sick</h2>
      {imagePreview && (
        <div>
          <h2>Selected Image:</h2>
          <img className="img--cows" src={imagePreview} alt="cowdoctor" />
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {result && (
        <div>
          <h3>Top Prediction:</h3>
          <p>Class: {result.top} Confidence: {result.confidence}</p>
        </div>
      )}

      {/* {OpenAIresponse && (
        <div>
          <p className ="container__openai">{OpenAIresponse}</p>
        </div> */}
      {/* )} */}
    </div>
  );
}

export default CowDoctor;
