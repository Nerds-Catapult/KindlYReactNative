import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../logic/context";
import LoadingComponent from "../Loading/Loading";
import { expectedJson } from "../../interfaces/types";




export default function WelcomeScreen() {
  const navigation = useNavigation() as any;
  const { authToken } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState<boolean>(false);


  
  

  
  useEffect(() => {
    async function authProtocol() {
      try {
        setLoading(true);
        if (authToken == null) {
          return;
        }
        const response = await fetch(
          "https://just-actually-ape.ngrok-free.app/api/auth",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data: expectedJson = await response.json();
        if (data.isAuthenticated) {
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    authProtocol();
  }, []);

  return (
    <>
      <LoadingComponent visible={loading} />
      {!loading && (
        <View className="h-full w-full items-center justify-center bg-white space-y-14">
          <View className="items-center justify-center space-y-2">
            <Image
              className="h-80 w-96"
              source={require("../../assets/splash_image.png")}
            />
          </View>
          <View className="flex items-start space-y-4 w-full px-10 py-4">
            <View className="w-full h-20 flex flex-col justify-start">
              <Text className="font-extrabold text-6xl text-gray-200 text-start">
                Kndly
              </Text>
              <Text className="w-80">
                Get your books of choice at the comfort of your home with Kndly
                app - Your book companion.
              </Text>
            </View>
            <View className="w-full items-center justify-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("signup")}
                className="p-2 bg-purple-200 w-80 rounded-xl h-14 items-center justify-center"
              >
                <Text className="text-purple-800 text-xl font-bold tracking-wide">
                  Get started
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
