import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import {PanelLeftOpen, PanelLeftClose, LogOut, UserPen } from 'lucide-react';

const Sidebar = ({ 
  isOpen, 
  onToggle, 
  menuItems = [],
  className = '' 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const menuItemsGrouped = menuItems.filter(item => item.isGrouped === true);
  const menuItemsNonGrouped = menuItems.filter(item => item.isGrouped === false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const closeSidebar = () => {
    if (isMobile && onToggle) {
      onToggle(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen px-5 py-5 bg-transparent text-white transition-transform duration-300 z-40 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
      >
        <div className='h-full bg-[#0051AF] rounded-lg'> 
          {/* Header */}
          <div className="p-6 border-b border-blue-500">
            <div className="flex items-center justify-between">
              <img src="../images/logo.png" alt="Solusi Teknologi Kreatif" className='h-8'/>
              {/* Desktop Close Button */}
              <button
                onClick={() => onToggle && onToggle(!isOpen)}
                className="block p-1 hover:bg-blue-500 rounded"
              >
                <PanelLeftClose size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mx-3 mt-2 rounded-lg flex-1 py-6">
            <ul className="py-3 mb-3 rounded-lg space-y-2 px-4 bg-[#045FC8]">
              {menuItemsGrouped.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.href || '#'}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        closeSidebar();
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active
                          ? 'bg-white bg-white text-black'
                          : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <IconComponent size={20} color={item.active ? '#0051AF' : '#FFFFFF'}/>
                      <span className="font-medium text-sm">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul className="space-y-1 px-4">
              {menuItemsNonGrouped.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.href || '#'}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        closeSidebar();
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active
                          ? 'bg-white bg-white text-black'
                          : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <IconComponent size={20} color={item.active ? '#0051AF' : '#FFFFFF'}/>
                      <span className="font-medium text-sm">{item.label}</span>
                    </a>
                  </li>
                );
              })}
                                <li>
                    <Link
                                href={route('profile.edit')}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        route().current('profile.edit')
                          ? 'bg-white bg-white text-black'
                          : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <UserPen size={20} color={route().current('profile.edit') ? '#0051AF' : '#FFFFFF'}/>
                      <span className="font-medium text-sm">Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      method="post"
                                href={route('logout')}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white
                      `}
                    >
                      <LogOut size={20} color={'#FFFFFF'}/>
                      <span className="font-medium text-sm">LogOut</span>
                    </Link>
                  </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

// Sidebar Toggle Button Component
const SidebarToggle = ({ isOpen, onToggle, isMobile = false }) => {

  return (
    <button
      onClick={() => onToggle && onToggle(!isOpen)}
      className="top-4 left-4 p-2 text-gray-600"
    >
      {isOpen && (!isMobile) ? '' : <PanelLeftOpen size={24}/>}
    </button>
  );
};

// Hook for sidebar state management
const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggle = (state) => {
    if (typeof state === 'boolean') {
      setIsOpen(state);
    } else {
      setIsOpen(prev => !prev);
    }
  };

  return { isOpen, isMobile, toggle };
};

export { Sidebar, SidebarToggle, useSidebar };