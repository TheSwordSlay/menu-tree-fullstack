import { Sidebar, SidebarToggle, useSidebar } from '@/Components/Sidebar';
import { Folder, LayoutGrid } from 'lucide-react';

export default function UserLayout({children, title}) {
    const { isOpen, isMobile, toggle } = useSidebar();

    const menuItems = [
        { icon: Folder, label: 'Systems', isGrouped: true },
        { icon: LayoutGrid, label: 'System Code', isGrouped: true },
        { icon: LayoutGrid, label: 'Properties', isGrouped: true },
        { icon: LayoutGrid, label: 'Menus', href: '/menu', isGrouped: true },
        { icon: LayoutGrid, label: 'APIList', isGrouped: true },
        { icon: Folder, label: 'Users & Group', isGrouped: false },
        { icon: Folder, label: 'Competition', isGrouped: false },
    ].map(item => ({
        ...item,
        active: window.location.pathname === item.href
    }));
    return( 
        <>
            <Sidebar 
                isOpen={isOpen} 
                onToggle={toggle} 
                menuItems={menuItems}
            />
            
            {/* Main Content Container with proper spacing */}
            <div
                className={`transition-all duration-300 min-h-screen ${
                    !isMobile && isOpen ? 'ml-64' : 'ml-0'
                }`}
            >
                <div className={`${isMobile ? 'pt-8' : 'pt-0'}`}>
                    <div className="ml-3 mt-5 flex">
                        <SidebarToggle isOpen={isOpen} onToggle={toggle} isMobile={isMobile} />
                        <Folder size={24} className='my-5 mr-3'></Folder>
                        <h1 className='my-5'> / {title}</h1>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}