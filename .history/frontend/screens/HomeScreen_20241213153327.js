import React, { useState } from "react";
import { View, Text, Button, Image, TextInput } from "react-native";
import CameraComponent from "../components/Camera"; // Fix: Import as CameraComponent
import axios from "axios";

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");

  const BACKEND_URL = "http://192.168.x.x:8000"; // Replace with your local machine's IP

  const classifyImage = async () => {
    if (!imageUri) {
      alert("Please take a picture first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/classify?model_name=mobilenet`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Classification Response:", response.data);
      setPrediction(response.data.predicted_food);
    } catch (err) {
      console.error("Error classifying image:", err);
      alert("Error classifying image");
    }
  };

  const calculateCalories = async () => {
    if (!prediction || !weight) {
      alert("Enter weight and classify the image first!");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/estimate_calories`,
        { food_name: prediction, weight: parseInt(weight) }
      );
      console.log("Calories Response:", response.data);
      setCalories(response.data.calories);
    } catch (err) {
      console.error("Error calculating calories:", err);
      alert("Error calculating calories");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CameraComponent setImageUri={setImageUri} />

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}

      <Button title="Classify Image" onPress={classifyImage} />
      {prediction && <Text>Prediction: {prediction}</Text>}

      <TextInput
        placeholder="Enter weight (grams)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
        }}
      />
      <Button title="Calculate Calories" onPress={calculateCalories} />
      {calories && <Text>Calories: {calories}</Text>}
    </View>
  );
}
