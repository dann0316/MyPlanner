// import reactLogo from './assets/react.svg'

import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import DayPlan from "./pages/DayPlan.tsx";
import MonthPlan from "./pages/MonthPlan.tsx";
import TodayPlan from "./pages/TodayPlan.tsx";
import Skeleton from "./pages/skeleton.tsx";
import { Nav, Container, Navbar } from "react-bootstrap";
import "./App.css";

function App() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 900); //  로딩 효과 살짝 주기 위한 딜레이

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    return (
        <>
            <Navbar
                expand="lg"
                className="bg-body-tertiary navbar "
                id="header"
            >
                <Container>
                    <Navbar.Brand
                        className="headerMenu"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home(Today)
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto headerMenuContainer">
                            <Nav.Link
                            className="headerMenu"
                                onClick={() => {
                                    navigate("/dayplan");
                                }}
                            >
                                Weekly-Plan
                            </Nav.Link>
                            <Nav.Link
                            className="headerMenu"
                                onClick={() => {
                                    navigate("/monthplan");
                                }}
                            >
                                Mothly-Event&Memo
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route
                    path="/"
                    element={isLoading ? <Skeleton /> : <TodayPlan />}
                />
                <Route path="/monthplan" element={isLoading ? <Skeleton /> :<MonthPlan />} />
                <Route path="/dayplan" element={isLoading ? <Skeleton /> :<DayPlan />} />
            </Routes>
        </>
    );
}

export default App;
