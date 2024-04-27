import Link from "next/link";

const BoardCard = ({boardId, boardTitle, boardDescription}: {boardId: string, boardTitle: string, boardDescription?: string}) => {

    // const colors = [
    //     "#2e3192, #0068c7, #009ce8, #00cff9, #1bffff",
    //     "#d4145a, #e8434d, #f56941, #fb8d3a, #fbb03b",
    //     "#009245, #50ac3f, #86c435, #bfda28, #fcee21",
    //     "#662d8c, #8c288e, #b0218c, #d01b84, #ed1e79",
    //     "#764ba2, #7657b4, #7364c6, #6e71d8, #667eea"
    // ];

    // Math.floor(Math.random() * 5);

    return (
        <Link
            href={`/home/board/${boardId}`}
            // style={{
            //     backgroundImage: `linear-gradient(to right top, ${colors[random]})`
            // }}
            style={{
                backgroundImage: `linear-gradient(to right top, #764ba2, #7657b4, #7364c6, #6e71d8, #667eea`
            }}
            className="w-[250px] h-[130px] p-3 rounded-md">
            {boardTitle}
        </Link>
    );
}

export default BoardCard;