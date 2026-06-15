const historyText = document.querySelector(".screen-history");
const resultText = document.querySelector(".screen-result");
let calculated = false;

function resetCalculator() {
    historyText.innerText = "";
    resultText.innerText = "0";
    calculated = false;
}

function calculateResult() {
    try {
        let expression =
            historyText.innerText +
            resultText.innerText;
        if (
            expression === "" ||
            resultText.innerText === "Error"
        ) {
            return;
        }

        const lastChar = expression.slice(-1);
        if (
            ["+", "-", "*", "/", "%"].includes(lastChar)
        ) {
            expression = expression.slice(0, -1);
        }

        const answer = eval(expression);
        if (!isFinite(answer)) {
            throw new Error();
        }

        historyText.innerText = expression + "=";
        resultText.innerText = answer;
        calculated = true;
    } catch {
        resultText.innerText = "Error";
        historyText.innerText = "";
        calculated = true;
    }
}

function addOperator(operator) {
    const operators =
        ["+", "-", "*", "/", "%"];

    if (resultText.innerText === "Error") {
        resetCalculator();
    }

    if (calculated) {
        historyText.innerText = resultText.innerText;
        calculated = false;
    }

    let lastChar =historyText.innerText.slice(-1);

    if (
        operators.includes(lastChar) &&
        resultText.innerText === "0"
    ) {
        historyText.innerText =
            historyText.innerText.slice(0, -1) +
            operator;
        return;
    }

    if (
        resultText.innerText !== "0"
    ) {
        historyText.innerText +=
            resultText.innerText;
    }

    lastChar =
        historyText.innerText.slice(-1);

    if (
        operators.includes(lastChar)
    ) {
        historyText.innerText =
            historyText.innerText.slice(0, -1) +
            operator;
    } else {
        historyText.innerText += operator;
    }

    resultText.innerText = "0";
}

document.querySelector(".calculator")
.addEventListener("click", (e) => {

    if (e.target.tagName !== "BUTTON") {
        return;
    }

    const value =e.target.dataset.value;
    const action =e.target.dataset.action;

    if (value && !action) {

        if (
            value === "." &&
            resultText.innerText.includes(".")
        ) {
            return;
        }

        if (
            calculated ||
            resultText.innerText === "Error"
        ) {
            resetCalculator();
        }

        if (
            resultText.innerText === "0" &&
            value !== "."
        ) {
            resultText.innerText = value;
        } else {
            resultText.innerText += value;
        }
    }

    if (action === "plus") addOperator("+");
    if (action === "minus") addOperator("-");
    if (action === "multiply") addOperator("*");
    if (action === "divide") addOperator("/");
    if (action === "modulus") addOperator("%");

    if (action === "equal") {
        calculateResult();
    }

    if (action === "clear") {

        if (
            resultText.innerText === "Error" ||
            calculated
        ) {
            resetCalculator();
            return;
        }

        resultText.innerText =
            resultText.innerText.slice(0, -1);

        if (
            resultText.innerText === ""
        ) {
            resultText.innerText = "0";
        }
    }

    if (action === "clear_all") {
        resetCalculator();
    }

    if (action === "sign") {
        if (
            resultText.innerText !== "0" &&
            resultText.innerText !== "Error"
        ) {
            resultText.innerText =
                String(
                    Number(resultText.innerText) * -1
                );
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (
        (e.key >= "0" && e.key <= "9") ||
        e.key === "."
    ) {

        if (
            e.key === "." &&
            resultText.innerText.includes(".")
        ) {
            return;
        }

        if (
            calculated ||
            resultText.innerText === "Error"
        ) {
            resetCalculator();
        }

        if (
            resultText.innerText === "0" &&
            e.key !== "."
        ) {
            resultText.innerText = e.key;
        } else {
            resultText.innerText += e.key;
        }
    }

    if (
        e.key === "Enter" ||
        e.key === "="
    ) {
        calculateResult();
    }

    if (e.key === "Backspace") {
        resultText.innerText =
            resultText.innerText.slice(0, -1);
        if (
            resultText.innerText === ""
        ) {
            resultText.innerText = "0";
        }
    }

    if (
        ["+", "-", "*", "/", "%"]
        .includes(e.key)
    ) {
        addOperator(e.key);
    }
});