import React, { Fragment } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Address Details</Typography>,
      icon: <HomeIcon fontSize="large" />,
    },
    {
      label: <Typography>Checkout </Typography>,
      icon: <LibraryAddCheckIcon fontSize="large" />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <ThumbUpAltIcon fontSize="large" />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
    marginTop: "20px",
  };
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
