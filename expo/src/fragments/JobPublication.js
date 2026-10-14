
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
    requiredSkills: [],
    experience: "Nula",
    modality: "hibrid", // "remote", "presencial", "special"
}

const JobPublication = ({ job = null }) => {
    const {
        company,
        title,
        requiredSkills,
        experience,
        modality
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
                </View>

                <View
                    style={styles.jobInfo}
                    activeOpacity={0.8}
                >

                    <View style={styles.modality}>
                        <MapPin
                            size={15}
                            color={theme.colors.text.secondary}
                        />
                        <Text
                            variant="secondary"
                            style={styles.metadata}
                            numberOfLines={1}
                        >

                            {job.modality ?? "No especificada"}
                        </Text>

                        <Text
                            variant="secondary"
                            style={[styles.metadata, { fontSize: theme.text.subheadingSize }]}
                        >·</Text>

                        <BriefcaseBusiness
                            size={15}
                            color={theme.colors.text.secondary}
                        />
                        <Text
                            variant="secondary"
                            style={styles.metadata}
                            numberOfLines={1}
                        >
                            {job.experience ?? "No especificada"}
                        </Text>
                    </View>

                    <View style={styles.modality}>
                        {
                            job.requiredSkills.map((skill) => <Chip>{skill}</Chip>)
                        }
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    ) : (
        // <View style={styles.container}>
        //     {/* Encabezado */}
        //     <View style={styles.information}>

        //         <SkeletonBox
        //             width={44}
        //             height={44}
        //             radius={22}
        //         />

        //         <View style={styles.companyInfo}>
        //             <SkeletonText width="30%" />
        //             <SkeletonText width="60%" />
        //         </View>
        //     </View>

        //     <SkeletonText
        //         lastLineWidth="70%"
        //         numberOfLines={3}
        //     />

        //     {/* Acciones */}
        // </View>
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
                            width="50%"
                            numberOfLines={1}
                        />
                    </View>

                </View>
            </View>
        </View>
    );
};

export default JobPublication;
