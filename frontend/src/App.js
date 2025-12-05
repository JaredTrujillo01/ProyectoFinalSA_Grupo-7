import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/loginpages";
import RegisterClientePage from "./pages/registerclipages";
import RegisterEmpleadoPage from "./pages/registeremppage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>Mi App</h1>
        <LoginPage />
        <hr />
        <RegisterClientePage />
        <hr />
        <RegisterEmpleadoPage />
      </div>
    </AuthProvider>
  );
}

export default App;
