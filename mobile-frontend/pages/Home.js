import React, { /* useEffect, */ useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { StyleSheet } from "react-native";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, VStack, HStack, Center } from "native-base";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Toast, {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import storage from "../storage/Storage";
import NavBar from "../components/NavBar";
import CareersGO from "../components/CareersGo";
import { apiLink } from "../constants/apiRoute";

NfcManager.start();

const toastConfig = {
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: "#87CEFA" }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  success: (props) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: "#69C779" }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#FE6301" }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const [userID, setUserID] = useState("");
  const [scanned, setScanned] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [userCredentials, setUserCredentials] = useState([]);

  useFocusEffect(() => {
    storage
      .load({
        key: "userCredentials",
        id: "111",
      })
      .then((res) => {
        setUserCredentials(res);
      })
      .catch((err) => console.log(err));

    storage
      .load({
        key: "userID",
        id: "222",
      })
      .then((res) => {
        setUserID(res);
      })
      .catch((err) => console.log(err));
  });

  const styles = StyleSheet.create({
    defaultTextStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      fontWeight: "600",
      fontSize: 20,
      margin: 20,
    },
    readButtonTextStyles: {
      color: colorScheme === "dark" ? "white" : "black",
      textAlign: "center",
      fontWeight: "800",
      fontSize: 25,
    },
    readTagStyles: {
      backgroundColor: "#0094FF",
      borderRadius: 25,
      height: 200,
      width: 300,
      padding: 25,
      marginBottom: 20,
    },
    readQRStyles: {
      backgroundColor: "#0094FF",
      height: 100,
      width: 300,
      borderRadius: 25,
      padding: 25,
      marginTop: 0,
    },
    modalStyles: {
      backgroundColor: colorScheme === "dark" ? "black" : "white",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingRight: insets.right,
      paddingLeft: insets.left,
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
    },
    scannerViewStyles: {
      width: Dimensions.get("window").width - 20,
      aspectRatio: 1,
      borderRadius: 25,
      backgroundColor: "#0094FF",
      marginTop: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    scannerStyles: {
      width: Dimensions.get("window").width - 80,
      aspectRatio: 1,
    },
    scanAgainButton: {
      backgroundColor: colorScheme === "dark" ? "white" : "black",
      marginTop: 20,
      borderRadius: 25,
      paddingHorizontal: 10,
      opacity: !scanned ? 0.5 : 1,
    },
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function readNdef() {
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      const tag = await NfcManager.getTag();

      // {"name":"Nintendo","id":"6b3vbgtll1tzh1a"} <- JSON string must be in this format.

      const tagInfoArr = tag["ndefMessage"][0]["payload"];
      const jsonAsString = Ndef.util.bytesToString(tagInfoArr.slice(3));
      const companyInfo = JSON.parse(jsonAsString);

      infoToast("NFC Tag", companyInfo.name, "nfc");
      sendData(companyInfo.id, companyInfo.name, "nfc");
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  function infoToast(typeName, companyName, scanType) {
    Toast.show({
      type: "info",
      text1: `${typeName} Scanned!`,
      text2: `Sharing your information with ${companyName}!`,
      position: scanType === "nfc" ? "top" : "bottom",
      autoHide: true,
      visibilityTime: 2000,
    });
  }

  function successToast(companyName, scanType) {
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: `Successfully shared your info with ${companyName}!`,
      position: scanType === "nfc" ? "top" : "bottom",
      autoHide: true,
      visibilityTime: 4000,
    });
  }

  function errorToast(scanType) {
    Toast.show({
      type: "error",
      text1: "Error.",
      text2: "Unable to share info. Please try again.",
      position: scanType === "nfc" ? "top" : "bottom",
      autoHide: true,
      visibilityTime: 4000,
    });
  }

  const scanQRCode = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setModalOpened(true);
    } else {
      Alert.alert(
        "Please Grant Camera Permission!",
        "Camera permission is needed in order to scan QR codes.",
        [{ text: "Cancel" }, { text: "Okay", onPress: scanQRCode }]
      );
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Code scanned. Type: ${type}; Data: ${data}`);
    const companyInfo = JSON.parse(data);
    infoToast("QR Code", companyInfo.name, "qr");
    sendData(companyInfo.id, companyInfo.name, "qr");
  };

  async function sendData(companyID, companyName, scanType) {
    const getOptions = { method: "GET" };

    const res = await fetch(
      `${apiLink}/api/collections/companyInformation/records/${companyID}`,
      getOptions
    );
    const data = await res.json();
    const ids = data["ids"];

    if (ids.includes(userID)) {
      await sleep(1000);
      Alert.alert(
        "You have already shared your information with this company!",
        "",
        [{ text: "Okay" }]
      );
    } else {
      ids.push(userID);

      const patchInfo = {
        ids: ids,
      };

      const patchOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchInfo),
      };

      const patchRes = await fetch(
        `${apiLink}/api/collections/companyInformation/records/${companyID}`,
        patchOptions
      );
      if (patchRes.ok) {
        await sleep(1000);
        successToast(companyName, scanType);
      } else {
        await sleep(1000);
        errorToast(scanType);
        // ids.splice(ids.indexOf(userID), 1);
      }
    }
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalOpened}
        onRequestClose={() => setModalOpened(false)}
      >
        <View style={styles.modalStyles}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text style={styles.defaultTextStyles}>Scan QR Code</Text>
            <TouchableOpacity onPress={() => setModalOpened(false)}>
              <Ionicons
                name="ios-close-sharp"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </HStack>
          <VStack alignItems="center">
            <View style={styles.scannerViewStyles}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.scannerStyles}
              />
            </View>
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.scanAgainButton}
              disabled={!scanned}
            >
              <HStack alignItems="center" justifyContent="center">
                <Ionicons
                  name="md-reload-circle-sharp"
                  size={28}
                  color={colorScheme === "dark" ? "black" : "white"}
                />

                <Text
                  style={[
                    styles.defaultTextStyles,
                    {
                      color: colorScheme === "dark" ? "black" : "white",
                    },
                  ]}
                >
                  Tap to Scan Again
                </Text>
              </HStack>
            </TouchableOpacity>
          </VStack>
          <Toast config={toastConfig} />
        </View>
      </Modal>
      <SafeAreaView>
        <CareersGO />
        <View>
          <Text style={styles.defaultTextStyles}>
            Welcome back, {userCredentials.firstName}!{/* Welcome back! */}
          </Text>
          <VStack space={4} alignItems="center">
            <TouchableOpacity
              onPress={() => {
                readNdef();
              }}
              style={styles.readTagStyles}
            >
              <VStack>
                <Text style={styles.readButtonTextStyles}>READ A NEW TAG</Text>
                <Center>
                  <Feather
                    name="radio"
                    size={100}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </Center>
              </VStack>
            </TouchableOpacity>
          </VStack>
          <Text style={styles.defaultTextStyles}>Tag not working?</Text>
          <VStack space={4} alignItems="center">
            <TouchableOpacity onPress={scanQRCode} style={styles.readQRStyles}>
              <HStack>
                <Center>
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={50}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </Center>
                <Center
                  style={{
                    marginHorizontal: 10,
                  }}
                >
                  <Text style={styles.readButtonTextStyles}>Scan QR Code</Text>
                </Center>
              </HStack>
            </TouchableOpacity>
          </VStack>
        </View>
      </SafeAreaView>
      <NavBar />
    </>
  );
};

export default Home;
