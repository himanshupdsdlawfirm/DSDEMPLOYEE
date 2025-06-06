import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../context';
import Loader from '../../../../components/common/Loader';
import Input from '../../../../components/common/Input';
import LoginScreen from '../Login';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loading } = useAuth();

  const handleRegister = async () => {
    try {
      await signUp({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.title}>Register</Text>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Register" onPress={handleRegister} />
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  footerLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;