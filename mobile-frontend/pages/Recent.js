import { Avatar, HStack, VStack } from "native-base";
import React from "react";
import {
  StyleSheet,
  Text,
  useColorScheme,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";
import recents from "../constants/recents";

const recentInfo = recents.map((item, index) => {
  const date = new Date(item.date);

  const dayToString = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <View key={index}>
      <HStack justifyContent="space-around">
        <Avatar bg={item.color}>{item.company.charAt(0)}</Avatar>
        <VStack>
          <Text>{item.company}</Text>
          <Text>{item.time}</Text>
        </VStack>
      </HStack>
    </View>
  );
});

const Recent = () => {
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
        <Text style={styles.headerStyles}>Recent Activity</Text>
        <ScrollView></ScrollView>
      </SafeAreaView>
      <NavBar />
    </>
  );
};

export default Recent;
