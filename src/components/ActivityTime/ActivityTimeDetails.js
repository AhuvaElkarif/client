const ActivityTimeDetails = ({ times }) => {
    return (<div>
        {times.map(item => {
            return  <p key={item.Id}>  יום: {item.DayInWeek} {item.StartTime} - {item.EndTime} </p>
        })}
    </div>
    )
}
export default ActivityTimeDetails;