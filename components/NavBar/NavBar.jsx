import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
// Import Icon
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg';


// Internal import
import Style from './NavBar.module.css';

import { Discover, HelpCenter, Notification, Profile, SideBar } from './index';
import { Button } from '../componentsindex';
import images from '../../img';


const NavBar = () => {

    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const openMenu = (e) => {

        const btnText = e.target.innerText;

        if (btnText == 'Discover') {
            setDiscover(true);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }
        else if (btnText == 'Help Center') {
            setDiscover(false);
            setHelp(true);
            setNotification(false);
            setProfile(false);
        }
        else {
            setDiscover(false);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }

    };


    const openNotification = () => {
        if (!notification) {
            setNotification(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else {
            setNotification(false);
        }
    }


    const openProfile = () => {
        if (!profile) {
            setProfile(true);
            setHelp(false);
            setDiscover(false);
            setNotification(false);
        } else {
            setProfile(false);
        }
    }


    const openSideBar = () => {
        if (!openSideMenu) {
            setOpenSideMenu(true);
        } else {
            setOpenSideMenu(false);
        }
    }



    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>

                {/* Left Section */}

                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <Image
                            src={images.logo}
                            alt="NFT Marketplace"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type="text" placeholder='Search NFT' />
                            <BsSearch onClick={() => { }} className={Style.search_icon} />
                        </div>
                    </div>
                </div>



                {/* Right Section */}

                <div className={Style.navbar_container_right}>
                    <div className={Style.navbar_container_right_discover}>

                        {/* Discover Menu */}

                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {
                            discover && (
                                <div className={Style.navbar_container_right_discover_box}>
                                    <Discover />
                                </div>
                            )}
                    </div>

                    {/* Help Center Menu */}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={(e) => openMenu(e)}>Help Center</p>
                        {
                            help && (
                                <div className={Style.navbar_container_right_help_box}>
                                    <HelpCenter />
                                </div>
                            )
                        }
                    </div>


                    {/* Notification */}

                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications
                            className={Style.notify}
                            onClick={() => openNotification()}
                        />

                        {
                            notification && <Notification />
                        }
                    </div>


                    {/* Button Section */}
                    <div className={Style.navbar_container_right_button}>
                        <Button btnName="Create" handleClick={() => { }} />
                    </div>


                    {/* User Profile */}

                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            <Image
                                src={images.user1}
                                alt="Profile"
                                width={40}
                                height={40}
                                onClick={() => openProfile()}
                                className={Style.navbar_container_right_profile}
                            />

                            {
                                profile && <Profile />
                            }
                        </div>
                    </div>

                    {/* Menu Button */}

                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight
                            className={Style.menuIcon}
                            onClick={() => openSideBar()}
                        />
                    </div>

                </div>
            </div>

            {/* SideBar Component */}
            {
                openSideMenu && (
                    <div className={Style.sideBar}>
                        <SideBar setOpenSideMenu={setOpenSideMenu} />
                    </div>
                )
            }

        </div>
    )
}

export default NavBar