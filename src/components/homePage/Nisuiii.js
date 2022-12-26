import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `http://localhost:81/img/${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `http://localhost:81/img/${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function Nisuiii() {
    const [arr, setArr] = useState([]);
    const attractions = useSelector(state => state.attractionArr);
    useEffect(() => {
        const vec = [...attractions];
        vec.sort((a, b) => b.CountAvgGrading - a.CountAvgGrading);
        console.log(attractions);
        console.log(vec)

        setArr(vec);
    }, [attractions]);
    console.log(arr)
let width=60;
    return <a href="recipe">

        <div>
            {/* height: 'GridNoRowsOverlay' */}
            <ImageList sx={{ width: 1536, height: 450 }} cols={4}
                rowHeight={150}>
                {arr.length > 0 && arr.map((item, index) => {
                    // if (index < 6)
                       width -=5;
                        const x = srcset(item.Images.slice(0, 14), 121);
                    return (

                        <ImageListItem key={item.Id} style={{ margin:"0.5rem"}}>
                            <img
                                 src={ `http://localhost:81/img/${item.Images.slice(0, 14)}`}
                                //  srcSet={ `http://localhost:81/img/${image}?w=${size * cols}&h=${size * rows
                                //      }&fit=crop&auto=format&dpr=2 2x`}
                                sizes={121}
                                width={width+"vw"}

                                alt={item.Name}
                                loading="lazy"
                            />

                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={item.Name}
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'white' }}
                                        aria-label={`star ${item.Name}`}
                                    >
                                        {/* <PlayArrowIcon /><h6>1200</h6> */}
                                        {/* <FavoriteBorderIcon /><h6>127k</h6> */}
                                    </IconButton>


                                }
                                actionPosition="left"

                            />

                        </ImageListItem>
                    )

                })
                }
            </ImageList>
        </div>
    </a>
}