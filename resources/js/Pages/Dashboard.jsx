import MenuTree from '@/Components/MenuTree';
import React, { useState } from 'react';
import { PlusSquare, MinusSquare } from 'lucide-react';

export default function Dashboard(props) {
    const [expandState, setExpandState] = useState({ expand: null, trigger: 0 });

    const handleExpandAll = () => {
        setExpandState({ expand: true, trigger: Date.now() });
    };

    const handleCollapseAll = () => {
        setExpandState({ expand: false, trigger: Date.now() });
    };
    return (
                <div className="p-4 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Menu</h1>
            <div className="mb-4 flex items-center space-x-2">
                <button
                    onClick={handleExpandAll}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
                >
                    <PlusSquare size={16} className="mr-2" />
                    Expand All
                </button>
                <button
                    onClick={handleCollapseAll}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-150 ease-in-out"
                >
                    <MinusSquare size={16} className="mr-2" />
                    Collapse All
                </button>
            </div>
            
            {/* Pass the entire state object down as a prop */}
            <MenuTree menus={props.trees} expandState={expandState} />
        </div>
    );
}
