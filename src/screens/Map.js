import React, { Component } from 'react'
import {StyleSheet, Text, View, AsyncStorage } from 'react-native'
import MapsView, {Marker} from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import * as axios from 'axios'

export default class App extends Component {
  static navigationOptions = {
    headerMode: null
}
  
  state = {
    latitude: 48.85709291743982,
    longitude: 2.2946405681579574,
    error:null,
    carMarkerLat: 48.85709291743982,
    carMarkerLong: 48.85709291743982,
    isVisible: false,
    positionCarComment: '', 
    token: '',
    idUser: '',
    noData:'',
  };

  _retrieveData = async () => {
    try {
        const token = await AsyncStorage.getItem('@token');
        const idUser = await AsyncStorage.getItem('@idUser');
        console.log('token:%s', token)
        console.log('userid:%s', idUser)
        if (idUser !== null) {
          this.setState({ idUser })
        }
        if (token !== null) {
            this.setState({ token })
        }
        this._getMarker(idUser, token)

    } catch (error) {
        console.error(error);
    }
  };

  _getMarker = (idUser, token) => {
    console.log('---GetMarker')
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
      }
    };
    axios.get("https://whereismycar.herokuapp.com/api/users/" + idUser + '/positions/'+ idUser, axiosConfig)
    .then((response) => {
      //console.log(response.data.data.position.longitude,response.data.data.position.latitude)
      this.setState({carMarkerLat:parseFloat(response.data.data.position.latitude) })
      this.setState({carMarkerLong:parseFloat(response.data.data.position.longitude) })
      this.setState({positionCarComment:response.data.data.position.commentaire })

      //console.log('carMarker: %s', this.state.carMarker)
    })
    .catch((error) => {
      this.setState({noData:true})
    });
  }

   componentDidMount() {
    this._retrieveData();
  
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

   _setMarker = (e) =>{
     this.setState({carMarkerLat: e.nativeEvent.coordinate.latitude})
     this.setState({carMarkerLong: e.nativeEvent.coordinate.longitude})
     this.setState({isVisible: true})
   }
  
   _sendMarker = () => {
     this.setState({isVisible: false})
    const noData = this.state.noData
     const carMarkerLat = this.state.carMarkerLat
     const carMarkerLong = this.state.carMarkerLong
     const positionCarComment = this.state.positionCarComment
     const idUser = this.state.idUser
    let position = {
      "latitude" : carMarkerLat,
      "longitude" :  carMarkerLong,
      "commentaire" : positionCarComment
    }
    console.log(position)
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
      }
    };
    if(noData === true){
      axios.post("https://whereismycar.herokuapp.com/api/users/" + idUser + '/positions/', position, axiosConfig)
      .then((response) => {
        this.setState({noData: false})
      })
      .catch((error) => {
          console.log(error);
      });
    }else{
    axios.put("https://whereismycar.herokuapp.com/api/users/" + idUser + '/positions/'+ idUser, position, axiosConfig)
    .then((response) => {
    })
    .catch((error) => {
        console.log(error);
    });
  }
   }

  render() {
    const emptyPopup = <View></View>
    const popup = 
    <View style={styles.popup}>
      <Text>Note:</Text>
      <TextInput
      style={{borderBottomColor:'black', borderBottomWidth:1, textAlign:'center', marginBottom:5, borderRadius:50}}
        placeholder="Ajouter des details ? "
        onChangeText={positionCarComment => this.setState({positionCarComment})}
        value={this.state.positionCarComment}>
      </TextInput>
      <Text onPress={()=> this._sendMarker()} style={styles.buttonValider}>Valider</Text>
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
        onPress={(e)=> this._setMarker(e)}>
          <Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude :this.state.longitude
          }}
          title={'Votre position'}
        />
        {
          this.state.carMarkerLat && 
          <MapsView.Marker 
          coordinate={{
            latitude: this.state.carMarkerLat,
            longitude: this.state.carMarkerLong
          }} 
          title={this.state.positionCarComment}></MapsView.Marker>
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