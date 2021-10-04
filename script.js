var alphabetMatrix = [
    ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],
    ['ф','ы','в','а','п','р','о','л','д','ж','э'],
    ['я','ч','с','м','и','т','ь','б','ю']
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function replaceCharInQwerty(char)
{
    var direction, isUpper = /[А-ЯЁ]/.test(char);
    if (isUpper) char = char.toLowerCase()
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < alphabetMatrix[i].length; j++)
        {
            if (alphabetMatrix[i][j] == char)
            {
                direction = getRandomInt(9);
                switch (direction)
                {
                    case 0:
                    case 1:
                        if (i > 0) i--;
                        if (j > 0) j--;
                        break;
                    case 2:
                        if (i > 0) i--;
                        break;
                    case 3:
                        if (i > 0) i--;
                        if (j < (alphabetMatrix[i].length - 1)) j++;
                        break;
                    case 4:
                        if (j > 0) j--;
                        break;
                    case 5: break;
                    case 6:
                        if (j < (alphabetMatrix[i].length - 1)) j++;
                        break;
                    case 7:
                        if (i < 2) i++;
                        if (j > 0) j--;
                        break;
                    case 8:
                        if (i < 2) i++;
                        break;
                    case 9:
                        if (i < 2) i++;
                        if (j < (alphabetMatrix[i].length - 1)) j++;
                        break;
                }
                return isUpper
                    ? alphabetMatrix[i][j].toUpperCase()
                    : alphabetMatrix[i][j];
            }
        }
    }
}

function transformWord(word)
{
    isRussianWord = /^[а-яА-ЯЁё]+$/.test(word);
    if (word.length >= 3 && isRussianWord) {
        chance = getRandomInt(10);
        console.log(word, chance)
        if (chance < 2) {
            // подменяем букву любую на соседнюю
            charI = getRandomInt(word.length - 1)
            newChar = replaceCharInQwerty(word[charI])
            console.log('Заменяем ' + charI + '(' + word[charI] + ') на ' + newChar)
            newWord = word.replace(word[charI], newChar)
        } else if (chance < 5) {
            // Последние слог переносим в центр слова
            var lastSyllable = word.slice(-2), middle = Math.floor(word.length / 2)
            console.log('Переносим ' + lastSyllable + ' в ' + middle);
            newWord = word.slice(0, middle) + lastSyllable + word.slice(middle, -2)
            console.log(newWord)
        } else if (chance < 7 && word.length >= 4) {
            // Обмен местами букв 3 и 4
            console.log('Переносим букву ' + word.slice(3, 4) + ' на 3');
            newWord = word.slice(0, 2) + word.slice(3, 4) + word.slice(2, 3) + word.slice(4);
        } else if (chance < 8 && word.length >= 6) {
            // Обмен местами слогов на позициях 3,4 и 5,6
            console.log('Переносим слог ' + word.slice(4, 6) + ' на 3-4 позицию');
            newWord = word.slice(0, 2) + word.slice(4, 6) + word.slice(2, 4) + word.slice(6);
        } else {
            newWord = word
        }
        return newWord;
    } else {
        return word;
    }
}

const ProcessKey = function(e) {
    console.log([' '].indexOf(e.data))
    console.log(e.data)
    if (e.inputType == 'insertText' && e.data != null && [' '].indexOf(e.data) >= 0) {
        var words = e.srcElement.value.replace(/\s+$/,'').split(" ")
        console.log(words)
        var newWords = words.slice(0, -1)
        newWords.push(transformWord(words.slice(-1)[0]))
        //newWords.push(words.slice(-2, -2))
        e.srcElement.value = newWords.join(' ') + ' '
    }
}

function transformText()
{
    var text = document.getElementById('text').value;
    var newText = '', isRussianWord, chance, charI, newWord, newChar
    for (var word of text.trim().split(/[\s]+/))
    {
        newText +=transformWord(word) + ' '
    }
    document.getElementById('text').value = newText
}

var textArea = document.getElementById("text");
textArea.addEventListener("input", ProcessKey, false);

