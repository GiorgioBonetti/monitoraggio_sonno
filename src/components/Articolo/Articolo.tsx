
type ArticoloProps = {

    children?: React.ReactNode;
    target: string;

}


function Articolo(props: ArticoloProps) {
    return (
        <div className="collapse" id={props.target}>
            {props.children}
        </div>
    );
}
export default Articolo;