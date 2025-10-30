import categories from "../model/categories.js";
import Transaction from "../model/transactions.js";
import types from "../model/types.js";

/**
 * Generates a random whole number between min (inclusive) and max (inclusive).
 */
function getRandomInt(min = 1, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random date within the last 365 days, formatted as "DD-MM-YYYY".
 */
function getRandomDate() {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - getRandomInt(1, 365));
    return past;
}

const INCOME_CATEGORIES = [categories.SALARY, categories.BUSINESS, categories.OTHERS];
const EXPENSE_CATEGORIES = Object.values(categories).filter((cat) => !INCOME_CATEGORIES.includes(cat));

/**
 * Gets a random category string, favoring income for income types and vice-versa.
 */
function getRandomCategory(type) {
    if (type === types.INCOME) {
        return INCOME_CATEGORIES[Math.floor(Math.random() * INCOME_CATEGORIES.length)];
    } else {
        return EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)];
    }
}

/**
 * Creates a description based on the transaction category.
 */
function createDescription(category) {
    switch (category) {
        case categories.SALARY:
            return "Monthly salary direct deposit";
        case categories.BUSINESS:
            return "Client payment for services rendered";
        case categories.HOUSEHOLD:
            return "Monthly electricity and water bill";
        case categories.EMI:
            return "Auto loan monthly installment payment";
        case categories.GROCERIES:
            return "Weekly supermarket shopping";
        case categories.ENTERTAINMENT:
            return "Movie tickets and streaming subscription";
        case categories.SHOPPING:
            return "New clothes purchase online";
        case categories.TRAVEL:
            return "Fuel/Gasoline fill-up for car";
        case categories.FOOD:
            return "Lunch at local cafe";
        case categories.EDUCATION:
            return "Online course enrollment fee";
        case categories.MEDICAL:
            return "Pharmacy bill for prescription medicine";
        case categories.OTHERS:
            return "Miscellaneous income/Refund received";
        default:
            return "General transaction";
    }
}

/**
 * Creates transaction records.
 */
export default async function seedTransaction() {
    const transactions = [];
    for (let i = 0; i < 50; i++) {
        // Alternate between INCOME and EXPENSE for variety
        const transactionType = i % 3 === 0 ? types.INCOME : types.EXPENSE;
        const category = getRandomCategory(transactionType);

        let amount;
        // Set higher amounts for salary/business, lower for daily expenses
        if (category === categories.SALARY || category === categories.BUSINESS) {
            amount = getRandomInt(10000, 50000); // Larger income amounts
        } else if (category === categories.EMI || category === categories.HOUSEHOLD) {
            amount = getRandomInt(500, 15000); // Medium expense amounts
        } else {
            amount = getRandomInt(10, 2000); // Smaller daily expense amounts
        }

        transactions.push({
            type: transactionType,
            amount: amount,
            description: createDescription(category),
            category: category,
            date: getRandomDate(),
        });
    }

    await Transaction.insertMany(transactions);
    return transactions;
}
