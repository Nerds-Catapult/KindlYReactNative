import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import image from "../../assets/splash_image.png";
import Ionicons from "@expo/vector-icons/Ionicons";
interface Book {
  title: string;
  author: string;
  coverImage: string;
  description: string;
}

const book: Book = {
  title: "Sample Book Title",
  author: "Sample Author",
  coverImage: image,
  description:
    "This is a sample book description.Certainly! In React Native, incorporating icons can enhance the visual appeal and functionality of your app. Let’s explore how to use icons in React Native: This is a sample book description.Certainly! In React Native, incorporating icons can enhance the visual appeal and functionality of your app. Let’s explore how to use icons in React Native:",
};

const BookDetailsPage: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <ScrollView className=" h-full w-full">
      <View>
        <View>
          <Image source={book.coverImage} style={styles.coverImage} />
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity className=" text-center flex items-center">
            <Ionicons name="star-half-outline" size={25} color="green" />
            <Text className=" text-center font-medium pt-2 text-base text-green-700">
              4.6
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className=" text-center flex items-center">
            <Ionicons name="book-outline" size={25} color="green" />
            <Text className=" text-center font-medium pt-2 text-sm text-green-700">
              320
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className=" text-center flex items-center">
            <Ionicons name="language-outline" size={25} color="green" />
            <Text className=" text-center font-medium pt-2 text-xs text-green-700">
              English
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className=" bg-gray-300 py-4 px-6 rounded-t-3xl mt-4 h-full ">
        <Text className=" first-letter:uppercase pb-4 text-xl font-bold text-green-900">
          Description :
        </Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>
      <View className=" absolute bottom-0 z-100 left-0  w-full justify-evenly pb-6 px-3 flex flex-row !bg-gradient-to-b from-indigo-500 ... ">
        <Pressable className=" bg-green-600 py-3 w-1/2 rounded-full">
          <Text className=" text-center text-white font-semibold text-base">
            Read Now
          </Text>
        </Pressable>
        <Pressable className=" bg-white opacity-80 border border-green-500 px-10 py-3 rounded-full">
          <Text className=" text-center text-green-500 font-semibold text-base">
            Save
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: "auto",
    height: 300,
    objectFit: "cover",
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  author: {
    fontSize: 18,
    margin: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0.3,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    alignItems: "center",
    textAlign: "center",
  },
  descriptioncard: {
    backgroundColor: "lightblue",
  },
});

const SingleBookPage: React.FC = () => {
  return <BookDetailsPage book={book} />;
};

export default SingleBookPage;
