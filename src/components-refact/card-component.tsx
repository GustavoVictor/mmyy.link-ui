import { FC, useState } from "react";
import ICardType from "../interfaces-refact/card-type";

export const CardComponent: FC<ICardType> = ({ id, index, url, description }) => {
    const [hover, setHover] = useState(false);

    let li_tag_style: React.CSSProperties = {
        textAlign: 'center',
        textDecoration: 'none',
        height: '40px',
        marginBottom: '20px'
    }

    let a_tag_style: React.CSSProperties = {
        height: 'auto',
        display: 'block',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black'
    }

    let button_tag_style: React.CSSProperties = {
        all: 'unset',
        width: '80%',
        height: '100%',
        boxShadow: hover ? '0 4px 5px 0 rgba(0,0,0,0.3)' : '0 8px 16px 0 rgba(0,0,0,0.2)',
        backgroundColor: 'white'
    }

    const mouseEnter = () => {
        setHover(true);
    }

    const mouseLeave = () => {
        setHover(false);
    }
    
    return <>
        <li key={id} style={li_tag_style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <button style={button_tag_style}>
                <a style={a_tag_style} key= {index} href={url} className="card" target="_blank" rel="noopener noreferrer">
                    <b>{description}</b>
                </a>
            </button>
        </li>
    </>
}