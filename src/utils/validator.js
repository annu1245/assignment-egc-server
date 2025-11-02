import validator from "validator";
import ApiError from "./ApiError.js";
import types from "../model/types.js";
import categories from "../model/categories.js";

export function createTransactionValidator(data) {
    const { type, amount, description, category, date } = data;
    const errors = {};

    if (!type) {
        errors.type = "type is required"
    } else if (!Object.values(types).includes(type)) {
        errors.type = "Invalid transaction"
    }
    if (!amount) {
        errors.amount = "Amount is required";
    } else if (!validator.isNumeric(String(amount))) {
        errors.amount = "Amount must be a valid number";
    }
    if (!description) {
        errors.description = "Description is required";
    } else if (!validator.isLength(description, { min: 2, max: 200 })) {
        errors.description = "Description must be between 2 and 200 characters long";
    }
    if (!category) {
        errors.category = "category is required";
    } else if (!Object.values(categories).includes(category)) {
        errors.category = "Invalid category";
    }
    if (!date) {
        errors.date = "Date is required";
    } else if (!validator.isDate(String(date))) {
        errors.date = "Invalid date format";
    } else if (new Date(date) > new Date()) {
        errors.date = "Date cannot be in the future";
    }

    if (Object.keys(errors).length > 0) {
        throw new ApiError(400, "Validation failed", errors);
    }
}

export function updateTransactionValidator(req) {
    const { id } = req.params;
    const { amount, description, category, date } = req.body;
    const errors = {};

    if (!id) {
        errors.id = "Transaction ID is required";
    } else if (!validator.isMongoId(String(id))) {
        errors.id = "Invalid Transaction ID format";
    }

    if (!amount) {
        errors.amount = "Amount is required";
    } else if (!validator.isNumeric(String(amount))) {
        errors.amount = "Amount must be a valid number";
    }

    if (!description) {
        errors.description = "Description is required";
    } else if (!validator.isLength(description, { min: 2, max: 200 })) {
        errors.description = "Description must be between 2 and 200 characters long";
    }

    if (!category) {
        errors.category = "Category is required";
    } else if (!Object.values(categories).includes(category)) {
        errors.category = "Invalid category";
    }

    if (!date) {
        errors.date = "Date is required";
    } else if (!validator.isDate(String(date))) {
        errors.date = "Invalid date format";
    } else if (new Date(date) > new Date()) {
        errors.date = "Date cannot be in the future";
    }

    if (Object.keys(errors).length > 0) {
        throw new ApiError(400, "Validation failed", errors);
    }
}

export function transactionIdValidator(id) {
    if (!id) {
        throw new ApiError(400, "Transaction ID is required");
    } else if (!validator.isMongoId(String(id))) {
        throw new ApiError(400, "Invalid Transaction ID format");
    }
}
