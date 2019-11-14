const {obterPessoas} = require('./service')



Array.prototype.meuFilter = function(callback){
    for(item in this){
        const result = callback(item, this)
        return result
    }
}



async function main(){
    try {
        const { 
            results
        } = await obterPessoas(`a`)

        const familiaLars =  results.filter(function(item){

            //por padrão precisa retornar um booleano
            //para informar se deve manter ou remover da lista
            //false -> remove da lista
            //true > mantem
            //não encontrou = -1
            //encontrou = posicaoNoArray

            const result = item.name.toLowerCase().contains(`lars`) !== -1
            return result;
        })

        const names = familiaLars.map(pessoa => pessoa.name)
        console.log(names)


    } catch (error) {
        console.error('DEU RUIM', error )
    }
}

main()