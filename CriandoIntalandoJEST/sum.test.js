const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
})

test('deve somar 1 e 2 e o resultado tem que ser 3', () => {
    expect(sum(2, 2)).toBe(4);
})

test('deve me retornar um erro', () => {
    expect(sum('2', '2')).toBe(4);
})

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