import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/actions/userActions';
import UserCard from '../UserCard/UserCard';
import { prepareUserData } from './helpers';

import './UserList.css';



const UserList = () => {
    const dispatch = useDispatch();
    const userData = useSelector(({ users }) => ({ data: users.data, isLoading: users.isLoading, error: users.error }));
    const { data: users, isLoading, error } = userData;


    useEffect(() => {
        if (!users.length) {
            dispatch(getUsers());
        }
    }, [dispatch, users.length]);


    const memoizedUsers = useMemo(() => prepareUserData(users), [users]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    console.log(memoizedUsers)

    return (<div className="user-list">
        {memoizedUsers && memoizedUsers.map((user) => {

            console.log(user)
            return <UserCard key={user.id} {...user} />
        }
        )}
    </div>);
}

export default UserList;
