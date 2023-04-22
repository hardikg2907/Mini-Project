import { useAuthContext } from "../context/AuthContext";
import { ProfileCard } from "../components/ProfileCard";

export const Profile = () => {

    const {user} = useAuthContext()

    return (
        <div className='pageHeader'>
            <div className='permHeader'><h2>Profile</h2></div>
            <div>
                <ProfileCard/>
            </div>
        </div>
    );
}