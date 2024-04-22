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
}

type TTaskActions = {
    addTask: (columnId: string, taskTitle: string, taskDescription?: string) => void;
    deleteTask: (taskId: string) => void;
}

type TColumnActions = {
    addColumn: (boardId: string, columnTitle: string) => void;
    deleteColumn: (columnId: string) => void; 
}

type TBoardActions = {
    addBoard: (boardTitle: string, boardDescription?: string) => void;
    deleteBoard: (boardId: string) => void;
}

type TTaskState = { tasks: TTask[] }
type TColumnState = { columns: TColumn[] }
type TBoardState = { boards: TBoard[] }

type TTaskStore = TTaskState & TTaskActions;
type TColumnStore = TColumnState & TColumnActions;
type TBoardStore = TBoardState & TBoardActions;