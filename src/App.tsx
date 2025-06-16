import { Outlet } from "react-router-dom";
import Header from "./component/header/Header";
import useThemeStore from "./store/useThemeStore";
import { ConfigProvider, theme as antdTheme } from "antd";

function App() {
  const { theme } = useThemeStore();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#0d9488',
        },

      }}
    >
      <div className="min-h-screen bg-secondary">
        <Header />
        <Outlet />
      </div>
    </ConfigProvider>
  );
}

export default App;
