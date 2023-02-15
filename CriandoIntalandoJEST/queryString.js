module.exports.queryString = (obj) => {

    //se eu quiser procurar cada item do array:
    const entries = Object.entries(obj).map(item => {
       
        return `${item[0]}=${item[1]}=${item[2]}`
        //retorna:
        /*name=Helen&profession=QA */
    })

    return entries.join('&')
    //se eu colocar no lugar do & um * ou qualquer outra coisa, retorna erro, pq lá no test, espero que me retorne um array com o &
};

//REFATORANDO:
module.exports.queryString = obj => 
    Object.entries(obj)
    .map(([key, value]) => {

        //preciso determinar se meu value é um objeto e não um array
        //se o ttipo do value for um objeto E não for um array
        if(typeof value === 'object' && !Array.isArray(value)) {
            //desparo um erro
            throw new Error('Please check your params')
        }

        return `${key}=${value}`
    })
    .join('&')

    //preciso determinar se meu value é um objeto e não um array
    module.exports.parse = string => 
     Object.fromEntries(string.split('&').map(item => {

        let [key, value ] = item.split('=')

        if(value.indexOf(',') > -1) {
            value = value.split(',')
        }
        return [key, value ]
    }))
    
//O método split() divide uma string em um array de strings de acordo com algum separador; por exemplo, o espaço em branco ou algo determinado por uma expressão regular. Além disso, o caractere separador é removido das substrings resultantes no array.