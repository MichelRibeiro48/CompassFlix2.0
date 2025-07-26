import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingVertical: 40,
    backgroundColor: '#000',
  },
  buttonBack: {
    backgroundColor: '#fff',
    padding: 9,
    borderRadius: 100,
    width: 39,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#E9A6A6',
    alignSelf: 'center',
  },
  description: { color: '#fff', marginVertical: 20 },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
