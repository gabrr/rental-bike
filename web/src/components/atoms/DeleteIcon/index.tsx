import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
    height?: string
    width?: string
    fill?: string
}

export const Deleteicon: React.FC<Props> = ({ fill="black", height="13", width="8", ...rest }) => {
    return (
        <svg {...rest} width={width} height={height} viewBox="0 0 8 13" fill="none">
            <path d="M6 4.625V10.875H2V4.625H6ZM5.25 0.875H2.75L2.25 1.5H0.5V2.75H7.5V1.5H5.75L5.25 0.875ZM7 3.375H1V10.875C1 11.5625 1.45 12.125 2 12.125H6C6.55 12.125 7 11.5625 7 10.875V3.375Z" fill={fill} />
        </svg>
    )
}
