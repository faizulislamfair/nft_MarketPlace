import React from "react";
import Image from "next/image";

// Internal Import
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
    return (
        <div className={Style.banner}>
            <div className={Style.banner_img}>
                <Image
                    style={{ objectFit: 'cover' }}
                    src={bannerImage}
                    alt="background"
                    width={1200}
                    height={100}
                />
            </div>

            <div className={Style.banner_img_mobile}>
                <Image
                    src={bannerImage}
                    style={{ objectFit: 'cover' }}
                    alt="background"
                />
            </div>
        </div>
    );
};

export default Banner;