
import { ValidationError as ValidationErrorType } from 'class-validator';

export class ValidationError {
    private errors: ValidationErrorType[];
    public message = 'Validation failed!';
    public code = 400;

    constructor(errors: ValidationErrorType[], message?: string, code?: number) {
        this.errors = errors;

        if (message) {
            this.message = message;
        }

        if (code) {
            this.code = code;
        }
    }

    public getError() {
        return {
            errors: this.errors.map((item) => ({
                key: item.property,
                errors: item.constraints
            })),
            message: this.message
        };
    }
}