import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type OtpParams = {
  [key: string]: unknown;
  secret?: string;
  algorithm?: string;
  digits?: string;
  period?: string;
  lock?: string;
};

export type ValidationParams = {
  name: string;
  params: OtpParams;
};

export type RootStackParamList = {
  root: NavigatorScreenParams<RootTabParamList> | undefined;
  validation: NavigatorScreenParams<RootTabParamList> | ValidationParams;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HeaderBackButton: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'root'
>;

export type NavigationProps = {
  navigation: ScreenNavigationProp;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
