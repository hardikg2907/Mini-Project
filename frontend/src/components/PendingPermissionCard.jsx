import moment from 'moment'

export const PendingPermissionCard = ({permission}) =>{

    return (
        <div className='permCard'>
            <div className='cardTitle'>
                <h3>{permission.title}</h3>
            </div>
            <div className='cardDetail'>
                <p>{moment(permission.startDate).format('LL')}</p>
            </div>
        </div>
    )
}