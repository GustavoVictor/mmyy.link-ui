import React, { ReactNode } from 'react';
import  { useParams }  from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { Card } from '../components/card';
import Gustavo from '../assets/gustavo.jpeg';
import ICard from '../interfaces/card.type';
import IUser from '../interfaces/user/user.type';
import Login from './login';
import './user.css';

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
            sumary: `Back-end developer 💻 (C# 💜💜) | React enthusiast 😃 | sometimes I'm a bartender as a hobby 🍸🍹`,
            email: 'gustavovictor94@gmail.com',
            backgroundColor:'#fbab7e',
            backgroundImage: 'linear-gradient(62deg, #fbab7e 10%, #F7CE68 100%)', 
            cards: [{
                id: '1',
                index: 1,
                group: 'social',
                index_group: 0,
                icon: 'instagram',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '2',
                index: 2,
                group: 'social',
                index_group: 0,
                icon: 'facebook',
                description: 'Facebook',
                URL: 'https://www.facebook.com/gustavo.victor.1804/'
            },{
                id: '3',
                index: 3,
                group: 'social',
                index_group: 0,
                icon:'whatsapp',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '2',
                index: 2,
                group: undefined,
                index_group: undefined,
                icon: 'linkedn',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '4',
                index: 4,
                group: undefined,
                index_group: undefined,
                icon: 'tink-link',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '1',
                index: 1,
                group: 'group 1',
                index_group: 1,
                icon: 'jogo 1',
                description: 'Facebook',
                URL: 'https://www.facebook.com/gustavo.victor.1804/'
            },{
                id: '2',
                index: 2,
                group: 'group 1',
                index_group: 1,
                icon:'jogo 2',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '1',
                index: 1,
                group: 'group 3',
                index_group: 3,
                icon:'site 3',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '2',
                index: 2,
                group: 'group 3',
                index_group: 3,
                icon:'site 3',
                description:'WhatsApp',
                URL:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '4',
                index: 4,
                group: undefined,
                index_group: undefined,
                icon: 'tink-link',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '5',
                index: 5,
                group: undefined,
                index_group: undefined,
                icon: 'tink-link',
                description: 'Instagram',
                URL: 'https://www.instagram.com/v_guto/'
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
                document.body.style.backgroundColor = this.state.user.backgroundColor;
                document.body.style.backgroundImage = this.state.user.backgroundImage;
                
                let _cards = this.state.user.cards.filter(card => card.group != 'social').sort((a, b) => a.index - b.index);
                
                let card_groups = _cards.reduce(function (r, a) {
                    const group = a.index_group ?? a.index;

                    if (a.index_group != null)
                    {
                        r[group] = r[group] || [];
                        r[group].push(a);
                    }
                    else {
                        r[a.index] = [];
                        r[group].push(a);
                    }

                    return r;
                }, new Array<ICard[]>());

                const cards_groups_length = card_groups.length;
                let cards_to_render = new Array<ReactNode>();

                function AddSpacebtwCard(i: number, lenght:number, list:Array<ReactNode>){
                    if (i > 0 && i < lenght)
                        list.push(<div className='space-btw-card'></div>)
                }

                for (let i = 0; i < cards_groups_length; i++){
                    const group:ICard[] = card_groups[i];

                    if (group == undefined)
                        continue;

                    if (group.length == 1){
                        const card:ICard = group[0];
                        cards_to_render.push(<Card key={card.id} card={card}/>);
                        AddSpacebtwCard(i, cards_groups_length, cards_to_render);
                        continue;
                    }

                    let cards_to_render_in_group = new Array<ReactNode>();

                    for(let x = 0; x < group.length; x++){
                        const card:ICard = group[x];

                        AddSpacebtwCard(x, group.length, cards_to_render_in_group);
                        cards_to_render_in_group.push(<Card key={card.id} card={card}/>);
                    }

                    
                    cards_to_render.push(
                        <div className='card-group'> 
                            { cards_to_render_in_group.map(card => card) } 
                        </div>)
                    
                    AddSpacebtwCard(i, cards_groups_length, cards_to_render);
                }
                
                let social = this.state.user.cards.filter(card => card.group == 'social').sort((a, b) => a.index - b.index);

                return <div className='user-container'>
                            <div className='user'>
                                <div className='profile'>
                                    <img className='logo' src={Gustavo} alt="profile picture"/>

                                    <div className='user-name'>
                                        <h1>{ this.state.user.name } {this.state.user.lastName}</h1>
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
                                    cards_to_render.map(card => card)
                                }
                            </div>
                        </div>
        }
    }
}

export function UserPage(){
    const { nick } = useParams();

    if(nick == undefined || nick == '')
        return <Login />;

    return <UserPageWithHookResult nick={nick} />;
}