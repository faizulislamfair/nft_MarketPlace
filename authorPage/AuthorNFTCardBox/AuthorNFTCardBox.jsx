import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import { Loader } from "../../components/componentsindex";

const AuthorNFTCardBox = ({
    collectiables,
    created,
    like,
    follower,
    following,
    nfts,
    myNFTS,
}) => {

    const collectiablesArray = [
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

    const createdArray = [
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
        }
    ];

    const likeArray = [
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

    const followerArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
    ];

    const followingArray = [
        {
            background: images.creatorbackground3,
            user: images.user3,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
        {
            background: images.creatorbackground1,
            user: images.user1,
            seller: "d84ff74hf99999f9974hf774f99f",
        },
    ]


    return (
        <div className={Style.AuthorNFTCardBox}>

            {collectiables && <NFTCardTwo NFTData={collectiablesArray} />}
            {created && <NFTCardTwo NFTData={createdArray} />}
            {like && <NFTCardTwo NFTData={likeArray} />}


            {
                follower && (
                    <div className={Style.AuthorNFTCardBox_box}>
                        {followerArray.map((el, i) => (
                            <FollowerTabCard i={i} el={el} />
                        ))}
                    </div>)
            }


            {
                following && (
                    <div className={Style.AuthorNFTCardBox_box}>
                        {followingArray.map((el, i) => (
                            <FollowerTabCard i={i} el={el} />
                        ))}
                    </div>)
            }


        </div>
    );
};

export default AuthorNFTCardBox;