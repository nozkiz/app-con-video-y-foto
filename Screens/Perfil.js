import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MiPerfilScreen() {
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('UserData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    if (!userData) {
      return (
        <View style={styles.container}>
          <Text>Cargando datos...</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentWrapper}>
          <Image style={styles.avatar} source={require('../imagenes/avatar.png')} />
          <View style={styles.profileCard}>
            <View style={styles.infoContainer}>
              <InfoItem label="Nombre" value={`${userData.username} ${userData.lastname}`} />
              <InfoItem label="Dirección" value={userData.address} />
              <InfoItem label="Teléfono" value={userData.phone} />
              <InfoItem label="Email" value={userData.email} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  infoContainer: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    width: '30%',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
});