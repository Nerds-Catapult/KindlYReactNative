import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { WebView, WebViewNavigation } from "react-native-webview";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  BackHandler,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Chip, Drawer } from "react-native-paper";
import image from "../../assets/splash_image.png";

import useAuthStore from "../../store";

interface Book {
  title: string;
  author: string;
  image: string;
  rating: number;
  format: string[];
  details: string;
  description: string;
}

const BookDetailsScreen: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={image}
        style={{ height: 400, width: "100%", marginBottom: 20 }}
        resizeMode="cover"
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Title
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>author</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          {/* <FontAwesome
            icon={faStar}
            size={16}
            color={rating >= 1 ? "#ffc107" : "gray"}
          /> */}
          <Text style={{ marginLeft: 5 }}>rating (Average)</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          {/* {format.map((item: React.Key | null | undefined) => (
            <Image
              key={item}
              source={{ uri: `https://your-icon-domain.com/${item}.png` }}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
          ))} */}
        </View>
        <Text style={{ marginTop: 5 }}>details</Text>
        <Text style={{ marginTop: 5 }}>description</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "#ccc", padding: 10, borderRadius: 5 }}
          >
            <Text>Add to Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#2b2b2c", padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: "white" }}>
              {format[0] === "ebook" ? "Read Now" : "Buy Now"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookDetailsScreen;
