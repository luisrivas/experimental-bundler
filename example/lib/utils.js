
function Car(name, year) {
    this.name = name;
    this.year = year;
}

Car.prototype.print = function() {
    return this.name + " " + this.year;
}


function testFunction() {
    console.log("es5");
    return new Car("es5", 2000);
}


function unused() {
    console.log("this should not appear");
}


module.exports = {
    test: testFunction,
    unused: unused
}