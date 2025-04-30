import { useEffect } from "react";

const SecretKey = () => {

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.backgroundColor = "#1e1e1e";
  }, []);

  const jsonData = {
    key: "jwt_hackz_r_fun"
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
        height: "100vh",
        width: "100vw",
        fontFamily: "monospace",
        margin: 0,
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default SecretKey;