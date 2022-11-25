import React, { useState } from "react";
import IInfoUser from "../interfaces/user/info-user.type";
import UserService from "../services/user.service";
import "./add-card-pop-up.css";

type Props = {
    addCardsModalOpen: () => void;
    userInfo: IInfoUser | undefined;
    groupToAdd: string | undefined;
    userService: UserService;
    addCard: (e: React.FormEvent<HTMLFormElement>, userInfo: IInfoUser | undefined, addCardsModalOpen: () => void, group: string | undefined, userService: UserService) => void,
    closePopup: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Popup = (prop: Props) => {  
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [cardPosition, setCardPosition] = useState(0);
    const [group, setGroup] = useState('');
    const [groupPosition, setGroupPosition] = useState(0);

    return (    
    <div className="popup-container">     
        <div className="popup-body">
            <div className="popup-close-btn">
                <button onClick={prop.closePopup}>close</button>     
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={(e) => prop.addCard(e, prop.userInfo, prop.addCardsModalOpen, prop.groupToAdd, prop.userService)}>
                    <div className='popup-field'>
                        <label className='popup-form-label'>
                            <b>Description: </b>
                        </label>
                        <input
                            className= ''
                            name='description'
                            type='text'
                            placeholder= ''
                            value= { description }
                            onChange= {(e) => {setDescription(e.target.value)} }/>
                    </div>
                    <div className='popup-field'>
                        <label className='popup-form-label'>
                            <b>URL: </b>
                        </label>
                        <input
                            className= ''
                            name='url'
                            type='text'
                            placeholder= ''
                            value= { url }
                            onChange={(e) => {setUrl(e.target.value)} } />
                    </div>
                    {/* <div className='popup-field'>
                        <label className='popup-form-label'>
                            <b>Card position: </b>
                        </label>
                        <input
                            className= ''
                            name='cardPosition'
                            type='text'
                            placeholder= ''
                            value= { cardPosition }
                            onChange={(e) => {setCardPosition(parseInt(e.target.value))} } />
                    </div> */}
                    {/* <div className='popup-field'>
                        <label className='popup-form-label'>
                            <b>Group: </b>
                        </label>
                        <input
                            className= ''
                            name='group'
                            type='text'
                            placeholder= ''
                            value= { group }
                            onChange={(e) => {setGroup(e.target.value)}} />
                    </div> */}
                    {/* <div className='popup-field'>
                        <label className='popup-form-label'>
                            <b>Group Position: </b>
                        </label>
                        <input
                            className= ''
                            name='groupPosition'
                            type='text'
                            placeholder= ''
                            value= { groupPosition }
                            onChange={(e) => {setGroupPosition(Number.parseInt(e.target.value))}} />
                    </div> */}
                    <button type='submit'>Add Card</button>
                </form>
            </div>  
        </div>    
    </div>  
)};