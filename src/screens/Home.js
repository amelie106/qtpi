import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CheckBox, View, TextInput, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ButtonGroup, Icon } from 'react-native-elements';
import styles from '../components/styles';
import settings from '../components/settings';
import { reset } from 'expo/build/AR';

function Home({navigation}) {

  const [frequency, setFrequency] = useState('');
  () => setFrequency(frequency);
  const [qt, setQt] = useState('');
  const [, setFreqUnit] = useState(settings.freqUnit);
  const [, setQtUnit] = useState(settings.qtUnit);
  const gender = ["Male", "Female"];
  const [genderIndex, setGenderIndex] = useState(settings.gender);
  const [isAutomatic, setAutomatic] = useState(settings.automatic);
  const [isLoading, setLoading] = useState(true);
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const qtInput = useRef(null);
  const [freqErrorInput, setFreqErrorInput] = useState(false);
  const [qtErrorInput, setQtErrorInput] = useState(false);

  let freqs = [{
    value: 'bpm',
  }, {
    value: 'mm',
  }, {
    value: 'ms',
  }];

  let qts = [{
    value: 'mm',
  }, {
    value: 'ms',
  }];


  const resetFreqError = () => {
    setFreqErrorInput(false);
  }

  const resetQtError = () => {
    setQtErrorInput(false);
  }


  {/* Save Settings */}
  const saveData = async () => {
    try {

      await AsyncStorage.setItem('saved_data', JSON.stringify(settings))

    } catch (error) {
    } finally {
      readData()
    }
  }

  {/* Query Settings */}
  const readData = async () => {
    try {

      const retreive = await AsyncStorage.getItem('saved_data')
      const saved = JSON.parse(retreive)
      settings.freqUnit = saved.freqUnit;
      setFreqUnit(saved.freqUnit);
      settings.qtUnit = saved.qtUnit;
      setQtUnit(saved.qtUnit);
      settings.gender = saved.gender;
      setGenderIndex(saved.gender);
      settings.automatic = saved.automatic;
      setAutomatic(saved.automatic);
      settings.paper_speed = saved.paper_speed;

    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {

      readData()

    } finally {
    }
  }, [settings])

  if (isLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }

  return (

    <>

      <View style={styles.homeView}>

        {/* Frequency */}
          {settings.freqUnit === 'bpm' 
            ? <Text style={styles.description}>Pulse</Text>
            : <Text style={styles.description}>RR Interval</Text>
          }
        <View style={styles.rowView}>
          <TextInput
            id = "wierd"
            onChangeText={frequency => {setFrequency(frequency)}}
            onFocus={() => resetFreqError()}
            style={freqErrorInput ? styles.inputError : styles.input}
            placeholder='Pulse'
            keyboardType='numeric'
            returnKeyType='next'
            selectTextOnFocus
            blurOnSubmit={false}
            onSubmitEditing={() => qtInput.current.focus()}
            defaultValue={frequency}
          />
          <Dropdown
            value={settings.freqUnit}
            data={freqs}
            baseColor={'#4db0b0'}
            textColor={'#4db0b0'}
            selectedItemColor={'#4db0b0'}
            containerStyle={styles.dropdown}
            inputContainerStyle={{ borderBottomColor: 'transparent', height: 88, width: 70 }}
            
            onChangeText={(freqUnit) => { setFreqUnit(freqUnit); settings.freqUnit = freqUnit; saveData() }}
          />
        </View>

        {/* QT Interval */}
        <Text style={styles.description}>QT Interval</Text>
        <View style={styles.rowView}>
          <TextInput
            onBlur={()=> resetQtError()}
            style={qtErrorInput ? styles.inputError : styles.input}
            ref={qtInput}
            keyboardType='numeric'
            selectTextOnFocus
            placeholder='QT Interval'
            onChangeText={qt => setQt(qt)}
            defaultValue={qt}
          />
          <Dropdown
            value={settings.qtUnit}
            data={qts}
            baseColor={'#4db0b0'}
            textColor={'#4db0b0'}
            selectedItemColor={'#4db0b0'}
            containerStyle={styles.dropdown}
            inputContainerStyle={{ borderBottomColor: 'transparent',height: 88, width: 70  }}
            onChangeText={(qtUnit) => { settings.qtUnit = qtUnit; setQtUnit(qtUnit); saveData() }}
          />
        </View>

        {/* Gender Selection */}
        <View style={{ marginTop: 20 }}>
          <ButtonGroup
            onPress={(index) => { settings.gender = index; setGenderIndex(index); saveData(); forceUpdate }}
            buttons={gender}
            selectedButtonStyle={{ backgroundColor: '#4db0b0' }}
            containerStyle={{ borderRadius: 7 }}
            selectedIndex={genderIndex}
          />
        </View>

        {/* Automatic Formula Selection */}
        <View style={[styles.rowView, { marginTop: 20 }]}>
          <CheckBox
            value={settings.automatic}
            onValueChange={() => {
              isAutomatic
                ? [settings.automatic = false, setAutomatic(false), saveData()]
                : [settings.automatic = true, setAutomatic(true), saveData()]
            }}
          />
          <TouchableOpacity
            style={{ margin: 7 }}
            onPress={() => {
              isAutomatic
                ? [settings.automatic = false, setAutomatic(false), saveData()]
                : [settings.automatic = true, setAutomatic(true), saveData()]
            }}
          >
            <Text>Automatic Formula Suggestion</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Burger Menu & Calculate Button */}
      <View style={styles.rowView}>
        <Icon
          name='menu'
          color='#4db0b0'
          style={{alignSelf:'flex-end', flex: 1}}
          size={60}
          onPress={() => navigation.navigate("Weiteres")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => {
              let destination = isAutomatic ? "DirectResult" : "Results";
              frequency.length<1 || isNaN(frequency) ? setFreqErrorInput(true) : null; // || not numeric
              qt.length<1 || isNaN(qt) ? setQtErrorInput(true) : null; // || not numeric
              frequency.length<1 || qt.length<1 || isNaN(frequency) || isNaN(qt) ? null : 
              navigation.navigate(destination, {
                qt,
                frequency,
                setFrequency,
                setQt
              });
            
            }
          }
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}>Calculate</Text>
        </TouchableOpacity>

      </View>

    </>

  );
  
}

export default Home;