import { useState, useEffect } from 'react';
import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginComponent from './../components/login_component';

const LoginScreen: React.FC = () => {

  const checkTokenAndDelete = async () => {
    const token = await AsyncStorage.getItem('token');
    // delete the token if exists
    if (token) {
      await AsyncStorage.removeItem('token');
    }
  };
  
  useEffect(() => {
    checkTokenAndDelete();
  }, []);

  return (
    <View>
      <LoginComponent />
    </View>
  );
};

export default LoginScreen;