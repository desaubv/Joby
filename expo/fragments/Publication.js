
import React, { useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    Heart,
    MessageCircle,
    MoreHorizontal,
    Forward,
} from "lucide-react-native";

import { useTheme } from "../theme/useTheme";
import Text from "../components/Text/Text";
import Button from "../components/Button";

const Publication = ({
    user,
    content,
    image,
    date = "Ahora",
    initialLikes = 0,
    comments = 0,
    likedInitially = false,
    onProfilePress,
    onLike,
    onComment,
    onShare,
    onOptions,
}) => {
    const { theme } = useTheme();
    const [liked, setLiked] = useState(likedInitially);
    const [likes, setLikes] = useState(initialLikes);

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 16,
            gap: 14,
            backgroundColor: theme.colors.surface ?? "#FFFFFF",
            borderRadius: 12,
            borderColor: theme.colors.input.border ?? "#E5E7EB",
            borderBottomWidth: 1,
            marginTop: theme.spacing.sm
        },

        header: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },

        avatar: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.colors.input.border ?? "#E5E7EB",
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
            backgroundColor: theme.colors.input.border ?? "#E5E7EB",
        },

        divider: {
            height: 1,
            backgroundColor: theme.colors.input.border ?? "#E5E7EB",
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

    const handleLike = () => {
        const nextLiked = !liked;

        setLiked(nextLiked);
        setLikes((previous) => previous + (nextLiked ? 1 : -1));

        onLike?.(nextLiked);
    };

    const getImageSource = (source) =>
        typeof source === "string"
            ? { uri: source }
            : source;

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={onProfilePress}
                    activeOpacity={0.8}
                >
                    {user?.avatar ? (
                        <Image
                            source={getImageSource(user.avatar)}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatar} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.userInfo}
                    onPress={onProfilePress}
                    activeOpacity={0.8}
                >
                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                    >
                        {user?.name ?? "Usuario"}
                    </Text>

                    <View style={styles.roleHour}>
                        {!!user?.role && (
                            <>
                                <Text
                                    variant="secondary"
                                    style={styles.metadata}
                                    numberOfLines={1}
                                >
                                    {user.role}
                                </Text>
                                <Text 
                                    variant="secondary"
                                    style={[styles.metadata, {fontSize: theme.text.subheadingSize}]}
                                >·</Text>
                            </>
                        )

                        }

                        <Text variant="secondary" style={styles.metadata}>
                            {date}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onOptions}
                    hitSlop={10}
                >
                    <MoreHorizontal
                        size={22}
                        color={theme.colors.text.text ?? "#374151"}
                    />
                </TouchableOpacity>
            </View>

            {/* Contenido */}
            {!!content && (
                <Text style={styles.content}>
                    {content}
                </Text>
            )}

            {/* Imagen opcional */}
            {!!image && (
                <Image
                    source={getImageSource(image)}
                    style={styles.publicationImage}
                    resizeMode="cover"
                />
            )}

            <View style={styles.divider} />

            {/* Acciones */}
            <View style={styles.actions}>
                <Button
                    variant="ghost" 
                    iconLeft={Heart}
                    onPress={handleLike}
                >
                    {`${likes}`}
                </Button>
                
                <Button 
                    variant="ghost" 
                    iconLeft={MessageCircle}
                    onPress={onComment}
                >
                    {`${comments}`}
                </Button>
                
                <Button 
                    variant="ghost" 
                    iconLeft={Forward}
                    onPress={onShare}
                >
                    {`${comments}`}
                </Button>
            </View>
        </View>
    );
};

export default Publication;
