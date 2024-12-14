import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function ResultScreen({ route }) {
  const { prediction, imageUri, isComparison } = route.params;
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const BACKEND_URL = "http://127.0.0.1:8000"; // Update with your backend IP if needed

  const calculateCalories = async (food) => {
    if (!weight) {
      alert("Enter weight to calculate calories!");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/estimate_calories`, {
        food_name: food,
        weight: parseInt(weight),
      });
      setCalories(response.data.calories);
    } catch (err) {
      console.error("Error calculating calories:", err);
      alert("Error calculating calories.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {isComparison ? (
        <View>
          <Text>Model Comparison Results:</Text>
          {Object.entries(prediction).map(([model, food]) => (
            <View key={model} style={styles.result}>
              <Text>{model}: {food}</Text>
              <Button
                title={`Calculate Calories for ${food}`}
                onPress={() => calculateCalories(food)}
              />
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text>Prediction: {prediction}</Text>
          <TextInput
            placeholder="Enter weight (grams)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            style={styles.input}
          />
          <Button title="Calculate Calories" onPress={() => calculateCalories(prediction)} />
          {calories ? <Text>Calories: {calories}</Text> : null}
        </View>
      )}
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
  result: {
    marginVertical: 10,
    alignItems: "center",
  },
});
