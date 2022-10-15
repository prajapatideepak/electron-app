import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss'

const SweetAlert = (title, text, icon='warning') => {
    return Swal.fire({
        title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })

}

export default SweetAlert;
