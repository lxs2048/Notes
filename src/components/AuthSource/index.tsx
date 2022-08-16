import React,{ useState,useRef } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.scss';
function AuthSource({children}) {
  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();
  const [hide,setHide] = useState(true)
  const InputRef = useRef(null)
  const checkVal = ()=>{
    let val = InputRef.current.value
    if(val === customFields.authSourceCode){
      setHide(false)
    }else{
      setHide(true)
    }
  }

  return (
    <div className={styles['custom-answer-container']}>
      <div className={styles['input-answer-box']}>
        <input id={styles['input-form-box']} ref={InputRef} type="text" /> <div className={styles['show-answer-btn']} onClick={checkVal}>查询</div>
      </div>
      {
        !hide && <div className={styles['custom-answer-content']}>{children}</div>
      }
    </div>
  )
}

export default AuthSource