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
    } else if (!Object.values(types).includes(type)) {
        addError("type", "Invalid transaction");
    }
    if (!amount) {
        addError("amount", "Amount is required");
    } else if (!validator.isNumeric(String(amount))) {
        addError("amount", "Amount must be a valid number");
    }
    if (!description) {
        addError("description", "Description is required");
    } else if (!validator.isLength(description, { min: 2, max: 200 })) {
        addError("description", "Description must be between 2 and 200 characters long");
    }
    if (!category) {
        addError("category", "category is required");
    } else if (!Object.values(categories).includes(category)) {
        addError("category", "Invalid category");
    }
    if (!date) {
        addError("date", "Date is required");
    } else if (!validator.isDate(String(date))) {
        addError("date", "Invalid date format");
    } else if (new Date(date) > new Date()) {
        addError("date", "Date cannot be in the future");
    }

    if (Object.keys(errors).length > 0) {
        throw new ApiError(400, "Validation failed", errors);
    }
}

export function updateTransactionValidator(req) {
    const { id } = req.params;
    const { amount, description, category, date } = req.body;
    const errors = {};

    const addError = (field, message) => {
        if (!errors[field]) {
            errors[field] = [];
        }
        errors[field].push(message);
    };

    if (!id) {
        addError("id", "Transaction ID is required");
    } else if (!validator.isMongoId(String(id))) {
        addError("id", "Invalid Transaction ID format");
    }

    if (!amount) {
        addError("amount", "Amount is required");
    } else if (!validator.isNumeric(String(amount))) {
        addError("amount", "Amount must be a valid number");
    }

    if (!description) {
        addError("description", "Description is required");
    } else if (!validator.isLength(description, { min: 2, max: 200 })) {
        addError("description", "Description must be between 2 and 200 characters long");
    }

    if (!category) {
        addError("category", "Category is required");
    } else if (!Object.values(categories).includes(category)) {
        addError("category", "Invalid category");
    }

    if (!date) {
        addError("date", "Date is required");
    } else if (!validator.isDate(String(date))) {
        addError("date", "Invalid date format");
    } else if (new Date(date) > new Date()) {
        addError("date", "Date cannot be in the future");
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
