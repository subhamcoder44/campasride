import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RideDetailsScreen from './src/screens/RideDetailsScreen';
import LiveTrackingScreen from './src/screens/LiveTrackingScreen';
import RideSummaryScreen from './src/screens/RideSummaryScreen';
import SplitFareScreen from './src/screens/SplitFareScreen';
import ManageSplitFareScreen from './src/screens/ManageSplitFareScreen';
import DriverDashboardScreen from './src/screens/DriverDashboardScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0d1117' },
            animation: 'slide_from_right',
          }}>
          {/* Auth Flow */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />

          {/* Main Tabs (managed manually via BottomTabBar) */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />

          {/* Ride Flow */}
          <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
          <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
          <Stack.Screen name="RideSummary" component={RideSummaryScreen} />

          {/* Split Fare */}
          <Stack.Screen name="SplitFare" component={SplitFareScreen} />
          <Stack.Screen name="ManageSplitFare" component={ManageSplitFareScreen} />

          {/* Driver */}
          <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />

          {/* MainTabs alias → Home */}
          <Stack.Screen
            name="MainTabs"
            component={HomeScreen}
            options={{ animation: 'fade' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
