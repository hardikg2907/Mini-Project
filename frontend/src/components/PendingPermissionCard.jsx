export const PendingPermissionCard = ({permission}) =>{

    return (
        <div>
            <h3>{permission.title}</h3>
            <p>{Date(permission.startDate)}</p>
        </div>
        
    )
}