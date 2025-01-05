
const reactive_handler_builder = (notifySubscribers) => {return {
    get() {
        return Reflect.get(...arguments);
    },
    set(obj, prop, value){
        obj[prop] = value;
        notifySubscribers();
        return obj[prop];
    }
}}

export class Reactive {
    constructor(variable, update_function){
        this.dependencies = [];
        this.notifySubscribers = this.notifySubscribers.bind(this);
        this.variable = {value:variable};
        this.variable_proxy = new Proxy(this.variable, reactive_handler_builder(this.notifySubscribers));
        this.update_function = update_function;
    }

    notifySubscribers(){
        // Appelée lorsque this.variable change. On prévient toutes les dépendances de this.variable du changement.
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
        // Appelée lorsqu'une variable réactive de laquelle this.variable dépend change.
        this.update_function(this.variable);
    }

    addSubscriber(element){
        this.dependencies.push(element);
    }
}
