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
  const { prediction, imageUri, isComparison } = route.params;
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState({}); // Store calories for both models
  const BACKEND_URL = "http://10.0.0.128:8000"; // Update with your backend IP if needed

  const calculateCalories = async () => {
    if (!weight) {
      alert("Enter weight to calculate calories!");
      return;
    }

    const newCalories = {};
    try {
      for (const [model, food] of Object.entries(prediction)) {
        console.log(`Calculating calories for ${food} (Model: ${model})...`);
        const response = await axios.post(`${BACKEND_URL}/api/estimate_calories`, {
          food_name: food,
          weight: parseInt(weight),
        });
        newCalories[model] = response.data.calories;
      }
      setCalories(newCalories);
    } catch (err) {
      console.error("Error calculating calories:", err);
      alert("Error calculating calories. Check the logs for details.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        {isComparison ? (
          <View>
            <Text>Model Comparison Results:</Text>
            {Object.entries(prediction).map(([model, food]) => (
              <View key={model} style={styles.result}>
                <Text>
                  {model}: {food}
                </Text>
                {calories[model] && (
                  <Text>Calories: {calories[model]}</Text>
                )}
              </View>
            ))}

            <TextInput
              placeholder="Enter weight (grams)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
            />
            <Button title="Calculate Calories" onPress={calculateCalories} />
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
            <Button
              title="Calculate Calories"
              onPress={() =>
                calculateCalories({ [selectedModel]: prediction })
              }
            />
            {calories && <Text>Calories: {calories}</Text>}
          </View>
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
