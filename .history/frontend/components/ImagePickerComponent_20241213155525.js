import React from "react";
import { View, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerComponent({ setImageUri }) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image Picker Result:", result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Use the selected image URI
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
