import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // ข้อ 8: การใช้งานไอคอน

// กำหนดโครงสร้างข้อมูลให้ตรงกับหน้าอื่น
interface BMIData {
  id: string;
  bmi: string;
  date: string;
  imageUrl: string;
}

const DeleteBMIScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState<BMIData[]>([]);

  // ฟังก์ชันดึงข้อมูล (ข้อ 2: ความสามารถในการแสดงข้อมูล)
  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@bmi_history');
      if (savedData) {
        setHistory(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  // เรียกใช้ loadData ทุกครั้งที่หน้านี้ถูกโฟกัส
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  // ฟังก์ชันลบข้อมูล (ข้อ 2: ความสามารถในการลบข้อมูล)
  const handleDelete = async (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            const updatedHistory = history.filter(item => item.id !== id);
            setHistory(updatedHistory);
            await AsyncStorage.setItem('@bmi_history', JSON.stringify(updatedHistory));
          }
        }
      ]
    );
  };

  // ฟังก์ชัน Render แต่ละรายการ (ข้อ 6: ใช้งาน FlatList)
  const renderItem = ({ item }: { item: BMIData }) => (
    <View style={styles.itemCard}>
      <View>
        <Text style={styles.bmiLabel}>BMI Result</Text>
        <Text style={styles.bmiValue}>{item.bmi}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Manage History</Text>
        <Text style={styles.headerSubtitle}>Tap the icon to remove a record</Text>
      </View>






      

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>No records found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2, // สำหรับ Android
    shadowColor: '#000', // สำหรับ iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bmiLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bmiValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4DB6AC',
  },
  dateText: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
});

export default DeleteBMIScreen;