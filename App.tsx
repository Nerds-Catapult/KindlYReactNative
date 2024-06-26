import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native";
import Login from "./screens/Auth/login/login";
import Signup from "./screens/Auth/signup/signup";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import ReadingScreen from "./screens/Book/Reading";
import HomeScreen from "./screens/Home/HomeScreen";
import { AuthProvider } from "./logic/context";
import {Provider} from "react-redux";
import Store from "./store";
import BookScreen from "./screens/Book/BookScreen";
import { RootStackParamList } from "./interfaces/types";


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    //@ts-ignore
    <AuthProvider>
      <Provider store={Store}>
        <SafeAreaView className="flex-1 pt-9">
          <StatusBar animated={true} backgroundColor="#61dafb" />
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
              <Stack.Screen
                name="BookDetailScreen"
                component={BookScreen}
                options={{
                  headerShown: false,
                  title: "",
                }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="signup"
                component={Signup}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReadingScreen"
                component={ReadingScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </AuthProvider>
  );
}
