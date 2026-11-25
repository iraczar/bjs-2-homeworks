// ===================== ЗАДАЧА 1. ПЕЧАТНОЕ ИЗДАНИЕ =====================

class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this.state = 100; // запись идёт через сеттер ниже
		this.type = null;
	}

	// Починка: состояние увеличивается в полтора раза (предел 100 держит сеттер)
	fix() {
		this.state = this.state * 1.5;
	}

	// Сеттер: состояние всегда в диапазоне от 0 до 100
	set state(newState) {
		if (newState < 0) {
			this._state = 0;
		} else if (newState > 100) {
			this._state = 100;
		} else {
			this._state = newState;
		}
	}

	// Геттер: чтение состояния
	get state() {
		return this._state;
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}
}

// ===================== ЗАДАЧА 2. БИБЛИОТЕКА =====================

class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	// Добавляем издание, только если его состояние больше 30
	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	// Поиск по любому свойству: type — имя свойства, value — искомое значение
	findBookBy(type, value) {
		const foundBook = this.books.find((book) => book[type] === value);
		return foundBook === undefined ? null : foundBook;
	}

	// Выдача: удаляем книгу из хранилища и возвращаем её
	giveBookByName(bookName) {
		const bookIndex = this.books.findIndex((book) => book.name === bookName);
		if (bookIndex === -1) {
			return null;
		}
		const givenBook = this.books.splice(bookIndex, 1)[0];
		return givenBook;
	}
}

// ===================== ЗАДАЧА 3*. ЖУРНАЛ УСПЕВАЕМОСТИ =====================
// marks хранится как объект: ключ — название предмета, значение — массив оценок
// Пример: { "химия": [5, 5], "физика": [5, 4] }

class Student {
	constructor(name) {
		this.name = name;
		this.marks = {};
	}

	addMark(mark, subject) {
		// Оценка должна быть числом от 2 до 5 (NaN проверяем отдельно)
		if (typeof mark !== "number" || Number.isNaN(mark) || mark < 2 || mark > 5) {
			return;
		}
		// Нового предмета ещё нет — создаём для него пустой массив
		if (!Object.keys(this.marks).includes(subject)) {
			this.marks[subject] = [];
		}
		this.marks[subject].push(mark);
	}

	getAverageBySubject(subject) {
		if (!Object.keys(this.marks).includes(subject)) {
			return 0;
		}
		const sumOfMarks = this.marks[subject].reduce(
			(sum, mark) => sum + mark,
			0
		);
		return sumOfMarks / this.marks[subject].length;
	}

	getAverage() {
		const subjects = Object.keys(this.marks);
		if (subjects.length === 0) {
			return 0; // защита от деления на ноль
		}
		const sumOfAverages = subjects.reduce(
			(sum, subject) => sum + this.getAverageBySubject(subject),
			0
		);
		return sumOfAverages / subjects.length;
	}
}

// ===================== ПРОВЕРКА В КОНСОЛИ (можно удалить перед сдачей) =====================

// --- Примеры задачи 1 ---
const sherlock = new PrintEditionItem(
	"Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
	2019,
	1008
);
console.log(sherlock.releaseDate); // 2019
console.log(sherlock.state); // 100
sherlock.fix();
console.log(sherlock.state); // 100

const picknick = new FantasticBook(
	"Аркадий и Борис Стругацкие",
	"Пикник на обочине",
	1972,
	168
);
console.log(picknick.author); // Аркадий и Борис Стругацкие
picknick.state = 10;
console.log(picknick.state); // 10
picknick.fix();
console.log(picknick.state); // 15

// --- Тестовый сценарий задачи 2 ---
const library = new Library("Библиотека имени Ленина");

library.addBook(
	new DetectiveBook(
		"Артур Конан Дойл",
		"Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
		2019,
		1008
	)
);
library.addBook(
	new FantasticBook(
		"Аркадий и Борис Стругацкие",
		"Пикник на обочине",
		1972,
		168
	)
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));
library.addBook(new NovelBook("Герман Гессе", "Демиан", 1919, 176)); // книга 1919 года

console.log(library.findBookBy("name", "Властелин колец")); // null
console.log(library.findBookBy("releaseDate", 1924).name); // Мурзилка
console.log("Книг в библиотеке: " + library.books.length); // 5

const book1919 = library.findBookBy("releaseDate", 1919);
console.log("Книга 1919 года: " + book1919.name); // Демиан

const givenBook = library.giveBookByName("Машина времени");
console.log("Выдана книга: " + givenBook.name); // Машина времени
console.log("Книг после выдачи: " + library.books.length); // 4

givenBook.state = 25; // книгу повредили
console.log("Состояние после повреждения: " + givenBook.state); // 25
givenBook.fix(); // книгу подклеили
console.log("Состояние после починки: " + givenBook.state); // 37.5

library.addBook(givenBook); // 37.5 > 30, книга вернётся
console.log("Книг после возврата: " + library.books.length); // 5

// Граничный случай: после починки ровно 30, книга НЕ вернётся
const magazine = library.giveBookByName("Мурзилка");
magazine.state = 20;
magazine.fix(); // 20 * 1.5 = 30
console.log("Состояние журнала: " + magazine.state); // 30
library.addBook(magazine);
console.log("Книг после попытки вернуть журнал: " + library.books.length); // 4

// --- Пример задачи 3* ---
const student = new Student("Олег Никифоров");
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика"); // не добавится, больше 5
console.log(student.getAverageBySubject("физика")); // 4.5
console.log(student.getAverageBySubject("биология")); // 0
console.log(student.getAverage()); // 4.75