import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import * as axios from 'axios'

const{width: WIDTH} = Dimensions.get('window') 

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
      }
      _login = () => {
        const link = 'https://whereismycar.herokuapp.com/api/authenticate/signin';
        const user = {
            "username": this.state.username,
            "password": this.state.password,
          };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post(link, user, axiosConfig)
        .then((response) => {
            this.props.navigation.navigate('Map')
            console.log(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error);
        });
      }

    render(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                placeholder="Nom d'utilisateur"
                style={styles.input}
                onChangeText={(username) => {this.setState({username})}}
                value={this.state.username}>
            </TextInput>
            <TextInput
                placeholder="Mot de passe"
                style = {styles.input}
                onChangeText={(password) => {this.setState({password})}}
                value={this.state.password}>
            </TextInput>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._login}
                >
                <Text style={styles.buttonTextLogin}>Connexion</Text>
            </TouchableOpacity>
            <Text>Vous n'avez pas de compte ? Cliquez ici: </Text>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.signUpText}>S'inscrire</Text>
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
        backgroundColor: '#ebebeb',
    },    
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonTextLogin: {
        fontSize: 20,
        color: 'orange',
        paddingHorizontal: 20,
    },
    signUpText: {
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

export default Login