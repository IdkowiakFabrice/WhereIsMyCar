import React, { Component } from 'react'
import {StyleSheet, Text, View, Modal } from 'react-native'
import MapsView, {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends Component {
  
  state = {
    latitude: 48.83624674150805,
    longitude: 2.401771566073614,
    error:null,
    carMarker: null,
    isVisible: false,
    positionCarDetails: null, 
  };

   componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }
  
  render() {
    const emptyPopup = <View></View>
    const popup = 
    <View style={styles.popup}>
      <Text>Note:</Text>
      <TextInput
      style={{borderBottomColor:'black', borderBottomWidth:1, textAlign:'center', marginBottom:5, borderRadius:50}}
        placeholder="Ajouter des details ? "
        onChangeText={positionCarDetails => this.setState({positionCarDetails})}
        value={this.state.positionCarDetails}>
      </TextInput>
      <Text onPress={()=> this.setState({isVisible: false})} style={styles.buttonValider}>Valider</Text>
      <Text onPress={()=> this.setState({isVisible: false, positionCarDetails:'Votre voiture'})} style={styles.buttonClose}>Annuler</Text>
    </View>

    return (
      <View style={styles.container}>
        <MapsView style={styles.map}
         region = {{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={(e)=> this.setState({carMarker: e.nativeEvent.coordinate, isVisible: true })}>
          <Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude :this.state.longitude
          }}
          title={'Votre position'}
        />
        {
          this.state.carMarker && 
          <MapsView.Marker coordinate={this.state.carMarker} title={this.state.positionCarDetails}></MapsView.Marker>
        }
        </MapsView>
          {this.state.isVisible ? popup : emptyPopup }  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    justifyContent:'flex-end',
    alignItems:'center'
  },

  map: {
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
  },

  popup:{
      position:'absolute',
      bottom:0,
      width: '100%',
      padding:5,
      backgroundColor:'grey',
      padding:10,
      borderRadius:20,
      paddingHorizontal:20
  },

  buttonClose:{
    backgroundColor:'red',
    color:'white',
    textAlign:'center',
    paddingHorizontal:10,
  },

  buttonValider:{
    backgroundColor:'green',
    color:'white',
    textAlign:'center',
    paddingHorizontal:10,
    marginBottom:5
  }
});