
export interface TaskCardInterface {
    task: TaskInterface
}

export interface TaskInterface {
    dueDate: string
    assignedTo: string
    title: string
    subTasks: number
    docs: number
    chat: number
    status: string
    owner: string
}
