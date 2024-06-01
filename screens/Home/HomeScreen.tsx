import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { Chip } from "react-native-paper";
import { BackHandler } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation() as any;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const sidebarPosition = useRef(
    new Animated.Value(-Dimensions.get("window").width)
  ).current;
  const sidebarWidth = useRef(Dimensions.get("window").width).current;

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const categories = [
    { id: 1, name: "Fiction" },
    { id: 2, name: "Non-fiction" },
    // ... rest of the categories
  ];

  const books = [
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
    // ... rest of the books
  ];

  const toggleSidebar = () => {
    if (showOptions) {
      Animated.timing(sidebarPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(sidebarPosition, {
        toValue: -sidebarWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleSidebar();
  }, [showOptions]);

  const Sidebar = () => {
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 270,
          transform: [{ translateX: sidebarPosition }],
        }}
        className="h-full w-3/4 bg-white shadow-lg z-50 rounded-r-xl overflow-x-auto"
      >
        {/* Sidebar content */}
        <ScrollView className="h-20 w-full  p-6">    
          <TouchableOpacity className="bg-purple-400 h-12 w-12 rounded-xl flex items-center justify-center">
            <Text className="text-purple-800 text-xl font-bold">S</Text>
          </TouchableOpacity>


          <View className="py-4 px-4 mt-11">
            <TouchableOpacity className="bg-purple-500 rounded-md ">
              <Text className="text-xl font-bold text-white text-center p-3">
                Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View className="py-4 px-4">
            <TouchableOpacity className="bg-purple-500 rounded-md">
              <Text className="text-xl font-bold text-white text-center p-3">
                Favorites
              </Text>
            </TouchableOpacity>
          </View>

          <View className="py-4 px-4">
            <TouchableOpacity className="bg-purple-500 rounded-md">
              <Text className="text-xl font-bold text-white text-center p-3">
                Settings
              </Text>
            </TouchableOpacity>
          </View>

          <View className="py-4 px-4">
            <TouchableOpacity className="bg-purple-500 rounded-md">
              <Text className="text-xl font-bold text-white text-center p-3">
                About
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sidebar footer */}
        <TouchableOpacity className="h-20 w-full bg-purple-400 flex items-center justify-center">
          <Text className="text-white text-xl font-bold">Logout</Text>
        </TouchableOpacity>

      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="w-full h-full">
        <View className="h-20 w-full flex flex-row justify-between items-center p-6">
          {/* Avatar */}
          <TouchableOpacity className="bg-purple-400 h-12 w-12 rounded-xl flex items-center justify-center">
            <Text className="text-purple-800 text-xl font-bold">S</Text>
          </TouchableOpacity>
          <Text className="text-[#1C122D] text-serif text-2xl font-bold">
            Sasha Readers
          </Text>

          <TouchableOpacity
            onPress={() => {
              setShowOptions(!showOptions);
              toggleSidebar();
            }}
          >
            <View className="bg-gray-100 rounded-xl h-12 w-12 flex flex-col items-center justify-center space-y-1">
              <View className="h-1 w-[60%] bg-purple-800 rounded-full"></View>
              <View className="h-1 w-[60%] bg-purple-800 rounded-full"></View>
              <View className="h-1 w-[60%] bg-purple-800 rounded-full"></View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-full h-40 flex flex-col items-start p-4 space-y-4 mt-10">
          <Text className="text-2xl font-bold tracking-wider">
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
            <Text className="text-xl font-bold text-purple-900">
              Categories
            </Text>
            <Text className="text-sm font-light text-purple-900 underline">
              View All &rarr;
            </Text>
          </View>
          <ScrollView horizontal>
            <View className="flex flex-row space-x-2 h-12 items-center">
              {categories.map((category, index) => (
                <Chip
                  key={category.id}
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
                  onPress={() => navigation.navigate("BookDetailScreen")}
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
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
          />

          <View className="h-10 w-full flex flex-row justify-between items-center px-4">
            <Text className="font-bold text-lg underline">Top Authors</Text>
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
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
          />
        </View>
      </ScrollView>
      <Sidebar />
    </View>
  );
}
