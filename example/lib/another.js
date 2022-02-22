
function testFunction() {
    console.log('another commonjs');
    return 'another commonjs';
}

function testUnused() {
    console.log("this should not appear")
}


module.exports = {
    test2 : testFunction,
    testUnused
}