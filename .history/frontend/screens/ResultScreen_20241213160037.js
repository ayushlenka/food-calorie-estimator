import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";

export default function ResultScreen({ route }) {
  const { prediction, imageUri } = route.params;
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const BACKEND_URL = "http://10.0.0.128:8000"; // Update with your backend IP if needed

  const calculateCalories = async () => {
    if (!weight) {
      alert("Enter weight to calculate calories!");
      console.log("Weight input is empty.");
      return;
    }

    console.log("Prediction:", prediction);
    console.log("Weight:", weight);

    try {
      console.log("Sending calorie calculation request...");
      const response = await axios.post(`${BACKEND_URL}/api/estimate_calories`, {
        food_name: prediction,
        weight: parseInt(weight),
      });
      console.log("Calories response received:", response.data);
      setCalories(response.data.calories);
    } catch (err) {
      if (err.response) {
        console.error("Server responded with error:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      alert("Error calculating calories. Check the logs for details.");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
        <Button title="Done" onPress={dismissKeyboard} />
        <Button title="Calculate Calories" onPress={calculateCalories} />
        {calories ? <Text>Calories: {calories}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
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
