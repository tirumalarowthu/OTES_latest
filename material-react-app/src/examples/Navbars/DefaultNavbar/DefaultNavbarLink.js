/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-router-dom components
import { Link ,useLocation} from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultNavbarLink({ icon, name, route, light }) {
  const location = useLocation();
  const isActive = location.pathname === route;
  return (
    <MDBox
      component={Link}
      to={route}
      mx={1}
      p={1}
      display="flex"
      color="white"
      alignItems="center"
      variant= {isActive && "gradient"}
      sx={isActive && { cursor: "pointer", userSelect: "none",background:'#007aff',borderRadius:"8px"}}

    >
      <Icon
        sx={{
          color: ({ palette: { white, secondary } }) => (isActive ? white.main : secondary.main),
          // color: ({ palette: { white, secondary } }) => (light ? white.main : secondary.main),
          // color:"white",
          verticalAlign: "middle",
        }}
      >
        {icon}
      </Icon>
      <MDTypography
        variant="button"
        // color={isActive && "white"}
        fontWeight="regular"
        // color={light ? "white" : "dark"}
        color={isActive ? "white" : "dark"}
        textTransform="capitalize"
        sx={{ width: "100%", lineHeight: 0 }}
      >
        &nbsp;{name}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the DefaultNavbarLink
DefaultNavbarLink.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired,
};

export default DefaultNavbarLink;
