import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ImageUpload = ({ photoUri, onUpload }) => {
  const handleUpload = () => {
    if (photoUri) {
      onUpload(photoUri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleUpload}>
      <Text style={styles.uploadButton}>Upload</Text>
    </TouchableOpacity>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 20,
  },
  uploadButton: {
    fontSize: 18,
    marginBottom: 20,
    color: "#fff",
  },
});
