

export const showList = (todos) => 
    `${todos.map(
        todo => (todo.isCompleted ? 'OK' : 'notOK') + ' ' + todo.name + '\n\n'
    ).join('')}`
