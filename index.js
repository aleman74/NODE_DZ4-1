const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

// Проверяем существование директории с данными
const FOLDER_NAME = 'DATA';
const folder_path = path.join(__dirname, FOLDER_NAME);

fs.stat(folder_path, (err, stats) => {
    if (err)
        fs.mkdir(folder_path, (err2) => {
            if (err2)
                console.log("Ошибка при попытке создать директорию!\n" + err2);
        });
});


// Считываем входной параметер - название файла лога
// console.log(process.argv);
const file_name = process.argv[2];

// Путь к файлу с логом
const file_path = path.join(__dirname, FOLDER_NAME, file_name);

// Загадываем число
let date = new Date();
let milli = date.getMilliseconds();

const NUM = (milli % 2 == 0) ? 2 : 1;

// Выводим приветствие
const text = 'Добро пожаловать в игру "Орел или решка"\nВаш выбор (1 - орёл 2 - решка): ';
rl.question(text, (answer) => {

    let ans = +answer;    // Приводим к числу

    let res = {
        date: date,
        result: (NUM == answer),
        answer: answer
    };

    if (NUM == answer)
        console.log("Вы угадали!");
    else
        console.log("К сожалению Вы ошиблись ...");
  
    // Сохраняем результат в файл
    fs.appendFile(file_path, JSON.stringify(res) + '\n', (err) => {
        if (err)
            console.log('Ошибка при записи в файл: ' + err);
    });

    rl.close();
  });
  