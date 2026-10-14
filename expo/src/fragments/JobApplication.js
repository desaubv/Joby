
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
    BriefcaseBusiness,
    ChevronRight,
    MapPin,
} from "lucide-react-native";
import { getInitials } from "services/initials";
import Chip from "components/ui/Chip";

const defaultPublication = {
    company: null,
    title: null,
    status: "review", // "rejected", "review", "interview", "accepted"
}

const StatusChip = ({ status }) => {
    const { theme } = useTheme();

    const statusColor = {
        rejected: "#eb9494",
        review: "#dc946b",
        interview: "#94b1c8",
        accepted: "#94c899"
    }

    const statusSpanish = {
        rejected: "Rechazada",
        review: "En revisión",
        interview: "Entrevista",
        accepted: "Aceptado"
    }
    return (
        <Chip
            style={{ marginTop: theme.spacing.sm }}
            color={statusColor[status]}
        >{statusSpanish[status]}</Chip>
    )
}

const JobApplication = ({ job = null }) => {
    const {
        company,
        title,
        status,
        date
    } = job ?? defaultPublication;

    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 16,
            gap: 14,
            backgroundColor: theme.colors.surface ?? "#FFFFFF",
            borderRadius: 12,
            borderColor: theme.colors.border ?? "#E5E7EB",
            borderBottomWidth: 1,
            marginTop: theme.spacing.sm,
            flexDirection: "row"
        },

        information: {
            width: "80%",
            flexDirection: "column",
            alignItems: "start",
            gap: 10,
        },

        avatar: {
            width: 60,
            height: 60,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.border ?? "#E5E7EB",
        },

        avatarInitils: {
            width: "100%",
            height: "100%",
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: theme.text.headingSize,
            color: theme.colors.secondary,
            fontWeight: "700"
        },

        companyInfo: {
            flex: 1
        },

        titleContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
        },

        jobInfo: {
            flex: 1
        },

        title: {
            fontWeight: "700",
            color: theme.colors.primary,
            marginBottom: theme.spacing.xs
        },

        metadata: {
            fontSize: theme.text.baseSize * 0.8,
            color: theme.colors.textSecondary ?? "#6B7280",
            justifyContent: "center",
            alignItems: "center"
        },

        modality: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            overflow: "hidden",

            gap: 3,
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

    return job ? (
        <TouchableOpacity style={styles.container}>
            {/* Encabezado */}
            <View
                activeOpacity={0.8}
                style={{ width: "15%" }}
            >
                {company?.logo ? (
                    <Image
                        source={getImageSource(company.logo)}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarInitils}>{getInitials(company.name)}</Text>
                    </View>
                )}

            </View>

            <View style={styles.information}>
                <View
                    style={styles.companyInfo}
                    activeOpacity={0.8}
                >
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {job.title}
                        </Text>
                        <ChevronRight
                            color={theme.colors.primary}
                        />
                    </View>

                    <Text
                        variant="secondary"
                        style={styles.metadata}
                        numberOfLines={1}
                    >
                        {company?.name ?? "Empresa"}
                    </Text>

                    <StatusChip status={job.status} />

                    <Text
                        variant="secondary"
                        style={styles.metadata}
                        numberOfLines={1}
                    >
                        Postulada el {job.date ?? "???"}
                    </Text>

                </View>
            </View>
        </TouchableOpacity>
    ) : (
        <View style={styles.container}>
            {/* Encabezado */}
            <View
                activeOpacity={0.8}
                style={{ width: "15%" }}
            >
                <SkeletonBox
                    width={60}
                    height={60}
                    radius={theme.radius.md}
                />
            </View>

            <View style={styles.information}>
                <View
                    style={styles.companyInfo}
                    activeOpacity={0.8}
                >
                    <SkeletonText
                        width="70%"
                        numberOfLines={1}
                        lineHeight={25}
                    />

                    <SkeletonText
                        width="40%"
                        numberOfLines={1}
                        lineHeight={15}
                    />
                </View>

                <View
                    style={styles.jobInfo}
                    activeOpacity={0.8}
                >

                    <View style={styles.modality}>
                        <SkeletonText
                            width="22%"
                            numberOfLines={1}
                            lineHeight={25}
                        />
                    </View>

                </View>
            </View>
        </View>
    );
};

export default JobApplication;
