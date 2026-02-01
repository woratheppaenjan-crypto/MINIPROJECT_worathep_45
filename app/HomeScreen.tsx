import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BMIData {
  id: string;
  bmi: string;
  status: string;
  date: string;
  imageUrl: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState<BMIData[]>([]);

  const loadData = async () => {
    const savedData = await AsyncStorage.getItem('@bmi_history');
    if (savedData) setHistory(JSON.parse(savedData));
  };


  return (
    <SafeAreaView>
        <View>
         <Text>BMI</Text>
        <View style={styles.container}>
        <Text style={styles.title}>BMI History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.img} />
            <View>
              <Text style={styles.bmiText}>BMI: {item.bmi}</Text>
              <Text>{item.status}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddBMI')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
        </View>
        
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 10, alignItems: 'center', elevation: 2 },
  img: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  bmiText: { fontSize: 18, fontWeight: 'bold' },
  date: { color: 'gray', fontSize: 12 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#4DB6AC', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }
});

export default HomeScreen;