import React, { useState } from "react";
import { View, Text, Button, Image, TextInput } from "react-native";
import Camera from "../components/Camera";
import axios from "axios";

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");

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
        "http://127.0.0.1:8000/api/classify?model_name=mobilenet",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setPrediction(response.data.predicted_food);
    } catch (err) {
      console.error(err);
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
        "http://127.0.0.1:8000/api/estimate_calories",
        { food_name: prediction, weight: parseInt(weight) }
      );
      setCalories(response.data.calories);
    } catch (err) {
      console.error(err);
      alert("Error calculating calories");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Camera setImageUri={setImageUri} />

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
