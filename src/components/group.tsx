import React from "react";
import "./group.css";

type props = {
    description: string;
    editable: boolean;
    children?: React.ReactNode[];
    addCard: () => void
}

export class Group extends React.Component<props> {

    constructor(props: props) {
        super(props);
    }

    render(): React.ReactNode {
        return <div className='card-group'> 
            <div id="title">
                <p>{this.props.description}</p>
                {this.props.editable && 
                // <button className='social-card-empty' style={{marginBottom: '40px'}} onClick={() => this.setState({addCardsModalOpen: true, groupToAdd: group.description})}>
                <button id="add-card" className='social-card-empty' style={{marginBottom: '40px'}} onClick={() => this.props.addCard()}>
                    <div style={{fontFamily:'Timeburner', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <b>+ card</b>
                    </div>
                </button>}
            </div>
            {this.props.children?.length != 0 ? this.props.children?.map(c => c) : <></> } 
        </div>
    }
}