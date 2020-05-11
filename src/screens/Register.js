import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, AsyncStorage  } from 'react-native'
import * as axios from 'axios'

const{width: WIDTH} = Dimensions.get('window') 
class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname:'',
            lastname:'',
            passwordConfirmation:'',
        };
      }

      _storeData = (token, username) => {
        try {
          AsyncStorage.multiSet([['@token', token], ['@username', username]])
        } catch (error) {
         console.error(error);
        }
      }
    
    _signin = () => {
        const link = 'https://whereismycar.herokuapp.com/api/authenticate/signup';
        const newUser = {
            "lastname": this.state.lastname,
            "username": this.state.username,
            "password": this.state.password,
            "passwordConfirmation": this.state.passwordConfirmation,
            "firstname": this.state.firstname,

          };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(link, newUser, axiosConfig)
        .then((response) => {
            this._storeData(response.data.data.meta.token, response.data.data.user.username);
            this.props.navigation.navigate('RegisterSuccess')
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <TextInput
                placeholder="Nom"
                style={styles.input}
                onChangeText={(lastname) => {this.setState({lastname})}}
                value={this.state.lastname}>
            </TextInput>
            <TextInput
                placeholder="Prenom"
                style={styles.input}
                onChangeText={(firstname) => {this.setState({firstname})}}
                value={this.state.firstname}>
            </TextInput>
            <TextInput
                placeholder="Nom d'utilisateur"
                style={styles.input}
                onChangeText={(username) => {this.setState({username})}}
                value={this.state.username}>
            </TextInput>
            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(password) => {this.setState({password})}}
                value={this.state.password}>
            </TextInput>
            <TextInput
                placeholder="Confirmation du mot de passe"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(passwordConfirmation) => {this.setState({passwordConfirmation})}}
                value={this.state.passwordConfirmation}>
            </TextInput>
            
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._signin}
                >
                <Text style={styles.buttonTextLogin}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:30,
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonTextLogin: {
        fontSize: 20,
        color: 'orange'
    },
    SignUpText: {
        color: 'orange',
    },
    input: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor:'rgba(0,0,0,0.35)',
        color:'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginBottom: 20,
    }
})

export default Register