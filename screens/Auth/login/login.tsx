import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    if (tokenExists) {
      navigation.replace('Home');
    }
  }, [tokenExists, navigation]);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    
    setTokenExists(true);
  };

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

      <TouchableOpacity style={styles.loginOption} onPress={() => navigation.navigate('SignIn')}>
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
