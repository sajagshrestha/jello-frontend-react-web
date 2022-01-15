import React from "react";
import { Button, Container } from "@mui/material";
import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ROUTES from "../../Router/routes";
import Upload from "./components/Upload";

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.UPLOAD}>Upload</Link>
        </li>
        <li>
          <Link to={ROUTES.FEED}>All Posts</Link>
        </li>
      </ul>
      <Routes>
        <Route path={ROUTES.UPLOAD} element={<Upload />} />
      </Routes>
    </div>
  );
}

export default Home;
