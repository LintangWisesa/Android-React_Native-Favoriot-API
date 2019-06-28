import React, { Component } from 'react'
import {Alert, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import axios from 'axios'

class App extends Component {
constructor(){
  super();
  this.state = {
    dataku: [],
    tes: [
      {key: 'Devin'},
      {key: 'Jackson'},
      {key: 'James'},
      {key: 'Joel'},
      {key: 'John'},
      {key: 'Jillian'},
      {key: 'Jimmy'},
      {key: 'Julie'},
    ]
  };
}

klikPost = () => {
  Alert.alert('Klik POST')
} 

klikGet = () => {
  // Alert.alert('Klik GET')
  var url = 'https://api.favoriot.com/v1/streams?device_developer_id=deviceDefault@Lintang_Wisesa&max=10';
    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxpbnRhbmdfV2lzZXNhIiwicmVhZF93cml0ZSI6dHJ1ZSwiaWF0IjoxNDkzODgyODczfQ.0n_FIr4vapSjewJE2e7cb-FTXs3JsUMTHsTgT2mYNFs'
      }
    })
    .then((ambilData) => {
      this.setState({
        dataku: ambilData.data.results,
      }) 
    })
} 

render() {

  return (
  <View style={{backgroundColor:'#febfffa1', flex:1}} >
    <View style={{flexDirection:'column', alignItems:'center', marginVertical: 10}}>

      <Text style={{marginTop:20, fontSize:25, fontWeight:'bold' }}>
      React Native ♥ Favoriot
      </Text>
    
    </View>

    <View style={{flexDirection:'row', justifyContent:'center'}}>

      <TextInput
      placeholder='Temperature ...'
      style={{height: 55, width: 120, fontSize: 15, marginHorizontal: 8}}
      onChangeText={(input1) => this.setState({input1})}
      value={this.state.input1}
      underlineColorAndroid="#c33eb2ff"
      />

      <TextInput
      placeholder='Humidity ...'
      style={{height: 55, width: 120, fontSize: 15, marginHorizontal: 8}}
      onChangeText={(input2) => this.setState({input2})}
      value={this.state.input2}
      underlineColorAndroid="#c33eb2ff"
      />

      <TextInput
      placeholder='Potentio ...'
      style={{height: 55, width: 120, fontSize: 15, marginHorizontal: 8}}
      onChangeText={(input3) => this.setState({input3})}
      value={this.state.input3}
      underlineColorAndroid="#c33eb2ff"
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

    <View style={{flexDirection:'column', alignItems:'flex-start', marginLeft:15}}>
      {
        this.state.tes ?
        <FlatList
          data={this.state.dataku}
          renderItem={
            ({item, index}) => 
            <Text style={{fontSize: 16}} key={index}>
              🌡 {item.data.Temperature} °C 💧 {item.data.Humidity} % 🕹 {item.data.Potentio}
            </Text>}
          keyExtractor={(item, index) => index.toString()}
        /> :
        <ActivityIndicator style={{margin: 20}} size="large" color="#c33eb2ff" />
      }
      
    {/* // {data} */}
    </View>

  </View>
);
}
}

export default App;