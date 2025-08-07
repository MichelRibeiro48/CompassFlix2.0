/* eslint-disable react-native/no-inline-styles */
import { Text } from '@react-navigation/elements';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {
  getMovieCredits,
  getMovieDetails,
  getMoviesAccountStates,
  postFavoriteMovie,
  postRateMovie,
} from '../../service/movies';
import {
  getDetailsSeries,
  getDetailsSeriesSeasons,
  getSerieCredits,
  getSeriesAccountStates,
  postRateSerie,
} from '../../service/series';
import styles from './styles';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  getDetailsProfile,
  getFavoritedMovies,
  getFavoritedTvShows,
  getMediaList,
  getRatedMovies,
  getRatedTvShows,
} from '../../service/profile';
import ModalRating from '../../components/ModalRating';
import { SeriesDetailsDTO } from '../../types/seriesDTO';
import { MovieDetailsDTO } from '../../types/moviesDTO';
import ModalList from '../../components/ModalList';
import { postMediaInList } from '../../service/api';
import Season from '../../components/Seasons';

export default function Details({ route }: any) {
  const params = route.params;
  const navigation = useNavigation();

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalList, setVisibleModalList] = useState(false);

  const [favorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const [expanded, setExpanded] = useState(true);

  const [seasonSelected, setSeasonSelected] = useState<number | undefined>();

  const {
    data: dataProfileMediaList,
    isLoading: loadingProfileMediaList,
    refetch: refetchProfileMediaList,
  } = useQuery({
    queryKey: ['data-profile-media-list'],
    queryFn: getMediaList,
  });

  const { refetch: refetchRatedTvShows, isLoading: isLoadingRatedTvShows } =
    useQuery({
      queryKey: ['details-profile-rated-TvShows'],
      queryFn: getRatedTvShows,
    });

  const { refetch: refetchRatedMovies, isLoading: isLoadingRatedMovies } =
    useQuery({
      queryKey: ['details-profile-rated-movies'],
      queryFn: getRatedMovies,
    });

  const { data: dataProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['details-profile'],
    queryFn: getDetailsProfile,
  });

  const { refetch: refetchFavoriteMovies } = useQuery({
    queryKey: ['details-profile-favorite-movies'],
    queryFn: getFavoritedMovies,
  });

  const { refetch: refetchFavoriteSeries } = useQuery({
    queryKey: ['details-profile-favorite-series'],
    queryFn: getFavoritedTvShows,
  });

  const { data: dataDetailsMovie, isLoading: loadingDataDetailsMovie } =
    useQuery({
      queryKey: ['details-movie', params.type],
      queryFn: () => getMovieDetails(params.id),
      enabled: params.type === 'movies',
    });

  const { data: dataCreditsMovie, isLoading: loadingDataCreditsMovie } =
    useQuery({
      queryKey: ['credits-movie', params.type],
      queryFn: () => getMovieCredits(params.id),
      enabled: params.type === 'movies',
    });

  const { data: dataCreditsSerie, isLoading: loadingDataCreditsSerie } =
    useQuery({
      queryKey: ['credits-serie', params.type],
      queryFn: () => getSerieCredits(params.id),
      enabled: params.type === 'series',
    });

  const { data: dataDetailsTvShow, isLoading: loadingDataDetailsTvShow } =
    useQuery({
      queryKey: ['details-tv-show', params.type],
      queryFn: () => getDetailsSeries(params.id),
      enabled: params.type === 'series',
    });

  const {
    data: dataDetailsSeasonsTvShow,
    isLoading: loadingDataDetailsSeasonsTvShow,
  } = useQuery({
    queryKey: ['details-tv-show-seasons', params.id, seasonSelected],
    queryFn: () => getDetailsSeriesSeasons(params.id, seasonSelected ?? 1),
    enabled: params.type === 'series',
  });

  const {
    data: dataAccountStateMovie,
    isLoading: loadingDataAccountStateMovie,
    refetch: refetchAccountStateMovie,
  } = useQuery({
    queryKey: ['details-account-state-movie', params.type],
    queryFn: () => getMoviesAccountStates(params.id),
    enabled: params.type === 'movies',
  });

  const {
    data: dataAccountStateSerie,
    isLoading: loadingDataAccountStateSerie,
    refetch: refetchAccountStateSerie,
  } = useQuery({
    queryKey: ['details-account-state-serie', params.type],
    queryFn: () => getSeriesAccountStates(params.id),
    enabled: params.type === 'series',
  });

  const { mutate: sendFavorite, isPending: isLoadingFavorite } = useMutation({
    mutationFn: (body: {
      media_id: string;
      favorite: boolean;
      media_type: 'movie' | 'tv';
    }) => {
      if (!dataProfile?.id) {
        throw new Error('Profile ID is required');
      }
      return postFavoriteMovie(dataProfile.id, body);
    },

    onSuccess: data => {
      console.log('Favoritado com sucesso:', data);
      setIsFavorite(!favorite);
      if (params.type === 'movies') {
        refetchFavoriteMovies();
      } else {
        refetchFavoriteSeries();
      }
    },

    onError: error => {
      console.log('Erro ao favoritar', error);
    },
  });
  const [isRatingUpdating, setIsRatingUpdating] = useState(false);

  const { mutate: sendRatingMovie } = useMutation({
    mutationFn: (ratingParams: { movie_id: number; body: { value: number } }) =>
      postRateMovie(ratingParams.movie_id, ratingParams.body),
    onMutate: () => setIsRatingUpdating(true),
    onSuccess: async () => {
      await refetchAccountStateMovie();
      await refetchRatedMovies();
      setIsRatingUpdating(false);
    },
    onError: () => setIsRatingUpdating(false),
  });

  const { mutate: sendRatingSerie, isPending: isLoadingRatingSerie } =
    useMutation({
      mutationFn: (ratingParams: {
        movie_id: number;
        body: { value: number };
      }) => postRateSerie(ratingParams.movie_id, ratingParams.body),

      onSuccess: async () => {
        setTimeout(() => {
          refetchAccountStateSerie();
          refetchRatedTvShows();
        }, 1000);
      },

      onError: error => {
        console.log('Erro ao avaliar', error);
      },
    });

  const { mutate: sendMediaInList, isPending: isLoadingMediaInList } =
    useMutation({
      mutationFn: (ratingParams: {
        list_id: number;
        body: { media_id: number; media_type: 'movie' | 'tv' };
      }) => postMediaInList(ratingParams.list_id, ratingParams.body),

      onSuccess: async () => {
        setTimeout(() => {
          refetchProfileMediaList();
        }, 1000);
      },
    });

  const dataMedia =
    params.type === 'movies' ? dataDetailsMovie : dataDetailsTvShow;

  const dataAccountState =
    params.type === 'movies' ? dataAccountStateMovie : dataAccountStateSerie;

  const dataCredits =
    params.type === 'movies' ? dataCreditsMovie : dataCreditsSerie;

  useEffect(() => {
    if (dataAccountState && dataAccountState.favorite) {
      setIsFavorite(true);
    }
    if (dataAccountState && dataAccountState.rated) {
      setRating(dataAccountState.rated.value);
    }
  }, [dataAccountState, dataAccountStateMovie, dataDetailsTvShow]);

  const returnDateRelease = () => {
    if (params.type === 'movies') {
      return new Date(dataDetailsMovie?.release_date ?? '').getFullYear();
    }
    return new Date(dataDetailsTvShow?.first_air_date ?? '').getFullYear();
  };

  const Directing = dataCredits?.crew?.find(
    element => element.job === 'Director',
  )?.name;

  if (
    loadingDataDetailsMovie ||
    loadingDataDetailsTvShow ||
    loadingDataCreditsMovie ||
    loadingDataAccountStateMovie ||
    loadingDataAccountStateSerie ||
    loadingProfile ||
    isLoadingRatingSerie ||
    loadingDataCreditsSerie ||
    isLoadingMediaInList ||
    loadingProfileMediaList ||
    isLoadingRatedTvShows ||
    isLoadingRatedMovies ||
    loadingDataDetailsSeasonsTvShow
  ) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={'#E9A6A6'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ModalRating
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        onConfirm={e => {
          if (params.type === 'movies') {
            sendRatingMovie({
              body: { value: Number(e) },
              movie_id: params.id,
            });
          } else {
            sendRatingSerie({
              body: { value: Number(e) },
              movie_id: params.id,
            });
          }
        }}
      />
      <ModalList
        listOptions={dataProfileMediaList?.results}
        isVisible={visibleModalList}
        onClose={() => setVisibleModalList(false)}
        onConfirm={e =>
          sendMediaInList({
            list_id: Number(e),
            body: {
              media_id: params.id,
              media_type: params.type === 'movies' ? 'movie' : 'tv',
            },
          })
        }
      />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${dataMedia?.backdrop_path}`,
        }}
        style={styles.listImage}
      />

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
      <Pressable
        style={styles.buttonFavorite}
        disabled={isLoadingFavorite}
        onPress={() => {
          sendFavorite({
            favorite: !favorite,
            media_id: params.id,
            media_type: params.type === 'movies' ? 'movie' : 'tv',
          });
        }}
      >
        <Icon
          name="star"
          size={20}
          iconStyle={favorite ? 'solid' : 'regular'}
          color={'red'}
        />
      </Pressable>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <View style={styles.posterContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${dataMedia?.poster_path}`,
            }}
            style={styles.posterImage}
          />
          <Pressable
            style={[
              styles.buttonRating,
              { backgroundColor: rating ? '#8BE0EC' : '#E9A6A6' },
            ]}
            onPress={() => setVisibleModal(true)}
          >
            {isRatingUpdating ? (
              <ActivityIndicator color="black" size="small" />
            ) : (
              <Text style={styles.userRating}>
                {rating ? `Sua nota: ${rating}/10` : 'AVALIE AGORA'}
              </Text>
            )}
          </Pressable>
        </View>
        <View style={styles.infoMediaContainer}>
          <Text style={styles.infoMediaTitle}>
            {params.type === 'movies'
              ? (dataMedia as MovieDetailsDTO).original_title
              : (dataMedia as SeriesDetailsDTO).original_name}
          </Text>
          <Text style={styles.infoMediaTime}>
            {returnDateRelease()}{' '}
            {params.type === 'movies'
              ? `    ${(dataMedia as MovieDetailsDTO).runtime} min`
              : `    ${
                  (dataMedia as SeriesDetailsDTO).episode_run_time[0] ?? 0
                } min/ep`}
          </Text>
          <View style={styles.subInfoMediaContainer}>
            <Text style={styles.subInfoDirectorText}>Direção por </Text>
            <Text style={styles.subInfoDirectorName}>{Directing}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {dataMedia?.vote_average?.toFixed(1)}/10
            </Text>
            <View style={styles.heartContainer}>
              <Icon name="heart" size={20} iconStyle="solid" color={'red'} />
              <Text style={styles.heartText}>{dataMedia?.vote_count}</Text>
            </View>
          </View>
          <Pressable
            style={styles.userListContainer}
            onPress={() => setVisibleModalList(true)}
          >
            <Icon
              name="plus"
              size={16}
              style={styles.userListIcon}
              iconStyle="solid"
            />
            <Text style={styles.userListText}>Adicionar à uma lista</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.mediaOverviewContainer}>
        <Text style={styles.mediaOverviewText}>{dataMedia?.overview}</Text>
        {params.type === 'movies' && (
          <>
            <View style={styles.castingContainer}>
              <View style={styles.castingBox}>
                <Text style={styles.castingBoxText}>Elenco</Text>
              </View>
              <View style={styles.castingLine} />
            </View>
            <FlatList
              data={dataCreditsMovie?.cast ?? []}
              contentContainerStyle={styles.castingContainerList}
              renderItem={({ item }) => (
                <View style={styles.actorsContainer}>
                  <Image
                    source={
                      item?.profile_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                          }
                        : require('../../images/avatar.png')
                    }
                    style={styles.actorsImage}
                  />
                  <View style={styles.actorsNameContainer}>
                    <Text style={styles.actorsRealName}>{item.name}</Text>
                    <Text style={styles.actorsCharacterName}>
                      {item.character}
                    </Text>
                  </View>
                </View>
              )}
            />
          </>
        )}
        {params.type === 'series' && (
          <ScrollView
            style={{ maxHeight: 400, marginTop: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {dataDetailsTvShow?.seasons?.length > 0 ? (
              dataDetailsTvShow.seasons.map((item, index) => (
                <Season
                  {...item}
                  key={`season-${item.id}-${index}`}
                  visible={expanded}
                  season_number={item.season_number}
                  seasonSelected={seasonSelected}
                  seasonExtraData={dataDetailsSeasonsTvShow?.episodes}
                  onPress={() => {
                    if (seasonSelected === item.season_number && expanded) {
                      setExpanded(false);
                      setSeasonSelected(undefined);
                    } else {
                      setSeasonSelected(item.season_number);
                      setExpanded(true);
                    }
                  }}
                />
              ))
            ) : (
              <View style={styles.seriesSesonNotFound}>
                <Text style={styles.textWhite}>
                  Nenhuma temporada encontrada
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
