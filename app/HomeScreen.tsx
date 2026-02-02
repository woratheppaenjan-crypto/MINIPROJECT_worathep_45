import React, { useState, useEffect } from 'react';
import {  View, Text,  FlatList, Image,  StyleSheet, SafeAreaView, TouchableOpacity 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// กำหนดประเภทข้อมูล
interface BMIData {
  id: string;
  bmi: string;
  date: string;
  imageUrl: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState<BMIData[]>([]);

  // 1. ฟังก์ชันดึงข้อมูลจากเครื่อง (AsyncStorage)
  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@bmi_history');
      if (savedData) {
        // แปลงตัวอักษรกลับเป็น Array และเอาอันใหม่ล่าสุดขึ้นก่อน
        setHistory(JSON.parse(savedData).reverse()); 
      }
    } catch (e) {
      console.log("Error loading data");
    }
  };

  // 2. ให้ดึงข้อมูลใหม่ทุกครั้งที่กลับมาหน้านี้
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  // 3. ฟังก์ชันสร้างหน้าตาแต่ละแถวในรายการ (Render Item)
  const renderItem = ({ item }: { item: BMIData }) => (
    <View style={styles.card}>
      {/* แสดงรูปภาพจากลิงก์ที่เก็บไว้ใน AsyncStorage (ตามโจทย์ข้อ 7) */}
      <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
      
      <View style={styles.info}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.bmiText}>BMI: <Text style={styles.highlight}>{item.bmi}</Text></Text>
        <Text style={styles.statusText}>
          {parseFloat(item.bmi) < 23 ? 'Healthy Weight' : 'Overweight'}
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Manage')}>
        <Ionicons name="chevron-forward-circle" size={30} color="#4DB6AC" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My History</Text>
        <Text style={styles.subtitle}>บันทึกสุขภาพของคุณ</Text>
      </View>

      {/* 4. การใช้งาน FlatList (ตามโจทย์ข้อ 6) */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="document-text-outline" size={80} color="#DDD" />
            <Text style={{ color: '#AAA', marginTop: 10 }}>ยังไม่มีข้อมูลบันทึกไว้</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// ตกแต่งความสวยงาม
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 25, backgroundColor: '#FFF', borderBottomLeftRadius: 30, borderBottomRightRadius: 25, elevation: 5 },
  title: { fontSize: 25, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#AAA' },
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: { width: 55, height: 55, borderRadius: 15, marginRight: 15 },
  info: { flex: 1 },
  dateText: { fontSize: 12, color: '#AAA', marginBottom: 2 },
  bmiText: { fontSize: 18, fontWeight: 'bold', color: '#444' },
  highlight: { color: '#4DB6AC' },
  statusText: { fontSize: 13, color: '#4DB6AC', fontWeight: '600' },
  empty: { alignItems: 'center', marginTop: 100 }
});

export default HomeScreen;