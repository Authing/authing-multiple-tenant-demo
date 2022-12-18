import React, { FC } from "react";

export const GuardPanelFooter: FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  return (
    <>
      <footer
        style={{
          fontSize: 12,
          paddingTop: "12px",
          paddingBottom: "40px",
          textAlign: "center",
          position: "sticky",
          top: "100%",
        }}
      >
        <div className="powered-by-authing" style={{ color: "#999999" }}>
          Powered by{" "}
          <span
            style={{
              cursor: "pointer",
            }}
          >
            <img
              width="56px"
              object-fit="contain"
              alt="Authing"
              src="https://files.authing.co/authing-console/authing-logo-new.svg"
            />
          </span>
        </div>
      </footer>
    </>
  );
};
