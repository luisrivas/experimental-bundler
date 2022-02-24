
class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    print() {
        return `${this.name} ${this.year}`;
    }
}

export function test() {
    console.log("es6");
    return new Car("es6", 2014);
}

export function unusedone() {
    console.log("this should not appear");
}