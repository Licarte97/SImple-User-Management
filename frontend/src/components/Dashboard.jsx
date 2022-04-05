import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


export default function Dashboard() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [addUserForm, setAddUserForm] = useState({ firstname: "", lastname: "", username: "" });
    const [updateUserForm, setUpdateUserForm] = useState({ firstname: "", lastname: "", username: "", password: "" });
    const [modalContentType, setModalContentType] = useState(null);


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users")
            if (response.data.length >= 1) {
                setUsers(response.data);
            }
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("axios error", error);
            } else {
                console.error(error);
            }
        }
    }

    const addUser = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/users", {
                firstname: 'test1',
                lastname: 'test1',
                username: 'test1',
                password: 'test1',
            })
            console.info({ response });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("axios error", error);
            } else {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users", {
                firstname: addUserForm.firstname,
                lastname: addUserForm.lastname,
                username: addUserForm.username,
                password: addUserForm.password,
            })
            console.info({ response });
            getUsers(); //refetch users
            closeModal();
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("axios error", error);
            } else {
                console.error(error);
            }
        }

    }

    const handleInput = (type, e) => {
        console.info({ type, value: e.target.value });
        if (e.target.value) {
            switch (modalContentType.type) {
                case "add":
                    setAddUserForm({
                        ...addUserForm,
                        [`${type}`]: e.target.value
                    })
                    break;
                case "update":
                    setUpdateUserForm({
                        ...updateUserForm,
                        [`${type}`]: e.target.value
                    })
                    break;
                default:
                    return
            }

        }
    }

    const handleDelete = async (userId) => {
        console.log({ userId })
        if (userId) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/users/${userId}`)
                getUsers();
                console.info({ response });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("axios error", error);
                } else {
                    console.error(error);
                }
            }
        }
    }

    const handleUpdate = async (e, user) => {
        e.preventDefault();
        if (user && typeof user === "object") {
            const updateObject = {
                username: user.hasOwnProperty('username') ? user.username !== "" ? user.username : null : null,
                firstname: user.hasOwnProperty('firstname') ? user.firstname !== "" ? user.firstname : null : null,
                lastname: user.hasOwnProperty('lastname') ? user.lastname !== "" ? user.lastname : null : null,
                password: user.hasOwnProperty('password') ? user.password !== "" ? user.password : null : null,
            };

            //check and verify if password is being change
            if (user.hasOwnProperty('password')) {
                if (user.password !== user.password2) {
                    return alert("password entered does not match");
                }
            }

            for (const [key, value] of Object.entries(updateObject)) { //delete null values to remove them in the query
                if (value === null) delete updateObject[key];
            }
            console.log({ user, updateObject });

            const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, updateObject)
            console.info({ response });
            getUsers(); //refetch users
        }
        closeModal();
    }

    const handleModalContent = () => {
        console.log({ modalContentType })
        if (!modalContentType) {
            return null;
        }
        switch (modalContentType.type) {
            case "add":
                return <div>
                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                    <div>
                        <div style={{ display: "inline-block" }}>
                            <h2>Add User</h2>
                        </div>
                        <div style={{ display: "inline-block", float: "right" }}>
                            <button onClick={closeModal}>close</button>
                        </div>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Firstname</label>
                            <input type="text" className="form-control" onChange={(e) => handleInput("firstname", e)} placeholder="Enter first name" defaultValue={addUserForm.firstname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Lastname</label>
                            <input type="text" className="form-control" onChange={(e) => handleInput("lastname", e)} placeholder="Enter last name" defaultValue={addUserForm.lastname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" onChange={(e) => handleInput("username", e)} placeholder="Enter username" defaultValue={addUserForm.username} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleInput("hakdog", e)} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => handleAddUser(e)}>Submit</button>
                    </form>
                </div>
            case "update":
                return <div>
                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                    <div>
                        <div style={{ display: "inline-block" }}>
                            <h2>Update User</h2>
                        </div>
                        <div style={{ display: "inline-block", float: "right" }}>
                            <button onClick={closeModal}>close</button>
                        </div>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Firstname</label>
                            <input type="text" className="form-control" onChange={(e) => handleInput("firstname", e)} placeholder="Enter first name" defaultValue={modalContentType.data.firstname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Lastname</label>
                            <input type="text" className="form-control" onChange={(e) => handleInput("lastname", e)} placeholder="Enter last name" defaultValue={modalContentType.data.lastname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" onChange={(e) => handleInput("username", e)} placeholder="Enter username" defaultValue={modalContentType.data.username} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleInput("password", e)} placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Repeat Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => handleInput("password2", e)} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => handleUpdate(e, { id: modalContentType.data._id, ...updateUserForm })}>Update</button>
                    </form>
                </div>
            default:
                break;
        }
    }

    return (
        <div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length !== 0 &&
                        users.map((user, index) => {
                            return <>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstname} </td>
                                    <td>{user.lastname}</td>
                                    <td>
                                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                                        <button onClick={() => {
                                            setUpdateUserForm({ firstname: "", lastname: "", username: "" });  //RESET UPDATE FORM
                                            setModalContentType({ type: "update", data: user });
                                            openModal();
                                        }}>Update</button>
                                    </td>
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </table>

            {/* ADD USER BUTTON */}
            <div>
                <button onClick={() => {
                    setModalContentType({ type: "add", data: {} });
                    openModal();
                }}>Add User</button>
            </div>

            {/* MODAL */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {handleModalContent()}
            </Modal>
        </div>
    )
}
