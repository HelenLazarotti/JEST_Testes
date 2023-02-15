const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
})

test('deveria somar 1 e 2 e o resultado tem que ser 3', () => {
    expect(sum(2, 2)).toBe(4);
})
/*Se no meu sum.js estiver:
function sum(a, b) {
    return +a + +b //pra dizer que são números
}
module.exports = sum */

test('deve me retornar um erro', () => {
    expect(sum('2', '2')).toBe(4);
})
/*Se no meu sum.js estiver:
function sum(a, b) {
    return a + b //pra dizer que são números
}
module.exports = sum */

//maneira que eu preciso executar, p que o jest seja capaz de capturar o erro e determinar que ele foi realmente disparado:
it('deve mostrar erro se o que eu colocar for nulo', () => {
    expect(() => {
        sum('', 2)
     }).toThrowError();

     expect(() => {
        sum([2, 2]) //passei um array
     }).toThrowError();

     expect(() => {
        sum({}) //objeto vazio
     }).toThrowError();

     expect(() => {
        sum() //vazio
     }).toThrowError();
})
/*Se no meu sum.js estiver:
function sum(a, b) {
    //tem diferença entre usar parseInt e +tal
    //se eu usar só o +, ele vai transformar uma string vazia em 0, nesse caso n queremos, por isso usamos parseInt
    const int1 = parseInt(a, 10);
    const int2 = parseInt(b, 10)

    if(Number.isNaN(int1) || Number.isNaN(int2)) {
        throw new Error('Verifique seu input')
    }
    return +a + +b //pra dizer que são números
}

module.exports = sum

*/