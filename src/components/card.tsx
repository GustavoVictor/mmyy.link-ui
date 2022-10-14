import React from "react";
import ICard from "../interfaces/card.type";
import './card.css';

type props = {
    card: ICard;
}

export class Card extends React.Component<props> {
    render(){
        return <div className="card">
            <div className="card-container">
                <p><b>{this.props.card.description}</b></p>
            </div>
        </div>
    }
}