import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { marginBottom: 10 },
  accordionButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginEnd: 20,
    paddingStart: 13,
    paddingEnd: 13,
    height: 42,
    borderRadius: 5,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionMainText: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    flex: 1,
  },
  accordionChildContainer: { marginTop: 5 },
  accordionChildBody: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginEnd: 20,
    marginStart: 10,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 5,
    minHeight: 42,
  },
  accordionChildTitle: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  accordionChildSubTitle: {
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    marginTop: 2,
  },
});
