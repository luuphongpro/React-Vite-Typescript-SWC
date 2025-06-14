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
          colorPrimary: '#1677ff',
        },

      }}
    >
      <div className="min-h-screen dark:bg-gray-900">
        <Header />
        <Outlet />
      </div>
    </ConfigProvider>
  );
}

export default App;
