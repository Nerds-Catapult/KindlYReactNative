import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";


import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { Auth } from "./utils/access_authentication";

const app = new Auth()
const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
