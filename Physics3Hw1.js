
// Find element by partial content
function findElementByPartialContent(innerText, tagName = "*") {
    var elements = document.getElementsByTagName(tagName);
    elements = Array.from(elements);
    // Sort elements by field offsetTop
    elements.sort(function (a, b) {
        return a.offsetHeight - b.offsetHeight;
    });


    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText.indexOf(innerText) >= 0) {
            return elements[i];
        }
    }
}

// Find element by partial content
function findElementByExactContent(innerText, tagName = "*") {
    var elements = document.getElementsByTagName(tagName);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText == innerText) {
            return (elements[i]);
        }
    }
}

// Find the element placed visually directly under the given element
function getElementDirectlyBelow(element, tagName = "*") {
    var elements = document.getElementsByTagName(tagName);
    // Conect htmlCollection to array
    elements = Array.from(elements);
    // Sort elements by field offsetTop
    elements.sort(function (a, b) {
        return a.getBoundingClientRect().y - b.getBoundingClientRect().y;
    });

    // Find the first element located below the given element
    for (var i = 0; i < elements.length; i++) {
        console.log('Element', i, 'bottomOffset is', elements[i].getBoundingClientRect().y + elements[i].offsetHeight, 'and given element\'s topOffset is', element.getBoundingClientRect().y);
        if (elements[i].getBoundingClientRect().y >= element.getBoundingClientRect().y + element.offsetHeight) {
            return elements[i];
        }
    }
}

// Find the element placed visually directly under the given element
function getElementDirectlyAbove(element, tagName = "*") {
    var elements = document.getElementsByTagName(tagName);
    // Conect htmlCollection to array
    elements = Array.from(elements);
    // Sort elements by field offsetTop
    elements.sort(function (a, b) {
        return -(a.getBoundingClientRect().y + a.offsetHeight - b.getBoundingClientRect().y - b.offsetHeight);
    });

    // Find the first element located below the given element
    for (var i = 0; i < elements.length; i++) {
        console.log('Element', i, 'bottomOffset is', elements[i].getBoundingClientRect().y + elements[i].offsetHeight, 'and given element\'s topOffset is', element.getBoundingClientRect().y);
        if (elements[i].getBoundingClientRect().y + elements[i].offsetHeight <= element.getBoundingClientRect().y) {
            return elements[i];
        }
    }
}

function evaluateStringToNumber(s) {
    var strNum = s.split('=')[1].replace('m/s', '1').replace('kg', '').replace('^', '**').replace('{', '(').replace('}', ')');
    return eval(strNum)
}

