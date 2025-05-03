import { useState } from "react";

type ButtonArticoloProps = {
    target: string;
};

function ButtonArticolo(props: ButtonArticoloProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <button
            className="btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${props.target}`}
            aria-expanded={isExpanded}
            aria-controls="collapseExample"
            onClick={handleClick}
            style={{
                transition: "all 0.2s ease",
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
            }}
        >
            <i
                className="bi bi-chevron-down"
                style={{
                    display: "inline-block",
                    transition: "transform 0.3s ease",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
            ></i>
        </button>
    );
}

export default ButtonArticolo;
