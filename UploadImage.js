import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ImageUpload = ({ photoUri, onUpload }) => {
  const handleUpload = () => {
    if (photoUri) {
      onUpload(photoUri);
    }
  };

  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-end",
        alignItems: "center",
        margin: 20,
      }}
      onPress={handleUpload}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
        Upload
      </Text>
    </TouchableOpacity>
  );
};

export default ImageUpload;
