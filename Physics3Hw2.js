
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


var sigma = 5.67e-8;
var hc = 12400;
function answerQuestionNumber(questionNumber) {
    switch (questionNumber) {
        case 1:
            // Find element by content
            var elQuestionText = findElementByPartialContent("חשבו את האנרגיה הנפלטת", tagName = 'p');
            var lambdaValue = parseFloat(getElementDirectlyBelow(elQuestionText, 'span').innerText.split('=')[1]);
            var elAnswer = getElementDirectlyBelow(elQuestionText, 'input');
            var hoursValue = parseInt(getElementDirectlyAbove(getElementDirectlyBelow(elQuestionText, 'span'), 'span').textContent);
            var surfaceArea = parseFloat(elQuestionText.textContent.split('של ')[1]);
            var T = 2.898e3 / lambdaValue;
            var F = sigma * T ** 4;
            var P = surfaceArea * F;
            elAnswer.value = hoursValue * 60 * 60 * P * 1e-6 + '';
            break;
        case 2:
            var elAboveA = findElementByPartialContent('חשבו את ההספק שיוצא', tagName = 'p');
            var inputA = getElementDirectlyBelow(elAboveA, 'input');
            var inputB = getElementDirectlyBelow(inputA, 'input');
            var inputC = getElementDirectlyBelow(inputB, 'input');
            var T1 = parseFloat(findElementByPartialContent('T1=', tagName = 'p').textContent.split('=')[1]);
            var T2 = parseFloat(findElementByPartialContent('T2=', tagName = 'p').textContent.split('=')[1]);
            var R = 1000 * parseFloat(findElementByPartialContent('R=', tagName = 'p').textContent.split('=')[1]);
            var answerC = (T1 ** 2 / T2 ** 2 * 0.5 * R).toExponential();
            var answerA = (4 * Math.PI * R ** 2 * T1 ** 4 * sigma).toExponential();
            var answerB = (sigma * T2 ** 4).toExponential();
            inputC.value = answerC;
            inputA.value = answerA;
            inputB.value = answerB;
            break;
        case 3:
            var elCorrectAnswerText = findElementByPartialContent('T_2 < T_1 & T_4>T_3', tagName = 'p');
            var elAboveCorrectAnswer = getElementDirectlyAbove(elCorrectAnswerText, 'p');
            var elCorrectInput = getElementDirectlyBelow(elAboveCorrectAnswer, 'input');
            elCorrectInput.checked = true;
            break;
        case 4:
            var elQuestionText = findElementByPartialContent('מאירים את הפולט', tagName = 'span');
            var lambdaValue = parseFloat(elQuestionText.textContent.split('=')[1]);
            var vStopValue = parseFloat(getElementDirectlyBelow(elQuestionText, 'span').textContent.split('=')[1]);
            var inputA = getElementDirectlyBelow(getElementDirectlyBelow(elQuestionText, 'span'), 'input');
            var inputB = getElementDirectlyBelow(inputA, 'input');
            var inputC = getElementDirectlyBelow(inputB, 'input');
            var answerA = (hc / lambdaValue - vStopValue) + '';
            var answerB = (6242000000000000000 * 5 * lambdaValue / hc).toExponential();
            var answerC = (6242000000000000000 * 5 * lambdaValue / hc / 10).toExponential();
            // Fill answers
            inputA.value = answerA;
            inputB.value = answerB;
            inputC.value = answerC;
            break;
        case 5:
            // Find element by content
            var elQuestionText = findElementByPartialContent("מאירים תא פוטואלקטרי", tagName = 'span');
            var partsSplitByEq = elQuestionText.textContent.split('=');
            var lam1Value = parseFloat(partsSplitByEq[1]);
            var lam2Value = parseFloat(partsSplitByEq[2]);
            var EkMax = parseFloat(elQuestionText.textContent.split('הינה ')[1]);
            var answer = 12400 * (1 / lam2Value - 1 / lam1Value) + EkMax;
            var elInput = getElementDirectlyBelow(elQuestionText, 'input');
            elInput.value = answer.toExponential();
            break;
        case 6:
            var correctStatement1 = findElementByPartialContent('מתח העצירה (בערך מוחלט) קטן', tagName = 'strong');
            var correctStatement2 = findElementByPartialContent('אם מגדילים את אורך הגל של הקרינה האלקטרומגנטית ושומרים על הספק שווה, זרם הרוויה גדל גם כן', tagName = 'strong');
            var correctStatement3 = findElementByPartialContent('אם מגדילים את העוצמה של הקרינה האלקטרומגנטית, זרם הרוויה גדל גם כן', tagName = 'strong');
            // Get input element above those
            var input1 = getElementDirectlyAbove(correctStatement1, 'input');
            var input2 = getElementDirectlyAbove(correctStatement2, 'input');
            var input3 = getElementDirectlyAbove(correctStatement3, 'input');
            // Now get input below those
            var input1Below = getElementDirectlyBelow(input1, 'input');
            var input2Below = getElementDirectlyBelow(input2, 'input');
            var input3Below = getElementDirectlyBelow(input3, 'input');
            // Check those inputs
            input1Below.checked = true;
            input2Below.checked = true;
            input3Below.checked = true;

            break;
        case 7:
            var aboveInputA = findElementByExactContent('א. חשבו את פונקציית העבודה Φ של החומר? (תנו תשובה ביחידות של eV)', 'p');
            var inputA = getElementDirectlyBelow(aboveInputA, 'input');
            var inputB = getElementDirectlyBelow(inputA, 'input');
            var deltaTxt = findElementByPartialContent('ΔE=', 'p');
            var deltaValue = parseFloat(deltaTxt.textContent.split('=')[1]);
            var elEk = getElementDirectlyAbove(getElementDirectlyAbove(aboveInputA, 'p'), 'p');
            var EkVal = parseFloat(elEk.textContent.split('=')[1]);
            var lambdaValue = parseFloat(getElementDirectlyAbove(elEk, 'p').textContent.split('=')[1]);
            var answerA = (hc / lambdaValue - EkVal);
            var answerB = (hc / (answerA + deltaValue));
            inputA.value = answerA.toExponential();
            inputB.value = answerB + '';
            break;
        case 8:
            var P = parseFloat(findElementByPartialContent('P=', 'p').textContent.split('=')[1]);
            var T = parseFloat(findElementByPartialContent('T=', 'p').textContent.split('=')[1]);
            var h = parseFloat(findElementByPartialContent('h=', 'p').textContent.split('=')[1]);
            var r = parseFloat(findElementByPartialContent('r=', 'p').textContent.split('=')[1]);
            var surfaceAreaOfOne = 2 * Math.PI * r * h + 2 * Math.PI * r * r;
            var N = P / (surfaceAreaOfOne * T ** 4 * sigma);
            // round N
            N = Math.round(N).toPrecision(3);
            // Get inputs below the text "התמונה להמחשה בלבד!"
            var elInput1 = getElementDirectlyBelow(findElementByPartialContent('התמונה להמחשה בלבד!', 'span'), 'input');
            var elInput2 = getElementDirectlyBelow(elInput1, 'input');
            var elInput3 = getElementDirectlyBelow(elInput2, 'input');
            var elInput4 = getElementDirectlyBelow(elInput3, 'input');
            var elInput5 = getElementDirectlyBelow(elInput4, 'input');
            var elInput6 = getElementDirectlyBelow(elInput5, 'input');
            if (elInput1.parentElement.textContent.split('. ')[1].startsWith(N)) {
                elInput1.checked = true;
            } else if (elInput2.parentElement.textContent.split('. ')[1].startsWith(N)) {
                elInput2.checked = true;
            } else if (elInput3.parentElement.textContent.split('. ')[1].startsWith(N)) {
                elInput3.checked = true;
            } else if (elInput4.parentElement.textContent.split('. ')[1].startsWith(N)) {
                elInput4.checked = true;
            } else if (elInput5.parentElement.textContent.split('. ')[1].startsWith(N)) {
                elInput5.checked = true;
            } else if (elInput6.parentElement.textContent.split('. ')[1].startsWith(N)) {
                elInput6.checked = true;
            }

            break;
        case 9:
            var elQuestionText = findElementByPartialContent('התשובות נתונות ב eV', 'span');
            var elLambda = getElementDirectlyBelow(elQuestionText, 'p');
            var elAbsV = getElementDirectlyBelow(elLambda, 'p');
            var lambdaValue = parseFloat(elLambda.textContent.split('=')[1]);
            var absV = parseFloat(elAbsV.textContent.split('=')[1]);
            var answer = (hc / lambdaValue / 10 - absV);
            // Round answer
            answer = answer.toPrecision(3);
            // Find div containing answer
            var answerDiv = findElementByExactContent(answer, 'div');
            answerDiv.children[0].click()
            break;
    }
}

