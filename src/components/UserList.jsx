import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../redux/store';
import { fetchUsers } from '../redux/actions/users';
import { useEffect } from "react";

function UserList() {
    // const { data, isLoading, error } = useSelector((state) => state.users)
    // const dispatch = useDispatch()
    //
    // useEffect(() => {
    //     dispatch(fetchUsers())
    // }, [])
    //
    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    //
    // if (error) {
    //     return <div>Error: {error}</div>
    // }

    return (
        <>
            <div>Пользователи</div>
            {/*<ul>*/}
            {/*    {data.map((user) => (*/}
            {/*        <li key={user.id}>{user.name}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </>
    )
}

// export const getServerSideProps = wrapper.getStaticProps(async ({ store }) => {
//     await store.dispatch(fetchUsers())
// })

export default UserList