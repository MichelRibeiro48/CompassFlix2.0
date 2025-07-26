import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useQuery } from '@tanstack/react-query';
import { getMediaDetailsList } from '../../service/profile';
import { RootStackParamList } from '../../types/routes';

type ProfileScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'ListDetails'
>;

export default function ListDetails({
  route,
}: {
  route: { params: { list_id: string } };
}) {
  const params = route.params;
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { data: dataProfileMediaList, isLoading: loadingProfileMediaList } =
    useQuery({
      queryKey: ['data-profile-media-list'],
      queryFn: () => getMediaDetailsList(Number(params.list_id)),
    });

  if (loadingProfileMediaList) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={'#E9A6A6'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.buttonBack}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'AppTab' as never }],
          })
        }
      >
        <Icon name="arrow-left" size={20} iconStyle="solid" />
      </Pressable>
      <Text style={styles.title}>{dataProfileMediaList?.name}</Text>
      <Text style={styles.description}>
        {dataProfileMediaList?.description}
      </Text>
      <FlatList
        data={dataProfileMediaList?.items}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Details', {
                id: item.id,
                type: item.media_type === 'movie' ? 'movies' : 'series',
              })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              style={styles.image}
            />
          </Pressable>
        )}
      />
    </View>
  );
}
