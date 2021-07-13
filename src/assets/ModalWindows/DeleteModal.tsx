import React, {useMemo, useState} from 'react';
import styles from './DeleteModal.module.css'
import {Button} from "../../n1-main/m1-ui/Common/Button/Button";
import {useDispatch} from "react-redux";
import {DeleteCardsPackThunk} from "../../n1-main/m2-bll/cardsPack-reducer";

type propsType={
    setShowDeleteModal:(value:boolean)=>void;
    idForModal:string
    setPreloader:(value:boolean)=>void;
}

export let DeleteModal = (props:propsType) => {
    let dispatch=useDispatch()
    let showNoFoo=()=>{
        props.setShowDeleteModal(false)
    }
    let showYesFoo=()=>{
        dispatch(DeleteCardsPackThunk(props.idForModal, props.setPreloader))
        props.setShowDeleteModal(false)
    }
    return (
       <div className={styles.general}>
                <div className={styles.window}>
                    <h1>Do you want to delete?</h1>
                    <Button children={'No'} onClick={showNoFoo}/>
                    <Button children={'Yes'} onClick={showYesFoo} />
                </div>
                <div onClick={showNoFoo} className={styles.background}></div>
            </div>

    )
}