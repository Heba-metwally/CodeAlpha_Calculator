const display =document.getElementById("display");

document.querySelector("main").addEventListener("click",(e)=>{

    if(e.target.tagName !== "BUTTON")
        return;

    const value = e.target.dataset.value;
    const action = e.target.dataset.action;

    if(value){
        display.value += value;
    }

    if(action === "plus"){
        display.value += "+";
    }

    if(action === "minus"){
        display.value += "-";
    }

    if(action === "multiply"){
        display.value += "*";
    }

    if(action === "divide"){
        display.value += "/";
    }

    if(action === "modulus"){
        display.value += "%";
    }

    if(action === "equal"){
        try{
            const result = eval(display.value);
            display.value = display.value + "=" + result;
        }
        catch{
            display.value = "Error";
        }
    }

    if(action === "clear"){
        display.value = display.value.slice(0, -1);
    }

    if(action === "clear_all"){
        display.value = "";
    }

    if(action === "sign"){
        if(display.value){
            display.value = String(
            Number(display.value)* -1
            );
        }
    }
});
document.addEventListener("keydown", (e) => {
    if(e.key >= "0" && e.key <= "9" || e.key === ".") 
        display.value += e.key;

    if(e.key === "Enter" || e.key === "=") {
        const result = eval(display.value);
        display.value = display.value + "=" + result;
    }
    if(e.key === "Backspace") 
        display.value = display.value.slice(0, -1);

    if(["+","-","*","/","%"].includes(e.key)) 
        display.value += e.key;
});