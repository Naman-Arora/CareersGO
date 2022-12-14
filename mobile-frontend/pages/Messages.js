import React from "react";
import { StyleSheet, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

const Messages = () => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    headerStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      fontWeight: "800",
      textAlign: "center",
      fontSize: 40,
    },
  });
  return (
    <>
      <SafeAreaView>
        <Text style={styles.headerStyles}>Messages</Text>
      </SafeAreaView>
      <NavBar/>
    </>
  );
};

export default Messages;
