import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: { alignItems: 'center' },
  container: {
    width: '85%',
    height: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
  },
  avaliationText: { marginTop: 24, fontWeight: 'bold', fontSize: 18 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 22,
  },
  input: {
    borderRadius: 30,
    height: 35,
    width: 100,
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: '#C4C4C459',
  },
  maxRatingText: { fontWeight: '600', fontSize: 18 },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 48,
    marginTop: 40,
  },
  cancelButton: {
    width: 100,
    height: 25,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: { fontWeight: 'bold', fontSize: 12 },
  confirmButton: {
    width: 100,
    height: 25,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
