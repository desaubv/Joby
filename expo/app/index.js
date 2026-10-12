import { House, UsersRound, BriefcaseBusiness, UserRound, Bell } from "lucide-react-native";

import TabsScreen, { Tab } from "../components/layout/Tabs";
import HomeScreen from "../screens/index/Home";
import NetworkScreen from "../screens/index/Network";
import JobsScreen from "../screens/index/Jobs";
import NotificationScreen from "../screens/index/Notifications";
import ProfileScreen from "../screens/index/Profile";

export default function Index() {
    return (
        <TabsScreen initialTab={0}>
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
                component={<ProfileScreen/>}
            />
        </TabsScreen>
    );
}