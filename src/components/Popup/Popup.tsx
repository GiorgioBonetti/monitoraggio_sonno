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
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Chiudi"
                            ></button>
                        </div>
                        <div className="modal-body">{prpos.children}</div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="btn btn-info"
                data-bs-toggle="modal"
                data-bs-target={`#${prpos.modalId}`}
            >
                i
            </button>
        </div>
    );
}

export default Popup;
