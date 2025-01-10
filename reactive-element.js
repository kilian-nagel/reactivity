
class ReactiveElement {
    constructor(query, update_function){
        this.element = document.querySelector(query);
        this.update_function = update_function;
    }

    update(){
        this.element.innerHTML = update_function();
    }
}



