import React, { useEffect, useState, useCallback } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { NavigationProps, OtpParams } from '../../types/general';
import device from '../../constants/layuot';

interface FrameSize {
  height: number;
  width: number;
  x: number;
  y: number;
}

type Permission = boolean | null;
type Frame = FrameSize | null;

function CameraScreen({ navigation }: NavigationProps) {
  const [hasPermission, setHasPermission] = useState<Permission>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [frameSize, setFrameSize] = useState<Frame>(null);

  const onLayout = useCallback((event) => {
    const { layout } = event.nativeEvent;
    setFrameSize(layout);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (scanned) setScanned((prev) => !prev);
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    const url = new URL(data);
    const pathname = url.pathname.replace('/', '');
    const params: OtpParams = {};
    const paramsArray: string[] = [
      'secret',
      'algorithm',
      'digits',
      'period',
      'lock',
    ];

    paramsArray.forEach((value) => {
      params[value] = url.searchParams.get(value);
    });

    setScanned(true);
    navigation.replace('validation', {
      name: pathname,
      params,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={['org.iso.QRCode']}
        onBarCodeScanned={(result) => {
          const { bounds, data } = result;
          if (scanned) return undefined;
          else {
            const originY = bounds?.origin?.y || 0;
            const originX = bounds?.origin?.x || 0;
            const width = bounds?.size?.width || 0;
            const height = bounds?.size?.height || 0;
            if (
              frameSize &&
              Object.keys(frameSize).length > 0 &&
              originY >= frameSize?.y &&
              originY <= frameSize?.y + frameSize?.height &&
              originX >= frameSize?.x &&
              originX <= frameSize?.x + frameSize?.width &&
              width <= frameSize?.width &&
              height <= frameSize?.height
            ) {
              handleBarCodeScanned({ data });
            }
          }
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && <View style={styles.frame} onLayout={onLayout} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    position: 'absolute',
    top: '27%',
    left: '10%',
    width: device.width * 0.8,
    height: device.width * 0.8,
    borderColor: 'green',
    borderWidth: 4,
    zIndex: 2,
  },
});

export default CameraScreen;
