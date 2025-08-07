import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonContainer: { paddingHorizontal: 48, paddingTop: 48 },
  headerButtonContainer: {
    alignItems: 'flex-end',
  },
  headerButton: {
    backgroundColor: '#E9A6A6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  refreshListText: {
    color: '#000',
    fontWeight: '600',
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 12,
  },
  userName: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
  movieListButton: {
    backgroundColor: '#6C7BFC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 18,
  },
  movieListButtonText: { fontWeight: '400', fontSize: 12, color: '#fff' },
  totalRatedContainer: {
    alignSelf: 'center',
    gap: 4,
    alignItems: 'center',
    marginVertical: 12,
  },
  totalRatedNumber: { fontWeight: '700', fontSize: 24, color: '#9C4A8B' },
  totalRatedText: { fontWeight: '400', fontSize: 14, color: '#fff' },
  viewModeContainer: { flexDirection: 'row' },
  viewModeButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    width: '50%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewModeIcon: { width: 30, height: 30 },
  movieFavoriteContainer: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieFavoriteText: { fontWeight: '500', fontSize: 12, color: '#fff' },
  movieFavoriteButtonText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#E9A6A6',
  },
  listContainer: { margin: 8 },
  listImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  listContainerView: {
    paddingHorizontal: 16,
    height: '80%',
  },
  lineSeparator: {
    width: '100%',
    backgroundColor: '#FFFFFF30',
    height: 1,
  },
  seriesContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  seriesRatingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  seriesRatingNumber: { fontWeight: '600', color: '#fff' },
});
