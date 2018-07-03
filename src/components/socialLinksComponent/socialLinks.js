import React, {Component} from 'react'
import './socialLinks.css';

export default class SocialLinks extends Component {

    render() {
        const socials = [
            {label: 'mail', icon: 'icon-mail', prefix: 'mailto: '},
            {label:'youtube', icon:'icon-youtube'},
            {label:'facebook', icon:'icon-facebook'},
            {label:'twitter', icon:'icon-twitter'},
            {label:'instagram', icon:'icon-instagram'}
            ];
        const getSocials = () => {
            let alinks = [];
            socials.map((social, index) => {
                if(this.props[social.label]) {
                    alinks.push(
                        <a target="_blank" key={index} href={(social.prefix ? social.prefix : '') + this.props[social.label]}>
                            <span className={social.icon}/>
                        </a>
                    )
                }
            });
            return alinks;
        };
        return (
            <div className={ (this.props.dark ? 'dark ' : '') + "social-links"}>
                { getSocials() }
            </div>
        );
    }

}