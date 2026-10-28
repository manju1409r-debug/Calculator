const display = document.getElementById("display");
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
function appendNumber(number){
if(display.value === "Error"){
    display.value = "0";
}
if(waitingForSecondNumber){
    display.value = number;
    waitingForSecondNumber = false;
}else{
    display.value = display.value === "0"?number:display.value + number;
}
    
}
function appendDecimal(){
    if(display.value === "Error"){
        display.value = "0";
    }
    if(waitingForSecondNumber){
        display.value = "0";
        waitingForSecondNumber = false;
    }else if(!display.value.includes(".")){
        display.value+=".";
    }
}
 function chooseOperator(op) {
            if (display.value === "Error") return;

            if (operator && !waitingForSecondNumber) {
                calculate();
            }

            firstNumber = Number(display.value);
            operator = op;
            waitingForSecondNumber = true;
        }

        function calculate() {
            if (
                operator === null ||
                waitingForSecondNumber ||
                display.value === "Error"
            ) {
                return;
            }

            const secondNumber = Number(display.value);
            let result;

            switch (operator) {
                case "+":
                    result = firstNumber + secondNumber;
                    break;

                case "-":
                    result = firstNumber - secondNumber;
                    break;

                case "*":
                    result = firstNumber * secondNumber;
                    break;

                case "/":
                    if (secondNumber === 0) {
                        display.value = "Error";
                        operator = null;
                        firstNumber = null;
                        waitingForSecondNumber = true;
                        return;
                    }

                    result = firstNumber / secondNumber;
                    break;
            }

            display.value = Number.isFinite(result)
                ? String(Number(result.toPrecision(12)))
                : "Error";

            firstNumber = null;
            operator = null;
            waitingForSecondNumber = true;
        }

        function clearDisplay() {
            display.value = "0";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
        }

        function deleteLast() {
            if (waitingForSecondNumber || display.value === "Error") {
                return;
            }

            display.value = display.value.slice(0, -1) || "0";
        }