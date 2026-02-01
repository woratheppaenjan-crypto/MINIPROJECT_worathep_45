import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import Slider from '@react-native-community/slider'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function AddBMIScreen() {
  const [height, setHeight] = useState(170); //ตั้งค่าเก็บข้อมูล ผมตั้งเป็น 175/65 เพราะอิงจากค่าเฉลี่ยคนไทย
  const [weight, setWeight] = useState(65);  
  const [bmi, setBmi] = useState<string | null>(null);// useState<string | null>(null)เป็นการบอกว่าตัวแปร bmi นี้จะมีค่าเป็นได้แค่ "ตัวอักษร (String)" หรือ "ค่าว่าง (null)" เท่านั้น เพื่อป้องกัน Error จ้าา

  const calculateAndSave = async () => {
    const bmiVal = (weight / ((height / 100) ** 2)).toFixed(1); //สูตรคำนวน BMI .toFixed(1) เป็นคำสั่งปัดเศษทศนิยมคับ
    setBmi(bmiVal);// เกับค่าไว้

    const newData = {
      id: Date.now().toString(),//เป็นการสร้างคล้ายๆเลขบัตรประชาชนของข้อมูลชุดนี้ เพื่อให้ข้อหมูแต่ล่ะตัว มี ID ไม่เหมือนกันจ้าา
      bmi: bmiVal,//คือการนำค่า BMI ที่เราเพิ่งคำนวณเสร็จจากบรรทัดก่อนหน้ามาใส่ไว้ในกล่องนี้
      date: new Date().toLocaleDateString(),//เป็นการดึงวันที่ปัจจุบันจากเครื่อง มาบันทึกไว้ เพื่อให้ผู้ใช้รู้ว่าเขาคำนวณค่านี้ไว้เมื่อไหร่
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png' 
    };

    const existingData = await AsyncStorage.getItem('@bmi_history');//ดึงข้อมูลจากประวัติคับ
    const history = existingData ? JSON.parse(existingData) : [];//เเปลงเป็น อาเร
    history.push(newData);//นำข้อมูลใหม่มาต่อ
    await AsyncStorage.setItem('@bmi_history', JSON.stringify(history));//อัพเดทข้อมูลลงประวัติ
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BMI Calculator</Text>
      
      
      <View style={styles.card}>
        <Text>Height</Text>
        <Text style={styles.valueText}>{height} <Text style={styles.unit}>cm</Text></Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={100} maximumValue={220}
          value={height} onValueChange={v => setHeight(Math.floor(v))}//เมื่อเลื่อนจะสั่ง setHeight เพื่ออัปเดตตัวเลขทันที
          minimumTrackTintColor="#4DB6AC"
        />
      </View>

      
      <View style={styles.cardRow}>
        <TouchableOpacity onPress={() => setWeight(weight - 1)} style={styles.roundBtn}><Ionicons name="remove" size={24}/></TouchableOpacity>
        <View style={{alignItems:'center'}}>
          <Text>Weight</Text>
          <Text style={styles.valueText}>{weight} <Text style={styles.unit}>kg</Text></Text>
        </View>
        <TouchableOpacity onPress={() => setWeight(weight + 1)} style={styles.roundBtn}><Ionicons name="add" size={24}/></TouchableOpacity>
      </View>

      
      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.bmiResult}>{bmi}</Text>
          <Text style={{color: '#4DB6AC', fontWeight: 'bold'}}>Normal Weight</Text>
        </View>
      )}

      <TouchableOpacity style={styles.mainBtn} onPress={calculateAndSave}> 
        <Text style={styles.mainBtnText}>CALCULATE BMI</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 25, justifyContent: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 20, elevation: 3 },
  cardRow: { backgroundColor: 'white', padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, elevation: 3 },
  valueText: { fontSize: 35, fontWeight: 'bold' },
  unit: { fontSize: 16, fontWeight: 'normal', color: 'gray' },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center' },
  mainBtn: { backgroundColor: '#4DB6AC', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  mainBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resultContainer: { alignItems: 'center', marginVertical: 20 },
  bmiResult: { fontSize: 48, fontWeight: 'black' }
});

