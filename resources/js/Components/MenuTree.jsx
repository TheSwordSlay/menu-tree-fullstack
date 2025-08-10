import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MenuTreeItem = ({ menu, level = 0, isLast = false, parentLines = [], expandState }) => {
  const hasChildren = menu.children && menu.children.length > 0;

  // --- THIS IS THE FIX ---
  // Initialize the state based on the incoming expandState prop.
  // If the 'expand' signal is true when this component is first rendered,
  // it will start as expanded, instead of waiting for the useEffect hook.
  const [isExpanded, setIsExpanded] = useState(
    () => expandState?.expand === true && hasChildren
  );

  // The useEffect is still needed to handle changes, like the "Collapse All" signal,
  // for components that are already visible on the screen.
  useEffect(() => {
    if (expandState && expandState.trigger > 0 && hasChildren) {
      setIsExpanded(expandState.expand);
    }
  }, [expandState, hasChildren]);

  const toggleExpanded = () => {
    console.log(level);
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
        onClick={toggleExpanded}
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
                expandState={expandState}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function MenuTree ({ menus = [], expandState }) {
  return (
    <div className="w-80 bg-white border border-gray-200 rounded-sm shadow-sm">
      <div className="p-2">
        {menus.map((menu, index) => (
          <MenuTreeItem 
            key={`${menu.name}-${index}`} 
            menu={menu}
            isLast={index === menus.length - 1}
            expandState={expandState}
          />
        ))}
      </div>
    </div>
  );
};