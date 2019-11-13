/*
0 - Obter um usuario
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        }), 1000
    })
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '21977777777',
            ddd: 21
        })
    }, 2000);

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


//const usuario = obterUsuario()
//const telefone = obterTelefone(usuario.id)
//const endereco = obterEndereco(usuario.id)

//console.log('usuario', usuario)
//console.log('telefone', telefone)