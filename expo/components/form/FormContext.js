
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";

export const FormContext = createContext(null);

export function useFormContext() {
    const form = useContext(FormContext);

    if (!form) {
        throw new Error(
            "Este componente debe utilizarse dentro de un Form."
        );
    }

    return form;
}

export function useFormField({
    name,
    required = false,
    regex,
    warning = "El formato no es válido.",
    requiredMessage = "Este campo es obligatorio.",
}) {
    const form = useContext(FormContext);

    const validator = useMemo(() => (value) => {
        const empty =
            value == null ||
            (typeof value === "string" && value.trim() === "");

        if (required && empty) return requiredMessage;
        if (empty) return null;

        if (regex) {
            regex.lastIndex = 0;
            const valid = regex.test(String(value));
            regex.lastIndex = 0;

            if (!valid) return warning;
        }

        return null;
    }, [required, requiredMessage, regex, warning]);

    useEffect(() => {
        if (!form || !name) return;
        return form.registerField(name, validator);
    }, [form?.registerField, name, validator]);

    if (!form || !name) {
        return {
            value: undefined,
            onChangeText: undefined,
            error: undefined,
        };
    }

    return {
        value: form.values[name] ?? "",
        onChangeText: (nextValue) => form.setValue(name, nextValue),
        error: form.errors[name],
    };
}