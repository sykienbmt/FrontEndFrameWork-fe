import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({
    icon:{
        fontSize:"20px",
        m:"0 5px 0 5px",
        cursor:'pointer',
        '&:hover':{
            color: "green"
        }
    },
    modal:{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        border: '2px solid green',
        background:"white",
        padding:"15px",
        borderRadius:"15px"
    }

})