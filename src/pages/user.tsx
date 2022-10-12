import React, { ReactNode } from 'react';
import  { useParams }  from "react-router-dom";
import { Card } from '../components/card';
import ICard from '../interfaces/card.type';
import IUser from '../interfaces/user.type';
import './user.css'
import { SocialIcon } from 'react-social-icons';
import Gustavo from '../assets/gustavo.jpeg';

//Types
type Props = {
    nick: string | undefined;
}

type State = {
    user: IUser | undefined;
}

class UserPageWithHookResult extends React.Component<Props, State>{
    //private _user: IUser | undefined = undefined;

    constructor(props: Props){
        super(props);
        // this.state = {
        //     user: {} as IUser
        // };
    }
    
    componentDidMount(): void {
        this.FetchUser();
    }

    FetchUser(){
        console.log('nick: ' + this.props.nick)
        const user = {
            name: 'Gustavo',
            nickName: 'v_guto',
            lastName: 'Assunção',
            sumary: `back-end developer 💻 (mainly C# 💜💜) | React enthusiast 😃 | sometimes I'm a bartender as a hobby 🍸🍹`,
            email: 'gustavovictor94@gmail.com',
            backgroundColor:'#ffc213',
            cards: [{
                id: '1',
                index: 1,
                group: 'social',
                icon: 'instagram',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '2',
                index: 2,
                group: 'social',
                icon: 'facebook',
                description: 'Facebook',
                URL: 'https://www.facebook.com/gustavo.victor.1804/'
            },{
                id: '3',
                index: 3,
                group: 'social',
                icon:'whatsapp',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '4',
                index: 4,
                group: 'social',
                icon: 'instagram',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '5',
                index: 5,
                group: 'social',
                icon: 'facebook',
                description: 'Facebook',
                URL: 'https://www.facebook.com/gustavo.victor.1804/'
            },{
                id: '6',
                index: 6,
                group: 'social',
                icon:'whatsapp',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '7',
                index: 7,
                group: 'social',
                icon:'whatsapp',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            }]
        }

        this.setState((state) => ({
            user: user
        }));
    }
        
    render(){
            if (this.state == null ||
                this.state.user == undefined)
                return <div>Carregando...</div>
            else {
                let cardsToRender = new Array<ReactNode>();

                const cardsLength = this.state.user.cards.length ?? 0;

                for (let i = 0; i < cardsLength; i++){
                    const card:ICard = this.state.user.cards[i];
                    
                    cardsToRender.push(<Card key={card.id} card={card}/>);
                }
                
                let social = this.state.user.cards.filter(card => card.group == 'social').sort((a, b) => a.index - b.index);
                
                document.body.style.backgroundColor = this.state.user.backgroundColor;

                return <div className='user'>
                            <div className='profile'>
                                <img className='logo' src={Gustavo} alt="profile picture"/>

                                <div className='user-name'>
                                    <h2>{ this.state.user.name } {this.state.user.lastName}</h2>
                                </div>

                                <div className='user-sumary'>{ this.state.user.sumary }</div>
                                
                                <div className='social'>
                                    {
                                        social.map(social => {
                                            return <SocialIcon key={social.id} url={social.URL} className='social-card' label={social.description} fgColor='#242424' bgColor='#fff'/>;
                                        })
                                    }
                                </div>
                            </div>
                            {
                                cardsToRender.map(card => card)
                            }
                        </div>
        }
    }
}

export function UserPage(){
    const { nick } = useParams();

    // console.log('nick: ' + nick)

    return <UserPageWithHookResult nick={nick} />;
}