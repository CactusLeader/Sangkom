import { Routes, Route } from "react-router-dom";

import Trending from "./routes/trending";
import Home from "./routes/home";
import Log from "./routes/log";
import Profil from "./routes/profil";

import { HomeLayout } from "./components/homeLayout";
import { ProtectedLayout } from "./components/protectedLayout";

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Log />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="profil" element={<Profil />} />
        <Route path="trending" element={<Trending />} />
      </Route>

      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
