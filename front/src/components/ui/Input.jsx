import React from 'react'

function Input({label, type, variantI, variantL, extraI, extraL, placeholder}) {
  const baseLabel = "w-full font-semibold"
  const baseInput = "p-2 input-base"

  const variantStylesLabel = {
    check: 'text-sm p-3',
  }

  const variantStylesInput = {
    login: 'input-login w-full',
    base: 'input-base border border-black w-full',
    import: 'w-full h-auto',
    check: '',
    file: 'file',
    date: 'date-input '
  }

  const stylesLabel = `${baseLabel} ${variantStylesLabel[variantL]} ${extraL}`
  const stylesInput = `${baseInput} ${variantStylesInput[variantI]} ${extraI}`
  const stylesCheck = `${variantStylesInput[variantI]} ${extraI}`

  return (
    <div>
      {variantI !== 'check' ? (
        <>
          <label className={stylesLabel}>{label}</label>
          <input type={type} className={stylesInput} placeholder={placeholder}/>
        </>
      ) : (
        <div className='check'>
          <input type={type} className={stylesCheck}/>
          <label className={stylesLabel}>{label}</label>
        </div>
      )}
    </div>
  )
}

export default Input