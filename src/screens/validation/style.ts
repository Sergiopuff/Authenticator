import { Platform, StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: normalize(100),
    backgroundColor: 'rgba(239,239,239,0.55)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: normalize(20),
    letterSpacing: 1.5,
    padding: normalize(6),
  },
  btnContainerStyle: {
    borderColor: '#1c348a',
    backgroundColor: '#1c348a',
    borderWidth: 1.5,
  },
});
