import React from 'react';
import { BiLinkExternal } from "react-icons/bi"

const MatchCard = (props) => {
    const { investor_site, communication_created, status } = props.data

    let investor_name = investor_site.split('/')[2].split('.')[0]
    let apply_time = communication_created.substring(0, 10).split('-').reverse().join('/')

    return (
        <div className="matchCard">
            <div className="investorName">{investor_name}</div>
            <div className="site">{investor_site} <a href={`https://google.com?q=${investor_site}`} target="_blank" rel='noreferrer'><BiLinkExternal /></a></div>
            <div className="applied">Applied: {apply_time}</div>
            <div className="status">Status: {status}</div>
        </div>
    )
}

export default MatchCard