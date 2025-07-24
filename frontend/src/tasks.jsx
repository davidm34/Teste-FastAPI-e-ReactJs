import React, { useState } from 'react'; // Importamos useState
import './tasks.css'; // Importa o arquivo CSS

const App = () => {
    // 1. Estado para armazenar a lista de tarefas
    // tasks é o array atual, setTasks é a função para atualizá-lo
    const [tasks, setTasks] = useState([]);

    // 2. Estado para armazenar o texto do input
    // newTaskText é o valor atual do input, setNewTaskText é a função para atualizá-lo
    const [newTaskText, setNewTaskText] = useState('');

    // Função para adicionar uma nova tarefa
    const addTask = () => {
        const trimmedTaskText = newTaskText.trim();

        if (trimmedTaskText === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }

        // Adiciona a nova tarefa ao estado 'tasks'
        // Criamos um novo array para não mutar o estado diretamente
        setTasks([...tasks, trimmedTaskText]);

        // Limpa o input após adicionar a tarefa
        setNewTaskText('');
    };

    // Função para remover uma tarefa
    const removeTask = (indexToRemove) => {
        // Filtra a lista para remover a tarefa no índice especificado
        // Retorna um novo array sem o item que queremos remover
        setTasks(tasks.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="container"> {/* Use className em vez de class */}
            <h2>✅ Minhas Tarefas Diárias</h2>
            <div className="input-group">
                {/* 3. O input é um "componente controlado" pelo estado newTaskText */}
                <input
                    type="text"
                    id="task-input" // O ID ainda pode ser útil para labels ou automação de testes
                    placeholder="Adicionar nova tarefa..."
                    required
                    value={newTaskText} // O valor do input é controlado pelo estado
                    onChange={(e) => setNewTaskText(e.target.value)} // Atualiza o estado quando o input muda
                    onKeyPress={(e) => { // Adiciona tarefa ao pressionar Enter
                        if (e.key === 'Enter') {
                            addTask();
                        }
                    }}
                />
                <button id="add-task-btn" onClick={addTask}> {/* 4. Evento onClick direto no botão */}
                    Adicionar
                </button>
            </div>
            <ul id="task-list" className="task-list">
                {/* 5. Mapeia o array de tarefas para renderizar os itens da lista */}
                {tasks.map((task, index) => (
                    <li key={index} className="task-item"> {/* key é importante para performance do React */}
                        <span className="task-text">{task}</span>
                        <button
                            className="task-remove-btn"
                            onClick={() => removeTask(index)} // Chama removeTask com o índice do item
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;