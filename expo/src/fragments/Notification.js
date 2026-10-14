
import React, { useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { useTheme } from "theme/useTheme";

import SkeletonText from "components/sketeton/SkeletonText";
import SkeletonBox from "components/sketeton/SkeletonBox"
import Button from "components/ui/Button";
import Text from "components/Text/Text";

import {
    ChevronRight,
    MessageCircleMore,
} from "lucide-react-native";
import { UserRoundPlus } from "lucide-react-native/icons";

import { getInitials } from "services/initials";


const defaultNotification = {
    title: "Ana Torres",
    subtitle: "te ha enciado una solicitud de conexion",
    content: "Quiere formar parte de tu red profesional",
    catogory: "add", // "mentions", "system", "message", "add"
    from: {
        avatar: null,
        name: "Ana Torres",
    },
    time: "10:12"
}

const BallImage = ({ from, catogory }) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        avatar: {
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: theme.colors.border ?? "#E5E7EB",
        },

        avatarInitils: {
            width: "100%",
            height: "100%",
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: theme.text.subheadingSize,
            fontWeight: "600"
        },

        dot: {
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 25,
            height: 25,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    const getImageSource = (source) =>
        typeof source === "string"
            ? { uri: source }
            : source;

    const renderIcon = (IconComponent) => {
        if (!IconComponent) {
            return null;
        }

        return (
            <IconComponent
                size={15}
                strokeWidth={2}
                color={"#FFFFFF"}
            />
        );
    };

    const categoryDot = {
        mentions: {
            icon: null,
            color: "null"
        },

        system: {
            icon: null,
            color: null
        },

        message: {
            icon: MessageCircleMore,
            color: theme.colors.primary
        },

        message: {
            icon: MessageCircleMore,
            color: theme.colors.primary
        },

        add: {
            icon: UserRoundPlus,
            color: theme.colors.primary
        },
    }

    return (
        <View>
            {
                from?.avatar ? (
                    <View>
                        <Image
                            source={getImageSource(from.avatar)}
                            style={styles.avatar}
                        />
                    </View>
                ) : (
                    <View style={styles.avatar} >
                        <Text style={styles.avatarInitils}>{getInitials(from.name)}</Text>
                    </View>
                )
            }

            {
                categoryDot[catogory].icon ? (
                    <View style={[styles.dot, { backgroundColor: categoryDot[catogory].color }]}>
                        {renderIcon(categoryDot[catogory].icon)}
                    </View>
                ) : null
            }
        </View>

    )

}

const Notification = ({ notification = null }) => {
    const { theme } = useTheme();

    const handleViewProfile = () => {

    }

    const handleSendMessage = () => {

    }

    const onOptions = () => {

    }

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 16,
            gap: 14,
            backgroundColor: theme.colors.surface ?? "#FFFFFF",
            borderRadius: 12,
            borderColor: theme.colors.border ?? "#E5E7EB",
            borderBottomWidth: 1,
            marginTop: theme.spacing.sm
        },

        header: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },

        image: {
            width: "15%"
        },


        titleContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
        },

        notificationContainer: {
            width: "77%"
        },

        title: {
            fontWeight: "700",
        },

        body: {
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: 3,
        },

        subtitle: {
            fontSize: theme.text.smallSize * 1.1,
            justifyContent: "center",
            alignItems: "center"
        },

        content: {
            fontSize: theme.text.smallSize,
            color: `${theme.colors.text.secondary}90`,
            lineHeight: 21,
        },

        rightContainer: {
            width: "7%"
        }
    });

    return notification ? (
        <TouchableOpacity style={styles.container} onPress={handleViewProfile}>
            {/* Encabezado */}
            <View style={styles.header}>
                <View
                    activeOpacity={0.8}
                    style={styles.image}
                >
                    <BallImage
                        catogory={notification.catogory}
                        from={notification.from}
                    />
                </View>

                <View
                    style={styles.notificationContainer}
                    onPress={handleViewProfile}
                    activeOpacity={0.8}
                >
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {notification?.title ?? "Notificación"}
                        </Text>

                        <Text
                            style={[styles.content]}
                            numberOfLines={notification.subtitle ? 1 : 2}
                        >
                            {notification.time}
                        </Text>
                    </View>



                    <View style={styles.body}>
                        <Text
                            style={styles.subtitle}
                            numberOfLines={1}
                        >
                            {notification.subtitle}
                        </Text>
                    </View>
                    <View style={styles.roleHour}>
                        <Text
                            style={styles.content}
                            numberOfLines={notification.subtitle ? 1 : 2}
                        >
                            {notification.content}
                        </Text>
                    </View>
                </View>

                <View
                    style={styles.rightContainer}
                >
                    <ChevronRight
                        color={theme.colors.text.ghost}
                    />
                </View>
            </View>
        </TouchableOpacity>
    ) : (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>

                <SkeletonBox
                    width={60}
                    height={60}
                    radius={100}
                />

                <View style={styles.notificationContainer}>
                    <SkeletonText width="50%" />
                    <SkeletonText width="90%" />
                    <SkeletonText width="60%" />
                </View>
            </View>
        </View>
    );
};

export default Notification;
