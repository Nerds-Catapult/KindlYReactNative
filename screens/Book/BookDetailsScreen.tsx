import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
    "This is a sample book description. Certainly! In React Native, incorporating icons can enhance the visual appeal and functionality of your app. Let's explore how to use icons in React Native: This is a sample book description. Certainly! In React Native, incorporating icons can enhance the visual appeal and functionality of your app. Let's explore how to use icons in React Native:",
};

const BookDetailsPage: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={book.coverImage} style={styles.coverImage} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="star-half-outline" size={25} color="green" />
          <Text style={styles.iconText}>4.6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="book-outline" size={25} color="green" />
          <Text style={styles.iconText}>320</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="language-outline" size={25} color="green" />
          <Text style={styles.iconText}>English</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.description}>{book.description}</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => console.log("Read Book")}>
            <Text style={styles.buttonText}>Read Book</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => console.log("Add to Library")}>
            <Text style={styles.buttonText}>Add to Library</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "green",
  },
  descriptionCard: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const SingleBookPage: React.FC = () => {
  return <BookDetailsPage book={book} />;
};

export default SingleBookPage;