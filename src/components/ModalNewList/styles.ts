import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {},
  container: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
  },
  avaliationText: { marginTop: 24, fontWeight: 'bold', fontSize: 18 },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 4,
    marginTop: 22,
  },
  inputNameList: {
    borderRadius: 8,
    height: 35,
    width: '90%',
    fontSize: 12,
    paddingHorizontal: 12,
    backgroundColor: '#C4C4C459',
  },
  inputDescList: {
    borderRadius: 8,
    height: 75,
    width: '90%',
    maxWidth: '90%',
    fontSize: 12,
    textAlignVertical: 'top',
    paddingHorizontal: 12,
    backgroundColor: '#C4C4C459',
  },
  modalHeader: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: 'black',
  },
  confirmButtonText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
});
