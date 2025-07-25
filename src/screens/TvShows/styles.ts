import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  userContainer: { flexDirection: 'row' },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  welcomeText: { fontWeight: '700', fontSize: 18, color: '#fff' },
  userText: { fontWeight: '700', fontSize: 18, color: '#E9A6A6' },
  white: { color: '#FFFFFF' },
  popularText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
    marginTop: 20,
  },
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
