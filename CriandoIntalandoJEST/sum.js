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