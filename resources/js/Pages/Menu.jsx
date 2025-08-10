import MenuTree from '@/Components/MenuTree';
import InputError from '@/Components/InputError.jsx';
import React, { useState, useRef, useEffect } from 'react';
import {LayoutGrid } from 'lucide-react';
import { useForm, Head } from '@inertiajs/react'
import UserLayout from '@/Layouts/UserLayout';
import CreateMenuModal from '@/Components/CreateMenuModal';

export default function Dashboard(props) {
    const [expandState, setExpandState] = useState({ expand: null, trigger: 0 });
    const [selectedMenu, setSelectedMenu] = useState(props.trees.length > 0 ? [props.trees[0]] : []);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: selectedItem ? selectedItem.id : null,
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('menu.update'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const closeCreateMenuModal = () => {
        setShowCreateMenuModal(false);
    };

    const inputName = useRef(null);

    useEffect(() => {
        if(selectedItem != null) {
            inputName.current.value = selectedItem.name;
            inputName.current.readOnly = false;
        } else {
            inputName.current.value = 'Not Selected';
            inputName.current.readOnly = true;
        }
        setData('id', selectedItem ? selectedItem.id : null)
      }, [selectedItem]);
    useEffect(() => {
        if(selectedMenu.length > 0) {
            var index = props.trees.findIndex(tree => tree.name === selectedMenu[0]?.name);
            if (index === -1) index = 0;
            setSelectedMenu(props.trees.length > 0 ? [props.trees[index]] : [])
        } else {
            if (props.trees.length > 0) {
                setSelectedMenu([props.trees[0]])
            } else {
                setSelectedMenu([])
            }
        }
      }, [props.trees]);

    const handleExpandAll = () => {
        setExpandState({ expand: true, trigger: Date.now() });
    };

    const handleCollapseAll = () => {
        setExpandState({ expand: false, trigger: Date.now() });
    };
    const handleTreeSelect = (event) => {
        const selectedId = event.target.value;
        const selected = props.trees.find(tree => tree.id === selectedId);
        setSelectedMenu(selected ? [selected] : []);
        setSelectedItem(selected)
    };

    return (
        <UserLayout title="Menus"> 
        <Head title="Menu" />
        <div className="p-4 font-sans min-h-screen">
            <div className="flex mb-5">
                <div className="bg-[#0051AF] rounded-full px-3 py-3">
                    <LayoutGrid size={25} color='#FFFFFF'></LayoutGrid>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 my-auto ml-5">Menus</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="mb-4">
                        <p className='text-gray-500'>Menu</p>
                        <select 
                            onChange={handleTreeSelect} 
                            value={selectedMenu?.length > 0 ? selectedMenu[0]?.id : ''}
                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            {props.trees.length > 0 ? props.trees.map(menu => (
                                <option key={menu?.id} value={menu?.id}>{menu?.name}</option>
                            )): <option>No menu created yet</option>}

                        </select>
                    </div>
                    <div className="mb-4 flex items-center space-x-2">
                        <button
                            onClick={handleExpandAll}
                            className="flex items-center px-3 py-2 bg-black text-white text-sm font-medium rounded-full shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-150 ease-in-out"
                        >
                            Expand All
                        </button>
                        <button
                            onClick={handleCollapseAll}
                            className="flex items-center px-3 py-2 bg-white text-gray-800 border border-gray-300 text-sm font-medium rounded-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-150 ease-in-out"
                        >
                            Collapse All
                        </button>
                    </div>
                    
                    <MenuTree menus={selectedMenu} expandState={expandState} setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
                    <button
                        className="w-full h-11 text-center bg-[#0051AF] text-white text-sm font-medium rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0051AF] transition-all duration-150 ease-in-out"
                        onClick={() => setShowCreateMenuModal(true)}
                    >
                        Create new menu
                    </button>
                </div>
                <div>
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <p className='text-gray-500'>Menu ID</p>
                            <input 
                                onChange={(e) => setData('id', e.target.value)}
                                name='id'
                                type="text" 
                                value={selectedItem ? selectedItem.id : 'Not Selected'} 
                                readOnly 
                                className="block w-full mt-1 rounded-md border-white shadow-sm bg-gray-50
                                text-gray-500"
                            />
                            <InputError message={errors.id ? "You need to select a menu first" : null} className="mt-2" />
                            <p className='text-gray-500 mt-5'>Depth</p>
                            <input 
                                type="text" 
                                value={selectedItem ? selectedItem.level : 'Not Selected'} 
                                readOnly 
                                className="block w-full mt-1 rounded-md border-white shadow-sm bg-gray-200
                                text-gray-500"
                            />
                            <p className='text-gray-500 mt-5'>Parent</p>
                            <input 
                                type="text" 
                                value={selectedItem && selectedItem.parent_name ? selectedItem.parent_name : 'Does not exist'} 
                                readOnly 
                                className="block w-full mt-1 rounded-md border-white shadow-sm bg-gray-100
                                text-black"
                            />
                            <p className='text-gray-500 mt-5'>Name</p>
                            <input
                                ref={inputName}
                                onChange={(e) => setData('name', e.target.value)} 
                                name='name'
                                type="text" 
                                defaultValue={selectedItem ? selectedItem.name : 'Not Selected'}  
                                className="block w-full mt-1 rounded-md border-white shadow-sm bg-gray-100 text-black"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                            <button    
                                className="w-full h-11 text-center bg-[#0051AF] text-white text-sm font-medium rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0051AF] transition-all duration-150 ease-in-out"
                            >
                                Save
                            </button>

                    </form>
                </div>
            </div>
        </div>

        <CreateMenuModal
            show={showCreateMenuModal}
            onClose={closeCreateMenuModal}
        />
        </UserLayout>
    );
}
