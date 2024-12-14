import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [weight, setWeight] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permissions...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Camera
        style={StyleSheet.absoluteFillObject}
        ref={(ref) => setCamera(ref)}
      />
      <View className="absolute bottom-0 w-full p-4 bg-white rounded-t-lg">
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Enter weight (in grams)"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <Button
          title="Take Picture"
          onPress={async () => {
            if (camera) {
              const photo = await camera.takePictureAsync();
              setImageUri(photo.uri);
            }
          }}
        />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            className="w-40 h-40 mt-4 rounded-md"
          />
        )}
      </View>
    </View>
  );
}
