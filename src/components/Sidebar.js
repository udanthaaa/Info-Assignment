import React from "react";
import { Box, Flex, Drawer, DrawerBody, Icon, useColorModeValue, DrawerOverlay, useDisclosure, DrawerContent, DrawerCloseButton, Text, HStack } from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { IoMenuOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const renderTrack = ({ style, ...props }) => {
  const trackStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};

const renderView = ({ style, ...props }) => {
  const viewStyle = {
    padding: 15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};

const SidebarLinks = ({ routes }) => {
  const location = useLocation();
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");
  const activeIcon = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const brandColor = useColorModeValue("brand.500", "brand.400");

  const activeRoute = (routeName) => location.pathname.includes(routeName);

  const createLinks = (routes) => {
    return routes.map((route, index) => (
      <NavLink key={index} to={route.layout + route.path}>
        <Box>
          <HStack spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"} py='5px' ps='10px'>
            {route.icon && (
              <Box color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor} me='18px'>
                {route.icon}
              </Box>
            )}
            <Text
              me='auto'
              color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
              fontWeight={activeRoute(route.path.toLowerCase()) ? "bold" : "normal"}
            >
              {route.name}
            </Text>
            <Box h='36px' w='4px' bg={activeRoute(route.path.toLowerCase()) ? brandColor : "transparent"} borderRadius='5px' />
          </HStack>
        </Box>
      </NavLink>
    ));
  };

  return createLinks(routes);
};

const Sidebar = ({ routes }) => {
  const sidebarBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue("14px 17px 40px 4px rgba(112, 144, 176, 0.08)", "unset");
  const variantChange = "0.2s linear";

  return (
    <Box display={{ sm: "none", xl: "block" }} w="100%" position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="300px"
        h="100vh"
        m="0px"
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
          <SidebarLinks routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
};

export const SidebarResponsive = ({ routes }) => {
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  const menuColor = useColorModeValue("gray.400", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon as={IoMenuOutline} color={menuColor} my="auto" w="20px" h="20px" me="10px" _hover={{ cursor: "pointer" }} />
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} placement={document.documentElement.dir === "rtl" ? "right" : "left"} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton zIndex="3" onClose={onClose} _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars autoHide renderTrackVertical={renderTrack} renderThumbVertical={renderThumb} renderView={renderView}>
              <SidebarLinks routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SidebarLinks.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidebar;

const routes = [
  { path: "/dashboard", name: "Dashboard", layout: "", icon: null },
  { path: "/cv-creation", name: "Create CV", layout: "", icon: null },
  { path: "/cv-list", name: "View CVs", layout: "", icon: null },
];

export { routes };
