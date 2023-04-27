
export const Popup = ({authority}) => {

    return (
        <div className="popup">
            <h4>{authority.authorityName}: </h4>
            <p>{authority.status}</p>
        </div>
    )
}
