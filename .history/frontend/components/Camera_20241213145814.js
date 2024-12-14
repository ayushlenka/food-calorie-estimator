import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

export default function CameraComponent({ setImageUri }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImageUri(photo.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={StyleSheet.absoluteFillObject} ref={(ref) => setCamera(ref)} />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}
