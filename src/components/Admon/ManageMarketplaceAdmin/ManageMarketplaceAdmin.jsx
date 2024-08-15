import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Modal, Spinner } from 'react-bootstrap'
import { onCreateUser, onUpdateUser, onDeleteUser } from 'graphql/subscriptions'
import { deleteUser } from 'graphql/mutations'

const listUsers = /* GraphQL */ `
query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      role
      email
      marketplace
    }
    nextToken
    __typename
  }
}
`;
const initialState = { username: '', email: '', marketplace: 'suan' }

export default function ManageMarketplaceAdmin() {
  const [listUsersAdmin, setListUserItems] = useState([])
  const [newAdmin, setNewAdmin] = useState(initialState)
  const [userToDelete, setUserToDelete] = useState(null)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  useEffect(() => {
    loadAdmins()
    const createUserListener = API.graphql(graphqlOperation(onCreateUser)).subscribe({
      next: () => loadAdmins(),
    })

    const updateUserListener = API.graphql(graphqlOperation(onUpdateUser)).subscribe({
      next: () => loadAdmins(),
    })

    const deleteUserListener = API.graphql(graphqlOperation(onDeleteUser)).subscribe({
      next: () => loadAdmins(),
    })
    // Clean up the subscriptions on component unmount
    return () => {
      createUserListener.unsubscribe()
      updateUserListener.unsubscribe()
      deleteUserListener.unsubscribe()
    }
  }, [])

  const loadAdmins = async () => {
    API.graphql(graphqlOperation(listUsers, { filter: {  role: { eq: "admon" } }})).then(data=>{
        const admins = data.data.listUsers.items.filter(item => item.marketplace)
        setListUserItems(admins)
        console.log(admins)
    })
  }

  const handleOnChangeInputForm = async (event) => {
    const { name, value } = event.target
    setNewAdmin(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const toDeleteUser = (user) => {
    setUserToDelete(user)
    setShowModalDelete(true)
  }

  const confirmDeleteUser = async () => {
    if (userToDelete) {
        setLoadingDelete(true)
      try {
        await API.graphql(graphqlOperation(deleteUser, { input: { id: userToDelete.id } }))
        setUserToDelete(null)
        setShowModalDelete(false)
        setLoadingDelete(false)
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  const confirmCreateUser = async () => {
    setLoadingCreate(true)
    const endpoint = 'https://vhal4tf7id.execute-api.us-east-1.amazonaws.com/create-admin-marketplace';
    const data = {
        "username": newAdmin.username,
        "marketplace-name": newAdmin.marketplace,
        "email": newAdmin.email,
        "env": process.env.REACT_APP_ENV.toLocaleLowerCase()
    };

    fetch(endpoint, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // El cuerpo de la petición
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    .finally(() =>{ 
        setShowModalCreate(false)
        setNewAdmin(initialState)
        setLoadingCreate(false)
    })
  }
  return (
    <div className="container mx-auto ">
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm mb-4">
          <h4 className="text-lg">Crear administrador de marketplace</h4>
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="formGridUsername" className="block font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={newAdmin.username}
                onChange={handleOnChangeInputForm}
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="formGridEmail" className="block font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={newAdmin.email}
                onChange={handleOnChangeInputForm}
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
                <label
                htmlFor="marketplace"
                className="block font-semibold"
                >
                Marketplace
                </label>
                <select
                id="marketplace"
                name="marketplace"
                value={newAdmin.marketplace}
                onChange={handleOnChangeInputForm}
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                >
                <option value="suan">Suan</option>
                <option value="terrasacha">Terrasacha</option>
                <option value="cauca">Cauca</option>
                </select>
            </div>
            <button
              type="button"
              onClick={() => setShowModalCreate(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear
            </button>
          </form>
        </div>
        {listUsersAdmin.length > 0 && (
            <div className="container mx-auto mt-8 bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 className="text-lg font-semibold mb-4">Listado de administradores</h4>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Marketplace</th>
                    <th className="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {listUsersAdmin.map((admin) => (
                    <tr key={admin.id}>
                      <td className="border px-4 py-2">{admin.name}</td>
                      <td className="border px-4 py-2">{admin.email}</td>
                      <td className="border px-4 py-2">{admin.marketplace}</td>
                      <td className="border px-4 py-2">
                        <button
                          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                          onClick={() =>
                            toDeleteUser({
                              id: admin.id,
                              username: admin.name,
                            })
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {showModalDelete && <Modal
          show={showModalDelete}
          onHide={() => setShowModalDelete(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`¿Estás seguro que quieres borrar el usuario ${userToDelete.username}?`}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setShowModalDelete(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => confirmDeleteUser()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {loadingDelete && <Spinner animation="border" size="sm" style={{marginRight: ".5rem"}}/>}
              Delete
            </button>
          </Modal.Footer>
        </Modal>}
        {showModalCreate && <Modal
          show={showModalCreate}
          size='lg'
          onHide={() => setShowModalCreate(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar datos del nuevo Administrador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Marketplace</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                    {newAdmin.username}
                  </td>
                  <td className="border px-4 py-2">
                    {newAdmin.email}
                  </td>
                  <td className="border px-4 py-2">
                    {newAdmin.marketplace}
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setShowModalCreate(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => confirmCreateUser()}
              className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
            {loadingCreate && <Spinner animation="border" size="sm" style={{marginRight: ".5rem"}}/>}
              Confirmar
            </button>
          </Modal.Footer>
        </Modal>}
      </div>
  )
}