enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
}

type TUser = {
    userId: string;
    userName: string;
    userEmail: string;
    userPassword: string;
}

type TBoard = {
    boardId: string;
    boardTitle: string;
    boardDescription?: string;
}

type TColumn = {
    columnId: string;
    boardId: string;
    columnTitle: string;
}

type TTask = {
    taskId: string;
    columnId: string;
    taskTitle: string;
    taskDescription?: string;
    dueDate?: Date;
    priority?: Priority;
}

type TUserActions = {

}

type TTaskActions = {
    addTask: (columnId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority) => void;
    deleteTask: (taskId: string) => void;
    editTask: (taskId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority) => void;
}

type TColumnActions = {
    addColumn: (boardId: string, columnTitle: string) => void;
    deleteColumn: (columnId: string) => void;
    editColumn: (columnId: string, columnTitle: string) => void;
    dragColumn: (columnId: string | null) => void;
}

type TBoardActions = {
    addBoard: (boardTitle: string, boardDescription?: string) => void;
    deleteBoard: (boardId: string) => void;
    editBoard: (boardId: string, boardTitle: string, boardDescription?: string) => void;
    setSearchTerm: (term: string) => void;
}

type TTaskState = {
    tasks: TTask[];
}
type TColumnState = {
    columns: TColumn[];
    draggedColumn: string | null;
}
type TBoardState = { boards: TBoard[], searchTerm: string}

type TUserStore = TUserState & TUserActions;
type TTaskStore = TTaskState & TTaskActions;
type TColumnStore = TColumnState & TColumnActions;
type TBoardStore = TBoardState & TBoardActions;