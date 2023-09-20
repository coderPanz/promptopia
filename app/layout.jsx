import "@/styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// 更改应用程序的元数据
export const metadata = {
  title: "Promptopia",
  description: "发现 & 共享AI提示!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};
export default RootLayout;
