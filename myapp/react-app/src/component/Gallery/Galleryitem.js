import React, { useState } from "react";
import Gallerydetail from "./Gallerydetail";

const GalleryItem = ({ item }) => {
  const [detailmodalOn, setdetailmodalOn] = useState(false);

  const handleClose = () => {
    setdetailmodalOn(false);
  };

  return (
    <div key={item.no}>
      <table className="gall-list-table" id={`board-table-${item.no}`} border="1">
        <tbody>
          <tr>
            <td>
              <div className="gall-div-detail-box">
                <Gallerydetail
                  show={detailmodalOn}
                  onHide={handleClose}
                  galleryNo={item.no}
                />
                <div
                  className="gall-div-detail"
                  onClick={() => setdetailmodalOn(true)}
                >
                  <img className="gall-img" src={item.attachedFiles[0].filepath} />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GalleryItem;
