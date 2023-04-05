export const PendingPermissionCard = ({permission}) =>{

    return (
        <div>
            <h3>{permission.title}</h3>
            <p>{permission.startDate}</p>
        </div>
        
    )
}