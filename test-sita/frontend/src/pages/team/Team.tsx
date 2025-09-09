import React, { useEffect, useState } from 'react';

// API
import api from "../../config/api"
import { ListLeagues, ListNationalities, ListTeam } from "../../types/api/responses"
import { Player } from '../../types/general/player';

// Components
import PlayerModal from '../../components/playerModal/PlayerModal';

// Styles
import './_TeamPage.scss';
import '../../scss/default.scss';



function Team() {

    // Team
    const [teamGk, setTeamGk] = useState<Player[]>([]);
    const [teamCb, setTeamCb] = useState<Player[]>([]);
    const [teamLb, setTeamLb] = useState<Player[]>([]);
    const [teamRb, setTeamRb] = useState<Player[]>([]);
    const [teamCm, setTeamCm] = useState<Player[]>([]);
    const [teamLm, setTeamLm] = useState<Player[]>([]);
    const [teamRm, setTeamRm] = useState<Player[]>([]);
    const [teamSt, setTeamSt] = useState<Player[]>([]);

    // Filters
    const [filterLeague, setFilterLeague] = useState<string>('');
    const [filterNationality, setFilterNationality] = useState<string>('');

    // Filter options
    const [optionsLeague, setOptionsLeague] = useState<string[]>([]);
    const [optionsNationality, setOptionsNationality] = useState<string[]>([]);

    // Modal
    const [playerModalOpen, setPlayerModalOpen] = useState<boolean>(false);
    const [modalPlayer, setModalPlayer] = useState<Player | null>(null);

    useEffect(() => {
        // Initialize fields
        fetchLeagues().then((res) => {
            setOptionsLeague(res.data.data.filter((l) => l !== ''))
        })

        fetchNationalities().then((res) => {
            setOptionsNationality(res.data.data)
        })

        fetchTeam().then((res) => {
            const t = res.data.data;

            setTeamGk(t.gk);
            setTeamCb(t.cb);
            setTeamLb(t.lb);
            setTeamRb(t.rb);
            setTeamCm(t.cm);
            setTeamLm(t.lm);
            setTeamRm(t.rm);
            setTeamSt(t.st);
        })


    }, [])

    const fetchTeam = async () => {
        // Filter
        const filters = [];

        /// League
        if (filterLeague) {
            filters.push(`league=${filterLeague}`)
        }

        /// Nationality
        if (filterNationality) {
            filters.push(`nationality=${filterNationality}`)
        }

        var searchFilters = '';

        if (filters.length > 0) {
            searchFilters = '?';
            searchFilters += filters.join('&')
        }

        const API_ROUTE = `/team/best${searchFilters}`;
        return api.get<ListTeam>(API_ROUTE);
    }

    // Fetch infos
    const fetchLeagues = async () => {
        const API_ROUTE = `all/leagues`;
        return api.get<ListLeagues>(API_ROUTE);
    }


    const fetchNationalities = async () => {
        const API_ROUTE = `all/nationalities`;
        return api.get<ListNationalities>(API_ROUTE);
    }


    function LittleMember({ player, position }: { player: Player | null, position: string }) {
        return (
            <div onClick={() => {
                if (player) {
                    setModalPlayer(player);
                    setPlayerModalOpen(true)
                }

            }} className={'member ' + (player ? '' : 'unavailable')}>
                <span className='title'>{player ? player.short_name : ''}</span>
                <span className='score'><span className='number'>{player ? player.overall : ''}</span>pts</span>
                <span className='position'>{position}</span>

            </div>
        )

    }

    return (
        <div className="topPage">

            {playerModalOpen && modalPlayer ?
                <PlayerModal isOpen={true} onClose={() => setPlayerModalOpen(false)} player={modalPlayer} /> : null
            }

            <span className="pageTitle">Top teams</span>
            <span className="pageDescription">Find out about your dream team composition.</span>

            <div className='filters'>

                <div className='filterTeam'>
                    <span>League</span>
                    <select className={filterLeague ? '' : 'off'} value={filterLeague} onChange={(e) => { setFilterLeague(e.target.value) }}>
                        <option value="">None</option>
                        {optionsLeague.map((l, i) => {
                            return (
                                <option key={'option_lea_' + i} value={l}>
                                    {l}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className='filterTeam'>
                    <span>Nationality</span>
                    <select className={filterNationality ? '' : 'off'} value={filterNationality} onChange={(e) => { setFilterNationality(e.target.value) }}>
                        <option value="">None</option>
                        {optionsNationality.map((n, i) => {
                            return (
                                <option key={'option_nat_' + i} value={n}>
                                    {n}
                                </option>
                            )
                        })}
                    </select>
                </div>


            </div>
            <div className='filterButtons'>
                <button className='search' onClick={() => {
                    fetchTeam().then((res) => {
                        const t = res.data.data;
                        setTeamGk(t.gk);
                        setTeamCb(t.cb);
                        setTeamLb(t.lb);
                        setTeamRb(t.rb);
                        setTeamCm(t.cm);
                        setTeamLm(t.lm);
                        setTeamRm(t.rm);
                        setTeamSt(t.st);
                    })
                }}>Search</button>
                <button className='clear' onClick={() => {
                    setFilterLeague('')
                    setFilterNationality('')
                }}>Clear filters</button>
            </div>
            <div className='entireTeam'>
                <div onClick={() => {
                    if (teamGk[0]) {
                        setModalPlayer(teamGk[0]);
                        setPlayerModalOpen(true)
                    }

                }} className={'bigMember ' + (teamGk[0] ? '' : 'unavailable')}>
                    <span className='title'>{teamGk[0] ? teamGk[0].short_name : ''}</span>
                    <span className='score'>
                        <span className='number'>{teamGk[0] ? teamGk[0].overall : ''}</span> pts</span>

                    <span className='position'>GK</span>

                </div>
                <div className='side'>
                    <div className='row'>
                        <LittleMember player={teamCb[0]} position={'cb'} />
                        <LittleMember player={teamCb[1]} position={'cb'} />
                        <LittleMember player={teamLb[0]} position={'lb'} />
                        <LittleMember player={teamRb[0]} position={'rb'} />
                        <LittleMember player={teamCm[0]} position={'cm'} />
                    </div>
                    <div className='row'>
                        <LittleMember player={teamCm[1]} position={'cm'} />
                        <LittleMember player={teamLm[0]} position={'lm'} />
                        <LittleMember player={teamRm[0]} position={'rm'} />
                        <LittleMember player={teamSt[0]} position={'st'} />
                        <LittleMember player={teamSt[1]} position={'st'} />
                    </div>
                </div>


            </div>
        </div >
    );
}

export default Team;
