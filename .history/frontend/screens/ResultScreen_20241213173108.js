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
  Alert,
} from "react-native";
import axios from "axios";

export default function ResultScreen({ route }) {
  const {
    prediction,
    imageUri = null,
    isComparison = false,
    selectedModel = "mobilenet",
  } = route.params || {};

  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState({});

  console.log("Route Params:", route.params); // Debugging log
  console.log("Prediction:", prediction); // Debugging log

  const calculateCalories = async () => {
    if (!weight) {
      Alert.alert("Error", "Please enter the weight!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/estimate_calories",
        { food_name: prediction, weight: parseInt(weight) }
      );
      console.log("Calories Response:", response.data); // Debugging log
      setCalories({ [selectedModel]: response.data.calories });
    } catch (err) {
      console.error("Error calculating calories:", err);
      Alert.alert("Error", "Failed to calculate calories.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {prediction && (
          <>
            <Text style={styles.heading}>Prediction:</Text>
            <Text style={styles.predictionText}>{prediction}</Text>
          </>
        )}

        <TextInput
          placeholder="Enter weight (grams)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />
        <Button title="Calculate Calories" onPress={calculateCalories} />
        {calories[selectedModel] && (
          <Text style={styles.calories}>
            Calories: {calories[selectedModel]} kcal
          </Text>
        )}
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
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  predictionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  calories: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});
