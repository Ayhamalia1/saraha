import React from 'react'
import style from '..//Loader/style.module.css'


export default function Loader() {
  return (
<div className={style.container}>
  <div className={style.spinner}>
    <div className={style.bounce1} />
    <div className={style.bounce2} />
    <div className={style.bounce3} />
  </div>
</div>

  )
}
