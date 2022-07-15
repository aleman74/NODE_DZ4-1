const path = require('path');
const fs = require('fs');


// Проверяем существование директории с данными
const FOLDER_NAME = 'DATA';

// Считываем входной параметер - название файла лога
// console.log(process.argv);
const file_name = process.argv[2];

// Путь к файлу с логом
const file_path = path.join(__dirname, FOLDER_NAME, file_name);

// Определяем значения параметров
let count = 0;   // общее количество партий
let win = 0;   // количество выигранных / проигранных партий
   // процентное соотношение выигранных партий

// Считываем файл с логом построчно
const rs = fs.createReadStream(file_path);

rs.setEncoding('UTF8')
.on('data', (row) => {
    if (row)
    {
        // Считывает по несколько строк, разбиваем на отдельные объекты
        arr = row.split('\n');

        for (let i = 0; i < arr.length; i++)
        {
            if (arr[i])
            {
                let v = JSON.parse(arr[i]);
                count ++;
                if (v.result)
                    win ++;
            }
        }
    }
})
.on('end', () => {
   console.log('общее количество партий - ' + count); 
   console.log('количество выигранных / проигранных партий - ' + win + '/' + (count - win)); 
   console.log('процентное соотношение выигранных партий - ' + (win * 100 / count)); 
});
