import { House, UsersRound, BriefcaseBusiness, UserRound, Bell } from "lucide-react-native";

import TabsScreen, { Tab } from "components/layout/Tabs";
import HomeScreen from "screens/index/Home";
import NetworkScreen from "screens/index/Network";
import JobsScreen from "screens/index/Jobs";
import NotificationScreen from "screens/index/Notifications";
import MyProfileScreen from "screens/index/MyProfile";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
    const { tab } = useLocalSearchParams();

    return (
        <TabsScreen initialTab={tab ?? 0}>
            <Tab
                label="Inicio"
                icon={House}
                component={<HomeScreen />}
            />

            <Tab
                label="Red"
                icon={UsersRound}
                component={<NetworkScreen/>}
            />

            <Tab
                label="Empleos"
                icon={BriefcaseBusiness}
                component={<JobsScreen/>}
            />

            <Tab
                label="Notificaciones"
                icon={Bell}
                component={<NotificationScreen/>}
            />

            <Tab
                label="Perfil"
                icon={UserRound}
                component={<MyProfileScreen/>}
            />
        </TabsScreen>
    );
}