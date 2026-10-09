
import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Modal,
    Image,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

import {
    Upload,
    FileText,
    Image as ImageIcon,
    X,
    File as FileIcon,
} from "lucide-react-native";

import { useTheme } from "../../theme/useTheme";
import { FormContext } from "./FormContext";

export default function FileUpload({
    name,

    value,
    onFilesChange,

    label = "Archivos",
    description = "Selecciona o adjunta tus archivos.",
    buttonLabel = "Seleccionar archivos",

    multiple = false,
    minFiles = 0,
    maxFiles,

    accept = ["*/*"],
    maxSizeMB,

    required = false,
    requiredMessage = "Debes adjuntar al menos un archivo.",
    formatMessage = "El formato de archivo no está permitido.",
    sizeMessage = "El archivo supera el tamaño máximo permitido.",
    maxFilesMessage = "Has alcanzado el límite de archivos.",

    disabled = false,
    editable = true,

    style,

    ...props
}) {
    const { theme } = useTheme();
    const form = useContext(FormContext);

    const isFormConnected = Boolean(form && name);
    const isDisabled = disabled || !editable;

    const [localFiles, setLocalFiles] = useState(
        Array.isArray(value) ? value : []
    );

    const [localError, setLocalError] = useState(null);
    const [isPicking, setIsPicking] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);

    const limit = maxFiles ?? (multiple ? Infinity : 1);

    const formFiles = isFormConnected
        ? form.values[name] ?? []
        : [];

    const files = value !== undefined
        ? value
        : isFormConnected
            ? formFiles
            : localFiles;

    const normalizedFiles = Array.isArray(files) ? files : [];

    const validate = useCallback((currentFiles) => {
        const selected = Array.isArray(currentFiles)
            ? currentFiles
            : [];

        if (required && selected.length === 0) {
            return requiredMessage;
        }

        if (selected.length < minFiles) {
            return `Debes seleccionar al menos ${minFiles} archivo(s).`;
        }

        if (selected.length > limit) {
            return maxFilesMessage;
        }

        return null;
    }, [
        required,
        requiredMessage,
        minFiles,
        limit,
        maxFilesMessage,
    ]);

    useEffect(() => {
        if (!isFormConnected) return;

        return form.registerField(name, validate);
    }, [form?.registerField, isFormConnected, name, validate]);

    useEffect(() => {
        if (value !== undefined) {
            setLocalFiles(Array.isArray(value) ? value : []);
        }
    }, [value]);

    const updateFiles = (nextFiles) => {
        if (onFilesChange) {
            onFilesChange(nextFiles);
        } else if (isFormConnected) {
            form.setValue(name, nextFiles);
        } else {
            setLocalFiles(nextFiles);
        }

        setLocalError(null);
    };

    const getExtension = (fileName = "") => {
        const index = fileName.lastIndexOf(".");
        return index >= 0
            ? fileName.slice(index).toLowerCase()
            : "";
    };

    const isAllowed = (file) => {
        if (!accept || accept.includes("*/*")) {
            return true;
        }

        const fileName = file.name ?? "";
        const mimeType = (file.mimeType ?? "").toLowerCase();
        const extension = getExtension(fileName);

        return accept.some((type) => {
            const normalized = type.toLowerCase();

            if (normalized.startsWith(".")) {
                return extension === normalized;
            }

            if (normalized.endsWith("/*")) {
                return mimeType.startsWith(
                    normalized.slice(0, -1)
                );
            }

            if (normalized.includes("/")) {
                return mimeType === normalized;
            }

            return false;
        });
    };

    const pickFiles = async () => {
        if (isDisabled || isPicking) return;

        setIsPicking(true);
        setLocalError(null);

        try {
            // Las extensiones no son tipos MIME válidos para todos
            // los selectores nativos; se filtran después de elegir.
            const hasExtensions = accept.some(
                (type) => type.startsWith(".")
            );

            const pickerTypes =
                accept.includes("*/*") || hasExtensions
                    ? ["*/*"]
                    : accept;

            const result = await DocumentPicker.getDocumentAsync({
                type: pickerTypes,
                multiple,
                copyToCacheDirectory: true,
            });

            if (result.canceled || !result.assets?.length) {
                return;
            }

            const selected = result.assets;

            const current = value !== undefined
                ? value
                : isFormConnected
                    ? form.values[name] ?? []
                    : localFiles;

            const currentFiles = Array.isArray(current)
                ? current
                : [];

            // Evitar duplicar un archivo ya seleccionado.
            const candidates = multiple
                ? [
                    ...currentFiles,
                    ...selected.filter(
                        (file) => !currentFiles.some(
                            (existing) => existing.uri === file.uri
                        )
                    ),
                ]
                : [selected[0]];

            if (candidates.length > limit) {
                setLocalError(maxFilesMessage);
                return;
            }

            if (candidates.some((file) => !isAllowed(file))) {
                setLocalError(formatMessage);
                return;
            }

            if (maxSizeMB != null) {
                const maxBytes = maxSizeMB * 1024 * 1024;

                const oversized = candidates.some(
                    (file) =>
                        file.size != null &&
                        file.size > maxBytes
                );

                if (oversized) {
                    setLocalError(
                        `${sizeMessage} Máximo: ${maxSizeMB} MB.`
                    );
                    return;
                }
            }

            updateFiles(candidates);
        } catch (error) {
            setLocalError(
                "No fue posible seleccionar los archivos."
            );

            console.error("FileUpload:", error);
        } finally {
            setIsPicking(false);
        }
    };

    const removeFile = (index) => {
        if (isDisabled) return;

        const nextFiles = normalizedFiles.filter(
            (_, fileIndex) => fileIndex !== index
        );

        updateFiles(nextFiles);

        if (previewFile?.uri === normalizedFiles[index]?.uri) {
            setPreviewFile(null);
        }
    };

    const getExtensionLabel = () => {
        if (!accept || accept.includes("*/*")) {
            return "Todos los formatos";
        }

        return accept
            .map((type) => type.startsWith(".")
                ? type.toUpperCase()
                : type
            )
            .join(", ");
    };

    const formatSize = (bytes) => {
        if (bytes == null) return "Tamaño desconocido";
        if (bytes < 1024) return `${bytes} B`;

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getFileIcon = (file) => {
        if (file.mimeType?.startsWith("image/")) {
            return ImageIcon;
        }

        if (
            file.mimeType?.includes("pdf") ||
            file.mimeType?.includes("document") ||
            file.name?.match(/\.(pdf|docx?|txt)$/i)
        ) {
            return FileText;
        }

        return FileIcon;
    };

    const validationError = isFormConnected
        ? form.errors[name]
        : null;

    const error = localError || validationError;
    const showError = Boolean(error);

    const styles = StyleSheet.create({
        wrapper: {
            width: "100%",
        },

        label: {
            marginBottom: 6,
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        required: {
            color: theme.colors.error,
        },

        description: {
            marginBottom: 12,
            fontSize: theme.text.smallSize,
            color: theme.colors.text.text,
            opacity: 0.75,
        },

        dropzone: {
            minHeight: 120,
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: showError
                ? theme.colors.error
                : theme.colors.input.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.input.background,
            opacity: isDisabled ? 0.6 : 1,
        },

        uploadIcon: {
            marginBottom: 8,
        },

        buttonText: {
            fontSize: theme.text.baseSize,
            fontWeight: "600",
            color: theme.colors.primary,
            textAlign: "center",
        },

        hint: {
            marginTop: 5,
            fontSize: theme.text.smallSize,
            color: theme.colors.text.text,
            opacity: 0.7,
            textAlign: "center",
        },

        fileList: {
            gap: 8,
            marginTop: 12,
        },

        fileItem: {
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            borderWidth: 1,
            borderColor: theme.colors.input.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.input.background,
            gap: 10,
        },

        previewThumbnail: {
            width: 56,
            height: 56,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.input.border,
        },

        fileInfo: {
            flex: 1,
            minWidth: 0,
        },

        fileName: {
            fontSize: theme.text.baseSize,
            color: theme.colors.text.text,
        },

        fileSize: {
            marginTop: 3,
            fontSize: theme.text.smallSize,
            color: theme.colors.text.text,
            opacity: 0.7,
        },

        removeButton: {
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
        },

        error: {
            marginTop: 6,
            marginLeft: 4,
            fontSize: theme.text.smallSize,
            color: theme.colors.error,
        },

        previewModal: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },

        previewImage: {
            width: "100%",
            height: "75%",
        },

        previewClose: {
            position: "absolute",
            top: 48,
            right: 24,
            zIndex: 1,
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
        },

        previewName: {
            color: "#FFFFFF",
            fontSize: theme.text.baseSize,
            marginTop: 16,
            textAlign: "center",
        },
    });

    return (
        <View style={[styles.wrapper, style]}>
            {label ? (
                <Text style={styles.label}>
                    {label}
                    {required && (
                        <Text style={styles.required}> *</Text>
                    )}
                </Text>
            ) : null}

            {description ? (
                <Text style={styles.description}>
                    {description}
                </Text>
            ) : null}

            <Pressable
                onPress={pickFiles}
                disabled={isDisabled || isPicking}
                accessibilityRole="button"
                accessibilityState={{
                    disabled: isDisabled || isPicking,
                }}
                style={styles.dropzone}
                {...props}
            >
                <Upload
                    size={28}
                    color={theme.colors.primary}
                    style={styles.uploadIcon}
                />

                <Text style={styles.buttonText}>
                    {isPicking
                        ? "Seleccionando..."
                        : buttonLabel}
                </Text>

                <Text style={styles.hint}>
                    {multiple
                        ? `Puedes seleccionar varios archivos${
                            Number.isFinite(limit)
                                ? ` (máximo ${limit})`
                                : ""
                        }.`
                        : "Selecciona un archivo."}
                </Text>

                <Text style={styles.hint}>
                    Formatos: {getExtensionLabel()}
                </Text>

                {maxSizeMB != null && (
                    <Text style={styles.hint}>
                        Máximo por archivo: {maxSizeMB} MB
                    </Text>
                )}
            </Pressable>

            {normalizedFiles.length > 0 && (
                <View style={styles.fileList}>
                    {normalizedFiles.map((file, index) => {
                        const isImage =
                            file.mimeType?.startsWith("image/") ||
                            /\.(png|jpe?g|gif|webp|bmp|heic|heif)$/i.test(
                                file.name ?? ""
                            );

                        const Icon = getFileIcon(file);

                        return (
                            <View
                                key={`${file.uri}-${index}`}
                                style={styles.fileItem}
                            >
                                {isImage ? (
                                    <Pressable
                                        onPress={() => setPreviewFile(file)}
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            `Previsualizar ${file.name}`
                                        }
                                    >
                                        <Image
                                            source={{ uri: file.uri }}
                                            style={styles.previewThumbnail}
                                            resizeMode="cover"
                                            accessibilityLabel={file.name}
                                        />
                                    </Pressable>
                                ) : (
                                    <Icon
                                        size={28}
                                        color={theme.colors.primary}
                                    />
                                )}

                                <View style={styles.fileInfo}>
                                    <Text
                                        style={styles.fileName}
                                        numberOfLines={2}
                                    >
                                        {file.name || "Archivo"}
                                    </Text>

                                    <Text style={styles.fileSize}>
                                        {formatSize(file.size)}
                                    </Text>
                                </View>

                                {!isDisabled && (
                                    <Pressable
                                        onPress={() => removeFile(index)}
                                        style={styles.removeButton}
                                        accessibilityRole="button"
                                        accessibilityLabel={
                                            `Eliminar ${file.name || "archivo"}`
                                        }
                                        hitSlop={8}
                                    >
                                        <X
                                            size={20}
                                            color={theme.colors.error}
                                        />
                                    </Pressable>
                                )}
                            </View>
                        );
                    })}
                </View>
            )}

            {showError && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}

            <Modal
                visible={Boolean(previewFile)}
                transparent
                animationType="fade"
                statusBarTranslucent
                onRequestClose={() => setPreviewFile(null)}
            >
                <View style={styles.previewModal}>
                    <Pressable
                        style={styles.previewClose}
                        onPress={() => setPreviewFile(null)}
                        accessibilityRole="button"
                        accessibilityLabel="Cerrar vista previa"
                    >
                        <X size={24} color="#FFFFFF" />
                    </Pressable>

                    {previewFile && (
                        <>
                            <Image
                                source={{ uri: previewFile.uri }}
                                style={styles.previewImage}
                                resizeMode="contain"
                                accessibilityLabel={previewFile.name}
                            />

                            <Text style={styles.previewName}>
                                {previewFile.name}
                            </Text>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
}
