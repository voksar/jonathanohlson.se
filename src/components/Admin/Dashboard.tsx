import { useState, useEffect } from 'react';
import { authFetch } from '../../utils/misc/authFetch';

//Table imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import CreateUser from './CreateUser';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { setEmitFlags } from 'typescript';


//consts
const useStyles = makeStyles({
    table: {
      minWidth: 750,
      width: '100%',
    },
    tableCell: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    itemCell: {
        width: '100%',
        fontSize: '1rem',
    },
    delete: {
        color: 'red',
        cursor: 'pointer',
    },
    edit: {
        cursor: 'pointer',
    },
    addIcon: {
        transform: 'scale(1.2)',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer'
    }
});






interface User {
    id: number,
    username: string,
    role: string
}

const Dashboard : React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [msg, setMsg] = useState<string>("");
    const [show, isShow] = useState<boolean>(false);
    const classes = useStyles();
    
    async function deleteUser(id: number){
        await authFetch(`/api/admin/delete/${id}`, 'DELETE').then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json();
        }).then(response => {
            if(response.msg){
                setMsg(response.msg);
                setUsers(users.filter((user: User) => user.id !== id));
            }
        }).catch(e => {
            setMsg(e.statusText);
        });
    }

    async function get_dashboard(){
        await authFetch('/api/admin/dashboard', 'GET').then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json();
        }).then(response => {
            if(response.users){
                var json_users = JSON.parse(response.users);
                setUsers(json_users);
            }
            if(response.count){
                setCount(response.count);
            }
        }).catch(error => console.log(error));

        setLoading(false);
    }

    useEffect(() => {
        get_dashboard();
    }, []);

    return (
        <div>
            {!loading ? 
            <TableContainer component={Paper}>
            <h2 style={{'paddingRight': 20}}>Dashboard</h2>
            <span onClick={() => isShow(!show)}><PersonAddIcon className={classes.addIcon}/></span>
            <br></br><p>{msg}</p>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>ID</TableCell>
                  <TableCell className={classes.tableCell} align="right">Username</TableCell>
                  <TableCell  className={classes.tableCell} align="right">Role</TableCell>
                  <TableCell  className={classes.tableCell} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row: User) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" className={classes.itemCell}>
                      {row.id}
                    </TableCell>
                    <TableCell className={classes.itemCell} align="right">{row.username}</TableCell>
                    <TableCell className={classes.itemCell} align="right">{row.role}</TableCell>
                    <TableCell className={classes.itemCell} align="center">
                        <div onClick={() => deleteUser(row.id)}>
                            <DeleteIcon className={classes.delete}/>
                        </div>
                    </TableCell>
                    <TableCell className={classes.itemCell} align="center">
                        <div>
                            <EditIcon color="primary" className={classes.edit}/>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> 
          : ""}

        </div>
    );
}

export default Dashboard;