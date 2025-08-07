/* eslint-disable react-native/no-inline-styles */
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { Image, View } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
export function MyTabBar({ state, descriptors, navigation }: any) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 64,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#454545',
            }}
          >
            <View
              style={
                isFocused && {
                  backgroundColor: '#E9A6A6',
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                }
              }
              key={index}
            >
              {route.name === 'Profile' && (
                <Icon name="user" color={'#c9c9c9'} size={24} />
              )}
              {route.name === 'Movies' && (
                <Image
                  source={require('../../images/moviesOff.png')}
                  style={{ width: 30, height: 30 }}
                />
              )}
              {route.name === 'TvShows' && (
                <Image
                  source={require('../../images/seriesOff.png')}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
