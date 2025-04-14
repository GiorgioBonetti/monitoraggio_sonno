import { useState } from "react";
// import "./Information.css";

type InformationProps = {
    children?: React.ReactNode;
};

function Information(props: InformationProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            className="info-button"
            onClick={() => setIsOpen(isOpen ? false : true)}
        >
            i{isOpen ? <span className="tooltip">{props.children}</span> : ""}
        </button>
    );
}
export default Information;
