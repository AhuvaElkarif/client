import { useEffect } from "react";

const Table = () => {

    useEffect = () => {
        const { data } = this.props;
        let tableData = []
        for (let me in data) {
            let object = {
                //select and modify data from incoming server data
                date: 'fake date'
            }
            tableData.push(object)
        }
        this.setState({
            data: tableData
        }), []
    }
    return (
        <React-Table
            //...settings
            data={this.state.data}
        />
    )
}

export default Table;