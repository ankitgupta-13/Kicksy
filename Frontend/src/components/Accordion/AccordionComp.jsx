import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import returnIcon from "../../assets/return-icon.png";

export default function AccordionComp({ isInStock, canReturn }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              color: "#656565",
            }}
          >
            <VerifiedUserOutlinedIcon /> Authenticity Guaranteed
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "#656565" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ color: "#656565" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              fontFamily: "Noir Pro",
            }}
          >
            <LocalShippingOutlinedIcon />{" "}
            {isInStock ? `In Stock and Ready to ship` : `Out of Stock`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ color: "#656565" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {" "}
            <img
              style={{ width: "1.5rem", height: "1.5rem" }}
              src={returnIcon}
            />{" "}
            {canReturn ? `Returns Accepted` : `Returns Not Accepted`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
