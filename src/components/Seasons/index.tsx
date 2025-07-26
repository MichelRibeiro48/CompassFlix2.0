import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import styles from './styles';
import { Episode } from '../../types/seriesDTO';

type SeasonProps = {
  name: string;
  visible: boolean;
  season_number: number;
  seasonSelected?: number;
  seasonExtraData?: Episode[];
  onPress: () => void;
};

const Season = ({
  name,
  visible,
  season_number,
  seasonSelected,
  seasonExtraData,
  onPress,
}: SeasonProps) => {
  const isExpanded = visible && season_number === seasonSelected;

  return season_number !== 0 ? (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          styles.accordionButton,
          // eslint-disable-next-line react-native/no-inline-styles
          { borderBottomColor: isExpanded ? '#E9A6A6' : '#BFBFBF' },
        ]}
      >
        <Text style={styles.accordionMainText}>{name}</Text>
        <Icon
          name={isExpanded ? 'arrow-up' : 'arrow-down'}
          iconStyle="solid"
          color={'#fff'}
          size={15}
        />
      </TouchableOpacity>

      {isExpanded && seasonExtraData && seasonExtraData.length > 0 && (
        <View style={styles.accordionChildContainer}>
          {seasonExtraData.map((item: Episode, episodeIndex: number) => (
            <View
              key={`episode-${item.id}-${episodeIndex}`}
              style={styles.accordionChildBody}
            >
              <Text style={styles.accordionChildTitle}>
                {`T${String(seasonSelected).padStart(2, '0')} | E${String(
                  item.episode_number,
                ).padStart(2, '0')}`}
              </Text>
              <Text style={styles.accordionChildSubTitle} numberOfLines={2}>
                {item.name || `Episódio ${item.episode_number}`}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  ) : null;
};

export default Season;
