import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // View Styles
  centeredView: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  centeredView2: {
    height: '10%'
  }
  ,
  homeView: {
    flex: 7,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 30,
  },
  rowView: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexWrap: 'wrap'
  },
  // Homescreen Components
  input: {
    backgroundColor: '#f5f5f5',
    textAlign: "left",
    paddingHorizontal: 10,
    borderColor: '#ebebeb',
    borderRadius: 7,
    borderWidth: 1,
    width: 200,
    height: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
  inputError: {
    backgroundColor: '#f5f5f5',
    textAlign: "left",
    paddingHorizontal: 10,
    borderColor: '#e87b63',
    borderRadius: 7,
    borderWidth: 1,
    width: 200,
    height: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
  // Text Styles
  resultsText: {
    fontSize: 15,
    color: 'white',
    padding: 5,
  },
  description: {
    fontSize: 18,
    color: '#999999',
  },
  bigText: {
    fontSize: 20,
    color: 'white',
  },
  // Buttons
  button: {
    backgroundColor: '#4db0b0',
    borderRadius: 7,
    justifyContent: 'center',
    width: '70%',
    height: 60,
    marginBottom: 10,
    marginLeft: 17
  },
  button2: {
    backgroundColor: '#4db0b0',
    borderRadius: 7,
    paddingHorizontal: '15%',
    justifyContent: 'center',
    width: '100%',
    height: '65%'
  }
  ,
  // Dropdown
  dropdown: {
    width: '30%',
    zIndex: 70,
    top: 0,
    paddingLeft: 20,
  },
  //Result screen styles
  formulaNameFirst: {
    fontSize: 31,
    fontWeight: 'bold'
  },
  formulaNameRest: {
    fontSize: 26
  },
  positioning: {
    flexDirection: 'column',
    flex:1,
    justifyContent: 'space-between'
  },
  firstViewFirst: { 
    height: '45%',
    justifyContent: 'flex-end'
  },
  secondViewFirst: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  
  thirdViewFirst: {
    height: '25%',
    justifyContent: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: '2%',
    paddingRight: '2%'
  },
  firstViewSecond: {
    height: '45%',
    justifyContent: 'center'
  },
  secondViewSecond: {
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  thirdViewSecond: {
    height: '15%',
    justifyContent: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: '2%',
    paddingRight: '2%'
  },
  interpretationFirst: {
    fontSize: 19, 
    padding: 5
  },
  interpretationSecond: {
    fontSize: 16,
    padding: 5
  },
  resultFirst: {
    fontSize: 31,fontWeight: 'bold'
  },
  resultSecond: {
    fontSize: 28
  },
  styleFirstGreen: {
    backgroundColor: '#A8CF8C',height: 180,paddingLeft: 20, borderRadius: 20, borderWidth: 10, borderColor: '#FFFFFF'
  },
  styleFirstYellow: {
    backgroundColor: '#FCE58E',height: 180,paddingLeft: 20, borderRadius: 20, borderWidth: 10, borderColor: '#FFFFFF'
  },
  styleFirstRed: {
    backgroundColor: '#e87b63',height: 180,paddingLeft: 20, borderRadius: 20, borderWidth: 10, borderColor: '#FFFFFF'
  },
  styleRestGreen: {
    backgroundColor: '#A8CF8C',height: 120, paddingLeft: 20, borderRadius: 20, borderWidth: 10, borderColor: '#FFFFFF'
  },
  styleRestYellow: {
    backgroundColor: '#FCE58E',height: 120, paddingLeft: 20, borderRadius: 20, borderWidth: 10, borderColor: '#FFFFFF'
  },
  styleRestRed: {
    backgroundColor: '#e87b63',height: 120, paddingLeft: 20, borderRadius: 20, borderWidth: 10, borderColor: '#FFFFFF'
  },
  
  //Direct View Styles

  dviewScreen: {
    backgroundColor: 'white',
    height: '100%'
  },
  dviewFormulaNameView: {
    height: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  dviewFormulaName: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  dviewStyleFirstGreen: {
    backgroundColor: '#A8CF8C',height: '25%',paddingLeft: 20, borderRadius:12
  },
  dviewStyleFirstYellow: {
    backgroundColor: '#FCE58E',height: '25%',paddingLeft: 20, borderRadius:12
  },
  dviewStyleFirstRed: {
    backgroundColor: '#e87b63',height: '25%',paddingLeft: 20, borderRadius:12
  },
  dviewTextView: {
    width: '60%',
    height: '20%',
    backgroundColor: 'white'
  },
  dviewTextView2: {
    width: '40%',
    height: '20%',
    backgroundColor: 'white',
    alignItems: 'flex-end'
  }

});

export default styles;