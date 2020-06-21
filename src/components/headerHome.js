import React from 'react';
import { Text, View, Alert, Image } from 'react-native';
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HeaderHome() {

    return (

        <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
            
            <Text>{""}</Text>
            <Image 
                source={require('../images/qtlogo.png')}
                style={{
                    width: 50,
                    height: 40,
                    resizeMode: 'contain',
                }}
            />
            <TouchableOpacity
                onPress={() => Alert.alert("Input", "Please put in your data.\n\nYou can change the metric units used by selecting them from the dropdown menu next to the text fields. \n\n“Automatic Formula Suggestion” lets you inspect only the best suited formula.")}
            >
                <Text style={{ fontSize: 30, color: '#718085', fontWeight: 'bold' }}>?</Text>
            </TouchableOpacity>

        </View>

    )

}