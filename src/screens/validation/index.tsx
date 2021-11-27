import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { OtpParams } from '../../types/general';
import { useState } from 'react';
import { styles } from './style';
import UserOtpInput from '../../components/userOtpInput';
import generateOTP from '../../../lib/generator';

export type ParamList = {
  Params: {
    name: string;
    params: OtpParams;
  };
};

function ValidationScreen() {
  const route = useRoute<RouteProp<ParamList, 'Params'>>();
  const {
    name,
    params,
    params: { secret, period, digits },
  } = route?.params;

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleValidate = () => {
    const { otp } = generateOTP({
      secret,
      period,
      digits,
    });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: otp, account: name }),
    };
    setLoading(true);
    fetch('https://otp-test-exercise.herokuapp.com/otp', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert('Succeess!');
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.error) {
          alert(err?.error);
        }
        alert('Something went wrong...  :(');
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <UserOtpInput name={name} params={params} />
      {isLoading && <ActivityIndicator size="small" color="#1c348a" />}
      <Button
        title="Validate"
        titleStyle={styles.titleStyle}
        containerStyle={styles.btnContainerStyle}
        type="outline"
        onPress={handleValidate}
      />
    </View>
  );
}

export default ValidationScreen;
