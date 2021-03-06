import {useState} from 'react';
import Router from "next/router";
import Link from "next/link";
import Cookie from 'js-cookie';

import exams from '../api/exams';

const UsersList = ({users, auth}) => {

    const renderUsers = () => users.filter(user => user.rote === 'student').map(user => {
        const [error, setError] = useState('');
        return (
            <div className="list-card" key={user._id}>
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>Roles</td>
                        <td>{user.roles.join(', ')}</td>
                    </tr>
                    </tbody>
                </table>
                <Link href={`/edituser/${user._id}`}>
                    <a className="list-edit">Edit</a>
                </Link>
                <button className="list-delete" onClick={() => {
                    exams.delete(`/users/${user._id}`, {
                        headers: {
                            authorization: `Bearer ${Cookie.get('jwtClient')}`
                        }
                    }).then(res => {
                        setTimeout(() => Router.push('/dashboard'), 10);
                    }).catch(err => {
                        setError(err.response.data.message);
                    });
                }}>Delete
                </button>
                <div className="error">{error}</div>
            </div>
        )
    });

    return (
        <div className="list-container">
            <h1>Users</h1>
            {renderUsers()}
        </div>
    );
};

export default UsersList;