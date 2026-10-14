
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
    MoreHorizontal,
} from "lucide-react-native";
import { getInitials } from "services/initials";


const defaultUser = {
    name: null,
    lastname: null,
    avatar: null,
    role: null
}

const NetworkMemberCard = ({ user = null }) => {
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

        userInfo: {
            flex: 1
        },

        userName: {
            fontWeight: "600",
        },

        roleHour: {
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: 3,
        },

        metadata: {
            fontSize: theme.text.smallSize,
            color: theme.colors.textSecondary ?? "#6B7280",
            justifyContent: "center",
            alignItems: "center"
        },

        content: {
            fontSize: theme.text.normalSize ?? 14,
            lineHeight: 21,
        },

        publicationImage: {
            width: "100%",
            aspectRatio: 4 / 3,
            borderRadius: 8,
            backgroundColor: theme.colors.border ?? "#E5E7EB",
        },

        divider: {
            height: 1,
            backgroundColor: theme.colors.border ?? "#E5E7EB",
        },

        stats: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        actions: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },

        action: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingVertical: 8,
        },

        actionText: {
            fontSize: theme.text.smallSize,
            color: theme.colors?.textSecondary ?? "#6B7280",
        },
    });

    const getImageSource = (source) =>
        typeof source === "string"
            ? { uri: source }
            : source;

    return user ? (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleViewProfile}
                    activeOpacity={0.8}
                >
                    {user?.avatar ? (
                        <Image
                            source={getImageSource(user.avatar)}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatar} >
                            <Text style={styles.avatarInitils}>{getInitials(user.name, user.lastname)}</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.userInfo}
                    onPress={handleViewProfile}
                    activeOpacity={0.8}
                >
                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                    >
                        {user?.name ?? "Usuario"}  {user?.lastname}
                    </Text>

                    <View style={styles.roleHour}>
                        <Text
                            variant="secondary"
                            style={styles.metadata}
                            numberOfLines={1}
                        >
                            {user?.role ?? "-"}
                        </Text>
                    </View>
                </TouchableOpacity>

                <Button
                    variant="secondary"
                    radius="lg"
                    style={{minHeight: 0}}
                    onPress={handleSendMessage}
                >Mensaje</Button>

                <Button
                    onPress={onOptions}
                    hitSlop={10}
                    icon={MoreHorizontal}
                    variant="ghost"
                ></Button>
            </View>
        </View>
    ) : (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>

                <SkeletonBox
                    width={60}
                    height={60}
                    radius={100}
                />

                <View style={styles.userInfo}>
                    <SkeletonText width="30%" />
                    <SkeletonText width="60%" />
                </View>
            </View>
        </View>
    );
};

export default NetworkMemberCard;
