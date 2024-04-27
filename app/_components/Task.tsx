const Task = ({taskTitle, taskDescription}: {taskTitle: string, taskDescription?: string}) => {
    return (
        <div
            className={`
                flex items-center justify-between
                rounded-lg bg-c-two px-3
                py-2 text-white max-h-[5rem]
            `}
        >
            <div className="w-full overflow-hidden">
                <h3 className='truncate font-medium'>{taskTitle}</h3>
                <p className='truncate text-sm font-light'>{taskDescription}</p>
            </div>
        </div>
    );
}

export default Task;