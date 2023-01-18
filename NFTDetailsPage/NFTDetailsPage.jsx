import React from "react";

// Internal Import
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ nft }) => {
    return (
        <div className={Style.NFTDetailsPage}>
            <div className={Style.NFTDetailsPage_box}>
                <NFTDetailsImg />
                <NFTDescription />
            </div>
        </div>
    );
};

export default NFTDetailsPage;