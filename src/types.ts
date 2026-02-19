// Navigation types
export type RootStackParamList = {
    Onboarding: undefined;
    SignIn: undefined;
    MainTabs: undefined;
    RideDetails: { rideId: string };
    LiveTracking: { rideId: string };
    RideSummary: { rideId: string };
    SplitFare: { rideId: string };
    ManageSplitFare: { rideId: string };
    DriverDashboard: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Activity: undefined;
    Wallet: undefined;
    Profile: undefined;
};

// Data types
export interface Ride {
    id: string;
    driverName: string;
    driverRating: number;
    carModel: string;
    carColor: string;
    licensePlate: string;
    pickup: Location;
    dropoff: Location;
    departureTime: string;
    arrivalTime: string;
    priceETH: number;
    priceUSD: number;
    seatsAvailable: number;
    seatsTotal: number;
}

export interface Location {
    name: string;
    detail: string;
}

export interface Transaction {
    id: string;
    title: string;
    date: string;
    amount: string;
    type: 'credit' | 'debit';
}

export interface User {
    name: string;
    university: string;
    walletAddress: string;
    rating: number;
    ridesCount: number;
    drivenCount: number;
    balanceCRIDE: number;
    balanceUSD: number;
    isVerified: boolean;
}

export interface SplitFareInvite {
    id: string;
    fromUser: string;
    fromRating: number;
    pickup: string;
    destination: string;
    departureTime: string;
    shareETH: number;
    shareUSD: number;
}

export interface DriverRequest {
    id: string;
    passengerName: string;
    priceETH: number;
    priceUSD: number;
    pickup: string;
    pickupDistance: string;
    destination: string;
    totalDistance: string;
}

export interface ScheduleItem {
    id: string;
    title: string;
    time: string;
    detail: string;
}
