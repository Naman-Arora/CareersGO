import * as DocumentPicker from "expo-document-picker";
import { AlertDialog, Button, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import storage from "../storage/Storage";
import { useFocusEffect } from "@react-navigation/native";
import { apiLink } from "../constants/apiRoute";

const Resume = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [userID, setUserID] = useState("");
  const [docResult, setDocResult] = useState([]);
  const [alertOpened, setAlertOpened] = useState(false);

  useFocusEffect(() => {
    storage
      .load({ key: "userID", id: "222" })
      .then((res) => setUserID(res))
      .catch(() => navigation.navigate("Welcome"));
  });

  const styles = StyleSheet.create({
    resumeText: {
      color: colorScheme === "dark" ? "white" : "black",
      fontWeight: "800",
      fontSize: 28,
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 150,
    },
    box: {
      backgroundColor: "#0094FF",
      padding: 50,
      borderRadius: 20,
    },
  });

  async function openDocument() {
    let DocumentResult = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "application/pdf",
    });
    if (DocumentResult.type == "success") {
      setDocResult(DocumentResult);
      setAlertOpened(true);
    } else {
      Alert.alert(
        "Document Upload Failed",
        "Please upload the resume document again.",
        [
          {
            text: "Cancel",
          },
          {
            text: "Try Again",
            onPress: () => openDocument(),
          },
        ]
      );
    }
  }

  function saveDoc() {
    const form = new FormData();
    form.append("resume", docResult);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
    };

    options.body = form;
    fetch(
      `${apiLink}/api/collections/userInformation/records/${userID}`,
      options
    )
      .then(() => {
        setAlertOpened(false);
        navigation.navigate("Home");
      })
      .catch(() =>
        Alert.alert("There was an error, please try again.", "", [{
          text: "Try Again",
          onPress: () => openDocument(),
        }])
      );
  }

  return (
    <>
      <SafeAreaView>
        <AlertDialog isOpen={alertOpened} onClose={() => setAlertOpened(false)}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Share Resume</AlertDialog.Header>
            <AlertDialog.Body>I agree to share my resume.</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button colorScheme="info" onPress={saveDoc}>
                Okay
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <View style={styles.container}>
          <TouchableOpacity style={styles.box} onPress={openDocument}>
            <VStack alignItems="center">
              <Feather
                name="plus-square"
                size={128}
                color={colorScheme === "dark" ? "white" : "black"}
              />
              <Text style={styles.resumeText}>Upload a Resume</Text>
            </VStack>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Resume;
