import React, { memo, useEffect, useState } from 'react';
import { styles } from './style';
import { OtpParams } from '../../types/general';
import generateOTP from '../../../lib/generator';
import { View, Text } from 'react-native';

interface Params {
  name: string;
  params: OtpParams;
}

type Otp = string | number | null;
type Seconds = string | number | null;

function UserOtpInput({ name, params }: Params) {
  const { secret, digits, period } = params;

  const [otp, setOtp] = useState<Otp>(() => {
    const { otp } = generateOTP({
      secret,
      period,
      digits,
    });
    return otp;
  });
  const [seconds, setSeconds] = useState<Seconds>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const { otp, secondsBeforeExpiration } = generateOTP({
        secret,
        period,
        digits,
      });
      setOtp(otp);
      setSeconds(secondsBeforeExpiration);
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerBox}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.otp}>{otp}</Text>
          <Text style={styles.seconds}>{seconds}</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(UserOtpInput);
