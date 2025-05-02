import React from "react";

type ArticoloProps = {
    children?: React.ReactNode;
    target: string;
};

function Articolo(props: ArticoloProps) {
    return (
        <div className="collapse" id={props.target}>
            <div className="text-start">{props.children}</div>
        </div>
    );
}

export default Articolo;
