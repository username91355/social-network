import React from "react";

type TProps = {
    title: string
    value: string | null
}

const Contact: React.FC<TProps> = ({title, value}) => {
    return <li>{title}: {value}</li>
}

export default Contact