import React, {
    createContext,
    useContext,
    useState
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { useTheme } from "../../theme/useTheme";

const StepperContext = createContext(null);

const Step = ({
    label,
    icon,
    component
}) => {

    return null;
};


const Stepper = ({
    children,
    initialStep = 0,
    showNavigation = true,
    onStepChange,
    style
}) => {

    const { theme } = useTheme();

    const [currentStep, setCurrentStep] =
        useState(initialStep);


    const steps = React.Children.toArray(children);

    const totalSteps = steps.length;


    const goToStep = (step) => {

        if (
            step < 0 ||
            step >= totalSteps
        ) {
            return;
        }

        setCurrentStep(step);

        if (onStepChange) {
            onStepChange(step);
        }
    };


    const next = () => {
        goToStep(currentStep + 1);
    };


    const previous = () => {
        goToStep(currentStep - 1);
    };


    const styles = StyleSheet.create({

        container: {
            width: "100%"
        },

        stepsContainer: {
            width: "100%",

            flexDirection: "row",
            alignItems: "flex-start"
        },

        step: {
            flex: 1,
            alignItems: "center"
        },

        stepHeader: {
            width: "100%",

            flexDirection: "row",
            alignItems: "center"
        },

        line: {
            flex: 1,
            height: 2,

            backgroundColor:
                theme.colors.border
        },

        lineActive: {
            backgroundColor:
                theme.colors.primary
        },

        indicator: {
            width: 36,
            height: 36,

            borderRadius: 18,

            alignItems: "center",
            justifyContent: "center",

            backgroundColor:
                theme.colors.surface,

            borderWidth: 2,
            borderColor:
                theme.colors.border
        },

        indicatorActive: {
            backgroundColor:
                theme.colors.primary,

            borderColor:
                theme.colors.primary
        },

        number: {
            color:
                theme.colors.text.secondary,

            fontSize:
                theme.text.baseSize,

            fontWeight: "600"
        },

        numberActive: {
            color:
                theme.colors.text.button
        },

        label: {
            marginTop:
                theme.spacing.sm,

            color:
                theme.colors.text.secondary,

            fontSize:
                theme.text.baseSize,

            textAlign: "center"
        },

        labelActive: {
            color:
                theme.colors.primary,

            fontWeight: "600"
        },

        content: {
            marginTop:
                theme.spacing.lg
        },

        navigation: {
            marginTop:
                theme.spacing.lg,

            flexDirection: "row",
            justifyContent: "space-between"
        },

        navigationButton: {
            minHeight: 44,

            paddingHorizontal:
                theme.spacing.md,

            alignItems: "center",
            justifyContent: "center"
        },

        navigationText: {
            color:
                theme.colors.primary,

            fontSize:
                theme.text.baseSize,

            fontWeight: "600"
        },

        disabledText: {
            color:
                theme.colors.text.disabled
        }

    });


    if (totalSteps === 0) {
        return null;
    }


    const currentStepElement =
        steps[currentStep];

    const {
        label,
        icon: IconComponent,
        component
    } = currentStepElement.props;


    return (
        <StepperContext.Provider
            value={{
                currentStep,
                totalSteps,
                next,
                previous,
                goToStep
            }}
        >

            <View
                style={[
                    styles.container,
                    style
                ]}
            >

                <View
                    style={styles.stepsContainer}
                >

                    {steps.map((step, index) => {

                        const {
                            label,
                            icon: Icon
                        } = step.props;

                        const isActive =
                            index === currentStep;

                        const isCompleted =
                            index < currentStep;


                        return (
                            <View
                                key={index}
                                style={styles.step}
                            >

                                <View
                                    style={
                                        styles.stepHeader
                                    }
                                >

                                    {index > 0 && (
                                        <View
                                            style={[
                                                styles.line,
                                                isCompleted &&
                                                styles.lineActive
                                            ]}
                                        />
                                    )}


                                    <TouchableOpacity
                                        onPress={() =>
                                            goToStep(index)
                                        }
                                        activeOpacity={0.7}
                                    >

                                        <View
                                            style={[
                                                styles.indicator,
                                                (
                                                    isActive ||
                                                    isCompleted
                                                ) &&
                                                styles.indicatorActive
                                            ]}
                                        >

                                            {Icon ? (

                                                <Icon
                                                    size={18}
                                                    strokeWidth={2}
                                                    color={
                                                        isActive ||
                                                        isCompleted
                                                            ? theme.colors.text.button
                                                            : theme.colors.text.secondary
                                                    }
                                                />

                                            ) : (

                                                <Text
                                                    style={[
                                                        styles.number,
                                                        (
                                                            isActive ||
                                                            isCompleted
                                                        ) &&
                                                        styles.numberActive
                                                    ]}
                                                >
                                                    {index + 1}
                                                </Text>

                                            )}

                                        </View>

                                    </TouchableOpacity>


                                    {index <
                                        totalSteps - 1 && (
                                        <View
                                            style={[
                                                styles.line,
                                                isCompleted &&
                                                styles.lineActive
                                            ]}
                                        />
                                    )}

                                </View>


                                {label && (
                                    <Text
                                        style={[
                                            styles.label,
                                            isActive &&
                                            styles.labelActive
                                        ]}
                                    >
                                        {label}
                                    </Text>
                                )}

                            </View>
                        );

                    })}

                </View>


                <View
                    style={styles.content}
                >
                    {component}
                </View>


                {showNavigation && (
                    <View
                        style={styles.navigation}
                    >

                        <TouchableOpacity
                            onPress={previous}
                            disabled={
                                currentStep === 0
                            }
                            activeOpacity={0.7}
                            style={
                                styles.navigationButton
                            }
                        >

                            <Text
                                style={[
                                    styles.navigationText,
                                    currentStep === 0 &&
                                    styles.disabledText
                                ]}
                            >
                                Anterior
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={next}
                            disabled={
                                currentStep ===
                                totalSteps - 1
                            }
                            activeOpacity={0.7}
                            style={
                                styles.navigationButton
                            }
                        >

                            <Text
                                style={[
                                    styles.navigationText,
                                    currentStep ===
                                    totalSteps - 1 &&
                                    styles.disabledText
                                ]}
                            >
                                Siguiente
                            </Text>

                        </TouchableOpacity>

                    </View>
                )}

            </View>

        </StepperContext.Provider>
    );
};


Stepper.Step = Step;


export default Stepper;