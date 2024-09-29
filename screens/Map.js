import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

function Map() {
  return (
    <View style={styles.container}>
      
      <Image
                source={{ uri: 'https://cdn.arstechnica.net/wp-content/uploads/2022/09/3.jpg' }} 
                style={styles.image}
      />
      <Text style={styles.text}>Funktionalitet kommer senere...</Text>
    </View>
  );
}
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
