"use strict";

// Задача 1. Решение квадратного уравнения ax² + bx + c = 0
// Возвращает массив корней: [] (нет корней), [x] (один корень), [x1, x2] (два корня)
function solveEquation(a, b, c) {
    const discriminant = b ** 2 - 4 * a * c;

    if (discriminant < 0) {
        return [];
    }

    if (discriminant === 0) {
        // "+ 0" превращает возможный -0 в обычный 0
        return [-b / (2 * a) + 0];
    }

    const discriminantSqrt = Math.sqrt(discriminant);
    const firstRoot = (-b + discriminantSqrt) / (2 * a) + 0;
    const secondRoot = (-b - discriminantSqrt) / (2 * a) + 0;

    return [firstRoot, secondRoot];
}

// Задача 2. Общая сумма выплат по ипотеке
// percent — годовая ставка в процентах (от 0 до 100)
// contribution — первоначальный взнос
// amount — сумма кредита
// countMonths — срок в месяцах
// Возвращает число: сумму ежемесячных платежей, округлённую до 2 знаков
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    // Годовая ставка в процентах -> месячная ставка в диапазоне от 0 до 1
    const monthlyRate = percent / 100 / 12;

    // Тело кредита: сколько нужно вернуть банку
    const loanBody = amount - contribution;

    // Ежемесячный платёж
    const monthlyPayment =
        loanBody *
        (monthlyRate + monthlyRate / ((1 + monthlyRate) ** countMonths - 1));

    // Общая сумма за весь срок
    const totalAmount = monthlyPayment * countMonths;

    // toFixed возвращает строку, поэтому превращаем её обратно в число
    return Number(totalAmount.toFixed(2));
}