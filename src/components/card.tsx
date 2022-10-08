import React from "react";
import ICard from "../interfaces/card.type";

type props = {
    card: ICard;
}

export class Card extends React.Component<props> {

    render(){
        return <div className="card">
            <div className="container">
                <p>{this.props.card.icon}</p>
                <h4><b>{this.props.card.description}</b></h4>
            </div>
        </div>
    }
}