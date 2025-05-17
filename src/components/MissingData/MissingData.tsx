function MissingData() {
    return (
        <div>
            <h1>Nessun dato presente</h1>
            <div className="alert alert-info mt-3 pt-3" role="alert">
                <div className="row gy-2 justify-content-between">
                    <div className="col-12">
                        <h3>Carica il tuo file qui</h3>
                    </div>
                    <form className="form-group col-12">
                        <div className="input-group">
                            <input
                                type="file"
                                className="form-control"
                                id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04"
                                aria-label="Upload"
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
                                required
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                id="inputGroupFileAddon04"
                                style={{
                                    transition: "all 0.2s ease",
                                    backgroundColor: "#18c599",
                                    // backgroundColor: "rgba(57, 79, 225, 0.67)",
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
                            >
                                <i className="bi bi-file-earmark-arrow-up"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MissingData;
