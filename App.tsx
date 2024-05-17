import {StatusBar} from "expo-status-bar";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {SafeAreaView} from "react-native";
import Login from "./screens/Auth/login/login";
import Signup from "./screens/Auth/signup/signup";
import SingleBookPage from "./screens/Book/BookDetailsScreen";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { AuthProvider } from "./logic/context";

const Stack = createStackNavigator();

export default function App() {
    return (
        //@ts-ignore
        <AuthProvider>
            <SafeAreaView className="flex-1 pt-9">
                <StatusBar animated={true} backgroundColor="#61dafb"/>
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
                            component={SingleBookPage}
                            options={{
                                headerShown: true,
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
                                headerShown: true,
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
        </SafeAreaView>
        </AuthProvider>
    );
}
