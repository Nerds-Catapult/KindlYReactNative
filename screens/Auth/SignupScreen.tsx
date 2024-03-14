import React, { useState } from 'react'
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Auth } from "../../utils/access_authentication";

import useAuthStore from "../../store/index"
import { SignupCredentials, User, AuthHeaders } from '../../interfaces/Auth';
import { CLIENT_SECRET, HUAWEI_CLIENT_ID, HUAWEI_CLIENT_SECRET } from "../../constants/constants";

export default function SignupScreen() {
  const navigation = useNavigation() as any;
  const authentication_setup = new Auth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const store = useAuthStore()

  async function registerUser() {
    const headers: AuthHeaders = {
      grant_type: "client_credentials",
      client_id: HUAWEI_CLIENT_ID,
      client_secret: HUAWEI_CLIENT_SECRET
    };
    try {
      const storeData = await authentication_setup.authenticateWithClientCredentials();
      if (!store.access_token) {
        store.access_token = storeData.access_token
        store.expires_in = storeData.expires_in
        store.token_type = storeData.token_type

        const packet: SignupCredentials = {
          firstName: firstName,
          lastName: lastName,
          "Phone number": phoneNumber,
          email: email,
          password: password,
        }

        const userRegistration = await authentication_setup.signup(packet, store.access_token, headers)
        // store.redirectUrl = userRegistration
        console.log(userRegistration)
        // console.log(packet)
        // alert(firstName)
        // console.log(store.access_token)
        // navigation.navigate("Home");
      } else {
        // navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <View className="w-full h-full bg-white flex flex-col items-center p-4">
      <Text className="mt-16 font-bold text-4xl">Join Shopzetu!</Text>
      <Text className="text-xs text-black tracking-widest">
        Fill this form to register with us
      </Text>
      <ScrollView>
        <View className="w-full h-full flex flex-col items-center px-8 space-y-2 mt-6">
          <TextInput
            onChangeText={(text) => setFirstName(text)}
            className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
            placeholder="First Name"
            autoComplete="given-name"
          />
          <TextInput

            onChangeText={(text) => setLastName(text)}
            className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
            placeholder="Last Name"
          />
          <TextInput

            onChangeText={(text) => setEmail(text)}
            className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
            placeholder="email"
            keyboardType="email-address"
          />
          <TextInput
           onChangeText={(text) => setPhoneNumber(text)}
            className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
            placeholder="phone"
            keyboardType="phone-pad"
          />
          <TextInput
           onChangeText={(text) => setPassword(text)}
            className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
            placeholder="password"
            secureTextEntry={true}
          />
          <TextInput
           onChangeText={(text) => setPassword(text)}
            className="p-2 border-2 border-gray-600 h-14 w-80 rounded-xl text-black"
            placeholder="confirm password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={registerUser}
            className="mt-10 p-2 bg-black w-40 h-12 rounded-xl items-center justify-center"
          >
            <Text className="text-white">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}