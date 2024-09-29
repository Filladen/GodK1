import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Button,
  Alert,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { getDatabase, ref, remove } from "firebase/database";

function JobDetails({ route, navigation }) {
  const [job, setJob] = useState({});

  useEffect(() => {
    /*Henter job values og sætter dem*/
    setJob(route.params.job[1]);

    /*Når vi forlader screen, tøm object*/
    return () => {
      setJob({});
    };
  });

  const visPåMinRute = () => {
    // Vi navigerer videre til EditJob skærmen
    const job = route.params.job;
    navigation.navigate("Rute", { Map });
  };

  // Vi spørger brugeren om han er sikker
  const confirmDelete = () => {
    /*Er det mobile?*/
    if (Platform.OS === "ios" || Platform.OS === "android") {
      Alert.alert("Are you sure?", "Do you want to delete the job?", [
        { text: "Cancel", style: "cancel" },
        // Vi bruger this.handleDelete som eventHandler til onPress
        { text: "Delete", style: "destructive", onPress: () => handleDelete() },
      ]);
    }
  };

  //al content
  return (
    <View style={styles.container}>
      {Object.entries(job).map((item, index) => {
        return (
          <View style={styles.row} key={index}>
            {/*Vores job keys navn*/}
            <Text style={styles.label}>{item[0]} </Text>
            {/*Vores job values navne */}
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        );
      })}
      <StatusBar style="auto" />
      <Button title="Vis på min rute" onPress={() => visPåMinRute()} />
      <Image
        source={{ uri: "https://i.imgur.com/curmJXo.png" }}
        style={styles.image}
      />
      <Text style={styles.text}>Lastkapacitet efter opgave: 76%</Text>
    </View>
  );
}

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  row: {
    marginVertical: 10,
    padding: 15,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    width: 120,
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#555",
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  image: {
    width: 250,
    height: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center", // Center the text
  },
});
