import { useSelector, useDispatch } from "react-redux";
import { setDownloadCard } from "../state/booleanslice";

function DownloadPopup(params) {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.boolean.downloaded);
  const socials = useSelector((state) => state.photos.photoSocials);

  function hide() {
    dispatch(setDownloadCard(false));
  }

  function redir(e) {
    const social = e.currentTarget.id;

    if (social === "insta") {
      const url = `https://www.instagram.com/${socials.instagram_username}`;
      window.open(url, "_blank", "noopener noreferrer");
    } else if (social === "portfolio") {
      const url = socials.portfolio_url;
      window.open(url, "_blank", "noopener noreferrer");
    } else {
      const url = `https://x.com/${socials.twitter_username}`;
      window.open(url, "_blank", "noopener noreferrer");
    }
  }

  return (
    <div className={show ? "fixed-bot" : "slide"}>
      <div className="wra">
        <div className="x-button" onClick={hide}>
          <p>X</p>
        </div>
        <div className="content">
          <h5 className="sub-head">
            <strong>Thanks for downloading!</strong> 😁 do not forget to support
            the creator's work by clicking on their socials to appreciate their
            works and share with others.
          </h5>
          <div className="socials">
            {socials.instagram_username !== null ? (
              <div id="insta" className="links" onClick={redir}>
                <div className="social-logo insta"></div>
                <div>
                  <p className="logo-text">{socials.instagram_username}</p>
                </div>
              </div>
            ) : null}
            {socials.portfolio_url !== null ? (
              <div id="portfolio" className="links" onClick={redir}>
                <div className="social-logo port"></div>
                <div>
                  <p className="logo-text">{socials.portfolio_url}</p>
                </div>
              </div>
            ) : null}
            {socials.twitter_username !== null ? (
              <div id="x" className="links" onClick={redir}>
                <div className="social-logo x"></div>
                <div>
                  <p className="logo-text">{socials.twitter_username}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadPopup;
