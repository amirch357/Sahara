import React from "react";

// Chakra imports
import { Flex, useColorModeValue,Text } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";



export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Flex> 
        <Text fontSize="4xl" fontWeight="bold">Sahara</Text>
        <Text pt="22px" pl="5px">Trust for Life</Text>
      </Flex>
     
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
