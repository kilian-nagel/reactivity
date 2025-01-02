import {operand1, operand2} from './index.js'

const increment_val1_btn = document.getElementById("increment1");
const increment_val2_btn = document.getElementById("increment2");

increment_val1_btn.addEventListener("click", ()=>{
    console.log("val incremented 1");
});

increment_val2_btn.addEventListener("click", ()=>{
    console.log("val incremented 2");
});
