import React, { useEffect } from "react";
import { Text, Image, View, ImageBackground, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const initializeStorage = async () => {
            try {
                const storedData = await AsyncStorage.getItem('UserData');
                if (!storedData) {
                    // Guarda el usuario predeterminado
                    await AsyncStorage.setItem('UserData', JSON.stringify({ email: 'jaime', pass: 'hola' }));
                }
            } catch (error) {
                console.error('Error initializing storage:', error);
            }
        };

        initializeStorage();
    }, []);

    const handleLogin = async () => {
        try {
            // Obtiene los datos almacenados
            const storedData = await AsyncStorage.getItem('UserData');
            const parseData = storedData ? JSON.parse(storedData) : null;

            if (parseData && parseData.email === 'jaime' && parseData.pass === 'hola') {
                // Si la autenticación es exitosa, navega al stack
                navigation.navigate('Stack');
            } else {
                showAlert('Correo o contraseña incorrectos.', false);
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión.');
        }
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
                            // La redirección se maneja en handleLogin
                        }
                    }
                }
            ]
        );
    };

    return (
        <ImageBackground style={styles.backgroundImage} source={require('../imagenes/FondoMovil.png')}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarImage} source={require('../imagenes/avatar.png')} />
                </View>
                <View style={styles.loginCard}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.link}
                            onPress={() => navigation.navigate('Registro')}
                        >
                            <Text style={styles.linkText}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    avatarImage: {
        width: 150,
        height: 150,
    },
    loginCard: {
        marginTop: 60,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 25,
        paddingVertical: 15,
        width: 200,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: '#007bff',
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
