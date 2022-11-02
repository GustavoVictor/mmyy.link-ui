import React, { Key, ReactNode } from 'react';
import  { useParams, useSearchParams }  from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { Card } from '../components/card';
import Gustavo from '../assets/gustavo.jpeg';
import ICard from '../interfaces/card.type';
import IInfoUser from '../interfaces/user/info-user.type';
import Login from './login';
import './user.css';
import UserService from '../services/user.service';
import ILoggedUser from '../interfaces/user/logged-user.type';
import plus from '../assets/plus-solid.svg';
import { Popup } from '../components/add-social-pop-up';

//Types
type Props = {
    nick: string | undefined;
    myAccount: boolean | null;
}

type State = {
    addSocialCardsModalOpen: boolean;
    userInfo: IInfoUser | undefined;
    redirectUser: boolean;
}

class UserPageWithHookResult extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        
        this.setState({
            addSocialCardsModalOpen: false,
            redirectUser: false,
            userInfo: undefined
        })

        this._userService = new UserService();

        if (this.props.myAccount)
            this._loggedUser = this._userService.loggedUser();
                
        if (this.props.myAccount != null
            && this._loggedUser != undefined)
            this._canEdit = true;
    }

    private readonly _loggedUser: ILoggedUser | undefined;
    private readonly _userService: UserService;
    private readonly _canEdit: boolean = false;    
    private _social: Array<ICard> = new Array<ICard>();

    async componentDidMount(): Promise<void> {
        let userInfo = await this._userService.userInfo(this.props.nick ?? '');

        if (userInfo?.hasError || userInfo == undefined || userInfo == null)
        {
            this.setState({
                redirectUser: true
            });
            return;
        }

        if (this._canEdit && userInfo != undefined && !userInfo.sumary)
            userInfo.sumary = 'Hi!! 🖖 Put an amazing summary of yourself here. 🌈 You can use Emojis!! 😃😁';

        this.setState((state) => ({
            userInfo: userInfo
        }));
        
        
        // this.FetchUser();
    }

    FetchUser(){
        const userInfo = {
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
            userInfo: userInfo
        }));
    }

    showSocialCard(): ReactNode {
            return <>
                {
                    this._canEdit && 
                    <button className='social-card-empty' onClick={() => this.setState({addSocialCardsModalOpen: true})}>
                        <div>
                            <p><b>Add</b></p>
                            {/* <img style={{width: '35px', height: '35px'}} src={plus} className="plus icon" alt="Add card" /> */}
                        </div>
                    </button>
                }
                {
                    this._social.map(social => {
                        return <div key={social.index} className='social-card-remove' onClick={(e) => this.removeSocialCard(e, social.index)}>
                            <SocialIcon  key={social.index} url={social.URL} style={{pointerEvents: 'none'}} className={this._canEdit ? 'social-card-to-remove' : 'social-card'} label={social.description} fgColor='#242424' bgColor='#fff'/>
                        </div>
                    })
                }
            </>  
    }

    removeSocialCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: Key){
        e.preventDefault();

        let userInfo = this.state.userInfo;

        if (userInfo != null 
            || userInfo != undefined)
        {
            console.log( userInfo.cards);
            userInfo.cards = userInfo.cards.filter(card => card.group == 'social' && card.index != key).sort((a, b) => a.index - b.index);
            // this.state.userInfo.cards.filter(card => card.group == 'social').sort((a, b) => a.index - b.index);
            const listLeght = userInfo.cards.length + 1;
            
            for (let i = Number(key) - 1; i <= userInfo.cards.length - 1; i++){
                let card = userInfo.cards[i];

                console.log(card)
                card.index -= 1;

                userInfo.cards[i] = card;
            }
            console.log(userInfo.cards);
        }

        this.setState({
            userInfo: userInfo
        })

        console.log(key)
    }
    
    addSocialCard(e: React.SyntheticEvent, userInfo: IInfoUser | undefined, addSocialCardsModalOpen: () => void){
        e.preventDefault();
        const target = e.target as typeof e.target & {
            description: { value: string | undefined },
            url: { value: string | undefined },
            cardPosition: { value: number | undefined },
            group: { value: string | undefined },
            groupPosition: { value: number | undefined }
        };

        // const description = target.description.value ?? '';
        const url = target.url.value ?? '';
        let cardPosition = target.cardPosition?.value;
        // const group = target.group.value ?? '';
        // const groupPosition = target.groupPosition.value ?? 0;

        if (userInfo == null || userInfo == undefined)
            return;

        if (cardPosition == undefined 
            || cardPosition == 0)
            cardPosition = userInfo.cards.length + 1; 

        console.log({
            index: cardPosition,
            group: 'social',
            index_group: 0,
            description: '',
            URL: url,
        });

        userInfo.cards.push({
            index: cardPosition,
            group: 'social',
            index_group: 0,
            description: '',
            URL: url,
        })

        console.log(userInfo.cards)

        addSocialCardsModalOpen();
    }

    ShowSocialCardModal() : ReactNode {
        return this.state.addSocialCardsModalOpen ? <Popup addSocialCardsModalOpen={() => this.setState({addSocialCardsModalOpen: false})} userInfo={this.state.userInfo} addSocialCard={this.addSocialCard} closePopup={() => this.setState({addSocialCardsModalOpen: false})} /> : null;
    }

    render(){
            if (this.state != null
                && this.state.redirectUser)
                return <div>User not found...</div>
            else if (this.state == null 
                || this.state.userInfo == undefined)
                return <div>Carregando...</div>
            else {
                document.body.style.backgroundColor = this.state.userInfo.backgroundColor ?? '#fbab7e';
                document.body.style.backgroundImage = this.state.userInfo.backgroundImage ?? 'linear-gradient(62deg, #fbab7e 10%, #F7CE68 100%)';
                
                let _cards = this.state.userInfo.cards.filter(card => card.group != 'social').sort((a, b) => a.index - b.index);
                
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
                
                this._social = this.state.userInfo.cards.filter(card => card.group == 'social').sort((a, b) => a.index - b.index);

                return <>
                    { this.state.addSocialCardsModalOpen && this.ShowSocialCardModal() }
                    <div className='user-container'>
                        <div className='user'>
                            <div className='profile'>
                                <img className='logo' src={Gustavo} alt="profile picture"/>

                                <div className='user-name-container'>
                                    <h1>{this.state.userInfo.name} {this.state.userInfo.lastName}</h1>
                                </div>

                                <div className='user-sumary'>{ this.state.userInfo.sumary ?? '' }</div>
                                
                                <div className='social'>
                                    { this.showSocialCard() }
                                </div>
                            </div>
                            {
                                cards_to_render.map(card => card)
                            }
                        </div>
                    </div>
                </>
        }
    }
}

export function UserPage(){
    const { nick } = useParams();
    const [searchParams] = useSearchParams();

    if (nick == undefined || nick == '')
        return <Login />;

    let myAccount = searchParams.get('myAccount');

    return <UserPageWithHookResult nick={nick} myAccount={myAccount === 'true'} />;
}