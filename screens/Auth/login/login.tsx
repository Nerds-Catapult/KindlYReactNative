import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import axios from 'axios';
import { AuthContext } from '../../../logic/context';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, authToken } = React.useContext(AuthContext);
  
  interface expectedJson{
    status: number,
    message: string,
    isAuthenticated: boolean,
    token: string
    data: {
      id: string,
      name: string,
      email: string,
      phone: string,
      createdAt: string,
      updatedAt: string,
    } | null
  }
  

  const handleLogin = async () => {
    if (  !email || !password) {
      toast("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        "https://just-actually-ape.ngrok-free.app/api/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data: expectedJson = await response.json();
      if (data.status !== 201) {
        toast(data.message);
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

  const checkAuth = async () => {
    if (authToken == null || authToken == "" || authToken == undefined || !authToken) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        "https://just-actually-ape.ngrok-free.app/api/auth",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data: expectedJson = response.data;
      if (data.isAuthenticated) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);
    
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginOption} onPress={() => navigation.navigate('signup')}>
        <Text>Create An Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6a5acd',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#6a5acd', 
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#6a5acd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginOption: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default Login;
