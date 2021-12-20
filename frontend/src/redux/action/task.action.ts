import configs from "../../config/task.config"

const taskActions = {
    openDrawer: () => {
        return {
                type: configs.OPEN_TASK_DRAWER
            }
    },
    closeDrawer: () => {
        return {
            type: configs.CLOSE_TASK_DRAWER
        }
    },
    setMenue: (id: number) => {
        return {
            type: configs.SET_MENUE,
            payload: id
        }
    }
}

export default taskActions