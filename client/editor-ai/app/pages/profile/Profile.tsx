import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';


const Profile = () => {
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const { user,updateUser } = useAuth();
    const email = user?.email as string;
    const currentDisplayName = user?.displayName as string;

    const [updateError, setUpdateError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDisplayName = e.target.value;
        setDisplayName(newDisplayName);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (displayName === '' || password === '') {
            setUpdateError(true);
            setUpdateError(true);
            setUpdateSuccess(false);

        }
        else if (password.length < 6) {
            setPasswordError(true);
            setUpdateError(true);
            setUpdateSuccess(false);
            setUpdateError(false);



        }
        else if (displayName === currentDisplayName) {
            setUserNameError(true);
            setUpdateError(true);
            setUpdateSuccess(false);
            setUpdateError(false);


        }
        else {
            setUpdateError(false);
            setPasswordError(false);
            setUserNameError(false);
            setUpdateSuccess(true);

            updateUser(displayName, password);


            
        }
    };

    return (
        <div >
            <div className="text-center p-10 pt-15 bg-brand-tan min-h-screen" >

            <h1 className="text-2xl font-bold font-newsreader">Update Profile</h1>
            {updateError && <p className="text-red-500">Please fill out all fields</p>}
            {updateSuccess && <p className="text-green-500">Profile updated successfully</p>}
            <div className="mx-auto max-w-md mt-10 border-4 rounded-xl">
            <form onSubmit={handleSubmit}>
                <div className="mb-10 mt-10">
                    <label htmlFor="displayName" className="mb-3 block font-medium font-newsreader text-left">Email:</label>
                    <input
                        type="text"
                        id="displayName"
                        value={email}
                        disabled
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3"

                    />
                </div>
                {userNameError && <p className="text-red-500">New display name is the same as the current one</p>}
                <div className="mt-10">
                    <label htmlFor="displayName" className="mb-3  block font-medium font-newsreader text-left">Display Name:</label>
                    <input
                        type="text"
                        id="displayName"
                        placeholder={currentDisplayName}
                        onChange={handleDisplayNameChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3"

                    />
                </div>
                {passwordError && <p className="text-red-500">Password must be at least 6 characters</p>}
                <div className="mt-10">
                    <label htmlFor="password" className="mb-3  block font-medium font-newsreader text-left">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-3"

                    />
                </div>
                <button
                    type="submit"
                    className="mt-10 mb-6 shadow-md text-white bg-brand-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
                >
                    Update Profile
                </button>

            </form>
            </div>
            </div>
            

        </div>
    );
};

export default Profile;