import React, { ReactNode } from 'react';
import  { useParams }  from "react-router-dom";
import { Card } from '../components/card';
import ICard from '../interfaces/card.type';
import IUser from '../interfaces/user.type';
import './user.css'

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
            email: 'gustavovictor94@gmail.com',
            cards: [{
                id: '1',
                index: 1,
                group: 'primeiro',
                icon: 'instagram',
                description: 'v_guto',
                URL: 'https://www.instagram.com/v_guto/'
            },{
                id: '1',
                index: 1,
                group: 'primeiro',
                icon: 'facebook',
                description: 'Gustavo Assunção',
                URL: 'https://www.facebook.com/gustavo.victor.1804/'
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
                    
                    cardsToRender.push(<Card key={i} card={card}/>);
                }

                return <div className='user'>
                            <div className='profile'>
                                <img className='logo' src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="profile picture"/>
                                <p>{ this.state.user.nickName }</p>
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