import { Link, useLocation } from "react-router-dom"

import './_GameLayout.scss'

// Icons
import IconList from "../../assets/icons/list.svg"
import IconSearch from "../../assets/icons/search.svg"
import IconMedal from "../../assets/icons/medal.svg"
import IconTeam from "../../assets/icons/team.svg"
import IconCursor from "../../assets/icons/pointer.svg"

// Image
import ImageMbappe from "../../assets/images/mbappe.png"

// Interfaces
interface MenuItem {
    name: string,
    icon: string,
    url: string
}

interface MenuProps {
    items: MenuItem[]
}

const MENU_ITEMS: MenuItem[] = [
    {
        name: "Player List",
        icon: IconList,
        url: '/list'
    },
    {
        name: "Search player",
        icon: IconSearch,
        url: '/search'
    },
    {
        name: "Top players",
        icon: IconMedal,
        url: '/top'
    },
    {
        name: "Top team",
        icon: IconTeam,
        url: '/team'
    }
]

function Menu({ items }: MenuProps) {

    const location = useLocation();

    return (
        <div className="menu">
            <div className="items">
                {items.map((item, index) => {
                    return (
                        <Link to={item.url} className={'item' + (location.pathname === item.url ? ' active' : '')} key={'menu_' + index}>
                            <span className='title'>
                                {item.name}
                            </span>
                            <img className='icon' src={item.icon} alt="" />
                        </Link>
                    )
                })}
            </div>
            <span className="tips">
                <img src={IconCursor} alt="" /> Select the item by clicking
            </span>
        </div>
    )
}

function GameLayout({ children }: any) {


    return (
        <div className="gameLayout">
            <div className="content">
                {children}
            </div>
            <div className='menuOnLayout'>
                <Menu items={MENU_ITEMS} />
            </div>
            <div className='backgroundImage'>
                <img className='mbappe' src={ImageMbappe} alt="" />
            </div>
        </div>
    );
}

export default GameLayout;
