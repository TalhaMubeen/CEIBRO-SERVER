import colors from "../assets/colors";

interface ColorCodes {
    [key: string]: string
}

const colorsByStatus: ColorCodes = {
    all: colors.white,
    ongoing: colors.darkYellow,
    approved: colors.primary,
    completed: colors.mediumGrey,
    draft: colors.lightBlack,
    submitted: colors.aquaGreen,
    rejected: colors.btnRed,
    done: colors.mediumGrey
}

const textColorsByStatus: ColorCodes  = {
    all: colors.black,
    ongoing: colors.white,
    approved: colors.white,
    completed: colors.white,
    draft: colors.white,
    submitted: colors.white,
    rejected: colors.white,
    done: colors.white
}


export function getColorByStatus(status: string ): string {
    return colorsByStatus[status.toLowerCase()]
}

export function getTextColorByStatus(status: string): string {
    return textColorsByStatus[status.toLowerCase()]
}

interface ProjectMenues {
    title: string;
    count: number
}

export function getAllStatus(): ProjectMenues[] {
    return [
        {
            title: 'All',
            count: 3
        },
        {
            title: 'Ongoing',
            count: 1
        },
        {
            title: 'Submitted',
            count: 3
        },
        {
            title: 'Rejected',
            count: 5
        },
        {
            title: 'Approved',
            count: 2
        },
        {
            title: 'Done',
            count: 1
        },
        {
            title: 'Draft',
            count: 1
        }
    ]

}
export function getProjectStatus(): ProjectMenues[] {
    return [
        {
            title: 'All',
            count: 3
        },
        {
            title: 'Ongoing',
            count: 1
        },
        {
            title: 'Approved',
            count: 4
        },
        {
            title: 'Done',
            count: 1
        },
        {
            title: 'Draft',
            count: 1
        }
    ]

}





const projectReduxConfigs = {
    OPEN_DRAWER: 'OPEN_DRAWER',
    CLOSE_DRAWER: 'CLOSE_DRAWER',
    SET_MENUE: 'SET_MENUE'
}

export default projectReduxConfigs