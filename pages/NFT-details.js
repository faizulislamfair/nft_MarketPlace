import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Internal Import
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";


const NFTDetails = () => {

    return (
        <div>
            <NFTDetailsPage />
            <Category />
            <Brand />
        </div>
    );
};

export default NFTDetails;