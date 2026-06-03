import { useEffect, useState } from "react"

export default function Usuarios() {
    const [cont, setCont] = useState(0)
    const [usuarios, setUsuarios] = useState([])
    const [modal, setModal] = useState(false)
    const [modaldeletar, setModaldeletar] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [id, setId] = useState(0)

    const aumentar = () => {
        setCont(cont + 1)
    }

    const diminuir = () => {
        setCont(cont - 1)
    }

    useEffect(() => {
        document.title = 'count: ${cont}'
        if (cont > 10) {
            alert('Contador chegou a 10')
        }
        else if (cont === -10) {
            alert('Contador chegou a -10')
        }
    }, [cont])

    useEffect(() => {
        document.title = `count: ${cont}`
        buscarUsuario()
    }, [cont])

    const buscarUsuario = async () => {
            const resposta = await fetch('http://localhost:3000/usuarios')
            const data = await resposta.json()
            console.log(data);
            setUsuarios(data)
        }
    const editar = (usuario) => {
        console.log('editando', usuario);
        setModal(true)
        setNome(usuario.nome)
        setEmail(usuario.email)
        setSenha(usuario.senha)
        setId(usuario.id)
    }

    const confirmarEdicao = async () => {
        const resultado = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json' },
            body: JSON.stringify({nome, email, senha})
        }) 
        const data = resultado.json()
        console.log(data);
        buscarUsuario()
    }
    const deletarusuario = async () => {
        const resultado = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json' },
            body: JSON.stringify({nome, email, senha})
        }) 
        const data = resultado.json()
        console.log(data);
        buscarUsuario()
    }

    return (
        <div>
            <h1>Usuarios</h1>
            {cont}<br />
            <button onClick={() => aumentar()}>Aumentar</button>
            <button onClick={() => diminuir()}>Diminuir</button>

            <br />
            <br />

            <ul>

                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.email},
                        <br />
                        STATUS: {usuario.ativo ? 'Ativo' : 'Desativo'}
                        <br />
                        <button onClick={() => editar(usuario)}>Editar</button>
                    </li>
                ))}

            </ul>
            {modal && (
                <div className="fundo-modal">
                    <div className="modal-content">
                        <h1>Editar</h1>

                        <input type="text"
                            id="nome"
                            value={nome}
                            placeholder="Digite seu nome"
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input type="text"
                            id="email"
                            value={email}
                            placeholder="Digite seu email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="text"
                            id="senha"
                            value={senha}
                            placeholder="Digite sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button onClick={() => {confirmarEdicao(), setModal(false)}}>Confirmar</button>
                        <button onClick={() => setModal(false)}>Fechar</button>
                        <button onClick={() => {setModal(false), setModaldeletar(true)}}>Deletar Usuario</button>
                    </div>
                </div>
                )}
                
            {modaldeletar && (
                <div className="fundo-modal">
                    <div className="modal-content">
                        <h1>Deletar o Usuario {nome} </h1>

                        <button onClick={() => setModaldeletar(false)}></button>
                        <button onClick={() => {deletarusuario(), setModaldeletar(false)}}>Deletar Usuario</button>
                    </div>
                </div>

            )}
        </div>
    )
}