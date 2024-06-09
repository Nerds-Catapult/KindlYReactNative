import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Pdf from "react-native-pdf";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../interfaces/types";

type BookDetailScreenRouteProp = RouteProp<RootStackParamList, "BookDetailScreen">;
type Props = {
  route: BookDetailScreenRouteProp;
};

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  contentSrc: string;
  price: number;
}

interface ExpectedBook {
  message: string;
  status: number;
  books: Book[];
}

const ReadingScreen = ({ route }: Props) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookId } = route.params;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://sasha-ys6k.onrender.com/api/book/${bookId}`
        );
        const data: ExpectedBook = await response.json();
        if (data.status === 200) {
          const bookData = data.books.find((b) => b.id === bookId);
          setBook(bookData || null);
        } else {
          console.error("Error fetching book data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Pdf
        source={{ uri: book.contentSrc, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  author: {
    fontSize: 18,
    color: "gray",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ReadingScreen;
