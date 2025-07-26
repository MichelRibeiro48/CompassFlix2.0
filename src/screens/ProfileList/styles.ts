import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 32,
    paddingVertical: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
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
  titleEmptyList: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 24,
    textAlign: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  mainCard: {
    backgroundColor: '#8F9AFC',
    height: 100,
    paddingVertical: 13,
    paddingHorizontal: 33,
    gap: 24,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    width: '89%',
  },
  deleteCard: {
    backgroundColor: '#E9A6A6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonAddList: {
    backgroundColor: '#E9A6A6',
    padding: 8,
    paddingVertical: 12,
    borderRadius: 100,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  textWhite: {
    color: 'white',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
