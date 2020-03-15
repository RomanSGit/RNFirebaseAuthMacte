import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import Reinput from 'reinput';

import styles from '../styles';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errorEmail: false,
    errorPassword: false
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          this.setState({ errorEmail: true })
        }
        if (error.code === 'auth/wrong-password') {
          this.setState({ errorPassword: true })
        }
      });
  };

  render() {
    const reinput = {
      underlineColor: '#c1cad4',
      underlineActiveColor: '#0099da',
      underlineActiveHeight: 1,
      labelColor: '#c1cad4',
      labelActiveColor: '#0099da',
      labelActiveScale: 0.7,
      fontSize: 17,
      paddingTop: 0,
      paddingBottom: 10,
      marginBottom: 0,
      marginTop: 0,
      errorColor: '#d9534f',
      errorStyle: styles.error
    };
    const { email, password, errorEmail, errorPassword } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{`Войти`}</Text>
        <View style={styles.form}>
          <Reinput
            {...reinput}
            label='E-mail'
            autoCapitalize={'none'}
            onChangeText={email => this.setState({
              email: email,
              errorEmail: false
            })}
            value={email}
            error={errorEmail ? 'Неверный Email' : ''}
            iconOverlay={email || errorEmail ?
              errorEmail ? <Image source={require('../assets/error.png')} /> : <Image source={require('../assets/check.png')} />
              : ''}
          />
          <Reinput
            {...reinput}
            label='Пароль'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={password => this.setState({
              password: password,
              errorPassword: false
            })}
            value={password}
            error={errorPassword ? 'Неверный пароль' : ''}
            iconOverlay={password || errorPassword ?
              errorPassword ? <Image source={require('../assets/error.png')} /> : <Image source={require('../assets/check.png')} />
              : ''}
          />
          <Text style={styles.recovery}>
            Забыли пароль?
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={{ fontSize: 15 }}>
            Нет аккаунта? <Text style={{ color: '#0099da' }}>Регистрация</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
