import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'

const Handler = {}
const backend = 'http://localhost:8080/'

Handler.modalGet = async(route) => {
    axios.get(backend+route)
        .then(data => {

            console.log(data);

            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })

        }).catch(err => {

            console.error(err)

            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        });
}

Handler.modalPost = async(route, data) => {
    axios.post(backend+route, data)
        .then(data => {

            console.log(data);

            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'suic',
                confirmButtonText: 'Cool'
            })

        }).catch(res => {
            const { status, data } = res.response;

            console.error(`ERROR AL CONSULTAR EL API (${status})`, data)
           
            var text = "";
            for (var key in data) {
                text += `<b>${key}:</b> ${data[key]}<br>`
            }

            
            if(parseInt(status / 100) === 4){
                Swal.fire({
                    title: 'ERROR del cliente',
                    html: text,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
            }else if(parseInt(status / 100) === 5){
                Swal.fire({
                    title: 'ERROR del servidor',
                    html: text,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
            }

            
        });
}

export default Handler;