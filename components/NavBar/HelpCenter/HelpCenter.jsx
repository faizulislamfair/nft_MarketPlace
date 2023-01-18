import React from 'react';
import Link from 'next/link';

// Internal Import
import Style from './HelpCenter.module.css';


const HelpCenter = () => {

    const helpCenter = [
        {
            name: 'About',
            link: 'aboutus'
        },
        {
            name: 'Contact Us',
            link: 'contactus'
        },
        {
            name: 'Sign Up',
            link: 'sign-up'
        },
        {
            name: 'Sign In',
            link: 'sign-in'
        },
        {
            name: 'Subscription',
            link: 'subscription'
        }
    ]

    return (
        <div className={Style.box}>
            {
                helpCenter.map((el, i) => (
                    <div className={Style.helpCenter}>
                        <Link href={{ pathname: `${el.link}` }} >
                            {el.name}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default HelpCenter