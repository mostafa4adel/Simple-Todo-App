import { useState, useEffect } from 'react';
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import LoginComponent from './../components/login_component';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();



  return (
    <View>
      <LoginComponent />
      <Button>
        Don't have an account? Register
      </Button>
    </View>
  );
};

export default LoginScreen;