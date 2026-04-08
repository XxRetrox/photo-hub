function Footer(params) {
  const data = new Date();
  const year = data.getFullYear();

  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="f"></div>
        <div className="f"></div>
        <div className="f"></div>
        <div className="f"></div>
        <div className="f"></div>
        <div className="f"></div>
        <div className="f"></div>
        <div className="f"></div>
      </div>
      <div className="footer-logo"></div>
      <div className="footer-copy">
        <p>Copyright &copy {year}</p>
      </div>
    </div>
  );
}

export default Footer;
