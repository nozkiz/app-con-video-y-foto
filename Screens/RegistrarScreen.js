import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function RegistrarScreen() {
  const navigation = useNavigation();

  const data = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Ninguno', value: 'Ninguno' },
  ];

  const [userName, setName] = useState('');
  const [userLastName, setLastName] = useState('');
  const [userPhone, setPhone] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userAddress, setAddress] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [userPassword, setPassword] = useState('');

  const saveDataRegister = async () => {
    if (!userName || !userLastName || !userPhone || !userEmail || !userAddress || !value || !userPassword) {
      showAlert('Debe diligenciar todos los campos.', 0);
      return;
    }

    const data = {
      username: userName,
      lastname: userLastName,
      phone: userPhone,
      email: userEmail,
      address: userAddress,
      genero: value,
      pass: userPassword,
    };

    await AsyncStorage.setItem('UserData', JSON.stringify(data));
    showAlert('Los datos fueron almacenados.', 1);
  };

  const showAlert = (message, success) => {
    Alert.alert(
      "Mensaje",
      message,
      [
        {
          text: "OK",
          onPress: () => {
            if (success) {
              navigation.navigate('Stack');
            }
          }
        }
      ]
    );
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'purple' }]}>
          Género
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Nombre Completo'
          style={styles.input}
          onChangeText={setName}
          value={userName}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Apellido Completo'
          style={styles.input}
          onChangeText={setLastName}
          value={userLastName}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Teléfono'
          style={styles.input}
          onChangeText={setPhone}
          value={userPhone}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={setEmail}
          value={userEmail}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Dirección'
          style={styles.input}
          onChangeText={setAddress}
          value={userAddress}
        />
      </View>
      <View style={styles.dropdownWrapper}>
        {renderLabel()}
        <Dropdown
          search
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={!isFocus ? 'Seleccionar género' : '...'}
          searchPlaceholder="Buscar..."
          data={data}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'purple' : 'gray'}
              name='Safety'
            />
          )}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Contraseña'
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          value={userPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={saveDataRegister}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
