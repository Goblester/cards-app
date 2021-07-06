import React, {useEffect, useState} from 'react';
import st from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    AddNewCardsPackThunk,
    DeleteCardsPackThunk,
    GETCardsPackThunk,
    InitialProfileReducerType, UpdateCardsPackThunk
} from "../../../n1-main/m2-bll/profile-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/Routes/Routes";
import {Button} from '../../../n1-main/m1-ui/Common/Button/Button';
import {Preloader} from "../../../n1-main/m1-ui/Common/Preloader/Preloader";


export type cardPacksType = {
    cardPacks: Array<userType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type userType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export const Profile = () => {
    let dispatch = useDispatch()
    let dataForTable = useSelector<AppStoreType,InitialProfileReducerType>(state => state.profile)
    let [preloader, setPreloader] = useState(false)


    useEffect(() => {
        console.log('useEffect')
        dispatch(GETCardsPackThunk(setPreloader))
    }, [])
    const AddNewCard = () => {
        dispatch(AddNewCardsPackThunk(setPreloader))
    }
    const DeleteCard = (id: string) => {
        console.log(id)
        dispatch(DeleteCardsPackThunk(id,setPreloader))
    }
    const UpdateCard = (id: string) => {
        console.log(id)
        dispatch(UpdateCardsPackThunk(id,setPreloader))
    }
    return (
        <div className={st.profilePage}>
            <h1>PROFILE PAGE</h1>

            <Button children={'add new card'} onClick={AddNewCard}/>
            <div className={st.profile}>{
                dataForTable!==undefined?
                    dataForTable.cardPacks.map((m) => {
                    return (
                        <div>
                            <ul>
                                <li>
                                    <div>ID: {m._id}</div>
                                    <div>USER-ID: {m.user_id}</div>
                                    <div>NAME: {m.name}</div>
                                    <div>CREATED: {m.created}</div>
                                    <div>UPDATED: {m.updated}</div>
                                    <div>cardsCount: {m.cardsCount}</div>
                                    <p></p>
                                    <Button children={'X'} onClick={()=>DeleteCard(m._id)}/>
                                    <Button children={'Update'} onClick={()=>UpdateCard(m._id)}/>
                                </li>
                            </ul>

                        </div>
                    )
                })
                    :
                    <div>{preloader && <Preloader/>}</div>
            }</div>

            {/*<Table data={dataForTable.cardPacks}/>*/}
        </div>)
}

