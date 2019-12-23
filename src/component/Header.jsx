import React from "react";
import styled from "styled-components";
import banner from "../asset/red-banner.svg";
import ribon from "../asset/christmas-ribon.svg";
import CreateBackground from "../component/CreateBackground";

const Banner = styled.img`
  width: 100%;
  height: 52px;
`;

const Ribon = styled.img`
  width: 80%;
  height: 126px;
  margin-top: -38px;
`;

const HeaderWrapper = styled.div`
  height: 0px;
`;

const RibonWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-algin: center;
`;

const Text = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 38px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

function Header() {
  return (
    <>
      <HeaderWrapper>
        <Banner src={banner} alt="banner" />
        <RibonWrapper>
          <Ribon src={ribon} alt="ribon" />
          <Text>Happy Holidays!</Text>
        </RibonWrapper>
      </HeaderWrapper>
      <CreateBackground />
    </>
  );
}
export default Header;
