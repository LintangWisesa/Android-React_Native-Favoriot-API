import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios' // npm i axios

export default class Favoriot extends Component {
  
  constructor(){
    super()
    this.state = {
      mydata: [],
      isLoading: false
    }
  }

  // when GET button clicked
  getButton = () => {
    this.setState({
      isLoading: true
    })
    var url = 'https://api.favoriot.com/v1/streams?device_developer_id=deviceDefault@Lintang_Wisesa&max=10'
    var headers = {
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxpbnRhbmdfV2lzZXNhIiwicmVhZF93cml0ZSI6dHJ1ZSwiaWF0IjoxNDkzODgyODczfQ.0n_FIr4vapSjewJE2e7cb-FTXs3JsUMTHsTgT2mYNFs'
      }
    }
    axios.get(url, headers)
    .then((data)=>{
      this.setState({
        mydata: data.data.results,  // try the favoriot API first!
        isLoading: false
      })
    })
    .catch(()=>{
      this.setState({
        isLoading: false
      })
      Alert.alert('Failed to GET data 😭')
    })
  }
  
  // when POST button clicked
  postButton = () => {
    this.setState({
      isLoading: true
    })
    var url = 'https://api.favoriot.com/v1/streams'
    var headers = {
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxpbnRhbmdfV2lzZXNhIiwicmVhZF93cml0ZSI6dHJ1ZSwiaWF0IjoxNDkzODgyODczfQ.0n_FIr4vapSjewJE2e7cb-FTXs3JsUMTHsTgT2mYNFs'
      }
    }
    var dataBody = {
      device_developer_id: 'deviceDefault@Lintang_Wisesa',
      data: {
        Temperature: this.state.input1,
        Humidity: this.state.input2,
        Potentio: this.state.input3
      }
    }
    axios.post(url, dataBody, headers)
    .then((data)=>{
      this.setState({
        isLoading: false
      })
      Alert.alert('Successfully POST the data! 👍')
    })
    .catch(() => {
      Alert.alert('Failed to POST 😭')
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#febfffa1' }}>
        
        {/* title */}
        <View style={{ flexDirection: 'column', alignItems:'center', marginVertical:10 }}>
          <Text style={{marginTop:20, fontSize:25, fontWeight:'bold'}}>
            React Native ♥ Favoriot
          </Text>
        </View>

        {/* 3 textinputs */}
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          
          <TextInput
            placeholder='Temperature...'
            style={{height:55, width:120, fontSize:15, marginHorizontal:8}}
            keyboardType = 'number-pad'
            underlineColorAndroid = '#c33eb2ff'
            value = {this.state.input1}
            onChangeText = {(input1) => this.setState({input1})}
          />

          <TextInput
            placeholder='Humidity...'
            style={{height:55, width:120, fontSize:15, marginHorizontal:8}}
            keyboardType = 'number-pad'
            underlineColorAndroid = '#c33eb2ff'
            value = {this.state.input2}
            onChangeText = {(input2) => this.setState({input2})}
          />

          <TextInput
            placeholder='Potentio...'
            style={{height:55, width:120, fontSize:15, marginHorizontal:8}}
            keyboardType = 'number-pad'
            underlineColorAndroid = '#c33eb2ff'
            value = {this.state.input3}
            onChangeText = {(input3) => this.setState({input3})}
          />

        </View>

        {/* 2 buttons: GET & POST */}
        <View style={{flexDirection:'row', justifyContent:'center'}}>

          {/* POST button */}
          <TouchableOpacity style={{
            backgroundColor: '#c33eb2ff', borderRadius:10,
            flex:1, width:100, height:50, margin:20, flexDirection:'row',
            justifyContent:'center', alignItems:'center'
          }}
          onPress = {this.postButton}
          >
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>
              POST
            </Text>
          </TouchableOpacity>
          
          {/* GET button */}
          <TouchableOpacity style={{
            backgroundColor: '#c33eb2ff', borderRadius:10,
            flex:1, width:100, height:50, margin:20, flexDirection:'row',
            justifyContent:'center', alignItems:'center'
          }}
          onPress = {this.getButton}
          >
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>
              GET
            </Text>
          </TouchableOpacity>

        </View>
        
        <View style={{flexDirection:'column', alignItems:'center'}}>
          {
            this.state.isLoading ?
            <ActivityIndicator
              style={{margin:20}}
              size='large'
              color='#c33eb2ff'
            /> :
            <Text></Text>
          }

          {
            this.state.mydata ?
            <FlatList
              data = {this.state.mydata}
              renderItem = {
                ({item, index}) =>
                  <View style={{flexDirection:'row', justifyContent:'center'}}>
                    {/* time */}
                    <Text style={{fontSize:16, marginHorizontal: 5}}>
                      ⏰ {item.stream_created_at.split('T')[0]}
                    </Text>
                    {/* temperature */}
                    <Text style={{fontSize:16, marginHorizontal: 5}}>
                      🌡 {item.data.Temperature} °C
                    </Text>
                    {/* humidity */}
                    <Text style={{fontSize:16, marginHorizontal: 5}}>
                      💧 {item.data.Humidity} %
                    </Text>
                    {/* potentio */}
                    <Text style={{fontSize:16, marginHorizontal: 5}}>
                      🕹 {item.data.Potentio}
                    </Text>
                  </View>
                }
              keyExtractor = {(item, index)=>index.toString()}
            /> :
            <Text></Text>
          }
        </View>

      </View>
    );
  }
}