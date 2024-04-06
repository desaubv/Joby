import React from 'react'

function Input({label, type, variantI, variantL, extraI, extraL, placeholder, name="", onChange, value, id, accept}) {
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
    date: 'date-input ',
    textarea: 'p-3'
  }

  const stylesLabel = `${baseLabel} ${variantStylesLabel[variantL]} ${extraL}`
  const stylesInput = `${baseInput} ${variantStylesInput[variantI]} ${extraI}`
  const stylesCheck = `${variantStylesInput[variantI]} ${extraI}`

  return (
    <div>
      {variantI === 'textarea' ? (
        <div>
          <label htmlFor={id} className={stylesLabel}>{label}</label>
          <textarea cols="auto" id={id} name={name} type={type} className={stylesInput} placeholder={placeholder} onChange={onChange} value={value} />
        </div>
      ) : (
        <div>
          {variantI !== 'check' ? (
            <>
              <label htmlFor={id} className={stylesLabel}>{label}</label>
              <input accept={accept} id={id} name={name} type={type} className={stylesInput} placeholder={placeholder} onChange={onChange} value={value} />
            </>
          ) : (
            <div className='check'>
              <input accept={accept} id={id} name={name} type={type} className={stylesCheck} onChange={onChange} value={value}/> 
              <label htmlFor={id} className={stylesLabel}>{label}</label>
            </div>
          )}
        </div>
      )}
      
    </div>
  )
}

export default Input