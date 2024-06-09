import React, { useEffect } from "react";
import { RootStackParamList } from "../../interfaces/types";
import { RouteProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import LoadingComponent from "../Loading/Loading";
import { expectedBook } from "../../interfaces/types";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";
import { AuthContext } from "../../logic/context";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Pdf from "react-native-pdf";


type BookScreenNavigationProp = RouteProp<
RootStackParamList,
"BookDetailScreen"
>;

type Props = {
  route: BookScreenNavigationProp;
};

interface expectedUser {
  status: number;
  message: string;
  data: {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

const BookScreen = ({ route }: Props) => {
const { authToken } = React.useContext(AuthContext);
const [loading, setLoading] = React.useState<boolean>(false);
const [showPurchase, setShowPurchase] = React.useState<boolean>(false);
const [book, setBook] = React.useState<expectedBook["books"][0] | null>(null);  
const [readingAction, setReadingAction] = React.useState<"Continue Reading" | "Purchase"> ("Continue Reading");
const [user, setUser] = React.useState<expectedUser["data"] | null>(null);
const [formData, setFormData] = React.useState({
  phoneNumber: "",
  email: "",
});
  

const handleChange = (value: string, name: string) => {
  setFormData({
    ...formData,
    [name]: value,
  });
};

const fetchUser = async () => {
  try {
    setLoading(true);
    const response = await fetch(
      `https://just-actually-ape.ngrok-free.app/api/auth`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data: expectedUser = await response.json();
    if (data.status !== 200) {
      toast(data.message);
    } else {
      setUser(data.data);
      setFormData({
        phoneNumber: data.data.phoneNumber,
        email: data.data.email,
      });
    }
  } catch (error) {
    console.error(error);
    toast("An error occurred");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const backAction = () => {
    if (showPurchase) {
      setShowPurchase(false);
      return true;
    }
  };
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, [showPurchase]);

useEffect(() => {
  const bookId = route.params.bookId;
  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://just-actually-ape.ngrok-free.app/api/book/${bookId}`
      );
      const data: expectedBook = await response.json();
      if (data.status !== 200) {
        toast(data.message);
      } else {
        setBook(data.books[0]);
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  fetchBook();
}, [route.params.bookId]);

useEffect(() => {
  fetchUser();
}, []);

const initiatePurchase = () => {
  setShowPurchase(true);
};
  const handlePurchase = async () => {
    setLoading(true);
    setTimeout(() => {
      toast("Purchase successful");
      setShowPurchase(false);

    }, 3000);
    setLoading(false);
  }

  const BookScreenComponent = () => {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Image src={book?.coverImage} style={styles.coverImage} />
          <Text style={styles.title}>{book?.title}</Text>
          <Text style={styles.author}>{book?.author}</Text>
        </View>
        <View style={styles.icons}>
          <View style={styles.iconContainer}>
            <Ionicons name="star-half-outline" size={25} color="green" />
            <Text style={styles.iconText}>4.6</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="book-outline" size={25} color="green" />
            <Text style={styles.iconText}>320</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="language-outline" size={25} color="green" />
            <Text style={styles.iconText}>English</Text>
          </View>
        </View>
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.description}>{book?.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={initiatePurchase}>
              <Text style={styles.buttonText}>Purchase KSH{book?.price}</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add to Library</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const PurchaseForm = () => {
    return (
      <View className="flex-1 items-center justify-center bg-white p-6">
        <Text className="text-3xl font-bold mb-8 text-purple-600">
          Purchase Form
        </Text>
        <View className="w-full">
          <Text className="text-lg font-semibold mb-2 text-green-600">
            Phone Number
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(value) => handleChange(value, "phoneNumber")}
          />
          <Text className="text-lg font-semibold mb-2 text-green-600">
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-8"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => handleChange(value, "email")}
          />
          <TouchableOpacity
            className="bg-red-500 py-3 rounded-lg items-center"
            onPress={handlePurchase}
          >
            <Text className="text-white text-lg font-semibold">
              Complete Purchase
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      {loading && <LoadingComponent visible />}
      {!loading && <BookScreenComponent />}
      {!loading && showPurchase && <PurchaseForm />}
      <Toasts />
    </>
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

export default BookScreen;
