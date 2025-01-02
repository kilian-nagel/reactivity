
const reactive_handler_builder = (notifySubscribers) => {return {
    get() {
        return Reflect.get(...arguments);
    },
    set(obj, prop, value){
        obj[prop] = value;
        notifySubscribers();
    }
}}

class Reactive {
    constructor(variable, update_function){
        this.dependencies = [];
        this.notifySubscribers = this.notifySubscribers.bind(this);
        this.variable = variable;
        this.variable_proxy = new Proxy(this.variable, reactive_handler_builder(this.notifySubscribers));
        this.update_function = update_function;
    }

    notifySubscribers(){

        console.log(this.dependencies)
        // update all dependencies
        for(const obj of this.dependencies){
            obj.update(obj);
        }
    }

    set(value){
        this.variable_proxy.value = value;
    }

    get(){
        return this.variable.value;
    }

    update(){
        this.update_function(this.variable);
    }

    addSubscriber(element){
        this.dependencies.push(element);
    }
}

let operand1 = new Reactive({value:100}, ()=>{});
let operand2 = new Reactive({value:100}, ()=>{});

let result = new Reactive({value:100}, (x)=>{
    x.value = operand1.get() + operand2.get();
    console.log(x.value);
});

operand1.addSubscriber(result);
operand2.addSubscriber(result);
operand1.set(200);
operand1.set(400);
export {operand1 , operand2};
