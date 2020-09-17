import React, { useState, useEffect } from "react";

import classes from "./style.module.css";

export default function AdminPage() {
  const [messageUser, setMessageUser] = useState("");
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/users", {
      headers: {
        // "Bearer " is a convention of Authentication Token:
        Authorization: "Bearer " + token,
        "Content-Type": "Application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          setMessageUser(
            "Failed to fetch users! Please enter in contact with Max Wilson!"
          );
          throw new Error("Failed to fetch users!");
        }
        return res.json();
      })
      .then((resData) => {
        setUsers(resData.users);
        // setMessageUser(
        //   <>
        //     <br />
        //     <h2 style={{ color: "darkred" }}>Users fetched!</h2>
        //   </>
        // );
      })
      .catch((err) => {
        setMessageUser(
          <>
            <br />
            <h2 style={{ color: "darkred" }}>Connection error!</h2>
          </>
        );
      });
  }, []);

  return (
    <section className={[classes.CenterAligned, classes.SectionGrey].join(" ")}>
      <br />
      <h1 className={classes.SectionTitle}>Printing All Registered Users</h1>
      {messageUser}
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
    </section>
  );
}
