import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Login from "./Login.tsx";
import Registrazione from "./Registrazione.tsx";
import { UserProvider } from "./contesto/UserContext.tsx";
// rendering della app

createRoot(document.getElementById("root")!).render(
    <Router>
        <UserProvider >

            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registrazione" element={<Registrazione />} />
            </Routes>
        </UserProvider>

    </Router>

);
