import React, { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function ResultScreen({ route }) {
  const { prediction, imageUri } = route.params;
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");

  const BACKEND_URL = "http://10.0.0.128:8000"; // Update with your backend IP if needed

  const calculateCalories = async () => {
    if (!weight) {
      alert("Enter weight to calculate calories!");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/estimate_calories`, {
        food_name: prediction,
        weight: parseInt(weight),
      });
      setCalories(response.data.calories);
    } catch (err) {
      console.error("Error calculating calories:", err);
      alert("Error calculating calories");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text>Prediction: {prediction}</Text>
      <TextInput
        placeholder="Enter weight (grams)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <Button title="Calculate Calories" onPress={calculateCalories} />
      {calories ? <Text>Calories: {calories}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
});
