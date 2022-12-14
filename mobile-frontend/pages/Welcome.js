import { HStack } from "native-base";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Welcome = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    mainViewStyles: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    headerStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      fontWeight: "800",
      fontSize: 40,
    },
    buttonContainerStyles: {
      borderColor: colorScheme === "dark" ? "white" : "black",
      borderWidth: 1,
      borderRadius: 25,
      padding: 10,
      height: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    buttonTextStyles: {
      color: "white",
      fontWeight: "600",
      fontSize: 22,
    },
    buttonStyles: {
      backgroundColor: "#4A61B2",
      borderRadius: 25,
      margin: 10,
      paddingHorizontal: 50,
      height: 150,
      width: "95%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <>
      <SafeAreaView>
        <View style={styles.mainViewStyles}>
          <Text style={styles.headerStyles}>Welcome to{"\n"}CareersGO</Text>
          <View style={styles.buttonContainerStyles}>
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={() => navigation.navigate("StudentLogin")}
            >
              <HStack alignItems="center" justifyContent="center">
                <Text style={styles.buttonTextStyles}>
                  I am a student/attendee looking{"\n"}for an internship.
                </Text>
                <MaterialCommunityIcons
                  name="school-outline"
                  size={80}
                  color="white"
                />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={() => navigation.navigate("StudentLogin")}
            >
              <HStack alignItems="center" justifyContent="center">
                <Text style={styles.buttonTextStyles}>
                  I am a company / employer.
                </Text>
                <MaterialCommunityIcons
                  name="briefcase-outline"
                  size={80}
                  color="white"
                />
              </HStack>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Welcome;
