/*
0 - Obter um usuario
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback) {

    // quando der algum problema -> reject(erro)
    //quando for sucesso  -> resolve
    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function () {

            //return reject( new Error('deu ruim de verdade.'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            }), 1000
        })
    })
}

function obterTelefone(idUsuario, callback) {

    return new Promise(function resolvePromise(resolve, reject){

        setTimeout(() => {
            return resolve({
                telefone: '21977777777',
                ddd: 21
            })
        }, 2000);
    })   
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)


}

function resolverUsuario(error, usuario) {
    console.log('usuario', usuario)
}

const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function (usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco
                .then(function resolverEndereco(result){
                    return {
                    usuario: resultado.usuario, 
                    telefone: resultado.telefone,
                    endereco: result
                    }
                });
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function(error){
        console.error('Deu ruim', error)
    })



/*
obterUsuario(function resolverUsuario(error, usuario) {
    if (error) {
        console.log('Deu ruim em USUARIO', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if (error1) {
            console.log('Deu ruim em Telefone', error1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.log('Deu ruim em endereco', error2)
                return;
            }
            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })


})

*/
//const usuario = obterUsuario()
//const telefone = obterTelefone(usuario.id)
//const endereco = obterEndereco(usuario.id)

//console.log('usuario', usuario)
//console.log('telefone', telefone)