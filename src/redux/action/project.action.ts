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
    }
}

export default projectActions