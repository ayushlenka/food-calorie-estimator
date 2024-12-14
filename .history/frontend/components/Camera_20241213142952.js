import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
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
    return <Text>Requesting camera permissions...</Text>;
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
    <View className="w-full items-center">
      <Camera ref={(ref) => setCamera(ref)} style={{ width: 300, height: 300 }} />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}
