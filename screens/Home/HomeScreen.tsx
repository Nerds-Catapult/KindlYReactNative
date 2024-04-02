import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { Chip } from "react-native-paper";

export default function HomeScreen() {
  const navigation = useNavigation() as any;

  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    if (!tokenExists) {
      navigation.replace("SignIn");
    }
  }, [tokenExists, navigation]);

  const categories = [
    { id: 1, name: "Fiction" },
    { id: 2, name: "Non-fiction" },
    { id: 3, name: "Mystery" },
    { id: 4, name: "Science Fiction" },
    { id: 5, name: "Fantasy" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Horror" },
    { id: 8, name: "Thriller" },
    { id: 9, name: "Biography" },
    { id: 10, name: "History" },
    { id: 11, name: "Self-help" },
    { id: 12, name: "Cooking" },
    { id: 13, name: "Travel" },
    { id: 14, name: "Poetry" },
    { id: 15, name: "Drama" },
    { id: 16, name: "Humor" },
    { id: 17, name: "Business" },
    { id: 18, name: "Art" },
    { id: 19, name: "Music" },
    { id: 20, name: "Philosophy" },
  ];

  const books = [
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
    { id: 3, title: "Book 3" },
    { id: 4, title: "Book 4" },
    { id: 5, title: "Book 5" },
  ];

  return (
    <View className="w-full h-full">
      <View className="h-20 w-full flex flex-row justify-between items-center p-6">
        {/* Avatar */}
        <TouchableOpacity className="bg-purple-400 h-12 w-12 rounded-xl flex items-center justify-center">
          <Text className="text-purple-800 text-xl font-bold">S</Text>
        </TouchableOpacity>
        <Text className="text-[#1C122D] text-serif text-2xl font-bold">
          Kndly
        </Text>
        {/* TODO: Add a drawer overlay on this button press */}
        <TouchableOpacity>
          <View className="bg-gray-100 rounded-xl h-12 w-12 flex flex-col items-center justify-center space-y-1">
            <View className="h-1 w-[60%] bg-purple-800 rounded-full"></View>
            <View className="h-1 w-[60%] bg-purple-800 rounded-full"></View>
            <View className="h-1 w-[60%] bg-purple-800 rounded-full"></View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-full h-40 flex flex-col items-start p-4 space-y-4 mt-10">
        <Text className="text-2xl font-bold font-serif tracking-wider">
          Cycle through our library
        </Text>
        <View className="w-full flex flex-row items-center justify-between space-x-2">
          <TextInput
            className="p-2 rounded bg-gray-200 h-12 w-[80%] text-purple-900"
            placeholder="Search"
          />
          <TouchableOpacity className="bg-purple-400 text-purple-800 p-2 h-12 flex items-center justify-center rounded w-[20%]">
            <Text className="text-white font-bold">Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-col items-start w-full h-[70%] bg-[#E4E4E4] p-4 rounded-t-xl">
        <View className="h-14 w-full flex flex-row px-4 items-center justify-between">
          <Text className="text-xl font-bold text-purple-900">Categories</Text>
          <Text className="text-sm font-light text-purple-900 underline">
            {" "}
            View All &rarr;
          </Text>
        </View>
        <ScrollView horizontal>
          <View className="flex flex-row space-x-2 h-12 items-center">
            {categories.map((category, index) => (
              <Chip
                className="bg-gray-100"
                rippleColor={"#CB37FF"}
                showSelectedCheck
                selectedColor="#7737FF"
                icon="more"
              >
                {category.name}
              </Chip>
            ))}
          </View>
        </ScrollView>

        <FlatList
          horizontal
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="ml-2">
              <TouchableOpacity
                onPress={() => navigation.navigate("BookdetailScreen")}
                touchSoundDisabled
                className="w-[150px] h-[200px] rounded bg-gray-400"
              >
                <View />
              </TouchableOpacity>
              <Text className="text-light text-sm">Author</Text>
              <Text className="font-bold tracking-widest text-lg">Title</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
        />

        <View className="h-10 w-full flex flex-row justify-between items-center px-4">
          <Text className="font-bold  text-lg underline">Top Authors</Text>
          <Text className="font-bold text-purple-800 text-sm underline">
            View More &rarr;
          </Text>
        </View>
        <FlatList
          horizontal
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="ml-2">
              <TouchableOpacity className="w-20 h-20 rounded-full bg-gray-400">
                <View />
              </TouchableOpacity>
              <Text className="text-light text-sm">Author</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
        />
      </View>
    </View>
  );
}
