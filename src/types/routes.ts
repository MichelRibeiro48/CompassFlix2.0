export type RootStackParamList = {
  ProfileSeeAll: {
    typeMode: 'movies' | 'series';
    typeContent: string;
  };
  ProfileList: {
    typeMode: 'movies' | 'series';
  };
  Details: { id: number; type: 'movies' | 'series' };
  ListDetails: { list_id: number };
};
