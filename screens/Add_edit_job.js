import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { getDatabase, ref, push, update } from "firebase/database";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import datetime picker

function Add_edit_job({ navigation, route }) {
  const db = getDatabase();

  const initialState = {
    Beskrivelse: "",
    Højde: "",
    Bredde: "",
    Længde: "",
    Destination: "",
    Tid: "", // Tid feltet som string
  };

  const [newJob, setNewJob] = useState(initialState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // For date picker

  /*Returnere true, hvis vi er på Edit job*/
  const isEditJob = route.name === "Edit job";

  useEffect(() => {
    if (isEditJob) {
      const job = route.params.job[1];
      setNewJob(job);
    }
    return () => {
      setNewJob(initialState);
    };
  }, []);

  const changeTextInput = (name, event) => {
    setNewJob({ ...newJob, [name]: event });
  };

  // Håndter dato og tid fra date picker
  const handleConfirm = (selectedDate) => {
    if (selectedDate) {
      console.log("Valgt dato:", selectedDate); // Tjek om datoen vælges korrekt
      const formattedDate = selectedDate.toLocaleString(); // Formatter datoen
      setNewJob({ ...newJob, Tid: formattedDate }); // Opdater feltet med den valgte dato
    }
    setDatePickerVisibility(false); // Sørg for at modal-vinduet lukkes
  };

  // Gemmer jobbet i databasen
  const handleSave = async () => {
    const { Beskrivelse, Højde, Bredde, Længde, Destination, Tid } = newJob;

    if (
      Beskrivelse.length === 0 ||
      Højde.length === 0 ||
      Bredde.length === 0 ||
      Længde.length === 0 ||
      Destination.length === 0 ||
      Tid.length === 0
    ) {
      return Alert.alert("Et af felterne er tomme!");
    }

    if (isEditJob) {
      const id = route.params.job[0];
      const jobRef = ref(db, `jobs/${id}`);
      const updatedFields = {
        Beskrivelse,
        Højde,
        Bredde,
        Længde,
        Destination,
        Tid,
      };

      await update(jobRef, updatedFields)
        .then(() => {
          Alert.alert("Din info er nu opdateret");
          const job = newJob;
          navigation.navigate("job Details", { job });
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
        });
    } else {
      const jobsRef = ref(db, "/jobs/");
      const newjobData = {
        Beskrivelse,
        Højde,
        Bredde,
        Længde,
        Destination,
        Tid,
      };

      await push(jobsRef, newjobData)
        .then(() => {
          Alert.alert("Saved");
          setNewJob(initialState);
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`);
        });
    }
  };
// Returnerer en ScrollView med alle felterne, som brugeren skal udfylde
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialState).map((key, index) => {
          if (key === "Tid") {
            // Til Tid-feltet skal der være en TouchableOpacity, som åbner DateTimePicker
            return (
              <TouchableOpacity
                key={index}
                style={styles.row}
                onPress={() => {
                  console.log("Felt trykket"); // Debugging: Print til console, når trykket sker
                  setDatePickerVisibility(true);
                }}
              >
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  value={newJob[key]}
                  style={styles.input}
                  editable={false} // Gør feltet read-only
                />
              </TouchableOpacity>
            );
          } else {
            return (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>{key}</Text>
                <TextInput
                  value={newJob[key]}
                  onChangeText={(event) => changeTextInput(key, event)}
                  style={styles.input}
                />
              </View>
            );
          }
        })}
        <Button
          title={isEditJob ? "Save changes" : "Add job"}
          onPress={() => handleSave()}
        />
      </ScrollView>

      {/* DateTimePicker for Tid-feltet */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)} // Luk modal ved annullering
      />
    </SafeAreaView>
  );
}

export default Add_edit_job;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  row: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
});
