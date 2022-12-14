import React from "react";
import { Text, StyleSheet, useColorScheme } from "react-native";

const CareersGO = () => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    titleStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      fontWeight: "800",
      fontStyle: "italic",
      textAlign: "center",
      fontSize: 48,
    },
  });
  return (
    <Text style={styles.titleStyles}>
      CareersGO
    </Text>
  );
};

export default CareersGO;
