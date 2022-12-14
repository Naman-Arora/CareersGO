import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React /* useEffect */ from "react";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Recent from "./pages/Recent";
import Welcome from "./pages/Welcome";
import Loading from "./pages/Loading";
import Personal from "./pages/Personal";
import Messages from "./pages/Messages";
import StudentLogin from "./pages/StudentLogin";
import StudentInformation from "./pages/StudentInformation";
import Toast, {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";

const Stack = createNativeStackNavigator();

const toastConfig = {
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: "#87CEFA", marginBottom: 60 }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  success: (props) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: "#69C779", marginBottom: 60 }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#FE6301", marginBottom: 60 }}
      text1Style={{ fontSize: 15 }}
      text2Style={{ fontSize: 12 }}
    />
  ),
};

const App = () => {
  let screenOnOpen = "Loading";
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer
          theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <NativeBaseProvider>
            <Stack.Navigator
              initialRouteName={screenOnOpen}
              screenOptions={{
                headerShown: true,
              }}
            >
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                  animation: "fade",
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="StudentLogin"
                component={StudentLogin}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen
                name="StudentInformation"
                component={StudentInformation}
                options={{ title: "Your Information" }}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen
                name="Loading"
                component={Loading}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen
                name="Resume"
                component={Resume}
                options={{ gestureEnabled: false, title: "Your Resume" }}
              />
              <Stack.Screen
                name="Recent"
                component={Recent}
                options={{
                  headerShown: false,
                  animation: "fade",
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="Messages"
                component={Messages}
                options={{
                  headerShown: false,
                  animation: "fade",
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen name="Personal" component={Personal} />
            </Stack.Navigator>
            <Toast config={toastConfig} />
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
