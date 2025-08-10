import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MenuTree from '@/Components/MenuTree';

export default function Dashboard(props) {
    return (
        <MenuTree menus={props.trees}></MenuTree>
    );
}
