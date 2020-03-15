import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: '40%',
    marginBottom: '20%',
    fontSize: 40,
    fontWeight: '800',
    marginLeft: 15
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30
  },
  error: {
    fontSize: 15,
    paddingTop: 16
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 15
  },
  recovery: {
    fontSize: 15,
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textAlign: 'right'
  },
  button: {
    marginHorizontal: 15,
    shadowColor: 'rgba(0, 153, 218, 0.34)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 2,
    borderRadius: 12,
    backgroundColor: '#0099da',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 17,
    color: '#fff'
  },
  close: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
    marginLeft: 15
  }
});