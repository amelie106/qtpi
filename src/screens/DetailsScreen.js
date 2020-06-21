import React, { useState, useEffect,Fragment } from 'react';
import { View,StyleSheet, ImageBackground ,Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../components/styles';
import settings from '../components/settings';
import Home from './Home';

function DirectResult ({route, navigation}) {

    const { qt, frequency, fName, fFunktion, fString, setFrequency, setQt } = route.params;

    //const list = ["Bazzett","Friderica", "Framingham","Hodges", "Rautaharju", "Sarma"];
    let resultArr = [];

    // find position of qtc on range graphic
    const arrow_pos = () =>{

        var QTc = fFunktion;

        var pos;

        if (QTc >= 600)
            pos = 100;
        else if (QTc <= 280)
            pos = 0;
        else
            pos = (QTc-280)/3.2;


        return JSON.stringify(pos)+'%';
    }

    //converting frequency to bpm
    let frequency_converted;
    if(settings.freqUnit=="bpm"){
        frequency_converted = frequency;
    }
    else if(settings.freqUnit=="ms"){
        frequency_converted= 60000/frequency;
    }
    else if(settings.freqUnit=="mm"){
        if(settings.paperspeed){
            frequency_converted =60/(frequency/50);
        }
        else{
            frequency_converted = 60/(frequency/25);
        }
    }
    //converting QT Intervall to sec
    let qt_converted;
    if(settings.qtUnit=="mm"){
        qt_converted = qt/50; 
    }
    else if(settings.qtUnit=="ms"){
        qt_converted= qt/1000;
    }
    
    //function to pick the best formula
    const func = (bpm) => {
        for (let i=0;i<2;i++){
            if(bpm>60 && bpm< 80){
                resultArr.push({
                    name: "Bazzett",
                    funktion: (qt_converted/Math.sqrt(60/frequency_converted))*1000,
                    funcString: "QTc(ms) = (QT(sec) / √RR)*1000"    
                });
                break;
            }
            if(bpm>0 && bpm<200){
                resultArr.push({
                    name: "Fridericia",
                    funktion: (qt_converted/Math.cbrt(60/frequency_converted))*1000,
                    funcString: "QTc(ms) = (QT(sec) / RR^1/3)*1000"   
                });
                break;
            }
            if(bpm>0 && bpm<200){
                resultArr.push({
                    name: "Framingham",
                    funktion: (qt_converted + 0.154*(1-(60/frequency_converted)))*1000,
                    funcString: " QTc(ms) = (QT(sec) + 0.154 x (1 - RR))*1000"
                });
                break;
            }
            if(bpm>50 && bpm<150){
                resultArr.push({
                    name: "Hodges",
                    funktion: (qt_converted + 0.00175*(frequency_converted - 60))*1000,
                    funcString: "QTc(ms) = (QT(sec) + 0.00175 x [(60 / RR) − 60])*1000"
                });
                break;
            }
            if(bpm>40 && bpm< 100){
                resultArr.push({
                    name: "Rataharju",
                    funktion: (qt_converted + 0.24251 - 0.434*(Math.exp(-0.0097*frequency_converted)))*1000,
                    funcString: "QTc(ms) = (QT(sec) + 0.2451 - 0.434 x e^(-0.0097*(60 / RR)])*1000"
                });
                break;
            }
            if(bpm > 50 && bpm < 90){
                resultArr.push({
                    name: "Sarma",
                    funktion: (qt_converted - 0.04462 + 0.664*(Math.exp(-2.7*(60/frequency_converted))))*1000,
                    funcString: "QTc(ms) = (QTc(sec) - 0.04462 + 0.664*e^(-2.7*(60/RR)))*1000"
                });
                break;
            }
        }
    
    }
    
    //getting a style based on result value, so the user gets a color based interpretation
    const getStyle = (QTc) => {
        if(settings.gender){
            if (QTc<340 || QTc>470){
                
                return styles.dviewStyleFirstRed;
                
                
            }
            else if(QTc>370 && QTc <=450){
                
                    return styles.dviewStyleFirstGreen;
                
                
            }
            else{
                
                return styles.dviewStyleFirstYellow;
                
                 
            }
        }
        else{
            if (QTc<330 || QTc>450){
               
                return styles.dviewStyleFirstRed;
                
            }
            else if(QTc>360 && QTc <=430){
                
                return styles.dviewStyleFirstGreen;
                
                
            }
            else{
                
                return styles.dviewStyleFirstYellow;
                 
            }
        }
        

    }
    // QTc Interpretations
    var shortened = "shortened";
    var borderlineShortened = "slightly shortened";
    var normal = "normal";
    var borderlineProlonged = "slightly prolonged";
    var prolonged = "prolonged";

    //function to find out what the Interpretation is
    const getInterpretation = (QTc) => {
        if(settings.gender){
            if(QTc<=340){
                return shortened;
            }
            else if(QTc>340 && QTc<=370){
                return borderlineShortened;
            }
            else if(QTc>370 && QTc<=450){
                return normal;
            }
            else if(QTc>450 && QTc<=470){
                return borderlineProlonged;
            }
            else if(QTc>470){
                return prolonged;
            }
        }
        else{
            if(QTc<=330){
                return shortened;
            }
            else if(QTc>330 && QTc<=360){
                return borderlineShortened;
            }
            else if(QTc>360 && QTc<=430){
                return normal;
            }
            else if(QTc>430 && QTc<=450){
                return borderlineProlonged;
            }
            else if(QTc>450){
                return prolonged;
            }
        }
    }
    // get a String from gender
    const getGender = (gender) => {
        if(settings.gender){
            return "Female";
        }
        else{
            return "Male";
        }
    }
    //image sources
    let images = [{
        source: require('../images/intervalMale.png'),
      }, {
        source: require('../images/intervalFemale.png'),
      }]

    func(frequency_converted);
    return (
        
        <View style ={styles.dviewScreen}>
            {resultArr.map(formula => 
                <View style = {{ marginHorizontal: '9%', height: '100%'}}>
                    <View style = {styles.dviewFormulaNameView}>
                        <Text style = {styles.dviewFormulaName}>{fName} Formula</Text>
                    </View>
                    <View  style={getStyle(Math.trunc(fFunktion))} > 
                                        
                        
                            <View style = {{height: '71%', alignItems: 'center', justifyContent: 'flex-end'}}>  
                                <Text style = {{fontSize: 62, fontWeight: 'bold'}}>{Math.trunc(fFunktion)} ms  </Text>
                                
                            </View>
                            <View style = {{width: '92.5%', height: '29%',alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '5%'}}>
                                <Text style = {styles.interpretationFirst}>{getInterpretation(fFunktion)}</Text>
                                
                            </View>                  
                                        
                    </View>
                    <View style = {{ height: '15%', flexDirection: 'column', justifyContent: 'space-around'}}>
                        <View style = {{backgroundColor:'#FFFFFF',height: '10%'}}>
                            
                        </View>
                        <View style = {{flexDirection: 'row', flex: 1, justifyContent:'space-between'}}>
                            <View style = {{width:'60%', backgroundColor: 'white'}}>
                                <Text style = {{color: '#999999', fontSize: 18}}>Pulse</Text>
                            </View>
                            <View style = {styles.dviewTextView2}>
                                <Text style = {{color: '#999999', fontSize: 18}}>{frequency_converted} bpm</Text>
                            </View>
                        </View>
                        <View style = {{flexDirection: 'row', flex: 1, justifyContent:'space-between'}}>
                            <View style = {styles.dviewTextView}>
                                <Text style = {{color: '#999999', fontSize: 18}}>Measured QT:</Text>
                            </View >
                            <View style = {styles.dviewTextView2}>
                                <Text style = {{color: '#999999', fontSize: 18}}>{qt_converted*1000} ms</Text>
                            </View>
                        </View>
                        <View style = {{flexDirection: 'row', flex: 1, justifyContent:'space-between'}}>
                            <View style = {styles.dviewTextView}>
                                <Text style = {{color: '#999999', fontSize: 18}}>Gender:</Text>
                            </View>
                            <View style = {styles.dviewTextView2}>
                                <Text style = {{color: '#999999', fontSize: 18}}>{getGender(settings.gender)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {{height: '17%', justifyContent: 'flex-start'}}>
                        <Text style = {{marginTop: 15, color: '#4db0b0', fontSize: 18, fontWeight: 'bold'}}>{fName} Formula:</Text>
                        <Text style = {{color: '#999999',fontSize: 18}}>{fString}</Text>
                    </View >
                    <View style = {{height: '5%'}}>
                        <Text style = {{color: '#4db0b0', fontSize: 18, fontWeight: 'bold'}}>QTc-Ranges:</Text>
                    </View >

                    <View style={styles.centeredView2}>
                    <ImageBackground 
                        source={images[settings.gender].source}
                        style={{
                        width: 300,
                        height: 150,
                        resizeMode: 'contain',
                        }}
                    >
                        <View style={{
                            marginTop: 40,
                            height: 31,
                            width: arrow_pos(), 
                            borderRightColor:"#000",
                            borderRightWidth:2,
                        }}/>
                    </ImageBackground>
                    </View> 

                    <View style = {{height: '20%', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={
                                () => {
                                    //we Pass functions to be executed in the other View
                                    setFrequency('');
                                    setQt('');
                                    navigation.navigate('QTpi')
                                }
                                
                                
                                
                            }
                            >
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>New Calculation</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )}
        </View>
       

        

    );
    
}

export default DirectResult;