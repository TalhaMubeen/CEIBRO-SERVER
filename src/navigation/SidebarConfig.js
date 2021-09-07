
import { FaRegBookmark } from "react-icons/fa";
import { FiFolder, FiSettings } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { MdGroup } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { MdAccountBalance } from "react-icons/md";
import { CgShoppingCart } from "react-icons/cg";

export default [
    {
        title: 'Home',
        icon: <VscHome />,
        path: "home"
    },
    {
        title: 'Folders',
        icon: <FiFolder />,
        path: "folders"
    },
    {
        title: 'Groups',
        icon: <MdGroup />,
        path: "groups"
    },
    {
        title: 'Downloads',
        icon: <HiDownload />,
        path: "downloads"
    },
    {
        title: 'Bookmarks',
        icon: <FaRegBookmark />,
        path: "bookmarks"
    },
    {
        title: 'Settings',
        icon: <FiSettings />,
        path: "settings"
    },
    {
        title: 'Finances',
        icon: <MdAccountBalance />,
        path: "finances"
    },
    {
        title: 'Cart',
        icon: <CgShoppingCart />,
        path: "cart"
    }

]