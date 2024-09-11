import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StackScreen() {
    const navigation = useNavigation(); 

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('UserData');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Opciones</Text>
            </View>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Mi Perfil')}>
                    <Ionicons name="person-outline" size={60} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Mi Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Videos')}>
                    <FontAwesome5 name="video" size={60} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Fotos')}>
                    <MaterialCommunityIcons name="image-outline" size={60} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Fotos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Audios')}>
                    <Feather name="volume-2" size={60} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Audios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ocio')}>
                    <MaterialCommunityIcons name="earth" size={60} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Ocio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={handleLogout}>
                    <AntDesign name="logout" size={60} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Salir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 15,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#4a54f1',
        borderRadius: 10,
        width: '45%', // Ajustado para que quepan dos elementos por fila
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    icon: {
        marginBottom: 10,
    },
    cardText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});
