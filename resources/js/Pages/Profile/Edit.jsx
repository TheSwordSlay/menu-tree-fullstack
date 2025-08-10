import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UserLayout from '@/Layouts/UserLayout';
import { UserPen } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <UserLayout title="Profile"
        >
            <Head title="Profile" />
                        <div className="flex ml-5 mb-5">
                <div className="bg-[#0051AF] rounded-full px-3 py-3">
                    <UserPen size={25} color='#FFFFFF'></UserPen>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 my-auto ml-5">Profile</h1>
            </div>
            <div className="pb-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
