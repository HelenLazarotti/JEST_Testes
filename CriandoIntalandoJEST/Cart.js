const find = require('lodash/find')
const remove = require('lodash/remove')
const Dinero = require('dinero.js')
const { attempt } = require('lodash')

const calculatePercentageDiscount = (amount, item) => {
    //se meu item tiver condição, % e qtde MAIOR q o míninmo, aplica desconto:
    if(item.condition?.percentage && item.quantity > item.condition.minimun) {
                    
        discount = amount.percentage(item.condition.percentage)
    }

    return Money({ amount: 0})
}

const calculateQuantityDiscount = (amount, item)  => {

    //preciso ver se é par
    const isEven = item.quantity % 2 === 0;

    if(item.condition?.quantity && item.quantity > item.condition.quantity) {
        return amount.percentage(isEven ? 50 : 40)
    }

    return Money ({ amount: 0 })

}

//da biblioteca dinero.js
const Money = Dinero;
Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2

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
        return this.items.reduce((acc, item) => {
            
            //valor atual mais a quantidade dos produtos * o preço dos produtos:
            const amount = Money({amount: item.quantity * item.product.price})

            const discount = calculatePercentageDiscount( amount, item)
            
            return acc.add(amount).subtract(discount)

        }, Money({ amount: 0}))//valor inicial será 0
    }

    //método para somar
    sumary() {
        const total =  this.getTotal().getAmount()//pego $tot
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