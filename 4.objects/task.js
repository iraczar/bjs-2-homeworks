// Функция-конструктор студента
function Student(name, gender, age) {
	this.name = name;
	this.gender = gender;
	this.age = age;
	// Пока оценок нет, они добавятся позже методом addMarks
	this.marks = [];
}

// Устанавливает студенту предмет
Student.prototype.setSubject = function(subjectName) {
	this.subject = subjectName;
};

// Добавляет сразу несколько оценок (rest-параметр собирает их в массив)
Student.prototype.addMarks = function(...marksToAdd) {
	// У отчисленного студента массива marks нет, добавлять некуда
	if (this.marks === undefined) {
		return;
	}
	this.marks.push(...marksToAdd);
};

// Возвращает среднее арифметическое оценок
Student.prototype.getAverage = function() {
	// Если marks нет (студент отчислен) или он пустой, возвращаем 0
	if (this.marks === undefined || this.marks.length === 0) {
		return 0;
	}
	const sumOfMarks = this.marks.reduce(function(sum, mark) {
		return sum + mark;
	}, 0);
	return sumOfMarks / this.marks.length;
};

// Отчисляет студента: удаляет предмет и оценки, записывает причину
Student.prototype.exclude = function(reason) {
	delete this.subject;
	delete this.marks;
	this.excluded = reason;
};