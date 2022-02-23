
class Car {

    private name:string;
    private year:number;

    constructor(name:string, year:number) {
        this.name = name;
        this.year = year;
    }

    print() {
        return `${this.name} ${this.year}`;
    }
}

export function test() {
    console.log("ts");
    return new Car("ts", 2014);
}


export function unusedone() {
    console.log("this should not appear.");
}