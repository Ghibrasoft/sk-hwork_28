import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ImageUpload from "./UploadImage";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await MediaLibrary.requestPermissionsAsync();

      setHasPermission(
        cameraStatus === "granted" && mediaLibraryStatus === "granted"
      );
    })();
  }, []);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync();

      if (mediaLibraryPermission === "granted") {
        setPhotoUri(photo.uri);
        savePhoto(photo.uri);
      } else {
        console.log("Media library write permission not granted.");
      }
    }
  };

  const savePhoto = async (photoUri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(photoUri);
      console.log("Photo saved to library successfully.");
    } catch (error) {
      console.error("Error saving photo to library:", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.frame} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={handleCameraType}
            >
              <Text style={styles.buttonText}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureInnerButton} />
            </TouchableOpacity>
          </View>
          <ImageUpload photoUri={photoUri} onUpload={savePhoto} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    margin: 5,
    height: "65%",
    top: "15%",
  },
  overlay: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    aspectRatio: 3 / 4,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    bottom: 40,
    width: "100%",
    height: "20%",
    paddingHorizontal: 20,
  },
  flipButton: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    right: 0,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInnerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});
