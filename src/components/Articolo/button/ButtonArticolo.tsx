

type ButtonArticoloProps = {

    target: string;

}
function ButtonArticolo(props: ButtonArticoloProps) {
    return (
        <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target={`#${props.target}`} aria-expanded="false" aria-controls="collapseExample">
            <i className="bi bi-chevron-down"></i>
        </button>
    )
}

export default ButtonArticolo;