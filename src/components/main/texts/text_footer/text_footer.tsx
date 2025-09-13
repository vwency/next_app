import React from 'react'
import '@/styles/mainlayout/text_footer/index.scss'

const FooterTextContent = (
  <div className="no-select footer_text">
    Our technology performing fast blockchain (120K TPS) and it has guaranteed
    AI-based data security. Proof of Stake, its consensus algorithm enables
    unlimited speeds.
  </div>
)

const FooterText = () => {
  return <>{FooterTextContent}</>
}

export default FooterText