function answerAllQuestions() {
    // Remove all input elements of class "questionflagimage"
    var els = document.getElementsByClassName('questionflagimage');
    while (els.length > 0) {
        els[0].remove();
    }
    // For each question
    for (var i = 0; i <= 9; i++) {
        answerQuestionNumber(i);
    }
}
answerAllQuestions();

// Minified
// (function (){function findElementByPartialContent(e,t="*"){var n=document.getElementsByTagName(t);(n=Array.from(n)).sort(function(e,t){return e.offsetHeight-t.offsetHeight});for(var l=0;l<n.length;l++)if(n[l].innerText.indexOf(e)>=0)return n[l]}function findElementByExactContent(e,t="*"){for(var n=document.getElementsByTagName(t),l=0;l<n.length;l++)if(n[l].innerText==e)return n[l]}function getElementDirectlyBelow(e,t="*"){var n=document.getElementsByTagName(t);(n=Array.from(n)).sort(function(e,t){return e.getBoundingClientRect().y-t.getBoundingClientRect().y});for(var l=0;l<n.length;l++)if(console.log("Element",l,"bottomOffset is",n[l].getBoundingClientRect().y+n[l].offsetHeight,"and given element's topOffset is",e.getBoundingClientRect().y),n[l].getBoundingClientRect().y>=e.getBoundingClientRect().y+e.offsetHeight)return n[l]}function getElementDirectlyAbove(e,t="*"){var n=document.getElementsByTagName(t);(n=Array.from(n)).sort(function(e,t){return-(e.getBoundingClientRect().y+e.offsetHeight-t.getBoundingClientRect().y-t.offsetHeight)});for(var l=0;l<n.length;l++)if(console.log("Element",l,"bottomOffset is",n[l].getBoundingClientRect().y+n[l].offsetHeight,"and given element's topOffset is",e.getBoundingClientRect().y),n[l].getBoundingClientRect().y+n[l].offsetHeight<=e.getBoundingClientRect().y)return n[l]}function evaluateStringToNumber(s){var strNum=s.split("=")[1].replace("m/s","1").replace("kg","").replace("^","**").replace("{","(").replace("}",")");return eval(strNum)}var sigma=5.67e-8,hc=12400;function answerQuestionNumber(e){switch(e){case 1:var t=findElementByPartialContent("חשבו את האנרגיה הנפלטת",tagName="p"),n=parseFloat(getElementDirectlyBelow(t,"span").innerText.split("=")[1]),l=getElementDirectlyBelow(t,"input"),a=parseInt(getElementDirectlyAbove(getElementDirectlyBelow(t,"span"),"span").textContent),i=parseFloat(t.textContent.split("של ")[1])*(sigma*(H=2898/n)**4);l.value=60*a*60*i*1e-6+"";break;case 2:var o=getElementDirectlyBelow(findElementByPartialContent("חשבו את ההספק שיוצא",tagName="p"),"input"),r=getElementDirectlyBelow(o,"input"),s=getElementDirectlyBelow(r,"input"),c=parseFloat(findElementByPartialContent("T1=",tagName="p").textContent.split("=")[1]),p=parseFloat(findElementByPartialContent("T2=",tagName="p").textContent.split("=")[1]),m=1e3*parseFloat(findElementByPartialContent("R=",tagName="p").textContent.split("=")[1]),g=(c**2/p**2*.5*m).toExponential(),E=(4*Math.PI*m**2*c**4*sigma).toExponential(),u=(sigma*p**4).toExponential();s.value=g,o.value=E,r.value=u;break;case 3:getElementDirectlyBelow(getElementDirectlyAbove(findElementByPartialContent("T_2 < T_1 & T_4>T_3",tagName="p"),"p"),"input").checked=!0;break;case 4:t=findElementByPartialContent("מאירים את הפולט",tagName="span"),n=parseFloat(t.textContent.split("=")[1]);var y=parseFloat(getElementDirectlyBelow(t,"span").textContent.split("=")[1]);o=getElementDirectlyBelow(getElementDirectlyBelow(t,"span"),"input"),r=getElementDirectlyBelow(o,"input"),s=getElementDirectlyBelow(r,"input"),E=hc/n-y+"",u=(3121e16*n/hc).toExponential(),g=(3121e16*n/hc/10).toExponential();o.value=E,r.value=u,s.value=g;break;case 5:var f=(t=findElementByPartialContent("מאירים תא פוטואלקטרי",tagName="span")).textContent.split("="),B=parseFloat(f[1]),C=12400*(1/parseFloat(f[2])-1/B)+parseFloat(t.textContent.split("הינה ")[1]);getElementDirectlyBelow(t,"input").value=C.toExponential();break;case 6:var d=findElementByPartialContent("מתח העצירה (בערך מוחלט) קטן",tagName="strong"),v=findElementByPartialContent("אם מגדילים את אורך הגל של הקרינה האלקטרומגנטית ושומרים על הספק שווה, זרם הרוויה גדל גם כן",tagName="strong"),h=findElementByPartialContent("אם מגדילים את העוצמה של הקרינה האלקטרומגנטית, זרם הרוויה גדל גם כן",tagName="strong"),x=getElementDirectlyAbove(d,"input"),D=getElementDirectlyAbove(v,"input"),w=getElementDirectlyAbove(h,"input"),P=getElementDirectlyBelow(x,"input"),b=getElementDirectlyBelow(D,"input"),N=getElementDirectlyBelow(w,"input");P.checked=!0,b.checked=!0,N.checked=!0;break;case 7:var k=findElementByExactContent("א. חשבו את פונקציית העבודה Φ של החומר? (תנו תשובה ביחידות של eV)","p"),F=(o=getElementDirectlyBelow(k,"input"),r=getElementDirectlyBelow(o,"input"),findElementByPartialContent("ΔE=","p")),T=parseFloat(F.textContent.split("=")[1]),A=getElementDirectlyAbove(getElementDirectlyAbove(k,"p"),"p"),R=parseFloat(A.textContent.split("=")[1]);n=parseFloat(getElementDirectlyAbove(A,"p").textContent.split("=")[1]),u=hc/((E=hc/n-R)+T);o.value=E.toExponential(),r.value=u+"";break;case 8:i=parseFloat(findElementByPartialContent("P=","p").textContent.split("=")[1]);var H=parseFloat(findElementByPartialContent("T=","p").textContent.split("=")[1]),W=parseFloat(findElementByPartialContent("h=","p").textContent.split("=")[1]),O=parseFloat(findElementByPartialContent("r=","p").textContent.split("=")[1]),I=i/((2*Math.PI*O*W+2*Math.PI*O*O)*H**4*sigma);I=Math.round(I).toPrecision(3);var M=getElementDirectlyBelow(findElementByPartialContent("התמונה להמחשה בלבד!","span"),"input"),Q=getElementDirectlyBelow(M,"input"),_=getElementDirectlyBelow(Q,"input"),V=getElementDirectlyBelow(_,"input"),q=getElementDirectlyBelow(V,"input"),S=getElementDirectlyBelow(q,"input");M.parentElement.textContent.split(". ")[1].startsWith(I)?M.checked=!0:Q.parentElement.textContent.split(". ")[1].startsWith(I)?Q.checked=!0:_.parentElement.textContent.split(". ")[1].startsWith(I)?_.checked=!0:V.parentElement.textContent.split(". ")[1].startsWith(I)?V.checked=!0:q.parentElement.textContent.split(". ")[1].startsWith(I)?q.checked=!0:S.parentElement.textContent.split(". ")[1].startsWith(I)&&(S.checked=!0);break;case 9:var j=getElementDirectlyBelow(t=findElementByPartialContent("התשובות נתונות ב eV","span"),"p"),z=getElementDirectlyBelow(j,"p"),G=(n=parseFloat(j.textContent.split("=")[1]),parseFloat(z.textContent.split("=")[1]));findElementByExactContent(C=(C=hc/n/10-G).toPrecision(3),"div").children[0].click()}}function answerAllQuestions(){for(var e=document.getElementsByClassName("questionflagimage");e.length>0;)e[0].remove();for(var t=0;t<=9;t++)answerQuestionNumber(t)}answerAllQuestions();})()
