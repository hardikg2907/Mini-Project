import moment from 'moment'

export const PendingPermissionCard = ({permission}) =>{

    return (
        <div>
            <h3>{permission.title}</h3>
            <p>{moment(permission.startDate).format('LL')}</p>
        </div>
    )
}