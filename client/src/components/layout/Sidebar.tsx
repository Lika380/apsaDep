import React from 'react'
import './Sidebar.css'; 


interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    children?: MenuItem[];
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, menuItems }) => {
    const [expandenItems, setExpandedItems] = React.useState<Set<string>>(new Set())

    const toggleItem = (itemId: string) => {
        setExpandedItems(prev => { 
        const newSet = new Set(prev)
        if (newSet.has(itemId)) {
            newSet.delete(itemId)
        } else {
            newSet.add(itemId)
        }
        return newSet;
        })
    }

    const renderMenuItem = (item: MenuItem) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandenItems.has(item.id)

        return (
            <div key={item.id} className='sidebar'>
                <div className={`menu-item-header ${hasChildren ? 'has-children' : ''}`} onClick={() => hasChildren && toggleItem(item.id)}>
                    {item.icon && <span className={`menu-icon ${item.icon}`}></span>}
                    <span className='menu-label'>{item.label}</span>
                    {hasChildren && (
                        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}></span>
                    )}
                </div>
                {hasChildren && isExpanded && (
                    <div>
                        {item.children!.map(child => renderMenuItem(child))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            {isOpen && <div onClick={onClose}></div>}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div>
                    <h2>Меню</h2>
                    <button onClick={onClose}>Закрыть</button>
                </div>
                <nav>
                    {menuItems.map(item => renderMenuItem(item))}
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;