import React from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export default function HeaderDirectResult() {

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

        </View>

    )

}