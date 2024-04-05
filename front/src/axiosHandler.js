import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'

const Handler = {}
const backend = 'http://192.168.100.86:8080/api/';

const COLORS = {
    warning: "#F7D900",
    error: "#E4080A",
    info: "#3D6C90",
    success: "#1CD537",
    main: "#9C71D9",
    second: "#8B65BF",
    third: "#6B98F2"
}

Handler.POST = async(route, data) => {
    return new Promise((resolve, reject) => {
        axios.post(backend+route, data)
        .then(res => {
            resolve(res.data);
        }).catch(res => {
            const { data:err } = res.response;

            console.error("ERROR "+err.type, err);
            
            switch(err.type){
                case "UNCOMPLETE_PARAMS": 
                        var text = `
                            <p><b><big> ${err.message} </big></b></p><br>
                            <ul>
                        `;

                        for(var key in err.requiredParams){
                            if(!err.requiredParams[key]) text += `<li><b>Falta el valor:</b> ${key}</li>`
                        }

                        text += "</ul>"

                        Swal.fire({
                            icon: "warning",
                            iconColor: COLORS.warning,
                            html: text,
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: COLORS.main
                        });
                    break;
                case "ROUTE_NOT_CONFIGURED": 
                        var text = `
                            <p><b><big> ERROR: ${err.message} </big></b></p><br>
                            <p>se hizo una peticion a la ruta <u><i>${err.route}</i></u> con el metodo <u><i>${err.method}</i></u> pero no esta configurado.</p>
                        `;

                        Swal.fire({
                            icon: "error",
                            iconColor: COLORS.error,
                            html: text,
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: COLORS.main
                        });
                    break;
                case "DEFAULT":
                        var text = `
                            <p><b><big> ERROR: ${err.error} </big></b></p><br>
                            <p>${err.message}</p>
                        `;

                        Swal.fire({
                            icon: "error",
                            iconColor: COLORS.error,
                            html: text,
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: COLORS.main
                        });
                case "LOGIN":
                    var text = `
                        <p><b><big> Correo y/o contraseña incorrectos </big></b></p><br>
                    `;

                    Swal.fire({
                        icon: "info",
                        iconColor: COLORS.info,
                        html: text,
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: COLORS.main
                    });
                    break;
            }   

            reject(err);
        })
    })
    
}

export default Handler;