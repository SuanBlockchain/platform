/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FeatureTypeUpdateFormInputValues = {
    name?: string;
    description?: string;
};
export declare type FeatureTypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FeatureTypeUpdateFormOverridesProps = {
    FeatureTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FeatureTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: FeatureTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    featureType?: any;
    onSubmit?: (fields: FeatureTypeUpdateFormInputValues) => FeatureTypeUpdateFormInputValues;
    onSuccess?: (fields: FeatureTypeUpdateFormInputValues) => void;
    onError?: (fields: FeatureTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FeatureTypeUpdateFormInputValues) => FeatureTypeUpdateFormInputValues;
    onValidate?: FeatureTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FeatureTypeUpdateForm(props: FeatureTypeUpdateFormProps): React.ReactElement;
