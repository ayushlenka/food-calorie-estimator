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
  const {
    prediction = {},
    imageUri = null,
    isComparison = false,
    selectedModel = "mobilenet",
  } = route.params || {};

  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState({});
  const BACKEND_URL = "http://10.0.0.128:8000";

  console.log("Route Params:", route.params); // Debugging log

  const calculateCalories = async () => {
    if (!weight) {
      alert("Enter weight to calculate calories!");
      return;
    }

    try {
      if (isComparison) {
        const newCalories = {};
        for (const [model, food] of Object.entries(prediction)) {
          const response = await axios.post(`${BACKEND_URL}/api/estimate_calories`, {
            food_name: food,
            weight: parseInt(weight),
          });
          newCalories[model] = response.data.calories;
        }
        setCalories(newCalories);
      } else {
        const foodName = prediction[selectedModel];
        if (!foodName) {
          alert("Prediction for the selected model is missing.");
          return;
        }
        const response = await axios.post(`${BACKEND_URL}/api/estimate_calories`, {
          food_name: foodName,
          weight: parseInt(weight),
        });
        setCalories({ [selectedModel]: response.data.calories });
      }
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
            <Text style={styles.heading}>Model Comparison Results:</Text>
            {Object.entries(prediction).map(([model, food]) => (
              <View key={model} style={styles.result}>
                <Text>{`${model}: ${food}`}</Text>
                {calories[model] ? (
                  <Text>{`Calories: ${calories[model]} kcal`}</Text>
                ) : (
                  <Text>Calories: N/A</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.heading}>Prediction:</Text>
            <Text>{typeof prediction === "string" ? prediction : prediction[selectedModel]}</Text>
          </View>
        )}

        <TextInput
          placeholder="Enter weight (grams)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          style={styles.input}
        />
        <Button title="Calculate Calories" onPress={calculateCalories} />
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
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  result: {
    marginVertical: 10,
    alignItems: "center",
  },
});
