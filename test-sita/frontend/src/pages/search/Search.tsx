import React, { useEffect, useState } from 'react';

// API
import api from "../../config/api"
import { SearchPlayers, ListLeagues, ListNationalities, ListPositions } from "../../types/api/responses"
import { Player } from '../../types/general/player';

// Components
import PlayerModal from '../../components/playerModal/PlayerModal';

// Styles
import './_SearchPage.scss';
import '../../scss/default.scss';
import Pagination from '../../components/pagination/Pagination';

// Consts
const ITEMS_PER_PAGE = 4;

function Search() {

    // Variables
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    // Filters
    const [filterName, setFilterName] = useState<string>('');
    const [filterTeam, setFilterTeam] = useState<string>('');
    const [filterLeague, setFilterLeague] = useState<string>('');
    const [filterNationality, setFilterNationality] = useState<string>('');
    const [filterPosition, setFilterPosition] = useState<string>('');

    // Filter options
    const [optionsLeague, setOptionsLeague] = useState<string[]>([]);
    const [optionsPosition, setOptionsPosition] = useState<{ name: string, desc: string }[]>([]);
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

        fetchPositions().then((res) => {
            setOptionsPosition(res.data.data)
        })


        fetchPage(0).then((res) => {
            setPlayers(res.data.data)
            setTotalPages(Math.ceil(res.data.totalCount / ITEMS_PER_PAGE))
        })
    }, [])

    const fetchPage = async (page: number) => {
        // Filter
        const filters = [];

        /// Name
        if (filterName) {
            filters.push(`name=${filterName}`)
        }

        /// Club
        if (filterTeam) {
            filters.push(`club=${filterTeam}`)
        }

        /// League
        if (filterLeague) {
            filters.push(`league=${filterLeague}`)
        }

        /// Nationality
        if (filterNationality) {
            filters.push(`nationality=${filterNationality}`)
        }

        /// Position
        if (filterPosition) {
            filters.push(`position=${filterPosition}`)
        }

        var searchFilters = '';

        if (filters.length > 0) {
            searchFilters = '&';
            searchFilters += filters.join('&')
        }


        const API_ROUTE = `players/search?items=${ITEMS_PER_PAGE}&page=${page}${searchFilters}`;
        return api.get<SearchPlayers>(API_ROUTE);
    }

    // Fetch infos
    const fetchLeagues = async () => {
        const API_ROUTE = `all/leagues`;
        return api.get<ListLeagues>(API_ROUTE);
    }

    const fetchPositions = async () => {
        const API_ROUTE = `all/positions`;
        return api.get<ListPositions>(API_ROUTE);
    }

    const fetchNationalities = async () => {
        const API_ROUTE = `all/nationalities`;
        return api.get<ListNationalities>(API_ROUTE);
    }


    return (
        <div className="searchPage">

            {playerModalOpen && modalPlayer ?
                <PlayerModal isOpen={true} onClose={() => setPlayerModalOpen(false)} player={modalPlayer} /> : null
            }

            <span className="pageTitle">Search Player</span>
            <span className="pageDescription">Find a specific player using the filters below.</span>

            <div className='filters'>
                <div className='filterTeam'>
                    <span>Name</span>
                    <input value={filterName} onChange={(e) => { setFilterName(e.target.value) }} placeholder='Neymar jr.' type="text" />
                </div>

                <div className='filterTeam'>
                    <span>Team</span>
                    <input value={filterTeam} onChange={(e) => { setFilterTeam(e.target.value) }} placeholder='FC Barcelona' type="text" />
                </div>

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

                <div className='filterTeam'>
                    <span>Position</span>
                    <select className={filterPosition ? '' : 'off'} value={filterPosition} onChange={(e) => { setFilterPosition(e.target.value) }}>
                        <option value="">None</option>
                        {optionsPosition.map((p, i) => {
                            return (
                                <option key={'option_pos_' + i} value={p.name}>
                                    {p.desc}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className='filterButtons'>
                <button className='search' onClick={() => {
                    fetchPage(0).then((res) => {
                        setPlayers(res.data.data)
                        setCurrentPage(1)
                        setTotalPages(Math.ceil(res.data.totalCount / ITEMS_PER_PAGE))
                    })
                }}>Search</button>
                <button className='clear' onClick={() => {
                    setFilterLeague('')
                    setFilterName('')
                    setFilterTeam('')
                    setFilterNationality('')
                    setFilterPosition('')
                }}>Clear filters</button>
            </div>

            <div className="list">
                {players.map((p, i) => {
                    return (<div onClick={() => {
                        setModalPlayer(p)
                        setPlayerModalOpen(true)
                    }} className='player' key={'Player_' + i}>
                        <div className="info">
                            <span className="playerName">{p.long_name}</span>
                            <span className="description">
                                <span className="team">
                                    <span className="field">Club </span>
                                    <span className="value">{p.club_name} </span>
                                </span>
                                <span className="team">
                                    <span className="field">Age </span>
                                    <span className="value">{p.age} </span>
                                </span>
                                <span className="team">
                                    <span className="field">Current Position </span>
                                    <span className="value">{p.team_position} </span>
                                </span>
                            </span>
                        </div>
                    </div>)
                })}
            </div>

            <div className="pages">
                {totalPages > 0 ?
                    <Pagination currentPage={currentPage} onPageClick={(page) => {
                        fetchPage(page - 1).then((res) => {
                            setPlayers(res.data.data)

                            setCurrentPage(page)
                        })
                    }} totalPages={totalPages} />
                    : ''
                }
            </div>
        </div>
    );
}

export default Search;
