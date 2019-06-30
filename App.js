import React, { Component } from 'react'
import {Alert, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import axios from 'axios'

class App extends Component {
constructor(){
  super();
  this.state = {
    dataku: [],
    isLoading: false
  };
}

klikPost = () => {
  this.setState({
    isLoading: true
  })
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
      isLoading: false
    }) 
  })
  .catch(()=>{
    this.setState({
      isLoading: false
    })
    Alert.alert(
      // 'Failed to POST data to Favoriot.\nCheck your connection & try again.'
      this.state.input1 + this.state.input2 + this.state.input3
    )
  })
} 

klikGet = () => {
  this.setState({
    isLoading: true
  })
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
      isLoading: false
    }) 
  })
  .catch(()=>{
    this.setState({
      isLoading: false
    })
    Alert.alert('Failed to GET data from Favoriot.\nCheck your connection & try again.')
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
      keyboardType='number-pad'
      />

      <TextInput
      placeholder='Humidity ...'
      style={{height: 55, width: 120, fontSize: 15, marginHorizontal: 8}}
      onChangeText={(input2) => this.setState({input2})}
      value={this.state.input2}
      underlineColorAndroid="#c33eb2ff"
      keyboardType='number-pad'
      />

      <TextInput
      placeholder='Potentio ...'
      style={{height: 55, width: 120, fontSize: 15, marginHorizontal: 8}}
      onChangeText={(input3) => this.setState({input3})}
      value={this.state.input3}
      underlineColorAndroid="#c33eb2ff"
      keyboardType='number-pad'
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

    <View style={{flexDirection:'column', alignItems:'center'}}>
      {
        this.state.isLoading ?
        <ActivityIndicator style={{margin: 20}} size="large" color="#c33eb2ff" /> :
        <Text></Text>
      }
      
      {
        this.state.dataku ?
        <Text></Text> :
        <FlatList
          data={this.state.dataku}
          renderItem={
            ({item, index}) => 
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Text style={{fontSize: 16, marginHorizontal: 5}}>
                ⏰ {item.stream_created_at.split('T')[0]}
              </Text>
              <Text style={{fontSize: 16, marginHorizontal: 5}}>
                🌡 {item.data.Temperature} °C
              </Text>
              <Text style={{fontSize: 16, marginHorizontal: 5}}>
                💧 {item.data.Humidity} %
              </Text>
              <Text style={{fontSize: 16, marginHorizontal: 5}}>
                🕹 {item.data.Potentio}
              </Text>
            </View>
            }
          keyExtractor={(item, index) => index.toString()}
        />
      }
      
    </View>

  </View>
);
}
}

export default App;