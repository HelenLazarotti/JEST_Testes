const Cart = require('./Cart')

//crio fora dos testes para que cada teste que passar esteja 0 bonitinho:
let cart; 

//chamo produto aqui fora tbm, pois vou usar em + de 1 teste:
let product = {
    title: "Algicida Choque HTH",
    price: 32
}

//crio um 2° produto:
let product2 = {
    title: "MaxFloc Clarifica HTH",
    price: 25
}

//ANTES DE TUDO, cria um novo carrinho:
beforeAll(() => {
    cart = new Cart();
})


describe('Cart Total de Produtos', () => {

    //TESTE 
    //deve retornar 0 quando getTotal() for executado em uma instância recém-criada
    test('should return 0 when getTotal() is executed in a newly created instance', () => {
        //espero que esse meu carrinho pegue o total, e seja 0:
        expect(cart.getTotal()).toEqual(0);
    });

    //TESTE
    //deve multiplicar quantidade, preço e receber o valor total
    test('should multiply quantity and price and receive the total amount', () => {
        const item = {
            //meu produto possui titulo e preço: lê-se 52.00
            product,
            quantity: 16
        }

        //preciso add este item/produto ao meu carrinho e a qtde:
        cart.add(item)

        //espero que pegue tot e seja 832
        expect(cart.getTotal()).toBe(512)

        console.log(item)//só p ver
    })

    //TESTE
    //deve garantir que não tenha mais de 1 produto por vez
    test('should ensure no more than on product exist at a time', () => {

        //add 7 produtos:

        cart.add({
            //meu produto possui titulo e preço: lê-se 52.00
            product,
            quantity: 16
        });

        cart.add({
            //meu produto possui titulo e preço: lê-se 52.00
            product,
            quantity: 16
        });

        //espero que o total seja apenas valor de 1
        expect(cart.getTotal()).toBe(512)
    })

    //TESTE
    //deve atualizar tot quando prduto é add ou removido.
    test('should update total when a product gets included and remove', () => {
        //add Algicida Choque > 10UN > tot$320
        cart.add({
            product,
            quantity: 10
        });

        //add MaxFloc > 15UN > tot$375
        cart.add({
            product: product2,
            quantity: 15
        });

        //se eu nao tivesse botado o remove meu toBe seria (695)
        
        //removi o Algicida Choque
        cart.remove(product);

        expect(cart.getTotal()).toBe(375)
    })
});

describe('Cart Logout do Usuário', () => {

    //TESTE
    //deve retornar um objeto com o total e a listagem dos itens
    test('should return an object with the total and the list of items', () => {
        cart.add({
            product,
            quantity: 2
        });

        //add MaxFloc > 15UN > tot$375
        cart.add({
            product: product2,
            quantity: 4
        });

        //usando método: toMatchInlineSnapshot, ele automaticamente colcoaa aquele JSON ali
        expect(cart.checkout()).toMatchSnapshot()
    })

    //TESTE
    //deve retornar um objeto com o total e a listagem dos itens quando o método somar() é chamado
    test('should return an object with the total and the list of items when sumary() is called', () => {
        cart.add({
            product,
            quantity: 2
        });

        //add MaxFloc > 15UN > tot$375
        cart.add({
            product: product2,
            quantity: 4
        });

        //usando método: toMatchInlineSnapshot, ele automaticamente colcoaa aquele JSON ali
        expect(cart.sumary()).toMatchSnapshot()

        //uso esse método indicando que não me interessa qual for o resultado, eu QUERO que seja MAIOR QUE 0:
        expect(cart.getTotal()).toBeGreaterThan(0)
        
    })

    //TESTE
    //deve resetar o carrinho quando o método checkout for chamado
    test('should reset the cart when checkout() is called', () => {
        cart.add({//add item/produto no carrinho
            product: product2,
            quantity: 4
        });

        cart.checkout()//faço logout

        //espero que pegue o total e esse total seja 0
        expect(cart.getTotal()).toBe(0)
    })
})
