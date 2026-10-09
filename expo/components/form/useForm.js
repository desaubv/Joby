
import { useCallback, useRef, useState } from "react";

export default function useForm({
    initialValues = {},
    onSubmit,
} = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validators = useRef(new Map());
    const valuesRef = useRef(initialValues);
    const onSubmitRef = useRef(onSubmit);

    onSubmitRef.current = onSubmit;

    const setValue = useCallback((name, value) => {
        valuesRef.current = {
            ...valuesRef.current,
            [name]: value,
        };

        setValues(valuesRef.current);

        if (submitted) {
            const validator = validators.current.get(name);
            const error = validator
                ? validator(value)
                : null;

            setErrors((previous) => {
                const next = { ...previous };

                if (error) {
                    next[name] = error;
                } else {
                    delete next[name];
                }

                return next;
            });
        }
    }, [submitted]);

    const registerField = useCallback((name, validate) => {
        validators.current.set(name, validate);

        return () => {
            // No eliminar una regla que haya sido reemplazada.
            if (validators.current.get(name) === validate) {
                validators.current.delete(name);
            }
        };
    }, []);

    const validate = useCallback(() => {
        const nextErrors = {};

        for (const [name, validator] of validators.current) {
            const error = validator(valuesRef.current[name]);

            if (error) {
                nextErrors[name] = error;
            }
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }, []);

    const submit = useCallback(async () => {
        setSubmitted(true);

        if (!validate()) {
            return false;
        }

        setIsSubmitting(true);

        try {
            await onSubmitRef.current?.({
                ...valuesRef.current,
            });

            return true;
        } finally {
            setIsSubmitting(false);
        }
    }, [validate]);

    const reset = useCallback((nextValues = initialValues) => {
        valuesRef.current = { ...nextValues };
        setValues(valuesRef.current);
        setErrors({});
        setSubmitted(false);
        setIsSubmitting(false);
    }, [initialValues]);

    return {
        values,
        errors,
        isSubmitting,
        isSubmitted: submitted,
        isValid: Object.keys(errors).length === 0,
        setValue,
        setValues,
        validate,
        submit,
        reset,
        registerField,
    };
}
