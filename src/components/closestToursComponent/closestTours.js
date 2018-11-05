import React, { Component } from 'react';
import {Row, Button, Table, ModalBody, Modal} from 'reactstrap';
import {Link, withRouter} from "react-router-dom";
import {getTopConcerts} from "../../actions/concerts";
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';
import './closestTours.css';

class closestTours extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        if (this.props.lang !== props.lang) {
            this.props.willMount(props.lang);
        }
    }
    componentWillMount() {
        if (this.props.concerts && this.props.concerts !== 'LOADING') {
            this.props.willMount(this.props.lang);
        }
    }


    render() {

        const concerts = this.props.concerts;
        const strings = new LocalizedStrings({
            ru: {
                closest: 'Ближайшие туры',
                all: 'Все концерты',
                follow: 'Следуйте за нами в наши удивительные туры в 2018 году по всему миру',
                buy: 'Купить билет',
                item: 'Билет',
                months: ['','январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
                comingSoon: 'Скоро...'
            },
            kz: {
                closest: 'Жақын арадағы турлар',
                all: 'Барлық концерттер',
                follow: '2018 жылы бүкіл әлем бойынша біздің таңғажайып саяхатка бас салыныз',
                buy: 'Сатып алу',
                item: 'Билет',
                months: ['','қантар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
                comingSoon: 'Жақын арада...'
            },
            en:{
                closest: 'Upcoming tours',
                all: 'All concerts',
                follow: 'Join us on our amazing tour all around the world in 2018',
                buy: 'Buy ticket',
                item: 'Ticket',
                months: ['','january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
                comingSoon: 'Coming Soon...'
            }
        });
        strings.setLanguage(this.props.lang);
        const getConcerts = () => {
            if (!concerts) return;
            if (concerts === 'LOADING') return;
            let rows = [];
            concerts.map((concert, index) => {
                rows.push(
                    <tr key={index}>
                        <td style={{lineHeight: '2rem'}}>
                        <span className="font-weight-bold" style={{fontSize: '3.4rem', lineHeight: '3.4rem'}}>
                            {concert.concert_time.getDate()}
                        </span><br/>
                            <span style={{fontSize: '1.8rem'}}>
                                {strings.months[concert.concert_time.getMonth() + 1]} ({ '' + ('0' + concert.concert_time.getHours()).slice(-2) + ':' + ('0' + concert.concert_time.getMinutes()).slice(-2)})
                        </span>
                        </td>
                        <td style={{padding: '10px 20px'}}>
                            <div className="image-container mx-auto" style={{height:'50px', width:'50px'}}>
                                <img src={concert.concert_image} alt=""  style={{maxHeight:'100%', maxWidth:'100%', height: 'auto', width: 'auto'}}/>
                            </div>
                        </td>
                        <td>
                            <h4 className="mb-0">{concert.concert_title}</h4>
                            <p className="mb-0">{concert.concert_location}</p>
                        </td>
                        <td>
                            <h4 className="mb-0">
                                {concert.concert_min_cost} - {concert.concert_max_cost} {concert.concert_cost_currency}
                            </h4>
                            <p className="mb-0">
                                {strings.item}
                            </p>
                        </td>
                        <td className="text-right">
                            <a href={concert.concert_sale_link} target="_blank">
                                <Button color="danger" style={{marginTop: '7px'}}>
                                    <span className="text-uppercase">{strings.buy}</span>
                                </Button>
                            </a>
                        </td>
                    </tr>
                )
            });
            return rows;
        };

        return (
            <section className={(this.props.lined ? 'bg-lined ' : '') + "bg-black color-white full-view py-100 py-md-155 d-flex align-items-center"}>
                <div className="container">
                    <Row className="mb-5">
                        <div className="col-12 d-flex mb-3">
                            <h2>
                                <span className="text-uppercase">{strings.closest}</span>
                            </h2>
                            <a href="http://juzent.com/tickets" className="ml-auto" target="_blank">
                                <Button color="secondary">
                                    <span className="text-uppercase">{strings.all}</span>
                                </Button>
                            </a>
                        </div>
                        <div className="col-12">
                            <p>{strings.follow}</p>
                        </div>
                    </Row>
                    <Row style={{overflowX: 'auto'}}>
                        <div className="col-12">
                            {
                                (concerts.length > 0) ?
                                    <Table dark className="table-tours">
                                        <tbody>
                                        { getConcerts() }
                                        </tbody>
                                    </Table>
                                    :
                                    <h2>{strings.comingSoon}</h2>
                            }
                        </div>
                    </Row>
                </div>
            </section>
        )
    }
}

export default withRouter(connect(
    state => ({
        concerts: state.concerts,
        lang: state.languages,

    }),
    dispatch => ({
        willMount: (lang) => {
            dispatch(getTopConcerts(lang));
        }
    })
)(closestTours));