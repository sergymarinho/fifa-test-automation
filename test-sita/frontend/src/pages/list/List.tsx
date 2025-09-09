import React, { useEffect, useState } from 'react';

// API
import api from "../../config/api"
import { ListPlayers } from "../../types/api/responses"
import { Player } from '../../types/general/player';

// Components
import PlayerModal from '../../components/playerModal/PlayerModal';

// Styles
import './_ListPage.scss';
import '../../scss/default.scss';
import Pagination from '../../components/pagination/Pagination';

// Consts
const ITEMS_PER_PAGE = 5;

function List() {

    // Variables
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    // Modal
    const [playerModalOpen, setPlayerModalOpen] = useState<boolean>(false);
    const [modalPlayer, setModalPlayer] = useState<Player | null>(null);

    useEffect(() => {
        fetchPage(0).then((res) => {
            setPlayers(res.data.data)
            setTotalPages(Math.ceil(res.data.totalCount / ITEMS_PER_PAGE))
        })
    }, [])

    const fetchPage = async (page: number) => {
        const API_ROUTE = `players?items=${ITEMS_PER_PAGE}&page=${page}`;
        return api.get<ListPlayers>(API_ROUTE);
    }

    return (
        <div className="listPage">

            {playerModalOpen && modalPlayer ?
                <PlayerModal isOpen={true} onClose={() => setPlayerModalOpen(false)} player={modalPlayer} /> : null
            }

            <span className="pageTitle">Player List</span>
            <span className="pageDescription">Navigate through the list of players in FIFA 2021.</span>
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

export default List;
