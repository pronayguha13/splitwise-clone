import { ConfigProvider } from "antd";
import AppRouter from "@/router/AppRouter";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#1f8c6e",
                    borderRadius: 10,
                    fontFamily: "Avenir, Montserrat, ui-sans-serif, system-ui, sans-serif",
                },
            }}
        >
            <AppRouter />
        </ConfigProvider>
    );
}

export default App;
