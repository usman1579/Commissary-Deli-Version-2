import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon as IconComponent} from 'src/components';
import {useNavigation} from '@react-navigation/native';

const Icon = ({onPress, ...rest}) => {
  const navigation = useNavigation();
  const handleClick = onPress ? onPress : () => navigation.goBack();

  return (
    <TouchableOpacity onPress={handleClick} style={styles.container, {backgroundColor: '#ffffff73', borderRadius: 8}}>
      <IconComponent name="chevron-left" size={26} isRotateRTL {...rest} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
});

export default Icon;
