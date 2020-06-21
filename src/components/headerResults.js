import React from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export default function HeaderResults() {

    return (

        <View style={[styles.rowView, { justifyContent: 'space-between' }]}>

            <Image 
                source={require('../images/qtlogo.png')}
                style={{
                    width: 50,
                    height: 40,
                    resizeMode: 'contain',
                }}
            />
            <TouchableOpacity
                onPress={() => Alert.alert("Compare", "The results are sorted top to bottom based on their suitability to calculate the QTc for the input pulse.\n\nThe colours indicate whether the calculated QTc is in the normal range (green), borderline (yellow) or prolonged/shortened (red).")}
            >
                <Text style={{ fontSize: 30, color: '#718085', fontWeight: 'bold' }}>?</Text>
            </TouchableOpacity>

        </View>

    )

}