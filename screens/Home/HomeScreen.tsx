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
  Image,
} from "react-native";
import { Chip } from "react-native-paper";
import { BackHandler } from "react-native";
import { AuthContext } from "../../logic/context";
import {
  expectedJson,
  expectedAuthor,
  expectedBook,
  expectedCategory,
} from "../../interfaces/types";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";
import { useDispatch } from "react-redux";
import {setBook} from '../../reducers/bookReducers';

export default function HomeScreen() {
  const navigation = useNavigation() as any;
  const { authToken } = React.useContext(AuthContext);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const sidebarPosition = useRef(
    new Animated.Value(-Dimensions.get("window").width)
  ).current;
  const sidebarWidth = useRef(Dimensions.get("window").width).current;
  const [categories, setCategories] = useState<expectedCategory>({
    status: 0,
    categories: [],
  });
  const [books, setBooks] = useState<expectedBook>({
    message: "",
    status: 0,
    books: [],
  });
  const [authors, setAuthors] = useState<expectedAuthor>({
    status: 0,
    author: [],
  });

  const dispatch = useDispatch();

  const selectBookToDisplay = (bookId: number) => {
    navigation.navigate("BookDetailScreen", { bookId });
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
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
      }
    };
    checkAuth();
  }, []);

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

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://just-actually-ape.ngrok-free.app/api/categories"
      );
      const data: expectedCategory = await response.json();
      data && setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    toggleSidebar();
  }, [showOptions]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://just-actually-ape.ngrok-free.app/api/books"
      );
      const data: expectedBook = await response.json();
      data && setBooks(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch(
        "https://just-actually-ape.ngrok-free.app/api/authors"
      );
      const data: expectedAuthor = await response.json();
      data && setAuthors(data);
    };
    fetchAuthors();
  }, []);

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
  const filteredBooks = books?.books?.filter(
    (book) => book.contentSrc && book.coverImage
  );

  const filteredAuthors = authors?.author?.filter(
    (author) => author.avatar && author.fullName
  );

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
              {categories.categories.map((category) => (
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
          {filteredBooks?.length > 0 ? (
            <FlatList
              horizontal
              data={filteredBooks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="ml-2">
                  <TouchableOpacity
                    onPress={() =>selectBookToDisplay(item.id)}
                    touchSoundDisabled
                    className="w-[150px] h-[200px] rounded"
                  >
                    <Image
                      source={{ uri: item.coverImage }}
                      className="w-full h-full rounded"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text className="text-light text-sm">{item.author}</Text>
                  <Text className="font-bold tracking-widest text-lg">
                    {item.title}
                  </Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            />
          ) : (
            <View className="flex items-center justify-center py-10">
              <Text className="text-gray-500 text-lg">No books available</Text>
            </View>
          )}

          <View className="h-10 w-full flex flex-row justify-between items-center px-4">
            <Text className="font-bold text-lg underline">Top Authors</Text>
            <Text className="font-bold text-purple-800 text-sm underline">
              {/* View More &rarr; */}
            </Text>
          </View>

          {filteredAuthors?.length > 0 ? (
            <FlatList
              horizontal
              data={filteredAuthors}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="ml-2 mt-8">
                  <TouchableOpacity className="w-[100px] h-[100px] rounded-full ">
                    <Image
                      source={{
                        uri: "https://res.cloudinary.com/ddpwdhkuh/image/upload/v1717594217/maxresdefault_qjxl2j.jpg",
                      }}
                      className="w-full h-full rounded-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text className="text-light text-sm">{item.fullName}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            />
          ) : null}
        </View>
      </ScrollView>
      <Sidebar />
      <Toasts />
    </View>
  );
}
