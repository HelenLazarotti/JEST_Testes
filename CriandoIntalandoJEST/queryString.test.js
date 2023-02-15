const {queryString, parse} = require('./queryString');

//TRANSFORMA OBJETO PARA QUERY STRING
describe('Object to query string', () => {

    //deve criar uma string válida quando objeto é fornecido
    test('should create a valid string when an object is provided', () => {
        const obj = {
            name: 'Helen',
            profession: 'QA',
            age: '21'
        };

        //digo oque eu espero que venha:
        expect(queryString(obj)).toBe('name=Helen&profession=QA&age=21')
    })

    //Vamos tornar a codificação mais resiliente:

    //deve criar uma string de consulta válida quando um array é passado como valor
    test('should create a valid query string when an array is passed as value', () => {
        const obj = {
            name: 'Helen',
            abilities: ['JS', 'MySQL']
        };

        expect(queryString(obj)).toBe('name=Helen&abilities=JS,MySQL')

        //se eu quisesse verificar se não é um falso positivo:
        //expect(queryString(obj)).not.toBe('name=Helen&abilities=JS,MySQL')

    })

    //deve retornar um erro quando um objeto é passado como valor
    test('should throw an error when an object is passed as value', () => {
        const obj = {
            name: 'Helen',
            abilities: {
                first: 'JS',
                second: 'MySQL'
            }
        };

        expect(() => {
            queryString(obj)
        }).toThrowError();
    })
})









//TRANSFORMA QUERY STRING PARA OBJETO
describe('Query string to object', () => {

    //deve econverter a string pra objeto
    test('should convert a query string to object', () => {
        const qs = 'name=Helen&profession=QA';
        
        expect(parse(qs)).toEqual({
            name: 'Helen',
            profession: 'QA'
        }); 
    });

    //deve converter a query string para um objeto, cuidando dos valores separados por vírgula:
    test('should convert a query string to an object taking care of comma separated values', () => {

        const qs = 'name=Helen&abilities=JS,MySQL'

        expect(parse(qs)).toEqual({
            name: 'Helen',
            abilities: ['JS', 'MySQL']
        })
    })
});