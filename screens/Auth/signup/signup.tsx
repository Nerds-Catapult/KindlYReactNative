import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../../logic/context";
import LoadingComponent from "../../Loading/Loading";
import { toast, Toasts } from "@backpackapp-io/react-native-toast";
import { expectedJson } from "../../../interfaces/types";



const Signup = ({ navigation }: { navigation: any }) => {
  const [fullName, setName] = useState("john doe");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, authToken } = React.useContext(AuthContext);

  const checkAuth = async () => {
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
  };

  const handleSignup = async () => {
    if (!fullName || !phoneNumber || !email || !password) {
      toast("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        "https://just-actually-ape.ngrok-free.app/api/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            phoneNumber,
            email,
            password,
          }),
        }
      );
      const data: expectedJson = await response.json();
      if (data.status !== 201) {
        toast(data.message);
        return;
      } else {
        data.token && login(data.token);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      toast("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginOption}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <LoadingComponent visible={loading} />
      {!loading && signup()}
      <Toasts />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6a5acd",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#6a5acd",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#6a5acd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  loginOption: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default Signup;
