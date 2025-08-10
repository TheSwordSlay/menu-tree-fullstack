import { Sidebar, SidebarToggle, useSidebar } from '@/Components/Sidebar';
import { Folder, Settings, LayoutGrid } from 'lucide-react';

export default function UserLayout({children, title}) {
    const { isOpen, isMobile, toggle } = useSidebar();

    const menuItems = [
        { icon: Folder, label: 'Systems', active: false, href: '/dashboard', isGrouped: true },
        { icon: LayoutGrid, label: 'System Code', active: false, href: '/dashboard', isGrouped: true },
        { icon: LayoutGrid, label: 'Properties', active: false, onClick: () => handleProjectClick(), isGrouped: true },
        { icon: LayoutGrid, label: 'Menus', active: true, href: '/settings', isGrouped: true },
        { icon: LayoutGrid, label: 'APIList', active: false, onClick: () => handleProjectClick(), isGrouped: true },
        { icon: Folder, label: 'Users & Group', active: false, href: '/settings', isGrouped: false },
        { icon: Folder, label: 'Competition', active: false, href: '/settings', isGrouped: false },
    ];

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