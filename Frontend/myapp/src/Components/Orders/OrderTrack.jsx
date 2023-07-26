import React, { Fragment } from "react";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
const CheckOutSteps = ({ status }) => {
  // console.log(status);
  let activeStep;
  if (status === "Processing") {
    activeStep = 0;
  } else if (status === "Shipped") {
    activeStep = 1;
  } else {
    activeStep = 2;
  }
  const steps = [
    {
      label: <Typography>Processing</Typography>,
      icon: <ApartmentIcon fontSize="large" />,
    },
    {
      label: <Typography>Shipping </Typography>,
      icon: <AirportShuttleIcon fontSize="large" />,
    },
    {
      label: <Typography>Delivered</Typography>,
      icon: <LocalShippingIcon fontSize="large" />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
    marginTop: "20px",
  };
  // console.log("----step---", activeStep);
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} styles={stepStyles}>
        {steps.map((item, idx) => {
          return (
            <Step
              key={idx}
              active={activeStep === idx ? true : false}
              completed={activeStep >= idx ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= idx ? "tomato" : "rgba(0,0,0,0.349)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Fragment>
  );
};

export default CheckOutSteps;
