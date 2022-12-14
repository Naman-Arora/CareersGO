// import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Image, StyleSheet, View } from "react-native";
import logo from "../assets/white_logo.png";
import storage from "../storage/Storage";

const Loading = ({ navigation }) => {
    // AsyncStorage.clear();
  const styles = StyleSheet.create({
    viewStyles: {
      height: "100%",
      width: "100%",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imageStyles: {
      aspectRatio: 1.5,
      height: "25%",
    },
  });
  useFocusEffect(() => {
    storage
      .load({ key: "userCredentials", id: "111" })
      .then(() => navigation.navigate("Home"))
      .catch(() => navigation.navigate("Welcome"));
  });
  return (
    <>
      <View style={styles.viewStyles}>
        {/* <CareersGO /> */}
        <Image source={logo} style={styles.imageStyles} />
      </View>
    </>
  );
};

export default Loading;
