import MenuTree from '@/Components/MenuTree';
import React, { useState } from 'react';
import {LayoutGrid, PlusSquare, MinusSquare } from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';

export default function Dashboard(props) {
    const [expandState, setExpandState] = useState({ expand: null, trigger: 0 });

    const handleExpandAll = () => {
        setExpandState({ expand: true, trigger: Date.now() });
    };

    const handleCollapseAll = () => {
        setExpandState({ expand: false, trigger: Date.now() });
    };
    return (
        <UserLayout title="Menus"> 
                <div className="p-4 font-sans min-h-screen">
                    <div className="flex mb-5">
                        <div className="bg-[#0051AF] rounded-full px-3 py-3">
                            <LayoutGrid size={25} color='#FFFFFF'></LayoutGrid>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 my-auto ml-5">Menus</h1>
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
            
            {/* Pass the entire state object down as a prop */}
            <MenuTree menus={props.trees} expandState={expandState} />
        </div>

        </UserLayout>
    );
}
