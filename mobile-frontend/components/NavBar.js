import { Center, HStack, VStack } from "native-base";
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  //   useColorScheme,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const NavBar = () => {
  //   const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const route = useRoute();
  const location = route.name;

  const styles = StyleSheet.create({
    textStyles: {
      fontWeight: "600",
      fontSize: 15,
      textAlign: "center",
      marginTop: 10,
    },
    containerStyles: {
      backgroundColor: "#808080",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      width: Dimensions.get("window").width,
      height: Platform.OS === "ios" ? 80 : 60,
      paddingTop: 10,
      paddingBottom: 20,
      marginBottom: 0,
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    vStackStyles: {
      paddingHorizontal: 25,
    },
  });

  return (
    <>
      <View style={styles.containerStyles}>
        <HStack justifyContent="space-between">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <VStack space={4} alignItems="center" style={styles.vStackStyles}>
              <Center>
                <Feather
                  name="radio"
                  size={24}
                  color={location === "Home" ? "white" : "black"}
                />

                <Text
                  style={[
                    styles.textStyles,
                    {
                      color: location === "Home" ? "white" : "black",
                    },
                  ]}
                >
                  Scan
                </Text>
              </Center>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <VStack space={4} alignItems="center" style={styles.vStackStyles}>
              <Center>
                <MaterialCommunityIcons
                  name="message-reply-text-outline"
                  size={24}
                  color={location === "Messages" ? "white" : "black"}
                />

                <Text
                  style={[
                    styles.textStyles,
                    {
                      color: location === "Messages" ? "white" : "black",
                    },
                  ]}
                >
                  Messages
                </Text>
              </Center>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Recent")}>
            <VStack space={4} alignItems="center" style={styles.vStackStyles}>
              <Center>
                <MaterialCommunityIcons
                  name="account-reactivate-outline"
                  size={24}
                  color={location === "Recent" ? "white" : "black"}
                />

                <Text
                  style={[
                    styles.textStyles,
                    {
                      color: location === "Recent" ? "white" : "black",
                    },
                  ]}
                >
                  Recent
                </Text>
              </Center>
            </VStack>
          </TouchableOpacity>
        </HStack>
      </View>
    </>
  );
};

export default NavBar;
