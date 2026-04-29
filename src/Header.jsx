import React from "react";

function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="header-copy">
        <p className="eyebrow">Student management</p>
        <h1>{title}</h1>
        {subtitle ? <p className="header-subtitle">{subtitle}</p> : null}
      </div>
    </header>
  );
}

export default Header;
