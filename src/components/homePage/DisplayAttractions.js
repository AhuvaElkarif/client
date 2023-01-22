import { Button, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DisplayAttractions = ({ arr, name }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    return <div>
        <h1 className="header">| אטרקציות {name}</h1>
        <Grid container spacing={2} style={{ cursor: "pointer" }}>
            {arr.length > 0 && arr.map((item, index) => {
                if (index < 6)
                    return <Grid item xs={4} key={index}>
                        <img src={`http://localhost:81/img/${item.Images.slice(0, 14)}`}alt="" style={{ height: "40vh" }}
                            onClick={() => navigate("/detailsAttraction/" + item.Id)} width="100%" />
                        <h2 style={{ marginBottom: "1rem" }}> {item.Name}</h2>
                    </Grid>
            })}
        </Grid>
        <Button
            variant="contained"
            style={{ backgroundColor: "orange", color: "white" }}
            onClick={() => navigate(`/attractionsList/${user?.Status == 2 ? 2 : 0}`)}
        >  לכל האטרקציות ה{name}  </Button>
    </div>
}
export default DisplayAttractions;