import { FC, useState } from "react";
import * as Icon from 'react-feather';
import ICardSocialMediaType from "../interfaces-refact/card-social-media-type";

export const CardSocialMediaComponent: FC<ICardSocialMediaType> = ({ index, url, icon }: ICardSocialMediaType) => {
    const [hover, setHover] = useState(false);

    let a_tag_style: React.CSSProperties = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100%',
        borderRadius: '100%',
        boxShadow: hover ? '0 3px 4px 0 rgba(0,0,0,0.3)' : '0 5px 8px 0 rgba(0,0,0,0.2)',
        backgroundColor: 'white',
        textDecoration: 'none',
    }

    const mouseEnter = () => {
        setHover(true);
    }

    const mouseLeave = () => {
        setHover(false);
    }
    
    return <>
        <li style={{ float: 'left', margin:10, width:'40px', height:'40px'}}>
            <a style={a_tag_style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} key= {index} href={url} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt="icon" style= {{alignSelf: '', width:'28px', height:'28px'}}/>
            </a>
        </li>
    </>
}