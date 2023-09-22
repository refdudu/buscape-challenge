export interface Validator<T> {
    validate(object: T): string[];
}
