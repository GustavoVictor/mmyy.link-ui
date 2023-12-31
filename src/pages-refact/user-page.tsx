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
        },{
            id: '11',
            index: 1,
            icon: 'https://cdn.simpleicons.org/linkedin',
            description: '💼 My LinkedIn Profile',
            url: 'https://www.linkedin.com/in/gustavo-victor-silva-assunção'
        },
    ]
    
    let cards: Array<ICardType> = [
        {
            id: '11',
            index: 1,
            type: 'line',
            description: 'My projects',
            url: 'https://www.linkedin.com/in/gustavo-victor-silva-assunção'
        },
        {
            id: '22',
            index: 2,
            description: 'mmyy.link project is a profile page [status: building 🛠️]',
            url: 'https://www.mmyy.link/index'
        },
        {
            id: '3',
            index: 3,
            description: 'A simple API to help you with back-end development',
            url: 'https://github.com/GustavoVictor/simple-form'
        },
        {
            id: '4',
            index: 4,
            type: 'line',
            description: 'This site is open source. \nIf you help me  you can win a summary page too  👨‍💻🤙🏼',
            url: 'https://www.linkedin.com/in/gustavo-victor-silva-assunção'
        },
        {
            id: '5',
            index: 5,
            description: 'mmyy.link - ui 📱',
            url: 'https://github.com/GustavoVictor/mmyy.link-ui'
        },
        {
            id: '6',
            index: 6,
            description: 'mmyy.link - api 🦾',
            url: 'https://github.com/GustavoVictor/mmyy.link-api'
        }
    ]

    return {
        name: 'Gustavo',
        nickName: 'v_guto',
        lastName: 'Assunção',
        summary: `Software developer 💻 (C# 💜💜) | React enthusiast 😃 | and sometimes I'm a bartender 🍸🍹 and mechanic as a hobby 🔩🚗`,
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
        marginTop: '15%',
        margin: '15px',
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
                    <ul style={{ padding: '30px 0px 15px 0px', overflow: 'hidden', margin: 0, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            user.cardsSocialMedia.map((card: ICardSocialMediaType, index) => (
                                <CardSocialMediaComponent key={index} id={card.id} index={card.index} url={card.url} description={card.description} icon={card.icon}/>
                            ))
                        }
                    </ul>
                </li>
                {
                    user.cards.map((card: ICardType, index) => (
                        <CardComponent key={index} id={card.id} index={card.index} type={card.type} url={card.url} description={card.description}/>
                    ))
                }
            </ul>
        }
    </>
}