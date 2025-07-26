import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteMediaList,
  getMediaList,
  postMediaList,
} from '../../service/profile';
import ModalNewList from '../../components/ModalNewList';
import { useState } from 'react';
import { RootStackParamList } from '../../types/routes';

type ProfileScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'ProfileSeeAll'
>;

export default function ProfileList() {
  const [visibleModal, setVisibleModal] = useState(false);
  const {
    data: dataProfileMediaList,
    isLoading: loadingProfileMediaList,
    refetch: refetchProfileMediaList,
  } = useQuery({
    queryKey: ['data-profile-media-list'],
    queryFn: getMediaList,
  });
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const { mutate: sendNewList, isPending: isLoadingNewList } = useMutation({
    mutationFn: (body: {
      name: string;
      description: string;
      language: 'pt-BR';
    }) => postMediaList(body),

    onSuccess: () => {
      refetchProfileMediaList();
    },
  });

  const { mutate: deleteNewList, isPending: isLoadingDeleteList } = useMutation(
    {
      mutationFn: (list_id: number) => deleteMediaList(list_id),

      onSuccess: () => {
        refetchProfileMediaList();
      },
    },
  );

  if (loadingProfileMediaList || isLoadingNewList || isLoadingDeleteList) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={'#E9A6A6'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ModalNewList
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        onConfirm={e =>
          sendNewList({
            name: e.nameList,
            description: e.descList,
            language: 'pt-BR',
          })
        }
      />
      <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} iconStyle="solid" />
      </Pressable>
      <Text style={styles.title}>Minhas Listas</Text>
      <FlatList
        data={dataProfileMediaList?.results}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <Text style={styles.titleEmptyList}>
            Nenhuma lista encontrada, clique no botão mais para criar uma nova
            lista.
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Pressable
              style={styles.mainCard}
              onPress={() =>
                navigation.navigate('ListDetails', { list_id: item.id })
              }
            >
              <Text style={styles.textWhite}>{item.name}</Text>
              <Text style={styles.textWhite}>{item.item_count} filmes</Text>
            </Pressable>
            <Pressable
              style={styles.deleteCard}
              onPress={() => deleteNewList(item.id)}
            >
              <Icon
                name="trash"
                size={16}
                color={'#EC26269C'}
                iconStyle="solid"
              />
            </Pressable>
          </View>
        )}
      />
      <Pressable
        style={styles.buttonAddList}
        onPress={() => setVisibleModal(true)}
      >
        <Icon name="plus" size={25} color={'black'} iconStyle="solid" />
      </Pressable>
    </View>
  );
}
