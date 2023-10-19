import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState<any>(null);

  useEffect(() => {
    fetchExchangeRate().catch((error): void => {
      console.log(error);
    });
  }, [selectedCurrency]);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/EUR',
      );
      const rates = response.data.rates;
      const rate = rates[selectedCurrency];
      setExchangeRate(rate);
    } catch (error: any) {
      console.error('Error fetching exchange rates:', error.message);
    }
  };

  const handleConvert = () => {
    const euroAmount = parseFloat(amount);
    if (!isNaN(euroAmount) && exchangeRate) {
      const converted = euroAmount * exchangeRate;
      setConvertedAmount(converted.toFixed(2));
    } else {
      Alert.alert('Please enter a valid amount and select a currency.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        placeholder={
          selectedCurrency === 'USD' ? 'Amount in Euros' : 'Amount in Dollars'
        }
        keyboardType="numeric"
        value={amount}
        onChangeText={text => {
          setAmount(text);
        }}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedCurrency}
        onValueChange={itemValue => {
          setSelectedCurrency(itemValue);
        }}>
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
      </Picker>

      <View style={styles.box}>
        <Button title="Convert" onPress={handleConvert} />
        {convertedAmount && (
          <Text style={styles.result}>
            {amount} Euros is approximately {convertedAmount} {selectedCurrency}
          </Text>
        )}
        <Button
          title="Next screen"
          onPress={() => navigation.navigate('Third')}
        />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  picker: {
    width: '80%',
    height: 40,
  },
  result: {
    fontSize: 18,
    marginVertical: 20,
  },
  box: {
    marginTop: 150,
  },
});

export default HomeScreen;
