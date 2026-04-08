import { useSelector, useDispatch } from "react-redux";

// const API_KEY = "awMXFC3RsKaQ3nNjELoXXh9XFJbZMnTSrSw7IVzdJj0";

function Button2(props) {
  // const img_det = useSelector((state) => state.img.ImgArray);
  const loading = useSelector((state) => state.load.isDL);
  const dispatch = useDispatch();

  // const handleDownload = async (photo) => {
  //   try {
  //     dispatch(isLoading(true));
  //     await fetch(photo.links.download_location, {
  //       headers: {
  //         Authorization: `Client-ID ${API_KEY}`,
  //       },
  //     });

  //     // 2. Convert URL to Blob to force download
  //     const response = await fetch(photo.urls.full);
  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     // 3. Create a temporary anchor and trigger it
  //     const link = document.createElement("a");
  //     link.href = blobUrl;
  //     link.download = `unsplash-photo-${photo.id}.jpg`;
  //     document.body.appendChild(link);
  //     link.click();
  //     dispatch(isLoading(false));

  //     // 4. Cleanup memory
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(blobUrl);
  //   } catch (error) {
  //     console.error("Error downloading the image:", error);
  //   }
  // };

  return (
    <button
      disabled={loading}
      className={loading ? "bnt dis" : "bnt"}
      onClick={props.fName}
      type="button"
    >
      {props.bName}
    </button>
  );
}

export default Button2;
