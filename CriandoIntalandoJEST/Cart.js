const find = require('lodash/find')
const remove = require('lodash/remove')

class Cart {

    items = [] //array pra onde vai meus produtos

    add(item) { //add item no array

        //chamo aqui fora p quando produto que é igual ao meu item produto:
        let findItem = { product: item.product }

        //encontra no meu array
        if(find(this.items, findItem)) {

            //se encontrar, remove
            remove(this.items, findItem)
        }

        this.items.push(item)
    }

    //remove produto
    remove(product) {//remover item do array

        //pega meu array e remove o produto
        remove(this.items, {product})
    }

    getTotal() {
        //qnd tenho um array e quero calcular um n° int que depende de cada elemento do array, usamos REDUCE

        //REDUCE passa como 1° param: o 0 ali, seguindo um loop, assim usamos o acc(accumulator)
        return this.items.reduce((acc, item) => {

            //retorno valor atual mais a quantidade dos produtos * o preço dos produtos:
            return acc + item.quantity * item.product.price

        }, 0)//valor inicial será 0
    }

    //método para somar
    sumary() {
        const total =  this.getTotal()//pego $tot
        const items = this.items//e itens do array

        return {
            total,
            items,
        }
    }

    //logout do usuário
    checkout() {
        const { total, items } = this.sumary()//digo q essas vars são resultado da minha soma e
        this.items = [] //quero que quando invocar esse método ele se torne um array vazio

        return {
            total,
            items,
        }
    }
    
}

module.exports = Cart