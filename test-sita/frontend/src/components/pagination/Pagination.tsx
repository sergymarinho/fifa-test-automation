import { useEffect, useState } from "react";
import "./_Pagination.scss";

interface IProps {
    currentPage: number;
    totalPages: number;
    onPageClick: (n: number) => void;
}

const Pagination = ({ currentPage, onPageClick, totalPages }: IProps) => {
    const [pages, setPages] = useState<{
        first: number[];
        middle: number[];
        last: number[];
    }>({ first: [], middle: [], last: [] });

    useEffect(() => {
        setPages(() => {
            const first: number[] = [];
            const middle: number[] = [];
            const last: number[] = [];

            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    first.push(i);
                }
            }

            if (totalPages > 5) {
                if (currentPage <= 3) {
                    first.push(...[1, 2, 3]);
                    if (currentPage === 3) first.push(4);
                    last.push(totalPages);
                }

                if (currentPage > totalPages - 3) {
                    first.push(1);
                    if (currentPage === totalPages - 2) last.push(totalPages - 3);
                    last.push(...[totalPages - 2, totalPages - 1, totalPages]);
                }

                if (currentPage > 3 && currentPage <= totalPages - 3) {
                    first.push(1);
                    last.push(totalPages);
                    middle.push(...[currentPage - 1, currentPage, currentPage + 1]);
                }
            }

            return {
                first,
                middle,
                last,
            };
        });
    }, [currentPage, totalPages]);

    return (
        <div className={"pagination"}>
            <span
                className={
                    'shortcut' +
                    (currentPage === 1 ? "unavailable" : "")
                }
                onClick={() => {
                    onPageClick(1);
                }}
            >
                First
            </span>
            <span>|</span>
            <span
                className={
                    'shortcut' +
                    (currentPage === 1 ? "unavailable" : "")
                }
                onClick={() => {
                    if (currentPage - 1 > 0) onPageClick(currentPage - 1);
                }}
            >
                Previous
            </span>
            <div className={'numbers'}>
                {pages.first.map((p, index) => {
                    return (
                        <div
                            className={
                                'number' +
                                " " +
                                (currentPage === p ? ' selected' : "")
                            }
                            onClick={() => {
                                onPageClick(p);
                            }}
                            key={"pagination_first_" + index}
                        >
                            {p}
                        </div>
                    );
                })}

                {pages.middle.length > 0 ? (
                    <span className={'dots'}>...</span>
                ) : null}

                {pages.middle.map((p, index) => {
                    return (
                        <div
                            className={
                                'number' +
                                " " +
                                (currentPage === p ? 'selected' : "")
                            }
                            onClick={() => {
                                onPageClick(p);
                            }}
                            key={"pagination_middle_" + index}
                        >
                            {p}
                        </div>
                    );
                })}

                {pages.last.length > 0 ? <span className={'dots'}>...</span> : null}

                {pages.last.map((p, index) => {
                    return (
                        <div
                            className={
                                'number' +
                                " " +
                                (currentPage === p ? 'selected' : "")
                            }
                            onClick={() => {
                                onPageClick(p);
                            }}
                            key={"pagination_last_" + index}
                        >
                            {p}
                        </div>
                    );
                })}
            </div>
            <span
                className={
                    'shortcut' +
                    (currentPage === totalPages ? "unavailable" : "")
                }
                onClick={() => {
                    if (currentPage + 1 <= totalPages) onPageClick(currentPage + 1);
                }}
            >
                Next
            </span>
            <span>|</span>
            <span
                className={
                    'shortcut' +
                    (currentPage === totalPages ? "unavailable" : "")
                }
                onClick={() => {
                    onPageClick(totalPages);
                }}
            >
                Last
            </span>
        </div>
    );
};

export default Pagination;