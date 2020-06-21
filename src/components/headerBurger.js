import React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

export default function HeaderBurger() {

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