import React, { useState, useEffect, Fragment, createContext, useContext } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../components/styles';
import settings from '../components/settings';  
import Formula from '../components/Formula';
import DirectResult from './DirectResult';


function Results ({route, navigation}) {

    

    //bringing information from other screens here

    const { qt, frequency, setFrequency, setQt } = route.params;
    
    
    let counter = 2;

    
    // NOTE TO IVO: DO WE NEED THIS?
    //const list = ["Bazzett","Friderica", "Framingham","Hodges", "Rautaharju", "Sarma"];

    //those lists get concatinated and are use for the formula sorting
    let retList = [];
    let helpList= [];
    
    //Heartfrequency changed to bpm
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
    //qt Intervall changed to sec
    let qt_converted;
    if(settings.qtUnit=="mm"){
        qt_converted = qt/50; 
    }
    else if(settings.qtUnit=="ms"){
        qt_converted= qt/1000;
    }
    

    
    //both arrays get filled with formula objects in a series of if else statements
    if(frequency_converted>60 && frequency_converted< 80) {
        retList.push({
            name: "Bazzett",
            funktion: (qt_converted/Math.sqrt(60/frequency_converted))*1000,
            funcString: "QTc(ms) = (QT(sec) / √RR)*1000"    
        });
    }
    else{
        helpList.push({
            name: "Bazzett",
            funktion: (qt_converted/Math.sqrt(60/frequency_converted))*1000,
            funcString: "QTc(ms) = (QT(sec) / √RR)*1000"
        })
    }



    if(frequency_converted>0 && frequency_converted<200) {
        retList.push({
            name: "Fridericia",
            funktion: (qt_converted/Math.cbrt(60/frequency_converted))*1000,
            funcString: "QTc(ms) = (QT(sec) / RR^1/3)*1000"   
        });
    }
    else{   
        helpList.push({
            name: "Fridericia",
            funktion: (qt_converted/Math.cbrt(60/frequency_converted))*1000,
            funcString: "QTc(ms) = (QT(sec) / RR^1/3)*1000"   
        });
    }
    if(frequency_converted>0 && frequency_converted<200) {
        retList.push({
            name: "Framingham",
            funktion: (qt_converted + 0.154*(1-(60/frequency_converted)))*1000,
            funcString: "QTc(ms) = (QT(sec) + 0.154 x (1 - RR))*1000"
        });
    }
    else{
        helpList.push({
            name: "Framingham",
            funktion: (qt_converted + 0.154*(1-(60/frequency_converted)))*1000,
            funcString: "QTc(ms) = (QT(sec) + 0.154 x (1 - RR))*1000"
        });
    }

    if (frequency_converted>50 && frequency_converted<150) {
        retList.push({
            name: "Hodges",
            funktion: (qt_converted + 0.00175*(frequency_converted - 60))*1000,
            funcString: "QTc(ms) = (QT(sec) + 0.00175 x [(60 / RR) − 60])*1000"
        });
    }
    else {
        helpList.push({
            name: "Hodges",
            funktion: (qt_converted + 0.00175*(frequency_converted - 60))*1000,
            funcString: "QTc(ms) = (QT(sec) + 0.00175 x [(60 / RR) − 60])*1000"
        });
    }

    if(frequency_converted>40 && frequency_converted< 100) {
        retList.push({
            name: "Rataharju",
            funktion: (qt_converted + 0.24251 - 0.434*(Math.exp(-0.0097*frequency_converted)))*1000,
            funcString: "QTc(ms) = (QT(sec) + 0.2451 - 0.434 x e^(-0.0097*(60 / RR)])*1000"
        });
    }
    else{
        helpList.push({
            name: "Rataharju",
            funktion: (qt_converted + 0.24251 - 0.434*(Math.exp(-0.0097*frequency_converted)))*1000,
            funcString: "QTc(ms) = (QT(sec) + 0.2451 - 0.434 x e^(-0.0097*(60 / RR)])*1000"
        });
    }

    if(frequency_converted > 50 && frequency_converted < 90) {
        retList.push({
            name: "Sarma",
            funktion: (qt_converted - 0.04462 + 0.664*(Math.exp(-2.7*(60/frequency_converted))))*1000,
            funcString: "QTc(ms) = (QTc(sec) - 0.04462 + 0.664*e^(-2.7*(60/RR)))*1000"
        });
    }
    else{
        helpList.push({
            name: "Sarma",
            funktion: (qt_converted - 0.04462 + 0.664*(Math.exp(-2.7*(60/frequency_converted))))*1000,
            funcString: "QTc(ms) = (QTc(sec) - 0.04462 + 0.664*e^(-2.7*(60/RR)))*1000"
        });
    }
    
    //final Array gets created
    let finalList = retList.concat(helpList);
    
    
    var first = true;

    //incrementing our counter
    const increment = async => {
        counter = counter+1

    }

    //choosing a style to change the color of a VIew based on the result value
    const getStyle = (QTc) => {
        if(settings.gender){
            if (QTc<340 || QTc>470){
                if(first){
                    return styles.styleFirstRed;
                }
                else{
                    return styles.styleRestRed;
                }
            }
            else if(QTc>370 && QTc <=450){
                if(first){
                    return styles.styleFirstGreen;
                }
                else{
                    return styles.styleRestGreen;
                }
            }
            else{
                if(first){
                    return styles.styleFirstYellow;
                }
                else{
                    return styles.styleRestYellow;
                } 
                 
            }
        }
        else{
            if (QTc<330 || QTc>450){
                if(first){
                    return styles.styleFirstRed;
                }
                else{
                    return styles.styleRestRed;
                }
            }
            else if(QTc>360 && QTc <=430){
                if(first){
                    return styles.styleFirstGreen;
                }
                else{
                    return styles.styleRestGreen;
                }
            }
            else{
                if(first){
                    return styles.styleFirstYellow;
                }
                else{
                    return styles.styleRestYellow;
                } 
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

    //Those 3 functions help us stor values at OnClick moment
    var fName;
    const assignNameToVar = (stuff) => {
        fName = stuff;
    }

    var fFunktion;
    const assignFunktionToVar = (snuff) => {
        fFunktion = snuff;
    }

    var fString;
    const assignStringToVar = (muff) => {
        fString = muff;
    }

//style = {{ flexDirection: 'column', justifyContent: 'center', width: '80%' }}
    return (
        
        <View style={{flex:1}}>
        {/* Here we get the results with TouchabeOpacity making them buttons to navigate to other screens
        . The first View is Bigger, because this is the most suite formula to use. */}
        
            <View style = {{backgroundColor: '#FFFFFF'}} >           
                <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{marginHorizontal: 20}}>    
                            {finalList.map(formula =>
                                first ? 
                                //first Result
                                <React.Fragment >
                                    <TouchableOpacity
                                    
                                        onPress={
                                        () => {
                                            assignNameToVar(formula.name);
                                            assignFunktionToVar(formula.funktion);
                                            assignStringToVar(formula.funcString);
                                        
                                        navigation.navigate("DetailsScreen", {
                                            qt,
                                            frequency,
                                            fName,
                                            fFunktion,
                                            fString,
                                            setFrequency,
                                            setQt
                                        });
                                        }
                                    }
                                    >
                                            <View  style={getStyle(Math.trunc(formula.funktion))} >
                                                <View style= {styles.positioning}>
                                                    <View style = {styles.firstViewFirst}>
                                                        <Text style = {styles.formulaNameFirst}>{formula.name}: </Text>
                                                    </View>
                                                    <View style = {styles.secondViewFirst}>  
                                                        <Text style = {styles.resultFirst}>{Math.trunc(formula.funktion)} ms  </Text>
                                                    </View>
                                                    <View style = {styles.thirdViewFirst}>
                                                        <Text style = {styles.interpretationFirst}>{getInterpretation(Math.trunc(formula.funktion))}</Text>
                                                        {first = false}
                                                    </View>
                                                </View>
                                        
                                        
                                            </View> 
            
                                    </TouchableOpacity>
                                    
                                    
                                </React.Fragment>
                                            
                                :
                                // rest Results
                                
                                <React.Fragment>
                                    
                                    <TouchableOpacity
                                    
                                        onPress={
                                        () => {
                                            assignNameToVar(formula.name);
                                            assignFunktionToVar(formula.funktion);
                                            assignStringToVar(formula.funcString);

                                        navigation.navigate("DetailsScreen", {
                                            qt,
                                            frequency,
                                            fName,
                                            fFunktion,
                                            fString,
                                            setFrequency,
                                            setQt
                                        });
                                        }
                                    }
                                    >
                                    <View  style={getStyle(Math.trunc(formula.funktion))} >
                                        <View style= {styles.positioning}>
                                            <View style = {styles.firstViewSecond}>
                                                <Text style = {styles.formulaNameRest}>{formula.name}: </Text>
                                            </View>
                                            <View style = {styles.secondViewSecond}>      
                                                <Text style = {styles.resultSecond}>{Math.trunc(formula.funktion)} ms  </Text>    
                                            </View>
                                            <View style = {styles.thirdViewSecond}>       
                                                <Text style = {styles.interpretationSecond}>{getInterpretation(Math.trunc(formula.funktion))}</Text>    
                                            </View>
                                            {first = false}
                                        </View>   
                                    </View> 
                                </TouchableOpacity>
                                    {increment()} 
                                </React.Fragment>
                                    )}
                </ScrollView>

        
            </View>
        </View>

    );
    
}

export default Results;