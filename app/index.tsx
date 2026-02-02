import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ข้อ 8: ใช้งานไอคอน
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddBMIScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);
  const navigation = useRouter()

  const calculateAndSave = async () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiVal = (w / ((h / 100) ** 2)).toFixed(1);
      setBmi(bmiVal);

      const newData = {
        id: Date.now().toString(),
        bmi: bmiVal,
        date: new Date().toLocaleDateString(),
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png' 
      };

      const existingData = await AsyncStorage.getItem('@bmi_history');
      const history = existingData ? JSON.parse(existingData) : [];
      history.push(newData);
      await AsyncStorage.setItem('@bmi_history', JSON.stringify(history));
      
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FBFC' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          
          <View style={styles.headerRow}>
            <View style={{ width: 40 }} /> {/* Space เพื่อให้ตัวหนังสืออยู่กลาง */}
            <Text style={styles.headerTitle}>BMI Calculator</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('/HomeScreen')} // กดแล้วไปหน้า History
              style={styles.iconButton}
            >
              <Ionicons name="time-outline" size={28} color="#4DB6AC" />
            </TouchableOpacity>
          </View>

          {/* ช่องกรอก Height */}
          <View style={styles.inputCard}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="decimal-pad"
                value={height}
                onChangeText={setHeight}
                placeholderTextColor="#CCC"
              />
              <Text style={styles.unitText}>cm</Text>
            </View>
          </View>

          {/* ช่องกรอก Weight */}
          <View style={styles.inputCard}>
            <Text style={styles.label}>Weight</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="0"
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
                placeholderTextColor="#CCC"
              />
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>

          {/* ส่วนแสดงผลลัพธ์ */}
          {bmi && (
            <View style={styles.resultBox}>
               <Text style={styles.bmiNumber}>{bmi}</Text>
               <Text style={styles.bmiStatus}>
                 {parseFloat(bmi) < 18.5 ? 'Underweight' : 
                  parseFloat(bmi) < 23 ? 'Normal Weight' : 'Overweight'}
               </Text>
               <Text style={styles.motivationText}>Great job, keep it up!</Text>
            </View>
          )}

          <TouchableOpacity style={styles.calculateBtn} onPress={calculateAndSave}>
            <Text style={styles.btnText}>CALCULATE BMI</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 40 
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#333' },
  iconButton: { padding: 5 },
  inputCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  label: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 5 },
  inputRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' },
  textInput: { fontSize: 45, fontWeight: 'bold', color: '#333', textAlign: 'center', minWidth: 100 },
  unitText: { fontSize: 20, color: '#AAA', marginLeft: 5 },
  resultBox: { alignItems: 'center', marginVertical: 20 },
  bmiNumber: { fontSize: 60, fontWeight: '900', color: '#333' },
  bmiStatus: { fontSize: 20, fontWeight: 'bold', color: '#4DB6AC', marginTop: 5 },
  motivationText: { fontSize: 13, color: '#AAA', marginTop: 5 },
  calculateBtn: { 
    backgroundColor: '#4DB6AC', 
    paddingVertical: 18, 
    borderRadius: 18, 
    alignItems: 'center', 
    marginTop: 'auto',
    marginBottom: 30 
  },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});