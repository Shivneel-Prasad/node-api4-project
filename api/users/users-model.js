const { nanoid } = require('nanoid')

function getId() {
  return nanoid().slice(0, 5)
}

const initialUsers = () => ([
    { id: getId(), username: 'John-Doe', password: 'Husband123' },
    { id: getId(), username: 'Jane-Doe', password: 'Wife345' },
    { id: getId(), username: 'Johnny-Doe', password: 'Son678' },
    { id: getId(), username: 'Jamie-Doe', password: 'Daughter901' },
])

let users = initialUsers()

const findAll = () => {
    return Promise.resolve(users)
}

const findById = id => {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find(info => info.id === id)
    return Promise.resolve(user)
}

const add = ({ username, password }) => {
    // INSERT INTO users (username, password) 
    const newUser = { id: getId(), username, password }
    users.push(newUser)
    return Promise.resolve(newUser)
}
  
const remove = id => {
    // DELETE FROM users WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)
  
    users = users.filter(info => info.id !== id)
    return Promise.resolve(user)
}

module.exports = {
    findAll,
    findById,
    add,
    remove,
}