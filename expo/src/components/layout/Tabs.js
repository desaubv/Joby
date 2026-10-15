import React, {
    createContext,
    useContext,
    useState,
} from "react";

import Screen from "./Screen";
import NavigationBar from "../navigation/NavigationBar";

const TabsContext = createContext(null);

const Tab = () => null;

const TabsScreen = ({
    children,
    initialTab = 0,
    scroll = true,
    contentParent = "default",
    position = "bottom",
    variant = "default",
    ...props
}) => {
    const tabs = React.Children.toArray(children).filter(
        child => React.isValidElement(child) && child.type === Tab
    );

    const [activeTab, setActiveTab] = useState(parseInt(initialTab) || 0);

    const currentTab = tabs[activeTab] ?? tabs[0];

    const contextValue = {
        activeTab,
        setActiveTab,
        tabs,
    };

    const content = currentTab?.props.component
        ?? currentTab?.props.children
        ?? null;


    return (
        <TabsContext.Provider value={contextValue}>
            {
                contentParent === "default" ?
                    (
                        <Screen
                            centered
                            scroll={scroll}
                            {...props}
                        >
                            {currentTab?.props.component}
                        </Screen>
                    ) : (
                        content
                    )
            }

            <NavigationBar
                position={position}
                variant={variant}
                tabs={tabs.map(tab => ({
                    label: tab.props.label,
                    icon: tab.props.icon,
                }))}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

        </TabsContext.Provider>
    );
};

export { Tab };

export default TabsScreen;