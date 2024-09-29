import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
//import firebase from 'firebase/compat';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

function JobList({ navigation }) {
  const [jobs, setJobs] = useState();

  useEffect(() => {
    const db = getDatabase();
    const jobsRef = ref(db, "jobs");

    // Use the 'onValue' function to listen for changes in the 'Jobs' node
    onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // If data exists, set it in the 'jobs' state
        setJobs(data);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe the listener
      off(jobsRef);
    };
  }, []); // The empty dependency array means this effect runs only once

  // Vi viser ingenting hvis der ikke er data
  if (!jobs) {
    return <Text>Loading...</Text>;
  }

  const handleSelectJob = (id) => {
    /*Her søger vi direkte i vores array af jobs og finder job objektet som matcher idet vi har tilsendt*/
    const job = Object.entries(jobs).find((job) => job[0] === id /*id*/);
    navigation.navigate("Job Details", { job });
  };

  // Flatlist forventer et array. Derfor tager vi alle values fra vores jobs objekt, og bruger som array til listen
  const jobArray = Object.values(jobs);
  const jobKeys = Object.keys(jobs);

  return (
    <FlatList
      data={jobArray}
      // Vi bruger jobKeys til at finde ID på den aktuelle job og returnerer dette som key, og giver det med som ID til JobListItem
      keyExtractor={(item, index) => jobKeys[index]}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => handleSelectJob(jobKeys[index])}
          >
            <Text>
              {item.Beskrivelse} {item.Tid}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default JobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    height: 50,
    justifyContent: "center",
  },
  label: { fontWeight: "bold" },
});
