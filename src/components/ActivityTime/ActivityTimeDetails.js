const ActivityTimeDetails = ({ times }) => {
    const getDayInWord = (day) => {
        switch (day) {
            case 1:
                return "ראשון";
            case 2:
                return "שני";
            case 3:
                return "שלישי";
            case 4:
                return "רביעי";
            case 5:
                return "חמישי";
            case 6:
                return "שישי";
            case 7:
                return "שבת";

            default:
                break;
        }
    }
    return (<div>
        {times.map(item => {
            const x = getDayInWord(item.DayInWeek);
            return <p key={item.Id}>  יום {x}: {(item.EndTime).slice(0,5)} - {(item.StartTime).slice(0,5)} </p>
        })}
    </div>
    )
}
export default ActivityTimeDetails;