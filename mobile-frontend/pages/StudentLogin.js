import React, { useState } from "react";
import { Button, Input, Text, View, VStack } from "native-base";
import { Alert, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CareersGO from "../components/CareersGo";
import storage from "../storage/Storage";
import { apiLink } from "../constants/apiRoute";

const StudentLogin = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    vStackStyles: {
      marginHorizontal: 10,
      marginTop: 20,
    },
    subtitleStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      fontWeight: "600",
      textAlign: "center",
    },
    defaultTextStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      marginBottom: 5,
    },
    inputStyles: {
      color: colorScheme === "dark" ? "white" : "black",
    },
    buttonStyles: {
      marginTop: 20,
      borderRadius: 100,
    },
  });

  async function createAccount() {
    const userCredentials = {
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      id: "111111111111111"
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    };
    const res = await fetch(
      `${apiLink}/api/collections/userInformation/records/`,
      options
    );
    if (res.ok) {
      const response = await res.json();
      storage.save({
        key: "userCredentials",
        id: "111",
        data: userCredentials,
      });
      storage
        .save({
          key: "userID",
          id: "222",
          data: response["id"],
        })
        .then(() => {
          Alert.alert("Account Created!", "Thanks for creating an account!", [
            {
              text: "Okay",
              onPress: () => navigation.navigate("Resume"),
            },
          ]);
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert(
        "There was an error creating this account.",
        "The email might already be in use.",
        [
          {
            text: "Okay",
          },
        ]
      );
    }
  }

  return (
    <>
      <SafeAreaView>
        <VStack space={3} style={styles.vStackStyles}>
          <CareersGO />
          <Text fontSize="xl" style={styles.subtitleStyles}>
            Lets create an account!
          </Text>
          <View>
            <Text style={styles.defaultTextStyles}>Your First Name:</Text>
            <Input
              type="input"
              variant="rounded"
              placeholder=" First Name"
              size="lg"
              style={styles.inputStyles}
              value={firstName}
              onChangeText={(t) => setFirstName(t)}
            />
          </View>
          <View>
            <Text style={styles.defaultTextStyles}>Your Last Name:</Text>
            <Input
              type="input"
              variant="rounded"
              placeholder=" Last Name"
              size="lg"
              style={styles.inputStyles}
              value={lastName}
              onChangeText={(t) => setLastName(t)}
            />
          </View>
          <View>
            <Text style={styles.defaultTextStyles}>Your Email:</Text>
            <Input
              type="input"
              variant="rounded"
              placeholder=" example@gmail.com"
              size="lg"
              style={styles.inputStyles}
              value={email}
              onChangeText={(t) => setEmail(t)}
            />
          </View>
          <View>
            <Text style={styles.defaultTextStyles}>Create a Password:</Text>
            <Input
              type="password"
              variant="rounded"
              placeholder=" ··················"
              size="lg"
              style={styles.inputStyles}
              value={password}
              onChangeText={(t) => setPassword(t)}
            />
          </View>
          <View>
            <Button style={styles.buttonStyles} onPress={createAccount}>
              Create an Account!
            </Button>
          </View>
        </VStack>
      </SafeAreaView>
    </>
  );
};

export default StudentLogin;
