import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './style.module.scss';
import serverURL from '../../serverURL';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AdminPage() {
  const [messageUser, setMessageUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isUserLogged = localStorage.getItem('userIsLogged');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isUserLogged) {
      async function getUsers() {
        try {
          const users = await axios.get(`${serverURL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(users.data.users);
          setLoading(false);
        } catch (err) {
          console.log('ERR: ', err);
          setLoading(false);
          setMessageUser(
            <h2 className={classes.errorMessage}>Connection error!</h2>
          );
        }
      }
      getUsers();
    } else {
      setMessageUser(
        <h2 className={classes.errorMessage}>User not logged!</h2>
      );
      setLoading(false);
    }
  }, []);

  return (
    <section className={classes.rootSection}>
      <hr />
      <br />
      <h1 className={classes.SectionTitle}>Printing All Registered Users</h1>
      {messageUser}
      {loading && (
        <div className={classes.progressCircle}>
          <CircularProgress color="inherit" />
        </div>
      )}
      {users.length > 0 && (
        <>
          <div className={classes.AdmPageContainer}>
            <table className={classes.tableUsers}>
              <tr className={classes.tableDarker}>
                <th>NAME:</th>
                <th>EMAIL:</th>
                <th>TELEPHONE:</th>
              </tr>
              {users.map((user) => {
                return (
                  <tr>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.telephone}</th>
                  </tr>
                );
              })}
            </table>
          </div>
          <br />
          <br />
        </>
      )}
    </section>
  );
}
