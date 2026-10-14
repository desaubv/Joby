
import React from "react";
import { View } from "react-native";
import { FormContext } from "./FormContext.js";

export default function Form({
    children,
    form,
    style,
    ...props
}) {
    if (!form) {
        throw new Error(
            "Debes proporcionar la instancia creada con useForm()."
        );
    }

    return (
        <FormContext.Provider value={form}>
            <View style={style} {...props}>
                {children}
            </View>
        </FormContext.Provider>
    );
}
