import React from 'react';
import { Button } from 'react-native-elements';
import { SvgXml } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import { NavigationProps } from '../../types/general';
import { backArrow } from '../../../assets/svg/backArrow';

function HeaderBackButton({ navigation }: NavigationProps) {
  return (
    <Button
      containerStyle={styles.buttonLeft}
      type="clear"
      onPress={() => navigation.replace('root')}
      icon={<SvgXml xml={backArrow} />}
    />
  );
}

const styles = StyleSheet.create({
  buttonLeft: {
    marginLeft: 10,
  },
});

export default HeaderBackButton;
