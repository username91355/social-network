import React, {useState} from 'react';
import {Pagination} from "antd";

interface IProps {
    portionSize: number
    totalUsers: number
    changeCurrentPage: (page:number) => void
}

export const Paginator: React.FC<IProps> = props => {

    const {
        portionSize,
        totalUsers,
        changeCurrentPage
    } = props

    let portionCount = Math.ceil(totalUsers / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    const onChange = (page: number) => {
        changeCurrentPage(page)
        setPortionNumber(page)
    }

    return (
        <div>
            <Pagination defaultCurrent={portionNumber}
                        total={portionCount}
                        onChange={onChange}
                        showSizeChanger={false} />
        </div>
    );
};