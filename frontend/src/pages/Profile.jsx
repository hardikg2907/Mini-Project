import { useAuthContext } from "../context/AuthContext";

export const Profile = () => {

    const {user} = useAuthContext()

    return (
        <div className='pageHeader'>
            <div className='permHeader'><h2>Profile</h2></div>
            <h3>Name: </h3>
            <p>{user.title}</p>
        </div>
    );
}