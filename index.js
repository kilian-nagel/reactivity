

class Reactive {
    constructor(variable, update_function){
        this.dependencies = [];
        this.variable = variable;
        this.update_function = update_function;
    }

    notifySubscribers(){
        // update all dependencies
        for(const obj of this.dependencies){
            obj.update(obj);
        }
    }

    update(){
        this.update_function(this.variable);
    }

    subscribe(element){
        this.dependencies.push(element);
    }

    get(cible, prop, recepteur) {
        return Reflect.get(...arguments);
    }

    set(obj, prop, value){
        obj[prop] = value;
        console.log(this.dependencies);
        this.notifySubscribers();
    }
}

const x = {valid:true};
const y = {data:100};

const x_reactive = new Reactive(x, (x)=>{});
const y_reactive = new Reactive(y, (x)=>{});

const x_proxy = new Proxy(x, x_reactive);
const y_proxy = new Proxy(y, y_reactive);
y_reactive.subscribe(x_reactive);

x_reactive.variable.valid = false;
export {x_proxy, y_proxy ,y_reactive};

