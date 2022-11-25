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
import { SocialPopup } from '../components/add-social-card-pop-up';
import { Popup } from '../components/add-card-pop-up';
import { GroupPopup } from '../components/add-group-pop-up';
import { Group } from '../components/group';

//Types
type Props = {
    nick: string | undefined;
    myAccount: boolean | null;
}

type State = {
    addSocialCardsModalOpen: boolean;
    addGroupCardsModalOpen: boolean;
    addCardsModalOpen: boolean;
    groupToAdd: string | undefined;
    userInfo: IInfoUser | undefined;
    redirectUser: boolean;
    showSummaryInput: boolean;
}

class UserPageWithHookResult extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        
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

        if (this._canEdit && userInfo != undefined && !userInfo.summary)
            userInfo.summary = 'Hi!! 🖖 Put an amazing summary of yourself here. 🌈 You can use Emojis!! 😃😁';

        this.setState((state) => ({
            userInfo: userInfo
        }));

        // this.setState({
        //     addSocialCardsModalOpen: false,
        //     addGroupCardsModalOpen: false,
        //     addCardsModalOpen: false,
        //     groupToAdd: '',
        //     redirectUser: false,
        //     userInfo: undefined,
        //     showSummaryInput: false
        // })
        // this.FetchUser();
    }

    FetchUser(){
        const userInfo = {
            name: 'Gustavo',
            nickName: 'v_guto',
            lastName: 'Assunção',
            summary: `Back-end developer 💻 (C# 💜💜) | React enthusiast 😃 | sometimes I'm a bartender as a hobby 🍸🍹`,
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
                url: 'https://www.instagram.com/v_guto/'
            },{
                id: '2',
                index: 2,
                group: 'social',
                index_group: 0,
                icon: 'facebook',
                description: 'Facebook',
                url: 'https://www.facebook.com/gustavo.victor.1804/'
            },{
                id: '3',
                index: 3,
                group: 'social',
                index_group: 0,
                icon:'whatsapp',
                description:'WhatsApp',
                url:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '2',
                index: 2,
                group: undefined,
                index_group: undefined,
                icon: 'linkedn',
                description: 'Instagram',
                url: 'https://www.instagram.com/v_guto/'
            },{
                id: '4',
                index: 4,
                group: undefined,
                index_group: undefined,
                icon: 'tink-link',
                description: 'Instagram',
                url: 'https://www.instagram.com/v_guto/'
            },{
                id: '1',
                index: 1,
                group: 'group 1',
                index_group: 1,
                icon: 'jogo 1',
                description: 'Facebook',
                url: 'https://www.facebook.com/gustavo.victor.1804/'
            },{
                id: '2',
                index: 2,
                group: 'group 1',
                index_group: 1,
                icon:'jogo 2',
                description:'WhatsApp',
                url:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '1',
                index: 1,
                group: 'group 3',
                index_group: 3,
                icon:'site 3',
                description:'WhatsApp',
                url:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '2',
                index: 2,
                group: 'group 3',
                index_group: 3,
                icon:'site 3',
                description:'WhatsApp',
                url:'https://wa.me/5512982034955?text=Ol%C3%A1%2C+Gustavo%21'
            },{
                id: '4',
                index: 4,
                group: undefined,
                index_group: undefined,
                icon: 'tink-link',
                description: 'Instagram',
                url: 'https://www.instagram.com/v_guto/'
            },{
                id: '5',
                index: 5,
                group: undefined,
                index_group: undefined,
                icon: 'tink-link',
                description: 'Instagram',
                url: 'https://www.instagram.com/v_guto/'
            }]
        }

        // this.setState((state) => ({
        //     userInfo: userInfo
        // }));
    }

    showSocialCard(): ReactNode {
            console.log('canedit - ' + this._canEdit);
            return <>
                {
                    this._social.map(social => {
                        return <div key={social.index} className={this._canEdit ? 'social-card-remove' : 'social-card'} onClick={(e) => { 
                            if (this._canEdit)
                                    this.removeSocialCard(e, social.index)
                                else
                                {
                                    window.location.assign(social.url ?? 'https://awkwardfamilyphotos.com');
                                }
                            }}>
                            <SocialIcon  key={social.index} url={social.url} style={{margin: '0px', pointerEvents: 'none'}} className={this._canEdit ? 'social-card-to-remove' : 'social-card'} label={social.description} fgColor='#242424' bgColor='#fff'/>
                        </div>
                    })
                }
                {
                    this._canEdit && 
                    <button className='social-card-empty' onClick={() => this.setState({addSocialCardsModalOpen: true})}>
                        <div style={{fontFamily:'Timeburner', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <b>add <br/>social</b>
                            {/* <img style={{width: '35px', height: '35px'}} src={plus} className="plus icon" alt="Add card" /> */}
                        </div>
                    </button>
                }
            </>  
    }

    removeSocialCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: Key){
        e.preventDefault();

        let userInfo = this.state.userInfo;

        if (userInfo != null 
            || userInfo != undefined)
        {
            userInfo.cards = userInfo.cards.filter(card => card.social && card.index != key).sort((a, b) => a.index - b.index);

            for (let i = Number(key) - 1; i <= userInfo.cards.length - 1; i++){
                let card = userInfo.cards[i];

                card.index -= 1;

                userInfo.cards[i] = card;
            }
        }

        this.setState({
            userInfo: userInfo
        })
    }

    removeGroupCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: Key){
        e.preventDefault();

        let userInfo = this.state.userInfo;

        if (userInfo != null 
            || userInfo != undefined)
        {
            userInfo.cards = userInfo.cards.filter(card => card.index != key).sort((a, b) => a.index - b.index);

            for (let i = Number(key) - 1; i <= userInfo.cards.length - 1; i++){
                let card = userInfo.cards.filter(card => !card.social)[i];

                card.index -= 1;

                userInfo.cards[i] = card;
            }
        }

        this.setState({
            userInfo: userInfo
        })
    }

    removeCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: Key){
        e.preventDefault();

        let userInfo = this.state.userInfo;

        if (userInfo != null 
            || userInfo != undefined)
        {
            userInfo.cards = userInfo.cards.filter(card => card.index != key).sort((a, b) => a.index - b.index);

            if (userInfo.cards.length >= 1 && userInfo.cards[0].index > 0)
            {
                for (let i = Number(key); i <= userInfo.cards.length; i++){
                    let card = userInfo.cards.filter(card => !card.social)[i];
                    
                    if (card == undefined)
                        continue;

                    card.index -= 1;
                }
            }
        }

        this.setState({
            userInfo: userInfo
        })
    }
    
    addSocialCard(e: React.SyntheticEvent, userInfo: IInfoUser | undefined, addSocialCardsModalOpen: () => void, userService: UserService){
        e.preventDefault();
        const target = e.target as typeof e.target & {
            description: { value: string | undefined },
            url: { value: string | undefined },
            group: { value: string | undefined },
            groupPosition: { value: number | undefined }
        };

        if (userInfo == null || userInfo == undefined)
            return;
        
        const url = target.url.value ?? '';
        
        const card = {
            index:  userInfo.cards.filter(card => card.social).length,
            url: url,
            description: url,
            is_a_group: false,
            social: true,
            in_group: 'social'
        };

        userInfo.cards.push(card);

        userService.addCard(card);

        addSocialCardsModalOpen();
    }

    addGroupCard(e: React.SyntheticEvent, userInfo: IInfoUser | undefined, addGroupCardsModalOpen: () => void){
        e.preventDefault();
        const target = e.target as typeof e.target & {
            group: { value: string | undefined },
        };

        if (userInfo == null || userInfo == undefined)
            return;

        const index = userInfo.cards.length + 1;
        const card = {
            index: index,
            url: undefined,
            description: target.group?.value ?? 'default label ' + index,
            is_a_group: true,
            social: false,
            in_group: undefined
        }; 

        userInfo.cards.push(card);

        addGroupCardsModalOpen();
    }

    addCard(e: React.SyntheticEvent, userInfo: IInfoUser | undefined, addCardsModalOpen: () => void, group: string | undefined = undefined, userService: UserService){
        e.preventDefault();
        const target = e.target as typeof e.target & {
            description: { value: string | undefined },
            url: { value: string | undefined }
        };

        if (userInfo == null || userInfo == undefined)
            return;

        const index = userInfo.cards.filter(card => !card.social).length;

        const card = {
            index: index,
            url: target.url?.value ?? '',
            description: target.description.value ?? 'default label ' + index,
            is_a_group: false,
            social: false,
            in_group: group
        }; 

        userInfo.cards.push(card);

        userService.addCard(card);

        addCardsModalOpen();
    }

    showSocialCardModal() : ReactNode {
        return this.state.addSocialCardsModalOpen ? <SocialPopup addSocialCardsModalOpen={() => this.setState({addSocialCardsModalOpen: false})} userInfo={this.state.userInfo} addSocialCard={this.addSocialCard} closePopup={() => this.setState({addSocialCardsModalOpen: false})} userService={this._userService} /> : null;
    }

    showGroupCardModal() : ReactNode {
        return this.state.addGroupCardsModalOpen ? <GroupPopup addGroupCardsModalOpen={() => this.setState({addGroupCardsModalOpen: false})} userInfo={this.state.userInfo} addGroupCard={this.addGroupCard} closePopup={() => this.setState({addGroupCardsModalOpen: false})} /> : null;
    }

    showCardModal() : ReactNode {
        return this.state.addCardsModalOpen ? <Popup addCardsModalOpen={() => this.setState({addCardsModalOpen: false})} userInfo={this.state.userInfo} addCard={this.addCard} closePopup={() => this.setState({addCardsModalOpen: false})} groupToAdd={this.state.groupToAdd} userService={this._userService}/> : null;
    }

    summary(): ReactNode {
        if (this._canEdit && this.state.showSummaryInput) {
            return (
                <>
                    <textarea
                        className= 'user-summary-input' 
                        value={ this.state.userInfo?.summary }
                        onChange={(e) => { 
                            const value = e.currentTarget.value;
                            let user = this.state.userInfo;
                            if (user != null){
                                user.summary = value;
                                this.setState({userInfo: user}); 
                            }
                        } } >
                    </textarea>
                    <button onClick={() => { 
                        if (this.state.userInfo){
                            this._userService.updateSummary(this.state.userInfo?.summary); 
                            this.setState({showSummaryInput: false})
                        }
                        }} 
                        style={{marginTop:'10px', alignSelf: 'end'}}>Save</button>
                </>
            )
        }
        else if (this._canEdit) 
            return <div onClick={() => {this.setState({showSummaryInput: true})}} className='user-summary-edit'>{ this.state.userInfo?.summary ?? ''}</div>
        else 
            return <div className='user-summary'>{ this.state.userInfo?.summary ?? ''}</div>
    }

    render(){
            if (this.state != null
                && this.state.redirectUser)
                return <div>User not found...</div>
            else if (this.state == null 
                || this.state.userInfo == undefined)
                return <div>Load...</div>
            else {
                document.body.style.backgroundColor = this.state.userInfo.backgroundColor ?? '#fbab7e';
                document.body.style.backgroundImage = this.state.userInfo.backgroundImage ?? 'linear-gradient(62deg, #fbab7e 10%, #F7CE68 100%)';
                
                let _cards:ICard[] = this.state.userInfo.cards.filter(card => !card.social).sort((a, b) => a.index - b.index);
                
                let cards_to_render = new Array<ReactNode>();

                for (let i = 0; i < _cards.length; i++){
                    const card:ICard | undefined = _cards[i];

                    if (card == undefined)
                        continue;

                    cards_to_render.push(<>
                        <div key={card.index} className={this._canEdit ? 'card-remove' : 'card'} onClick={(e) => {
                                if (this._canEdit)
                                    this.removeCard(e, i)
                                else
                                {
                                    window.location.assign(card.url ?? 'https://awkwardfamilyphotos.com');
                                }
                            }}>
                            <Card key={card.index} card={card}/>
                        </div>
                        <div className='space-btw-card'></div>
                    </>);
                }
                
                this._social = this.state.userInfo.cards.filter(card => card.social).sort((a, b) => a.index - b.index);
                return <>
                    { this.state.addSocialCardsModalOpen && this.showSocialCardModal() }
                    { this.state.addGroupCardsModalOpen && this.showGroupCardModal() }
                    { this.state.addCardsModalOpen && this.showCardModal() }
                    <div className='user-container'>
                        <div className='user'>
                            <div className='profile'>
                                <img className='logo' src={Gustavo} alt="profile picture"/>

                                <div className='user-name-container'>
                                    <h1>{this.state.userInfo.name} {this.state.userInfo.lastName}</h1>
                                </div>

                                {this.summary()}

                                <div className='social'>
                                    { this.showSocialCard() }
                                </div>
                            </div>
                            {
                                cards_to_render.map(card => card)
                            }
                            { this._canEdit && <div className='user-line'></div>}
                            {
                                <div style={{display:'flex', flexDirection: 'row'}}>
                                    {this._canEdit && 
                                    <button className='social-card-empty' style={{marginBottom: '40px'}} onClick={() => this.setState({addCardsModalOpen: true})}>
                                        <div style={{fontFamily:'Timeburner', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                            <b>+ card</b>
                                        </div>
                                    </button>}
                                </div>
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