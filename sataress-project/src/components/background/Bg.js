import * as React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";

export default function Bg() {
    const Bg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 217px;
  background: linear-gradient(
    180deg,
    rgba(254, 68, 10, 0) 7.81%,
    #ffbdbd 95.83%
  );

  background-size: cover;
  @media screen and (max-width: 1024px) {
    width: 300px;
    height: 500px;

  }
  @media screen and (max-width: 640px) {
    width: 200px;
    height: 400px;

  }
`;

}