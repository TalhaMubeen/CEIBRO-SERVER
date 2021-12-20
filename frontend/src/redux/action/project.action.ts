import configs from "../../config/project.config"

const projectActions = {
    openDrawer: () => {
        return {
                type: configs.OPEN_DRAWER
            }
    },
    closeDrawer: () => {
        return {
            type: configs.CLOSE_DRAWER
        }
    },
    setMenue: (id: number) => {
        return {
            type: configs.SET_MENUE,
            payload: id
        }
    }
}

export default projectActions