import React from "react";
import ICard from "../interfaces/card.type";
import './card.css';

type props = {
    card: ICard;
}

export class Card extends React.Component<props> {
    render(){
        return <div className="card">
            <div className="container">
                <div>
                    <p>{this.props.card.icon}</p>
                </div>
                <div>
                    <h4>
                        <p><b>{this.props.card.description}</b></p>
                    </h4>
                </div>
            </div>
        </div>
    }
}