import { Page, Document } from '@react-pdf/renderer';
import { IconX } from '@tabler/icons-react'
import './ui.css'

const CvModal = ({ handleClose, show}) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
            <div className='close-sidebar w-full flex justify-end p-4'>
                <IconX onClick={handleClose} />
            </div>
            <div>
                <div className="pdf-modal">
                    <div className="pdf-modal-content">
                        <Document file="../../assets/pdfExample.pdf">
                            <Page pageNumber={2} />
                        </Document>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
}

export default CvModal