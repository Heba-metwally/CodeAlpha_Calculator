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
            display.value = eval(display.value);
        }
        catch{
            display.value = "Error";
        }
    }

    if(action === "clear"){
        display.value = "";
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