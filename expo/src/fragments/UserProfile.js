
import React from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
} from "react-native";

import {
    ArrowLeft,
    Settings,
    MoreVertical,
    BadgeCheck,
    MapPin,
    Plus,
    MessageCircle,
} from "lucide-react-native";

import { useTheme } from "theme/useTheme";

const UserProfileFragment = ({
    user = {},
    isOwnProfile = false,
    isConnected = false,
    onBack,
    onSettings,
    onMore,
    onConnect,
    onMessage,
    onSkillPress,
}) => {
    const { theme } = useTheme();
    const colors = theme.colors;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: colors.surface,
            borderRadius: 14,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.border,
        },

        cover: {
            height: 108,
            justifyContent: "flex-start",
        },

        coverOverlay: {
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingTop: 18,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
        },

        iconButton: {
            width: 34,
            height: 34,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 18,
        },

        headerActions: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },

        content: {
            paddingHorizontal: 18,
            paddingBottom: 16,
        },

        avatarContainer: {
            width: 94,
            height: 94,
            borderRadius: 47,
            backgroundColor: colors.surface,
            padding: 3,
            marginTop: -58,
            marginBottom: 8,
        },

        avatar: {
            width: "100%",
            height: "100%",
            borderRadius: 46,
            backgroundColor: colors.background,
        },

        nameRow: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 5,
        },

        name: {
            color: colors.text,
            fontSize: 20,
            fontWeight: "700",
        },

        verified: {
            color: colors.primary,
        },

        position: {
            color: colors.text,
            fontSize: 14,
            marginTop: 3,
        },

        locationRow: {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 5,
            marginTop: 3,
        },

        location: {
            color: colors.textSecondary || colors.secondary,
            fontSize: 13,
        },

        separator: {
            color: colors.textSecondary || colors.secondary,
        },

        description: {
            color: colors.text,
            fontSize: 14,
            lineHeight: 20,
            marginTop: 12,
        },

        skills: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 7,
            marginTop: 14,
        },

        skill: {
            backgroundColor: colors.primaryLight || "#e8f0fc",
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 18,
        },

        skillText: {
            color: colors.primary,
            fontSize: 12,
            fontWeight: "500",
        },

        moreSkills: {
            backgroundColor: colors.background,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 18,
        },

        moreSkillsText: {
            color: colors.textSecondary || colors.secondary,
            fontSize: 12,
            fontWeight: "600",
        },

        stats: {
            flexDirection: "row",
            marginTop: 22,
            marginBottom: 18,
        },

        stat: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },

        statValue: {
            color: colors.text,
            fontSize: 16,
            fontWeight: "700",
        },

        statLabel: {
            color: colors.textSecondary || colors.secondary,
            fontSize: 12,
            marginTop: 4,
        },

        statDivider: {
            width: 1,
            backgroundColor: colors.border,
            marginHorizontal: 8,
        },

        buttons: {
            flexDirection: "row",
            gap: 10,
        },

        actionButton: {
            flex: 1,
            minHeight: 40,
            borderRadius: 11,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 7,
            paddingHorizontal: 10,
            borderWidth: 1.5,
            borderColor: colors.border,
        },

        primaryButton: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },

        secondaryButton: {
            backgroundColor: colors.surface,
        },

        primaryButtonText: {
            color: "#ffffff",
            fontSize: 14,
            fontWeight: "600",
        },

        secondaryButtonText: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: "600",
        },
    });

    const skills = user.skills || [];
    const visibleSkills = skills.slice(0, 4);
    const extraSkills = Math.max(0, skills.length - visibleSkills.length);

    const Stat = ({ value, label }) => (
        <View style={styles.stat}>
            <Text style={styles.statValue}>{value ?? 0}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    const ActionButton = ({
        label,
        onPress,
        primary = false,
        icon,
    }) => {
        const Icon = icon;

        return (
            <Pressable
                onPress={onPress}
                style={[
                    styles.actionButton,
                    primary
                        ? styles.primaryButton
                        : styles.secondaryButton,
                ]}
            >
                {Icon && (
                    <Icon
                        size={16}
                        color={primary ? "#ffffff" : colors.primary}
                    />
                )}

                <Text
                    style={
                        primary
                            ? styles.primaryButtonText
                            : styles.secondaryButtonText
                    }
                >
                    {label}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={
                    user.coverImage
                        ? { uri: user.coverImage }
                        : undefined
                }
                style={styles.cover}
                resizeMode="cover"
            >
                <View style={styles.coverOverlay}>
                    <Pressable
                        style={styles.iconButton}
                    >
                    </Pressable>

                    <View style={styles.headerActions}>
                        {isOwnProfile && (
                            <Pressable
                                onPress={onSettings}
                                style={styles.iconButton}
                                hitSlop={8}
                            >
                                <Settings size={21} color="#ffffff" />
                            </Pressable>
                        )}

                        <Pressable
                            onPress={onMore}
                            style={styles.iconButton}
                            hitSlop={8}
                        >
                            <MoreVertical size={22} color="#ffffff" />
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>

            <View style={styles.content}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={
                            user.avatar
                                ? { uri: user.avatar }
                                : require("assets/placeholders/history.avif")
                        }
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.nameRow}>
                    <Text style={styles.name}>
                        {user.name || "Nombre del usuario"}
                    </Text>

                    {user.verified && (
                        <BadgeCheck
                            size={17}
                            color={colors.primary}
                            fill={colors.surface}
                        />
                    )}
                </View>

                <Text style={styles.position}>
                    {user.position || "Profesional"}
                </Text>

                <View style={styles.locationRow}>
                    <Text style={styles.location}>
                        {user.location || "Ubicación no especificada"}
                    </Text>

                    {user.availableToWork && (
                        <>
                            <Text style={styles.separator}>·</Text>
                            <Text style={styles.location}>
                                Disponible para trabajar
                            </Text>
                        </>
                    )}
                </View>

                {!!user.description && (
                    <Text style={styles.description}>
                        {user.description}
                    </Text>
                )}

                {visibleSkills.length > 0 && (
                    <View style={styles.skills}>
                        {visibleSkills.map((skill, index) => (
                            <Pressable
                                key={`${skill}-${index}`}
                                style={styles.skill}
                                onPress={() => onSkillPress?.(skill)}
                            >
                                <Text style={styles.skillText}>
                                    {skill}
                                </Text>
                            </Pressable>
                        ))}

                        {extraSkills > 0 && (
                            <Pressable
                                style={styles.moreSkills}
                                onPress={() => onSkillPress?.(null)}
                            >
                                <Text style={styles.moreSkillsText}>
                                    +{extraSkills}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                )}

                <View style={styles.stats}>
                    <Stat
                        value={user.connections}
                        label="conexiones"
                    />

                    <View style={styles.statDivider} />

                    <Stat
                        value={user.posts}
                        label="publicaciones"
                    />

                    <View style={styles.statDivider} />

                    <Stat
                        value={user.followers}
                        label="seguidores"
                    />
                </View>

                {!isOwnProfile && (
                    <View style={styles.buttons}>
                        <ActionButton
                            label={isConnected ? "Conectado" : "Conectar"}
                            onPress={onConnect}
                            primary={!isConnected}
                            icon={isConnected ? undefined : Plus}
                        />

                        <ActionButton
                            label="Mensaje"
                            onPress={onMessage}
                            icon={MessageCircle}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default UserProfileFragment;
