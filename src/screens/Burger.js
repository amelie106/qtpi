import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, Image, ActivityIndicator, AsyncStorage, Linking, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from '../components/styles';
import settings from '../components/settings';

function Burger() {

  const paper = [25, 50];
  const [, setPaperSpeed] = useState(settings.paper_speed);
  const gender = ["Male", "Female"];
  const [genderIndex, setGenderIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  let images = [{
    source: require('../images/intervalMale.png'),
  }, {
    source: require('../images/intervalFemale.png'),
  }]

  {/* Save Settings */}
  const saveData = async () => {
    try {

      AsyncStorage.setItem('save_paper', JSON.stringify(settings.paper_speed))

    } finally {
      readData()
    }
  }
  
  {/* Query Settings */}
  const readData = async () => {
    try {

      const retreive = await AsyncStorage.getItem('save_paper')
      const saved = JSON.parse(retreive)
      settings.paper_speed = saved;
      setPaperSpeed(saved.paper_speed);

    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {

      readData()

    } catch (error) {
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

    <ScrollView style={{ backgroundColor: 'white' }}>

      <View style={[styles.centeredView, { marginTop: 20 }]}>

        {/* Paper Speed */}
        <Text style={styles.description}>Paper Speed</Text>

        <ButtonGroup
          onPress={(index) => { settings.paper_speed = index; setPaperSpeed(index); saveData(); forceUpdate }}
          buttons={paper}
          selectedButtonStyle={{ backgroundColor: '#4db0b0' }}
          containerStyle={{ borderRadius: 7 }}
          selectedIndex={settings.paper_speed}
        />

        {/* Intervals */}
        <Text style={[styles.description, { marginTop: 30 }]}>Intervals</Text>

        <ButtonGroup
          onPress={(index) => { setGenderIndex(index); forceUpdate }}
          buttons={gender}
          selectedButtonStyle={{ backgroundColor: '#4db0b0' }}
          containerStyle={{ borderRadius: 7 }}
          selectedIndex={genderIndex}
        />

        <View style={styles.centeredView}>
          <Image
            resizeMode='cover'
            style={{
              width: 300,
              height: 150,
              resizeMode: 'contain',
            }}
            source={images[genderIndex].source}
          />
        </View>

        {/* Ranges for formulas */}
        <Text style={{
          marginTop:-35,
          marginBottom: 10,
          fontSize: 18,
          color: '#999999'
          }}>
          Formulas with suitable ranges
        </Text>

        <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'flex-start' }}>
          Bazett: 60 - 80 bpm
        </Text>  
        <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'flex-start' }}>
          Friderica: 0 - 200 bpm
        </Text>
        <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'flex-start' }}>
          Framingham: 0 - 200 bpm
        </Text>  
        <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'flex-start' }}>
          Hodges: 50 - 150 bpm
        </Text>
        <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'flex-start' }}>
          Rataharju: 40 - 100 bpm
        </Text>
        <Text style={{ paddingLeft: 10, fontSize: 15, alignSelf: 'flex-start' }}>
          Sarma: 50 - 90 bpm
        </Text>


        {/* Literature */}
        <Text style={{
          marginTop: 20,
          fontSize: 18,
          color: '#999999'
          }}>
          Literature
        </Text>

        <Text style={{ padding: 10, fontSize: 15 }}>
          <Text>
            Burns, E. (2019). QT Interval. Von {''}
          </Text>
          <Text style={{ color: '#4db0b0', textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL('https://litfl.com/qt-interval-ecg-library/')}>
            Life in the Fastlane
            </Text>
          <Text>
            {''} abgerufen.
          </Text>
        </Text>
        <Text style={{ padding: 10, fontSize: 15 }}>
          <Text style={{ padding: 10, fontSize: 15 }}>Hnatkova, K., Vicente, J., Johannesen, L., Garnett, C., Stockbridge, N., & Malik, M. (2019). Errors of Fixed QT Heart Rate Corrections Used in the Assessment of Drug-Induced QTc Changes. Frontiers in physiology, 10, S. 635-655. doi:{' '}</Text>
          <Text style={{ color: '#4db0b0', textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL('https://doi.org/10.3389/fphys.2019.00635')}>
            https://doi.org/10.3389/fphys.2019.00635
          </Text>
        </Text>
        <Text style={{ padding: 10, fontSize: 15 }}>
          Viskin, S. (2009). The QT interal: too long, too short or just right. Heart Rhythm, 6(5), S. 711-715.
        </Text>

      </View>

    </ScrollView>

  );

}

export default Burger;