import React from "react";
import styled from "styled-components";

type FooterPropsType = {
  themeType: String;
};

const Footer = (props1: FooterPropsType) => {
  const FooterBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    background-color: ${(p2) => (p2.theme === "basic" ? "skyblue" : "yellow")};
    text-align: center;
  `;
  return <FooterBox theme={props1.themeType}>React styled-components Test</FooterBox>;
};
export default Footer;