function answerQuestionNumber(questionNumber) {
    switch (questionNumber) {
        case 1:
            var titleA = findElementByPartialContent('מהו כיוון תנועת האלקטרון שלאחר הפיזור', tagName = "p");
            var titleB = findElementByPartialContent('חשבו את התנע של הפוטון אחרי הפיזור ', tagName = "p");
            var titleC = findElementByPartialContent(' לאחר הפיזור', tagName = "p");
            var me = getElementDirectlyAbove(titleA, 'img');
            var p = getElementDirectlyAbove(me, 'img');
            var valMe = evaluateStringToNumber(me.title);
            var valP = evaluateStringToNumber(p.title);
            var fieldA = getElementDirectlyBelow(titleA, 'input');
            var fieldB = getElementDirectlyBelow(titleB, 'input');
            var fieldC = getElementDirectlyBelow(titleC, 'input');
            fieldA.value = 0;
            fieldB.value = (3e8 * valMe * valP) / (3e8 * valMe + 2 * valP);
            fieldC.value = (3e8 * valMe * valP) / (3e8 * valMe + 2 * valP) + valP;
            break;
        case 2:
            var formulaEl = findElementByPartialContent('x,t', tagName = 'span');
            var funcStr = formulaEl.innerText;
            var preSin = parseInt(funcStr.split('sin')[0].split(' ')[2]);
            var preT = parseInt(funcStr.split('t')[1].split('-')[1]);
            var preX = parseInt(funcStr.split('x')[1].split('(')[1]);
            // Get the input below formulaEl
            var field = getElementDirectlyBelow(getElementDirectlyBelow(formulaEl, 'input'), 'input');
            var ablock = field.parentElement.parentElement;
            var answers = ablock.children;
            var gamma = 2 * 3.14159265 / preX;
            // Round gamma to 2 decimal places
            gamma = Math.round(gamma * 100) / 100;
            var correctText = `A = ${preSin} m; λ =${gamma} m; ω = ${preT} rad*Hz`;
            // Find the answer with innerText containing funcStr
            for (var i = 0; i < answers.length; i++) {
                if (answers[i].innerText.indexOf(correctText) >= 0) {
                    answers[i].children[0].click();
                    break;
                }
            }
            break;
        case 3:
            var omegaEl = findElementByPartialContent('ω0 = ', tagName = 'span');
            var omega = omegaEl.innerText.split(' ')[2];
            var alphaEl = findElementByPartialContent('α = ', tagName = 'span');
            var alpha = alphaEl.innerText.split(' ')[2];
            var kEl = findElementByPartialContent('k = |', tagName = 'span');
            var k = parseInt(kEl.innerText.match(/\d+/g)[0]);
            var res = (alpha ** 2 * k ** 2) / (alpha ** 2 * k ** 2 + omega ** 2)
            getElementDirectlyBelow(kEl, 'input').value = res;
            break;
        case 4:
            questionElement = findElementByPartialContent('היה שווה ל', 'div');
            var vElement = questionElement.children[0].children[0];
            var v = parseFloat(vElement.innerText);
            v = Math.sqrt(1 - (1 / ((1 + v) ** 2)))
            getElementDirectlyBelow(vElement, 'input').value = v;
            break;
        case 5:
            // List all radio type inputs
            var imgElements = document.getElementsByTagName('img');
            // Array from htmlCollection
            imgElements = Array.from(imgElements);
            // Find an image element where its title is "Hello"
            var img = imgElements.find(function (img) { return img.title === '\\sqrt{\\frac{\\omega_{\\rm p}^2}{k^2}+c^2}' });
            img.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].click();
            break;
        case 6:
            var correctInnerText = '2A·cos((k-k)·x-(ω-ω)·t)·cos((k+k)·x-(ω+ω)·t)';
            var correctAnswer = findElementByPartialContent(correctInnerText, 'span');
            correctAnswer.parentElement.parentElement.parentElement.parentElement.children[0].click();
            break;
        case 7:
            // Get all input elements
            var inputElements = document.getElementsByTagName('input');
            // Filter only of type text
            inputElements = Array.from(inputElements).filter(function (input) { return input.type === 'text' });
            // Find an input where the parent's parent's innerText contains "test"
            var input = inputElements.find(function (input) {
                return input.parentElement.parentElement.innerText.indexOf('מצאו את מהירות החבורה') >= 0
            });
            var deltaKEl = findElementByPartialContent('k-k=', 'span');
            var deltaOmegaEl = findElementByPartialContent('ω-ω=', 'span');
            // Extract number from span element
            var deltaK = parseFloat(deltaKEl.innerText.match(/\d+/g)[0]);
            // Extract delta omega from span element   
            var deltaOmega = parseFloat(deltaOmegaEl.innerText.match(/\d+/g)[0]);
            input.value = deltaOmega / deltaK;
            break;
        case 8:
            // Get all input elements
            var inputElements = document.getElementsByTagName('input');
            // Filter only of type text
            inputElements = Array.from(inputElements).filter(function (input) { return input.type === 'checkbox' });
            var formula = findElementByPartialContent('ψ(x,0', 'span');
            // Extract the numbers (optionally decimal) from the formula's innerText
            var numbers = formula.innerText.match(/\d+\.?\d*/g);
            // Remove zero
            var numbers = numbers.filter(function (number) { return number > 0 || number < 0 });
            // Get absolute values
            var numbers = numbers.map(function (number) { return Math.abs(number) });
            var searchStr = `cos(${numbers[0]}x)`;
            var correctAnswer = findElementByPartialContent(searchStr, 'p');
            correctAnswer.parentElement.parentElement.parentElement.children[1].click()
            var waveLen = 2 * Math.PI / numbers[0];
            // Round wavelen to int
            waveLen = Math.round(waveLen);
            // Get the element containing the waveLen
            var waveLenEl = findElementByPartialContent("הוא " + waveLen.toString(), 'p');
            waveLenEl.parentElement.parentElement.parentElement.children[1].click();
            break;
        case 9:
            // Find the img element where its title is "f_{1}="
            var f1El = Array.from(document.getElementsByTagName('img')).find(function (img) {
                return img.title === 'f_{1}='
            }).parentElement.parentElement.parentElement;
            var f2El = Array.from(document.getElementsByTagName('img')).find(function (img) {
                return img.title === 'f_{2}='
            }).parentElement.parentElement.parentElement;
            // Extract numbers from each element's innerText
            var f1 = parseFloat(f1El.innerText.match(/\d+\.?\d*/g)[0]);
            var f2 = parseFloat(f2El.innerText.match(/\d+\.?\d*/g)[0]);
            // Calculate the diff between f1 and f2
            var diff = Math.abs(f1 - f2);
            // Find the input value with the closest common parent
            var input = getElementDirectlyBelow(f1El, 'input');
            input.value = diff;
            break;
    }
}

function answerAllQuestions() {
    // For each question
    for (var i = 0; i <= 9; i++) {
        answerQuestionNumber(i);
    }
}
answerAllQuestions();
