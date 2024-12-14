import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import ImagePickerComponent from "../components/ImagePickerComponent";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const BACKEND_URL = "http://127.0.0.1:8000"; // Update with your backend IP if needed

  const classifyImage = async () => {
    if (!imageUri) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri.replace("file://", ""), // Remove 'file://' prefix if needed
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      console.log("Sending request to classify image...");
      const response = await axios.post(
        `${BACKEND_URL}/api/classify?model_name=resnet`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response received:", response.data);
      navigation.navigate("Results", {
        prediction: response.data.predicted_food,
        imageUri,
      });
    } catch (err) {
      console.error("Error classifying image:", err);
      alert("Error classifying image");
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent setImageUri={setImageUri} />
      <Button title="Classify Image" onPress={classifyImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
