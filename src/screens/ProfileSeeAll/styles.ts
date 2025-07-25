import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonBackContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 48,
  },
  buttonBack: {
    backgroundColor: '#fff',
    padding: 9,
    borderRadius: 100,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  userContainer: { flexDirection: 'row', alignSelf: 'center' },
  preferText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  userText: { color: '#E9A6A6', fontWeight: 'bold', fontSize: 20 },
  listContainer: {
    margin: 8,
  },
  listImage: { width: 100, height: 140, borderRadius: 8 },
  ratedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  ratedText: { fontWeight: '600', color: '#fff' },
});
