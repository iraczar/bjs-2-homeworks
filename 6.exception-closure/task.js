"use strict";

// ===== Задача 1. Форматтер чисел =====

// Превращает значение в число или выбрасывает ошибку, если это не число
function parseCount(value) {
	const parsedValue = Number.parseFloat(value);

	if (Number.isNaN(parsedValue)) {
		throw new Error("Невалидное значение");
	}

	return parsedValue;
}

// Не выбрасывает ошибку наружу: возвращает либо число, либо объект ошибки
function validateCount(value) {
	try {
		return parseCount(value);
	} catch (error) {
		return error;
	}
}

// ===== Задача 2. Треугольник =====

class Triangle {
	constructor(sideA, sideB, sideC) {
		// Правило существования: сумма любых двух сторон не меньше третьей
		if (
			sideA + sideB < sideC ||
			sideA + sideC < sideB ||
			sideB + sideC < sideA
		) {
			throw new Error("Треугольник с такими сторонами не существует");
		}

		this.sideA = sideA;
		this.sideB = sideB;
		this.sideC = sideC;
	}

	// Периметр = сумма трёх сторон
	get perimeter() {
		return this.sideA + this.sideB + this.sideC;
	}

	// Формула Герона: p = периметр / 2, площадь = корень из p*(p-a)*(p-b)*(p-c)
	get area() {
		const halfPerimeter = this.perimeter / 2;
		const areaValue = Math.sqrt(
			halfPerimeter *
			(halfPerimeter - this.sideA) *
			(halfPerimeter - this.sideB) *
			(halfPerimeter - this.sideC)
		);

		// Округляем до 3 знаков и возвращаем число
		return Number(areaValue.toFixed(3));
	}
}

// Возвращает треугольник или «заглушку» с сообщением об ошибке
function getTriangle(sideA, sideB, sideC) {
	try {
		return new Triangle(sideA, sideB, sideC);
	} catch (error) {
		return {
			get area() {
				return "Ошибка! Треугольник не существует";
			},
			get perimeter() {
				return "Ошибка! Треугольник не существует";
			},
		};
	}
}