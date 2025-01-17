import { ReactiveElement } from './reactive-element.js';
import { Reactive } from './reactive-variable.js'; 

export let operand1 = new Reactive(0, ()=>{});
export let operand2 = new Reactive(0, ()=>{});

const reactive_result = new ReactiveElement("#result",()=>{
    return operand1.get() + operand2.get();
});

document.getElementById("increment1").addEventListener("click", ()=>{
    operand1.set(operand1.get()+1);
});
document.getElementById("increment2").addEventListener("click", ()=>{
    console.log(operand2.get());
    operand2.set(operand2.get()+1);
});

operand1.addSubscriber(reactive_result);
operand2.addSubscriber(reactive_result);
