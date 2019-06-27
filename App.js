import React, { Component } from 'react'
import {Alert, Text, View, TextInput, TouchableOpacity } from 'react-native'

class App extends Component {
constructor(){
  super();
  this.state = {
    dataku: [],
  };
}

klikPost = () => {
  Alert.alert('Klik POST')
} 

klikGet = () => {
  Alert.alert('Klik GET')
} 

render() {
  return (
  <View style={{backgroundColor:'#febfffa1', flex:1}} >
    <View style={{flexDirection:'column', alignItems:'center'}}>

    <Text style={{marginTop:20, fontSize:25, fontWeight:'bold' }}>
    React Native ♥ Favoriot
    </Text>

    <TextInput
    placeholder='Insert data KEY here...'
    style={{height: 55, width: 350, fontSize: 15}}
    onChangeText={(input1) => this.setState({input1})}
    value={this.state.input1}
    />

    <TextInput
    placeholder='Insert data VALUE here...'
    style={{height: 55, width: 350, fontSize: 15}}
    onChangeText={(input2) => this.setState({input2})}
    value={this.state.input2}
    />
    </View>

    <View style={{flexDirection:'row', justifyContent:'center'}}>
      <TouchableOpacity
      style={{
          backgroundColor:'#c33eb2ff', borderRadius:10,
          flex:1, width:100, height:50, margin:20,
          flexDirection:'row', justifyContent:'center',
          alignItems:'center'
          }}
      onPress={this.klikPost}
      >
      <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
      POST
      </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={{
          backgroundColor:'#c33eb2ff', borderRadius:10,
          flex:1, width:100, height:50, margin:20,
          flexDirection:'row', justifyContent:'center',
          alignItems:'center'
          }}
      onPress={this.klikGet}
      >
      <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
      GET
      </Text>
      </TouchableOpacity>
    </View>

    <View style={{flexDirection:'column',alignItems:'center'}}>
    {/* // {data} */}
    </View>

  </View>
);
}
}

export default App;