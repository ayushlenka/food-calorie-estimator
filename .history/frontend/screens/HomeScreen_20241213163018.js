import React, { useState } from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated Picker import
import ImagePickerComponent from "../components/ImagePickerComponent";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [selectedModel, setSelectedModel] = useState("mobilenet"); // Default model
  const BACKEND_URL = "http://10.0.0.128:8000"; // Update with your backend IP if needed

  const classifyImage = async () => {
    if (!imageUri) {
      alert("Please select an image first!");
      console.log("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri.replace("file://", ""), // Remove 'file://' prefix if needed
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      console.log(`Sending classification request to ${selectedModel}...`);
      const response = await axios.post(
        `${BACKEND_URL}/api/classify?model_name=${selectedModel}`,
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
      alert("Error classifying image. Check the logs for details.");
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent setImageUri={setImageUri} />

      <Text style={styles.label}>Select Model:</Text>
      <Picker
        selectedValue={selectedModel}
        onValueChange={(itemValue) => setSelectedModel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="MobileNet" value="mobilenet" />
        <Picker.Item label="ResNet" value="resnet" />
        <Picker.Item label="EfficientNet" value="efficientnet" />
      </Picker>

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
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    width: "80%",
    marginVertical: 10,
  },
});
