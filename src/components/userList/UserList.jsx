import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from '../../store/actions';

import './UserList.css';



const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const isFetching = useSelector((state) => state.isFetching);
    const error = useSelector((state) => state.error);

    useEffect(() => {
        dispatch(fetchUsers);
    }, [dispatch]);

    if (isFetching) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log(users)

    return (<div>UserList</div>);
}

export default UserList;
