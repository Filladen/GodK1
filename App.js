import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";


import JobList from "./screens/JobList";
import JobDetails from "./screens/JobDetails";
import Add_edit_job from "./screens/Add_edit_job";
import Map from "./screens/Map";

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlbOWx0zUf_3EpFeJkbLGT8xq178pED-4",
  authDomain: "godkendone.firebaseapp.com",
  projectId: "godkendone",
  databaseURL:
    "https://godkendone-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "godkendone.appspot.com",
  messagingSenderId: "903511451964",
  appId: "1:903511451964:web:cbdd290538444653895639",
};

export default function App() {
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
    // Initialize other firebase products here
  }

  /* Man kan også lave screens og components her i stedet for at have dem i forskellige filer. 
  Dette er dog kun anbefalet til små projekter, da det ellers hurtigt kan blive uoverskueligt.
  */

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={"Job List"}
          component={JobList}
          options={{ headerShown: null }}
        />
        <Stack.Screen
          name={"Job Details"}
          component={JobDetails}
          options={{ headerShown: null }}
        />
        <Stack.Screen
          name={"Edit Job"}
          component={Add_edit_job}
          options={{ headerShown: null }}
        />
      </Stack.Navigator>
    );
  };

  const BottomNavigation = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name={"Mulige opgaver"}
            component={StackNavigation}
            options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
          />
          <Tab.Screen
            name={"Lav Ordre"}
            component={Add_edit_job}
            options={{
              tabBarIcon: () => <Ionicons name="add" size={20} />,
            }}
          />
          <Tab.Screen
            name={"Rute"}
            component={Map}
            options={{ tabBarIcon: () => <Ionicons name="map" size={20} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  return <BottomNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
