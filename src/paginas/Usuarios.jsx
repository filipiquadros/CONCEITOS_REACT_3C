import { useEffect,useState } from "react"

export default function Usuarios() {
    const [cont, setCont] = useState(0)

    const aumentar = () => {
        setCont(cont + 1)
    }

    const diminuir = () => {
        setCont(cont - 1)
    }

    useEffect(() => {
        document.title = 'count: ${cont}'
        if(cont > 10) {
            alert('Contador chegou a 10')
        }
        else if(cont === -10) {
            alert('Contador chegou a -10')
        }

    }, [cont])

    return (
        <div>
            <h1>Usuarios</h1>
            {cont}<br />
            <button onClick={() => aumentar()}>Aumentar</button>
            <button onClick={() => diminuir()}>Diminuir</button>
        </div>
    )
}