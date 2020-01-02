import React from 'react'

import styles from './Backdrop.module.css'
const Backdrop = (props) => {
    return (
        props.show ? <div className={styles.Backdrop} onClick={props.modalClosed}></div> : null
    )
}

export default Backdrop
