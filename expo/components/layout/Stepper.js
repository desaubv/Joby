
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import {
    View,
    Animated,
    StyleSheet,
} from "react-native";

import { useTheme } from "../../theme/useTheme";

import Button from "../Button";
import Text from "../Text/Text";

const Step = () => null;

const Stepper = forwardRef(({
    children,
    initialStep = 0,
    showNavigation = true,
    onStepChange,
    style,
}, ref) => {
    const { theme } = useTheme();

    const steps = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child)
    );

    const totalSteps = steps.length;

    const [currentStep, setCurrentStep] = useState(
        Math.min(
            Math.max(initialStep, 0),
            Math.max(totalSteps - 1, 0)
        )
    );

    const [isChecking, setIsChecking] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [lineWidths, setLineWidths] = useState([]);

    // Animación de las líneas de progreso.
    const lineProgress = useRef([]);

    while (lineProgress.current.length < Math.max(totalSteps - 1, 0)) {
        lineProgress.current.push(new Animated.Value(0));
    }

    // Animación del contenido.
    const contentOpacity = useRef(new Animated.Value(1)).current;
    const contentTranslateX = useRef(new Animated.Value(0)).current;
    const previousStep = useRef(currentStep);

    useEffect(() => {
        if (previousStep.current === currentStep) return;

        const direction = currentStep > previousStep.current ? 1 : -1;
        previousStep.current = currentStep;

        contentOpacity.setValue(0);
        contentTranslateX.setValue(direction * 20);

        Animated.parallel([
            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 220,
                useNativeDriver: true,
            }),
            Animated.timing(contentTranslateX, {
                toValue: 0,
                duration: 220,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentStep, contentOpacity, contentTranslateX]);

    useEffect(() => {
        const animations = lineProgress.current.map((progress, index) =>
            Animated.timing(progress, {
                toValue: currentStep > index ? 1 : 0,
                duration: 350,
                useNativeDriver: false,
            })
        );

        Animated.parallel(animations).start();
    }, [currentStep, totalSteps]);

    const currentStepElement = steps[currentStep];
    const currentStepProps = currentStepElement?.props ?? {};

    const changeStep = (step) => {
        if (
            step < 0 ||
            step >= totalSteps ||
            step === currentStep
        ) {
            return false;
        }

        setCurrentStep(step);
        setValidationMessage("");
        onStepChange?.(step);

        return true;
    };

    // Avanza únicamente si la validación lo permite.
    const next = async () => {
        if (currentStep >= totalSteps - 1 || isChecking) {
            return false;
        }

        const { check } = currentStepProps;

        setValidationMessage("");

        if (typeof check === "function") {
            setIsChecking(true);

            try {
                const result = await check();

                if (result !== true) {
                    setValidationMessage(
                        typeof result === "string"
                            ? result
                            : "Revisa los datos de este paso antes de continuar."
                    );

                    return false;
                }
            } catch (error) {
                setValidationMessage(
                    error instanceof Error && error.message
                        ? error.message
                        : "No se pudo validar este paso."
                );

                return false;
            } finally {
                setIsChecking(false);
            }
        } else if (check === false) {
            setValidationMessage(
                "Revisa los datos de este paso antes de continuar."
            );

            return false;
        }

        return changeStep(currentStep + 1);
    };

    // Retrocede sin validar.
    const previous = () => {
        if (isChecking || currentStep <= 0) {
            return false;
        }

        return changeStep(currentStep - 1);
    };

    // Métodos públicos accesibles desde el componente padre.
    useImperativeHandle(ref, () => ({
        next,
        prev: previous,

        getCurrentStep: () => currentStep,

        goTo: (step) => {
            if (isChecking) return false;
            return changeStep(step);
        },
    }));

    const styles = StyleSheet.create({
        container: {
            width: "100%",
        },
        stepsContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
        },
        step: {
            flex: 1,
            minWidth: 0,
            alignItems: "center",
        },
        stepHeader: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
        },
        line: {
            flex: 1,
            height: 2,
            backgroundColor: theme.colors.border,
            overflow: "hidden",
            position: "relative",
        },
        lineFill: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary,
        },
        lineHidden: {
            opacity: 0,
        },
        indicator: {
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: theme.colors.text.ghost,
        },
        indicatorActive: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        number: {
            color: theme.colors.text.ghost,
            fontSize: theme.text.baseSize,
            fontWeight: "600",
        },
        numberActive: {
            color: theme.colors.text.button,
        },
        label: {
            marginTop: theme.spacing.sm,
            color: theme.colors.text.secondary,
            fontSize: theme.text.baseSize,
            textAlign: "center",
        },
        labelActive: {
            color: theme.colors.primary,
            fontWeight: "600",
        },
        content: {
            marginTop: theme.spacing.lg,
        },
        navigation: {
            marginTop: theme.spacing.lg,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        navigationButton: {
            width: "45%",
        },
        validationMessage: {
            marginTop: theme.spacing.sm,
            color: theme.colors.text?.error ?? "#B42318",
            fontSize: theme.text.baseSize,
        },
    });

    if (totalSteps === 0) return null;

    const { component } = currentStepProps;

    return (
        <View style={[styles.container, style]}>
            <View style={styles.stepsContainer}>
                {steps.map((step, index) => {
                    const { label, icon: Icon } = step.props;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <View
                            key={step.key ?? index}
                            style={styles.step}
                        >
                            <View style={styles.stepHeader}>
                                <View
                                    style={[
                                        styles.line,
                                        index === 0 && styles.lineHidden,
                                    ]}
                                    onLayout={(event) => {
                                        if (index === 0) return;

                                        const width =
                                            event.nativeEvent.layout.width;

                                        setLineWidths((previous) => {
                                            if (
                                                previous[index - 1] === width
                                            ) {
                                                return previous;
                                            }

                                            const nextWidths = [...previous];
                                            nextWidths[index - 1] = width;

                                            return nextWidths;
                                        });
                                    }}
                                >
                                    {index > 0 && (
                                        <Animated.View
                                            style={[
                                                styles.lineFill,
                                                {
                                                    width: lineProgress.current[
                                                        index - 1
                                                    ].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [
                                                            0,
                                                            lineWidths[index - 1] ?? 0,
                                                        ],
                                                    }),
                                                },
                                            ]}
                                        />
                                    )}
                                </View>

                                <View
                                    style={[
                                        styles.indicator,
                                        (isActive || isCompleted) &&
                                            styles.indicatorActive,
                                    ]}
                                >
                                    {Icon ? (
                                        <Icon
                                            size={18}
                                            strokeWidth={2}
                                            color={
                                                isActive || isCompleted
                                                    ? theme.colors.text.button
                                                    : theme.colors.text.secondary
                                            }
                                        />
                                    ) : (
                                        <Text
                                            style={[
                                                styles.number,
                                                (isActive || isCompleted) &&
                                                    styles.numberActive,
                                            ]}
                                        >
                                            {index + 1}
                                        </Text>
                                    )}
                                </View>

                                <View
                                    style={[
                                        styles.line,
                                        index === totalSteps - 1 &&
                                            styles.lineHidden,
                                    ]}
                                    onLayout={(event) => {
                                        if (index >= totalSteps - 1) return;

                                        const width =
                                            event.nativeEvent.layout.width;

                                        setLineWidths((previous) => {
                                            if (previous[index] === width) {
                                                return previous;
                                            }

                                            const nextWidths = [...previous];
                                            nextWidths[index] = width;

                                            return nextWidths;
                                        });
                                    }}
                                >
                                    {index < totalSteps - 1 && (
                                        <Animated.View
                                            style={[
                                                styles.lineFill,
                                                {
                                                    width: lineProgress.current[
                                                        index
                                                    ].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [
                                                            0,
                                                            lineWidths[index] ?? 0,
                                                        ],
                                                    }),
                                                },
                                            ]}
                                        />
                                    )}
                                </View>
                            </View>

                            {label ? (
                                <Text
                                    style={[
                                        styles.label,
                                        isActive && styles.labelActive,
                                    ]}
                                >
                                    {label}
                                </Text>
                            ) : null}
                        </View>
                    );
                })}
            </View>

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: contentOpacity,
                        transform: [
                            { translateX: contentTranslateX },
                        ],
                    },
                ]}
            >
                {component}

                {validationMessage ? (
                    <Text
                        accessibilityRole="alert"
                        style={styles.validationMessage}
                    >
                        {validationMessage}
                    </Text>
                ) : null}
            </Animated.View>

            {showNavigation && (
                <View style={styles.navigation}>
                    <Button
                        onPress={previous}
                        disabled={currentStep === 0 || isChecking}
                        style={{
                            ...styles.navigationButton,
                            opacity:
                                currentStep === 0 || isChecking ? 0 : 1,
                        }}
                        variant="secondary"
                    >
                        Anterior
                    </Button>

                    <Button
                        onPress={next}
                        disabled={
                            currentStep === totalSteps - 1 || isChecking
                        }
                        style={styles.navigationButton}
                    >
                        {isChecking ? "Validando..." : "Siguiente"}
                    </Button>
                </View>
            )}
        </View>
    );
});

const StepItem = Stepper.Step = ({
    component,
}) => component ?? null;

export default Stepper;
