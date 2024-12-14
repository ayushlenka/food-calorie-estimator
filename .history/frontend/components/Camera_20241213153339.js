import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";

export default function CameraComponent({ setImageUri }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Handle permission state
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Capture photo
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log("Picture taken:", photo.uri);
      setImageUri(photo.uri);
    } else {
      console.error("Camera reference is not set.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        ref={(ref) => setCameraRef(ref)}
      />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}
