import React from 'react'
import './ui.css'

const Button = ({children, variant, onClick, extra, style}) => {

    const base = 'btn'
    const variantStyles = {
        btnS: 'text-sm',
        btnM: 'text-xl',
        btnR: 'text-sm hidden lg:flex',
        btnLg: 'text-2xl',
        btnFull: 'w-full',
        btnLink: 'w-full font-extrabold',
        btnLinksm: 'font-semibold btn-link-sm text-white text-xs p-52',
        login: 'uppercase w-full text-white login-btn bg-violet-400',
    }

    const classNm = `${base} ${variantStyles[variant]} ${extra}`

  return (
    <div>
      <button style={style} className={classNm} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button
