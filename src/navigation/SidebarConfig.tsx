
import { VscHome } from "react-icons/vsc";
import { BsChatSquareDots } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiOutlineFolder } from "react-icons/ai";

export interface SingleConfig {
    title: string
    icon: any
    path: string
    notification: number
    active?: boolean | undefined
}

export interface SidebarConfigInterface {
    [key: string]: SingleConfig
}


const SidebarConfig: SidebarConfigInterface = {
    "Dashboard": {
        title: 'Dashboard',
        icon: <VscHome />,
        path: "dashboard",
        notification: 0,
        active: true
    },
    "Chat": {
        title: 'Chat',
        icon: <BsChatSquareDots />,
        path: "chat",
        notification: 3
    },
    "Tasks": {
        title: 'Tasks',
        icon: <BiTask />,
        path: "tasks",
        notification: 2
    },
    "Projects": {
        title: 'Projects',
        icon: <AiOutlineFolder />,
        path: "projects",
        notification: 0
    }

}

export default SidebarConfig