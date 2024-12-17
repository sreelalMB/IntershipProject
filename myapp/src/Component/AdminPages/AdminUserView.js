import React, { useState, useEffect } from 'react'
import axios from 'axios'
function AdminUserView() {
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/viewuser")
            .then((res) => {
                if (res.status == 200) {
                    setUser(res.data)
                }

            })

    })


    const deleteHandler = (id) => {
        axios.delete(`http://localhost:4000/deleteuser/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    alert("User deleted Successfully")
                }
            })
    }
    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    {/* <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label> */}
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                user.map((obj) =>

                                    <tr key={obj._id}>
                                        <th>
                                            {/* <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label> */}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                {/* <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div> */}
                                                <div>
                                                    <div className="font-bold">{obj.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {obj.email}

                                        </td>
                                        <td>{obj.phone}</td>
                                        <th>
                                            <button className="bg-red-400 w-32" onClick={() => { deleteHandler(obj._id) }}>delete</button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminUserView
