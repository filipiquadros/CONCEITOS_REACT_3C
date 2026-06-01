import { useState } from "react"

export default function Cadastro({ navegar }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')

    const cadastrar = async () => {
        const resultado = await fetch(
            'http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha, nome })
        }
        )
        const data = await resultado.json()
        console.log(data)
        console.log(resultado.ok);
        if (!resultado.ok) {
            alert(data.erro || "Ocorreu um erro no cadastro")
        } else {
            alert("Parabens você se cadastrou! Fez o Basico")
            navegar('login')
        }
    }

    return (
        <div>
            <h1>CADASTRO</h1>

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

            <h3>{nome}</h3>
            <h3>{email}</h3>
            <h3>{senha}</h3>

            <button onClick={() => cadastrar()}>CADASTRAR</button>
        </div>
    )
}