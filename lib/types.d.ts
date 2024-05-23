enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
}

type TUser = {
    userId: string;
    username: string;
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

type TTaskActions = {
    addTask: (columnId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority, taskId?: string) => void;
    deleteTask: (taskId: string) => void;
    editTask: (taskId: string, taskTitle: string, taskDescription?: string, dueDate?: Date, priority?: Priority) => void;
}

type TColumnActions = {
    addColumn: (boardId: string, columnTitle: string, columnId?: string) => void;
    deleteColumn: (columnId: string) => void;
    editColumn: (columnId: string, columnTitle: string) => void;
    dragColumn: (columnId: string | null) => void;
}

type TBoardActions = {
    addBoard: (boardTitle: string, boardDescription?: string) => void;
    deleteBoard: (boardId: string) => void;
    editBoard: (boardId: string, boardTitle: string, boardDescription?: string) => void;
    setSearchTerm: (term: string) => void;
    fetchBoards: (userId) => void;
}

type TUserActions = {
    addUser: (userId: string, username: string, userEmail: string, userPassword: string) => void;
    removeUser: (userId: string) => void;
}

type TUserState = {
    users: TUser[];
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