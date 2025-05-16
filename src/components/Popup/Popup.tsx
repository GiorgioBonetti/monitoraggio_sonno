import React from "react";

type PopupProps = {
    children?: React.ReactNode;
    modalId?: string;
    title?: string;
};

function Popup(prpos: PopupProps) {
    return (
        <div>
            <div
                className="modal fade"
                id={prpos.modalId}
                tabIndex={-1}
                aria-labelledby={`${prpos.modalId}Label`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4 p-1 mx-3"
                                id={`${prpos.modalId}Label`}
                            >
                                {prpos.title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close me-2"
                                data-bs-dismiss="modal"
                                aria-label="Chiudi"
                                style={{
                                    transition: "all 0.2s ease",
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 8px rgba(0, 0, 0, 0.3)";
                                    e.currentTarget.style.transform =
                                        "scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.transform =
                                        "scale(1)";
                                }}
                            ></button>
                        </div>
                        <div className="modal-body">{prpos.children}</div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="btn"
                style={{
                    backgroundColor: "#18c599",
                    color: "white",
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
                data-bs-toggle="modal"
                data-bs-target={`#${prpos.modalId}`}
            >
                i
            </button>
        </div>
    );
}

export default Popup;
