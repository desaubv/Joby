import { House, UsersRound, BriefcaseBusiness, UserRound, Bell } from "lucide-react-native";

import TabsScreen, { Tab } from "components/layout/Tabs";
import SettingsScreen from "screens/Settings";
import GoTo from "components/navigation/GoTo";

export default function Settings() {

    return (
        <TabsScreen initialTab={4}>
            <Tab
                label="Inicio"
                icon={House}
                component={<GoTo href="/?tab=0" />}
            />

            <Tab
                label="Red"
                icon={UsersRound}
                component={<GoTo href="/?tab=1" />}
            />

            <Tab
                label="Empleos"
                icon={BriefcaseBusiness}
                component={<GoTo href="/?tab=2" />}
            />

            <Tab
                label="Notificaciones"
                icon={Bell}
                component={<GoTo href="/?tab=3" />}
            />

            <Tab
                label="Perfil"
                icon={UserRound}
                component={<SettingsScreen/>}
            />
        </TabsScreen>
    );
}