import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const classifyImage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      console.log("Sending classification request...");
      const response = await axios.post(
        "http://10.0.0.128:8000/api/classify?model_name=mobilenet",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response received:", response.data);
      navigation.navigate("ResultScreen", {
        imageUri: imageUri,
        prediction: response.data.predicted_food,
        isComparison: false,
      });
    } catch (err) {
      console.error("Error classifying image:", err);
      Alert.alert("Error", "Failed to classify the image.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
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
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
});
