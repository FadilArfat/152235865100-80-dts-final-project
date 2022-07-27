import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// Di sini kita mengetahui bahwa nantinya CardMovie akan menerima
// suatu data dari ListMovie, maka kita langsung saja
// menerima props di sini
const jumbotron = ({ propsGame }) => {
  return (
    // <Card sx={{ width: "max-content", background: "rgb(46,46,46,0.0)" }}>
    //   <Box className="boxy" sx={{ display: "flex", flexDirection: "column", alignItems: "start", height: "fit-content", width: "fit-content" }}>
    //     <CardContent
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         flexDirection: "column",
    //         gap: 1,
    //         width: "fit-content",
    //       }}
    //     >
    //       <Link to={`/DetailGame/${propsGame.id}`}>
    //         <Typography component="div" variant="body1" sx={{ textAlign: "center" }}>
    //           {propsGame.name}
    //         </Typography>
    //       </Link>
    //       <CardMedia component="img" className="zoom" image={propsGame.background_image} alt={propsGame.name} sx={{ width: "80vh" }} />

    //       {/* <img style={{ zIndex: 2, position: "absolute", padding: "5px 0px 0px 5px", marginTop: "1.5em" }} src={esrb} alt={`${propsGame.esrb_rating.name}`} /> */}
    //     </CardContent>
    //   </Box>
    // </Card>
    <Box>
      <Link to={`/DetailGame/${propsGame.id}`}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { md: "80px", xs: "30px" },
            marginTop: "0px",
            paddingTop: { md: "300px", xs: "50px" },
            fontWeight: "bold",
            backgroundSize: { md: "auto", xs: "500px 300px" },
            paddingBottom: "-10px",
            backgroundRepeat: "no-repeat",
            backgroundColor: "gray",
            color: "whitesmoke",
            backgroundImage: `url(${propsGame.background_image})`,
            backgroundSize: "cover",
            height: "80vh",
            width: "100%",
            position: "relative",
            zIndex: -1,
            borderRadius: "5px",
          }}
        >
          <Typography variant="h2" sx={{ position: "absolute", zIndex: 100, marginLeft: 5, marginTop: 8, textShadow: "-7px 3px 9px #000000" }}>
            {propsGame.name}
          </Typography>
        </Typography>
      </Link>
    </Box>
  );
};

export default jumbotron;
