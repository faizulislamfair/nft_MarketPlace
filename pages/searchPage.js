import React from 'react'

// Internal Import
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";


const searchPage = () => {


    const collectionArray = [
        {
            image: images.nft_image_1
        },
        {
            image: images.nft_image_2
        },
        {
            image: images.nft_image_3
        },
        {
            image: images.nft_image_1
        },
        {
            image: images.nft_image_2
        },
        {
            image: images.nft_image_3
        },
        {
            image: images.nft_image_1
        },
        {
            image: images.nft_image_2
        }
    ];


    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar />
            <Filter />
            <NFTCardTwo NFTData={collectionArray} />
            <Slider />
            <Brand />
        </div>
    )
}

export default searchPage