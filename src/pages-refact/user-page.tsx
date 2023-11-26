import PerfilGustavo from '../assets/gustavo.jpeg';
import { useParams, Navigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import ICardType from "../interfaces-refact/card-type";
import IUserInfo from '../interfaces-refact/user-info-type';
import { CardComponent } from "../components-refact/card-component";
import ICardSocialMediaType from "../interfaces-refact/card-social-media-type";
import { CardSocialMediaComponent } from "../components-refact/card-social-media-component";
import { useEffect, useState } from 'react';

const FetchUser = function() : IUserInfo {
    let cardsSocialMedia: Array<ICardSocialMediaType> = [
        {
            id: '1',
            index: 1,
            icon: 'https://cdn.simpleicons.org/instagram/00ccff99',
            description: 'Instagram',
            url: 'https://www.instagram.com/v_guto/'
        },{
            id: '2',
            index: 2,
            icon: 'https://cdn.simpleicons.org/facebook',
            description: 'Facebook',
            url: 'https://www.facebook.com/gustavo.victor.1804/'
        },{
            id: '3',
            index: 3,
            icon: 'https://cdn.simpleicons.org/whatsapp',
            description:'WhatsApp',
            url:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
        },{
            id: '4',
            index: 4,
            icon: 'https://cdn.simpleicons.org/github',
            description:'GitHub',
            url:'https://github.com/gustavovictor'
        }
    ]
    
    let cards: Array<ICardType> = [
        {
            id: '11',
            index: 1,
            description: '💼 My LinkedIn Profile',
            url: 'www.linkedin.com/in/gustavo-victor-silva-assunção'
        }
    ]

    return {
        name: 'Gustavo',
        nickName: 'v_guto',
        lastName: 'Assunção',
        summary: `Back-end developer 💻 (C# 💜💜) | React enthusiast 😃 | and sometimes I'm a bartender 🍸🍹 and mechanic as a hobby 🔩🚗`,
        email: 'gustavovictor94@gmail.com',
        backgroundColor:'#fbab7e',
        backgroundImage: 'linear-gradient(62deg, #fbab7e 10%, #F7CE68 100%)', 
        cards: cards,
        cardsSocialMedia: cardsSocialMedia
    }
}

export const UserPage = () => {
    const { nick } = useParams<string>();
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState<IUserInfo>();

    if (nick == undefined || nick == '')
        return <Navigate to='index'/>

    let ul_tag_style : React.CSSProperties = {
        textAlign: 'center', 
        padding: 30, 
        marginTop: '10%'
    }

    useEffect(() => {
        const user = FetchUser();
        
        document.body.style.backgroundColor = user.backgroundColor ?? '#fbab7e';
        document.body.style.backgroundImage = user.backgroundImage ?? 'linear-gradient(62deg, #fbab7e 10%, #F7CE68 100%)';
        
        setUser(user);
    }, []);

    return <>
        {
            !user ? (<p>Carregando...</p>) : 
            <ul style={ul_tag_style}>
                <li>
                    <img style={{maxWidth: '150px', maxHeight: '150px', borderRadius: '100%'}} className='logo' src={PerfilGustavo} alt="profile picture"/>
                </li>
                <li style={{ marginBottom: '20px'}}>
                    <b>{user.name} {user.lastName}</b>
                </li>
                <li>
                    <b>{user.summary}</b>
                </li>
                <li style={{ marginBottom: '20px'}}>
                    <ul style={{overflow: 'hidden', margin: 0, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            user.cardsSocialMedia.map((card: ICardSocialMediaType, index) => (
                                <CardSocialMediaComponent key={index} id={card.id} index={card.index} url={card.url} description={card.description} icon={card.icon}/>
                            ))
                        }
                    </ul>
                </li>
                {
                    user.cards.map((card: ICardType, index) => (
                        <CardComponent key={index} id={card.id} index={card.index} url={card.url} description={card.description}/>
                    ))
                }
            </ul>
        }
    </>
}