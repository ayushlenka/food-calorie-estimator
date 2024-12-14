import React, { useState } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import CameraComponent from "../components/CameraComponent";
import axios from "axios";

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [weight, setWeight] = useState("");
  const [prediction, setPrediction] = useState("");
  const [calories, setCalories] = useState("");

  const handleClassifyImage = async () => {
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
        "http://127.0.0.1:8000/api/classify?model_name=mobilenet",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPrediction(response.data.predicted_food);
    } catch (error) {
      console.error(error);
      alert("Error classifying the image.");
    }
  };

  const handleCalculateCalories = async () => {
    if (!prediction || !weight) {
      alert("Please classify the image and enter the weight!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/estimate_calories", {
        food_name: prediction,
        weight: Number(weight),
      });

      setCalories(response.data.calories);
    } catch (error) {
      console.error(error);
      alert("Error calculating calories.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <CameraComponent setImageUri={setImageUri} />

      {imageUri && (
        <Image source={{ uri: imageUri }} className="w-40 h-40 mt-4 rounded-md" />
      )}

      <Button title="Classify Image" onPress={handleClassifyImage} />
      {prediction && (
        <Text className="text-lg font-semibold text-blue-700 mt-4">
          Predicted: {prediction}
        </Text>
      )}

      <TextInput
        placeholder="Enter weight (grams)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        className="border border-gray-300 rounded-md p-2 my-4 w-40"
      />
      <Button title="Calculate Calories" onPress={handleCalculateCalories} />
      {calories && (
        <Text className="text-lg font-semibold text-green-700 mt-4">
          Calories: {calories}
        </Text>
      )}
    </View>
  );
}
