import React from "react";
// import "./Card.css";

type CardProps = {
    children?: React.ReactNode;
};

function Card(props: CardProps) {
    return <div className="card-body text-center">{props.children}</div>;
}

export default Card;
