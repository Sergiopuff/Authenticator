import { Platform, StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

export const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    paddingHorizontal: normalize(15),
    marginTop: normalize(15),
  },
  containerBox: {
    width: '100%',
    padding: normalize(12),
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(239,239,239,0.55)',
    backgroundColor: '#fff',
    shadowColor: '#a4a4a4',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
  },
  nameWrapper: {
    width: '100%',
    marginBottom: normalize(5),
  },
  name: {
    fontSize: normalize(18),
    letterSpacing: 0.963,
    fontWeight: 'bold',
    color: '#7e7e7e',
  },
  data: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  otp: {
    color: '#1c348a',
    fontSize: normalize(22),
    fontWeight: '500',
    letterSpacing: 2.963,
  },
  seconds: {
    color: '#1c348a',
    fontSize: normalize(26),
    fontWeight: '500',
    letterSpacing: 3.963,
  },
});
