import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import CreateChildMenuModal from '@/Components/CreateChildMenuModal';
import DeleteMenuModal from '@/Components/DeleteMenuModal';

const MenuTreeItem = ({ menu, level = 0, isLast = false, parentLines = [], expandState, setSelectedItem, parentName=null, selectedItem }) => {
  const hasChildren = menu?.children && menu?.children.length > 0;
  const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);

  const closeCreateMenuModal = () => {
      setShowCreateMenuModal(false);
  };

  const [showCreateMenuModalDelete, setShowCreateMenuModalDelete] = useState(false);

  const closeCreateMenuModalDelete = () => {
      setShowCreateMenuModalDelete(false);
  };

  const [isExpanded, setIsExpanded] = useState(
    () => expandState?.expand === true && hasChildren
  );

  const handleClick = () => {
    var dataSent = menu
    dataSent['level'] = level 
    if(parentName != null) {
      dataSent['parent_name'] = parentName
    }
    setSelectedItem(dataSent)
  }

  useEffect(() => {
    if (expandState && expandState.trigger > 0 && hasChildren) {
      setIsExpanded(expandState.expand);
    }
  }, [expandState, hasChildren]);

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const renderConnectorLines = () => {
    const lines = [];
    parentLines.forEach((shouldDrawLine, i) => {
        if (shouldDrawLine) {
            lines.push(
                <div
                    key={`parent-line-${i}`}
                    className="absolute border-l border-gray-300"
                    style={{
                        left: `${i * 20 + 8}px`,
                        top: 0,
                        height: '100%',
                    }}
                />
            );
        }
    });
    
    if (level > 0) {
      const connectorLeft = `${(level - 1) * 20 + 8}px`;
      const verticalCenter = '14px';
      const connectorWidth = '12px';

      lines.push(
        <div
          key="connector-v"
          className="absolute border-l border-gray-300"
          style={{
            left: connectorLeft,
            top: 0,
            height: isLast ? verticalCenter : '100%',
          }}
        />
      );

      lines.push(
        <div
          key="connector-h"
          className="absolute border-b border-gray-300"
          style={{
            left: connectorLeft,
            top: verticalCenter,
            width: connectorWidth,
          }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="relative">
      {renderConnectorLines()}
      
      <div 
        className="flex items-center py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer relative z-10"
        onClick={() => { toggleExpanded(); handleClick(); }}
        style={{ paddingLeft: `${level * 20 + (level > 0 ? 25 : 5)}px` }}
      >
        <div className="flex items-center min-w-0 flex-1">
          {hasChildren && (
            <div className="flex items-center mr-1 text-gray-500">
              {isExpanded ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronRight size={12} />
              )}
            </div>
          )}
          
          <span className="text-sm text-gray-800 select-none truncate">
            {menu?.name}
          </span>
          {selectedItem?.name === menu?.name ? 
          <>
            <button 
              className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full text-xs"
              onClick={(e) => { e.stopPropagation(); setShowCreateMenuModal(true); }}
              >
              <Plus size={20} className='p-1'></Plus>
              </button> 
                      <button 
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full text-xs"
            onClick={(e) => { e.stopPropagation(); setShowCreateMenuModalDelete(true); }}
            >
            <Trash2 size={20} className="p-1"></Trash2>
            </button> 
          </>
            : ""}

        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {menu?.children.map((child, index) => {
            const isChildLast = index === menu?.children.length - 1;
            const newParentLines = [...parentLines, !isChildLast];
            
            return (
              <MenuTreeItem 
                key={`${child.name}-${index}`} 
                menu={child} 
                level={level + 1}
                isLast={isChildLast}
                parentLines={newParentLines}
                expandState={expandState}
                setSelectedItem={setSelectedItem}
                parentName={menu?.name}
                selectedItem={selectedItem}
              />
            );
          })}
        </div>
      )}
              <CreateChildMenuModal
                  show={showCreateMenuModal}
                  onClose={closeCreateMenuModal}
                  parentId={menu?.id}
              />
              <DeleteMenuModal
                  show={showCreateMenuModalDelete}
                  onClose={closeCreateMenuModalDelete}
                  id={menu?.id}
                  setSelectedItem={setSelectedItem}
              />
    </div>
  );
};

export default function MenuTree ({ menus = [], expandState, setSelectedItem, selectedItem }) {
  return (
    <div className="w-80">
      <div className="p-2">
        {menus.map((menu, index) => (
          <MenuTreeItem 
            key={`${menu?.name}-${index}`} 
            menu={menu}
            isLast={index === menus.length - 1}
            expandState={expandState}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        ))}
      </div>
    </div>
  );
};