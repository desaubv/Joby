import { House, UsersRound, BriefcaseBusiness, UserRound, Bell } from "lucide-react-native";

import TabsScreen, { Tab } from "../components/layout/Tabs";
import HomeScreen from "../screens/index/Home";

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
            />

            <Tab
                label="Empleos"
                icon={BriefcaseBusiness}
            />

            <Tab
                label="Notificaciones"
                icon={Bell}
            />

            <Tab
                label="Perfil"
                icon={UserRound}
            />
        </TabsScreen>
    );
}