import validator from "validator";
import ApiError from "./ApiError.js";
import types from "../model/types.js";
import categories from "../model/categories.js";

export function createTransactionValidator(data) {
    const { type, amount, description, category, date } = data;
    const errors = {};

    const addError = (filed, messsage) => {
        if (!errors[filed]) {
            errors[filed] = [];
        }
        errors[filed].push(messsage);
    };

    if (!type) {
        addError("type", "type is required");
    }
    if (!Object.values(types).includes(type)) {
        addError("type", "Invalid transaction");
    }
    if (!amount) {
        addError("amount", "Amount is required");
    }
    if (!validator.isNumeric(String(amount))) {
        addError("amount", "Amount must be a valid number");
    }
    if (!description) {
        addError("description", "Description is required");
    }
    if (!validator.isLength(description, { min: 2, max: 200 })) {
        addError("description", "Description must be between 2 and 200 characters long");
    }
    if (!category) {
        addError("category", "category is required");
    }
    if (!Object.values(categories).includes(category)) {
        addError("category", "Invalid category");
    }
    if (!date) {
        addError("date", "Date is required");
    }
    if (!validator.isDate(String(date))) {
        addError("date", "Invalid date format");
    }
    if (Object.keys(errors).length > 0) {
        throw new ApiError(400, "Validation failed", errors);
    }
}
