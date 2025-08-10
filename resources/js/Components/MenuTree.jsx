import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MenuTreeItem = ({ menu, level = 0, isLast = false, parentLines = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = menu.children && menu.children.length > 0;

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const renderConnectorLines = () => {
    const lines = [];
    
    if (level > 0) {
      const connectorLeft = `${(level - 1) * 20 + 8}px`;
      
      // This is the vertical center of your row. 
      // A row with text-sm and py-1 is ~28px tall, so the center is at 14px.
      // You can adjust this value slightly if needed.
      const verticalCenter = '14px'; 
      
      const connectorWidth = '12px';

      // 1. The vertical part of the 'L' or 'T' shape
      lines.push(
        <div
          key="connector-v"
          className="absolute border-l border-gray-300"
          style={{
            left: connectorLeft,
            top: 0,
            // If it's the last item, the line stops at the center (└).
            // Otherwise, it continues down through the whole item (├).
            height: isLast ? verticalCenter : '100%',
          }}
        />
      );

      // 2. The horizontal part of the connector
      lines.push(
        <div
          key="connector-h"
          className="absolute border-b border-gray-300"
          style={{
            left: connectorLeft,
            top: verticalCenter, // Position it exactly at the vertical center
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
        className="flex items-center py-1 px-2 hover:bg-gray-50 cursor-pointer relative z-10"
        onClick={toggleExpanded}
        style={{ paddingLeft: `${level * 20 + (level > 0 ? 25 : 5)}px` }}
      >
        <div className="flex items-center min-w-0 flex-1">
          {hasChildren && (
            <div className="flex items-center mr-1">
              {isExpanded ? (
                <ChevronDown size={12} className="text-gray-600" />
              ) : (
                <ChevronRight size={12} className="text-gray-600" />
              )}
            </div>
          )}
          
          <span className="text-sm text-gray-800 select-none">
            {menu.name}
          </span>
        </div>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {menu.children.map((child, index) => {
            const isChildLast = index === menu.children.length - 1;
            const newParentLines = [...parentLines, !isChildLast];
            
            return (
              <MenuTreeItem 
                key={`${child.name}-${index}`} 
                menu={child} 
                level={level + 1}
                isLast={isChildLast}
                parentLines={newParentLines}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function MenuTree ({ menus = [] }) {
  return (
    <div className="w-80 bg-white border border-gray-200 rounded-sm shadow-sm">
      <div className="p-2">
        {menus.map((menu, index) => (
          <MenuTreeItem 
            key={`${menu.name}-${index}`} 
            menu={menu}
            isLast={index === menus.length - 1}
          />
        ))}
      </div>
    </div>
  );
};