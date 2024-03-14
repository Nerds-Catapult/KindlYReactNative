import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import axios from "axios"

import { CLIENT_SECRET, HUAWEI_CLIENT_ID, HUAWEI_CLIENT_SECRET } from "../../constants/constants";
import { Auth } from "../../utils/access_authentication";
import { AuthHeaders, User } from "../../interfaces/Auth";
import useAuthStore from "../../store";

export default function LoginScreen() {
  const navigation = useNavigation() as any;
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const auth = new Auth()
  const store = useAuthStore();

  async function loginUser() {
    Keyboard.dismiss();
    try {
      const headers: AuthHeaders = {
        grant_type: "Bearer",
        client_id: HUAWEI_CLIENT_ID,
        client_secret: HUAWEI_CLIENT_SECRET
      };

      const login_packet: User = {
        email: email,
        password: password
      };

      const storeData = await auth.authenticateWithClientCredentials();
      store.access_token = storeData.access_token
      store.expires_in = storeData.expires_in
      store.token_type = storeData.token_type

      const response: string | undefined = await auth.login(login_packet, store.access_token, headers); // Adjust the type here
      if (response !== undefined) {
        console.log(response);
        navigation.navigate("Home");
      } else {
        throw new Error("Login response is undefined"); // Throw an error if response is undefined
      }
      // if (authenticate_request?.token_type && authenticate_request.expires_in > 0) {
      // }

    } catch (error) {
      throw new Error(`${error}`); // Throw an error if response is undefined
      alert("");
    }
  }


  return (
    <View className="w-screen h-screen bg-white flex  items-center space-y-6 p-4">
      <Text className="mt-10 font-bold text-4xl pt-[40%]">Welcome Back!</Text>
      <TextInput
        onChangeText={(text: string) => setEmail(text)}
        className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
        placeholder="email"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={(text: string) => setPassword(text)}
        className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
        placeholder="password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={() => loginUser()} className="p-2 bg-black w-40 h-12 rounded-xl items-center justify-center">
        <Text className="text-white">Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
